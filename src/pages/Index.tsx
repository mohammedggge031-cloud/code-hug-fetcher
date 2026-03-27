import { useEffect, lazy, Suspense, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { allSchemas } from "@/data/schemas";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";

// Eagerly load only the hero for fastest first paint
// Lazy load everything below the fold
const QuranVersesSection = lazy(() => import("@/components/QuranVersesSection"));
const CoursesSection = lazy(() => import("@/components/CoursesSection"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const PricingSection = lazy(() => import("@/components/PricingSection"));

// Lazy load further-down sections
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const CommitmentSection = lazy(() => import("@/components/CommitmentSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const TeachersSection = lazy(() => import("@/components/TeachersSection"));
const RecentArticlesSection = lazy(() => import("@/components/RecentArticlesSection"));

const DeferredSection = ({ children, minHeight = 260, forceRender = false, delayMs = 0 }: { children: ReactNode; minHeight?: number; forceRender?: boolean; delayMs?: number }) => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(forceRender);

  useEffect(() => {
    if (forceRender || shouldRender) {
      setShouldRender(true);
      return;
    }

    // Two triggers: IntersectionObserver (scroll-based) OR timer (time-based)
    // Whichever fires first wins
    let cancelled = false;
    const marker = markerRef.current;

    // Timer: auto-load after delayMs from page load
    const timer = delayMs > 0
      ? window.setTimeout(() => { if (!cancelled) setShouldRender(true); }, delayMs)
      : null;

    // Observer: load when near viewport
    let observer: IntersectionObserver | null = null;
    if (marker) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            if (!cancelled) setShouldRender(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "600px 0px" },
      );
      observer.observe(marker);
    }

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [shouldRender, forceRender, delayMs]);

  return (
    <div ref={markerRef}>
      {shouldRender ? <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense> : <div style={{ minHeight }} />}
    </div>
  );
};

const Index = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { seo } = useSeoMetadata("/");

  // On back navigation (POP) or hash targets, force all sections to render immediately
  // so scroll restoration can reach the saved position
  const forceEager = navigationType === "POP" || !!location.hash || !!window.sessionStorage.getItem("pendingScrollTarget");

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Alhamd Academy | Online Quran, Arabic & Islamic Studies"
        description="Alhamd Academy offers professional online Quran, Arabic and Islamic studies classes for kids and adults. Certified native Arabic teachers. Free trial class. Contact us on WhatsApp +201271134828."
        canonical="https://alhamdacademy.net/"
        keywords="online quran classes, learn quran online, tajweed classes, arabic language course, hifz program, quran memorization, islamic studies online, quran classes for kids, quran classes for adults, best online quran academy, certified quran teacher, learn arabic online, quran classes for beginners, online quran tutor, quran teacher online, learn quran with tajweed, ijazah quran, noor al bayan"
        dynamicSeo={seo}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }} />
      <Navbar />
      <main>
        <HeroSection />
        <SectionErrorBoundary><DeferredSection minHeight={220} forceRender={forceEager} delayMs={100}><QuranVersesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={560} forceRender={forceEager} delayMs={150}><CoursesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={380} forceRender={forceEager} delayMs={250}><HowItWorks /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={460} forceRender={forceEager} delayMs={400}><PricingSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={440} forceRender={forceEager} delayMs={600}><WhyChooseUs /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={360} forceRender={forceEager} delayMs={800}><CommitmentSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={1000}><TestimonialsSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={360} forceRender={forceEager} delayMs={1200}><AboutSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={1400}><TeachersSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={1600}><RecentArticlesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={320} forceRender={forceEager} delayMs={1800}><FinalCTA /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={1800}><ContactSection /></DeferredSection></SectionErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
