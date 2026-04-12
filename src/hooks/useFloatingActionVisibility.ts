import { useEffect, useState } from "react";

const TOUCH_QUERY = "(max-width: 1023px), (hover: none) and (pointer: coarse)";

const getInitialVisibility = (mobileOffset: number) => {
  if (typeof window === "undefined") return true;
  const isTouchDevice = window.matchMedia(TOUCH_QUERY).matches;
  return !isTouchDevice || window.scrollY > mobileOffset;
};

export const useFloatingActionVisibility = (mobileOffset = 340) => {
  const [visible, setVisible] = useState(() => getInitialVisibility(mobileOffset));

  useEffect(() => {
    const touchMedia = window.matchMedia(TOUCH_QUERY);
    let rafId: number | null = null;

    const update = () => {
      const requiresScroll = touchMedia.matches;
      const menuOpen = document.body.classList.contains("menu-open");
      const nextVisible = !menuOpen && (!requiresScroll || window.scrollY > mobileOffset);
      setVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const classObserver = new MutationObserver(update);
    classObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    touchMedia.addEventListener("change", update);

    return () => {
      classObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      touchMedia.removeEventListener("change", update);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [mobileOffset]);

  return visible;
};