import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEOHead
        title={t("Page Not Found | Alhamd Academy", "الصفحة غير موجودة | أكاديمية الحمد")}
        description={t("The page you are looking for does not exist.", "الصفحة التي تبحث عنها غير موجودة.")}
        noIndex={true}
      />
      <div className="text-center px-4">
        <h1 className="mb-4 text-7xl font-heading font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          {t("Oops! Page not found", "عفواً! الصفحة غير موجودة")}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          <Home className="w-5 h-5" />
          {t("Return to Home", "العودة للرئيسية")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
