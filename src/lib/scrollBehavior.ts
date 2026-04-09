export const TOUCH_SCROLL_QUERY = "(max-width: 1023px), (hover: none) and (pointer: coarse)";

export const isTouchScrollDevice = () =>
  typeof window !== "undefined" && window.matchMedia(TOUCH_SCROLL_QUERY).matches;

export const getSafeScrollBehavior = (): ScrollBehavior =>
  isTouchScrollDevice() ? "auto" : "smooth";

export const runAfterNextPaint = (callback: () => void, delayMs = 0) => {
  if (typeof window === "undefined") return;

  const execute = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(callback);
    });
  };

  if (delayMs > 0) {
    window.setTimeout(execute, delayMs);
    return;
  }

  execute();
};