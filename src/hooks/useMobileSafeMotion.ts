import { useEffect, useState } from "react";

/**
 * Returns mobile-safe framer-motion props.
 * On mobile (< 640px), disables y/x transforms to prevent iOS jitter,
 * using opacity-only animations instead.
 */
export const useMobileSafeMotion = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /** Safe whileInView entrance animation */
  const fadeIn = (delay = 0) =>
    isMobile
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.4, delay },
        }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay },
        };

  /** Safe card entrance with staggered delay */
  const fadeInUp = (index: number, baseDelay = 0.08) => fadeIn(index * baseDelay);

  return { isMobile, fadeIn, fadeInUp };
};
