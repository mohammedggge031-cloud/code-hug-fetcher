import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fallbackSeo, type FallbackSeoData } from "@/data/fallbackContent";

const TIMEOUT_MS = 4000;

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
  const local = fallbackSeo[pagePath] as Partial<FallbackSeoData> | undefined;

  // Start with fallback immediately so SEO is never blank
  const [seo, setSeo] = useState<SeoData | null>(
    local
      ? {
          title: local.title ?? null,
          description: local.description ?? null,
          keywords: local.keywords ?? null,
          canonical_url: local.canonical_url ?? null,
          og_title: local.og_title ?? null,
          og_description: local.og_description ?? null,
          og_image: local.og_image ?? null,
          og_type: local.og_type ?? null,
          twitter_card: local.twitter_card ?? null,
          twitter_title: local.twitter_title ?? null,
          twitter_description: local.twitter_description ?? null,
          twitter_image: local.twitter_image ?? null,
          structured_data: local.structured_data ?? null,
          no_index: local.no_index ?? null,
        }
      : null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      // Timeout — keep whatever we have (fallback) and stop loading
      if (!cancelled) setLoading(false);
    }, TIMEOUT_MS);

    const fetchSeo = async () => {
      try {
        const { data } = await supabase
          .from("seo_metadata")
          .select("*")
          .eq("page_path", pagePath)
          .maybeSingle();

        if (!cancelled && data) {
          setSeo(data);
        }
      } catch {
        // Supabase unreachable — fallback already set
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
