
-- Enable leaked password protection via auth config
-- This is handled via Supabase Auth settings, not SQL migration
-- Using auth.config to enable HaveIBeenPwned check
SELECT 1; -- No-op: leaked password protection is configured via auth settings
