import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PlacementVideo {
  youtubeId: string;
  titleEn: string;
  titleAr: string;
  placement?: string[];
}

const FALLBACK: PlacementVideo[] = [
  { youtubeId: "ki2Nqq_HJ6U", titleEn: "Non-Arab Student Reciting Quran", titleAr: "طالب غير عربي يقرأ القرآن", placement: ["testimonials"] },
];

let cached: PlacementVideo[] | null = null;
let pending: Promise<PlacementVideo[]> | null = null;

function fetchVideos(): Promise<PlacementVideo[]> {
  if (cached) return Promise.resolve(cached);
  if (pending) return pending;

  pending = supabase
    .from("custom_scripts")
    .select("script_content")
    .eq("name", "video_library")
    .maybeSingle()
    .then(({ data, error }) => {
      if (error || !data?.script_content) {
        cached = FALLBACK;
        return FALLBACK;
      }
      try {
        const parsed = JSON.parse(data.script_content);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((v: any) => v.placement?.includes("testimonials"));
          cached = filtered.length > 0 ? filtered : FALLBACK;
          return cached;
        }
      } catch {}
      cached = FALLBACK;
      return FALLBACK;
    });

  return pending;
}

export function usePlacementVideos() {
  const [videos, setVideos] = useState<PlacementVideo[]>(cached ?? []);

  useEffect(() => {
    if (cached) {
      setVideos(cached);
      return;
    }
    fetchVideos().then(setVideos);
  }, []);

  return videos;
}
