import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { getCountryCode, getFlagUrl } from "@/data/countries";
import { supabase } from "@/integrations/supabase/client";
import { usePlacementVideos, type PlacementVideo } from "@/hooks/usePlacementVideos";
import avatarMale from "@/assets/avatar-male.webp";
import avatarFemale from "@/assets/avatar-female.webp";

interface ApprovedReview {
  id: string;
  name: string;
  country: string | null;
  course: string | null;
  gender: string | null;
  rating: number | null;
  review_text: string;
  created_at: string;
}

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
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
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
  const placementVideos = usePlacementVideos();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials-approved"],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from("student_reviews_approved" as never)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(24) as unknown as Promise<{ data: ApprovedReview[] | null; error: { message: string } | null }>);
      if (error) throw error;
      return (data || []) as unknown as ApprovedReview[];
    },
    staleTime: 5 * 60 * 1000,
  });

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
  const totalPages = Math.max(1, Math.ceil(testimonials.length / itemsPerPage));
  const isCompactView = viewMode !== 'desktop';
  const carouselMinHeightClass = viewMode === 'mobile' ? 'min-h-[360px]' : viewMode === 'tablet' ? 'min-h-[400px]' : '';

  useEffect(() => {
    setPage(0);
  }, [viewMode, testimonials.length]);

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
      const tp = Math.max(1, Math.ceil(testimonials.length / perPage));
      const next = prev + newDirection;
      if (next < 0) return tp - 1;
      if (next >= tp) return 0;
      return next;
    });
  }, [testimonials.length]);

  useEffect(() => {
    if (viewMode !== 'desktop' || isPaused || !isInView || testimonials.length <= ITEMS_DESKTOP) return;
    intervalRef.current = setInterval(() => {
      paginate(lang === "ar" ? -1 : 1);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [viewMode, isPaused, isInView, paginate, lang, testimonials.length]);

  // Hide section entirely if no approved reviews and no intro videos.
  if (!isLoading && testimonials.length === 0 && placementVideos.length === 0) {
    return null;
  }

  const currentItems = testimonials.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const variants = viewMode === 'desktop' ? {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  } : {
    enter: () => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: () => ({ opacity: 0 }),
  };

  const renderCard = (item: ApprovedReview) => {
    const isFemale = item.gender === "female";
    const avatar = isFemale ? avatarFemale : avatarMale;
    const countryCode = item.country ? getCountryCode(item.country) : null;
    const rating = Math.max(1, Math.min(5, item.rating ?? 5));

    return (
      <div
        key={item.id}
        className="bg-card/15 rounded-2xl p-6 sm:p-8 border border-primary-foreground/10 hover:border-accent/20 transition-colors duration-300"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-shrink-0">
            <img
              src={avatar}
              alt={item.name}
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
            />
            {countryCode && (
              <img
                src={getFlagUrl(countryCode, 40)}
                alt={`${item.country} flag`}
                width={20}
                height={15}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-0.5 -right-1 w-5 h-[15px] rounded-sm shadow-sm border border-primary/50 object-cover"
              />
            )}
          </div>
          <div>
            <div className="font-bold text-primary-foreground text-sm">{item.name}</div>
            <div className="text-xs text-primary-foreground/50">
              {item.country || (item.course ?? t("Student", "طالب"))}
            </div>
          </div>
        </div>
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, j) => (
            <Star key={j} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>
        <div className="relative min-h-[156px] bg-primary-foreground/8 rounded-xl rounded-tl-sm px-4 py-3 border border-primary-foreground/8 sm:min-h-[170px]">
          <p className="text-primary-foreground/80 leading-relaxed text-sm">{item.review_text}</p>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="testimonials" className="bg-hero geometric-pattern py-16 sm:py-20 md:py-24" aria-label="Student Testimonials and Reviews">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Intro Videos */}
        <IntroVideos t={t} fadeIn={fadeIn} videos={placementVideos} />

        {(isLoading || testimonials.length > 0) && (
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
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card/10 rounded-2xl p-6 sm:p-8 border border-primary-foreground/10 animate-pulse">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/10" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded bg-primary-foreground/10" />
                    <div className="h-2.5 w-16 rounded bg-primary-foreground/10" />
                  </div>
                </div>
                <div className="h-32 rounded-xl bg-primary-foreground/5" />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? null : (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Arrows — hide if everything fits in one page */}
            {totalPages > 1 && (
              <>
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
              </>
            )}

            <div className={`overflow-hidden px-8 md:px-2 ${carouselMinHeightClass}`}>
              {isCompactView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {currentItems.map((item) => renderCard(item))}
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
                    {currentItems.map((item) => renderCard(item))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {totalPages > 1 && (
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
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
