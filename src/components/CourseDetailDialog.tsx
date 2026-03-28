import React, { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Star, ChevronRight, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { scrollToContactForm } from "@/lib/scrollToForm";
import type { Course } from "@/data/courses";

import courseQuran from "@/assets/course-quran.webp";
import courseTajweed from "@/assets/course-tajweed.webp";
import courseArabic from "@/assets/course-arabic.webp";
import courseIslamic from "@/assets/course-islamic.webp";
import courseAllInOne from "@/assets/course-allinone.webp";

const courseImages: Record<string, string> = {
  "Quran Course": courseQuran,
  "Tajweed Course": courseTajweed,
  "Arabic Course": courseArabic,
  "Islamic Studies": courseIslamic,
  "All-in-One Course": courseAllInOne,
};

interface Props {
  course: Course | null;
  onClose: () => void;
}

const CourseDetailDialog = forwardRef<HTMLDivElement, Props>(({ course, onClose }, ref) => {
  const { t } = useLanguage();
  const courseImage = course ? courseImages[course.titleEn] : null;

  return (
    <Dialog open={!!course} onOpenChange={(open) => !open && onClose()}>
      <DialogContent ref={ref} className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {course && (
          <div className="flex flex-col">
            {/* Hero header */}
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-6 pb-8">
              <DialogHeader>
                <div className="flex items-center gap-4 mb-3">
                  {courseImage && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-lg flex-shrink-0">
                      <img
                        src={courseImage}
                        alt={t(course.titleEn, course.titleAr)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      {t(course.titleEn, course.titleAr)}
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm">
                      {t(course.descEn, course.descAr)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Native teachers badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-xs mt-2">
                <span>🇪🇬</span>
                <span className="text-muted-foreground font-medium">
                  {t(
                    "Taught by certified native Arabic-speaking teachers from Egypt with 7+ years of experience",
                    "يُدرَّس بواسطة معلمين معتمدين متحدثين أصليين للعربية من مصر بخبرة أكثر من 7 سنوات"
                  )}
                </span>
              </div>

              {/* Key Features bar */}
              <div className="flex flex-wrap gap-2 mt-4">
                {course.featuresEn.map((_, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground shadow-sm">
                    <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    {t(course.featuresEn[idx], course.featuresAr[idx])}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* ===== TRACKS / SUB-COURSES ===== */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-accent" />
                  {t("Available Tracks", "المسارات المتاحة")}
                  <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {course.subCourses.length} {t("tracks", "مسارات")}
                  </span>
                </h4>

                <div className="space-y-4">
                  {course.subCourses.map((sub, idx) => (
                    <div key={idx} className="bg-card rounded-xl border border-border hover:border-accent/30 transition-colors overflow-hidden">
                      <div className="p-5">
                        <h5 className="font-bold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-accent/15 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          {t(sub.titleEn, sub.titleAr)}
                        </h5>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {t(sub.descEn, sub.descAr)}
                        </p>

                        {/* Highlights */}
                        {sub.highlightsEn && sub.highlightsEn.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {sub.highlightsEn.map((_, hIdx) => (
                              <span key={hIdx} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium border border-primary/10">
                                <Check className="w-3 h-3" />
                                {t(sub.highlightsEn![hIdx], sub.highlightsAr?.[hIdx] || sub.highlightsEn![hIdx])}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== FAQ SECTION ===== */}
              {course.faqs && course.faqs.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    {t("Frequently Asked Questions", "الأسئلة الشائعة")}
                  </h4>
                  <Accordion type="single" collapsible className="w-full">
                    {course.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`} className="border-border">
                        <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-accent hover:no-underline py-3">
                          {t(faq.questionEn, faq.questionAr)}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                          {t(faq.answerEn, faq.answerAr)}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* ===== STUDENT REVIEWS ===== */}
              {course.reviews && course.reviews.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    {t("What Students Say", "ماذا يقول الطلاب")}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {course.reviews.map((review, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3 italic">
                          "{t(review.textEn, review.textAr)}"
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.country}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== CTA ===== */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); onClose(); scrollToContactForm(); }}
                  className="flex-1 text-center py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  {t("Start Free Trial", "ابدأ تجربة مجانية")}
                </a>
                <a
                  href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3.5 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-colors border border-accent/20 text-sm"
                >
                  {t("Ask on WhatsApp", "اسأل على واتساب")}
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});

CourseDetailDialog.displayName = "CourseDetailDialog";

export default CourseDetailDialog;
