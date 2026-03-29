import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { SUPABASE_TIMEOUT_MS } from "@/lib/safeRuntimeData";
import type { ReactNode } from "react";

const scrollPositions = new Map<string, number>();
const COURSE_RETURN_SCROLL_KEY = "courseReturnState";
const FORCE_SCROLL_RESTORE_KEY = "forceScrollRestore";
const HOMEPAGE_SCROLL_KEY = "homepageScrollY";

let isFirstLoad = true;

type StoredScrollRestore = {
  path: string;
  y: number;
  ts: number;
};

const readStoredScrollRestore = (key: string): StoredScrollRestore | null => {
  const raw = window.sessionStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<StoredScrollRestore>;
    if (typeof parsed.path !== "string" || typeof parsed.y !== "number") return null;

    const ts = typeof parsed.ts === "number" ? parsed.ts : Date.now();
    const maxAge = 10 * 60 * 1000;
    if (Date.now() - ts > maxAge) {
      window.sessionStorage.removeItem(key);
      return null;
    }

    return { path: parsed.path, y: parsed.y, ts };
  } catch {
    return null;
  }
};

const normalizeRestorePath = (path: string) => {
  const [withoutHash] = path.split("#");
  return withoutHash || "/";
};

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();
  const routeKey = `${pathname}${search}${hash}`;
  const pendingTimeoutRef = useRef<number | null>(null);
  const pendingRafRef = useRef<number | null>(null);
  const navTokenRef = useRef(0);

  const clearPendingJobs = useCallback(() => {
    if (pendingTimeoutRef.current) {
      window.clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
    if (pendingRafRef.current) {
      cancelAnimationFrame(pendingRafRef.current);
      pendingRafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    return () => {
      clearPendingJobs();
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [clearPendingJobs]);

  useEffect(() => {
    const persistScroll = () => {
      scrollPositions.set(routeKey, window.scrollY);
      if (pathname === "/" && window.scrollY > 0) {
        window.sessionStorage.setItem(HOMEPAGE_SCROLL_KEY, String(Math.round(window.scrollY)));
      }
    };
    persistScroll();
    window.addEventListener("scroll", persistScroll, { passive: true });
    window.addEventListener("pagehide", persistScroll);
    return () => {
      window.removeEventListener("scroll", persistScroll);
      window.removeEventListener("pagehide", persistScroll);
    };
  }, [routeKey, pathname]);

  useLayoutEffect(() => {
    navTokenRef.current += 1;
    const navToken = navTokenRef.current;
    clearPendingJobs();

    const isFreshLoad = isFirstLoad;
    if (isFirstLoad) isFirstLoad = false;

    const saved = scrollPositions.get(routeKey) ?? scrollPositions.get(`${pathname}${search}`) ?? 0;
    const pendingTarget = pathname === "/" ? window.sessionStorage.getItem("pendingScrollTarget") : null;
    const hashTarget = hash ? decodeURIComponent(hash.replace("#", "")) : null;
    const targetId = pendingTarget || hashTarget;

    const forcedRestore = readStoredScrollRestore(FORCE_SCROLL_RESTORE_KEY);
    const returnRestore = readStoredScrollRestore(COURSE_RETURN_SCROLL_KEY);
    const restoreMatchPath = `${pathname}${search}`;
    const rootCourseFallbackRestore = !isFreshLoad && navigationType === "POP" && pathname === "/" ? returnRestore : null;
    const explicitRestore = isFreshLoad
      ? null
      : (forcedRestore && normalizeRestorePath(forcedRestore.path) === restoreMatchPath ? forcedRestore : null) ??
        (navigationType === "POP" && returnRestore && normalizeRestorePath(returnRestore.path) === restoreMatchPath
          ? returnRestore
          : null) ??
        rootCourseFallbackRestore;

    const restoreScrollPosition = (
      targetY: number,
      attempt = 0,
      lastMaxScroll = -1,
      stableAttempts = 0,
    ) => {
      if (navTokenRef.current !== navToken) return;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScrollTop = Math.max(docHeight - viewportHeight, 0);
      const canReachTarget = maxScrollTop >= targetY - Math.max(viewportHeight * 0.3, 150);
      const clampedTarget = Math.min(targetY, maxScrollTop);

      if (canReachTarget || attempt >= 300 || stableAttempts >= 40) {
        window.scrollTo({ top: clampedTarget, left: 0, behavior: "auto" });
        return;
      }
      const delay = attempt < 30 ? 16 : 50;
      pendingTimeoutRef.current = window.setTimeout(() =>
        restoreScrollPosition(targetY, attempt + 1, maxScrollTop, maxScrollTop === lastMaxScroll ? stableAttempts + 1 : 0),
      delay);
    };

    if (targetId) {
      const scrollToHashTarget = (attempt = 0, lastTop = -1) => {
        if (navTokenRef.current !== navToken) return;
        const target = document.getElementById(targetId);
        if (target) {
          const headerOffset = 96;
          const top = Math.round(target.getBoundingClientRect().top + window.scrollY - headerOffset);
          window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
          
          // Re-check position after lazy sections may have shifted the layout
          if (attempt < 60 && top !== lastTop) {
            pendingTimeoutRef.current = window.setTimeout(() => scrollToHashTarget(attempt + 1, top), 80);
            return;
          }
          window.sessionStorage.removeItem("pendingScrollTarget");
          return;
        }
        if (attempt < 100) {
          pendingTimeoutRef.current = window.setTimeout(() => scrollToHashTarget(attempt + 1, lastTop), 50);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          window.sessionStorage.removeItem("pendingScrollTarget");
        }
      };
      scrollToHashTarget();
      window.sessionStorage.removeItem(FORCE_SCROLL_RESTORE_KEY);
      return;
    }

    if (explicitRestore && explicitRestore.y > 0) {
      restoreScrollPosition(explicitRestore.y);
      window.sessionStorage.removeItem(FORCE_SCROLL_RESTORE_KEY);
      if (navigationType === "POP") {
        window.sessionStorage.removeItem(COURSE_RETURN_SCROLL_KEY);
      }
      return;
    }

    if (!isFreshLoad && navigationType === "POP" && saved > 0) {
      restoreScrollPosition(saved);
      return;
    }

    if (!isFreshLoad && navigationType === "POP" && pathname === "/" && saved === 0) {
      const persistedY = parseInt(window.sessionStorage.getItem(HOMEPAGE_SCROLL_KEY) || "0", 10);
      if (persistedY > 0) {
        restoreScrollPosition(persistedY);
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash, navigationType, routeKey, clearPendingJobs]);

  return null;
};

export const Loader = () => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedOut(true), SUPABASE_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!timedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center space-y-3">
        <h2 className="text-lg font-semibold text-card-foreground">Taking longer than expected</h2>
        <p className="text-sm text-muted-foreground">Fallback mode is active. You can continue or refresh the page.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ScrollToTop;
