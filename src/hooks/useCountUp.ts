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
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On mobile, use a shorter/faster count-up; on desktop full duration
    const isMobile = window.matchMedia("(max-width: 1023px), (hover: none) and (pointer: coarse)").matches;
    const effectiveDuration = prefersReducedMotion ? 0 : isMobile ? Math.min(duration, 1200) : duration;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          if (effectiveDuration === 0) {
            setValue(end);
            observer.disconnect();
            return;
          }

          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / effectiveDuration, 1);
            // easeOutQuart for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(Math.round(eased * end));
            if (progress < 1) {
              frameRef.current = requestAnimationFrame(step);
            } else {
              frameRef.current = null;
            }
          };
          frameRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
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
