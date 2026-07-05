/**
 * Prerender for /blog/:slug — serves indexable/social HTML to bots.
 *
 * vercel.json rewrites /blog/:slug → /api/prerender?slug=:slug for known
 * social AND search-engine user agents. Human users still receive the SPA.
 *
 * Two modes distinguished by UA:
 *  - searchBot (Googlebot, Bingbot, GPTBot, PerplexityBot, ClaudeBot, …):
 *      full <article> body with EN + AR content, both <h1>s, JSON-LD.
 *      NO meta refresh (would be treated as soft redirect).
 *  - socialBot (Facebook, LinkedIn, WhatsApp, Twitter, Slack, …):
 *      small HTML with OG/Twitter tags + meta refresh so any human who
 *      lands here (unlikely) still ends up on the SPA.
 */

const SUPABASE_URL = "https://rihxkjhgipmqqihuljah.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_u5wVaa0Vc3O66Gnqyzc9Dg_-hdHmNZ8";
const SITE_URL = "https://www.alhamdacademy.net";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const SEARCH_BOT_RE =
  /(Googlebot|Google-InspectionTool|Google-Extended|Storebot-Google|AdsBot-Google|Mediapartners-Google|bingbot|BingPreview|DuckDuckBot|YandexBot|Baiduspider|Applebot|GPTBot|OAI-SearchBot|ChatGPT-User|PerplexityBot|ClaudeBot|Claude-Web|anthropic-ai|CCBot|Amazonbot|Bytespider|MojeekBot)/i;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Very light HTML sanitiser for content body: strip <script>, event
// handlers, inline JS URLs. We already trust admin-authored content, but
// belt-and-suspenders for what's served to Google.
const sanitiseBodyHtml = (html: string): string =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/ on[a-z]+="[^"]*"/gi, "")
    .replace(/ on[a-z]+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");

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
  author: string | null;
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
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,title_en,title_ar,excerpt_en,excerpt_ar,content_en,content_ar,featured_image,published_at,updated_at,created_at,author&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as BlogPost[];
  return rows?.[0] ?? null;
}

async function fetchSeoOverride(pagePath: string): Promise<SeoOverride | null> {
  const url = `${SUPABASE_URL}/rest/v1/seo_metadata?select=title,description,og_title,og_description,og_image,twitter_title,twitter_description,twitter_image&page_path=eq.${encodeURIComponent(pagePath)}&limit=1`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as SeoOverride[];
  return rows?.[0] ?? null;
}

function buildCommonHead(opts: {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  publishedTime: string;
  modifiedTime: string;
  author: string | null;
  jsonLd: string;
}): string {
  const {
    title, description, canonical, ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage, publishedTime,
    modifiedTime, author, jsonLd,
  } = opts;
  return `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
${author ? `<meta name="author" content="${escapeHtml(author)}" />` : `<meta name="author" content="Alhamd Academy" />`}

<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${escapeHtml(ogTitle)}" />
<meta property="og:description" content="${escapeHtml(ogDescription)}" />
<meta property="og:image" content="${escapeHtml(ogImage)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${escapeHtml(ogTitle)}" />
<meta property="og:site_name" content="Alhamd Academy" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="ar_AR" />
${publishedTime ? `<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />` : ""}
${modifiedTime ? `<meta property="article:modified_time" content="${escapeHtml(modifiedTime)}" />` : ""}
${author ? `<meta property="article:author" content="${escapeHtml(author)}" />` : ""}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(twitterTitle)}" />
<meta name="twitter:description" content="${escapeHtml(twitterDescription)}" />
<meta name="twitter:image" content="${escapeHtml(twitterImage)}" />
<meta name="twitter:image:alt" content="${escapeHtml(twitterTitle)}" />

<link rel="alternate" hreflang="en" href="${canonical}?lang=en" />
<link rel="alternate" hreflang="ar" href="${canonical}?lang=ar" />
<link rel="alternate" hreflang="x-default" href="${canonical}" />

<script type="application/ld+json">${jsonLd}</script>`;
}

function buildJsonLd(post: BlogPost, canonical: string, ogImage: string): string {
  const titleEn = post.title_en || post.title_ar || "";
  const excerptEn = post.excerpt_en || post.excerpt_ar || "";
  const publishedTime = post.published_at || post.created_at || "";
  const modifiedTime = post.updated_at || publishedTime;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titleEn,
    description: excerptEn,
    image: ogImage,
    author: { "@type": "Person", name: post.author || "Alhamd Academy" },
    publisher: {
      "@type": "Organization",
      name: "Alhamd Academy",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: ["en", "ar"],
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: titleEn, item: canonical },
    ],
  };
  return JSON.stringify([article, breadcrumb]);
}

function buildSocialHtml(post: BlogPost, seo: SeoOverride | null): string {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const titleEn = post.title_en || post.title_ar || "Alhamd Academy Blog";
  const excerptEn = post.excerpt_en || post.excerpt_ar || "Read the latest article from Alhamd Academy.";
  const title = seo?.title || seo?.og_title || `${titleEn} | Alhamd Academy`;
  const description = seo?.description || seo?.og_description || excerptEn;
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = seo?.og_image || post.featured_image || DEFAULT_OG_IMAGE;
  const twitterTitle = seo?.twitter_title || ogTitle;
  const twitterDescription = seo?.twitter_description || ogDescription;
  const twitterImage = seo?.twitter_image || ogImage;
  const publishedTime = post.published_at || post.created_at || "";
  const modifiedTime = post.updated_at || publishedTime;
  const jsonLd = buildJsonLd(post, canonical, ogImage);
  const head = buildCommonHead({
    title, description, canonical, ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage, publishedTime,
    modifiedTime, author: post.author, jsonLd,
  });
  return `<!doctype html>
<html lang="en">
<head>
${head}
<meta http-equiv="refresh" content="0; url=${canonical}" />
</head>
<body>
<h1>${escapeHtml(titleEn)}</h1>
<p>${escapeHtml(excerptEn)}</p>
<p><a href="${canonical}">Read on Alhamd Academy</a></p>
<script>window.location.replace(${JSON.stringify(canonical)});</script>
</body>
</html>`;
}

function buildSearchBotHtml(post: BlogPost, seo: SeoOverride | null): string {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const titleEn = post.title_en || post.title_ar || "Alhamd Academy Blog";
  const titleAr = post.title_ar || post.title_en || "";
  const excerptEn = post.excerpt_en || post.excerpt_ar || "";
  const excerptAr = post.excerpt_ar || post.excerpt_en || "";
  const contentEn = sanitiseBodyHtml(post.content_en || post.content_ar || "");
  const contentAr = sanitiseBodyHtml(post.content_ar || post.content_en || "");

  const title = seo?.title || seo?.og_title || `${titleEn} | Alhamd Academy`;
  const description = seo?.description || seo?.og_description || excerptEn;
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = seo?.og_image || post.featured_image || DEFAULT_OG_IMAGE;
  const twitterTitle = seo?.twitter_title || ogTitle;
  const twitterDescription = seo?.twitter_description || ogDescription;
  const twitterImage = seo?.twitter_image || ogImage;
  const publishedTime = post.published_at || post.created_at || "";
  const modifiedTime = post.updated_at || publishedTime;
  const jsonLd = buildJsonLd(post, canonical, ogImage);
  const head = buildCommonHead({
    title, description, canonical, ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage, publishedTime,
    modifiedTime, author: post.author, jsonLd,
  });

  const featured = post.featured_image
    ? `<img src="${escapeHtml(post.featured_image)}" alt="${escapeHtml(titleEn)}" width="1200" height="630" />`
    : "";

  // Note: no meta refresh, no auto redirect — search bots must render the
  // full article. A <noscript> link and a client-side hydration hint let
  // human users (rare on this path) still reach the SPA.
  return `<!doctype html>
<html lang="en">
<head>
${head}
</head>
<body>
<nav aria-label="Breadcrumb">
  <a href="${SITE_URL}/">Home</a> &rsaquo;
  <a href="${SITE_URL}/blog">Blog</a> &rsaquo;
  <span>${escapeHtml(titleEn)}</span>
</nav>

<article lang="en">
  <header>
    <h1>${escapeHtml(titleEn)}</h1>
    ${publishedTime ? `<time datetime="${escapeHtml(publishedTime)}">${escapeHtml(publishedTime.split("T")[0])}</time>` : ""}
    ${post.author ? `<address>by <span>${escapeHtml(post.author)}</span></address>` : ""}
  </header>
  ${featured}
  ${excerptEn ? `<p><strong>${escapeHtml(excerptEn)}</strong></p>` : ""}
  <div>${contentEn}</div>
</article>

${titleAr || contentAr ? `<article lang="ar" dir="rtl">
  <header>
    <h1>${escapeHtml(titleAr)}</h1>
  </header>
  ${excerptAr ? `<p><strong>${escapeHtml(excerptAr)}</strong></p>` : ""}
  <div>${contentAr}</div>
</article>` : ""}

<footer>
  <p><a href="${canonical}">Read the interactive version on Alhamd Academy</a></p>
</footer>
<noscript><meta http-equiv="refresh" content="0; url=${canonical}" /></noscript>
</body>
</html>`;
}

function buildFallbackHtml(slug: string): string {
  const canonical = `${SITE_URL}/blog/${slug}`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<title>Alhamd Academy Blog</title>
<meta name="description" content="Read the latest articles from Alhamd Academy — online Quran, Arabic and Islamic studies." />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="noindex, follow" />
<meta http-equiv="refresh" content="0; url=${canonical}" />
</head><body><script>window.location.replace(${JSON.stringify(canonical)});</script></body></html>`;
}

export default async function handler(req: any, res: any) {
  try {
    const slugRaw = (req.query?.slug ?? "").toString();
    const slug = slugRaw.trim().replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 200);
    if (!slug) {
      res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8");
      res.send("Missing slug");
      return;
    }

    const ua = (req.headers?.["user-agent"] ?? "").toString();
    const isSearchBot = SEARCH_BOT_RE.test(ua);

    const [post, seo] = await Promise.all([
      fetchPost(slug),
      fetchSeoOverride(`/blog/${slug}`),
    ]);

    if (!post) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");
      res.status(404).send(buildFallbackHtml(slug));
      return;
    }

    const html = isSearchBot ? buildSearchBotHtml(post, seo) : buildSocialHtml(post, seo);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Vary on UA so the CDN doesn't hand a searchBot page to a socialBot or vice versa.
    res.setHeader("Vary", "User-Agent");
    res.setHeader(
      "Cache-Control",
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.status(200).send(html);
  } catch (err) {
    res.status(500).setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(`Prerender error: ${String(err)}`);
  }
}
