-- ============================================================
-- 🚨 CRITICAL FIX — RUN ONCE in Supabase SQL Editor
-- Project: rihxkjhgipmqqihuljah
-- 
-- BUG DISCOVERED (Production Audit, 2026-04-18):
-- The 'owner' role exists in user_roles but the helper functions
-- `is_admin_or_editor()` and `is_admin()` only check for 'admin'
-- and 'editor'. Result: owners (the highest role) cannot see
-- pending/hidden reviews in the dashboard, cannot update or delete
-- them, and effectively have LESS access than editors.
--
-- FIX: Treat 'owner' as having the same privileges as 'admin' in
-- both helpers (owner ⊇ admin ⊇ editor for access checks).
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
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
      AND role IN ('owner', 'admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
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
      AND role IN ('owner', 'admin', 'editor')
  );
$$;

-- Verify after running:
-- SELECT public.is_admin('c792e8df-1447-4432-9897-49477582fbb4');           -- expect: true
-- SELECT public.is_admin_or_editor('c792e8df-1447-4432-9897-49477582fbb4'); -- expect: true
-- SELECT id, name, status FROM public.student_reviews ORDER BY created_at DESC LIMIT 5;
