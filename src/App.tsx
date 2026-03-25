import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLangProvider } from "@/contexts/AdminLangContext";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import ScrollTopButton from "@/components/ScrollTopButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingFAB from "@/components/FloatingBookingFAB";

const FloatingActions = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;
  return (
    <>
      <ScrollTopButton />
      <WhatsAppButton />
      <FloatingBookingFAB />
    </>
  );
};
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Videos = lazy(() => import("./pages/Videos"));
const OnlineQuranClasses = lazy(() => import("./pages/OnlineQuranClasses"));
const TajweedCourse = lazy(() => import("./pages/TajweedCourse"));
const QuranMemorization = lazy(() => import("./pages/QuranMemorization"));
const ArabicForKids = lazy(() => import("./pages/ArabicForKids"));
const ArabicForAdults = lazy(() => import("./pages/ArabicForAdults"));
const IslamicStudies = lazy(() => import("./pages/IslamicStudies"));
const IjazahProgram = lazy(() => import("./pages/IjazahProgram"));
const FemaleQuranTeacher = lazy(() => import("./pages/FemaleQuranTeacher"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));
const StudentSuccessStories = lazy(() => import("./pages/StudentSuccessStories"));
const CoursePage = lazy(() => import("./pages/CoursePage"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const SeoManagement = lazy(() => import("./pages/admin/SeoManagement"));
const ScriptsManagement = lazy(() => import("./pages/admin/ScriptsManagement"));
const UserRolesManagement = lazy(() => import("./pages/admin/UserRolesManagement"));
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const CategoriesManagement = lazy(() => import("./pages/admin/CategoriesManagement"));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const LearnQuranWorldwide = lazy(() => import("./pages/LearnQuranWorldwide"));

const queryClient = new QueryClient();

const scrollPositions = new Map<string, number>();
const COURSE_RETURN_SCROLL_KEY = "courseReturnState";
const FORCE_SCROLL_RESTORE_KEY = "forceScrollRestore";
const HOMEPAGE_SCROLL_KEY = "homepageScrollY";

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
      // Persist homepage scroll to sessionStorage so back-nav always works
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

    const saved = scrollPositions.get(routeKey) ?? scrollPositions.get(`${pathname}${search}`) ?? 0;
    const pendingTarget = pathname === "/" ? window.sessionStorage.getItem("pendingScrollTarget") : null;
    const hashTarget = hash ? decodeURIComponent(hash.replace("#", "")) : null;
    const targetId = pendingTarget || hashTarget;

    const forcedRestore = readStoredScrollRestore(FORCE_SCROLL_RESTORE_KEY);
    const returnRestore = readStoredScrollRestore(COURSE_RETURN_SCROLL_KEY);
    const restoreMatchPath = `${pathname}${search}`;
    const rootCourseFallbackRestore = navigationType === "POP" && pathname === "/" ? returnRestore : null;
    const explicitRestore =
      (forcedRestore && normalizeRestorePath(forcedRestore.path) === restoreMatchPath ? forcedRestore : null) ??
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
      const canReachTarget = maxScrollTop >= targetY - Math.max(viewportHeight * 0.2, 120);
      const clampedTarget = Math.min(targetY, maxScrollTop);

      if (canReachTarget || attempt >= 180 || stableAttempts >= 24) {
        window.scrollTo({ top: clampedTarget, left: 0, behavior: "auto" });
        return;
      }
      pendingRafRef.current = requestAnimationFrame(() =>
        restoreScrollPosition(targetY, attempt + 1, maxScrollTop, maxScrollTop === lastMaxScroll ? stableAttempts + 1 : 0),
      );
    };

    if (targetId) {
      const scrollToHashTarget = (attempt = 0) => {
        if (navTokenRef.current !== navToken) return;
        const target = document.getElementById(targetId);
        if (target) {
          const headerOffset = 96;
          const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
          window.sessionStorage.removeItem("pendingScrollTarget");
          return;
        }
        if (attempt < 100) {
          pendingTimeoutRef.current = window.setTimeout(() => scrollToHashTarget(attempt + 1), 50);
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

    if (navigationType === "POP" && saved > 0) {
      restoreScrollPosition(saved);
      return;
    }

    // Fallback: restore homepage from sessionStorage when in-memory map is empty
    if (navigationType === "POP" && pathname === "/" && saved === 0) {
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

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <FloatingActions />

            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/online-quran-classes" element={<OnlineQuranClasses />} />
                <Route path="/tajweed-course-online" element={<TajweedCourse />} />
                <Route path="/quran-memorization-hifz" element={<QuranMemorization />} />
                <Route path="/arabic-for-kids" element={<ArabicForKids />} />
                <Route path="/arabic-for-adults" element={<ArabicForAdults />} />
                <Route path="/islamic-studies-online" element={<IslamicStudies />} />
                <Route path="/ijazah-program" element={<IjazahProgram />} />
                <Route path="/female-quran-teacher" element={<FemaleQuranTeacher />} />
                <Route path="/free-trial" element={<FreeTrial />} />
                <Route path="/student-success-stories" element={<StudentSuccessStories />} />
                <Route path="/courses/:slug" element={<CoursePage />} />
                <Route path="/learn-quran-online-worldwide" element={<LearnQuranWorldwide />} />
                <Route path="/:slug" element={<LocationPage />} />

                <Route path="/admin/login" element={<AdminLangProvider><AdminLogin /></AdminLangProvider>} />
                <Route path="/admin" element={<AdminLangProvider><ProtectedRoute><AdminLayout /></ProtectedRoute></AdminLangProvider>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="blog" element={<BlogManagement />} />
                  <Route path="categories" element={<CategoriesManagement />} />
                  <Route path="media" element={<MediaLibrary />} />
                  <Route path="seo" element={<SeoManagement />} />
                  <Route path="scripts" element={<ScriptsManagement />} />
                  <Route path="users" element={<UserRolesManagement />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
