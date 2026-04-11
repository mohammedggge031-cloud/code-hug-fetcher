import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star, Quote, Play } from "lucide-react";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePlacementVideos, type PlacementVideo } from "@/hooks/usePlacementVideos";
import { getCountryCode, getFlagUrl } from "@/data/countries";
import avatarMale from "@/assets/avatar-male.webp";
import avatarFemale from "@/assets/avatar-female.webp";

interface ApprovedReview {
  id: string;
  name: string;
  country: string;
  course: string;
  rating: number;
  review_text: string;
  gender?: string;
  created_at: string;
}


const ApprovedIntroVideos = ({ t, fadeIn, videos }: { t: (en: string, ar: string) => string; fadeIn: (delay?: number) => any; videos: PlacementVideo[] }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <motion.div {...fadeIn()} className="max-w-4xl mx-auto mb-14">
      <div className="text-center mb-6">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">
          {t("Get to Know Us", "تعرف علينا")}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
          {t("Watch Some of Our Students", "شوف بعض طلابنا")}
        </h3>
      </div>
      <div className={`grid gap-6 ${videos.length === 1 ? "max-w-3xl mx-auto" : videos.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
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
      </div>
    </motion.div>
  );
};

const ApprovedReviewsSection = () => {
  const { t } = useLanguage();
  const { fadeIn, fadeInUp } = useMobileSafeMotion();
  const placementVideos = usePlacementVideos();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["approved-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_reviews_approved" as any)
        .select("*")
        .limit(12);

      if (error) throw error;
      return (data || []) as unknown as ApprovedReview[];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div>
                    <div className="h-4 bg-muted rounded w-24 mb-2" />
                    <div className="h-3 bg-muted rounded w-16" />
                  </div>
                </div>
                <div className="h-16 bg-muted rounded mb-4" />
                <div className="h-3 bg-muted rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section id="student-reviews" className="py-16 sm:py-20 bg-secondary/30" aria-label="Student Reviews">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Intro Videos */}
        <ApprovedIntroVideos t={t} fadeIn={fadeIn} videos={placementVideos} />

        <motion.div
          {...fadeIn()}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Student Reviews", "مراجعات الطلاب")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            {t("Real Feedback from Our Students", "آراء حقيقية من طلابنا")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            {t(
              "Hear directly from students who've experienced our courses.",
              "استمع مباشرة من الطلاب الذين خاضوا تجربة دوراتنا."
            )}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => {
            const countryCode = getCountryCode(review.country);
            const isFemale = review.gender === "female";
            const avatar = isFemale ? avatarFemale : avatarMale;

            return (
              <motion.div
                key={review.id}
                {...fadeInUp(idx, 0.05)}
                className="relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-lg transition-[border-color,box-shadow] duration-300 group"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/10 group-hover:text-accent/20 transition-colors" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                    />
                    {countryCode && (
                      <img
                        src={getFlagUrl(countryCode, 40)}
                        alt={`${review.country} flag`}
                        width={20}
                        height={15}
                        loading="lazy"
                        decoding="async"
                        className="absolute -bottom-0.5 -right-1 w-5 h-[15px] rounded-sm shadow-sm border border-background object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <Star key={`e-${i}`} className="w-4 h-4 text-muted-foreground/20" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{review.review_text}"
                </p>

                <div className="mt-4 pt-3 border-t border-border">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    {review.course}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApprovedReviewsSection;
