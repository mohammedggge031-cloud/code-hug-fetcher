import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SUPABASE_TIMEOUT_MS, isGlobalFallbackMode, safeDataRequest } from "@/lib/safeRuntimeData";

const TIMEOUT_MS = SUPABASE_TIMEOUT_MS;

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
  const [seo, setSeo] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            const { data, error } = await supabase
              .from("seo_metadata")
              .select("*")
              .eq("page_path", pagePath)
              .abortSignal(signal)
              .maybeSingle();

            if (error) throw error;
            return data;
          },
        });

        if (!cancelled && data) {
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
  }, [pagePath]);

  return { seo, loading };
};
