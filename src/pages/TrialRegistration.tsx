import { useEffect, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactSection from "@/components/ContactSection";

/**
 * Build a dynamic source string from URL UTM parameters.
 * Falls back to "paid_social" if no UTM params are present.
 * Format: "{utm_source}|{utm_campaign}|{utm_medium}|{utm_content}" — only non-empty parts.
 */
const buildSourceFromUTM = (): string => {
  if (typeof window === "undefined") return "paid_social";
  const params = new URLSearchParams(window.location.search);
  const parts: string[] = [];
  const keys = ["utm_source", "utm_campaign", "utm_medium", "utm_content"];
  for (const k of keys) {
    const v = params.get(k);
    if (v && v.trim()) parts.push(`${k.replace("utm_", "")}:${v.trim().slice(0, 50)}`);
  }
  return parts.length > 0 ? parts.join(" | ") : "paid_social";
};
import SEOHead from "@/components/SEOHead";
import { CheckCircle2, Star, ShieldCheck, Clock } from "lucide-react";

/**
 * Standalone landing page for media/ads team only.
 * Reuses the EXACT same booking form (ContactSection) used on the main site.
 * - Same WhatsApp flow
 * - Same external system payload
 * - Same Zod validation, same fields
 * Adds a hidden `source = facebook_ads` identifier (additive only).
 *
 * Marked noindex so it doesn't compete with /free-trial in search.
 */
const TrialRegistration = () => {
  const { t, dir } = useLanguage();
  const dynamicSource = useMemo(() => buildSourceFromUTM(), []);
  useEffect(() => {
    // Ensure noindex even if SEOHead is bypassed
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const benefits = [
    { en: "100% Free — no credit card", ar: "مجاني 100% — بدون بطاقة" },
    { en: "Certified Al-Azhar teachers", ar: "معلمون من خريجي الأزهر" },
    { en: "30-minute one-on-one class", ar: "حصة فردية ٣٠ دقيقة" },
    { en: "Choose male or female teacher", ar: "اختر معلم أو معلمة" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <SEOHead
        title={t(
          "Book Your Free Trial Class | Alhamd Academy",
          "احجز حصتك التجريبية المجانية | أكاديمية الحمد"
        )}
        description={t(
          "Book a free 30-minute trial Quran class with a certified teacher. No commitment, no payment.",
          "احجز حصة تجريبية مجانية 30 دقيقة مع معلم معتمد. بدون التزام أو دفع."
        )}
        canonical="https://alhamdacademy.net/trial-registration"
        noIndex
      />

      {/* Compact hero — no full nav to keep page conversion-focused & fast */}
      <header className="bg-[hsl(var(--primary))] text-primary-foreground py-10 sm:py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <a href="/" className="inline-block mb-6 text-sm opacity-80 hover:opacity-100 transition-opacity">
            Alhamd Academy
          </a>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t(
              "Book Your Free Trial Class Today",
              "احجز حصتك التجريبية المجانية اليوم"
            )}
          </h1>
          <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
            {t(
              "Experience our teaching method with a certified Al-Azhar teacher — completely free, no commitment.",
              "جرّب طريقتنا في التعليم مع معلم معتمد من الأزهر — مجانية تماماً، بدون التزام."
            )}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm bg-white/10 rounded-lg p-3 text-start"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[hsl(var(--accent))]" />
                <span>{t(b.en, b.ar)}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs opacity-80">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
              <span>4.9/5</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("Trusted worldwide", "موثوق عالمياً")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{t("Reply in minutes", "ردّ خلال دقائق")}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Same form, same flow — passes generic source for all paid social campaigns */}
      {/* Same form, same flow — passes dynamic UTM source (fallback: paid_social) */}
      <ContactSection source={dynamicSource} />

      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Alhamd Academy ·{" "}
        <a href="/privacy-policy" className="hover:text-primary">
          {t("Privacy Policy", "سياسة الخصوصية")}
        </a>
      </footer>
    </div>
  );
};

export default TrialRegistration;
