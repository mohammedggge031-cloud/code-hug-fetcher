-- ============================================================
-- Seed existing hardcoded testimonials into student_reviews
-- Status: approved (so they keep showing on the website)
-- Safe to re-run: uses ON CONFLICT DO NOTHING via unique check
-- ============================================================

BEGIN;

-- Insert only if not already present (matched by name + review_text)
INSERT INTO public.student_reviews (name, country, course, gender, rating, review_text, status, created_at)
SELECT * FROM (VALUES
  ('Dursa ali',     'United States',   'Tajweed',          'male',   5, 'The one-on-one sessions made a huge difference in my Tajweed. My teacher patiently corrects every letter, and I genuinely feel myself improving week after week.',                                'approved'::text, now() - interval '60 days'),
  ('Zayan',         'Bangladesh',      'Noor Al-Bayan',    'male',   5, 'I started from zero — couldn''t even read Arabic letters. Now I read Quran fluently thanks to the Noor Al-Bayan method. The teachers are incredibly patient and make every lesson enjoyable!', 'approved', now() - interval '55 days'),
  ('Aisha M.',      'United Kingdom',  'Hifz',             'female', 5, 'Having a female teacher was so important to me. She feels like an older sister guiding me through my Hifz journey with love and patience 💜',                                                  'approved', now() - interval '50 days'),
  ('Issa',          'Canada',          'Quran for Kids',   'male',   5, 'Honestly, I''m impressed by how the teachers handle my kids. They make learning feel like play — my children actually ask for their Quran class every day.',                                'approved', now() - interval '45 days'),
  ('Naveed Shahul', 'Bangladesh',      'Quran Recitation', 'male',   5, 'Everything runs so smoothly here. From booking to class follow-ups, the whole system is organized and professional. No complaints at all.',                                                'approved', now() - interval '40 days'),
  ('Hamza A.',      'United Arab Emirates', 'Adult Quran', 'male',   5, 'What I appreciate most is that the teachers truly care. They celebrate every small milestone with you and always push you to keep going 🌟',                                                'approved', now() - interval '35 days'),
  ('Ruqayyah N.',   'Sweden',          'Quran for Kids',   'female', 5, 'The personal attention here is unmatched. Teachers know each student''s strengths and weaknesses and adapt their approach accordingly.',                                                    'approved', now() - interval '30 days'),
  ('Fatima K.',     'Germany',         'Online Quran',     'female', 5, 'I was really nervous about online Quran learning at first, but the teachers put me at ease right away. Best decision I''ve made 🌸',                                                          'approved', now() - interval '25 days'),
  ('Tariq J.',      'Nigeria',         'Quran & Arabic',   'male',   5, 'بارك الله فيكم — the structured curriculum and welcoming environment made me comfortable from day one. A truly world-class experience.',                                                  'approved', now() - interval '20 days')
) AS v(name, country, course, gender, rating, review_text, status, created_at)
WHERE NOT EXISTS (
  SELECT 1 FROM public.student_reviews sr
  WHERE sr.name = v.name AND sr.review_text = v.review_text
);

-- Verify
SELECT id, name, country, status, created_at
FROM public.student_reviews
ORDER BY created_at DESC;

COMMIT;
