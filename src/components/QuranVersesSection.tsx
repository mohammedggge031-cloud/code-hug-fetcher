import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef, useCallback } from "react";

const verses = [
  {
    arabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    translationEn: "And recite the Quran with measured recitation.",
    referenceEn: "Surah Al-Muzzammil (73:4)",
    referenceAr: "سورة المزمل (٧٣:٤)",
    type: "quran" as const,
  },
  {
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
    translationEn: "Indeed, it is We who sent down the reminder, and indeed, We will be its guardian.",
    referenceEn: "Surah Al-Hijr (15:9)",
    referenceAr: "سورة الحجر (١٥:٩)",
    type: "quran" as const,
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translationEn: "The best of you are those who learn the Quran and teach it.",
    referenceEn: "Sahih Al-Bukhari (5027)",
    referenceAr: "صحيح البخاري (٥٠٢٧)",
    type: "hadith" as const,
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    translationEn: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    referenceEn: "Surah Al-Baqarah (2:152)",
    referenceAr: "سورة البقرة (٢:١٥٢)",
    type: "quran" as const,
  },
  {
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    translationEn: "Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.",
    referenceEn: "Sahih Muslim (2699)",
    referenceAr: "صحيح مسلم (٢٦٩٩)",
    type: "hadith" as const,
  },
  {
    arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
    translationEn: "Read in the name of your Lord who created.",
    referenceEn: "Surah Al-Alaq (96:1)",
    referenceAr: "سورة العلق (٩٦:١)",
    type: "quran" as const,
  },
];

const QuranVersesSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % verses.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoplay]);

  const goTo = (i: number) => {
    setActive(i);
    startAutoplay();
  };

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 md:py-32"
      aria-label="Inspirational Quran Verses and Hadith"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Geometric Islamic pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Concentric circles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-primary-foreground/[0.04]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-primary-foreground/[0.06]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary-foreground/[0.08]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-primary-foreground/[0.10]" />
        {/* Diagonal lines */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-primary-foreground/[0.06] to-transparent rotate-45" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-primary-foreground/[0.06] to-transparent -rotate-45" />
        {/* Gold glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, hsl(46 71% 52%), transparent 70%)" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-8 h-px bg-accent/60" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Words of Guidance", "كلمات من نور")}
            </span>
            <span className="block w-8 h-px bg-accent/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight">
            {t("Inspiration from the Quran & Sunnah", "إلهام من القرآن والسنة")}
          </h2>
        </div>

        {/* Main verse display */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative min-h-[340px] sm:min-h-[300px] md:min-h-[280px] flex items-center justify-center">
            {verses.map((verse, i) => (
              <div
                key={i}
                style={{
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                }}
                className={`absolute inset-0 flex flex-col items-center justify-center px-4 ${active === i ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                {/* Ornament top */}
                <div className="text-accent/40 text-2xl sm:text-3xl mb-6 select-none" aria-hidden="true">
                  ﴾ ✦ ﴿
                </div>

                {/* Arabic text */}
                <p
                  className="quranic-text text-[1.7rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] leading-[1.8] sm:leading-[1.7] mb-6 sm:mb-8"
                  style={{
                    background: "var(--gold-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {verse.arabic}
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6" aria-hidden="true">
                  <span className="block w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-accent/30" />
                  <span className="text-accent/50 text-sm">✦</span>
                  <span className="block w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-accent/30" />
                </div>

                {/* Translation */}
                <p className="text-primary-foreground/70 text-sm sm:text-base md:text-lg italic max-w-2xl leading-relaxed mb-5">
                  "{verse.translationEn}"
                </p>

                {/* Reference */}
                <div className="inline-flex items-center gap-2">
                  <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${verse.type === "quran" ? "bg-accent/20 text-accent" : "bg-primary-foreground/10 text-primary-foreground/60"}`}>
                    {verse.type === "quran" ? t("Quran", "قرآن") : t("Hadith", "حديث")}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-accent/80 bg-accent/[0.08] px-4 py-1.5 rounded-full border border-accent/10">
                    {t(verse.referenceEn, verse.referenceAr)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {verses.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Verse ${i + 1}`}
                className="group relative p-1"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    active === i
                      ? "w-8 h-2 bg-accent shadow-[0_0_12px_hsl(46_71%_52%/0.4)]"
                      : "w-2 h-2 bg-primary-foreground/20 group-hover:bg-primary-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};

export default QuranVersesSection;
