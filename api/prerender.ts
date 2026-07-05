/**
 * Runtime prerender for /blog/:slug — serves the real SPA template
 * with per-article <title>, description, canonical, og:*, twitter:*,
 * and JSON-LD injected into <head>.
 *
 * Runs for ALL requests (human, bot, view-source), not just crawlers.
 * The response still contains the built <script> tag from index.html,
 * so React mounts normally in the browser. Newly published articles
 * are picked up automatically — no rebuild required.
 */

const SUPABASE_URL = "https://rihxkjhgipmqqihuljah.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_u5wVaa0Vc3O66Gnqyzc9Dg_-hdHmNZ8";
const SITE_URL = "https://www.alhamdacademy.net";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const escapeHtml = (v: string): string =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const escapeAttr = escapeHtml;

interface BlogPost {
  slug: string;
  title_en: string | null;
  title_ar: string | null;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  content_en: string | null;
  content_ar: string | null;
  featured_image: string | null;
  published_at: string | null;
  updated_at: string | null;
  created_at: string | null;
}

interface SeoOverride {
  title: string | null;
  description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
}

async function fetchPost(slug: string): Promise<BlogPost | null> {
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,title_en,title_ar,excerpt_en,excerpt_ar,content_en,content_ar,featured_image,published_at,updated_at,created_at&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as BlogPost[];
  return rows?.[0] ?? null;
}

async function fetchSeoOverride(pagePath: string): Promise<SeoOverride | null> {
  const url = `${SUPABASE_URL}/rest/v1/seo_metadata?select=title,description,og_title,og_description,og_image,twitter_title,twitter_description,twitter_image&page_path=eq.${encodeURIComponent(pagePath)}&limit=1`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as SeoOverride[];
  return rows?.[0] ?? null;
}

/**
 * Full seo_metadata row used by the client `useSeoMetadata` hook.
 * Inlined into the HTML shell so the browser doesn't re-fetch on hydration.
 */
async function fetchFullSeo(pagePath: string): Promise<Record<string, unknown> | null> {
  const cols =
    "title,description,keywords,canonical_url,og_title,og_description,og_image,og_type,twitter_card,twitter_title,twitter_description,twitter_image,structured_data,no_index";
  const url = `${SUPABASE_URL}/rest/v1/seo_metadata?select=${cols}&page_path=eq.${encodeURIComponent(pagePath)}&limit=1`;
  try {
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as Record<string, unknown>[];
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Recent published blog posts — inlined for the homepage so the
 * `RecentArticlesSection` component skips its client-side fetch.
 */
async function fetchRecentPosts(): Promise<unknown[]> {
  const cols =
    "slug,title_en,title_ar,excerpt_en,excerpt_ar,featured_image,read_time_en,read_time_ar,blog_categories(name_en,name_ar)";
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?select=${cols}&status=eq.published&order=published_at.desc&limit=4`;
  try {
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) return [];
    return ((await res.json()) as unknown[]) ?? [];
  } catch {
    return [];
  }
}

/** JSON-safe embed for <script type="application/json"> — escapes `</` only. */
function jsonEmbed(v: unknown): string {
  return JSON.stringify(v).replace(/</g, "\\u003c");
}

// Cache the built SPA template in-memory per warm instance so we don't
// re-fetch it on every request. Falls back gracefully if fetch fails.
let cachedTemplate: string | null = null;
let cachedTemplateAt = 0;
const TEMPLATE_TTL_MS = 5 * 60_000;

async function getTemplate(host: string): Promise<string | null> {
  const now = Date.now();
  if (cachedTemplate && now - cachedTemplateAt < TEMPLATE_TTL_MS) return cachedTemplate;
  try {
    // dist/index.html is renamed to dist/app.html by the postbuild step
    // so that Vercel's `/` rewrite always hits this prerender function
    // instead of being short-circuited by the filesystem.
    const res = await fetch(`https://${host}/app.html`, {
      headers: { "user-agent": "AlhamdPrerender/1.0" },
    });
    if (!res.ok) return cachedTemplate;
    const html = await res.text();
    // Sanity check: must contain #root
    if (!html.includes('id="root"')) return cachedTemplate;
    cachedTemplate = html;
    cachedTemplateAt = now;
    return cachedTemplate;
  } catch {
    return cachedTemplate;
  }
}


interface MetaBundle {
  title: string;
  description: string;
  /**
   * Logical (language-agnostic) path such as "/", "/blog/foo",
   * "/free-trial". `injectMeta` derives the English canonical
   * (`SITE_URL + logicalPath`) and the Arabic canonical
   * (`SITE_URL + "/ar" + logicalPath`) from it.
   */
  logicalPath: string;
  ogType: "article" | "website";
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: string;
  noscriptBody?: string;
}

/** English canonical for a logical path. Root stays "/". */
function englishUrlFor(logicalPath: string): string {
  return `${SITE_URL}${logicalPath === "/" ? "/" : logicalPath}`;
}

/** Arabic canonical for a logical path — `/ar` for root, `/ar/foo` otherwise. */
function arabicUrlFor(logicalPath: string): string {
  return `${SITE_URL}/ar${logicalPath === "/" ? "" : logicalPath}`;
}

/** Current canonical URL given the active language. */
function canonicalFor(logicalPath: string, lang: "en" | "ar"): string {
  return lang === "ar" ? arabicUrlFor(logicalPath) : englishUrlFor(logicalPath);
}

function buildJsonLd(post: BlogPost, canonical: string, ogImage: string): string {
...
    ],
  };
  return JSON.stringify([article, breadcrumb]);
}

function buildPostMeta(post: BlogPost, seo: SeoOverride | null): MetaBundle {
  const logicalPath = `/blog/${post.slug}`;
  const canonical = englishUrlFor(logicalPath);
  const titleEn = post.title_en || post.title_ar || "Alhamd Academy Blog";
  const excerptEn = post.excerpt_en || post.excerpt_ar || "";
  const title = seo?.title || seo?.og_title || `${titleEn} | Alhamd Academy`;
  const description = seo?.description || seo?.og_description || excerptEn ||
    "Read the latest article from Alhamd Academy.";
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = seo?.og_image || post.featured_image || DEFAULT_OG_IMAGE;
  const twitterTitle = seo?.twitter_title || ogTitle;
  const twitterDescription = seo?.twitter_description || ogDescription;
  const twitterImage = seo?.twitter_image || ogImage;
  const publishedTime = post.published_at || post.created_at || "";
  const modifiedTime = post.updated_at || publishedTime;
  const jsonLd = buildJsonLd(post, canonical, ogImage);
  const noscriptBody = `<h1>${escapeHtml(titleEn)}</h1>${
    excerptEn ? `<p>${escapeHtml(excerptEn)}</p>` : ""
  }<p><a href="${canonical}">Read on Alhamd Academy</a></p>`;
  return {
    title, description, logicalPath, ogType: "article",
    ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage,
    publishedTime, modifiedTime, jsonLd, noscriptBody,
  };
}

function buildPageMeta(path: string, seo: SeoOverride | null): MetaBundle | null {
  // Page-mode only injects when we have a seo_metadata row — otherwise
  // the static index.html defaults are already correct for /.
  if (!seo || (!seo.title && !seo.description && !seo.og_title)) return null;
  const title = seo.title || seo.og_title || "Alhamd Academy";
  const description = seo.description || seo.og_description || "";
  const ogTitle = seo.og_title || title;
  const ogDescription = seo.og_description || description;
  const ogImage = seo.og_image || DEFAULT_OG_IMAGE;
  const twitterTitle = seo.twitter_title || ogTitle;
  const twitterDescription = seo.twitter_description || ogDescription;
  const twitterImage = seo.twitter_image || ogImage;
  return {
    title, description, logicalPath: path, ogType: "website",
    ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage,
  };
}



/**
 * Rewrite the <head> of the built SPA template with per-article meta.
 * Uses targeted regex replacements — never rebuilds the doc — so the
 * preload hints, GTM script, favicons, fonts and mounted <script> tag
 * are preserved verbatim.
 *
 * `lang` controls `<html lang="...">` and `<html dir="...">`. It's
 * purely additive — any HTML that already has the right attrs still
 * ends up correct.
 */
function injectMeta(template: string, m: MetaBundle, lang: "en" | "ar" = "en"): string {
  let html = template;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const currentCanonical = canonicalFor(m.logicalPath, lang);

  // <html lang / dir> — replace existing attrs when present, otherwise inject.
  if (/<html\b[^>]*\blang=/i.test(html)) {
    html = html.replace(/(<html\b[^>]*\b)lang="[^"]*"/i, `$1lang="${lang}"`);
  } else {
    html = html.replace(/<html\b/i, `<html lang="${lang}"`);
  }
  if (/<html\b[^>]*\bdir=/i.test(html)) {
    html = html.replace(/(<html\b[^>]*\b)dir="[^"]*"/i, `$1dir="${dir}"`);
  } else {
    html = html.replace(/<html\b/i, `<html dir="${dir}"`);
  }

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(m.title)}</title>`);

  // meta name="description"
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeAttr(m.description)}" />`,
  );

  // canonical (self-referencing per-language URL)
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${currentCanonical}" />`,
  );

  // og:type (article for blog posts, website for landing pages)
  html = html.replace(
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${m.ogType}" />`,
  );

  // og:url (self-referencing per-language URL)
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${currentCanonical}" />`,
  );

  // og:title / og:description / og:image / og:image:alt
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeAttr(m.ogTitle)}" />`,
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeAttr(m.ogDescription)}" />`,
  );
  html = html.replace(
    /<meta\s+property=["']og:image["'](?!:)[^>]*>/i,
    `<meta property="og:image" content="${escapeAttr(m.ogImage)}" />`,
  );
  html = html.replace(
    /<meta\s+property=["']og:image:alt["'][^>]*>/i,
    `<meta property="og:image:alt" content="${escapeAttr(m.ogTitle)}" />`,
  );

  // og:locale — helps social crawlers pick the right language.
  const ogLocale = lang === "ar" ? "ar_AR" : "en_US";
  const ogLocaleAlt = lang === "ar" ? "en_US" : "ar_AR";
  const localeTags =
    `<meta property="og:locale" content="${ogLocale}" />` +
    `<meta property="og:locale:alternate" content="${ogLocaleAlt}" />`;
  html = html.replace(/<meta\s+property=["']og:locale["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta\s+property=["']og:locale:alternate["'][^>]*>\s*/gi, "");

  // twitter:title / description / image
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeAttr(m.twitterTitle)}" />`,
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeAttr(m.twitterDescription)}" />`,
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image["'](?!:)[^>]*>/i,
    `<meta name="twitter:image" content="${escapeAttr(m.twitterImage)}" />`,
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image:alt["'][^>]*>/i,
    `<meta name="twitter:image:alt" content="${escapeAttr(m.twitterTitle)}" />`,
  );

  // hreflang alternates. English is the default baseline: `en` and
  // `x-default` both point at the bare canonical (no query string).
  // Arabic gets `?lang=ar` appended.
  let arabicUrl = m.canonical;
  try {
    const u = new URL(m.canonical);
    u.searchParams.set("lang", "ar");
    arabicUrl = u.toString();
  } catch {
    arabicUrl = m.canonical;
  }
  const hreflangTags = [
    `<link rel="alternate" hreflang="en" href="${escapeAttr(m.canonical)}" />`,
    `<link rel="alternate" hreflang="ar" href="${escapeAttr(arabicUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(m.canonical)}" />`,
  ].join("");
  // Strip any hreflang alternates already present so we don't ship duplicates.
  html = html.replace(
    /<link\s+rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*>\s*/gi,
    "",
  );

  // Article extras — only for blog posts.
  const extras: string[] = [localeTags, hreflangTags];
  if (m.publishedTime) {
    extras.push(`<meta property="article:published_time" content="${escapeAttr(m.publishedTime)}" />`);
  }
  if (m.modifiedTime) {
    extras.push(`<meta property="article:modified_time" content="${escapeAttr(m.modifiedTime)}" />`);
  }
  if (m.jsonLd) {
    extras.push(`<script type="application/ld+json">${m.jsonLd}</script>`);
  }
  html = html.replace(/<\/head>/i, `${extras.join("\n")}\n</head>`);

  // Optional <noscript> body summary (blog posts only).
  if (m.noscriptBody) {
    html = html.replace(
      /<body([^>]*)>/i,
      `<body$1>\n<noscript>${m.noscriptBody}</noscript>`,
    );
  }

  return html;
}


function buildFallbackHtml(slug: string): string {
  const canonical = `${SITE_URL}/blog/${slug}`;
  return `<!doctype html><html lang="en"><head>
<meta charset="UTF-8" />
<title>Article not found | Alhamd Academy</title>
<meta name="description" content="This article is unavailable." />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="noindex, follow" />
</head><body><p>Article not found. <a href="${SITE_URL}/blog">Back to blog</a>.</p></body></html>`;
}

// Normalise a path from the ?path=... query param: keep leading slash,
// strip trailing slash (except root), reject anything non-URL-safe.
function normalisePath(raw: string): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/")) return null;
  if (!/^[/A-Za-z0-9\-_./]+$/.test(trimmed)) return null;
  if (trimmed.length > 300) return null;
  if (trimmed === "/") return "/";
  return trimmed.replace(/\/+$/, "");
}

async function handleBlogPost(req: any, res: any, slug: string, host: string, lang: "en" | "ar" = "en") {
  const [post, seo, template] = await Promise.all([
    fetchPost(slug),
    fetchSeoOverride(`/blog/${slug}`),
    getTemplate(host),
  ]);

  if (!post) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");
    res.status(404).send(buildFallbackHtml(slug));
    return;
  }

  if (!template) {
    const canonical = `${SITE_URL}/blog/${post.slug}`;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(
      `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8" /><title>${
        escapeHtml(post.title_en || post.title_ar || "Alhamd Academy Blog")
      }</title><link rel="canonical" href="${canonical}" /><meta http-equiv="refresh" content="0; url=${canonical}" /></head><body><script>location.replace(${JSON.stringify(canonical)})</script></body></html>`,
    );
    return;
  }

  const meta = buildPostMeta(post, seo);
  let html = injectMeta(template, meta, lang);
  // Inline full seo row so client `useSeoMetadata` skips its fetch.
  const fullSeo = await fetchFullSeo(`/blog/${post.slug}`);
  const dataBlob = { seo: { [`/blog/${post.slug}`]: fullSeo }, recentPosts: null };
  html = html.replace(
    /<\/head>/i,
    `<script id="__ALHAMD_DATA__" type="application/json">${jsonEmbed(dataBlob)}</script>\n</head>`,
  );
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Vary", "Accept-Encoding");
  res.setHeader(
    "Cache-Control",
    "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
  );
  res.status(200).send(html);
}

async function handlePage(req: any, res: any, path: string, host: string, lang: "en" | "ar" = "en") {
  const isHome = path === "/";
  const [seo, template, fullSeo, recentPosts] = await Promise.all([
    fetchSeoOverride(path),
    getTemplate(host),
    fetchFullSeo(path),
    isHome ? fetchRecentPosts() : Promise.resolve(null),
  ]);

  // Without a template we can't do anything useful — fall through to
  // the static index.html by letting Vercel serve /index.html normally.
  if (!template) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(
      `<!doctype html><html lang="${lang}"><head><meta http-equiv="refresh" content="0; url=${SITE_URL}${path}" /></head><body></body></html>`,
    );
    return;
  }

  // Build a minimal MetaBundle for pages without a seo_metadata override
  // so lang/dir + hreflang still get applied to the static template.
  const meta =
    buildPageMeta(path, seo) ??
    ({
      title: "Alhamd Academy | Online Quran, Arabic & Islamic Studies",
      description: "",
      canonical: `${SITE_URL}${path === "/" ? "/" : path}`,
      ogType: "website" as const,
      ogTitle: "Alhamd Academy",
      ogDescription: "",
      ogImage: DEFAULT_OG_IMAGE,
      twitterTitle: "Alhamd Academy",
      twitterDescription: "",
      twitterImage: DEFAULT_OG_IMAGE,
    } as MetaBundle);
  let html = injectMeta(template, meta, lang);

  // Inline data so the client SPA can hydrate without extra Supabase round-trips.
  const dataBlob = {
    seo: { [path]: fullSeo },
    recentPosts: recentPosts ?? null,
  };
  html = html.replace(
    /<\/head>/i,
    `<script id="__ALHAMD_DATA__" type="application/json">${jsonEmbed(dataBlob)}</script>\n</head>`,
  );

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Vary", "Accept-Encoding");
  res.setHeader(
    "Cache-Control",
    "public, max-age=60, s-maxage=600, stale-while-revalidate=86400",
  );
  res.status(200).send(html);
}

export default async function handler(req: any, res: any) {
  try {
    const host = (req.headers?.["x-forwarded-host"] ?? req.headers?.host ?? "www.alhamdacademy.net").toString();

    // Language detection: `?lang=ar` toggles Arabic. Default English.
    const langRaw = (req.query?.lang ?? "").toString().toLowerCase();
    const lang: "en" | "ar" = langRaw === "ar" ? "ar" : "en";

    // `path` wins over `slug`. Vercel forwards named source params
    // (e.g. `/courses/:slug`) into the destination query string, which
    // would otherwise hijack these requests into the blog-post branch.
    const pathRaw = (req.query?.path ?? "").toString();
    if (pathRaw) {
      const path = normalisePath(pathRaw);
      if (!path) {
        res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8");
        res.send("Missing or invalid path");
        return;
      }
      await handlePage(req, res, path, host, lang);
      return;
    }

    const slugRaw = (req.query?.slug ?? "").toString();
    if (slugRaw) {
      const slug = slugRaw.trim().replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 200);
      if (!slug) {
        res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8");
        res.send("Missing slug");
        return;
      }
      await handleBlogPost(req, res, slug, host, lang);
      return;
    }

    res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("Missing path or slug");
  } catch (err) {
    res.status(500).setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(`Prerender error: ${String(err)}`);
  }
}

