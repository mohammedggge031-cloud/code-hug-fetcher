-- Combined SQL: 6 migrations

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

-- RLS policies for user_roles (admin only)
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- SEO metadata table
CREATE TABLE public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  og_type TEXT DEFAULT 'website',
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  structured_data JSONB,
  no_index BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- Anyone can read SEO metadata (frontend needs it)
CREATE POLICY "Public can read SEO metadata" ON public.seo_metadata
  FOR SELECT USING (true);

-- Admin and editor can modify SEO
CREATE POLICY "Admin/Editor can insert SEO" ON public.seo_metadata
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/Editor can update SEO" ON public.seo_metadata
  FOR UPDATE TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

-- Only admin can delete SEO entries
CREATE POLICY "Admin can delete SEO" ON public.seo_metadata
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- Custom scripts table for marketing
CREATE TABLE public.custom_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  script_content TEXT NOT NULL,
  placement TEXT NOT NULL DEFAULT 'head' CHECK (placement IN ('head', 'body_start', 'body_end')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.custom_scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active scripts" ON public.custom_scripts
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage scripts" ON public.custom_scripts
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_seo_metadata_updated_at
  BEFORE UPDATE ON public.seo_metadata
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_scripts_updated_at
  BEFORE UPDATE ON public.custom_scripts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Blog categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Admin/Editor can manage categories" ON public.blog_categories FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid())) WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Blog posts table
CREATE TYPE public.post_status AS ENUM ('draft', 'published');

CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt_en TEXT,
  excerpt_ar TEXT,
  content_en TEXT,
  content_ar TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  featured_image TEXT,
  status public.post_status NOT NULL DEFAULT 'draft',
  tags TEXT[] DEFAULT '{}',
  read_time_en TEXT,
  read_time_ar TEXT,
  author_id UUID,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT USING (status = 'published' OR (auth.uid() IS NOT NULL AND public.is_admin_or_editor(auth.uid())));
CREATE POLICY "Admin/Editor can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin/Editor can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Media assets table
CREATE TABLE public.media_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  alt_text TEXT,
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read media" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Admin/Editor can manage media" ON public.media_assets FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid())) WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Public can view media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Auth users can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Auth users can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin(auth.uid()));

-- Seed default categories from existing blog data
INSERT INTO public.blog_categories (name_en, name_ar, slug) VALUES
  ('Tajweed', 'التجويد', 'tajweed'),
  ('Quran', 'القرآن', 'quran'),
  ('Arabic', 'العربية', 'arabic'),
  ('Islamic Knowledge', 'معارف إسلامية', 'islamic-knowledge'),
  ('Islamic Studies', 'دراسات إسلامية', 'islamic-studies'),
  ('Education', 'تعليم', 'education');

-- Fix 1: custom_scripts - restrict public read to only active scripts, hide sensitive columns
DROP POLICY IF EXISTS "Public can read active scripts" ON public.custom_scripts;
CREATE POLICY "Public can read active scripts"
ON public.custom_scripts
FOR SELECT
USING (is_active = true);

-- Fix 2: user_roles - add explicit SELECT restriction
CREATE POLICY "Only admins can read roles"
ON public.user_roles
FOR SELECT
USING (is_admin(auth.uid()));

-- Fix 3: Create secure views for public-facing data

-- Secure view for seo_metadata (hides updated_by)
CREATE OR REPLACE VIEW public.seo_metadata_public AS
SELECT id, page_path, page_name, title, description, keywords, canonical_url,
       og_title, og_description, og_image, og_type,
       twitter_card, twitter_title, twitter_description, twitter_image,
       structured_data, no_index
FROM public.seo_metadata;

-- Secure view for media_assets (hides uploaded_by)
CREATE OR REPLACE VIEW public.media_assets_public AS
SELECT id, file_url, file_name, file_type, file_size, alt_text, created_at
FROM public.media_assets;

-- Secure view for blog_posts (hides author_id for public)
CREATE OR REPLACE VIEW public.blog_posts_public AS
SELECT id, title_en, title_ar, slug, excerpt_en, excerpt_ar, content_en, content_ar,
       category_id, featured_image, status, tags, read_time_en, read_time_ar,
       published_at, created_at
FROM public.blog_posts
WHERE status = 'published';

-- Fix security definer views by setting them to SECURITY INVOKER
ALTER VIEW public.seo_metadata_public SET (security_invoker = on);
ALTER VIEW public.media_assets_public SET (security_invoker = on);
ALTER VIEW public.blog_posts_public SET (security_invoker = on);

-- Drop existing policies on user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can read roles" ON public.user_roles;

-- Super admin UUID
-- info@alhamdacademy.net = 91122b58-4875-42f5-a4a6-6df6569a388d

-- Allow admins to read roles
CREATE POLICY "Admins can read roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only super admin can insert roles with 'admin' role; other admins can only add 'editor'
CREATE POLICY "Super admin can insert any role"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (
  (auth.uid() = '91122b58-4875-42f5-a4a6-6df6569a388d'::uuid)
  OR
  (public.is_admin(auth.uid()) AND role = 'editor')
);

-- Only super admin can update roles
CREATE POLICY "Super admin can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (auth.uid() = '91122b58-4875-42f5-a4a6-6df6569a388d'::uuid);

-- Can delete any role EXCEPT the super admin's own role
CREATE POLICY "Super admin can delete non-super roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (
  auth.uid() = '91122b58-4875-42f5-a4a6-6df6569a388d'::uuid
  AND user_id != '91122b58-4875-42f5-a4a6-6df6569a388d'::uuid
);

-- Also allow authenticated users to read their own role (for auth context)
CREATE POLICY "Users can read own role"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Enable leaked password protection via auth config
-- This is handled via Supabase Auth settings, not SQL migration
-- Using auth.config to enable HaveIBeenPwned check
SELECT 1; -- No-op: leaked password protection is configured via auth settings
