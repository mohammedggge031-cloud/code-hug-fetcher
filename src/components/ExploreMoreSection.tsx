import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

interface ExploreItem {
  labelEn: string;
  labelAr: string;
  href: string;
  isRoute?: boolean;
}

const exploreItems: ExploreItem[] = [
  { labelEn: "Our Courses", labelAr: "دوراتنا", href: "courses" },
  { labelEn: "Pricing", labelAr: "الأسعار", href: "pricing" },
  { labelEn: "Videos", labelAr: "فيديوهات", href: "/videos", isRoute: true },
  { labelEn: "Blog", labelAr: "المدونة", href: "/blog", isRoute: true },
  { labelEn: "Free Trial", labelAr: "تجربة مجانية", href: "/free-trial", isRoute: true },
  { labelEn: "Contact", labelAr: "تواصل معنا", href: "contact" },
];

const ExploreMoreSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSectionNavigation = (sectionId: string) => {
    window.sessionStorage.setItem("pendingScrollTarget", sectionId);
    navigate("/");
  };

  return (
    <section className="py-10 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-heading font-bold text-foreground text-center mb-6">
          {t("Explore More", "استكشف المزيد")}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {exploreItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.labelEn}
                to={item.href}
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {t(item.labelEn, item.labelAr)}
              </Link>
            ) : (
              <button
                key={item.labelEn}
                type="button"
                onClick={() => handleSectionNavigation(item.href)}
                className="px-5 py-2.5 rounded-full bg-card border border-border text-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t(item.labelEn, item.labelAr)}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreSection;
