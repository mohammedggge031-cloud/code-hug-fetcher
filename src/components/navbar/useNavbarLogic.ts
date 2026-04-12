import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSafeScrollBehavior, isTouchScrollDevice, runAfterNextPaint } from "@/lib/scrollBehavior";

export const useNavbarLogic = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [expandedMobileSub, setExpandedMobileSub] = useState<number | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTimerRef = useRef<number | null>(null);
  const isHomePage = location.pathname === "/";
  const isCourseDetailPage = location.pathname.startsWith("/courses/");

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    setExpandedMobile(null);
    setExpandedMobileSub(null);
    setOpenDesktopDropdown(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setExpandedMobile(null);
        setExpandedMobileSub(null);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => { document.body.classList.remove("menu-open"); };
  }, [mobileOpen]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!openDesktopDropdown) return;
    const handler = () => setOpenDesktopDropdown(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openDesktopDropdown]);

  const normalizePath = (path: string) => {
    const [withoutHash] = path.split("#");
    return withoutHash || "/";
  };

  const cancelPendingScroll = useCallback(() => {
    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  }, []);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  const scrollToSection = useCallback((targetId: string) => {
    cancelPendingScroll();
    const headerOffset = 96;
    const touch = isTouchScrollDevice();
    const behavior = getSafeScrollBehavior();
    const scrollToTarget = (attempt = 0, lastTop = -1) => {
      if (document.body.classList.contains("menu-open")) {
        scrollTimerRef.current = null;
        return;
      }
      const target = document.getElementById(targetId);
      if (target) {
        const top = Math.round(target.getBoundingClientRect().top + window.scrollY - headerOffset);
        window.scrollTo({ top: Math.max(top, 0), left: 0, behavior });
        if (attempt < (touch ? 18 : 30) && Math.abs(top - lastTop) > 1) {
          scrollTimerRef.current = window.setTimeout(() => scrollToTarget(attempt + 1, top), touch ? 96 : 80);
        } else {
          scrollTimerRef.current = null;
        }
        return;
      }
      if (attempt < 60) {
        scrollTimerRef.current = window.setTimeout(() => scrollToTarget(attempt + 1, lastTop), touch ? 64 : 50);
      } else {
        scrollTimerRef.current = null;
      }
    };
    scrollToTarget();
  }, [cancelPendingScroll]);

  const goHomeToCoursesSection = useCallback(() => {
    const raw = window.sessionStorage.getItem("courseReturnState");
    let targetPath = "/";
    let restoreY: number | null = null;

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<{ path: string; y: number }>;
        if (typeof parsed.path === "string") {
          const normalized = normalizePath(parsed.path);
          targetPath = normalized.startsWith("/courses/") ? "/" : normalized;
        }
        if (typeof parsed.y === "number" && parsed.y > 0) {
          restoreY = parsed.y;
        }
      } catch {
        // Ignore malformed data
      }
    }

    if (restoreY !== null) {
      window.sessionStorage.setItem(
        "forceScrollRestore",
        JSON.stringify({ path: targetPath, y: restoreY, ts: Date.now() }),
      );
    }

    window.sessionStorage.setItem("pendingScrollTarget", "courses");
    navigate(`${targetPath}#courses`);
  }, [navigate]);

  const scrollToTopRoute = useCallback(() => {
    if (mobileOpen) {
      closeMobileMenu();
      runAfterNextPaint(() => {
        navigate("/", { replace: location.pathname === "/" && !location.hash });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, isTouchScrollDevice() ? 120 : 0);
      return;
    }

    if (location.pathname === "/") {
      navigate("/", { replace: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    navigate("/");
  }, [mobileOpen, closeMobileMenu, navigate, location.pathname, location.hash]);

  const handleHomeLogoClick = useCallback((e: React.MouseEvent) => {
    if (!isCourseDetailPage) return;
    e.preventDefault();
    goHomeToCoursesSection();
  }, [isCourseDetailPage, goHomeToCoursesSection]);

  const handleAnchorClick = useCallback((e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;

    e.preventDefault();

    if (href === "#home") {
      window.sessionStorage.removeItem("pendingScrollTarget");
      window.sessionStorage.removeItem("forceScrollRestore");
      window.sessionStorage.removeItem("homepageScrollY");
      scrollToTopRoute();
      return;
    }

    if (isCourseDetailPage && href === "#courses") {
      goHomeToCoursesSection();
      return;
    }

    const targetId = href.slice(1);

    if (mobileOpen) {
      closeMobileMenu();
      if (isHomePage) {
        runAfterNextPaint(() => scrollToSection(targetId), isTouchScrollDevice() ? 180 : 80);
      } else {
        window.sessionStorage.setItem("pendingScrollTarget", targetId);
        runAfterNextPaint(() => navigate("/"), isTouchScrollDevice() ? 40 : 0);
      }
      return;
    }

    if (isHomePage) {
      scrollToSection(targetId);
      return;
    }

    window.sessionStorage.setItem("pendingScrollTarget", targetId);
    navigate("/");
  }, [scrollToTopRoute, isCourseDetailPage, goHomeToCoursesSection, mobileOpen, closeMobileMenu, isHomePage, scrollToSection, navigate]);

  return {
    scrolled,
    mobileOpen,
    setMobileOpen,
    expandedMobile,
    setExpandedMobile,
    expandedMobileSub,
    setExpandedMobileSub,
    openDesktopDropdown,
    setOpenDesktopDropdown,
    isHomePage,
    isCourseDetailPage,
    cancelPendingScroll,
    closeMobileMenu,
    handleHomeLogoClick,
    handleAnchorClick,
    scrollToTopRoute,
  };
};
