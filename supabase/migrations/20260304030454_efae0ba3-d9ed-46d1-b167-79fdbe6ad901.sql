
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
