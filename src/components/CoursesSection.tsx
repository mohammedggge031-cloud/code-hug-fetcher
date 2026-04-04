import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Star } from "lucide-react";
import { scrollToContactForm } from "@/lib/scrollToForm";
import { courses } from "@/data/courses";
import { Link, useLocation } from "react-router-dom";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";

import courseQuran from "@/assets/course-quran.webp";
import courseTajweed from "@/assets/course-tajweed.webp";
import courseArabic from "@/assets/course-arabic.webp";
import courseIslamic from "@/assets/course-islamic.webp";
import courseAllInOne from "@/assets/course-allinone.webp";

const courseImages = [courseQuran, courseTajweed, courseArabic, courseIslamic, courseAllInOne];

const CoursesSection = () => {
  const { t, lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const location = useLocation();
  const { isMobile, fadeIn, fadeInUp } = useMobileSafeMotion();

  const saveCourseReturnState = useCallback(() => {
    const path = `${location.pathname}${location.search}`;
    const section = document.getElementById("courses");
    const sectionTop = section
      ? Math.max(Math.round(section.getBoundingClientRect().top + window.scrollY - 96), 0)
      : Math.max(Math.round(window.scrollY), 0);

    window.sessionStorage.setItem(
      "courseReturnState",
      JSON.stringify({ path, y: sectionTop, ts: Date.now() })
    );
  }, [location.pathname, location.search]);

  return (
      <section id="courses" className="py-16 sm:py-20 md:py-24 bg-section relative overflow-hidden" aria-label="Online Quran, Arabic and Islamic Studies Courses">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full geometric-pattern" />
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div {...fadeIn()} className="text-center mb-16">
            <motion.div
              {...(isMobile ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } } : { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, transition: { duration: 0.5, type: "spring" } })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-4"
            >
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                {t("Our Programs", "برامجنا")}
              </span>
              <Star className="w-4 h-4 text-accent" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
              {t("Check Our ", "اكتشف ")}<span className="text-primary">{t("Courses", "دوراتنا")}</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t(
                "Comprehensive Islamic education tailored to your goals, schedule, and level.",
                "تعليم إسلامي شامل مصمم وفقاً لأهدافك وجدولك ومستواك."
              )}
            </p>
          </motion.div>

          {/* Course Cards Grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none lg:grid-cols-3 xl:grid-cols-5 sm:gap-6 max-w-7xl mx-auto -mx-2 px-2 sm:mx-auto sm:px-0" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}>
            {courses.map((course, i) => (
              <Link
                to={`/courses/${course.slug}`}
                state={{
                  fromCoursesSection: true,
                  // Use base path without hash for stability on back navigation.
                  fromPath: `${location.pathname}${location.search}`,
                }}
                onClick={saveCourseReturnState}
                key={course.titleEn}
              >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-card rounded-2xl shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border cursor-pointer overflow-hidden flex flex-col items-center text-center h-full min-w-[260px] sm:min-w-0 snap-center"
              >
                {/* Course Image */}
                <div className="relative w-full pt-6 px-6">
                  <motion.div
                    whileHover={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-accent/20 shadow-lg group-hover:border-accent/50 transition-colors"
                  >
                    <img
                      src={courseImages[i]}
                      alt={`${t(course.titleEn, course.titleAr)} - Online ${course.titleEn} at Alhamd Academy`}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </motion.div>
                  {/* Floating badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    className="absolute top-4 end-4 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-md"
                  >
                    <course.icon className="w-4 h-4 text-accent-foreground" />
                  </motion.div>
                </div>

                {/* Course Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(course.titleEn, course.titleAr)}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">
                    {t(course.descEn, course.descAr)}
                  </p>

                {/* Sub-courses count + Ijazah price badge */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                      {course.subCourses.length} {t("tracks", "مسارات")}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-[gap] duration-200">
                    {t("View Details", "عرض التفاصيل")}
                    <ArrowIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className="w-full h-1 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToContactForm(); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-card"
            >
              {t("Start Your Free Trial", "ابدأ تجربتك المجانية")}
              <ArrowIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
  );
};

export default CoursesSection;
