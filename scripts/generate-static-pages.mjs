/**
 * Build-time Static Page Generator
 * ---------------------------------
 * Runs after `vite build` and produces one prerendered `dist/<route>/index.html`
 * for every real route in the SPA, so crawlers see a correct per-page
 * <title>, <meta description>, <link rel=canonical>, and og:* on first byte.
 *
 * How it stays in sync with the app:
 *   1. Routes are parsed directly from `src/App.tsx` — never hardcoded here.
 *      Any <Route path="..."> added to the router is picked up automatically.
 *   2. Per-page metadata is read live from the `seo_metadata` Supabase table
 *      using the same VITE_SUPABASE_* env the client uses.
 *   3. Blog posts are enumerated from `blog_posts` (status = 'published') and
 *      each becomes `dist/blog/<slug>/index.html`.
 *
 * The static HTML is then hydrated by React at runtime — SEOHead.tsx will
 * re-apply DB overrides on the client, but crawlers already have the truth.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const APP_TSX = path.join(ROOT, "src", "App.tsx");
const TEMPLATE_PATH = path.join(DIST, "index.html");

loadEnv({ path: path.join(ROOT, ".env") });

const SITE_ORIGIN = "https://www.alhamdacademy.net";
const DEFAULT_TITLE = "Alhamd Academy | Online Quran, Arabic & Islamic Studies Academy";
const DEFAULT_DESCRIPTION =
  "Learn Quran, Tajweed, Arabic and Islamic Studies online with certified Egyptian teachers. Book a free trial today.";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// ---------------------------------------------------------------------------
// 1. Extract the exact routes declared in src/App.tsx
// ---------------------------------------------------------------------------
async function extractRoutesFromRouter() {
  const source = await fs.readFile(APP_TSX, "utf8");
  const paths = new Set();
  const re = /<Route\s+[^>]*path=["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(source)) !== null) paths.add(m[1]);
  return [...paths];
}

function classifyRoutes(rawPaths) {
  const staticRoutes = [];
  const dynamicRoutes = [];
  for (const p of rawPaths) {
    if (!p || p === "*" || p === "/404") continue;
    // Skip admin surface entirely — X-Robots-Tag noindex + not for crawlers.
    if (p === "/admin" || p.startsWith("admin") || p === "login") continue;
    // Nested admin children (e.g. "leads", "blog", "seo") — no leading slash.
    if (!p.startsWith("/")) continue;
    if (p.includes(":")) dynamicRoutes.push(p);
    else staticRoutes.push(p);
  }
  return { staticRoutes, dynamicRoutes };
}

// ---------------------------------------------------------------------------
// 2. Load per-page overrides from Supabase (seo_metadata)
// ---------------------------------------------------------------------------
async function fetchSeoMetadata(supabase) {
  if (!supabase) return new Map();
  const { data, error } = await supabase
    .from("seo_metadata")
    .select(
      "page_path,title,description,canonical_url,og_title,og_description,og_image,og_type,twitter_card,twitter_title,twitter_description,twitter_image,no_index,keywords,structured_data",
    );
  if (error) {
    console.warn(`[prerender] seo_metadata fetch failed: ${error.message}`);
    return new Map();
  }
  const map = new Map();
  for (const row of data ?? []) map.set(row.page_path, row);
  console.log(`[prerender] Loaded ${map.size} seo_metadata rows`);
  return map;
}

async function fetchBlogPosts(supabase) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug,title_en,title_ar,excerpt_en,excerpt_ar,featured_image,published_at,updated_at")
    .eq("status", "published");
  if (error) {
    console.warn(`[prerender] blog_posts fetch failed: ${error.message}`);
    return [];
  }
  console.log(`[prerender] Loaded ${data?.length ?? 0} published blog posts`);
  return data ?? [];
}

// ---------------------------------------------------------------------------
// 3. HTML rewriting helpers
// ---------------------------------------------------------------------------
const escapeHtml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function normalizeCanonical(input, routePath) {
  const base = SITE_ORIGIN;
  const fallback = `${base}${routePath === "/" ? "/" : routePath.replace(/\/$/, "")}`;
  try {
    const u = new URL(input || fallback, base);
    const p = u.pathname === "/" ? "/" : u.pathname.replace(/\/$/, "");
    return `${base}${p}${u.search || ""}`;
  } catch {
    return fallback;
  }
}

function upsertTag(html, matcher, replacement) {
  if (matcher.test(html)) return html.replace(matcher, replacement);
  return html.replace(/<\/head>/i, `  ${replacement}\n</head>`);
}

function applyMetadata(template, meta) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  const ogTitle = escapeHtml(meta.ogTitle);
  const ogDescription = escapeHtml(meta.ogDescription);
  const ogImage = escapeHtml(meta.ogImage);
  const ogType = escapeHtml(meta.ogType);
  const twCard = escapeHtml(meta.twitterCard);
  const twTitle = escapeHtml(meta.twitterTitle);
  const twDesc = escapeHtml(meta.twitterDescription);
  const twImage = escapeHtml(meta.twitterImage);
  const robots = meta.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  html = upsertTag(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${robots}" />`,
  );
  html = upsertTag(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );

  html = upsertTag(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${ogTitle}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${ogDescription}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${ogType}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${ogImage}" />`,
  );

  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:card["'][^>]*>/i,
    `<meta name="twitter:card" content="${twCard}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${twTitle}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${twDesc}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${twImage}" />`,
  );

  if (meta.structuredData) {
    const json = JSON.stringify(meta.structuredData).replace(/</g, "\\u003c");
    html = html.replace(
      /<\/head>/i,
      `  <script type="application/ld+json" data-seo-jsonld>${json}</script>\n</head>`,
    );
  }

  return html;
}

// ---------------------------------------------------------------------------
// 4. Metadata resolution — DB row first, sensible fallbacks second
// ---------------------------------------------------------------------------
function resolveMeta(routePath, dbRow, overrides = {}) {
  const title = overrides.title || dbRow?.title || DEFAULT_TITLE;
  const description = overrides.description || dbRow?.description || DEFAULT_DESCRIPTION;
  const canonical = normalizeCanonical(
    overrides.canonical || dbRow?.canonical_url || `${SITE_ORIGIN}${routePath}`,
    routePath,
  );
  return {
    title,
    description,
    canonical,
    ogTitle: overrides.ogTitle || dbRow?.og_title || title,
    ogDescription: overrides.ogDescription || dbRow?.og_description || description,
    ogImage: overrides.ogImage || dbRow?.og_image || DEFAULT_OG_IMAGE,
    ogType: dbRow?.og_type || overrides.ogType || "website",
    twitterCard: dbRow?.twitter_card || "summary_large_image",
    twitterTitle: dbRow?.twitter_title || overrides.ogTitle || title,
    twitterDescription: dbRow?.twitter_description || overrides.ogDescription || description,
    twitterImage: dbRow?.twitter_image || overrides.ogImage || dbRow?.og_image || DEFAULT_OG_IMAGE,
    noIndex: overrides.noIndex ?? dbRow?.no_index ?? false,
    structuredData: overrides.structuredData || dbRow?.structured_data || null,
  };
}

// ---------------------------------------------------------------------------
// 5. Emit a single file
// ---------------------------------------------------------------------------
async function writeRoute(template, routePath, meta) {
  const html = applyMetadata(template, meta);
  const outDir =
    routePath === "/" ? DIST : path.join(DIST, ...routePath.split("/").filter(Boolean));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

// ---------------------------------------------------------------------------
// 6. Main
// ---------------------------------------------------------------------------
async function main() {
  const template = await fs.readFile(TEMPLATE_PATH, "utf8").catch(() => {
    throw new Error(`Missing ${TEMPLATE_PATH} — run \`vite build\` first.`);
  });

  const rawPaths = await extractRoutesFromRouter();
  const { staticRoutes, dynamicRoutes } = classifyRoutes(rawPaths);
  console.log(
    `[prerender] Router parsed: ${staticRoutes.length} static, ${dynamicRoutes.length} dynamic`,
  );

  let supabase = null;
  if (SUPABASE_URL && SUPABASE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } else {
    console.warn(
      "[prerender] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY not set — using fallback metadata only.",
    );
  }

  const [seoMap, blogPosts] = await Promise.all([
    fetchSeoMetadata(supabase),
    fetchBlogPosts(supabase),
  ]);

  let written = 0;

  // Static routes
  for (const routePath of staticRoutes) {
    const overrides =
      routePath === "/trial-registration" ? { noIndex: true } : {};
    const meta = resolveMeta(routePath, seoMap.get(routePath), overrides);
    await writeRoute(template, routePath, meta);
    written += 1;
  }

  // Blog posts → /blog/<slug>/index.html
  for (const post of blogPosts) {
    if (!post.slug) continue;
    const routePath = `/blog/${post.slug}`;
    const dbRow = seoMap.get(routePath) || seoMap.get(`/blog/${post.slug}/`);
    const meta = resolveMeta(routePath, dbRow, {
      title: post.title_en || post.title_ar,
      description: post.excerpt_en || post.excerpt_ar || DEFAULT_DESCRIPTION,
      ogImage: post.featured_image || undefined,
      ogType: "article",
    });
    await writeRoute(template, routePath, meta);
    written += 1;
  }

  console.log(`[prerender] Generated ${written} static HTML files in dist/`);
}

main().catch((err) => {
  console.error("[prerender] FAILED:", err);
  process.exit(1);
});
