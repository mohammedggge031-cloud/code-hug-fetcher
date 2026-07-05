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

let touched = 0;
for (const rel of files) {
  const path = resolve(process.cwd(), rel);
  if (!existsSync(path)) continue;
  const src = readFileSync(path, "utf8");
  const next = src.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  if (next !== src) {
    writeFileSync(path, next);
    touched += 1;
    console.log(`stamped ${rel} → ${today}`);
  }
}
console.log(`sitemap lastmod stamped (${touched} file${touched === 1 ? "" : "s"})`);
