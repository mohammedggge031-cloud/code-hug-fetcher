import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSafeScrollBehavior } from "@/lib/scrollBehavior";

const ScrollTopButton = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibility = () => {
      const nextVisible = window.scrollY > 180;
      setVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: getSafeScrollBehavior() })}
      className={`floating-action-shell scroll-top-fab fixed bottom-[1.35rem] start-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-card transition-opacity duration-300 hover:brightness-110 md:bottom-[1.85rem] md:start-6 md:h-12 md:w-12 md:shadow-elevated ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label={t("Back to top", "العودة لأعلى الصفحة")}
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.4} />
    </button>
  );
};

export default ScrollTopButton;
