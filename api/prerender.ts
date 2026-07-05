/**
 * Social-crawler prerender for /blog/:slug.
 *
 * Vercel rewrites /blog/:slug → /api/prerender?slug=:slug only when the
 * request User-Agent matches a social/link-preview crawler (Facebook,
 * LinkedIn, WhatsApp, Twitter, Telegram, Slack, Discord, Pinterest, Reddit).
 * Human users and JS-executing search bots (Googlebot) still receive the
 * normal SPA `index.html` and hydrate through React Router.
 *
 * This function returns a tiny HTML document whose <head> carries the exact
 * per-post OG/Twitter metadata so link previews render the article — not the
 * homepage — while the <body> contains a JS redirect fallback that sends any
 * real browser hitting this URL back to the SPA route.
 */

const SUPABASE_URL = "https://rihxkjhgipmqqihuljah.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_u5wVaa0Vc3O66Gnqyzc9Dg_-hdHmNZ8";
const SITE_URL = "https://www.alhamdacademy.net";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

interface BlogPost {
  slug: string;
  title_en: string | null;
  title_ar: string | null;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  featured_image: string | null;
  published_at: string | null;
  updated_at: string | null;
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
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,title_en,title_ar,excerpt_en,excerpt_ar,featured_image,published_at,updated_at,author&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`;
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

function buildHtml(post: BlogPost, seo: SeoOverride | null): string {
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
  const publishedTime = post.published_at || post.updated_at || "";
  const modifiedTime = post.updated_at || post.published_at || "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="index, follow, max-image-preview:large" />

<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${escapeHtml(ogTitle)}" />
<meta property="og:description" content="${escapeHtml(ogDescription)}" />
<meta property="og:image" content="${escapeHtml(ogImage)}" />
<meta property="og:image:alt" content="${escapeHtml(ogTitle)}" />
<meta property="og:site_name" content="Alhamd Academy" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="ar_AR" />
${publishedTime ? `<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />` : ""}
${modifiedTime ? `<meta property="article:modified_time" content="${escapeHtml(modifiedTime)}" />` : ""}
${post.author ? `<meta property="article:author" content="${escapeHtml(post.author)}" />` : ""}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(twitterTitle)}" />
<meta name="twitter:description" content="${escapeHtml(twitterDescription)}" />
<meta name="twitter:image" content="${escapeHtml(twitterImage)}" />

<link rel="alternate" hreflang="en" href="${canonical}?lang=en" />
<link rel="alternate" hreflang="ar" href="${canonical}?lang=ar" />
<link rel="alternate" hreflang="x-default" href="${canonical}" />

<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titleEn,
    description: excerptEn,
    image: ogImage,
    author: { "@type": "Person", name: post.author || "Alhamd Academy" },
    publisher: {
      "@type": "Organization",
      name: "Alhamd Academy",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  })}</script>

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

function buildFallbackHtml(slug: string): string {
  const canonical = `${SITE_URL}/blog/${slug}`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<title>Alhamd Academy Blog</title>
<meta name="description" content="Read the latest articles from Alhamd Academy — online Quran, Arabic and Islamic studies." />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="Alhamd Academy Blog" />
<meta property="og:description" content="Read the latest articles from Alhamd Academy — online Quran, Arabic and Islamic studies." />
<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
<meta name="twitter:card" content="summary_large_image" />
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

    const [post, seo] = await Promise.all([
      fetchPost(slug),
      fetchSeoOverride(`/blog/${slug}`),
    ]);

    const html = post ? buildHtml(post, seo) : buildFallbackHtml(slug);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.status(post ? 200 : 404).send(html);
  } catch (err) {
    res.status(500).setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(`Prerender error: ${String(err)}`);
  }
}
