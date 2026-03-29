import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

import featureOneOnOne from "@/assets/features/one-on-one.webp";
import featureFlexible from "@/assets/features/flexible-schedule.webp";
import featureCertified from "@/assets/features/certified-teachers.webp";
import featureSupport from "@/assets/features/support-247.webp";
import featureSafe from "@/assets/features/safe-environment.webp";
import featureTrial from "@/assets/features/free-trial.webp";

const features = [
  {
    image: featureOneOnOne,
    titleEn: "One-on-One Classes",
    titleAr: "دروس فردية",
    descEn: "Personalized attention with dedicated teachers for maximum learning.",
    descAr: "اهتمام شخصي مع معلمين مخصصين لأقصى استفادة.",
  },
  {
    image: featureFlexible,
    titleEn: "Flexible Scheduling",
    titleAr: "مواعيد مرنة",
    descEn: "Choose class times that fit your schedule, 7 days a week.",
    descAr: "اختر مواعيد تناسب جدولك، 7 أيام في الأسبوع.",
  },
  {
    image: featureCertified,
    titleEn: "Al-Azhar Certified · Native Arabic Speakers",
    titleAr: "خريجو الأزهر · متحدثون أصليون للعربية",
    descEn: "All teachers are native Arabic speakers from Egypt, graduates of Al-Azhar University with Ijazah certification and 7+ years of experience.",
    descAr: "جميع المعلمين متحدثون أصليون للغة العربية من مصر، خريجو جامعة الأزهر الشريف مع إجازات معتمدة وخبرة تزيد عن 7 سنوات.",
  },
  {
    image: featureSupport,
    titleEn: "24/7 Support",
    titleAr: "دعم على مدار الساعة",
    descEn: "Our support team is always available to assist you.",
    descAr: "فريق الدعم لدينا متاح دائمًا لمساعدتك.",
  },
  {
    image: featureSafe,
    titleEn: "Safe Environment",
    titleAr: "بيئة آمنة",
    descEn: "Secure and family-friendly learning platform for all ages.",
    descAr: "منصة تعليمية آمنة ومناسبة للعائلة لجميع الأعمار.",
  },
  {
    image: featureTrial,
    titleEn: "Free Trial Class",
    titleAr: "درس تجريبي مجاني",
    descEn: "Experience our teaching methodology with no commitment.",
    descAr: "اختبر منهجيتنا التعليمية بدون أي التزام.",
  },
];

const WhyChooseUs = () => {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-16 sm:py-20 md:py-24 bg-background" aria-label="Why Choose Alhamd Academy for Online Quran Classes">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Why Alhamd Academy", "لماذا أكاديمية الحمد")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
            {t("Why Choose Us?", "لماذا تختارنا؟")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.titleEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-[box-shadow,border-color,transform] duration-300"
            >
              <div className="w-28 h-28 mb-6 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/15 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:border-accent/30 transition-[transform,box-shadow,border-color] duration-300">
                <img
                  src={f.image}
                  alt={f.titleEn}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 object-contain drop-shadow-sm"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t(f.titleEn, f.titleAr)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descEn, f.descAr)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
