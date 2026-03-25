import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyTrialCTA = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-md border-t border-primary-foreground/10 py-2.5 px-4 md:hidden"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-accent/85 text-accent-foreground font-semibold text-sm shadow-card"
          >
            {t("Book Free Trial — It's 100% Free", "احجز حصة مجانية — مجاناً 100%")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

StickyTrialCTA.displayName = "StickyTrialCTA";

export default StickyTrialCTA;
