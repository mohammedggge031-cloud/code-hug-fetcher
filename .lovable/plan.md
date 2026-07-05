# Full SEO & Build Audit — Alhamd Academy

## What's working

- Blog-post prerender (`/blog/:slug`) is healthy for both humans and Googlebot: correct `<title>`, `canonical`, `og:*`, JSON-LD, and the SPA still hydrates.
- Homepage `index.html` has clean title, description, canonical, og, twitter, robots, JSON-LD (Organization, WebSite, FAQPage), favicons, manifest.
- `robots.txt` is well structured (Cloudflare content signals, admin disallow, sitemap references).
- `/sitemap-blog.xml` is now served fresh from the Supabase edge function with correct `www.alhamdacademy.net` URLs.
- HTTPS, HSTS, CSP, X-Content-Type-Options headers all present.

## Critical issues found

### 1. Sitemaps advertise the wrong domain (80 occurrences)

- `public/sitemap.xml` (the index) — 3 child sitemaps listed as `https://code-hug-fetcher.lovable.app/...`
- `public/sitemap-main.xml` — 30 URLs (homepage, courses, service pages)
- `public/sitemap-locations.xml` — 42 URLs (country/city landing pages)

Live output confirms Google is currently being told the canonical domain is the Lovable staging URL, which 301-redirects to the real domain. This wastes crawl budget, splits signals, and can leave pages un-indexed.

### 2. Non-blog routes serve the homepage's title & canonical

`/blog`, `/courses/*`, `/online-quran-classes`, all `/learn-quran-online-*` location pages, etc. all return the static `index.html` unchanged. Social crawlers (Facebook, LinkedIn, WhatsApp, X) and non-JS scrapers see:

- `<title>Alhamd Academy | Online Quran, Arabic & Islamic Studies</title>`
- `canonical → https://www.alhamdacademy.net/`
- `og:url → https://www.alhamdacademy.net/`

So share previews and any non-JS crawler attribute every page to the homepage.

### 3. Rename-fragile setup

Domain is hard-coded in ~80 places across static XML. Any future domain change repeats the same class of bug.

## Plan

### Step 1 — Fix all static sitemap URLs (critical, ~2 min)

Run one-shot rewrite over the three files:

- `public/sitemap.xml`
- `public/sitemap-main.xml`
- `public/sitemap-locations.xml`

Replace every `https://code-hug-fetcher.lovable.app` → `https://www.alhamdacademy.net`.

### Step 2 — Make the prebuild script domain-aware (prevents regression)

Extend `scripts/stamp-sitemap-lastmod.mjs` so it also normalises the base URL to the canonical domain on every build. One `BASE_URL` constant at the top of the script, one extra `String.replace` per file. Adds ~5 lines, makes domain drift impossible on future builds.

### Step 3 — Extend runtime prerender to all SEO-critical non-blog routes

Reuse the existing `api/prerender.ts` mechanism for every route that has a row in `seo_metadata`. Two small changes:

1. Add a generic `api/prerender.ts` path branch: when `path` is provided (not `slug`), fetch `seo_metadata` for that path and inject the row's title/description/canonical/og/twitter into the SPA `index.html` template. Blog posts continue to use the existing `slug` branch (which also fetches `blog_posts`).
2. Add a `vercel.json` rewrite for the SEO-critical routes to `/api/prerender?path=/…`. Scope: `/`, `/blog`, `/courses/:slug`, `/online-quran-classes`, `/tajweed-course-online`, `/quran-memorization-hifz`, `/arabic-for-kids`, `/arabic-for-adults`, `/islamic-studies-online`, `/ijazah-program`, `/female-quran-teacher`, `/free-trial`, `/videos`, and all `/learn-quran-online-*` + `/quran-classes-*` + `/noorani-qaida-online` landing pages.

React continues to mount unchanged; only the head tags are per-route. Newly added `seo_metadata` rows apply instantly with no rebuild.

### Step 4 — Re-verify against production

After deploy, curl-check with a normal UA and a Googlebot UA:

- Every sitemap `<loc>` uses `www.alhamdacademy.net`.
- `/blog`, `/courses/quran-course`, and a location page each return their own `<title>` and self-referencing `canonical`.
- One blog post still returns its Article JSON-LD (regression check).

## Technical details

- `api/prerender.ts` already fetches `seo_metadata` on the blog path and knows how to inject into the `<head>` regex-safely without breaking the built asset script tags. The path branch reuses `injectMeta()` with a lighter meta bundle (no Article JSON-LD, `og:type=website`).
- Homepage's `canonical` and `og:url` self-reference already, so rewriting `/` through the prerender is a no-op when no `seo_metadata` row exists — safe default.
- The stamp script runs in `predev` + `prebuild`, so both preview and prod are covered.
- Nothing about content, styles, admin, or Supabase schema changes.

## Out of scope

- Regenerating blog featured images / og-image variants.
- Adding new SEO copy or landing pages.
- Migrating away from the current stack (no SSR framework change).
