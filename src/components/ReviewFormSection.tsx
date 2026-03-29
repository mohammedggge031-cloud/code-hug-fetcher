import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2, AlertCircle, MessageSquarePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { COUNTRIES } from "@/data/countries";

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(100),
  country: z.string().min(1),
  course: z.string().min(1),
  gender: z.enum(["male", "female"]),
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

const RATE_KEY = "review_submitted_at";
const RATE_COOLDOWN = 24 * 60 * 60 * 1000;

const ReviewFormSection = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
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
      country: (form.querySelector('[name="country"]') as HTMLSelectElement)?.value || "",
      course: (form.querySelector('[name="review_course"]') as HTMLSelectElement)?.value || "",
      gender: (form.querySelector('[name="gender"]') as HTMLSelectElement)?.value as "male" | "female",
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
          gender: result.data.gender,
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

  const selectClass = "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow text-sm appearance-none";
  const inputClass = "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow text-sm";

  return (
    <section id="leave-review" className="scroll-mt-20" aria-label="Leave a Review">
      {/* Compact CTA - always visible */}
      <AnimatePresence mode="wait">
        {!isOpen && !submitted && (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] text-sm"
            >
              <MessageSquarePlus className="w-5 h-5" />
              {t("Share Your Experience", "شارك تجربتك")}
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              {t(
                "Your feedback helps other students discover the right learning experience.",
                "ملاحظاتك تساعد الطلاب الآخرين في اكتشاف تجربة التعلم المناسبة."
              )}
            </p>
          </motion.div>
        )}

        {/* Success message */}
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8"
          >
            <div className="max-w-md mx-auto bg-card rounded-2xl p-8 border border-border text-center">
              <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("Thank You! 🎉", "شكراً لك! 🎉")}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "Your review has been submitted and will be published after approval.",
                  "تم إرسال مراجعتك وسيتم نشرها بعد الموافقة."
                )}
              </p>
            </div>
          </motion.div>
        )}

        {/* Form dialog overlay */}
        {isOpen && !submitted && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {t("Leave a Review", "اترك مراجعة")}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("Share your honest feedback!", "شارك ملاحظاتك الصادقة!")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Two columns: Name + Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reviewer_name" className="text-xs font-medium text-foreground mb-1 block">
                      {t("Your Name", "اسمك")} *
                    </label>
                    <input
                      type="text"
                      name="reviewer_name"
                      id="reviewer_name"
                      required
                      maxLength={100}
                      className={inputClass}
                      placeholder={t("Ahmed M.", "أحمد م.")}
                    />
                    {fieldErrors.name && <p className="text-xs text-destructive mt-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="gender" className="text-xs font-medium text-foreground mb-1 block">
                      {t("Gender", "الجنس")} *
                    </label>
                    <select name="gender" id="gender" required className={selectClass}>
                      <option value="">{t("Select", "اختر")}</option>
                      <option value="male">{t("Male", "ذكر")}</option>
                      <option value="female">{t("Female", "أنثى")}</option>
                    </select>
                    {fieldErrors.gender && <p className="text-xs text-destructive mt-1">{fieldErrors.gender}</p>}
                  </div>
                </div>

                {/* Two columns: Country + Course */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="country" className="text-xs font-medium text-foreground mb-1 block">
                      {t("Country", "الدولة")} *
                    </label>
                    <select name="country" id="country" required className={selectClass}>
                      <option value="">{t("Select", "اختر")}</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.en}>
                          {lang === "ar" ? c.ar : c.en}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.country && <p className="text-xs text-destructive mt-1">{fieldErrors.country}</p>}
                  </div>
                  <div>
                    <label htmlFor="review_course" className="text-xs font-medium text-foreground mb-1 block">
                      {t("Course", "الدورة")} *
                    </label>
                    <select name="review_course" id="review_course" required className={selectClass}>
                      <option value="">{t("Select", "اختر")}</option>
                      {COURSES.map((c) => (
                        <option key={c.en} value={c.en}>{t(c.en, c.ar)}</option>
                      ))}
                    </select>
                    {fieldErrors.course && <p className="text-xs text-destructive mt-1">{fieldErrors.course}</p>}
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">
                    {t("Your Rating", "تقييمك")} *
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
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
                  <label htmlFor="review_text" className="text-xs font-medium text-foreground mb-1 block">
                    {t("Your Review", "مراجعتك")} *
                  </label>
                  <textarea
                    name="review_text"
                    id="review_text"
                    required
                    rows={3}
                    maxLength={1000}
                    className={`${inputClass} resize-none`}
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting
                    ? t("Submitting...", "جاري الإرسال...")
                    : t("Submit Review", "إرسال المراجعة")}
                </button>

                <p className="text-[11px] text-muted-foreground text-center">
                  {t(
                    "Reviews are moderated and will appear after approval.",
                    "المراجعات تخضع للمراجعة وستظهر بعد الموافقة."
                  )}
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewFormSection;
