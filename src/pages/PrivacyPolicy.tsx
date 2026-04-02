import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  const { seo } = useSeoMetadata("/privacy-policy");

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t("Privacy Policy | Alhamd Academy", "سياسة الخصوصية | أكاديمية الحمد")}
        description={t(
          "Read our privacy policy to understand how we collect, use, and protect your personal information.",
          "اقرأ سياسة الخصوصية الخاصة بنا لفهم كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية."
        )}
        canonical="https://alhamdacademy.net/privacy-policy"
        keywords="privacy policy, data protection, alhamd academy privacy"
        dynamicSeo={seo}
        noIndex
      />
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{t("Privacy Policy", "سياسة الخصوصية")}</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            {t(
              "Last updated: October 2023",
              "آخر تحديث: أكتوبر 2023"
            )}
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t("Information Collection", "جمع المعلومات")}</h2>
          <p className="mb-4">
            {t(
              "We collect information you provide directly to us when you book a trial class or contact us via WhatsApp.",
              "نحن نجمع المعلومات التي تقدمها لنا مباشرة عند حجز حصة تجريبية أو التواصل معنا عبر واتساب."
            )}
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t("Data Usage", "استخدام البيانات")}</h2>
          <p className="mb-4">
            {t(
              "Your data is used solely for scheduling classes and communicating with you regarding your educational journey.",
              "تُستخدم بياناتك فقط لجدولة الحصص والتواصل معك بخصوص رحلتك التعليمية."
            )}
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t("Data Protection", "حماية البيانات")}</h2>
          <p className="mb-4">
            {t(
              "We implement industry-standard security measures to protect your personal information from unauthorized access.",
              "نحن نطبق إجراءات أمنية قياسية لحماية معلوماتك الشخصية من الوصول غير المصرح به."
            )}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
