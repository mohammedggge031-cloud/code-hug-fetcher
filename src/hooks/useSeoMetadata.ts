import { useEffect, useState } from "react";
import { SUPABASE_TIMEOUT_MS, isGlobalFallbackMode, safeDataRequest } from "@/lib/safeRuntimeData";

const TIMEOUT_MS = Math.min(SUPABASE_TIMEOUT_MS, 3000);

interface SeoData {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_type: string | null;
  twitter_card: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  structured_data: any;
  no_index: boolean | null;
}

/* ---------- in-memory cache ---------- */
const seoCache = new Map<string, { data: SeoData; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(path: string): SeoData | null {
  const entry = seoCache.get(path);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    seoCache.delete(path);
    return null;
  }
  return entry.data;
}

export const useSeoMetadata = (pagePath: string) => {
  const cached = getCached(pagePath);
  const [seo, setSeo] = useState<SeoData | null>(cached);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    // Already have fresh cache
    if (cached) {
      setSeo(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;

    if (isGlobalFallbackMode()) {
      setLoading(false);
      return () => { cancelled = true; };
    }

    const timer = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, TIMEOUT_MS);

    const fetchSeo = async () => {
      try {
        const data = await safeDataRequest<SeoData | null>({
          fallback: null,
          timeoutMs: TIMEOUT_MS,
          markGlobalFallbackOnError: true,
          request: async (signal) => {
            const { supabase } = await import("@/integrations/supabase/client");
            const { data, error } = await supabase
              .from("seo_metadata")
              .select("title,description,keywords,canonical_url,og_title,og_description,og_image,og_type,twitter_card,twitter_title,twitter_description,twitter_image,structured_data,no_index")
              .eq("page_path", pagePath)
              .abortSignal(signal)
              .maybeSingle();

            if (error) throw error;
            return data;
          },
        });

        if (!cancelled && data) {
          seoCache.set(pagePath, { data, ts: Date.now() });
          setSeo(data);
        }
      } catch {
        // Supabase unreachable — seo stays null, page uses code defaults
      } finally {
        if (!cancelled) {
          clearTimeout(timer);
          setLoading(false);
        }
      }
    };

    fetchSeo();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pagePath, cached]);

  return { seo, loading };
};
