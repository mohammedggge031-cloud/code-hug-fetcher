import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlacementVideo {
  youtubeId: string;
  titleEn: string;
  titleAr: string;
}

const AboutVideoSection = () => {
  const { t } = useLanguage();
  const { fadeInUp } = useMobileSafeMotion();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [videos, setVideos] = useState<PlacementVideo[]>([]);

  useEffect(() => {
    const fallback: PlacementVideo[] = [{ youtubeId: "ki2Nqq_HJ6U", titleEn: "About Alhamd Academy", titleAr: "عن أكاديمية الحمد" }];
    supabase.from("custom_scripts").select("script_content").eq("name", "video_library").maybeSingle()
      .then(({ data, error }) => {
        if (error || !data?.script_content) { setVideos(fallback); return; }
        try {
          const parsed = JSON.parse(data.script_content);
          if (Array.isArray(parsed)) {
            const filtered = parsed.filter((v: any) => v.placement?.includes("about_us"));
            setVideos(filtered.length > 0 ? filtered : fallback);
            return;
          }
        } catch {}
        setVideos(fallback);
      });
  }, []);

  if (videos.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-background" aria-label="About Us Video">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div {...fadeInUp(0)} className="text-center mb-8">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Get to Know Us", "تعرف علينا")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            {t("Watch Some of Our Students", "شوف بعض طلابنا")}
          </h2>
        </motion.div>

        <motion.div
          {...fadeInUp(1, 0.08)}
          className={`max-w-4xl mx-auto grid gap-6 ${videos.length === 1 ? "max-w-3xl" : videos.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
        >
          {videos.map((video) => (
            <div key={video.youtubeId} className="rounded-2xl overflow-hidden shadow-lg border border-border">
              {playingId === video.youtubeId ? (
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={t(video.titleEn, video.titleAr)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <button
                  onClick={() => setPlayingId(video.youtubeId)}
                  className="relative w-full aspect-video group focus:outline-none"
                  aria-label={t("Play video", "تشغيل الفيديو")}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={t(video.titleEn, video.titleAr)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground fill-current ms-1" />
                    </div>
                  </div>
                </button>
              )}
              {videos.length > 1 && (
                <div className="p-3 bg-muted/30">
                  <p className="text-xs text-muted-foreground font-medium text-center line-clamp-1">
                    {t(video.titleEn, video.titleAr)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutVideoSection;
