import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

import imgIntegrity from "@/assets/features/integrity-trust.png";
import imgPatience from "@/assets/features/patience-compassion.png";
import imgResults from "@/assets/features/results-driven.png";
import imgAuthentic from "@/assets/features/authentic-education.png";

const values = [
  {
    image: imgIntegrity,
    titleEn: "Integrity & Trust",
    titleAr: "النزاهة والثقة",
    descEn: "We don't promise unrealistic outcomes. Every student receives honest assessments, transparent pricing, and genuine care for their progress.",
    descAr: "لا نقدم وعوداً غير واقعية. كل طالب يحصل على تقييمات صادقة وأسعار شفافة واهتمام حقيقي بتقدمه.",
  },
  {
    image: imgPatience,
    titleEn: "Patience & Compassion",
    titleAr: "الصبر والرحمة",
    descEn: "Our teachers embody the prophetic approach to teaching — with patience, kindness, and encouragement at every level.",
    descAr: "معلمونا يجسدون المنهج النبوي في التعليم — بالصبر واللطف والتشجيع في كل مستوى.",
  },
  {
    image: imgResults,
    titleEn: "Results-Driven Approach",
    titleAr: "نهج قائم على النتائج",
    descEn: "Every lesson follows a structured curriculum with clear milestones. We track progress so parents always know where their child stands.",
    descAr: "كل درس يتبع منهجاً منظماً بمعالم واضحة. نتابع التقدم حتى يعرف الآباء دائماً مستوى أطفالهم.",
  },
  {
    image: imgAuthentic,
    titleEn: "Authentic Islamic Education",
    titleAr: "تعليم إسلامي أصيل",
    descEn: "Our curriculum is rooted in Al-Azhar University — the world's oldest and most prestigious Islamic institution, founded in 970 CE. All teachers hold degrees from Al-Azhar and carry Ijazah with connected Sanad.",
    descAr: "مناهجنا مبنية على جامعة الأزهر الشريف — أقدم وأعرق مؤسسة إسلامية في العالم، تأسست عام 970م. جميع المعلمين حاصلون على شهادات من الأزهر وإجازات بسند متصل.",
  },
];

const CommitmentSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-primary text-primary-foreground" aria-label="Our Commitment to Quality">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Our Promise", "وعدنا")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            {t("Our Commitment to Quality", "التزامنا بالجودة")}
          </h2>
          <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            {t(
              "We believe quality Islamic education should be accessible, structured, and grounded in authentic scholarship.",
              "نؤمن أن التعليم الإسلامي الجيد يجب أن يكون متاحاً ومنظماً وقائماً على علم أصيل."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.titleEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <div className="w-24 h-24 mb-5 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src={v.image}
                  alt={v.titleEn}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{t(v.titleEn, v.titleAr)}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{t(v.descEn, v.descAr)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
