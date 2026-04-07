import { useEffect, useState } from "react";

/**
 * Returns touch-device-safe framer-motion props.
 * On tablets, phones, and coarse-pointer devices, disables y/x transforms
 * to prevent Safari/iOS compositing jitter and text/image flicker.
 */
export const useMobileSafeMotion = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px), (hover: none) and (pointer: coarse)");
    const check = () => setIsMobile(media.matches);
    check();
    media.addEventListener("change", check);
    return () => media.removeEventListener("change", check);
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
