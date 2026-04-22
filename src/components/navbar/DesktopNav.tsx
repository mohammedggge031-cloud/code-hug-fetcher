import { Link } from "react-router-dom";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NavLinkWithDropdown, SocialLink } from "./types";
import logo from "@/assets/logo-new.webp";

interface DesktopNavProps {
  links: NavLinkWithDropdown[];
  socials: SocialLink[];
  openDesktopDropdown: string | null;
  setOpenDesktopDropdown: (v: string | null) => void;
  isCourseDetailPage: boolean;
  handleHomeLogoClick: (e: React.MouseEvent) => void;
  handleAnchorClick: (e: React.MouseEvent, href: string) => void;
  scrollToTopRoute: () => void;
}

const DesktopNav = ({
  links,
  socials,
  openDesktopDropdown,
  setOpenDesktopDropdown,
  isCourseDetailPage,
  handleHomeLogoClick,
  handleAnchorClick,
  scrollToTopRoute,
}: DesktopNavProps) => {
  const { t, lang, toggleLang } = useLanguage();

  const linkClass = "flex items-center px-4 py-2 text-[15px] font-bold text-primary-foreground uppercase tracking-wide hover:text-accent transition-colors whitespace-nowrap rounded-full hover:bg-primary-foreground/10";

  const renderLink = (l: NavLinkWithDropdown) => {
    const hasDropdown = l.dropdown && l.dropdown.length > 0;
    const isDesktopOpen = openDesktopDropdown === l.en;

    const linkContent = (
      <>
        {t(l.en, l.ar)}
        {hasDropdown && <ChevronDown className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" />}
      </>
    );

    return (
      <div key={l.en} className="relative group" onMouseLeave={() => { if (isDesktopOpen) setOpenDesktopDropdown(null); }}>
        {hasDropdown ? (
          <button
            type="button"
            className={linkClass}
            onClick={(e) => {
              e.stopPropagation();
              setOpenDesktopDropdown(isDesktopOpen ? null : l.en);
            }}
          >
            {linkContent}
          </button>
        ) : l.isRoute ? (
          <Link to={l.href} className={linkClass}>{linkContent}</Link>
        ) : (
          <a href={l.href} className={linkClass} onClick={(e) => handleAnchorClick(e, l.href)}>{linkContent}</a>
        )}

        {hasDropdown && (
          <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 ${isDesktopOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}>
            <div className="bg-popover rounded-xl shadow-xl border border-border/50 py-2 min-w-[280px] overflow-hidden">
              {l.dropdown!.map((item, i) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;

                return (
                  <div key={i} className="group/item relative">
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <span className="text-accent">{item.icon}</span>
                        {t(item.labelEn, item.labelAr)}
                        {hasSubItems && <ChevronDown className="w-3 h-3 ms-auto -rotate-90" />}
                      </Link>
                    ) : item.href.startsWith("http") || item.href.startsWith("mailto:") ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <span className="text-accent">{item.icon}</span>
                        {t(item.labelEn, item.labelAr)}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <span className="text-accent">{item.icon}</span>
                        {t(item.labelEn, item.labelAr)}
                        {hasSubItems && <ChevronDown className="w-3 h-3 ms-auto -rotate-90" />}
                      </a>
                    )}

                    {hasSubItems && (
                      <div className="absolute top-0 start-full ps-2 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50">
                        <div className="bg-popover rounded-xl shadow-xl border border-border/50 py-2 min-w-[220px]">
                          {item.subItems!.map((sub, j) =>
                            sub.isRoute ? (
                              <Link
                                key={j}
                                to={sub.href}
                                className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                              >
                                {t(sub.labelEn, sub.labelAr)}
                              </Link>
                            ) : (
                              <a
                                key={j}
                                href={sub.href}
                                onClick={(e) => handleAnchorClick(e, sub.href)}
                                className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                              >
                                {t(sub.labelEn, sub.labelAr)}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Link
        to="/"
        onClick={(e) => { if (isCourseDetailPage) handleHomeLogoClick(e); else { e.preventDefault(); scrollToTopRoute(); } }}
        className="hidden lg:flex flex-col items-center gap-0.5 shrink-0 overflow-hidden"
      >
        <img src={logo} alt="Alhamd Academy" width={56} height={56} loading="eager" decoding="async" className="h-14 w-14 object-cover rounded-xl shadow-soft border border-primary-foreground/10" />
        <span className="text-[11px] font-heading font-bold text-primary-foreground uppercase tracking-widest">
          {t("Alhamd Academy", "أكاديمية الحمد")}
        </span>
      </Link>

      <nav className="hidden lg:flex items-center justify-center gap-0.5 py-2" aria-label="Main navigation">
        {links.map((l) => renderLink(l))}
      </nav>

      <div className="hidden lg:flex items-center gap-1 shrink-0">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10 hover:text-accent"
          aria-label="Toggle language"
        >
          <Globe className="w-4 h-4" />
          {lang === "en" ? "عربي" : "EN"}
        </button>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-primary-foreground/10 hover:text-accent"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </>
  );
};

export default DesktopNav;
