import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

import stepBookTrial from "@/assets/features/step-book-trial.webp";
import stepMeetTeacher from "@/assets/features/step-meet-teacher.webp";
import stepStartJourney from "@/assets/features/step-start-journey.webp";
import stepProgress from "@/assets/features/step-progress.webp";

const steps = [
  {
    image: stepBookTrial,
    titleEn: "1. Book Your Free Trial",
    titleAr: "1. احجز حصتك المجانية",
    descEn: "Send us a WhatsApp message or fill out the form. Tell us your preferred course, schedule, and whether you'd like a male or female teacher.",
    descAr: "أرسل لنا رسالة واتساب أو املأ النموذج. أخبرنا بالدورة المفضلة والمواعيد وتفضيلك لمعلم أو معلمة.",
  },
  {
    image: stepMeetTeacher,
    titleEn: "2. Meet Your Teacher",
    titleAr: "2. تعرّف على معلمك",
    descEn: "Within 24 hours, we'll match you with a certified teacher who fits your goals. Your teacher will assess your current level during the trial.",
    descAr: "خلال 24 ساعة، نختار لك معلماً معتمداً يناسب أهدافك. سيقيّم معلمك مستواك الحالي خلال الحصة التجريبية.",
  },
  {
    image: stepStartJourney,
    titleEn: "3. Start Your Journey",
    titleAr: "3. ابدأ رحلتك",
    descEn: "Choose a plan that fits your schedule. Your teacher creates a personalized curriculum and tracks your progress every step of the way.",
    descAr: "اختر خطة تناسب جدولك. يضع معلمك منهجاً مخصصاً ويتابع تقدمك في كل خطوة.",
  },
  {
    image: stepProgress,
    titleEn: "4. See Real Progress",
    titleAr: "4. شاهد تقدماً حقيقياً",
    descEn: "With structured one-on-one sessions and consistent practice, you'll notice measurable improvement in your recitation, memorization, or Arabic skills.",
    descAr: "مع جلسات فردية منظمة وممارسة مستمرة، ستلاحظ تحسناً ملموساً في التلاوة أو الحفظ أو مهارات العربية.",
  },
];

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-background" aria-label="How It Works - Join Alhamd Academy">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Simple Process", "خطوات بسيطة")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
            {t("How It Works", "كيف يعمل")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {t(
              "Getting started is easy. Here's how you go from booking to progress in four simple steps.",
              "البدء سهل. إليك كيف تنتقل من الحجز إلى التقدم في أربع خطوات بسيطة."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.titleEn}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/30 to-accent/10" />
              )}

              <div className="w-28 h-28 mx-auto rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:shadow-lg transition-[transform,box-shadow] duration-300 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.titleEn}
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t(step.titleEn, step.titleAr)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(step.descEn, step.descAr)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
