import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useHasTeachers } from "@/hooks/useHasTeachers";
import { getLinks, socials } from "./navbar/navData";
import { useNavbarLogic } from "./navbar/useNavbarLogic";
import DesktopNav from "./navbar/DesktopNav";
import MobileMenu from "./navbar/MobileMenu";
import logo from "@/assets/logo-new.webp";

const Navbar = () => {
  const { t } = useLanguage();
  const { hasTeachers } = useHasTeachers();
  const links = getLinks(hasTeachers);

  const {
    scrolled,
    mobileOpen,
    setMobileOpen,
    expandedMobile,
    setExpandedMobile,
    expandedMobileSub,
    setExpandedMobileSub,
    openDesktopDropdown,
    setOpenDesktopDropdown,
    isCourseDetailPage,
    cancelPendingScroll,
    closeMobileMenu,
    handleHomeLogoClick,
    handleAnchorClick,
    scrollToTopRoute,
  } = useNavbarLogic();

  return (
    <>
      <header className={`site-fixed-layer fixed left-0 right-0 top-0 z-50 transition-none lg:transition-[box-shadow] lg:duration-300 ${scrolled ? "lg:shadow-elevated" : ""}`}>
        <div className="bg-primary shadow-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
            <DesktopNav
              links={links}
              socials={socials}
              openDesktopDropdown={openDesktopDropdown}
              setOpenDesktopDropdown={setOpenDesktopDropdown}
              isCourseDetailPage={isCourseDetailPage}
              handleHomeLogoClick={handleHomeLogoClick}
              handleAnchorClick={handleAnchorClick}
              scrollToTopRoute={scrollToTopRoute}
            />

            {/* Mobile/Tablet header bar */}
            <div className="flex lg:hidden items-center justify-between w-full gap-2">
              <Link
                to="/"
                onClick={(e) => { if (isCourseDetailPage) handleHomeLogoClick(e); else { e.preventDefault(); scrollToTopRoute(); } }}
                className="flex items-center gap-2.5 shrink-0"
              >
                <img src={logo} alt="Alhamd Academy" width={48} height={48} loading="eager" decoding="async" className="h-12 w-12 object-cover rounded-2xl" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[13px] font-heading font-extrabold text-primary-foreground uppercase tracking-wider">
                    {t("Alhamd", "الحمد")}
                  </span>
                  <span className="text-[9px] font-medium text-primary-foreground/60 uppercase tracking-widest">
                    {t("Academy", "أكاديمية")}
                  </span>
                </div>
              </Link>

              <button
                onClick={() => {
                  cancelPendingScroll();
                  if (mobileOpen) closeMobileMenu();
                  else setMobileOpen(true);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground transition-colors duration-200 hover:bg-primary-foreground/10"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className={`absolute h-[2px] w-5 bg-primary-foreground rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`} />
                  <span className={`absolute h-[2px] w-5 bg-primary-foreground rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
                  <span className={`absolute h-[2px] w-5 bg-primary-foreground rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`} />
                </div>
              </button>

              <div className="flex items-center gap-1.5">
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "#contact")}
                  className="flex items-center whitespace-nowrap rounded-xl bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-card transition-[filter,box-shadow] hover:brightness-110 lg:shadow-elevated"
                >
                  <Sparkles className="me-1.5 h-3.5 w-3.5" />
                  {t("Free Trial", "تجربة مجانية")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        links={links}
        socials={socials}
        mobileOpen={mobileOpen}
        expandedMobile={expandedMobile}
        setExpandedMobile={setExpandedMobile}
        expandedMobileSub={expandedMobileSub}
        setExpandedMobileSub={setExpandedMobileSub}
        closeMobileMenu={closeMobileMenu}
        handleAnchorClick={handleAnchorClick}
        scrollToTopRoute={scrollToTopRoute}
      />
    </>
  );
};

export default Navbar;
