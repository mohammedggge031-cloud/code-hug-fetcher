import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCountryCode, getFlagUrl } from "@/data/countries";
import avatarMale from "@/assets/avatar-male.png";
import avatarFemale from "@/assets/avatar-female.png";

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-4" />
                <div className="h-16 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section id="student-reviews" className="py-16 sm:py-20 bg-background" aria-label="Student Reviews">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => {
            const countryCode = getCountryCode(review.country);
            const isFemale = review.gender === "female";
            const avatar = isFemale ? avatarFemale : avatarMale;

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-accent/20 hover:shadow-md transition-all"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/20" />
                  ))}
                </div>

                {/* Review text */}
                <div className="relative mb-4">
                  <MessageSquareQuote className="w-5 h-5 text-accent/20 absolute -top-1 -left-1" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5 italic">
                    "{review.review_text}"
                  </p>
                </div>

                {/* Author with avatar + flag */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={avatar}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border-2 border-accent/20"
                    />
                    {/* Country flag badge */}
                    {countryCode && (
                      <img
                        src={getFlagUrl(countryCode, 20)}
                        alt={review.country}
                        width={16}
                        height={12}
                        loading="lazy"
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-3 rounded-sm shadow-sm border border-background object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.country} · {review.course}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to leave review */}
        <div className="text-center mt-10">
          <a
            href="#leave-review"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-colors border border-accent/20 text-sm"
          >
            <Star className="w-4 h-4" />
            {t("Leave Your Review", "اترك مراجعتك")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApprovedReviewsSection;
