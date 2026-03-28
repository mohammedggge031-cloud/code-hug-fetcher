import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect, useRef, forwardRef } from "react";
import { getFlagUrl } from "@/data/countries";
import avatarMale from "@/assets/avatar-male.png";
import avatarFemale from "@/assets/avatar-female.png";

const testimonials = [
  {
    nameEn: "Dusa Ali",
    nameAr: "دعاء علي",
    roleEn: "Parent",
    roleAr: "ولية أمر",
    gender: "female",
    country: "gb",
    textEn: "Wa alaykum salam 😊 My children have made incredible progress in their Quran recitation. The teachers are patient, skilled, and truly passionate about teaching.",
    textAr: "وعليكم السلام 😊 أحرز أطفالي تقدمًا مذهلاً في تلاوة القرآن. المعلمون صبورون ومهرة ومتحمسون حقًا للتدريس.",
  },
  {
    nameEn: "Zayan",
    nameAr: "زيان",
    roleEn: "Adult Student",
    roleAr: "طالب بالغ",
    gender: "male",
    country: "us",
    textEn: "Assalamu alaykum! As a busy professional, the flexible scheduling is a blessing. I've been able to consistently learn Arabic and Quran around my work schedule 🤲",
    textAr: "السلام عليكم! كمحترف مشغول، المواعيد المرنة نعمة. تمكنت من تعلم العربية والقرآن بانتظام حول جدول عملي 🤲",
  },
  {
    nameEn: "Izzan",
    nameAr: "عزان",
    roleEn: "Student",
    roleAr: "طالبة",
    gender: "female",
    country: "au",
    textEn: "Wa alaykum salam! I completed my Hifz journey with Alhamd Academy. The structured program and supportive teachers made what seemed impossible totally achievable 🎉",
    textAr: "وعليكم السلام! أكملت رحلة حفظي مع أكاديمية الحمد. البرنامج المنظم والمعلمون الداعمون جعلوا ما بدا مستحيلاً قابلاً للتحقيق 🎉",
  },
  {
    nameEn: "Issa",
    nameAr: "عيسى",
    roleEn: "Parent",
    roleAr: "ولي أمر",
    gender: "male",
    country: "ca",
    textEn: "Assalamu alaykum Sheikh! The way the teachers treat my kids is outstanding. They make learning feel like fun, and my children actually look forward to their classes every day 💚",
    textAr: "السلام عليكم يا شيخ! طريقة تعامل المعلمين مع أطفالي رائعة. يجعلون التعلم ممتعًا وأطفالي يتطلعون لحصصهم كل يوم 💚",
  },
  {
    nameEn: "Naveed Shahul",
    nameAr: "نافيد شاهول",
    roleEn: "Student",
    roleAr: "طالب",
    gender: "male",
    country: "bd",
    textEn: "Wa alaykum salam 🙏 I was amazed by how organized and professional the system is. Everything from booking to class follow-ups runs so smoothly.",
    textAr: "وعليكم السلام 🙏 أذهلني مدى تنظيم واحترافية النظام. كل شيء من الحجز إلى متابعة الحصص يسير بسلاسة تامة.",
  },
  {
    nameEn: "Hamza A.",
    nameAr: "حمزة أ.",
    roleEn: "Adult Student",
    roleAr: "طالب بالغ",
    gender: "male",
    country: "ae",
    textEn: "JazakAllah khair! The teachers genuinely care about your progress. They celebrate every milestone with you and always encourage you to keep going 🌟",
    textAr: "جزاكم الله خيراً! المعلمون يهتمون حقًا بتقدمك. يحتفلون معك بكل إنجاز ويشجعونك دائمًا على الاستمرار 🌟",
  },
  {
    nameEn: "Ruqayyah N.",
    nameAr: "رقية ن.",
    roleEn: "Parent",
    roleAr: "ولية أمر",
    gender: "female",
    country: "se",
    textEn: "Wa alaykum salam! What sets Alhamd Academy apart is the personal attention. The teachers know each student's strengths and adapt their teaching accordingly.",
    textAr: "وعليكم السلام! ما يميز أكاديمية الحمد هو الاهتمام الشخصي. المعلمون يعرفون نقاط قوة كل طالب ويكيّفون تدريسهم وفقًا لذلك.",
  },
  {
    nameEn: "Tariq J.",
    nameAr: "طارق ج.",
    roleEn: "Student",
    roleAr: "طالب",
    gender: "male",
    country: "ng",
    textEn: "Assalamu alaykum! The academy's structured curriculum and warm, welcoming environment made me feel comfortable from day one. Truly a world-class experience 🤲",
    textAr: "السلام عليكم! المنهج المنظم والبيئة الدافئة والمرحبة جعلتني أشعر بالراحة من اليوم الأول. تجربة عالمية المستوى حقًا 🤲",
  },
];

const ITEMS_DESKTOP = 3;
const ITEMS_TABLET = 2;
const ITEMS_MOBILE = 1;

const TestimonialsSection = forwardRef<HTMLElement>((_, ref) => {
  const { t, lang } = useLanguage();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

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

  useEffect(() => {
    setPage(0);
  }, [viewMode]);

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
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      paginate(lang === "ar" ? -1 : 1);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, paginate, lang]);

  const currentItems = testimonials.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section ref={ref} id="testimonials" className="py-16 sm:py-20 md:py-24 bg-hero geometric-pattern" aria-label="Student Testimonials and Reviews">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Testimonials", "آراء الطلاب")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mt-3">
            {t("What Our Students Say", "ماذا يقول طلابنا")}
          </h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(lang === "ar" ? 1 : -1)}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all duration-300"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(lang === "ar" ? -1 : 1)}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all duration-300"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden px-8 md:px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
              >
                {currentItems.map((item) => {
                  const avatar = item.gender === "female" ? avatarFemale : avatarMale;

                  return (
                    <div
                      key={item.nameEn}
                      className="bg-card/15 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary-foreground/10 hover:border-accent/20 transition-all duration-300"
                    >
                      {/* Author header with avatar + flag */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={avatar}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                          />
                          <img
                            src={getFlagUrl(item.country, 40)}
                            alt=""
                            width={20}
                            height={15}
                            loading="lazy"
                            className="absolute -bottom-0.5 -right-1 w-5 h-[15px] rounded-sm shadow-sm border border-primary/50 object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-primary-foreground text-sm">{t(item.nameEn, item.nameAr)}</div>
                          <div className="text-xs text-primary-foreground/50">{t(item.roleEn, item.roleAr)}</div>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* WhatsApp-style message bubble */}
                      <div className="relative bg-primary-foreground/8 rounded-xl rounded-tl-sm px-4 py-3 border border-primary-foreground/8">
                        <p className="text-primary-foreground/80 leading-relaxed text-sm">
                          {t(item.textEn, item.textAr)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
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
});

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;
