# Alhamd Academy — Online Quran, Arabic & Islamic Studies

A production-grade, fully independent web application built with **React + Vite + TypeScript + Tailwind CSS**, backed by **Supabase** for database, auth, and edge functions.

---

## 🏗️ Architecture

```
Frontend (React SPA)
  ├── Vite build system
  ├── React Router (client-side routing)
  ├── Tailwind CSS + shadcn/ui
  └── Supabase JS Client
        ↓
Backend (Supabase)
  ├── PostgreSQL Database (tables: seo_metadata, teachers, blog_posts, etc.)
  ├── Auth (email + roles via user_roles table)
  ├── Edge Functions (supabase/functions/)
  └── Storage (media assets)
```

## 🚀 Quick Start (Self-Hosted / Independent from Lovable)

### Prerequisites
- Node.js 18+
- A Supabase project (free tier works)

### 1. Clone & Install
```bash
git clone <your-github-repo-url>
cd <project-folder>
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
```

### 3. Set Up Supabase Database
All migration files are in `supabase/migrations/`. Apply them:
```bash
npx supabase db push
```
Or import them manually via Supabase Dashboard → SQL Editor.

### 4. Deploy Edge Functions
```bash
npx supabase functions deploy
```

### 5. Run Locally
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```
Output goes to `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, etc.)..

---

## 📁 What's in the Repository (GitHub)

| Path | Description |
|------|-------------|
| `src/` | Full frontend application (React components, pages, hooks, utils) |
| `supabase/migrations/` | All database schema migrations (tables, RLS policies, functions) |
| `supabase/functions/` | Edge Functions (server-side logic) |
| `supabase/config.toml` | Supabase project configuration |
| `vercel.json` | Deployment config with security headers (CSP, X-Frame-Options) |
| `public/` | Static assets (favicon, robots.txt, sitemaps) |
| `.env` | Environment variables (not committed — you create this) |

## 🗄️ What Lives in Supabase (Runtime Data)

These are **not** in the codebase — they live in your Supabase database:

| Table | Purpose |
|-------|---------|
| `seo_metadata` | SEO titles, descriptions, OG tags per page (managed via admin dashboard) |
| `teachers` | Teacher profiles (managed via admin or direct DB) |
| `blog_posts` | Blog articles (managed via admin dashboard) |
| `blog_categories` | Blog categories |
| `media_assets` | Uploaded media files metadata |
| `custom_scripts` | Injected scripts (analytics, etc.) |
| `user_roles` | Admin/editor role assignments |

> **Important**: All content is fetched from Supabase at runtime. The code contains **no hardcoded fallback data**. If Supabase is unreachable, pages render with their code-level defaults (titles, descriptions passed as props).

## 🔒 Security

- **XSS Prevention**: DOMPurify sanitizes all HTML content (`src/lib/sanitize.ts`)
- **Form Validation**: Zod schemas (`src/lib/formValidation.ts`) with honeypot + rate limiting
- **CSP Headers**: Configured in `vercel.json`
- **Auth**: Supabase Auth with role-based access (admin/editor) via `user_roles` table
- **RLS**: Row Level Security enabled on all tables

## ⚡ Performance

- Lazy-loaded page routes and below-fold sections
- `DeferredSection` with IntersectionObserver for viewport-based rendering
- Hero image eager-loaded, all others lazy
- Terser minification with console stripping in production
- Manual chunk splitting (vendor-react, vendor-router)

## 🔧 Deploying to Vercel (or any host)

1. Connect your GitHub repo to Vercel
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Build command: `npm run build`
4. Output directory: `dist`
5. **Clear build cache** on first deploy

## 🛠️ Admin Dashboard

Access at `/admin/login`. Requires a user with `admin` role in the `user_roles` table.

Features:
- Blog management (create/edit/delete posts)
- SEO metadata management (per-page titles, descriptions, OG tags)
- Media library
- Categories management
- Custom scripts injection
- User roles management

---

## 📋 Independence Checklist

- ✅ All code is in GitHub
- ✅ All database schema is in `supabase/migrations/`
- ✅ All edge functions are in `supabase/functions/`
- ✅ No dependency on Lovable platform for runtime
- ✅ No hardcoded fallback data — Supabase is the single source of truth
- ✅ Can be deployed to any static hosting provider
- ✅ Can connect to any Supabase project with the right env vars
