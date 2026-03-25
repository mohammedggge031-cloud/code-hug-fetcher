
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
