import { useEffect, useState } from "react";

/**
 * Returns touch-device-safe framer-motion props.
 * On tablets, phones, and coarse-pointer devices, disables y/x transforms
 * to prevent Safari/iOS compositing jitter and text/image flicker.
 */
export const useMobileSafeMotion = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowMotion, setIsLowMotion] = useState(false);

  useEffect(() => {
    const touchMedia = window.matchMedia("(max-width: 1023px), (hover: none) and (pointer: coarse)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const check = () => {
      setIsMobile(touchMedia.matches);
      setIsLowMotion(touchMedia.matches || reducedMotionMedia.matches);
    };

    check();
    touchMedia.addEventListener("change", check);
    reducedMotionMedia.addEventListener("change", check);

    return () => {
      touchMedia.removeEventListener("change", check);
      reducedMotionMedia.removeEventListener("change", check);
    };
  }, []);

  const safeViewport = { once: true, amount: 0.18 };

  /** Safe whileInView entrance animation */
  const fadeIn = (delay = 0) =>
    isLowMotion
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: safeViewport,
          transition: { duration: 0.28, delay, ease: "easeOut" },
        }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: safeViewport,
          transition: { duration: 0.46, delay, ease: "easeOut" },
        };

  /** Safe card entrance with staggered delay */
  const fadeInUp = (index: number, baseDelay = 0.08) => fadeIn(index * baseDelay);

  /** Slide in from left — opacity-only on touch devices */
  const slideInLeft = (delay = 0) =>
    isLowMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: safeViewport, transition: { duration: 0.3, delay, ease: "easeOut" } }
      : { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: safeViewport, transition: { duration: 0.52, delay, ease: [0.25, 0.46, 0.45, 0.94] } };

  /** Slide in from right — opacity-only on touch devices */
  const slideInRight = (delay = 0) =>
    isLowMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: safeViewport, transition: { duration: 0.3, delay, ease: "easeOut" } }
      : { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: safeViewport, transition: { duration: 0.52, delay, ease: [0.25, 0.46, 0.45, 0.94] } };

  return { isMobile, isLowMotion, fadeIn, fadeInUp, slideInLeft, slideInRight };
};
