import { Link } from "react-router-dom";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSafeScrollBehavior } from "@/lib/scrollBehavior";
import type { NavLinkWithDropdown, SocialLink } from "./types";
import logo from "@/assets/logo-new.webp";

interface MobileMenuProps {
  links: NavLinkWithDropdown[];
  socials: SocialLink[];
  mobileOpen: boolean;
  expandedMobile: string | null;
  setExpandedMobile: (v: string | null) => void;
  expandedMobileSub: number | null;
  setExpandedMobileSub: (v: number | null) => void;
  closeMobileMenu: () => void;
  handleAnchorClick: (e: React.MouseEvent, href: string) => void;
  scrollToTopRoute: () => void;
}

const MobileMenu = ({
  links,
  socials,
  mobileOpen,
  expandedMobile,
  setExpandedMobile,
  expandedMobileSub,
  setExpandedMobileSub,
  closeMobileMenu,
  handleAnchorClick,
  scrollToTopRoute,
}: MobileMenuProps) => {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <div
      className={`fixed inset-x-0 bottom-0 top-16 z-[55] bg-primary overscroll-none lg:hidden transition-opacity duration-150 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      style={{ visibility: mobileOpen ? "visible" : "hidden" }}
    >
      <div className="relative flex h-full flex-col">
        {/* Top: Logo on right */}
        <div className="flex items-center justify-end px-6 pt-6 pb-4">
          <Link to="/" onClick={(e) => { e.preventDefault(); scrollToTopRoute(); }} className="flex items-center gap-2.5">
            <span className="text-xs font-heading font-bold text-primary-foreground/80 uppercase tracking-widest">
              {t("Alhamd Academy", "أكاديمية الحمد")}
            </span>
            <img src={logo} alt="Alhamd Academy" width={40} height={40} loading="lazy" decoding="async" className="h-10 w-10 object-cover rounded-xl shadow-soft" />
          </Link>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-6 md:px-10 pb-24 scrollbar-hide touch-pan-y [-webkit-overflow-scrolling:touch]" aria-label="Mobile navigation">
          <div className="space-y-0.5">
            {links.map((l) => {
              const hasDropdown = l.dropdown && l.dropdown.length > 0;
              const isExpanded = expandedMobile === l.en;

              return (
                <div key={l.en} className="border-b border-primary-foreground/5 last:border-0">
                  {hasDropdown ? (
                    <div className="flex items-center gap-2">
                      {l.isRoute ? (
                        <Link
                          to={l.href}
                          onClick={closeMobileMenu}
                          className="flex-1 py-3.5 md:py-4 text-base md:text-lg font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
                        >
                          {t(l.en, l.ar)}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          onClick={(e) => { handleAnchorClick(e, l.href); }}
                          className="flex-1 py-3.5 md:py-4 text-base md:text-lg font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
                        >
                          {t(l.en, l.ar)}
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          const next = isExpanded ? null : l.en;
                          setExpandedMobile(next);
                          setExpandedMobileSub(null);
                          if (next) {
                            const target = (e.currentTarget as HTMLElement).closest('[class*="border-b"]');
                            if (target) {
                              setTimeout(() => target.scrollIntoView({ behavior: getSafeScrollBehavior(), block: "start" }), 50);
                            }
                          }
                        }}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-primary-foreground/50 transition-colors duration-200 hover:bg-primary-foreground/5 hover:text-accent"
                        aria-expanded={isExpanded}
                        aria-label={t(`Expand ${l.en}`, `افتح ${l.ar}`)}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  ) : l.isRoute ? (
                    <Link
                      to={l.href}
                      onClick={closeMobileMenu}
                      className="block w-full py-3.5 md:py-4 text-base md:text-lg font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
                    >
                      {t(l.en, l.ar)}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      onClick={(e) => { handleAnchorClick(e, l.href); }}
                      className="block w-full py-3.5 md:py-4 text-base md:text-lg font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
                    >
                      {t(l.en, l.ar)}
                    </a>
                  )}

                  {hasDropdown && isExpanded && (
                    <div className="ps-3 pb-3 border-s-2 border-accent/30 ms-2">
                      {l.dropdown!.map((item, i) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isSubExpanded = expandedMobileSub === i;

                        return (
                          <div key={i}>
                            <div className="flex items-center gap-1">
                              {hasSubItems && item.isRoute ? (
                                <>
                                  <Link
                                    to={item.href}
                                    onClick={closeMobileMenu}
                                    className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-3 text-sm md:text-base font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
                                  >
                                    <span className="text-accent">{item.icon}</span>
                                    {t(item.labelEn, item.labelAr)}
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => setExpandedMobileSub(isSubExpanded ? null : i)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground/60 transition-colors hover:bg-primary-foreground/5 hover:text-accent"
                                    aria-label={t(`Expand ${item.labelEn}`, `افتح ${item.labelAr}`)}
                                  >
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSubExpanded ? "rotate-180" : ""}`} />
                                  </button>
                                </>
                              ) : item.isRoute ? (
                                <Link
                                  to={item.href}
                                  onClick={closeMobileMenu}
                                  className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-3 text-sm md:text-base font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
                                >
                                  <span className="text-accent">{item.icon}</span>
                                  {t(item.labelEn, item.labelAr)}
                                </Link>
                              ) : item.href.startsWith("http") || item.href.startsWith("mailto:") ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={closeMobileMenu}
                                  className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-3 text-sm md:text-base font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
                                >
                                  <span className="text-accent">{item.icon}</span>
                                  {t(item.labelEn, item.labelAr)}
                                </a>
                              ) : (
                                <a
                                  href={item.href}
                                  onClick={(e) => { handleAnchorClick(e, item.href); }}
                                  className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-3 text-sm md:text-base font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
                                >
                                  <span className="text-accent">{item.icon}</span>
                                  {t(item.labelEn, item.labelAr)}
                                </a>
                              )}
                            </div>
                            {hasSubItems && isSubExpanded && (
                              <div className="ps-9 pb-1">
                                {item.subItems!.map((sub, j) =>
                                  sub.isRoute ? (
                                    <Link
                                      key={j}
                                      to={sub.href}
                                      onClick={closeMobileMenu}
                                      className="block px-3 py-2 text-xs font-medium text-primary-foreground/50 hover:text-accent transition-colors"
                                    >
                                      {t(sub.labelEn, sub.labelAr)}
                                    </Link>
                                  ) : (
                                    <a
                                      key={j}
                                      href={sub.href}
                                      onClick={(e) => { handleAnchorClick(e, sub.href); }}
                                      className="block px-3 py-2 text-xs font-medium text-primary-foreground/50 hover:text-accent transition-colors"
                                    >
                                      {t(sub.labelEn, sub.labelAr)}
                                    </a>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Language toggle + Social icons */}
          <div className="flex items-center justify-center gap-3 pt-5 mt-4 mb-28 border-t border-primary-foreground/10">
            <button
              onClick={toggleLang}
              className="flex h-10 items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-4 text-primary-foreground transition-colors duration-200 hover:bg-accent/25"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold">{lang === "en" ? "عربي" : "English"}</span>
            </button>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 transition-colors duration-200 hover:bg-primary-foreground/15 hover:text-accent"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-6 pt-2">
          <a
            href="#contact"
            onClick={(e) => { handleAnchorClick(e, "#contact"); }}
            className="block w-full rounded-xl bg-accent py-3.5 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-elevated transition-[filter] duration-200 hover:brightness-110"
          >
            {t("Book Your Free Trial", "احجز حصتك المجانية")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
