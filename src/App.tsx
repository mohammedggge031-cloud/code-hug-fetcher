import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLangProvider } from "@/contexts/AdminLangContext";
import { detectBasename } from "@/lib/localizedRouting";
import { lazy, Suspense } from "react";

// Computed once at module load. Language switches trigger a full page reload
// (see LanguageContext.toggleLang), so a static basename is correct here and
// makes every <Link to="/x"> / navigate("/x") resolve to /ar/x automatically
// while the user is browsing the Arabic subfolder.
const ROUTER_BASENAME = detectBasename();

/** Retry wrapper for lazy imports — handles transient chunk load failures */
function lazyRetry<T extends { default: React.ComponentType<any> }>(
  factory: () => Promise<T>,
  retries = 2,
): React.LazyExoticComponent<T["default"]> {
  return lazy(() => {
    const attempt = (remaining: number): Promise<T> =>
      factory().catch((err) => {
        if (remaining <= 0) throw err;
        return new Promise<T>((resolve) =>
          setTimeout(() => resolve(attempt(remaining - 1)), 1000),
        );
      });
    return attempt(retries);
  });
}

import ScrollToTop, { Loader } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollTopButton from "@/components/ScrollTopButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingFAB from "@/components/FloatingBookingFAB";
import SiteVerificationMeta from "@/components/SiteVerificationMeta";
import { appQueryClient } from "@/lib/queryClient";

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
const NotFound = lazyRetry(() => import("./pages/NotFound"));

const Blog = lazyRetry(() => import("./pages/Blog"));
const BlogPost = lazyRetry(() => import("./pages/BlogPost"));
const Videos = lazyRetry(() => import("./pages/Videos"));
const OnlineQuranClasses = lazyRetry(() => import("./pages/OnlineQuranClasses"));
const TajweedCourse = lazyRetry(() => import("./pages/TajweedCourse"));
const QuranMemorization = lazyRetry(() => import("./pages/QuranMemorization"));
const ArabicForKids = lazyRetry(() => import("./pages/ArabicForKids"));
const ArabicForAdults = lazyRetry(() => import("./pages/ArabicForAdults"));
const IslamicStudies = lazyRetry(() => import("./pages/IslamicStudies"));
const IjazahProgram = lazyRetry(() => import("./pages/IjazahProgram"));
const FemaleQuranTeacher = lazyRetry(() => import("./pages/FemaleQuranTeacher"));
const FreeTrial = lazyRetry(() => import("./pages/FreeTrial"));
const TrialRegistration = lazyRetry(() => import("./pages/TrialRegistration"));

const CoursePage = lazyRetry(() => import("./pages/CoursePage"));

// Admin pages
const AdminLogin = lazyRetry(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazyRetry(() => import("./components/admin/AdminLayout"));
const AdminControlCenter = lazyRetry(() => import("./pages/admin/AdminControlCenter"));
const SeoManagement = lazyRetry(() => import("./pages/admin/SeoManagement"));
const ScriptsManagement = lazyRetry(() => import("./pages/admin/ScriptsManagement"));
const UserRolesManagement = lazyRetry(() => import("./pages/admin/UserRolesManagement"));
const BlogManagement = lazyRetry(() => import("./pages/admin/BlogManagement"));
const CategoriesManagement = lazyRetry(() => import("./pages/admin/CategoriesManagement"));
const MediaLibrary = lazyRetry(() => import("./pages/admin/MediaLibrary"));
const VideoManagement = lazyRetry(() => import("./pages/admin/VideoManagement"));
const LeadsManagement = lazyRetry(() => import("./pages/admin/LeadsManagement"));
const ReviewsManagement = lazyRetry(() => import("./pages/admin/ReviewsManagement"));
const SocialManagement = lazyRetry(() => import("./pages/admin/SocialManagement"));
const AdsTracking = lazyRetry(() => import("./pages/admin/AdsTracking"));
const PricingManagement = lazyRetry(() => import("./pages/admin/PricingManagement"));
const OwnerOnlyRoute = lazyRetry(() => import("./components/admin/OwnerOnlyRoute"));
const ProtectedRoute = lazyRetry(() => import("./components/admin/ProtectedRoute"));
const LocationPage = lazyRetry(() => import("./pages/LocationPage"));
const LearnQuranWorldwide = lazyRetry(() => import("./pages/LearnQuranWorldwide"));
const PrivacyPolicy = lazyRetry(() => import("./pages/PrivacyPolicy"));
const QuranClassesForKids = lazyRetry(() => import("./pages/QuranClassesForKids"));
const QuranClassesForAdults = lazyRetry(() => import("./pages/QuranClassesForAdults"));
const BestOnlineQuranClasses = lazyRetry(() => import("./pages/BestOnlineQuranClasses"));
const OneOnOneQuranClasses = lazyRetry(() => import("./pages/OneOnOneQuranClasses"));
const QuranClassesPricing = lazyRetry(() => import("./pages/QuranClassesPricing"));
const QuranClassesForBeginners = lazyRetry(() => import("./pages/QuranClassesForBeginners"));
const QuranClassesWithCertificate = lazyRetry(() => import("./pages/QuranClassesWithCertificate"));
const LearnQuranForReverts = lazyRetry(() => import("./pages/LearnQuranForReverts"));
const NooraniQaidaOnline = lazyRetry(() => import("./pages/NooraniQaidaOnline"));
const QuranClassesForSisters = lazyRetry(() => import("./pages/QuranClassesForSisters"));
const LearnQuranWithTajweed = lazyRetry(() => import("./pages/LearnQuranWithTajweed"));
const TenQiratOnline = lazyRetry(() => import("./pages/TenQiratOnline"));
const IjazahProgramCourse = lazyRetry(() => import("./pages/IjazahProgramCourse"));
const PricingPage = lazyRetry(() => import("./pages/PricingPage"));
const AdminErrorBoundary = lazyRetry(() => import("./components/admin/AdminErrorBoundary"));

const App = () => (
  <QueryClientProvider client={appQueryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={ROUTER_BASENAME || undefined}>
          <ScrollToTop />
          <SiteVerificationMeta />
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
              <Route path="/trial-registration" element={<TrialRegistration />} />
              
              <Route path="/courses/ten-qirat-online" element={<TenQiratOnline />} />
              <Route path="/courses/ijazah-program" element={<IjazahProgramCourse />} />
              <Route path="/courses/:slug" element={<CoursePage />} />
              <Route path="/learn-quran-online-worldwide" element={<LearnQuranWorldwide />} />
              <Route path="/quran-classes-for-kids" element={<QuranClassesForKids />} />
              <Route path="/quran-classes-for-adults" element={<QuranClassesForAdults />} />
              <Route path="/best-online-quran-classes" element={<BestOnlineQuranClasses />} />
              <Route path="/one-on-one-quran-classes" element={<OneOnOneQuranClasses />} />
              <Route path="/quran-classes-pricing" element={<QuranClassesPricing />} />
              <Route path="/quran-classes-for-beginners" element={<QuranClassesForBeginners />} />
              <Route path="/online-quran-classes-with-certificate" element={<QuranClassesWithCertificate />} />
              <Route path="/learn-quran-for-reverts" element={<LearnQuranForReverts />} />
              <Route path="/noorani-qaida-online" element={<NooraniQaidaOnline />} />
              <Route path="/quran-classes-for-sisters" element={<QuranClassesForSisters />} />
              <Route path="/learn-quran-with-tajweed" element={<LearnQuranWithTajweed />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/:slug" element={<LocationPage />} />


              {/* Admin routes – single shared AuthProvider for login + dashboard */}
              <Route path="/admin" element={<AuthProvider><AdminLangProvider><Outlet /></AdminLangProvider></AuthProvider>}>
                <Route path="login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute><AdminErrorBoundary><AdminLayout /></AdminErrorBoundary></ProtectedRoute>}>
                  <Route index element={<AdminControlCenter />} />
                  <Route path="leads" element={<LeadsManagement />} />
                  <Route path="reviews" element={<ReviewsManagement />} />
                  <Route path="social" element={<SocialManagement />} />
                  <Route path="ads" element={<AdsTracking />} />
                  <Route path="blog" element={<BlogManagement />} />
                  <Route path="categories" element={<CategoriesManagement />} />
                  <Route path="media" element={<MediaLibrary />} />
                  <Route path="seo" element={<SeoManagement />} />
                  <Route path="scripts" element={<ScriptsManagement />} />
                  <Route path="videos" element={<VideoManagement />} />
                  <Route path="users" element={<UserRolesManagement />} />
                  <Route path="pricing" element={<OwnerOnlyRoute><PricingManagement /></OwnerOnlyRoute>} />
                </Route>
              </Route>

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
