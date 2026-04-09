import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import { GraduationCap, Star, X, BookOpen, Award } from "lucide-react";
import EgyptFlag from "@/components/EgyptFlag";
import { scrollToContactForm } from "@/lib/scrollToForm";
import type { Teacher } from "@/data/fallbackContent";
import { loadTeachers } from "@/lib/teachersData";

const TeachersSection = () => {
  const { t, lang } = useLanguage();
  const { isMobile, fadeIn, fadeInUp, slideInLeft } = useMobileSafeMotion();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadTeachers()
      .then((data) => {
        if (!cancelled) setTeachers(data);
      })
      .catch(() => {
        if (!cancelled) setTeachers([]);
      });

    return () => { cancelled = true; };
  }, []);

  // Auto-hide: if no teachers returned, render nothing
  if (teachers.length === 0) {
    return null;
  }

  return (
    <>
      <section id="teachers" className="py-24 bg-muted/30 relative overflow-hidden" aria-label="Our Teachers">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            {...fadeIn()}
            className="text-center mb-16"
          >
            <motion.div
              {...(isMobile ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } } : { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, transition: { duration: 0.5, type: "spring" } })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-4"
            >
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                {t("Our Teachers", "معلمونا")}
              </span>
              <GraduationCap className="w-4 h-4 text-accent" />
            </motion.div>
            <motion.h2 {...slideInLeft(0.1)} className="text-3xl md:text-5xl font-bold text-foreground mt-3">
              {t("Meet Our ", "تعرف على ")}<span className="text-primary">{t("Expert Instructors", "معلمينا المتميزين")}</span>
            </motion.h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t(
                "Our certified Al-Azhar graduate teachers are native Arabic speakers from Egypt, bringing years of experience and passion to every lesson.",
                "معلمونا الحاصلون على شهادات من الأزهر هم متحدثون أصليون للغة العربية من مصر، يجلبون سنوات من الخبرة والشغف لكل درس."
              )}
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <EgyptFlag className="w-6 h-4 rounded-sm" />
              <span className="text-sm font-semibold text-primary">
                {t("Native Arabic Speakers — Arabic is Their Mother Tongue", "متحدثون أصليون — اللغة العربية هي لغتهم الأم")}
              </span>
            </div>
          </motion.div>

          {/* Teacher Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teachers.map((teacher, i) => (
              <motion.div
                key={teacher.id}
                {...fadeInUp(i, 0.1)}
                {...(!isMobile && { whileHover: { y: -8, scale: 1.02 } })}
                onClick={() => setSelectedTeacher(teacher)}
                className="group rounded-2xl bg-card border border-border p-6 text-center shadow-card hover:shadow-elevated transition-[box-shadow] duration-300 cursor-pointer"
              >
                {/* Photo */}
                <div className="relative mx-auto mb-4">
                  {teacher.photo_url ? (
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-accent/20 shadow-lg group-hover:border-accent/50 transition-colors">
                      <img
                        src={teacher.photo_url}
                        alt={t(teacher.name_en, teacher.name_ar)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-4 border-accent/20 shadow-lg group-hover:border-accent/50 transition-colors">
                      <GraduationCap className="w-12 h-12 text-primary" />
                    </div>
                  )}
                  {/* Floating badge */}
                  <motion.div
                    {...(isMobile ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } } : { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, transition: { delay: 0.3 + i * 0.1, type: "spring" } })}
                    className="absolute -top-1 -end-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-md"
                  >
                    <Award className="w-4 h-4 text-accent-foreground" />
                  </motion.div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {t(teacher.name_en, teacher.name_ar)}
                </h3>
                <p className="text-sm text-accent font-semibold mb-2">
                  {t(teacher.title_en, teacher.title_ar)}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-[10px] font-semibold text-primary mb-2">
                  <EgyptFlag className="w-4 h-3 rounded-sm" />
                  {t("Native Arabic Speaker", "متحدث أصلي للعربية")}
                </div>

                {/* Rating */}
                {teacher.rating > 0 && (
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s < Math.round(teacher.rating) ? "text-accent fill-accent" : "text-muted"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ms-1">{teacher.rating}</span>
                  </div>
                )}

                {/* Bio preview */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {t(teacher.bio_en, teacher.bio_ar)}
                </p>

                {/* Specializations */}
                {teacher.specializations && teacher.specializations.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {teacher.specializations.slice(0, 3).map((spec, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {spec}
                      </span>
                    ))}
                    {teacher.specializations.length > 3 && (
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        +{teacher.specializations.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* View more hint */}
                <div className="mt-4 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("Click to view full profile →", "اضغط لعرض الملف الكامل ←")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Detail Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedTeacher(null)}
            onKeyDown={(e) => { if (e.key === "Escape") setSelectedTeacher(null); }}
            role="dialog"
            aria-modal="true"
            aria-label={t(selectedTeacher.name_en, selectedTeacher.name_ar)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-elevated border border-border max-w-lg w-full max-h-[85vh] overflow-y-auto relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 end-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header with photo */}
              <div className="relative bg-gradient-to-b from-primary/10 to-transparent pt-8 pb-4 px-6 text-center">
                {selectedTeacher.photo_url ? (
                  <img
                    src={selectedTeacher.photo_url}
                    alt={t(selectedTeacher.name_en, selectedTeacher.name_ar)}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-accent/30 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-4 border-accent/30 shadow-lg">
                    <GraduationCap className="w-14 h-14 text-primary" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mt-4">
                  {t(selectedTeacher.name_en, selectedTeacher.name_ar)}
                </h3>
                <p className="text-accent font-semibold mt-1">
                  {t(selectedTeacher.title_en, selectedTeacher.title_ar)}
                </p>

                {/* Rating */}
                {selectedTeacher.rating > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={`w-5 h-5 ${s < Math.round(selectedTeacher.rating) ? "text-accent fill-accent" : "text-muted"}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ms-2 font-semibold">{selectedTeacher.rating}/5</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="px-6 pb-6 space-y-5">
                {/* Education */}
                {(selectedTeacher.education_en || selectedTeacher.education_ar) && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{t("Education", "التعليم")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t(selectedTeacher.education_en || "", selectedTeacher.education_ar || "")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Experience */}
                {selectedTeacher.experience_years && selectedTeacher.experience_years > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{t("Experience", "الخبرة")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t(`${selectedTeacher.experience_years} years of teaching experience`, `${selectedTeacher.experience_years} سنوات من الخبرة في التدريس`)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Bio */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1">{t("About", "نبذة")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(selectedTeacher.bio_en, selectedTeacher.bio_ar)}
                    </p>
                  </div>
                </div>

                {/* Specializations */}
                {selectedTeacher.specializations && selectedTeacher.specializations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-2">{t("Specializations", "التخصصات")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.specializations.map((spec, j) => (
                        <span
                          key={j}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); setSelectedTeacher(null); scrollToContactForm(); }}
                  className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-card"
                >
                  {t("Book a Free Trial", "احجز تجربة مجانية")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeachersSection;
