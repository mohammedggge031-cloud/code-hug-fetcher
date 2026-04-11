import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { getFlagUrl } from "@/data/countries";
import { supabase } from "@/integrations/supabase/client";
import { usePlacementVideos, type PlacementVideo } from "@/hooks/usePlacementVideos";
import avatarMale from "@/assets/avatar-male.webp";
import avatarFemale from "@/assets/avatar-female.webp";

interface PlacementVideo {
  youtubeId: string;
  titleEn: string;
  titleAr: string;
  placement?: string[];
}

const testimonials = [
  {
    nameEn: "Dursa ali",
    nameAr: "درسة علي",
    roleEn: "Student",
    roleAr: "طالب",
    gender: "male",
    country: "us",
    textEn: "The one-on-one sessions made a huge difference in my Tajweed. My teacher patiently corrects every letter, and I genuinely feel myself improving week after week.",
    textAr: "الحصص الفردية أحدثت فرق كبير في التجويد عندي. معلمي بيصحح كل حرف بصبر وفعلاً حاسس إني بتحسن كل أسبوع.",
  },
  {
    nameEn: "Zayan",
    nameAr: "زيان",
    roleEn: "Student",
    roleAr: "طالب",
    gender: "male",
    country: "bd",
    textEn: "I started from zero — couldn't even read Arabic letters. Now I read Quran fluently thanks to the Noor Al-Bayan method. The teachers are incredibly patient and make every lesson enjoyable!",
    textAr: "بدأت من الصفر — ما كنت أعرف أقرأ الحروف العربية. دلوقتي بأقرأ القرآن بطلاقة بفضل طريقة نور البيان. المعلمين صبورين جداً وبيخلوا كل حصة ممتعة!",
  },
  {
    nameEn: "Aisha M.",
    nameAr: "عائشة م.",
    roleEn: "Student",
    roleAr: "طالبة",
    gender: "female",
    country: "gb",
    textEn: "Having a female teacher was so important to me. She feels like an older sister guiding me through my Hifz journey with love and patience 💜",
    textAr: "وجود معلمة كان مهم جداً بالنسبة لي. حاسة إنها زي أختي الكبيرة بتوجهني في رحلة الحفظ بحب وصبر 💜",
  },
  {
    nameEn: "Issa",
    nameAr: "عيسى",
    roleEn: "Parent",
    roleAr: "ولي أمر",
    gender: "male",
    country: "ca",
    textEn: "Honestly, I'm impressed by how the teachers handle my kids. They make learning feel like play — my children actually ask for their Quran class every day.",
    textAr: "بصراحة معجب جداً بطريقة المعلمين مع أطفالي. يخلّوا التعلم زي اللعب — أطفالي هم اللي بيطلبوا حصة القرآن كل يوم.",
  },
  {
    nameEn: "Naveed Shahul",
    nameAr: "نافيد شاهول",
    roleEn: "Student",
    roleAr: "طالب",
    gender: "male",
    country: "bd",
    textEn: "Everything runs so smoothly here. From booking to class follow-ups, the whole system is organized and professional. No complaints at all.",
    textAr: "كل حاجة بتمشي بسلاسة هنا. من الحجز لمتابعة الحصص، النظام كله منظم واحترافي. مفيش أي شكوى.",
  },
  {
    nameEn: "Hamza A.",
    nameAr: "حمزة أ.",
    roleEn: "Adult Student",
    roleAr: "طالب بالغ",
    gender: "male",
    country: "ae",
    textEn: "What I appreciate most is that the teachers truly care. They celebrate every small milestone with you and always push you to keep going 🌟",
    textAr: "أكتر حاجة بقدّرها إن المعلمين فعلاً مهتمين. بيحتفلوا معاك بكل إنجاز صغير وبيشجعوك تكمل دايماً 🌟",
  },
  {
    nameEn: "Ruqayyah N.",
    nameAr: "رقية ن.",
    roleEn: "Parent",
    roleAr: "ولية أمر",
    gender: "female",
    country: "se",
    textEn: "The personal attention here is unmatched. Teachers know each student's strengths and weaknesses and adapt their approach accordingly.",
    textAr: "الاهتمام الشخصي هنا مالوش مثيل. المعلمون يعرفوا نقاط قوة وضعف كل طالب ويكيّفوا أسلوبهم على حسب كده.",
  },
  {
    nameEn: "Fatima K.",
    nameAr: "فاطمة ك.",
    roleEn: "Student",
    roleAr: "طالبة",
    gender: "female",
    country: "de",
    textEn: "I was really nervous about online Quran learning at first, but the teachers put me at ease right away. Best decision I've made 🌸",
    textAr: "كنت متوترة في الأول من تعلم القرآن أونلاين، بس المعلمات طمّنوني من أول حصة. أحسن قرار اتخذته 🌸",
  },
  {
    nameEn: "Tariq J.",
    nameAr: "طارق ج.",
    roleEn: "Student",
    roleAr: "طالب",
    gender: "male",
    country: "ng",
    textEn: "بارك الله فيكم — the structured curriculum and welcoming environment made me comfortable from day one. A truly world-class experience.",
    textAr: "بارك الله فيكم — المنهج المنظم والبيئة المرحبة خلتني مرتاح من أول يوم. تجربة عالمية بكل معنى الكلمة.",
  },
];

const IntroVideos = ({ t, fadeIn, videos }: { t: (en: string, ar: string) => string; fadeIn: (delay?: number) => any; videos: PlacementVideo[] }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <motion.div {...fadeIn()} className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-6">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">
          {t("Get to Know Us", "تعرف علينا")}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mt-2">
          {t("Watch Some of Our Students", "شوف بعض طلابنا")}
        </h3>
      </div>
      <div className={`grid gap-6 ${videos.length === 1 ? "max-w-3xl mx-auto" : videos.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {videos.map((video) => (
          <div key={video.youtubeId} className="rounded-2xl overflow-hidden shadow-lg border border-primary-foreground/10">
            {playingId === video.youtubeId ? (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  title={t(video.titleEn, video.titleAr)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                onClick={() => setPlayingId(video.youtubeId)}
                className="relative w-full aspect-video group focus:outline-none"
                aria-label={t("Play video", "تشغيل الفيديو")}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={t(video.titleEn, video.titleAr)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground fill-current ms-1" />
                  </div>
                </div>
              </button>
            )}
            {videos.length > 1 && (
              <div className="p-3 bg-primary-foreground/5">
                <p className="text-xs text-primary-foreground/70 font-medium text-center line-clamp-1">
                  {t(video.titleEn, video.titleAr)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ITEMS_DESKTOP = 3;
const ITEMS_TABLET = 2;
const ITEMS_MOBILE = 1;

const TestimonialsSection = () => {
  const { t, lang } = useLanguage();
  const { fadeIn, slideInLeft } = useMobileSafeMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [placementVideos, setPlacementVideos] = useState<PlacementVideo[]>([]);

  // Load videos with "testimonials" placement from DB
  useEffect(() => {
    const fallback: PlacementVideo[] = [{ youtubeId: "ki2Nqq_HJ6U", titleEn: "Non-Arab Student Reciting Quran", titleAr: "طالب غير عربي يقرأ القرآن", placement: ["testimonials"] }];
    supabase.from("custom_scripts").select("script_content").eq("name", "video_library").maybeSingle()
      .then(({ data, error }) => {
        if (error || !data?.script_content) {
          setPlacementVideos(fallback);
          return;
        }
        try {
          const parsed = JSON.parse(data.script_content);
          if (Array.isArray(parsed)) {
            const filtered = parsed.filter((v: any) => v.placement?.includes("testimonials"));
            setPlacementVideos(filtered.length > 0 ? filtered : fallback);
            return;
          }
        } catch {}
        setPlacementVideos(fallback);
      });
  }, []);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setViewMode('mobile');
      else if (w < 1024) setViewMode('tablet');
      else setViewMode('desktop');
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const itemsPerPage = viewMode === 'mobile' ? ITEMS_MOBILE : viewMode === 'tablet' ? ITEMS_TABLET : ITEMS_DESKTOP;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const isCompactView = viewMode !== 'desktop';
  const carouselMinHeightClass = viewMode === 'mobile' ? 'min-h-[360px]' : viewMode === 'tablet' ? 'min-h-[400px]' : '';

  useEffect(() => {
    setPage(0);
  }, [viewMode]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => {
      const w = window.innerWidth;
      const perPage = w < 640 ? ITEMS_MOBILE : w < 1024 ? ITEMS_TABLET : ITEMS_DESKTOP;
      const tp = Math.ceil(testimonials.length / perPage);
      const next = prev + newDirection;
      if (next < 0) return tp - 1;
      if (next >= tp) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (viewMode !== 'desktop' || isPaused || !isInView) return;
    intervalRef.current = setInterval(() => {
      paginate(lang === "ar" ? -1 : 1);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [viewMode, isPaused, isInView, paginate, lang]);

  const currentItems = testimonials.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  // On mobile & tablet, use opacity-only to prevent horizontal overflow jitter on iOS
  const variants = viewMode === 'desktop' ? {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  } : {
    enter: () => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: () => ({ opacity: 0 }),
  };

  return (
    <section ref={sectionRef} id="testimonials" className="bg-hero geometric-pattern py-16 sm:py-20 md:py-24" aria-label="Student Testimonials and Reviews">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Intro Videos */}
        <IntroVideos t={t} fadeIn={fadeIn} videos={placementVideos} />

        <motion.div
          {...fadeIn()}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Testimonials", "آراء الطلاب")}
          </span>
          <motion.h2 {...slideInLeft(0.1)} className="text-3xl md:text-5xl font-bold text-primary-foreground mt-3">
            {t("What Our Students Say", "ماذا يقول طلابنا")}
          </motion.h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(lang === "ar" ? 1 : -1)}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors duration-200"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(lang === "ar" ? -1 : 1)}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors duration-200"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards — on mobile render statically to prevent iOS jitter */}
          <div className={`overflow-hidden px-8 md:px-2 ${carouselMinHeightClass}`}>
            {isCompactView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {currentItems.map((item) => {
                  const avatar = item.gender === "female" ? avatarFemale : avatarMale;
                  return (
                    <div
                      key={item.nameEn}
                      className="bg-card/15 rounded-2xl p-6 sm:p-8 border border-primary-foreground/10"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="relative flex-shrink-0">
                          <img src={avatar} alt={t(item.nameEn, item.nameAr)} width={48} height={48} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover border-2 border-accent/30" />
                          <img src={getFlagUrl(item.country, 40)} alt={`${item.country.toUpperCase()} flag`} width={20} height={15} loading="lazy" decoding="async" className="absolute -bottom-0.5 -right-1 w-5 h-[15px] rounded-sm shadow-sm border border-primary/50 object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-primary-foreground text-sm">{t(item.nameEn, item.nameAr)}</div>
                          <div className="text-xs text-primary-foreground/50">{t(item.roleEn, item.roleAr)}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                      </div>
                      <div className="relative min-h-[156px] bg-primary-foreground/8 rounded-xl rounded-tl-sm px-4 py-3 border border-primary-foreground/8 sm:min-h-[170px]">
                        <p className="text-primary-foreground/80 leading-relaxed text-sm">{t(item.textEn, item.textAr)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
                >
                  {currentItems.map((item) => {
                    const avatar = item.gender === "female" ? avatarFemale : avatarMale;
                    return (
                      <div
                        key={item.nameEn}
                        className="bg-card/15 rounded-2xl p-6 sm:p-8 border border-primary-foreground/10 hover:border-accent/20 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div className="relative flex-shrink-0">
                            <img src={avatar} alt={t(item.nameEn, item.nameAr)} width={48} height={48} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover border-2 border-accent/30" />
                            <img src={getFlagUrl(item.country, 40)} alt={`${item.country.toUpperCase()} flag`} width={20} height={15} loading="lazy" decoding="async" className="absolute -bottom-0.5 -right-1 w-5 h-[15px] rounded-sm shadow-sm border border-primary/50 object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-primary-foreground text-sm">{t(item.nameEn, item.nameAr)}</div>
                            <div className="text-xs text-primary-foreground/50">{t(item.roleEn, item.roleAr)}</div>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                        </div>
                        <div className="relative min-h-[156px] bg-primary-foreground/8 rounded-xl rounded-tl-sm px-4 py-3 border border-primary-foreground/8 sm:min-h-[170px]">
                          <p className="text-primary-foreground/80 leading-relaxed text-sm">{t(item.textEn, item.textAr)}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > page ? 1 : -1);
                  setPage(i);
                }}
                className="relative w-8 h-8 flex items-center justify-center rounded-full"
                aria-label={`Page ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === page ? "w-6 h-2.5 bg-accent" : "w-2.5 h-2.5 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
