
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
