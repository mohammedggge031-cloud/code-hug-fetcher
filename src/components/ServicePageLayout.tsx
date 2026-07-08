import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Users, Award, Clock, BookOpen, ArrowRight, AlertTriangle, Lightbulb, type LucideIcon, GraduationCap, CalendarCheck, ShieldCheck, Headphones, UserCheck, Target, Zap, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import imgCertified from "@/assets/features/certified-teachers.webp";
import imgFlexible from "@/assets/features/flexible-schedule.webp";
import imgOneOnOne from "@/assets/features/one-on-one.webp";
import imgFreeTrial from "@/assets/features/free-trial.webp";
import imgSafe from "@/assets/features/safe-environment.webp";
import imgSupport from "@/assets/features/support-247.webp";
import imgAuthentic from "@/assets/features/authentic-education.webp";
import imgResults from "@/assets/features/results-driven.webp";

const featureIcons: LucideIcon[] = [GraduationCap, UserCheck, CalendarCheck, ShieldCheck, Heart, Target, Zap, Headphones, BookOpen, Award];
const featureImages = [imgCertified, imgOneOnOne, imgFlexible, imgSafe, imgFreeTrial, imgResults, imgAuthentic, imgSupport, imgCertified, imgOneOnOne];

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";

export interface FAQ {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface LevelInfo {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  topicsEn: string[];
  topicsAr: string[];
}

export interface TrustBadge {
  icon: LucideIcon;
  textEn: string;
  textAr: string;
}

export interface AudiencePersona {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: LucideIcon;
}

export interface ClassStep {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationEn?: string;
  durationAr?: string;
}

export interface Challenge {
  problemEn: string;
  problemAr: string;
  solutionEn: string;
  solutionAr: string;
}

export interface CurriculumWeek {
  weekEn: string;
  weekAr: string;
  topicEn: string;
  topicAr: string;
  detailsEn: string[];
  detailsAr: string[];
}

export interface ComparisonRow {
  featureEn: string;
  featureAr: string;
  usEn: string;
  usAr: string;
  othersEn: string;
  othersAr: string;
}

export interface ServicePageProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonical: string;
  breadcrumbJsonLd?: object;
  ogImage?: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
  heroDescEn: string;
  heroDescAr: string;
  aboutTitleEn: string;
  aboutTitleAr: string;
  aboutContentEn: string[];
  aboutContentAr: string[];
  methodTitleEn: string;
  methodTitleAr: string;
  methodContentEn: string[];
  methodContentAr: string[];
  levels: LevelInfo[];
  outcomesEn: string[];
  outcomesAr: string[];
  featuresEn: string[];
  featuresAr: string[];
  faqs: FAQ[];
  testimonials: { name: string; country: string; textEn: string; textAr: string; rating: number }[];
  relatedPages: { titleEn: string; titleAr: string; href: string }[];
  jsonLd: object;
  extraSection?: React.ReactNode;
  audiencePersonas?: AudiencePersona[];
  audienceTitleEn?: string;
  audienceTitleAr?: string;
  classSteps?: ClassStep[];
  classSessionTitleEn?: string;
  classSessionTitleAr?: string;
  challenges?: Challenge[];
  challengesTitleEn?: string;
  challengesTitleAr?: string;
  curriculum?: CurriculumWeek[];
  curriculumTitleEn?: string;
  curriculumTitleAr?: string;
  comparisonRows?: ComparisonRow[];
  comparisonTitleEn?: string;
  comparisonTitleAr?: string;
  deepContentTitleEn?: string;
  deepContentTitleAr?: string;
  deepContentEn?: string[];
  deepContentAr?: string[];
  trustBadges?: TrustBadge[];
  midCtaTitleEn?: string;
  midCtaTitleAr?: string;
  midCtaDescEn?: string;
  midCtaDescAr?: string;
  levelsTitleEn?: string;
  levelsTitleAr?: string;
  outcomesTitleEn?: string;
  outcomesTitleAr?: string;
  whyChooseTitleEn?: string;
  whyChooseTitleAr?: string;
  testimonialsTitleEn?: string;
  testimonialsTitleAr?: string;
  faqTitleEn?: string;
  faqTitleAr?: string;
  ctaTitleEn?: string;
  ctaTitleAr?: string;
  ctaDescEn?: string;
  ctaDescAr?: string;
  ctaButtonEn?: string;
  ctaButtonAr?: string;
  relatedTitleEn?: string;
  relatedTitleAr?: string;
}

const defaultTrustBadges: TrustBadge[] = [
  { icon: Users, textEn: "200+ Students", textAr: "200+ طالب" },
  { icon: Star, textEn: "4.9/5 Rating", textAr: "تقييم 4.9/5" },
  { icon: Award, textEn: "Certified Teachers", textAr: "معلمون معتمدون" },
  { icon: Clock, textEn: "Flexible Schedule", textAr: "مواعيد مرنة" },
];

/** Renders JSON-LD scripts and cleans them up on unmount to prevent stale schemas during SPA navigation */
const ServicePageJsonLd = ({ jsonLd, testimonials, faqJsonLd, breadcrumbJsonLd }: {
  jsonLd: object;
  testimonials: { name: string; textEn: string; rating: number }[];
  faqJsonLd: object;
  breadcrumbJsonLd: object;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // On unmount, remove all JSON-LD scripts we injected
      containerRef.current?.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, []);

  // aggregateRating removed — Google doesn't support review snippets on Course/EducationalOrganization
  const { aggregateRating: _removed, ...cleanJsonLd } = jsonLd as Record<string, unknown>;

  return (
    <div ref={containerRef} style={{ display: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
};

const ServicePageLayout = (props: ServicePageProps) => {
  const { t, lang } = useLanguage();
  const canonicalPath = props.canonical ? new URL(props.canonical).pathname : "/";
  const { seo } = useSeoMetadata(canonicalPath);

  const trustBadges = props.trustBadges || defaultTrustBadges;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: props.faqs.map((faq) => ({
      "@type": "Question",
      name: lang === "en" ? faq.questionEn : faq.questionAr,
      acceptedAnswer: {
        "@type": "Answer",
        text: lang === "en" ? faq.answerEn : faq.answerAr,
      },
    })),
  };

  const breadcrumbJsonLd = props.breadcrumbJsonLd || {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhamdacademy.net/" },
      { "@type": "ListItem", "position": 2, "name": props.seoTitle.replace(/ \|.*$/, '').replace(/ -.*$/, ''), "item": props.canonical }
    ]
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <SEOHead
        title={props.seoTitle}
        description={props.seoDescription}
        canonical={props.canonical}
        ogType="website"
        keywords={props.seoKeywords}
        dynamicSeo={seo}
      />

      

      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-primary text-primary-foreground" aria-label={props.heroTitleEn}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              {t(props.heroTitleEn, props.heroTitleAr)}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-4 font-medium">
              {t(props.heroSubtitleEn, props.heroSubtitleAr)}
            </p>
            <p className="text-primary-foreground/70 text-lg max-w-3xl mx-auto mb-8">
              {t(props.heroDescEn, props.heroDescAr)}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/#contact"
                onClick={() => window.sessionStorage.setItem("pendingScrollTarget", "contact")}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                {t("Book Free Trial Class", "احجز حصة تجريبية مجانية")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#pricing"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-foreground/10 transition-colors"
              >
                {t("View Pricing Plans", "عرض خطط الأسعار")}
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center mt-10 text-primary-foreground/60 text-sm">
              {trustBadges.map((badge, i) => (
                <span key={i} className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4" />
                  {t(badge.textEn, badge.textAr)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About This Course */}
      <section className="py-16 bg-background" aria-label="About">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t(props.aboutTitleEn, props.aboutTitleAr)}
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            {(lang === "en" ? props.aboutContentEn : props.aboutContentAr).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA Banner */}
      <section className="py-10 bg-accent/10 border-y border-accent/20" aria-label="Book Trial">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-center sm:text-start">
              <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                {t(
                  props.midCtaTitleEn || "Ready to Start? Book Your Free Trial Class",
                  props.midCtaTitleAr || "مستعد للبدء؟ احجز حصتك التجريبية المجانية"
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  props.midCtaDescEn || "Free session • No commitment • No payment required",
                  props.midCtaDescAr || "جلسة مجانية • بدون التزام • بدون دفع"
                )}
              </p>
            </div>
            <a
              href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-md whitespace-nowrap"
            >
              {t("Book Now", "احجز الآن")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 bg-muted" aria-label="Methodology">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t(props.methodTitleEn, props.methodTitleAr)}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {(lang === "en" ? props.methodContentEn : props.methodContentAr).map((p, i) => (
              <p key={i} className="text-lg">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This Course For? */}
      {props.audiencePersonas && props.audiencePersonas.length > 0 && (
        <section className="py-16 bg-background" aria-label="Target Audience">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              {t(props.audienceTitleEn || "Who Is This Course For?", props.audienceTitleAr || "لمن هذه الدورة؟")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {props.audiencePersonas.map((persona, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <persona.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {t(persona.titleEn, persona.titleAr)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(persona.descEn, persona.descAr)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What a Typical Class Looks Like */}
      {props.classSteps && props.classSteps.length > 0 && (
        <section className="py-16 bg-muted" aria-label="Typical Class">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              {t(props.classSessionTitleEn || "What a Typical Class Looks Like", props.classSessionTitleAr || "كيف تبدو الحصة النموذجية")}
            </h2>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-accent/20 hidden sm:block" />
              <div className="space-y-6">
                {props.classSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 font-bold text-lg shadow-md z-10">
                      {i + 1}
                    </div>
                    <div className="bg-card border border-border rounded-xl p-5 flex-1 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          {t(step.titleEn, step.titleAr)}
                        </h3>
                        {step.durationEn && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                            {t(step.durationEn, step.durationAr || step.durationEn)}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(step.descEn, step.descAr)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Common Challenges We Solve */}
      {props.challenges && props.challenges.length > 0 && (
        <section className="py-16 bg-background" aria-label="Challenges">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              {t(props.challengesTitleEn || "Common Challenges We Solve", props.challengesTitleAr || "تحديات شائعة نحلها")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {props.challenges.map((ch, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="font-semibold text-foreground">{t(ch.problemEn, ch.problemAr)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm leading-relaxed">{t(ch.solutionEn, ch.solutionAr)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Curriculum */}
      {props.curriculum && props.curriculum.length > 0 && (
        <section className="py-16 bg-muted" aria-label="Curriculum">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              {t(props.curriculumTitleEn || "Detailed Curriculum", props.curriculumTitleAr || "المنهج التفصيلي")}
            </h2>
            <div className="space-y-4">
              {props.curriculum.map((week, i) => (
                <details key={i} className="bg-card border border-border rounded-lg group">
                  <summary className="p-5 cursor-pointer font-semibold text-foreground hover:text-accent transition-colors list-none flex justify-between items-center">
                    <div>
                      <span className="text-accent font-bold mr-2">{t(week.weekEn, week.weekAr)}</span>
                      <span>{t(week.topicEn, week.topicAr)}</span>
                    </div>
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <ul className="space-y-2">
                      {(lang === "en" ? week.detailsEn : week.detailsAr).map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {props.comparisonRows && props.comparisonRows.length > 0 && (
        <section className="py-16 bg-background" aria-label="Comparison">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              {t(props.comparisonTitleEn || "Alhamd Academy vs. Other Platforms", props.comparisonTitleAr || "أكاديمية الحمد مقارنة بالمنصات الأخرى")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-xl overflow-hidden border border-border">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-4 text-start font-semibold">{t("Feature", "الميزة")}</th>
                    <th className="p-4 text-center font-semibold">{t("Alhamd Academy", "أكاديمية الحمد")}</th>
                    <th className="p-4 text-center font-semibold">{t("Other Platforms", "المنصات الأخرى")}</th>
                  </tr>
                </thead>
                <tbody>
                  {props.comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                      <td className="p-4 font-medium text-foreground">{t(row.featureEn, row.featureAr)}</td>
                      <td className="p-4 text-center text-accent font-semibold">{t(row.usEn, row.usAr)}</td>
                      <td className="p-4 text-center text-muted-foreground">{t(row.othersEn, row.othersAr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Deep Content / Long-form SEO Body */}
      {props.deepContentEn && props.deepContentEn.length > 0 && (
        <section className="py-16 bg-muted" aria-label="In-depth Guide">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t(props.deepContentTitleEn || "The Complete Guide", props.deepContentTitleAr || "الدليل الشامل")}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              {(lang === "en" ? props.deepContentEn : (props.deepContentAr || props.deepContentEn)).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {props.levels.length > 0 && (
        <section className="py-16 bg-background" aria-label="Course Levels">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
              {t(props.levelsTitleEn || "Course Levels", props.levelsTitleAr || "مستويات الدورة")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {props.levels.map((level, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {t(level.titleEn, level.titleAr)}
                  </h3>
                  <p className="text-muted-foreground mb-4">{t(level.descEn, level.descAr)}</p>
                  <ul className="space-y-2">
                    {(lang === "en" ? level.topicsEn : level.topicsAr).map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Learning Outcomes */}
      <section className="py-16 bg-muted" aria-label="Learning Outcomes">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t(props.outcomesTitleEn || "What You Will Achieve", props.outcomesTitleAr || "ما ستحققه")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(lang === "en" ? props.outcomesEn : props.outcomesAr).map((outcome, i) => {
              const img = featureImages[i % featureImages.length];
              return (
                <div key={i} className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm hover:border-accent/30 hover:shadow-md transition-[border-color,box-shadow] duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <img
                      src={img}
                      alt=""
                      width={32}
                      height={32}
                      loading="lazy"
                      decoding="async"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-foreground font-medium">{outcome}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background" aria-label="Why Choose Us">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t(
              props.whyChooseTitleEn || "Why Choose Alhamd Academy?",
              props.whyChooseTitleAr || "لماذا تختار أكاديمية الحمد؟"
            )}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {(lang === "en" ? props.featuresEn : props.featuresAr).map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              const img = featureImages[i % featureImages.length];
              return (
                <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 shadow-sm hover:border-accent/30 hover:shadow-md transition-[border-color,box-shadow] duration-300">
                  <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <img
                      src={img}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-foreground font-medium">{f}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {props.extraSection}

      {/* Testimonials */}
      {props.testimonials.length > 0 && (
        <section className="py-16 bg-muted" aria-label="Student Testimonials">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t(
                props.testimonialsTitleEn || "What Our Students Say",
                props.testimonialsTitleAr || "ماذا يقول طلابنا"
              )}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {props.testimonials.map((test, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: test.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{t(test.textEn, test.textAr)}"</p>
                  <p className="font-bold text-foreground">{test.name}</p>
                  <p className="text-sm text-muted-foreground">{test.country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-background" aria-label="Frequently Asked Questions">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t(
              props.faqTitleEn || "Frequently Asked Questions",
              props.faqTitleAr || "الأسئلة الشائعة"
            )}
          </h2>
          <div className="space-y-4">
            {props.faqs.map((faq, i) => (
              <details key={i} className="bg-card border border-border rounded-lg group">
                <summary className="p-5 cursor-pointer font-semibold text-foreground hover:text-accent transition-colors list-none flex justify-between items-center">
                  <h3 className="text-base font-semibold">{t(faq.questionEn, faq.questionAr)}</h3>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground">
                  {t(faq.answerEn, faq.answerAr)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground" aria-label="Call to Action">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6">
            {t(
              props.ctaTitleEn || "Start Your Learning Journey Today",
              props.ctaTitleAr || "ابدأ رحلتك التعليمية اليوم"
            )}
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            {t(
              props.ctaDescEn || "Book your free trial class now and experience our teaching method firsthand. No commitment required.",
              props.ctaDescAr || "احجز حصتك التجريبية المجانية الآن وجرّب طريقتنا في التدريس. بدون التزام."
            )}
          </p>
          <a
            href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-5 rounded-lg font-bold text-xl hover:scale-105 transition-transform shadow-lg"
          >
            {t(
              props.ctaButtonEn || "Book Free Trial Now",
              props.ctaButtonAr || "احجز حصة مجانية الآن"
            )}
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted" aria-label="Related Courses">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">
            {t(
              props.relatedTitleEn || "Explore More Courses",
              props.relatedTitleAr || "اكتشف المزيد من الدورات"
            )}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {props.relatedPages.map((page, i) => (
              <Link
                key={i}
                to={page.href}
                className="bg-card border border-border px-5 py-3 rounded-lg text-foreground hover:text-accent hover:border-accent transition-colors font-medium"
              >
                {t(page.titleEn, page.titleAr)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <ServicePageJsonLd
        jsonLd={props.jsonLd}
        testimonials={props.testimonials}
        faqJsonLd={faqJsonLd}
        breadcrumbJsonLd={breadcrumbJsonLd}
      />
    </div>
  );
};

export default ServicePageLayout;
