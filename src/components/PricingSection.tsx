import { useLanguage } from "@/contexts/LanguageContext";
import { memo, useState, useCallback } from "react";
import { Check, Star } from "lucide-react";
import { fetchExternalFunction } from "@/lib/externalDashboard";

type Duration = "30" | "45" | "60";

interface Plan {
  days: number;
  hoursPerMonth: number;
  monthly: number;
  was: number;
  semi: number;
  semiSave: string;
  annual: number;
  annualSave: string;
  popular?: boolean;
}

const pricing: Record<Duration, Plan[]> = {
  "30": [
    { days: 1, hoursPerMonth: 2, monthly: 21, was: 25, semi: 118, semiSave: "6%", annual: 217, annualSave: "14%" },
    { days: 2, hoursPerMonth: 4, monthly: 39, was: 46, semi: 220, semiSave: "6%", annual: 402, annualSave: "14%" },
    { days: 3, hoursPerMonth: 6, monthly: 49, was: 58, semi: 276, semiSave: "6%", annual: 506, annualSave: "14%" },
    { days: 4, hoursPerMonth: 8, monthly: 65, was: 76, semi: 367, semiSave: "6%", annual: 671, annualSave: "14%", popular: true },
    { days: 5, hoursPerMonth: 10, monthly: 79, was: 92, semi: 446, semiSave: "6%", annual: 815, annualSave: "14%" },
  ],
  "45": [
    { days: 1, hoursPerMonth: 3, monthly: 29, was: 35, semi: 164, semiSave: "6%", annual: 299, annualSave: "14%" },
    { days: 2, hoursPerMonth: 6, monthly: 55, was: 65, semi: 310, semiSave: "6%", annual: 567, annualSave: "14%" },
    { days: 3, hoursPerMonth: 9, monthly: 72, was: 85, semi: 406, semiSave: "6%", annual: 743, annualSave: "14%" },
    { days: 4, hoursPerMonth: 12, monthly: 95, was: 111, semi: 536, semiSave: "6%", annual: 980, annualSave: "14%", popular: true },
    { days: 5, hoursPerMonth: 15, monthly: 115, was: 134, semi: 649, semiSave: "6%", annual: 1187, annualSave: "14%" },
  ],
  "60": [
    { days: 1, hoursPerMonth: 4, monthly: 38, was: 46, semi: 214, semiSave: "6%", annual: 392, annualSave: "14%" },
    { days: 2, hoursPerMonth: 8, monthly: 74, was: 87, semi: 417, semiSave: "6%", annual: 764, annualSave: "14%" },
    { days: 3, hoursPerMonth: 12, monthly: 107, was: 124, semi: 603, semiSave: "6%", annual: 1104, annualSave: "14%" },
    { days: 4, hoursPerMonth: 16, monthly: 140, was: 161, semi: 790, semiSave: "6%", annual: 1445, annualSave: "14%", popular: true },
    { days: 5, hoursPerMonth: 20, monthly: 173, was: 197, semi: 976, semiSave: "6%", annual: 1785, annualSave: "14%" },
  ],
};

const tierNames = {
  en: ["Starter", "Light", "Basic", "Standard", "Premium"],
  ar: ["مبتدئ", "خفيف", "أساسي", "متقدم", "بريميوم"],
};

const PricingCard = memo(({ plan, i, duration, t }: { plan: Plan; i: number; duration: Duration; t: (en: string, ar: string) => string }) => {
  const features = [
    t(`${duration} minutes per session`, `${duration} دقيقة لكل حصة`),
    t(`${plan.days} sessions per week`, `${plan.days} حصص في الأسبوع`),
    t("One-on-one with teacher", "حصة فردية مع المعلم"),
    t("Free trial class included", "حصة تجريبية مجانية"),
  ];

  return (
    <div
      className={`relative rounded-xl p-3 sm:p-5 md:p-4 lg:p-4 border transition-shadow ${
        plan.popular
          ? "bg-primary text-primary-foreground border-primary shadow-elevated md:scale-[1.03]"
          : "bg-card border-border shadow-card hover:shadow-elevated"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-0.5 bg-accent text-accent-foreground text-[11px] font-bold rounded-full whitespace-nowrap">
          <Star className="w-3 h-3" />
          {t("Popular", "الأشهر")}
        </div>
      )}

      <div className="text-center mb-2.5 sm:mb-2 md:mb-2 lg:mb-2">
        <h3 className={`text-[15px] sm:text-sm md:text-sm lg:text-base font-bold ${plan.popular ? "" : "text-foreground"}`}>
          {t(tierNames.en[i], tierNames.ar[i])}
        </h3>
        <p className={`text-[13px] sm:text-xs md:text-xs lg:text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {plan.days} {t("days per week", "يوم في الأسبوع")}
        </p>
      </div>

      <div className="text-center mb-2.5 sm:mb-2 md:mb-2 lg:mb-2">
        <span className={`inline-block text-[15px] sm:text-sm md:text-sm lg:text-base font-semibold line-through decoration-2 ${plan.popular ? "text-yellow-300/90" : "text-destructive/70"}`}>
          ${plan.was}
        </span>
        <div className="flex items-baseline justify-center gap-0.5">
          <span className={`text-[28px] sm:text-2xl md:text-2xl lg:text-3xl font-bold ${plan.popular ? "" : "text-foreground"}`}>
            ${plan.monthly}
          </span>
          <span className={`text-[12px] sm:text-[11px] md:text-xs ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            /{t("month", "شهر")}
          </span>
        </div>
        <p className={`text-[12px] sm:text-[11px] md:text-xs ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
          {plan.hoursPerMonth} {t("hours per month", "ساعة شهرياً")}
        </p>
      </div>

      <div className="space-y-1.5 sm:space-y-1 md:space-y-1 lg:space-y-1.5 mb-3 sm:mb-2 md:mb-2 lg:mb-3">
        {features.map((feature, j) => (
          <div key={j} className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 flex-shrink-0 text-accent mt-0.5" />
            <span className={`text-[12px] sm:text-[10px] md:text-xs leading-snug ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Savings */}
      <div className={`space-y-2 mb-3 sm:mb-2 md:mb-2 lg:mb-3 p-3 sm:p-2 md:p-2 rounded-lg ${plan.popular ? "bg-primary-foreground/10" : "bg-muted"}`}>
        <div className="flex justify-between items-center">
          <span className={`text-[13px] sm:text-[11px] md:text-xs font-medium ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            6 {t("months", "أشهر")}
          </span>
          <div className="text-right">
            <span className={`text-[13px] sm:text-[11px] md:text-xs font-bold ${plan.popular ? "" : "text-foreground"}`}>
              ${plan.semi}
            </span>
            <span className="block text-[11px] sm:text-[9px] md:text-[10px] text-accent font-semibold">
              {t(`Save ${plan.semiSave}`, `وفر ${plan.semiSave}`)}
            </span>
          </div>
        </div>
        <div className={`border-t ${plan.popular ? "border-primary-foreground/10" : "border-border"}`} />
        <div className="flex justify-between items-center">
          <span className={`text-[13px] sm:text-[11px] md:text-xs font-medium ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            12 {t("months", "شهر")}
          </span>
          <div className="text-right">
            <span className={`text-[13px] sm:text-[11px] md:text-xs font-bold ${plan.popular ? "" : "text-foreground"}`}>
              ${plan.annual}
            </span>
            <span className="block text-[11px] sm:text-[9px] md:text-[10px] text-accent font-semibold">
              {t(`Save ${plan.annualSave}`, `وفر ${plan.annualSave}`)}
            </span>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          try {
            fetchExternalFunction("receive-booking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                full_name: "Subscription Request",
                phone: "",
                email: "",
                course_interest: `${tierNames.en[i]} Plan`,
                preferred_date: "",
                preferred_time: "",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                message: `📋 Plan: ${tierNames.en[i]} | ⏱ Session: ${duration} min | 📅 Days/week: ${plan.days} | 🕐 Hours/month: ${plan.hoursPerMonth} | 💰 Price: $${plan.monthly}/month`,
              })
            }).catch((e) => {
              console.error("Subscription sync error:", e);
            });
          } catch (e) {
            console.error("Subscription sync error:", e);
          }
        }}
        className={`w-full text-center py-3 sm:py-2.5 md:py-3 rounded-lg text-[13px] sm:text-xs md:text-sm font-semibold transition-opacity min-h-[44px] flex items-center justify-center ${
          plan.popular
            ? "bg-accent text-accent-foreground hover:opacity-90"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        {t("Subscribe Now", "اشترك الآن")}
      </a>
    </div>
  );
});

PricingCard.displayName = "PricingCard";

const PricingSection = () => {
  const { t } = useLanguage();
  const [duration, setDuration] = useState<Duration>("30");

  const durations: { value: Duration; label: string }[] = [
    { value: "30", label: t("30 Min", "٣٠ دقيقة") },
    { value: "45", label: t("45 Min", "٤٥ دقيقة") },
    { value: "60", label: t("60 Min", "٦٠ دقيقة") },
  ];

  const plans = pricing[duration];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-background" aria-label="Online Quran Classes Pricing Plans">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Pricing Plans", "خطط الأسعار")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mt-2">
            {t("Choose Your Plan", "اختر خطتك")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            {t(
              "Flexible pricing to fit your schedule. All plans include a free trial.",
              "أسعار مرنة تناسب جدولك. جميع الخطط تتضمن درس تجريبي مجاني."
            )}
          </p>
        </div>

        {/* Duration Tabs */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex bg-muted rounded-xl p-1 sm:p-1.5 gap-1">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setDuration(d.value)}
                className={`px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-lg text-sm sm:text-sm md:text-base font-bold transition-all min-h-[44px] ${
                  duration === d.value
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={`${duration}-${plan.days}`} plan={plan} i={i} duration={duration} t={t} />
          ))}
        </div>

        {/* Special Offers */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Family Discount */}
          <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/15 flex items-center justify-center">
              <span className="text-base sm:text-xl">👨‍👩‍👧‍👦</span>
            </div>
            <div>
              <h4 className="font-bold text-foreground text-xs sm:text-sm mb-0.5">
                {t("Family Discount", "خصم العائلة")}
              </h4>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                {t(
                  "Special discount for the second student from the same family.",
                  "خصم خاص للطالب الثاني من نفس العائلة."
                )}
              </p>
            </div>
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-bl-lg">
              {t("SAVE MORE", "وفر أكثر")}
            </div>
          </div>

          {/* Referral Reward */}
          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <span className="text-base sm:text-xl">🎁</span>
            </div>
            <div>
              <h4 className="font-bold text-foreground text-xs sm:text-sm mb-0.5">
                {t("Refer & Earn", "ادعُ واكسب")}
              </h4>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                {t(
                  "Recommend us to a friend — get cashback or free classes!",
                  "رشّح صديقاً — تحصل على استرداد نقدي أو حصص مجاناً!"
                )}
              </p>
            </div>
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-bl-lg">
              {t("REWARD", "مكافأة")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(PricingSection);
