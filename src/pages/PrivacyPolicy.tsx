import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Privacy Policy | Alhamd Academy"
        description="Alhamd Academy privacy policy. Learn how we collect, use, and protect your personal information."
        canonical="https://alhamdacademy.net/privacy-policy"
      />
      <Navbar />
      <main>
        <section className="bg-hero geometric-pattern pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              {t("Privacy Policy", "سياسة الخصوصية")}
            </h1>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-card rounded-xl border border-border p-6 md:p-10 shadow-soft prose prose-sm max-w-none text-foreground">
              <p className="text-muted-foreground text-sm mb-6">
                {t("Last updated: March 2026", "آخر تحديث: مارس 2026")}
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-3">
                {t("1. Information We Collect", "١. المعلومات التي نجمعها")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "We collect personal information you provide when booking a free trial, including your name, phone number, email address (optional), and preferred course. We also collect basic analytics data (page views, device type) to improve our services.",
                  "نجمع المعلومات الشخصية التي تقدمها عند حجز درس تجريبي مجاني، بما في ذلك اسمك ورقم هاتفك وبريدك الإلكتروني (اختياري) والدورة المفضلة. نجمع أيضًا بيانات تحليلية أساسية (مشاهدات الصفحة، نوع الجهاز) لتحسين خدماتنا."
                )}
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-3">
                {t("2. How We Use Your Information", "٢. كيف نستخدم معلوماتك")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "Your information is used to: schedule your free trial class, communicate with you about our courses, and improve our website experience. We do not sell or share your personal information with third parties for marketing purposes.",
                  "تُستخدم معلوماتك لـ: جدولة الدرس التجريبي المجاني، التواصل معك بشأن دوراتنا، وتحسين تجربة الموقع. نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية."
                )}
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-3">
                {t("3. Data Storage & Security", "٣. تخزين البيانات والأمان")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "Your data is securely stored using industry-standard encryption and security measures. We use Supabase as our backend provider, which implements enterprise-grade security protocols.",
                  "يتم تخزين بياناتك بشكل آمن باستخدام تشفير وإجراءات أمان قياسية في الصناعة. نستخدم Supabase كمزود خلفي، والذي ينفذ بروتوكولات أمان على مستوى المؤسسات."
                )}
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-3">
                {t("4. Third-Party Services", "٤. خدمات الطرف الثالث")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "We use WhatsApp for communication. When you click our WhatsApp links, you are redirected to WhatsApp's platform, which is governed by WhatsApp's own privacy policy. We also use Vercel for hosting and analytics.",
                  "نستخدم واتساب للتواصل. عند النقر على روابط واتساب، يتم توجيهك إلى منصة واتساب، والتي تخضع لسياسة خصوصية واتساب الخاصة. نستخدم أيضًا Vercel للاستضافة والتحليلات."
                )}
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-3">
                {t("5. Your Rights", "٥. حقوقك")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "You have the right to: access your personal data, request correction or deletion of your data, and opt out of any communications. Contact us at info@alhamdacademy.net for any privacy-related requests.",
                  "لديك الحق في: الوصول إلى بياناتك الشخصية، طلب تصحيح أو حذف بياناتك، والانسحاب من أي اتصالات. تواصل معنا على info@alhamdacademy.net لأي طلبات متعلقة بالخصوصية."
                )}
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-3">
                {t("6. Contact Us", "٦. تواصل معنا")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "If you have any questions about this Privacy Policy, please contact us at info@alhamdacademy.net or via WhatsApp at +20 127 113 4828.",
                  "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على info@alhamdacademy.net أو عبر واتساب على +20 127 113 4828."
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
