import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const verses = [
  {
    arabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    translationEn: "And recite the Quran with measured recitation.",
    referenceEn: "Surah Al-Muzzammil (73:4)",
    referenceAr: "سورة المزمل (٧٣:٤)",
  },
  {
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
    translationEn: "Indeed, it is We who sent down the reminder, and indeed, We will be its guardian.",
    referenceEn: "Surah Al-Hijr (15:9)",
    referenceAr: "سورة الحجر (١٥:٩)",
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translationEn: "The best of you are those who learn the Quran and teach it.",
    referenceEn: "Hadith — Sahih Al-Bukhari",
    referenceAr: "حديث — صحيح البخاري",
  },
];

const QuranVersesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-section py-16 sm:py-20 md:py-24" aria-label="Inspirational Quran Verses and Hadith">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t("Words of Guidance", "كلمات من نور")}
          </span>
          <h2 className="text-balance mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {t("Inspiration from the Quran", "إلهام من القرآن الكريم")}
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {verses.map((verse, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all hover:shadow-elevated">
                <div className="mb-4 text-2xl text-accent/30">﴾ ❖ ﴿</div>

                <p className="quranic-text mb-6 text-2xl text-primary md:text-[1.7rem] lg:text-3xl">
                  {verse.arabic}
                </p>

                <p className="text-pretty mb-4 text-sm italic leading-relaxed text-muted-foreground">
                  "{verse.translationEn}"
                </p>

                <div className="mt-auto border-t border-border pt-4">
                  <span className="quranic-reference text-xs font-semibold text-accent">
                    {t(verse.referenceEn, verse.referenceAr)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuranVersesSection;
