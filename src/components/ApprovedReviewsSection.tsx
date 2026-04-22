import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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



const ApprovedReviewsSection = () => {
  const { t } = useLanguage();
  const { fadeIn, fadeInUp } = useMobileSafeMotion();
  

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["approved-reviews"],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from("student_reviews_approved" as never)
        .select("*")
        .limit(12) as unknown as Promise<{ data: ApprovedReview[] | null; error: { message: string } | null }>);

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
