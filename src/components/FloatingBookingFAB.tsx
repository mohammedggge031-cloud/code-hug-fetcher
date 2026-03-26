import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { forwardRef } from "react";

const FloatingBookingFAB = forwardRef<HTMLButtonElement>((_, ref) => {
  const { t } = useLanguage();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      className="floating-action-shell floating-fab-booking fab-gentle-bounce group"
      aria-label={t("Book a Free Trial", "احجز حصة مجانية")}
      style={{ animationDelay: "0.25s" }}
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-elevated md:h-12 md:w-12" style={{ overflow: 'visible' }}>
        <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
      </span>
      <span className="badge-breathe floating-free-badge absolute -top-1.5 -end-1.5 z-10 rounded-full bg-destructive px-1.5 py-[3px] text-[9px] font-extrabold uppercase leading-none text-destructive-foreground md:-top-2 md:-end-2 md:px-2 md:py-0.5 md:text-[11px]">
        {t("Free", "مجاني")}
      </span>
    </button>
  );
});

FloatingBookingFAB.displayName = "FloatingBookingFAB";

export default FloatingBookingFAB;
