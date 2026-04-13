import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `end` when the element is in view.
 * Returns [ref, displayValue].
 */
export function useCountUp(end: number, duration = 2200) {
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
    const effectiveDuration = prefersReducedMotion ? 0 : duration;

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
            // Snappy ease-out curve — fast start, gradual slowdown
            const eased = 1 - Math.pow(1 - progress, 4);
            const nextValue = Math.round(eased * end);

            if (nextValue !== lastSet) {
              lastSet = nextValue;
              setValue(nextValue);
            }

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(step);
            } else {
              setValue(end);
              frameRef.current = null;
            }
          };
          frameRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3, rootMargin: "0px" }
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
