import { useEffect, useState } from "react";

const TOUCH_QUERY = "(max-width: 1023px), (hover: none) and (pointer: coarse)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const getTouchMatch = () =>
  typeof window !== "undefined" ? window.matchMedia(TOUCH_QUERY).matches : false;

const getLowMotionMatch = () =>
  typeof window !== "undefined"
    ? window.matchMedia(TOUCH_QUERY).matches || window.matchMedia(REDUCED_QUERY).matches
    : false;

/**
 * Returns touch-device-safe framer-motion props.
 * On tablets, phones, and coarse-pointer devices, disables x/y transforms
 * and uses short opacity-only reveals to prevent Safari/iOS jitter.
 */
export const useMobileSafeMotion = () => {
  const [isMobile, setIsMobile] = useState(getTouchMatch);
  const [isLowMotion, setIsLowMotion] = useState(getLowMotionMatch);

  useEffect(() => {
    const touchMedia = window.matchMedia(TOUCH_QUERY);
    const reducedMotionMedia = window.matchMedia(REDUCED_QUERY);

    const check = () => {
      const touch = touchMedia.matches;
      setIsMobile(touch);
      setIsLowMotion(touch || reducedMotionMedia.matches);
    };

    check();
    touchMedia.addEventListener("change", check);
    reducedMotionMedia.addEventListener("change", check);

    return () => {
      touchMedia.removeEventListener("change", check);
      reducedMotionMedia.removeEventListener("change", check);
    };
  }, []);

  const safeViewport = { once: true, amount: isLowMotion ? 0.08 : 0.18 };

  const opacityOnly = (delay = 0, duration = 0.28) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: safeViewport,
    transition: { duration, delay, ease: "easeOut" },
  });

  const fadeIn = (delay = 0) =>
    isLowMotion
      ? opacityOnly(delay, 0.26)
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: safeViewport,
          transition: { duration: 0.42, delay, ease: "easeOut" },
        };

  const fadeInUp = (index: number, baseDelay = 0.07) => fadeIn(index * baseDelay);

  const slideInLeft = (delay = 0) =>
    isLowMotion
      ? opacityOnly(delay, 0.3)
      : {
          initial: { opacity: 0, x: -34 },
          whileInView: { opacity: 1, x: 0 },
          viewport: safeViewport,
          transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        };

  const slideInRight = (delay = 0) =>
    isLowMotion
      ? opacityOnly(delay, 0.3)
      : {
          initial: { opacity: 0, x: 34 },
          whileInView: { opacity: 1, x: 0 },
          viewport: safeViewport,
          transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        };

  return { isMobile, isLowMotion, fadeIn, fadeInUp, slideInLeft, slideInRight };
};
