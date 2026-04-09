import { useEffect, lazy, Suspense, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { allSchemas } from "@/data/schemas";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import { getSafeScrollBehavior } from "@/lib/scrollBehavior";

const TOUCH_QUERY = "(max-width: 1023px), (hover: none) and (pointer: coarse)";

const QuranVersesSection = lazy(() => import("@/components/QuranVersesSection"));
const CoursesSection = lazy(() => import("@/components/CoursesSection"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const CommitmentSection = lazy(() => import("@/components/CommitmentSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const TeachersSection = lazy(() => import("@/components/TeachersSection"));
const RecentArticlesSection = lazy(() => import("@/components/RecentArticlesSection"));
const ApprovedReviewsSection = lazy(() => import("@/components/ApprovedReviewsSection"));
const ReviewFormSection = lazy(() => import("@/components/ReviewFormSection"));

const DeferredSection = ({ children, minHeight = 260, forceRender = false, delayMs = 0 }: { children: ReactNode; minHeight?: number; forceRender?: boolean; delayMs?: number }) => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(forceRender);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(TOUCH_QUERY);
    const update = () => setIsTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (forceRender || shouldRender) {
      setShouldRender(true);
      return;
    }

    let cancelled = false;
    const marker = markerRef.current;
    const shouldUseTimer = !isTouch;

    const timer = shouldUseTimer && delayMs > 0
      ? window.setTimeout(() => {
          if (!cancelled) setShouldRender(true);
        }, delayMs)
      : null;

    let observer: IntersectionObserver | null = null;
    if (marker) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            if (!cancelled) setShouldRender(true);
            observer?.disconnect();
          }
        },
        { rootMargin: isTouch ? "900px 0px" : "400px 0px" },
      );
      observer.observe(marker);
    }

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [delayMs, forceRender, isTouch, shouldRender]);

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
  const [touchStabilized, setTouchStabilized] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(TOUCH_QUERY);
    let timer: number | null = null;

    const schedule = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }

      if (media.matches) {
        setTouchStabilized(false);
        timer = window.setTimeout(() => setTouchStabilized(true), 280);
      } else {
        setTouchStabilized(false);
      }
    };

    schedule();
    media.addEventListener("change", schedule);

    return () => {
      media.removeEventListener("change", schedule);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  const forceEager =
    touchStabilized ||
    navigationType === "POP" ||
    !!location.hash ||
    !!window.sessionStorage.getItem("pendingScrollTarget");

  useEffect(() => {
    if (!location.hash) return;

    const timer = window.setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) {
          el.scrollIntoView({ behavior: getSafeScrollBehavior(), block: "start" });
      }
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Alhamd Academy | Online Quran, Arabic & Islamic Studies"
        description="Professional online Quran, Arabic & Islamic studies classes with certified Al-Azhar teachers for kids & adults. Free trial. WhatsApp +201271134828."
        canonical="https://alhamdacademy.net/"
        keywords="online quran classes, learn quran online, tajweed classes, arabic language course, hifz program, quran memorization, islamic studies online, quran classes for kids, quran classes for adults, best online quran academy, certified quran teacher, learn arabic online, quran classes for beginners, online quran tutor, quran teacher online, learn quran with tajweed, ijazah quran, noor al bayan"
        dynamicSeo={seo}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }} />
      <Navbar />
      <main>
        <HeroSection />
        <SectionErrorBoundary><DeferredSection minHeight={560} forceRender={forceEager} delayMs={150}><CoursesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={400} forceRender={forceEager} delayMs={300}><QuranVersesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={380} forceRender={forceEager} delayMs={500}><HowItWorks /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={360} forceRender={forceEager} delayMs={700}><CommitmentSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={440} forceRender={forceEager} delayMs={900}><WhyChooseUs /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={1100}><TestimonialsSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={320} forceRender={forceEager} delayMs={1300}><ApprovedReviewsSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={380} forceRender={forceEager} delayMs={1600}><ReviewFormSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={460} forceRender={forceEager} delayMs={1700}><PricingSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={360} forceRender={forceEager} delayMs={2600}><AboutSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={3000}><TeachersSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={3500}><RecentArticlesSection /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={320} forceRender={forceEager} delayMs={4000}><FinalCTA /></DeferredSection></SectionErrorBoundary>
        <SectionErrorBoundary><DeferredSection minHeight={420} forceRender={forceEager} delayMs={4000}><ContactSection /></DeferredSection></SectionErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
