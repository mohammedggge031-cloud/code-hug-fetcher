
# Production-Grade SEO Plan (no framework migration)

## Audit findings (from current code)

- **Rendering**: Pure Vite SPA (React 18 + `react-router-dom` `BrowserRouter`). No SSR. Client-only `SEOHead` mutates `document.head` after hydration.
- **Prerender script**: `scripts/generate-static-pages.mjs` exists and produces `dist/<route>/index.html` with per-page title, description, canonical, OG/Twitter, JSON-LD, breadcrumbs and crawler-visible content — **but it is not wired to any npm script**, so it never runs on Vercel builds. Also hardcodes `https://alhamdacademy.net` (non-www).
- **index.html**: Rich head (canonical `www`, Organization + WebSite + FAQPage JSON-LD, OG/Twitter, favicons). Good baseline for `/`, but every other route currently ships this identical head to first-load crawlers.
- **Routing**: 30+ static routes in `src/App.tsx` + dynamic `/blog/:id`, `/courses/:slug`, `/:slug` (locations). Blog list must come from Supabase; locations come from `src/data/locations.ts`; courses from `src/data/courses.ts`.
- **Sitemaps**: `public/sitemap.xml` (index) + `sitemap-main.xml`, `sitemap-locations.xml`, plus dynamic `/sitemap-blog.xml` via Supabase Edge Function (already deployed, `www` host, rewrites in `vercel.json`). Good.
- **Vercel**: 301 non-www → www, SPA rewrite last, `X-Robots-Tag: noindex` on `/admin/*`. Good.
- **Hreflang**: Only `en` in `index.html`. Site is English-only in code (Arabic UI is client-toggled, same URL). Correct as-is; do not add fake `ar` alternates.
- **Runtime SEO**: `SEOHead` + `useSeoMetadata` pull DB overrides per `page_path`. Kept as source of truth for client-visible tags and admin edits.

## Architecture decision

**Keep Vite + React SPA. Wire the existing `scripts/generate-static-pages.mjs` into the Vercel build.** This delivers exactly what Googlebot needs (correct `<title>`, `<meta description>`, canonical, OG, JSON-LD and body content in the first HTML response for every important route) with zero user-facing changes and zero framework migration. `SEOHead`'s runtime overrides continue to work on hydration.

Rejected alternatives:
- **Next.js / Remix migration**: rewrites the entire app, breaks Supabase client patterns and admin dashboard, huge regression surface — not justified when prerender achieves the same crawler outcome.
- **Vite SSR (`vite-plugin-ssr` / vike)**: real SSR requires per-request runtime, incompatible with current Vercel static setup and Supabase client-side auth; overkill for a mostly-static marketing site with a client-side admin.
- **`react-snap` / Puppeteer prerender**: heavier, slower builds, flaky in Vercel; the existing hand-written generator is deterministic and already tuned to the app.

## Implementation

### 1. Fix and extend `scripts/generate-static-pages.mjs`
- Change `DOMAIN` to `https://www.alhamdacademy.net` (matches canonical and sitemaps).
- Add missing routes so every indexable route in `src/App.tsx` gets a prerendered `index.html`: `/`, `/blog`, `/videos`, `/free-trial`, `/trial-registration` (noindex), `/privacy-policy`, all `/quran-classes-*`, `/best-online-quran-classes`, `/one-on-one-quran-classes`, `/learn-quran-*`, `/noorani-qaida-online`, plus dynamic:
  - `/courses/:slug` — iterate `src/data/courses.ts`.
  - `/:slug` locations — iterate `src/data/locations.ts`.
  - `/blog/:id` — fetch published rows from Supabase at build time (public anon key from env; skip gracefully if unavailable and log a warning so the build still succeeds).
- Ensure each generated page has: correct `<title>`, `<meta description>`, `<link rel="canonical">`, `og:*` (with `og:url`), `twitter:*`, page-specific JSON-LD (`BreadcrumbList` everywhere; `Article` for blog; `Course` for `/courses/:slug`; `Service` for landing pages), and crawler-visible `<main>` body content.
- Add `<meta name="robots" content="noindex">` for `/trial-registration` and any funnel-only routes.

### 2. Wire prerender to build
- `package.json`: `"build": "vite build && node scripts/generate-static-pages.mjs"`.
- Keep `"build:dev"` unchanged.
- Vercel's `buildCommand` (`npm run build`) picks it up automatically — no `vercel.json` change.

### 3. Preserve runtime behavior
- `SEOHead` stays as-is: it re-syncs tags after hydration and applies DB `seo_metadata` overrides. Since we already deduplicate canonicals in `SEOHead`, the prerendered tag is safely replaced client-side without leaving duplicates.
- No UI, no styling, no logic changes.

### 4. Verification
- Local: `npm run build` and grep `dist/online-quran-classes/index.html`, `dist/blog/index.html`, `dist/courses/quran-course/index.html`, and one location page for correct `<title>`, canonical, OG, JSON-LD.
- `npm run test:sitemap` for sitemap health.
- Smoke: `curl -A "Googlebot" https://www.alhamdacademy.net/online-quran-classes` after deploy should return route-specific metadata pre-hydration.

## Technical details

Files touched:
- `scripts/generate-static-pages.mjs` — expand route list, add dynamic Supabase blog fetch, fix `DOMAIN`, add Course/Service schema.
- `package.json` — `build` script.

No changes to: `src/**` UI/logic, `vercel.json`, `vite.config.ts`, `index.html`, Supabase schema, edge functions, admin dashboard, or sitemap files.

## Risks

- **Blog fetch at build time**: if Supabase is unreachable during Vercel build, blog `/blog/:id` prerender is skipped (routes still work client-side via SPA fallback). Non-blocking.
- **Route drift**: new routes added to `App.tsx` won't be prerendered until added to the script. Mitigation: README note in the script header + comment listing the source of truth.
- **HTML template edits**: prerender uses regex replace on `index.html` from `dist`; any structural change to head tag format could break the replace. Mitigation: script asserts each replace matched and fails loudly.

## Expected outcome

- Lighthouse SEO **100** on every route (already close; per-page metadata pushes remaining gains).
- Googlebot receives full, correct metadata + rendered content on first byte for **every** indexable route.
- Rich-result eligibility for FAQPage (home), Article (blog), Course (courses), BreadcrumbList (all).
- Zero user-visible change: React hydrates over the prerendered HTML exactly as before.

Confidence: **90%**. Only unknown is Supabase reachability from Vercel build; script degrades gracefully if not.
