-- ============================================================
-- MANUAL MIGRATION — RUN ONCE in Supabase SQL Editor
-- Project: rihxkjhgipmqqihuljah
-- Purpose: Fix RLS so the public review form works AND only
--          admins/editors can manage reviews from the dashboard.
-- ============================================================

ALTER TABLE public.student_reviews ENABLE ROW LEVEL SECURITY;

-- Clean slate
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'student_reviews'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.student_reviews', pol.policyname);
  END LOOP;
END $$;

-- 1) Anyone (visitor or logged-in) can submit a new review,
--    but only with status='pending' (no self-approval).
CREATE POLICY "Public can submit reviews"
  ON public.student_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');

-- 2) Public/anon can read ONLY approved rows.
--    This makes the security_invoker view work for visitors.
CREATE POLICY "Public can read approved reviews"
  ON public.student_reviews
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- 3) Admins/editors can read everything (pending, hidden, approved).
CREATE POLICY "Admins can read all reviews"
  ON public.student_reviews
  FOR SELECT
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

-- 4) Admins/editors can update (approve / hide / unhide).
CREATE POLICY "Admins can update reviews"
  ON public.student_reviews
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()))
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- 5) Only full admins can delete.
CREATE POLICY "Admins can delete reviews"
  ON public.student_reviews
  FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 6) Recreate the approved-reviews view as security_invoker so
--    visitor reads are governed by policy #2 above.
DROP VIEW IF EXISTS public.student_reviews_approved;

CREATE VIEW public.student_reviews_approved
WITH (security_invoker = on) AS
  SELECT id, name, country, course, gender, rating, review_text, created_at
  FROM public.student_reviews
  WHERE status = 'approved';

GRANT SELECT ON public.student_reviews_approved TO anon, authenticated;
