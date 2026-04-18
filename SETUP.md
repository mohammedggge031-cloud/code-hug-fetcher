# Alhamd Academy — Local Setup Guide

Complete instructions to run this project on your laptop.

## 1. Prerequisites
- Node.js 18+ and npm (or bun)
- Supabase CLI: `npm i -g supabase`
- A Supabase account (free tier OK) — or use the existing project

## 2. Install dependencies
```bash
npm install
```

## 3. Environment variables
Copy `.env.example` → `.env`:
```bash
cp .env.example .env
```
Values are pre-filled for the existing project. To use your own Supabase, replace the URL/keys.

## 4. Database setup
The full schema is in **`database-full-schema.sql`** (combined from all migrations).

**Option A — Use existing remote project**: skip this step, it's already applied.

**Option B — Fresh project**: open Supabase Dashboard → SQL Editor → paste contents of `database-full-schema.sql` → Run.

**Option C — Via CLI**:
```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## 5. Deploy edge functions
```bash
supabase login
supabase link --project-ref rihxkjhgipmqqihuljah   # or your own
supabase functions deploy --no-verify-jwt
```
Or one-by-one:
```bash
supabase functions deploy admin-create-user --no-verify-jwt
supabase functions deploy admin-delete-user --no-verify-jwt
supabase functions deploy admin-update-permissions --no-verify-jwt
supabase functions deploy admin-reset-password --no-verify-jwt
supabase functions deploy get-user-by-email --no-verify-jwt
supabase functions deploy list-user-emails --no-verify-jwt
supabase functions deploy confirm-user-email --no-verify-jwt
supabase functions deploy bulk-insert-posts --no-verify-jwt
supabase functions deploy public-teachers --no-verify-jwt
supabase functions deploy translate-content --no-verify-jwt
supabase functions deploy indexnow-ping --no-verify-jwt
```

Set required secrets:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<from Dashboard → Settings → API>
supabase secrets set LOVABLE_API_KEY=<optional, for translate-content>
```

## 6. Run locally
```bash
npm run dev
```
Open http://localhost:8080

## 7. Build for production
```bash
npm run build
```
Deploy `dist/` to Vercel, Netlify, Cloudflare Pages, etc.

## 8. Admin access
- URL: `/admin/login`
- Owner email is hardcoded protected: `info@alhamdacademy.net`
- New admins can be created from `/admin/users` (uses `admin-create-user` edge function)

## Edge functions overview
| Function | Purpose |
|---|---|
| `admin-create-user` | Owner creates new dashboard users |
| `admin-delete-user` | Owner deletes users (owner email protected) |
| `admin-update-permissions` | Owner edits roles + granular permissions |
| `admin-reset-password` | Super admin resets passwords |
| `get-user-by-email` | Admin lookup/create user by email |
| `list-user-emails` | Admin lists all user emails |
| `confirm-user-email` | Auto-confirm email on signup |
| `bulk-insert-posts` | Bulk import blog posts |
| `public-teachers` | Public read of teachers from external Supabase |
| `translate-content` | AI translation via Lovable Gateway |
| `indexnow-ping` | SEO IndexNow ping |

## Folder structure
```
src/                      # React app (frontend + admin dashboard)
supabase/
  functions/              # 11 edge functions
  migrations/             # SQL migrations (history)
  config.toml             # Supabase project config
database-full-schema.sql  # Combined SQL (tables + policies + functions)
.env.example              # Environment template
public/                   # Static assets, sitemaps, robots.txt
vercel.json               # Deployment config
```
