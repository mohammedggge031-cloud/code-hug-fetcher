import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    const fetchSeo = async () => {
      const { data } = await supabase
        .from("seo_metadata")
        .select("*")
        .eq("page_path", pagePath)
        .maybeSingle();
      setSeo(data);
      setLoading(false);
    };
    fetchSeo();
  }, [pagePath]);

  return { seo, loading };
};
