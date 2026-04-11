import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLangProvider } from "@/contexts/AdminLangContext";
import { lazy, Suspense } from "react";

import ScrollToTop, { Loader } from "@/components/ScrollToTop";

// Lazy load non-critical UI overlays
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const ScrollTopButton = lazy(() => import("@/components/ScrollTopButton"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const FloatingBookingFAB = lazy(() => import("@/components/FloatingBookingFAB"));

const FloatingActions = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;
  return (
    <Suspense fallback={null}>
      <ScrollTopButton />
      <WhatsAppButton />
      <FloatingBookingFAB />
    </Suspense>
  );
};

import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));

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
const VideoManagement = lazy(() => import("./pages/admin/VideoManagement"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const LearnQuranWorldwide = lazy(() => import("./pages/LearnQuranWorldwide"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const QuranClassesForKids = lazy(() => import("./pages/QuranClassesForKids"));
const QuranClassesForAdults = lazy(() => import("./pages/QuranClassesForAdults"));
const BestOnlineQuranClasses = lazy(() => import("./pages/BestOnlineQuranClasses"));
const OneOnOneQuranClasses = lazy(() => import("./pages/OneOnOneQuranClasses"));
const QuranClassesPricing = lazy(() => import("./pages/QuranClassesPricing"));
const QuranClassesForBeginners = lazy(() => import("./pages/QuranClassesForBeginners"));
const QuranClassesWithCertificate = lazy(() => import("./pages/QuranClassesWithCertificate"));
const LearnQuranForReverts = lazy(() => import("./pages/LearnQuranForReverts"));
const NooraniQaidaOnline = lazy(() => import("./pages/NooraniQaidaOnline"));
const QuranClassesForSisters = lazy(() => import("./pages/QuranClassesForSisters"));
const LearnQuranWithTajweed = lazy(() => import("./pages/LearnQuranWithTajweed"));
const AdminErrorBoundary = lazy(() => import("./components/admin/AdminErrorBoundary"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Suspense fallback={null}><Toaster /></Suspense>
        <Suspense fallback={null}><Sonner /></Suspense>
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
              <Route path="/:slug" element={<LocationPage />} />

              {/* Admin routes – single shared AuthProvider for login + dashboard */}
              <Route path="/admin" element={<AuthProvider><AdminLangProvider><Outlet /></AdminLangProvider></AuthProvider>}>
                <Route path="login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute><AdminErrorBoundary><AdminLayout /></AdminErrorBoundary></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="blog" element={<BlogManagement />} />
                  <Route path="categories" element={<CategoriesManagement />} />
                  <Route path="media" element={<MediaLibrary />} />
                  <Route path="seo" element={<SeoManagement />} />
                  <Route path="scripts" element={<ScriptsManagement />} />
                  <Route path="videos" element={<VideoManagement />} />
                  <Route path="users" element={<UserRolesManagement />} />
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
