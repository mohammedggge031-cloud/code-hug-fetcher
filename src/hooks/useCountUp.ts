import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `end` when the element is in view.
 * Returns [ref, displayValue].
 */
export function useCountUp(end: number, duration = 1800) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || end === 0) return;

    // Reset for re-renders with new end value
    started.current = false;
    setValue(0);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1023px), (hover: none) and (pointer: coarse)").matches;
    const effectiveDuration = prefersReducedMotion ? 0 : isMobile ? Math.min(duration, 1200) : duration;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          if (effectiveDuration === 0) {
            setValue(end);
            return;
          }

          const start = performance.now();
          let lastSet = -1;
          const step = (now: number) => {
            const progress = Math.min((now - start) / effectiveDuration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const nextValue = Math.round(eased * end);

            if (nextValue !== lastSet) {
              lastSet = nextValue;
              setValue(nextValue);
            }

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(step);
            } else {
              // Ensure final value is exact
              setValue(end);
              frameRef.current = null;
            }
          };
          frameRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.05, rootMargin: "50px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return [ref, value] as const;
}
