import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users, Clock, Award, Headphones, ShieldCheck, Heart } from "lucide-react";

const features = [
  {
    icon: Users,
    titleEn: "One-on-One Classes",
    titleAr: "دروس فردية",
    descEn: "Personalized attention with dedicated teachers for maximum learning.",
    descAr: "اهتمام شخصي مع معلمين مخصصين لأقصى استفادة.",
  },
  {
    icon: Clock,
    titleEn: "Flexible Scheduling",
    titleAr: "مواعيد مرنة",
    descEn: "Choose class times that fit your schedule, 7 days a week.",
    descAr: "اختر مواعيد تناسب جدولك، 7 أيام في الأسبوع.",
  },
  {
    icon: Award,
    titleEn: "Al-Azhar Certified · Native Arabic Speakers",
    titleAr: "خريجو الأزهر · متحدثون أصليون للعربية",
    descEn: "All teachers are native Arabic speakers from Egypt, graduates of Al-Azhar University with Ijazah certification and 7+ years of experience. Arabic is their mother tongue.",
    descAr: "جميع المعلمين متحدثون أصليون للغة العربية من مصر، خريجو جامعة الأزهر الشريف مع إجازات معتمدة وخبرة تزيد عن 7 سنوات. العربية هي لغتهم الأم.",
  },
  {
    icon: Headphones,
    titleEn: "24/7 Support",
    titleAr: "دعم على مدار الساعة",
    descEn: "Our support team is always available to assist you.",
    descAr: "فريق الدعم لدينا متاح دائمًا لمساعدتك.",
  },
  {
    icon: ShieldCheck,
    titleEn: "Safe Environment",
    titleAr: "بيئة آمنة",
    descEn: "Secure and family-friendly learning platform for all ages.",
    descAr: "منصة تعليمية آمنة ومناسبة للعائلة لجميع الأعمار.",
  },
  {
    icon: Heart,
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
              className="flex gap-5 p-6 rounded-2xl hover:bg-secondary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">{t(f.titleEn, f.titleAr)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descEn, f.descAr)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
