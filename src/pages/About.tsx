import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CommitmentSection from "@/components/CommitmentSection";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { useLanguage } from "@/contexts/LanguageContext";

const CANONICAL = "https://www.alhamdacademy.net/about";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Alhamd Academy",
  url: CANONICAL,
  about: {
    "@type": "EducationalOrganization",
    name: "Alhamd Academy",
    url: "https://www.alhamdacademy.net",
    description:
      "Alhamd Academy is an online Quran, Arabic and Islamic studies academy with certified Al-Azhar teachers serving students worldwide.",
  },
};

const AboutPage = () => {
  const { t } = useLanguage();
  const { seo: dynamicSeo } = useSeoMetadata("/about");

  return (
    <>
      <SEOHead
        title="About Alhamd Academy | Certified Al-Azhar Quran & Arabic Teachers"
        description="Learn about Alhamd Academy — our mission, our certified Al-Azhar teachers, and how we deliver one-on-one online Quran, Tajweed, Hifz and Arabic classes worldwide."
        keywords="about alhamd academy, al-azhar quran teachers, online quran academy, arabic academy about"
        canonical={CANONICAL}
        ogType="website"
        structuredData={JSON_LD}
        dynamicSeo={dynamicSeo}
      />
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-muted/40 to-background py-12 sm:py-16" aria-labelledby="about-hero-title">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              {t("About Us", "من نحن")}
            </span>
            <h1 id="about-hero-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
              {t("About Alhamd Academy", "عن أكاديمية الحمد")}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg mt-4">
              {t(
                "A dedicated online academy for Quran, Tajweed, Hifz, Arabic and Islamic studies — taught one-on-one by certified Al-Azhar teachers.",
                "أكاديمية متخصصة أونلاين للقرآن الكريم والتجويد والحفظ واللغة العربية والدراسات الإسلامية، بتعليم فردي مع معلمين مؤهلين من الأزهر."
              )}
            </p>
          </div>
        </section>
        <AboutSection />
        <WhyChooseUs />
        <CommitmentSection />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
