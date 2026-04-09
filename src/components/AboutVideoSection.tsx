import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

const YOUTUBE_ID = "ki2Nqq_HJ6U";

const AboutVideoSection = () => {
  const { t } = useLanguage();
  const { fadeInUp } = useMobileSafeMotion();
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-background" aria-label="About Us Video">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div {...fadeInUp(0)} className="text-center mb-8">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Get to Know Us", "تعرف علينا")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            {t("Watch Our Story", "شاهد قصتنا")}
          </h2>
        </motion.div>

        <motion.div
          {...fadeInUp(1, 0.08)}
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-border"
        >
          {playing ? (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title={t("About Alhamd Academy", "عن أكاديمية الحمد")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="relative w-full aspect-video group focus:outline-none"
              aria-label={t("Play video", "تشغيل الفيديو")}
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                alt={t("About Alhamd Academy", "عن أكاديمية الحمد")}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 text-accent-foreground fill-current ms-1" />
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutVideoSection;
