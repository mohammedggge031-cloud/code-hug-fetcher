import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, BookOpen, Shield } from "lucide-react";
import EgyptFlag from "@/components/EgyptFlag";
import CountUpStat from "@/components/CountUpStat";
import { useState, useEffect, lazy, Suspense } from "react";
import { scrollToContactForm } from "@/lib/scrollToForm";
import { getSafeScrollBehavior } from "@/lib/scrollBehavior";

const HERO_SRCSET = "/quran-hero-640.webp 640w, /quran-hero-1024.webp 1024w, /quran-hero.webp 1920w";
const HERO_IMAGE_JPG = "/quran-hero.jpg";

const DesktopGallery = lazy(() => import("@/components/HeroDesktopGallery"));

const stats = [
  { num: "200+", labelEn: "Students", labelAr: "طالب وطالبة" },
  { num: "20+", labelEn: "Certified Teachers", labelAr: "معلم معتمد" },
  { num: "7+", labelEn: "Years Experience", labelAr: "سنوات خبرة" },
  { num: "24/7", labelEn: "Available Anytime", labelAr: "متاحون دائماً" },
  { num: "8+", labelEn: "Countries Served", labelAr: "دولة حول العالم" },
];

const HeroSection = () => {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden lg:min-h-screen" aria-label="Hero - Learn Quran Online with Alhamd Academy">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          srcSet={HERO_SRCSET}
          src={HERO_IMAGE_JPG}
          alt="Open Quran with Arabic calligraphy - Alhamd Academy online Quran classes"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          data-hero-bg=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/40" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pb-16 pt-24 sm:px-8 md:pt-32 lg:px-16 lg:pt-32 xl:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-start">
            <div className="animate-fade-up mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/25 px-5 py-2.5 text-center lg:justify-start lg:text-start">
              <EgyptFlag className="w-5 h-3.5 shrink-0" />
              <span className="text-sm font-semibold text-accent">
                {t(
                  "Native Arabic Speakers · Al-Azhar Graduates",
                  "متحدثون أصليون للعربية · خريجو الأزهر الشريف"
                )}
              </span>
            </div>

            <h1 className="animate-fade-up motion-delay-100 mb-4 text-[2rem] font-bold leading-[1.3] tracking-[-0.02em] text-primary-foreground sm:text-4xl sm:leading-[1.25] md:text-5xl md:leading-[1.22] md:tracking-[-0.03em] lg:text-[3.35rem] xl:text-6xl overflow-visible">
              {t("One-on-One Quran & Arabic Classes", "دروس قرآن وعربية فردية")}
              <br />
              <span className="mt-2 block text-gradient-gold text-[1.6rem] leading-[1.4] sm:text-3xl sm:leading-[1.35] md:text-4xl md:leading-[1.3] lg:text-[2.8rem] xl:text-5xl overflow-visible">
                {t("Not Just Classes — A Life-Changing Journey", "مش بس حصص — دا رحلة تغيير")}
              </span>
            </h1>

            <p className="animate-fade-up motion-delay-150 mb-4 text-base font-semibold text-accent md:text-lg">
              {t(
                "Kids · Adults · Sisters — All Levels Welcome",
                "أطفال · كبار · أخوات — جميع المستويات"
              )}
            </p>

            <p className="animate-fade-up motion-delay-200 mx-auto mb-8 max-w-2xl text-base leading-7 text-primary-foreground/90 sm:leading-8 lg:mx-0 md:text-lg">
              {t(
                "Mixing up letters? Confused by Tajweed rules? Struggling to speak Arabic? At Alhamd Academy, our native Arabic Al-Azhar teachers know exactly what non-Arabic speakers face — and guide you from Noor Al-Bayan to Ijazah, helping you speak Arabic and study Islam in its original language.",
                "بتلخبط بين الحروف؟ التجويد محيّرك؟ صعب عليك تتكلم عربي؟ في أكاديمية الحمد، معلمونا من الأزهر فاهمين بالظبط صعوبات غير الناطقين بالعربية — ويرشدونك من نور البيان للإجازة، ويساعدونك تتكلم عربي وتدرس الإسلام بلغته الأصلية."
              )}
            </p>

            <div className="animate-fade-up motion-delay-300 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContactForm();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent/90 px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-card ring-1 ring-accent/15 transition-colors hover:bg-accent sm:px-8 sm:py-4 sm:text-base"
              >
                {t("Book Your Free Trial", "احجز حصتك المجانية")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("courses");
                  if (target) {
                    const headerOffset = 96;
                    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({ top: Math.max(top, 0), behavior: getSafeScrollBehavior() });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary-foreground/30 px-6 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:px-8 sm:py-4"
              >
                <BookOpen className="h-5 w-5" />
                {t("Explore Courses", "استكشف الدورات")}
              </a>
            </div>

            <p className="animate-fade-in motion-delay-500 mt-4 flex items-center justify-center gap-2 text-sm text-primary-foreground/55 lg:justify-start">
              <Shield className="h-4 w-4" />
              {t("100% Free · No credit card · No commitment", "مجانية 100% · بدون بطاقة · بدون التزام")}
            </p>

            {/* Stats with professional dividers */}
            <div className="animate-fade-up motion-delay-500 mt-10 sm:mt-12 lg:mx-0">
              <div className="grid grid-cols-2 gap-y-5 gap-x-2 sm:grid-cols-5 lg:justify-items-start justify-items-center">
                {stats.map((s) => (
                  <CountUpStat key={s.num} num={s.num} labelEn={s.labelEn} labelAr={s.labelAr} />
                ))}
              </div>
            </div>
          </div>

          {isDesktop && (
            <Suspense fallback={<div className="hidden h-[460px] w-[380px] lg:block" />}>
              <DesktopGallery />
            </Suspense>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
