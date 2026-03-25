/**
 * Export Supabase data to local fallback files.
 *
 * Usage:
 *   node scripts/export-fallback.mjs
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually
const envFile = readFileSync(resolve(__dirname, "../.env"), "utf-8");
const env = Object.fromEntries(
  envFile
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  console.log("📥 Fetching SEO metadata...");
  const { data: seoRows } = await supabase.from("seo_metadata").select("*");
  const seoMap = {};
  for (const row of seoRows || []) {
    seoMap[row.page_path] = {
      title: row.title,
      description: row.description,
      keywords: row.keywords,
      canonical_url: row.canonical_url,
      og_title: row.og_title,
      og_description: row.og_description,
      og_image: row.og_image,
      og_type: row.og_type,
      twitter_card: row.twitter_card,
      twitter_title: row.twitter_title,
      twitter_description: row.twitter_description,
      twitter_image: row.twitter_image,
      structured_data: row.structured_data,
      no_index: row.no_index,
    };
  }

  console.log("📥 Fetching teachers...");
  const res = await fetch(`${url}/functions/v1/public-teachers`);
  let teachers = [];
  if (res.ok) {
    const data = await res.json();
    teachers = data.teachers || [];
  }

  // Write JSON exports
  const outDir = resolve(__dirname, "../src/data");

  writeFileSync(
    resolve(outDir, "fallback-seo.json"),
    JSON.stringify(seoMap, null, 2),
    "utf-8"
  );
  console.log(`✅ Wrote fallback-seo.json (${Object.keys(seoMap).length} pages)`);

  writeFileSync(
    resolve(outDir, "fallback-teachers.json"),
    JSON.stringify(teachers, null, 2),
    "utf-8"
  );
  console.log(`✅ Wrote fallback-teachers.json (${teachers.length} teachers)`);

  console.log("\n🎯 Done! Now update src/data/fallbackContent.ts if you want to embed the data directly.");
  console.log("   Or import the JSON files in your fallback layer.");
}

main().catch((e) => {
  console.error("❌ Export failed:", e);
  process.exit(1);
});
