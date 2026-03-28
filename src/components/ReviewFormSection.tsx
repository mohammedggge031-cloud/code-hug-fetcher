import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(100),
  country: z.string().trim().min(2).max(100),
  course: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().trim().min(10).max(1000),
});

const COURSES = [
  { en: "Quran Course", ar: "دورة القرآن الكريم" },
  { en: "Tajweed Course", ar: "دورة التجويد" },
  { en: "Arabic Course", ar: "دورة اللغة العربية" },
  { en: "Islamic Studies", ar: "الدراسات الإسلامية" },
  { en: "All-in-One Course", ar: "الدورة الشاملة" },
  { en: "Ijazah Program", ar: "برنامج الإجازة" },
];

// Rate limiting
const RATE_KEY = "review_submitted_at";
const RATE_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

const ReviewFormSection = () => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Rate limit check
    const lastSubmit = localStorage.getItem(RATE_KEY);
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < RATE_COOLDOWN) {
      setError(t(
        "You've already submitted a review recently. Please try again later.",
        "لقد أرسلت مراجعة مؤخراً. يرجى المحاولة لاحقاً."
      ));
      return;
    }

    const form = e.currentTarget;
    const rawData = {
      name: (form.querySelector('[name="reviewer_name"]') as HTMLInputElement)?.value || "",
      country: (form.querySelector('[name="country"]') as HTMLInputElement)?.value || "",
      course: (form.querySelector('[name="review_course"]') as HTMLSelectElement)?.value || "",
      rating,
      review_text: (form.querySelector('[name="review_text"]') as HTMLTextAreaElement)?.value || "",
    };

    const result = reviewSchema.safeParse(rawData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0]?.toString() || "";
        errors[field] = err.message;
      });
      if (rating === 0) errors.rating = t("Please select a rating", "يرجى اختيار تقييم");
      setFieldErrors(errors);
      return;
    }

    if (rating === 0) {
      setFieldErrors({ rating: t("Please select a rating", "يرجى اختيار تقييم") });
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("student_reviews" as any)
        .insert({
          name: result.data.name,
          country: result.data.country,
          course: result.data.course,
          rating: result.data.rating,
          review_text: result.data.review_text,
          status: "pending",
        } as any);

      if (dbError) throw dbError;

      localStorage.setItem(RATE_KEY, Date.now().toString());
      setSubmitted(true);
    } catch (err) {
      console.error("Review submit error:", err);
      setError(t(
        "Something went wrong. Please try again.",
        "حدث خطأ ما. يرجى المحاولة مرة أخرى."
      ));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="leave-review" className="py-16 sm:py-20 bg-muted/50" aria-label="Leave a Review">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Share Your Experience", "شارك تجربتك")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            {t("Leave a Review", "اترك مراجعة")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            {t(
              "Your feedback helps other students discover the right learning experience. Share your honest review!",
              "ملاحظاتك تساعد الطلاب الآخرين في اكتشاف تجربة التعلم المناسبة. شارك مراجعتك الصادقة!"
            )}
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-2xl p-8 border border-border text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("Thank You! 🎉", "شكراً لك! 🎉")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t(
                    "Your review has been submitted successfully and will be published after approval. We appreciate your feedback!",
                    "تم إرسال مراجعتك بنجاح وسيتم نشرها بعد الموافقة. نقدر ملاحظاتك!"
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-6 sm:p-8 border border-border space-y-5"
              >
                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="reviewer_name" className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("Your Name", "اسمك")} *
                  </label>
                  <input
                    type="text"
                    name="reviewer_name"
                    id="reviewer_name"
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow text-sm"
                    placeholder={t("e.g. Ahmed M.", "مثال: أحمد م.")}
                  />
                  {fieldErrors.name && <p className="text-xs text-destructive mt-1">{fieldErrors.name}</p>}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("Country", "الدولة")} *
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow text-sm"
                    placeholder={t("e.g. United States", "مثال: الولايات المتحدة")}
                  />
                  {fieldErrors.country && <p className="text-xs text-destructive mt-1">{fieldErrors.country}</p>}
                </div>

                {/* Course */}
                <div>
                  <label htmlFor="review_course" className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("Course Taken", "الدورة التي درستها")} *
                  </label>
                  <select
                    name="review_course"
                    id="review_course"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow text-sm"
                  >
                    <option value="">{t("Select a course", "اختر دورة")}</option>
                    {COURSES.map((c) => (
                      <option key={c.en} value={c.en}>{t(c.en, c.ar)}</option>
                    ))}
                  </select>
                  {fieldErrors.course && <p className="text-xs text-destructive mt-1">{fieldErrors.course}</p>}
                </div>

                {/* Star Rating */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("Your Rating", "تقييمك")} *
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                        aria-label={`${star} ${t("stars", "نجوم")}`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "text-accent fill-accent"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {fieldErrors.rating && <p className="text-xs text-destructive mt-1">{fieldErrors.rating}</p>}
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="review_text" className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("Your Review", "مراجعتك")} *
                  </label>
                  <textarea
                    name="review_text"
                    id="review_text"
                    required
                    rows={4}
                    maxLength={1000}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none text-sm"
                    placeholder={t(
                      "Share your experience with Alhamd Academy...",
                      "شارك تجربتك مع أكاديمية الحمد..."
                    )}
                  />
                  {fieldErrors.review_text && <p className="text-xs text-destructive mt-1">{fieldErrors.review_text}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting
                    ? t("Submitting...", "جاري الإرسال...")
                    : t("Submit Review", "إرسال المراجعة")}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  {t(
                    "Reviews are moderated and will appear after approval.",
                    "المراجعات تخضع للمراجعة وستظهر بعد الموافقة."
                  )}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ReviewFormSection;
