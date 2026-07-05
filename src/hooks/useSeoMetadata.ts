import { useEffect, useState } from "react";
import { SUPABASE_TIMEOUT_MS, isGlobalFallbackMode, safeDataRequest } from "@/lib/safeRuntimeData";
import { getCached, setCache } from "@/lib/supabaseCache";
import { getInlineSeo } from "@/lib/inlineData";

const TIMEOUT_MS = SUPABASE_TIMEOUT_MS;
const SEO_CACHE_TTL = 5 * 60 * 1000;

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

export const useSeoMetadata = (pagePath: string) => {
  const cached = getCached<SeoData>(`seo:${pagePath}`);
  const [seo, setSeo] = useState<SeoData | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return;
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
          setCache(`seo:${pagePath}`, data, SEO_CACHE_TTL);
          setSeo(data);
        }
      } catch {
        // fallback
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
