
-- Fix security definer views by setting them to SECURITY INVOKER
ALTER VIEW public.seo_metadata_public SET (security_invoker = on);
ALTER VIEW public.media_assets_public SET (security_invoker = on);
ALTER VIEW public.blog_posts_public SET (security_invoker = on);
