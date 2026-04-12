import { useLanguage } from "@/contexts/LanguageContext";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { videoCategories, VideoItem } from "@/data/videos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { Play, X, Globe, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import { Button } from "@/components/ui/button";

const VideoCard = memo(({ video, index, onOpen }: { video: VideoItem; index: number; onOpen: (youtubeId: string) => void }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpen(video.youtubeId)}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={t(video.titleEn, video.titleAr)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-accent-foreground fill-current ms-0.5" />
          </div>
        </div>
        <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold">
          {t(video.category, video.categoryAr)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-foreground text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
          {t(video.titleEn, video.titleAr)}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2">
          {t(video.descriptionEn, video.descriptionAr)}
        </p>
      </div>
    </motion.div>
  );
});

VideoCard.displayName = "VideoCard";

const Videos = () => {
  const { t } = useLanguage();
  const { seo } = useSeoMetadata("/videos");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [showOtherVideos, setShowOtherVideos] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    setLoadingVideos(true);
    const loadVideos = async () => {
      try {
        const { data } = await supabase.from("custom_scripts").select("script_content").eq("name", "video_library").maybeSingle();
        if (data?.script_content) {
          const parsed = JSON.parse(data.script_content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setVideos(parsed);
            setLoadingVideos(false);
            return;
          }
        }
      } catch {}
      // Fallback to hardcoded only if DB has nothing
      const { videos: hc } = await import("@/data/videos");
      setVideos(hc);
      setLoadingVideos(false);
    };
    loadVideos();
  }, []);

  const handleOpenVideo = useCallback((youtubeId: string) => {
    setActiveVideo(youtubeId);
  }, []);

  const ourVideos = useMemo(
    () => videos.filter((v) => v.isOurs || v.category === "About Us" || v.placement?.includes("about_us") || v.placement?.includes("testimonials")),
    [videos],
  );

  const otherVideos = useMemo(
    () => videos.filter((v) => {
      const p = v.placement;
      if (p && Array.isArray(p)) return p.includes("other") && !p.includes("about_us") && !p.includes("testimonials");
      return !v.isOurs && v.category !== "About Us";
    }),
    [videos],
  );

  const filteredOtherVideos = useMemo(
    () => otherVideos.filter((video) => activeCategory === "All" || video.category === activeCategory),
    [activeCategory, otherVideos],
  );

  const otherCategories = useMemo(
    () => videoCategories.filter((c) => c.en !== "About Us"),
    [],
  );

  const englishOther = useMemo(
    () => filteredOtherVideos.filter((v) => v.language === "en"),
    [filteredOtherVideos],
  );

  const arabicOther = useMemo(
    () => filteredOtherVideos.filter((v) => v.language === "ar"),
    [filteredOtherVideos],
  );

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Islamic Video Library | Alhamd Academy"
        description="Watch inspiring Prophet stories, Quran stories, and Islamic lessons in English and Arabic from trusted scholars. Free Islamic educational videos."
        canonical="https://alhamdacademy.net/videos"
        keywords="prophet stories, quran stories, islamic videos, islamic lessons, quran recitation videos, tajweed lessons, prophet adam story, prophet muhammad story, islamic education videos"
        dynamicSeo={seo}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhamdacademy.net/" },
              { "@type": "ListItem", "position": 2, "name": "Video Library", "item": "https://alhamdacademy.net/videos" }
            ]
          })
        }}
      />
      <Navbar />

      <main>
        <section className="bg-hero geometric-pattern pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              {t("Islamic Video Library", "المكتبة المرئية الإسلامية")}
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              {t(
                "Watch inspiring stories of the Prophets, Quran stories, and Islamic lessons from trusted scholars.",
                "شاهد قصص الأنبياء الملهمة وقصص القرآن والدروس الإسلامية من علماء موثوقين."
              )}
            </p>
          </div>
        </section>

        {/* Our Videos Section */}
        {ourVideos.length > 0 && (
          <section className="py-12 sm:py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-accent rounded-full" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {t("Our Videos", "فيديوهاتنا")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ourVideos.map((video, i) => (
                  <VideoCard key={video.id} video={video} index={i} onOpen={handleOpenVideo} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Toggle for Other Videos */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            {!showOtherVideos ? (
              <div className="text-center">
                <Button
                  onClick={() => setShowOtherVideos(true)}
                  size="lg"
                  className="gap-2 text-base px-8 py-6 rounded-xl shadow-md"
                >
                  {t("Browse More Islamic Videos", "تصفح المزيد من الفيديوهات الإسلامية")}
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <p className="text-muted-foreground text-sm mt-3">
                  {t(
                    `${otherVideos.length} curated videos from trusted scholars`,
                    `${otherVideos.length} فيديو مختار من علماء موثوقين`
                  )}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {t("Islamic Educational Videos", "فيديوهات تعليمية إسلامية")}
                  </h2>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-10 justify-center">
                  {otherCategories.map((cat) => (
                    <button
                      key={cat.en}
                      onClick={() => setActiveCategory(cat.en)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === cat.en
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                      }`}
                    >
                      {t(cat.en, cat.ar)}
                    </button>
                  ))}
                </div>

                {/* English Videos */}
                {englishOther.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {t("English Videos", "فيديوهات باللغة الإنجليزية")}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {englishOther.length}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {englishOther.map((video, i) => (
                        <VideoCard key={video.id} video={video} index={i} onOpen={handleOpenVideo} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Arabic Videos */}
                {arabicOther.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {t("Arabic Videos", "فيديوهات باللغة العربية")}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                        {arabicOther.length}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {arabicOther.map((video, i) => (
                        <VideoCard key={video.id} video={video} index={i} onOpen={handleOpenVideo} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-elevated"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute -top-10 end-0 text-primary-foreground hover:text-accent transition-colors z-10"
                >
                  <X className="w-8 h-8" />
                </button>
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                  title="Video Player"
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ExploreMoreSection />
      <Footer />
    </div>
  );
};

export default Videos;
