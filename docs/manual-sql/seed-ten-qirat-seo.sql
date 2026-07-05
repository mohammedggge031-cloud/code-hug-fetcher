-- Seed premium SEO metadata for the Ten Qira'at course landing page.
-- Run in the Supabase SQL editor once. Idempotent via ON CONFLICT.
--
-- Route: /courses/ten-qirat-online
-- Arabic mirror: /ar/courses/ten-qirat-online (served by the same
-- seo_metadata row; language and hreflang are handled by api/prerender.ts
-- and the client LanguageContext).

insert into public.seo_metadata (
  page_path,
  page_name,
  title,
  description,
  keywords,
  canonical_url,
  og_title,
  og_description,
  og_image,
  og_type,
  twitter_card,
  twitter_title,
  twitter_description,
  twitter_image,
  structured_data,
  no_index
) values (
  '/courses/ten-qirat-online',
  'Online Ten Qira''at Course with Ijazah | Al-Qira''at Al-''Ashr | Alhamd Academy',
  'Study the ten authentic Qira''at of the Quran online with certified Al-Azhar Sanad-holders. One-on-one Talaqqi in the Shatibiyyah and Durrah routes with a full written Ijazah. Free trial class.',
  'online qirat course, ten qirat online, qira''at al ashr online, learn qiraat online, ten qiraat course, al qiraat al ashr, shatibiyyah online, durrah online, ijazah in qiraat, sanad in qiraat, qirat teacher online, qirat classes online, qirat course with ijazah, learn the ten qiraat',
  'https://www.alhamdacademy.net/courses/ten-qirat-online',
  'Learn the Ten Qira''at Online — With a Documented Ijazah',
  'One-on-one Talaqqi with Al-Azhar-certified Sanad-holders. Full Shatibiyyah & Durrah curriculum. Free assessment class.',
  'https://www.alhamdacademy.net/og-image.jpg',
  'website',
  'summary_large_image',
  'Online Ten Qira''at Course with Ijazah | Alhamd Academy',
  'Study Al-Qira''at Al-''Ashr online, one-on-one, with a certified shaykh and receive a written Ijazah with a full Sanad chain to the Prophet ﷺ.',
  'https://www.alhamdacademy.net/og-image.jpg',
  jsonb_build_object(
    '@context', 'https://schema.org',
    '@type', 'Course',
    'name', 'Online Ten Qira''at Course — Al-Qira''at Al-''Ashr with Ijazah',
    'description', 'Study the ten authentic Qira''at of the Quran (Shatibiyyah & Durrah routes) one-on-one with certified Al-Azhar Sanad holders. Full Ijazah with documented chain to the Prophet ﷺ.',
    'url', 'https://www.alhamdacademy.net/courses/ten-qirat-online',
    'inLanguage', jsonb_build_array('en','ar'),
    'provider', jsonb_build_object(
      '@type', 'EducationalOrganization',
      'name', 'Alhamd Academy',
      'sameAs', 'https://www.alhamdacademy.net',
      'url', 'https://www.alhamdacademy.net'
    ),
    'hasCourseInstance', jsonb_build_object(
      '@type', 'CourseInstance',
      'courseMode', 'Online',
      'inLanguage', jsonb_build_array('ar','en')
    ),
    'educationalCredentialAwarded', 'Ijazah with Sanad in the Ten Qira''at'
  ),
  false
)
on conflict (page_path) do update set
  title                  = excluded.title,
  description            = excluded.description,
  keywords               = excluded.keywords,
  canonical_url          = excluded.canonical_url,
  og_title               = excluded.og_title,
  og_description         = excluded.og_description,
  og_image               = excluded.og_image,
  og_type                = excluded.og_type,
  twitter_card           = excluded.twitter_card,
  twitter_title          = excluded.twitter_title,
  twitter_description    = excluded.twitter_description,
  twitter_image          = excluded.twitter_image,
  structured_data        = excluded.structured_data,
  no_index               = excluded.no_index,
  updated_at             = now();
