import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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

  if (pathname.startsWith("/admin") || !visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="touch-fixed-ui floating-action-shell fixed bottom-[1.35rem] start-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft transition-none md:bottom-[1.85rem] md:start-6 md:h-12 md:w-12 lg:shadow-elevated lg:hover:brightness-110 lg:transition-[filter] lg:duration-200"
      aria-label={t("Back to top", "العودة لأعلى الصفحة")}
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.4} />
    </button>
  );
};

export default ScrollTopButton;
