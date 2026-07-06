import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PricingSection from "@/components/PricingSection";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { useLanguage } from "@/contexts/LanguageContext";


/**
 * Dedicated public Pricing page. Served at /pricing (EN baseline) and
 * /ar/pricing (Arabic subfolder mirror, via the /ar/:path* prerender
 * rewrite + basename-aware BrowserRouter). Hydrates its plan data from
 * the active row of `pricing_plans` (with hardcoded fallback) — see
 * useActivePricingPackages inside PricingSection.
 */

const CANONICAL = "https://www.alhamdacademy.net/pricing";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  name: "Alhamd Academy — Online Quran Classes Pricing",
  url: CANONICAL,
  priceCurrency: "USD",
  description:
    "Flexible monthly, 6-month and 12-month plans for one-on-one online Quran, Tajweed, Hifz and Arabic classes with certified Al-Azhar teachers. Free trial included.",
};

const PricingPage = () => {
  const { t } = useLanguage();
  const { seo: dynamicSeo } = useSeoMetadata("/pricing");

  return (
    <>
      <SEOHead
        title="Quran Classes Pricing | Monthly, 6-Month & Annual Plans | Alhamd Academy"
        description="Transparent online Quran classes pricing. Choose 30, 45 or 60-minute sessions with 1–5 days per week. Monthly, 6-month and annual plans with big savings. Free trial included."
        keywords="online quran classes pricing, quran classes plans, quran academy fees, online quran subscription, quran classes monthly, quran classes annual plan"
        canonical={CANONICAL}
        ogType="website"
        structuredData={JSON_LD}
        dynamicSeo={dynamicSeo}
      />

      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-muted/40 to-background py-12 sm:py-16" aria-labelledby="pricing-hero-title">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              {t("Pricing", "الأسعار")}
            </span>
            <h1 id="pricing-hero-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
              {t(
                "Simple, Transparent Quran Classes Pricing",
                "أسعار واضحة ومرنة لدروس القرآن أونلاين"
              )}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg mt-4">
              {t(
                "Pick the session length and weekly frequency that fits your family. Every plan is one-on-one with a certified Al-Azhar teacher, and every new student gets a free trial class.",
                "اختر مدة الحصة وعدد الأيام أسبوعياً بما يناسب عائلتك. كل خطة فردية مع معلم مؤهل من الأزهر، ولكل طالب جديد حصة تجريبية مجانية."
              )}
            </p>
          </div>
        </section>

        <PricingSection />

      </main>

      <Footer />
    </>
  );
};

export default PricingPage;
