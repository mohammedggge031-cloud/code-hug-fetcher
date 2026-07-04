/**
 * Build-time Static Page Generator
 * Runs after vite build. Reads routes from src/App.tsx directly.
 * Reads seo_metadata and blog_posts from Supabase.
 * Generates dist/<route>/index.html for every route and blog post.
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
const DEFAULT_TITLE = "Alhamd Academy | Online Quran, Arabic & Islamic Studies";
const DEFAULT_DESCRIPTION = "Learn Quran, Tajweed, Arabic and Islamic Studies online with certified Egyptian teachers. Book a free trial today.";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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
  for (const p of rawPaths) {
    if (!p || p === "*" || p === "/404") continue;
    if (p === "/admin" || p.startsWith("admin") || p === "login") continue;
    if (!p.startsWith("/")) continue;
    if (!p.includes(":")) staticRoutes.push(p);
  }
  return staticRoutes;
}

async function fetchSeoMetadata(supabase) {
  if (!supabase) return new Map();
  const { data, error } = await supabase
    .from("seo_metadata")
    .select("page_path,title,description,canonical_url,og_title,og_description,og_image,no_index");
  if (error) { console.warn("[prerender] seo_metadata fetch failed:", error.message); return new Map(); }
  const map = new Map();
  for (const row of data ?? []) map.set(row.page_path, row);
  console.log(`[prerender] Loaded ${map.size} seo_metadata rows`);
  return map;
}

async function fetchBlogPosts(supabase) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug,title_en,title_ar,excerpt_en,excerpt_ar,featured_image")
    .eq("status", "published");
  if (error) { console.warn("[prerender] blog_posts fetch failed:", error.message); return []; }
  console.log(`[prerender] Loaded ${data?.length ?? 0} published blog posts`);
  return data ?? [];
}

const escapeHtml = (s = "") =>
  String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

function applyMetadata(template, { title, description, canonical, ogTitle, ogDescription, ogImage, noIndex }) {
  const robots = noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${robots}" />`);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" />`);
  html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(ogTitle || title)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(ogDescription || description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${escapeHtml(canonical)}" />`);
  html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${escapeHtml(ogImage || DEFAULT_OG_IMAGE)}" />`);
  return html;
}

async function writeRoute(template, routePath, meta) {
  const html = applyMetadata(template, meta);
  const outDir = routePath === "/" ? DIST : path.join(DIST, ...routePath.split("/").filter(Boolean));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

async function main() {
  const template = await fs.readFile(TEMPLATE_PATH, "utf8").catch(() => {
    throw new Error(`Missing ${TEMPLATE_PATH} — run vite build first.`);
  });

  const rawPaths = await extractRoutesFromRouter();
  const staticRoutes = classifyRoutes(rawPaths);
  console.log(`[prerender] Found ${staticRoutes.length} static routes`);

  let supabase = null;
  if (SUPABASE_URL && SUPABASE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } else {
    console.warn("[prerender] Supabase env vars not set — using fallback metadata only.");
  }

  const [seoMap, blogPosts] = await Promise.all([
    fetchSeoMetadata(supabase),
    fetchBlogPosts(supabase),
  ]);

  let written = 0;

  for (const routePath of staticRoutes) {
    const db = seoMap.get(routePath);
    const canonical = `${SITE_ORIGIN}${routePath === "/" ? "" : routePath}`;
    await writeRoute(template, routePath, {
      title: db?.title || DEFAULT_TITLE,
      description: db?.description || DEFAULT_DESCRIPTION,
      canonical,
      ogTitle: db?.og_title || db?.title || DEFAULT_TITLE,
      ogDescription: db?.og_description || db?.description || DEFAULT_DESCRIPTION,
      ogImage: db?.og_image || DEFAULT_OG_IMAGE,
      noIndex: db?.no_index ?? false,
    });
    written++;
  }

  for (const post of blogPosts) {
    if (!post.slug) continue;
    const routePath = `/blog/${post.slug}`;
    const db = seoMap.get(routePath);
    const canonical = `${SITE_ORIGIN}${routePath}`;
    await writeRoute(template, routePath, {
      title: db?.title || post.title_en || post.title_ar || DEFAULT_TITLE,
      description: db?.description || post.excerpt_en || post.excerpt_ar || DEFAULT_DESCRIPTION,
      canonical,
      ogTitle: db?.og_title || post.title_en || post.title_ar || DEFAULT_TITLE,
      ogDescription: db?.og_description || post.excerpt_en || post.excerpt_ar || DEFAULT_DESCRIPTION,
      ogImage: db?.og_image || post.featured_image || DEFAULT_OG_IMAGE,
      noIndex: false,
    });
    written++;
  }

  console.log(`[prerender] ✅ Generated ${written} HTML files in dist/`);
}

main().catch((err) => {
  console.error("[prerender] FAILED:", err);
  process.exit(1);
});
