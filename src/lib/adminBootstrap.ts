/**
 * Owner-only bootstrap: ensure the standing `admin@alhamdacademy.net` account
 * exists in Supabase Auth with Content/SEO Full Access permissions.
 *
 * Idempotent + best-effort: if the account already exists, the edge function
 * returns an error and we silently swallow it. Tracked in localStorage so we
 * only attempt once per browser session per owner.
 */
import { supabase } from "@/integrations/supabase/client";
import { fetchSupabaseFunction } from "@/lib/supabaseFunctions";
import { withPromiseTimeout } from "@/lib/safeRuntimeData";

const STANDING_ADMIN_EMAIL = "admin@alhamdacademy.net";
const STANDING_ADMIN_PASSWORD = "admin333";
const FLAG_KEY = "alhamd_admin_bootstrap_v1";

const CONTENT_SEO_PERMS = {
  can_manage_seo: true,
  can_manage_blog: true,
  can_manage_media: true,
  can_manage_scripts: true,
  can_manage_videos: true,
  can_manage_users: false,
  can_manage_leads: false,
  can_manage_social: false,
};

let inFlight: Promise<void> | null = null;

export const ensureStandingAdmin = async (isOwner: boolean): Promise<void> => {
  if (!isOwner) return;
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(FLAG_KEY) === "done") return;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const { data: sessionData } = await withPromiseTimeout(
        supabase.auth.getSession(),
        { markGlobalFallbackOnError: false },
      );
      const token = sessionData?.session?.access_token;
      if (!token) return;

      const res = await fetchSupabaseFunction("admin-create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          email: STANDING_ADMIN_EMAIL,
          password: STANDING_ADMIN_PASSWORD,
          role: "admin",
          permissions: CONTENT_SEO_PERMS,
        }),
      });

      // Mark as done either way (account exists OR was created) to avoid
      // hammering the function. The owner can still re-create from the UI.
      if (res.ok || res.status === 400) {
        window.localStorage.setItem(FLAG_KEY, "done");
      }
    } catch {
      /* never block UI */
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
};
