import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewFormSection from "@/components/ReviewFormSection";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { useLanguage } from "@/contexts/LanguageContext";

const CANONICAL = "https://www.alhamdacademy.net/reviews";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Alhamd Academy Student Reviews",
  url: CANONICAL,
  description:
    "Verified reviews and testimonials from Alhamd Academy students worldwide learning Quran, Tajweed, Hifz and Arabic online.",
};

const ReviewsPage = () => {
  const { t } = useLanguage();
  const { seo: dynamicSeo } = useSeoMetadata("/reviews");

  return (
    <>
      <SEOHead
        title="Student Reviews & Testimonials | Alhamd Academy"
        description="Read verified reviews from Alhamd Academy students worldwide. Real experiences learning Quran, Tajweed, Hifz and Arabic online with certified Al-Azhar teachers."
        keywords="alhamd academy reviews, quran academy testimonials, online quran classes reviews, student testimonials"
        canonical={CANONICAL}
        ogType="website"
        structuredData={JSON_LD}
        dynamicSeo={dynamicSeo}
      />
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-muted/40 to-background py-12 sm:py-16" aria-labelledby="reviews-hero-title">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              {t("Student Reviews", "آراء الطلاب")}
            </span>
            <h1 id="reviews-hero-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
              {t("What Our Students Say", "ماذا يقول طلابنا")}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg mt-4">
              {t(
                "Verified testimonials from families and adult learners studying with Alhamd Academy worldwide.",
                "شهادات موثقة من العائلات والطلاب البالغين الذين يدرسون مع أكاديمية الحمد حول العالم."
              )}
            </p>
          </div>
        </section>
        <TestimonialsSection />
        <ReviewFormSection />
      </main>
      <Footer />
    </>
  );
};

export default ReviewsPage;
