#!/usr/bin/env node
/**
 * Sitemap smoke test.
 *
 * Verifies that the live sitemap index and all referenced child sitemaps
 * (including the dynamic blog sitemap served by the Supabase edge function)
 * respond with valid XML and at least one <url> or <sitemap> entry.
 *
 * Usage:
 *   node scripts/sitemap-smoke-test.mjs
 *   SITEMAP_BASE_URL=https://www.alhamdacademy.net node scripts/sitemap-smoke-test.mjs
 *
 * Exit code 0 = all good, 1 = failure (suitable for CI / post-deploy hooks).
 */

const BASE = (process.env.SITEMAP_BASE_URL || "https://www.alhamdacademy.net").replace(/\/$/, "");
const INDEX_URL = `${BASE}/sitemap.xml`;
const TIMEOUT_MS = 15_000;

async function fetchText(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: "follow" });
    const text = await res.text();
    return { status: res.status, contentType: res.headers.get("content-type") || "", text };
  } finally {
    clearTimeout(timer);
  }
}

function extractTags(xml, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g");
  const out = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}

const failures = [];
function fail(url, msg) {
  failures.push(`✗ ${url} — ${msg}`);
  console.error(`✗ ${url} — ${msg}`);
}
function ok(url, msg) {
  console.log(`✓ ${url} — ${msg}`);
}

async function checkChild(url) {
  try {
    const { status, contentType, text } = await fetchText(url);
    if (status !== 200) return fail(url, `HTTP ${status}`);
    if (!/xml/i.test(contentType)) return fail(url, `unexpected content-type: ${contentType}`);
    if (!text.includes("<urlset")) return fail(url, "missing <urlset> root");
    const urls = extractTags(text, "loc");
    if (urls.length === 0) return fail(url, "no <loc> entries found");
    ok(url, `${urls.length} URLs`);
  } catch (e) {
    fail(url, `fetch error: ${e.message}`);
  }
}

async function main() {
  console.log(`Sitemap smoke test → ${INDEX_URL}\n`);

  let indexText;
  try {
    const { status, contentType, text } = await fetchText(INDEX_URL);
    if (status !== 200) return fail(INDEX_URL, `HTTP ${status}`);
    if (!/xml/i.test(contentType)) return fail(INDEX_URL, `unexpected content-type: ${contentType}`);
    if (!text.includes("<sitemapindex")) return fail(INDEX_URL, "missing <sitemapindex> root");
    indexText = text;
    ok(INDEX_URL, "valid sitemap index");
  } catch (e) {
    fail(INDEX_URL, `fetch error: ${e.message}`);
  }

  if (indexText) {
    const children = extractTags(indexText, "loc");
    if (children.length === 0) fail(INDEX_URL, "no child sitemaps listed");
    for (const child of children) {
      // eslint-disable-next-line no-await-in-loop
      await checkChild(child);
    }
  }

  console.log("");
  if (failures.length > 0) {
    console.error(`FAILED: ${failures.length} issue(s)`);
    process.exit(1);
  }
  console.log("All sitemap checks passed.");
}

main().catch((e) => {
  console.error("Smoke test crashed:", e);
  process.exit(1);
});
