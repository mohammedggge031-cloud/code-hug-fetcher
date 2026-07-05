#!/usr/bin/env node
/**
 * Generates static, crawlable HTML files for published blog posts after Vite
 * builds the SPA. This makes `view-source:/blog/<slug>` and non-JS crawlers see
 * the article-specific title/canonical/OG tags instead of the homepage head.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://rihxkjhgipmqqihuljah.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_u5wVaa0Vc3O66Gnqyzc9Dg_-hdHmNZ8";

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://www.alhamdacademy.net").replace(/\/$/, "");
const DIST_DIR = resolve(process.cwd(), "dist");
const INDEX_PATH = resolve(DIST_DIR, "index.html");
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const BLOG_SELECT = [
  "slug",
  "title_en",
  "title_ar",
  "excerpt_en",
  "excerpt_ar",
  "content_en",
  "content_ar",
  "featured_image",
  "published_at",
  "updated_at",
  "created_at",
].join(",");

const SEO_SELECT = [
  "page_path",
  "title",
  "description",
  "keywords",
  "canonical_url",
  "og_title",
  "og_description",
  "og_image",
  "og_type",
  "twitter_card",
  "twitter_title",
  "twitter_description",
  "twitter_image",
  "structured_data",
  "no_index",
].join(",");

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeAttr = escapeHtml;

const sanitiseBodyHtml = (html = "") =>
  String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/javascript:/gi, "");

async function fetchRest(pathAndQuery) {
  const url = `${SUPABASE_URL}/rest/v1/${pathAndQuery}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase REST ${res.status}: ${body.slice(0, 300)}`);
  }

  return res.json();
}

async function fetchPublishedPosts() {
  const rows = await fetchRest(
    `blog_posts?select=${encodeURIComponent(BLOG_SELECT)}&status=eq.published&order=published_at.desc.nullslast&limit=1000`,
  );
  return Array.isArray(rows) ? rows.filter((post) => typeof post.slug === "string" && post.slug.trim()) : [];
}

async function fetchSeoMetadata() {
  try {
    const rows = await fetchRest(`seo_metadata?select=${encodeURIComponent(SEO_SELECT)}&limit=5000`);
    const map = new Map();
    for (const row of Array.isArray(rows) ? rows : []) {
      if (row?.page_path) map.set(row.page_path, row);
    }
    return map;
  } catch (err) {
    console.warn(`SEO metadata unavailable for prerender: ${err.message}`);
    return new Map();
  }
}

function removeStaticSeoFromHead(head) {
  return head
    .replace(/<meta\s+charset=["'][^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']viewport["'][^>]*>\s*/gi, "")
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta\s+name=["'](?:description|keywords|robots|author|twitter:[^"']+)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["'](?:og:[^"']+|article:[^"']+)["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>\s*/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "")
    .trim();
}

function extractTemplateParts(template) {
  const headMatch = template.match(/<head>([\s\S]*?)<\/head>/i);
  const bodyMatch = template.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!headMatch || !bodyMatch) {
    throw new Error("dist/index.html does not contain a standard <head> and <body>");
  }

  return {
    headRemainder: removeStaticSeoFromHead(headMatch[1]),
    body: bodyMatch[1],
    htmlAttrs: template.match(/<html([^>]*)>/i)?.[1] || ' lang="en" dir="ltr"',
    bodyTag: template.match(/<body([^>]*)>/i)?.[1] || "",
  };
}

function normalizeCanonical(value, routePath) {
  const routeCanonical = `${SITE_URL}${routePath}`;
  if (!value) return routeCanonical;

  try {
    const url = new URL(value, SITE_URL);
    const cleanPath = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    // Canonicals on article pages must self-reference. A stale homepage DB value
    // would reproduce the exact production bug this prerender fixes.
    if (cleanPath !== routePath) return routeCanonical;
    return `${SITE_URL}${cleanPath}${url.search}`;
  } catch {
    return routeCanonical;
  }
}

function normalizeImage(value) {
  if (!value) return DEFAULT_OG_IMAGE;
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return DEFAULT_OG_IMAGE;
  }
}

function buildJsonLd(post, canonical, image, title, description, seoStructuredData) {
  const publishedTime = post.published_at || post.created_at || "";
  const modifiedTime = post.updated_at || publishedTime;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    author: { "@type": "Person", name: "Alhamd Academy" },
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
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  if (seoStructuredData) {
    return JSON.stringify(Array.isArray(seoStructuredData) ? seoStructuredData : [seoStructuredData, article, breadcrumb]);
  }

  return JSON.stringify([article, breadcrumb]);
}

function buildArticleNoscript(post, title, description, canonical) {
  const titleAr = post.title_ar || "";
  const excerptAr = post.excerpt_ar || "";
  const contentEn = sanitiseBodyHtml(post.content_en || post.content_ar || "");
  const contentAr = sanitiseBodyHtml(post.content_ar || "");

  return `<noscript>
    <main style="max-width:760px;margin:0 auto;padding:2rem;font-family:system-ui,-apple-system,sans-serif;line-height:1.7;color:#102840;background:#fff;">
      <nav><a href="/">Home</a> / <a href="/blog">Blog</a></nav>
      <article lang="en">
        <h1>${escapeHtml(title)}</h1>
        ${description ? `<p><strong>${escapeHtml(description)}</strong></p>` : ""}
        ${contentEn ? `<div>${contentEn}</div>` : ""}
        <p><a href="${escapeAttr(canonical)}">Read this article on Alhamd Academy</a></p>
      </article>
      ${titleAr || contentAr ? `<article lang="ar" dir="rtl"><h2>${escapeHtml(titleAr || title)}</h2>${excerptAr ? `<p><strong>${escapeHtml(excerptAr)}</strong></p>` : ""}${contentAr ? `<div>${contentAr}</div>` : ""}</article>` : ""}
    </main>
  </noscript>`;
}

function replaceHomepageNoscript(body, blogNoscript) {
  const homepageNoscriptRe = /<noscript>\s*<div\s+style=["']padding:2rem;text-align:center;font-family:sans-serif;["']>[\s\S]*?<\/div>\s*<\/noscript>/i;
  if (homepageNoscriptRe.test(body)) return body.replace(homepageNoscriptRe, blogNoscript);
  return body.replace('<div id="root"></div>', `${blogNoscript}\n  <div id="root"></div>`);
}

function buildHead(post, seo) {
  const routePath = `/blog/${post.slug}`;
  const canonical = normalizeCanonical(seo?.canonical_url, routePath);
  const titleEn = post.title_en || post.title_ar || "Alhamd Academy Blog";
  const excerptEn = post.excerpt_en || post.excerpt_ar || "Read the latest article from Alhamd Academy.";
  const title = seo?.title || seo?.og_title || `${titleEn} | Alhamd Academy`;
  const description = seo?.description || seo?.og_description || excerptEn;
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = normalizeImage(seo?.og_image || post.featured_image);
  const twitterTitle = seo?.twitter_title || ogTitle;
  const twitterDescription = seo?.twitter_description || ogDescription;
  const twitterImage = normalizeImage(seo?.twitter_image || ogImage);
  const robots = seo?.no_index ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const publishedTime = post.published_at || post.created_at || "";
  const modifiedTime = post.updated_at || publishedTime;
  const jsonLd = buildJsonLd(post, canonical, ogImage, title, description, seo?.structured_data);

  return {
    title,
    description,
    canonical,
    html: `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeAttr(description)}" />
  ${seo?.keywords ? `<meta name="keywords" content="${escapeAttr(seo.keywords)}" />` : ""}
  <meta name="robots" content="${robots}" />
  <meta name="author" content="Alhamd Academy" />
  <link rel="canonical" href="${escapeAttr(canonical)}" />
  <link rel="alternate" hreflang="en" href="${escapeAttr(`${canonical}?lang=en`)}" />
  <link rel="alternate" hreflang="ar" href="${escapeAttr(`${canonical}?lang=ar`)}" />
  <link rel="alternate" hreflang="x-default" href="${escapeAttr(canonical)}" />

  <meta property="og:type" content="${escapeAttr(seo?.og_type || "article")}" />
  <meta property="og:url" content="${escapeAttr(canonical)}" />
  <meta property="og:title" content="${escapeAttr(ogTitle)}" />
  <meta property="og:description" content="${escapeAttr(ogDescription)}" />
  <meta property="og:image" content="${escapeAttr(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeAttr(ogTitle)}" />
  <meta property="og:site_name" content="Alhamd Academy — Online Quran & Arabic Education" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="ar_AR" />
  ${publishedTime ? `<meta property="article:published_time" content="${escapeAttr(publishedTime)}" />` : ""}
  ${modifiedTime ? `<meta property="article:modified_time" content="${escapeAttr(modifiedTime)}" />` : ""}
  <meta property="article:author" content="Alhamd Academy" />

  <meta name="twitter:card" content="${escapeAttr(seo?.twitter_card || "summary_large_image")}" />
  <meta name="twitter:title" content="${escapeAttr(twitterTitle)}" />
  <meta name="twitter:description" content="${escapeAttr(twitterDescription)}" />
  <meta name="twitter:image" content="${escapeAttr(twitterImage)}" />
  <meta name="twitter:image:alt" content="${escapeAttr(twitterTitle)}" />

  <script type="application/ld+json">${jsonLd.replace(/<\//g, "<\\/")}</script>`,
  };
}

function buildBlogHtml(templateParts, post, seo) {
  const head = buildHead(post, seo);
  const noscript = buildArticleNoscript(post, head.title, head.description, head.canonical);
  const body = replaceHomepageNoscript(templateParts.body, noscript);

  return `<!doctype html>
<html${templateParts.htmlAttrs}>
<head>
  ${head.html}

  ${templateParts.headRemainder}
</head>
<body${templateParts.bodyTag}>${body}</body>
</html>
`;
}

function writeBlogSitemap(posts) {
  const urls = posts
    .map((post) => {
      const lastmod = new Date(post.updated_at || post.published_at || post.created_at || Date.now()).toISOString().split("T")[0];
      return `  <url><loc>${SITE_URL}/blog/${escapeHtml(post.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  writeFileSync(resolve(DIST_DIR, "sitemap-blog.xml"), xml);
}

async function main() {
  if (!existsSync(INDEX_PATH)) {
    throw new Error("dist/index.html is missing. Run this script after vite build.");
  }

  const template = readFileSync(INDEX_PATH, "utf8");
  const templateParts = extractTemplateParts(template);
  const [posts, seoMap] = await Promise.all([fetchPublishedPosts(), fetchSeoMetadata()]);

  for (const post of posts) {
    const seo = seoMap.get(`/blog/${post.slug}`) || null;
    const outputPath = resolve(DIST_DIR, "blog", post.slug, "index.html");
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, buildBlogHtml(templateParts, post, seo));
  }

  writeBlogSitemap(posts);
  console.log(`blog prerender generated (${posts.length} post${posts.length === 1 ? "" : "s"})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});