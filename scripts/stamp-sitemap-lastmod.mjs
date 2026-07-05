#!/usr/bin/env node
/**
 * Prebuild hook: stamps every <lastmod> in the static sitemaps
 * (sitemap-main.xml, sitemap-locations.xml) to today's date, so Google
 * sees a fresh signal after every deploy without hand-editing dates.
 *
 * The blog sitemap is static in this published app so the Lovable SEO scanner
 * can validate all child sitemaps on the Lovable-managed project domain.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const today = new Date().toISOString().split("T")[0];
const files = ["public/sitemap.xml", "public/sitemap-main.xml", "public/sitemap-locations.xml"];

// Canonical production domain. Every <loc>/<image:loc> in the static
// sitemaps must use this — never the Lovable staging subdomain, which
// 301-redirects to www.alhamdacademy.net and wastes crawl budget.
const CANONICAL_ORIGIN = "https://www.alhamdacademy.net";
const STALE_ORIGIN_RE = /https?:\/\/(?:[a-z0-9-]+\.)*lovable\.app/gi;

let touched = 0;
for (const rel of files) {
  const path = resolve(process.cwd(), rel);
  if (!existsSync(path)) continue;
  const src = readFileSync(path, "utf8");
  let next = src.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  next = next.replace(STALE_ORIGIN_RE, CANONICAL_ORIGIN);
  if (next !== src) {
    writeFileSync(path, next);
    touched += 1;
    console.log(`stamped ${rel} → ${today} (origin normalized to ${CANONICAL_ORIGIN})`);
  }
}
console.log(`sitemap lastmod stamped (${touched} file${touched === 1 ? "" : "s"})`);
