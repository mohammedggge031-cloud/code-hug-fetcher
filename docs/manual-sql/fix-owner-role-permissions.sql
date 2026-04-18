-- ============================================================
-- 🚨 CRITICAL FIX — Safe to run multiple times (idempotent)
-- Project: rihxkjhgipmqqihuljah
-- 
-- Bug: 'owner' role users cannot manage reviews because
-- is_admin() and is_admin_or_editor() only check 'admin'/'editor'.
--
-- Fix: Add 'owner' to both helpers. Owners get full access.
--
-- HOW TO RUN:
-- 1. Open: https://supabase.com/dashboard/project/rihxkjhgipmqqihuljah/sql/new
-- 2. Paste this entire file
-- 3. Click "Run"
-- 4. You should see: "Success. No rows returned" + verification results
-- ============================================================

BEGIN;

-- Drop and recreate is_admin (CREATE OR REPLACE may fail if signature differs)
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;

CREATE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role::text IN ('owner', 'admin')
  );
$$;

-- Drop and recreate is_admin_or_editor
DROP FUNCTION IF EXISTS public.is_admin_or_editor(uuid) CASCADE;

CREATE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role::text IN ('owner', 'admin', 'editor')
  );
$$;

-- Re-grant execute (CASCADE may have dropped grants)
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_or_editor(uuid) TO anon, authenticated;

-- ============================================================
-- Re-create RLS policies that depend on the helpers (CASCADE drops them)
-- Safe: drops if exists, then creates fresh.
-- ============================================================

-- student_reviews policies
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname='public' AND tablename='student_reviews') THEN
    DROP POLICY IF EXISTS "Admins can read all reviews" ON public.student_reviews;
    DROP POLICY IF EXISTS "Admins can update reviews"  ON public.student_reviews;
    DROP POLICY IF EXISTS "Admins can delete reviews"  ON public.student_reviews;

    CREATE POLICY "Admins can read all reviews"
      ON public.student_reviews FOR SELECT TO authenticated
      USING (public.is_admin_or_editor(auth.uid()));

    CREATE POLICY "Admins can update reviews"
      ON public.student_reviews FOR UPDATE TO authenticated
      USING (public.is_admin_or_editor(auth.uid()))
      WITH CHECK (public.is_admin_or_editor(auth.uid()));

    CREATE POLICY "Admins can delete reviews"
      ON public.student_reviews FOR DELETE TO authenticated
      USING (public.is_admin(auth.uid()));
  END IF;
END $$;

COMMIT;

-- ============================================================
-- VERIFICATION (run separately or scroll to see results)
-- ============================================================
SELECT 'is_admin (owner)' AS check_name,
       public.is_admin('c792e8df-1447-4432-9897-49477582fbb4') AS result;

SELECT 'is_admin_or_editor (owner)' AS check_name,
       public.is_admin_or_editor('c792e8df-1447-4432-9897-49477582fbb4') AS result;

SELECT id, name, status, created_at
FROM public.student_reviews
ORDER BY created_at DESC
LIMIT 5;
