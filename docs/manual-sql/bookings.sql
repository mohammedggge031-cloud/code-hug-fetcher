-- ============================================================
-- Bookings table for admin dashboard
-- Run this once in the MAIN Supabase project (rihxkjhgipmqqihuljah)
-- SQL Editor. All statements are idempotent.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  course_interest text,
  preferred_date date,
  preferred_time text,
  timezone text,
  message text,
  source text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at
  ON public.bookings (created_at DESC);

-- Data-API grants
GRANT INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;

-- RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon site visitors) can INSERT a booking
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only the primary owner email can read / update / delete
DROP POLICY IF EXISTS "Owner can view bookings" ON public.bookings;
CREATE POLICY "Owner can view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'email') = 'info@alhamdacademy.net'
  );

DROP POLICY IF EXISTS "Owner can update bookings" ON public.bookings;
CREATE POLICY "Owner can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'info@alhamdacademy.net')
  WITH CHECK ((auth.jwt() ->> 'email') = 'info@alhamdacademy.net');

DROP POLICY IF EXISTS "Owner can delete bookings" ON public.bookings;
CREATE POLICY "Owner can delete bookings"
  ON public.bookings
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'info@alhamdacademy.net');
