import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isGlobalFallbackMode } from "@/lib/safeRuntimeData";

/**
 * Injects search-engine verification meta tags (Google Search Console, Bing,
 * Facebook, etc.) into <head> based on a single JSON row managed from the
 * admin SEO settings page. Tags are stored in `custom_scripts` under the
 * reserved name `verification_meta_tags` as:
 *   [{ "name": "google-site-verification", "content": "<token>" }, ...]
 *
 * Empty/missing rows render nothing — no placeholder values are injected.
 */

const STORAGE_NAME = "verification_meta_tags";
const MARKER_ATTR = "data-verification-meta";

type Tag = { name?: string; content?: string };

const SiteVerificationMeta = () => {
  useEffect(() => {
    if (isGlobalFallbackMode()) return;
    let cancelled = false;

    const load = async () => {
      try {
        const { data } = await supabase
          .from("custom_scripts")
          .select("script_content")
          .eq("name", STORAGE_NAME)
          .maybeSingle();
        if (cancelled || !data?.script_content) return;
        let tags: Tag[] = [];
        try {
          const parsed = JSON.parse(data.script_content);
          if (Array.isArray(parsed)) tags = parsed;
        } catch {
          return;
        }
        // Wipe previously-injected verification tags before re-rendering.
        document.querySelectorAll(`meta[${MARKER_ATTR}]`).forEach((n) => n.remove());
        tags.forEach((t) => {
          const name = (t?.name || "").trim();
          const content = (t?.content || "").trim();
          if (!name || !content) return;
          const meta = document.createElement("meta");
          meta.setAttribute("name", name);
          meta.setAttribute("content", content);
          meta.setAttribute(MARKER_ATTR, "true");
          document.head.appendChild(meta);
        });
      } catch {
        // Best-effort: never block the app.
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

export default SiteVerificationMeta;
