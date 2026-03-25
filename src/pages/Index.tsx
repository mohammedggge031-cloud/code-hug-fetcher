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

const DeferredSection = ({ children, minHeight = 260, forceRender = false }: { children: ReactNode; minHeight?: number; forceRender?: boolean }) => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(forceRender);

  useEffect(() => {
    if (forceRender) {
      setShouldRender(true);
      return;
    }
    const marker = markerRef.current;
    if (!marker || shouldRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [shouldRender, forceRender]);

  return (
    <div ref={markerRef} style={shouldRender ? undefined : { contentVisibility: "auto", containIntrinsicSize: `auto ${minHeight}px` }}>
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
        <SectionErrorBoundary><DeferredSection minHeight={220} forceRender={forceEager}><QuranVersesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={560} forceRender={forceEager}><CoursesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={380} forceRender={forceEager}><HowItWorks /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={460} forceRender={forceEager}><PricingSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={440} forceRender={forceEager}><WhyChooseUs /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={360} forceRender={forceEager}><CommitmentSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager}><TestimonialsSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={360} forceRender={forceEager}><AboutSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager}><TeachersSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager}><RecentArticlesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={320} forceRender={forceEager}><FinalCTA /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager}><ContactSection /></DeferredSection></SectionErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
