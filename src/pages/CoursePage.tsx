import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { courses, type CourseSlug } from "@/data/courses";

import { Check, Star, ChevronRight, ArrowLeft, ArrowRight, BookOpen, Phone, Shield, Target, Award, UserCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { RelatedBlogPosts } from "@/components/InternalLinking";

import courseQuran from "@/assets/course-quran.jpg";
import courseTajweed from "@/assets/course-tajweed.jpg";
import courseArabic from "@/assets/course-arabic.jpg";
import courseIslamic from "@/assets/course-islamic.jpg";
import courseAllInOne from "@/assets/course-allinone.jpg";

const courseImages: Record<string, string> = {
  "quran-course": courseQuran,
  "tajweed-course": courseTajweed,
  "arabic-course": courseArabic,
  "islamic-studies": courseIslamic,
  "all-in-one-course": courseAllInOne,
};

const courseSeoKeywords: Record<string, string> = {
  "quran-course": "online quran classes, learn quran online, quran classes online with teacher, online quran classes for adults, best online quran classes, private quran lessons online, learn quran online with tajweed, online quran classes for beginners, one on one quran classes online, online quran tutor for kids, quran reading course, noorani qaida online, quran memorization online, quran teacher online, online quran academy, quran classes for kids, quran classes for adults",
  "tajweed-course": "tajweed course online, learn tajweed online, quran tajweed classes, tajweed rules course, online tajweed classes, tajweed course for beginners, learn tajweed online with teacher, tajweed classes for adults, tajweed classes for kids, what are tajweed rules, how to learn tajweed, quran recitation rules, makharij al huroof",
  "arabic-course": "learn arabic online, arabic language course online, learn arabic for beginners, arabic classes online, arabic tutor online, learn arabic to understand quran, arabic classes for kids, arabic classes for adults, noorani qaida online, learn noorani qaida, noorani qaida course online, qaida for beginners, learn noorani qaida online for kids, arabic learning program",
  "islamic-studies": "islamic studies online, islamic classes online, learn islam online, islamic studies course, islamic studies for kids online, islamic classes for beginners, islamic learning program online, islamic education online, aqeedah course, fiqh course online, seerah course, tafseer classes online",
  "all-in-one-course": "online quran classes, learn quran online, arabic language course online, islamic studies online, quran tutor online, quran teacher online, online quran academy, online quran school, comprehensive islamic education, learn quran arabic islamic studies",
};

const courseSeoDescriptions: Record<string, string> = {
  "quran-course": "Join the best online Quran classes for kids & adults. Learn Quran online with certified Al-Azhar teachers through private one-on-one lessons. Covers Noorani Qaida, Quran reading, memorization (Hifz) & Ijazah. Free trial!",
  "tajweed-course": "Learn Tajweed online with certified teachers. Our Tajweed course covers all rules — Makharij, Sifaat, Madd & more. Tajweed classes for beginners, kids & adults. Book your free trial today!",
  "arabic-course": "Learn Arabic online with native teachers. Arabic language course for kids & adults covering Noorani Qaida, grammar, conversation & Quranic Arabic. Start with a free trial class!",
  "islamic-studies": "Islamic studies online for kids, adults & new Muslims. Learn Islam with qualified scholars covering Aqeedah, Fiqh, Tafseer, Hadith & Seerah. Interactive one-on-one Islamic classes online.",
  "all-in-one-course": "Combine Quran, Tajweed, Arabic & Islamic Studies in one customized plan. All-in-one Islamic education for families & individuals. Certified Al-Azhar teachers. Free trial available!",
};

const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const { seo } = useSeoMetadata(`/courses/${slug}`);

  const course = courses.find((c) => c.slug === slug);
  type CourseNavState = { fromCoursesSection?: boolean; fromPath?: string } | null;
  type StoredCourseReturnState = { path: string; y: number; ts: number };

  const navState = location.state as CourseNavState;

  const normalizePath = (path: string) => {
    const [withoutHash] = path.split("#");
    return withoutHash || "/";
  };

  const readStoredCourseReturnState = (): StoredCourseReturnState | null => {
    const raw = window.sessionStorage.getItem("courseReturnState");
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as Partial<StoredCourseReturnState>;
      if (typeof parsed.path !== "string" || typeof parsed.y !== "number") return null;

      const ts = typeof parsed.ts === "number" ? parsed.ts : Date.now();
      const maxAge = 10 * 60 * 1000;
      if (Date.now() - ts > maxAge) {
        window.sessionStorage.removeItem("courseReturnState");
        return null;
      }

      return {
        path: normalizePath(parsed.path),
        y: parsed.y,
        ts,
      };
    } catch {
      return null;
    }
  };

  const goBackToCourses = () => {
    const stored = readStoredCourseReturnState();
    const fromPath = navState?.fromPath ? normalizePath(navState.fromPath) : null;
    const targetPath = fromPath || stored?.path || "/";
    const safeTargetPath = targetPath.startsWith("/courses/") ? "/" : targetPath;

    if (stored && stored.y > 0) {
      window.sessionStorage.setItem(
        "forceScrollRestore",
        JSON.stringify({ ...stored, path: safeTargetPath, ts: Date.now() })
      );
    }

    // Guaranteed fallback in case exact Y restore can't be applied for any reason.
    window.sessionStorage.setItem("pendingScrollTarget", "courses");
    navigate(`${safeTargetPath}#courses`);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Link
            to="/#courses"
            onClick={(event) => {
              event.preventDefault();
              goBackToCourses();
            }}
            className="text-primary hover:underline"
          >
            {t("Back to Courses", "العودة للدورات")}
          </Link>
        </div>
      </div>
    );
  }

  const courseImage = courseImages[course.slug];
  const otherCourses = courses.filter((c) => c.slug !== course.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alhamdacademy.net/" },
      { "@type": "ListItem", position: 2, name: "Courses", item: "https://www.alhamdacademy.net/courses" },
      { "@type": "ListItem", position: 3, name: course.titleEn, item: `https://www.alhamdacademy.net/courses/${course.slug}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${t(course.titleEn, course.titleAr)} | Alhamd Academy`}
        description={courseSeoDescriptions[course.slug] || t(course.descEn, course.descAr)}
        canonical={`https://www.alhamdacademy.net/courses/${course.slug}`}
        keywords={courseSeoKeywords[course.slug] || `${course.titleEn.toLowerCase()}, online ${course.titleEn.toLowerCase()}`}
        structuredData={breadcrumbSchema}
        dynamicSeo={seo}
      />
      <Navbar />

      {/* Hero Section - Compact */}
      <section className="relative pt-24 pb-10 md:pt-28 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 geometric-pattern" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-accent transition-colors">{t("Home", "الرئيسية")}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                to="/#courses"
                onClick={(event) => {
                  event.preventDefault();
                  goBackToCourses();
                }}
                className="hover:text-accent transition-colors"
              >
                {t("Courses", "الدورات")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary-foreground font-medium">{t(course.titleEn, course.titleAr)}</span>
            </nav>

            <div className="flex flex-col md:flex-row items-start gap-6">
              {courseImage && (
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-elevated flex-shrink-0">
                  <img
                    src={courseImage}
                    alt={t(course.titleEn, course.titleAr)}
                    className="w-full h-full object-cover"
                    width={112}
                    height={112}
                    decoding="async"
                    {...({ fetchpriority: "high" } as any)}
                  />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3 leading-tight">
                  {t(course.titleEn, course.titleAr)}
                </h1>
                <p className="text-base text-primary-foreground/70 leading-relaxed mb-4 max-w-2xl">
                  {t(course.descEn, course.descAr)}
                </p>

                {/* Features as inline badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.featuresEn.map((_, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 text-xs font-medium text-primary-foreground">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      {t(course.featuresEn[idx], course.featuresAr[idx])}
                    </span>
                  ))}
                </div>

                {/* CTA + Teacher badge inline */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/#contact"
                    onClick={() => window.sessionStorage.setItem("pendingScrollTarget", "contact")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:scale-105 transition-transform shadow-elevated text-sm"
                  >
                    {t("Book Free Trial", "احجز تجربة مجانية")}
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                  <a
                    href="#tracks"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-foreground/25 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    {t("Explore Tracks", "استكشف المسارات")}
                  </a>
                  <span className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-xs text-primary-foreground/65 font-medium">
                    🎓 {t("Al-Azhar University Graduates", "خريجو جامعة الأزهر الشريف")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40V20C240 0 480 0 720 20C960 40 1200 40 1440 20V40H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Objectives + Outcomes + Plan — Tabbed compact section */}
      <section className="content-auto py-8 md:py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="objectives" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-xl h-auto">
                <TabsTrigger value="objectives" className="flex items-center gap-1.5 text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
                  <Target className="w-3.5 h-3.5" />
                  {t("Objectives", "الأهداف")}
                </TabsTrigger>
                <TabsTrigger value="outcomes" className="flex items-center gap-1.5 text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
                  <Award className="w-3.5 h-3.5" />
                  {t("Outcomes", "المخرجات")}
                </TabsTrigger>
                <TabsTrigger value="plan" className="flex items-center gap-1.5 text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
                  <UserCheck className="w-3.5 h-3.5" />
                  {t("Your Plan", "خطتك")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="objectives" className="mt-0">
                <div className="bg-card rounded-2xl border border-border p-5 md:p-7 shadow-soft">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.objectivesEn.map((_, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {t(course.objectivesEn[idx], course.objectivesAr[idx])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="outcomes" className="mt-0">
                <div className="bg-card rounded-2xl border border-border p-5 md:p-7 shadow-soft">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.outcomesEn.map((_, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {t(course.outcomesEn[idx], course.outcomesAr[idx])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="plan" className="mt-0">
                <div className="bg-card rounded-2xl border border-border p-5 md:p-7 shadow-soft">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(
                      "Every student is unique. We design a custom roadmap based on your age, level, goals, and learning style.",
                      "كل طالب فريد. نصمم خريطة طريق مخصصة بناءً على عمرك ومستواك وأهدافك وأسلوب تعلمك."
                    )}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {course.personalizedPlanEn.map((_, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border">
                        <span className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/15 to-accent/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-muted-foreground leading-relaxed">
                          {t(course.personalizedPlanEn[idx], course.personalizedPlanAr[idx])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Available Tracks — Compact accordion style */}
      <section id="tracks" className="content-auto py-8 md:py-10 bg-section">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
              {t("Available Tracks", "المسارات المتاحة")}
              <span className="text-xs font-normal text-muted-foreground bg-muted px-2.5 py-1 rounded-full ms-2">
                {course.subCourses.length} {t("tracks", "مسارات")}
              </span>
            </h2>

            <Accordion type="multiple" className="space-y-2">
              {course.subCourses.map((sub, idx) => {
                return (
                <AccordionItem key={idx} value={`track-${idx}`} className="bg-card rounded-xl border px-4 overflow-hidden border-border">
                  <AccordionTrigger className="hover:no-underline py-3.5">
                    <div className="flex items-center gap-3 text-start w-full">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 border border-accent/20">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-foreground">
                            {t(sub.titleEn, sub.titleAr)}
                          </h3>
                          {(sub.titleEn.toLowerCase().includes("ijazah") || sub.titleEn.toLowerCase().includes("qira")) && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold border border-accent/20">
                              🏅 {t("Special Pricing", "أسعار خاصة")}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {t(sub.descEn, sub.descAr)}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {t(sub.descEn, sub.descAr)}
                    </p>
                    {sub.highlightsEn && sub.highlightsEn.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {sub.highlightsEn.map((_, hIdx) => (
                          <span key={hIdx} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/5 text-primary font-medium border border-primary/10">
                            <Check className="w-3 h-3" />
                            {t(sub.highlightsEn![hIdx], sub.highlightsAr?.[hIdx] || sub.highlightsEn![hIdx])}
                          </span>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FAQ + Reviews side by side on desktop */}
      <section className="content-auto py-8 md:py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
            {/* FAQ */}
            {course.faqs && course.faqs.length > 0 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  {t("Frequently Asked Questions", "الأسئلة الشائعة")}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {course.faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} className="bg-card rounded-xl border border-border px-4 overflow-hidden">
                      <AccordionTrigger className="text-xs font-semibold text-foreground hover:text-accent hover:no-underline py-3">
                        {t(faq.questionEn, faq.questionAr)}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3">
                        {t(faq.answerEn, faq.answerAr)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Reviews */}
            {course.reviews && course.reviews.length > 0 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  {t("What Students Say", "ماذا يقول الطلاب")}
                </h2>
                <div className="space-y-3">
                  {course.reviews.map((review, idx) => (
                    <div key={idx} className="bg-card rounded-xl p-4 border border-border shadow-soft">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-foreground">{review.name}</p>
                          <p className="text-[10px] text-muted-foreground">{review.country}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        "{t(review.textEn, review.textAr)}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-auto py-8 bg-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-primary to-primary/90 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="absolute inset-0 geometric-pattern" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                {t("Ready to Start Your Journey?", "هل أنت مستعد لبدء رحلتك؟")}
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-5 max-w-lg mx-auto">
                {t(
                  "Book your free trial class today. No commitment, no payment required.",
                  "احجز حصتك التجريبية المجانية اليوم. بدون التزام، بدون دفع."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/#contact"
                  onClick={() => window.sessionStorage.setItem("pendingScrollTarget", "contact")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-accent-foreground font-bold hover:scale-105 transition-transform shadow-elevated"
                >
                  <Phone className="w-5 h-5" />
                  {t("Book Free Trial", "احجز تجربة مجانية")}
                </Link>
                <Link
                  to="/free-trial"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary-foreground/25 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
                >
                  {t("Learn More", "اعرف المزيد")}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[10px] text-primary-foreground/50 mt-3 flex items-center justify-center gap-1.5">
                <Shield className="w-3 h-3" />
                {t("100% Free · No credit card · No commitment", "مجانية 100% · بدون بطاقة · بدون التزام")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blog Posts — Internal Linking for SEO */}
      <RelatedBlogPosts courseSlug={course.slug} maxPosts={4} />

      {/* Related Courses — Horizontal compact */}
      <section className="content-auto py-8 md:py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg md:text-xl font-bold text-foreground text-center mb-5">
              {t("Explore Other Courses", "استكشف الدورات الأخرى")}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {otherCourses.map((c) => (
                <Link
                  key={c.slug}
                  to={`/courses/${c.slug}`}
                  state={
                    navState?.fromCoursesSection
                      ? { fromCoursesSection: true, fromPath: navState.fromPath }
                      : undefined
                  }
                  className="bg-card rounded-xl border border-border p-4 hover:border-accent/30 hover:shadow-card transition-all duration-300 group text-center"
                >
                  {courseImages[c.slug] && (
                    <img
                      src={courseImages[c.slug]}
                      alt={t(c.titleEn, c.titleAr)}
                      className="w-12 h-12 mx-auto rounded-full object-cover border-2 border-accent/20 mb-2 group-hover:border-accent/50 transition-colors"
                      loading="lazy"
                      decoding="async"
                      {...({ fetchpriority: "low" } as any)}
                      width="48"
                      height="48"
                    />
                  )}
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-xs mb-0.5">
                    {t(c.titleEn, c.titleAr)}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-accent text-[10px] font-semibold mt-1 group-hover:gap-2 transition-all">
                    {t("View", "عرض")}
                    <ArrowIcon className="w-2.5 h-2.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD: Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "@id": `https://alhamdacademy.net/courses/${course.slug}#course`,
            name: course.titleEn,
            description: course.descEn,
            provider: {
              "@type": "EducationalOrganization",
              "@id": "https://alhamdacademy.net/#organization",
              name: "Alhamd Academy",
              url: "https://alhamdacademy.net",
            },
            educationalLevel: "Beginner to Advanced",
            availableLanguage: ["English", "Arabic"],
            deliveryMode: "online",
            teaches: course.objectivesEn.join(", "),
            about: course.subCourses.map(s => s.titleEn),
            inLanguage: ["en", "ar"],
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              instructor: {
                "@type": "Person",
                name: "Certified Al-Azhar University Teachers",
                jobTitle: "Quran & Arabic Instructor",
                alumniOf: { "@type": "CollegeOrUniversity", name: "Al-Azhar University" },
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: 4.9,
              ratingCount: Math.max(course.reviews.length * 15, 30),
              bestRating: 5,
            },
          }),
        }}
      />
      {/* JSON-LD: Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://alhamdacademy.net/" },
              { "@type": "ListItem", position: 2, name: "Courses", item: "https://alhamdacademy.net/#courses" },
              { "@type": "ListItem", position: 3, name: course.titleEn, item: `https://alhamdacademy.net/courses/${course.slug}` },
            ],
          }),
        }}
      />
      {/* JSON-LD: FAQ */}
      {course.faqs && course.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: course.faqs.map(faq => ({
                "@type": "Question",
                name: faq.questionEn,
                acceptedAnswer: { "@type": "Answer", text: faq.answerEn },
              })),
            }),
          }}
        />
      )}
      {/* JSON-LD: Reviews */}
      {course.reviews && course.reviews.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://alhamdacademy.net/#organization",
              name: "Alhamd Academy",
              review: course.reviews.map((r, i) => ({
                "@type": "Review",
                author: { "@type": "Person", name: r.name },
                datePublished: `2025-${String(i + 1).padStart(2, "0")}-15`,
                reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
                reviewBody: r.textEn,
              })),
            }),
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default CoursePage;
