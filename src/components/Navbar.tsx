import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Mail, Phone, BookOpen, Moon, Languages, GraduationCap, Sparkles, Users, Award, MessageCircle, Clock, ChevronDown, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHasTeachers } from "@/hooks/useHasTeachers";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import logo from "@/assets/logo.webp";

interface SubItem {
  labelEn: string;
  labelAr: string;
  href: string;
  isRoute?: boolean;
}

interface DropdownItem {
  icon?: React.ReactNode;
  labelEn: string;
  labelAr: string;
  href: string;
  isRoute?: boolean;
  courseIndex?: number;
  subItems?: SubItem[];
}

interface NavLinkWithDropdown {
  en: string;
  ar: string;
  href: string;
  isRoute?: boolean;
  dropdown?: DropdownItem[];
}

const Navbar = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [expandedMobileSub, setExpandedMobileSub] = useState<number | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const bodyScrollYRef = useRef(0);
  const scrollTimerRef = useRef<number | null>(null);
  const lastPathnameRef = useRef(location.pathname);
  const isHomePage = location.pathname === "/";

  // Track the current pathname so the menu-close effect knows if we navigated
  useEffect(() => {
    lastPathnameRef.current = location.pathname;
  }, [location.pathname]);
  const isCourseDetailPage = location.pathname.startsWith("/courses/");
  const { hasTeachers } = useHasTeachers();

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

  // useLayoutEffect ensures body is unfixed BEFORE ScrollToTop's useLayoutEffect
  // runs, preventing the "jitter" where scroll commands fire while body is still fixed
  useLayoutEffect(() => {
    const body = document.body;
    if (body.classList.contains("menu-open")) {
      body.classList.remove("menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      delete body.dataset.scrollY;
    }
    setMobileOpen(false);
    setExpandedMobile(null);
    setExpandedMobileSub(null);
    setOpenDesktopDropdown(null);
  }, [location.pathname, location.hash]);

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

  useEffect(() => {
    const body = document.body;

    if (mobileOpen) {
      const scrollY = window.scrollY;
      bodyScrollYRef.current = scrollY;
      body.dataset.scrollY = String(scrollY);
      body.classList.add("menu-open");
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overscrollBehavior = "none";
    } else {
      const savedY = Number(body.dataset.scrollY || bodyScrollYRef.current || "0");
      body.classList.remove("menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      delete body.dataset.scrollY;
      // Only restore scroll if we're still on the same page (not navigating away).
      // If the user clicked a link to a new page, ScrollToTop handles scroll position.
      const stayedOnSamePage = location.pathname === lastPathnameRef.current;
      if (stayedOnSamePage && savedY > 0 && Math.abs(window.scrollY - savedY) > 1) {
        window.scrollTo({ top: savedY, left: 0, behavior: "auto" });
      }
    }

    return () => {
      body.classList.remove("menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
    };
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

  const goHomeToCoursesSection = () => {
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
        // Ignore malformed session data and fallback to /#courses.
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
  };

  const handleHomeLogoClick = (e: React.MouseEvent) => {
    if (!isCourseDetailPage) return;
    e.preventDefault();
    goHomeToCoursesSection();
  };

  const cancelPendingScroll = () => {
    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };

  const scrollToSection = (targetId: string) => {
    cancelPendingScroll();
    const headerOffset = 96;
    const scrollToTarget = (attempt = 0, lastTop = -1) => {
      // Abort if menu opened during retry loop
      if (document.body.classList.contains("menu-open")) {
        scrollTimerRef.current = null;
        return;
      }
      const target = document.getElementById(targetId);
      if (target) {
        const top = Math.round(target.getBoundingClientRect().top + window.scrollY - headerOffset);
        window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "smooth" });
        if (attempt < 30 && top !== lastTop) {
          scrollTimerRef.current = window.setTimeout(() => scrollToTarget(attempt + 1, top), 80);
        } else {
          scrollTimerRef.current = null;
        }
        return;
      }
      if (attempt < 60) {
        scrollTimerRef.current = window.setTimeout(() => scrollToTarget(attempt + 1, lastTop), 50);
      } else {
        scrollTimerRef.current = null;
      }
    };
    scrollToTarget();
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
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

    // If mobile menu is open, close it first then scroll
    if (mobileOpen) {
      setMobileOpen(false);
      if (isHomePage) {
        // Body is position:fixed, so scroll after menu close restores body
        requestAnimationFrame(() => {
          scrollToSection(targetId);
        });
      } else {
        window.sessionStorage.setItem("pendingScrollTarget", targetId);
        navigate("/");
      }
      return;
    }

    if (isHomePage) {
      // Already on homepage — scroll directly instead of navigating
      scrollToSection(targetId);
      return;
    }

    window.sessionStorage.setItem("pendingScrollTarget", targetId);
    navigate("/");
  };

  const scrollToTopRoute = () => {
    if (mobileOpen) {
      setMobileOpen(false);
      requestAnimationFrame(() => {
        navigate("/", { replace: location.pathname === "/" && !location.hash });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
      return;
    }

    if (location.pathname === "/") {
      navigate("/", { replace: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    navigate("/");
  };

  const links: NavLinkWithDropdown[] = [
    { en: "Home", ar: "الرئيسية", href: "#home" },
    {
      en: "Courses", ar: "الدورات", href: "#courses",
      dropdown: [
        {
          icon: <BookOpen className="w-4 h-4" />, labelEn: "Quran Course", labelAr: "دورة القرآن الكريم", href: "/courses/quran-course", isRoute: true,
          subItems: [
            { labelEn: "Learn to Read Quran", labelAr: "تعلم قراءة القرآن", href: "/online-quran-classes", isRoute: true },
            { labelEn: "Quran Memorization (Hifz)", labelAr: "حفظ القرآن أونلاين", href: "/quran-memorization-hifz", isRoute: true },
            { labelEn: "Quran Course Full Track", labelAr: "دورة القرآن المتكاملة", href: "/courses/quran-course", isRoute: true },
            { labelEn: "Quran for Kids", labelAr: "القرآن للأطفال", href: "/courses/quran-course", isRoute: true },
            { labelEn: "Ijazah Program", labelAr: "برنامج الإجازة", href: "/ijazah-program", isRoute: true },
          ],
        },
        {
          icon: <Moon className="w-4 h-4" />, labelEn: "Tajweed Course", labelAr: "دورة التجويد", href: "/courses/tajweed-course", isRoute: true,
          subItems: [
            { labelEn: "Basic Tajweed", labelAr: "التجويد الأساسي", href: "/tajweed-course-online", isRoute: true },
            { labelEn: "Intermediate Tajweed", labelAr: "التجويد المتوسط", href: "/courses/tajweed-course", isRoute: true },
            { labelEn: "Advanced Tajweed", labelAr: "التجويد المتقدم", href: "/courses/tajweed-course", isRoute: true },
            { labelEn: "Tajweed for Kids", labelAr: "التجويد للأطفال", href: "/courses/tajweed-course", isRoute: true },
          ],
        },
        {
          icon: <Languages className="w-4 h-4" />, labelEn: "Arabic Course", labelAr: "دورة اللغة العربية", href: "/courses/arabic-course", isRoute: true,
          subItems: [
            { labelEn: "Noorani Qaida Online", labelAr: "النورانية أونلاين", href: "/courses/arabic-course", isRoute: true },
            { labelEn: "Arabic for Kids", labelAr: "العربية للأطفال", href: "/arabic-for-kids", isRoute: true },
            { labelEn: "Arabic for Adults", labelAr: "العربية للكبار", href: "/arabic-for-adults", isRoute: true },
            { labelEn: "Quranic Arabic", labelAr: "العربية القرآنية", href: "/courses/arabic-course", isRoute: true },
          ],
        },
        {
          icon: <GraduationCap className="w-4 h-4" />, labelEn: "Islamic Studies", labelAr: "الدراسات الإسلامية", href: "/courses/islamic-studies", isRoute: true,
          subItems: [
            { labelEn: "Islamic Essentials for Kids", labelAr: "الأساسيات الإسلامية للأطفال", href: "/courses/islamic-studies", isRoute: true },
            { labelEn: "Fiqh & Aqeedah", labelAr: "الفقه والعقيدة", href: "/courses/islamic-studies", isRoute: true },
            { labelEn: "Tafseer, Hadith & Seerah", labelAr: "التفسير والحديث والسيرة", href: "/courses/islamic-studies", isRoute: true },
            { labelEn: "New Muslim Program", labelAr: "برنامج المسلمين الجدد", href: "/courses/islamic-studies", isRoute: true },
          ],
        },
        {
          icon: <Sparkles className="w-4 h-4" />, labelEn: "All-in-One Course", labelAr: "الدورة الشاملة", href: "/courses/all-in-one-course", isRoute: true,
          subItems: [
            { labelEn: "Customized Learning Plan", labelAr: "خطة تعلم مخصصة", href: "/courses/all-in-one-course", isRoute: true },
            { labelEn: "Family Package", labelAr: "الباقة العائلية", href: "/courses/all-in-one-course", isRoute: true },
            { labelEn: "Weekend Intensive", labelAr: "المكثفة في عطلة الأسبوع", href: "/courses/all-in-one-course", isRoute: true },
          ],
        },
      ],
    },
    { en: "Pricing", ar: "الأسعار", href: "#pricing" },
    {
      en: "About", ar: "من نحن", href: "#about",
      dropdown: [
        { icon: <Award className="w-4 h-4" />, labelEn: "Why Choose Us", labelAr: "ليه احنا", href: "#why-us" },
        { icon: <MessageCircle className="w-4 h-4" />, labelEn: "Testimonials", labelAr: "آراء الطلاب", href: "#testimonials" },
        { icon: <Users className="w-4 h-4" />, labelEn: "Our Team", labelAr: "فريقنا", href: "#about" },
        ...(hasTeachers ? [{ icon: <GraduationCap className="w-4 h-4" />, labelEn: "Our Teachers", labelAr: "معلمونا", href: "#teachers" }] : []),
      ],
    },
    { en: "Blog", ar: "المدونة", href: "/blog", isRoute: true },
    { en: "Videos", ar: "فيديوهات", href: "/videos", isRoute: true },
    {
      en: "Contact", ar: "تواصل معنا", href: "#contact",
      dropdown: [
        { icon: <Phone className="w-4 h-4" />, labelEn: "WhatsApp", labelAr: "واتساب", href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B" },
        { icon: <Mail className="w-4 h-4" />, labelEn: "Email Us", labelAr: "راسلنا", href: "mailto:info@alhamdacademy.net" },
        { icon: <Clock className="w-4 h-4" />, labelEn: "Free Trial", labelAr: "تجربة مجانية", href: "/free-trial", isRoute: true },
      ],
    },
  ];

  const socials = [
    { icon: <WhatsAppIcon />, href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B", label: "WhatsApp" },
    { icon: <FacebookIcon />, href: "https://www.facebook.com/share/1BFyf4qMm8/", label: "Facebook" },
    { icon: <InstagramIcon />, href: "https://www.instagram.com/alhamdacademy_official", label: "Instagram" },
    { icon: <Mail className="w-4 h-4" />, href: "mailto:info@alhamdacademy.net", label: "Email" },
    { icon: <YoutubeIcon />, href: "https://www.youtube.com/@alhamdacademy_official", label: "YouTube" },
    { icon: <TikTokIcon />, href: "https://www.tiktok.com/@alhamdacademy_official", label: "TikTok" },
  ];

  const renderLink = (l: NavLinkWithDropdown) => {
    const hasDropdown = l.dropdown && l.dropdown.length > 0;
    const isDesktopOpen = openDesktopDropdown === l.en;

    const linkContent = (
      <>
        {t(l.en, l.ar)}
        {hasDropdown && <ChevronDown className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" />}
      </>
    );

    const linkClass = "flex items-center px-4 py-2 text-[15px] font-bold text-primary-foreground uppercase tracking-wide hover:text-accent transition-colors whitespace-nowrap rounded-full hover:bg-primary-foreground/10";

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

        {/* Dropdown */}
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

                    {/* Sub-items flyout */}
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
    <header className={`site-fixed-layer fixed left-0 right-0 top-0 z-50 transition-none lg:transition-[box-shadow] lg:duration-300 ${scrolled ? "lg:shadow-elevated" : ""}`}>
      <div className="bg-primary shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
          {/* Desktop: Logo left */}
          <Link to="/" onClick={(e) => { if (isCourseDetailPage) handleHomeLogoClick(e); else { e.preventDefault(); scrollToTopRoute(); } }} className="hidden lg:flex flex-col items-center gap-0.5 shrink-0 overflow-hidden">
            <img src={logo} alt="Alhamd Academy" width={56} height={56} loading="eager" fetchPriority="high" decoding="async" className="h-14 w-14 object-cover rounded-xl shadow-soft border border-primary-foreground/10" />
            <span className="text-[11px] font-heading font-bold text-primary-foreground uppercase tracking-widest">
              {t("Alhamd Academy", "أكاديمية الحمد")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5 py-2" aria-label="Main navigation">
            {links.map((l) => renderLink(l))}
          </nav>

          {/* Desktop: Social icons + Language toggle */}
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

          {/* Mobile/Tablet: Logo (left) | Nav center | Book Trial (right) */}
          <div className="flex lg:hidden items-center justify-between w-full gap-2">
            {/* Left: Large Logo */}
             <Link to="/" onClick={(e) => { if (isCourseDetailPage) handleHomeLogoClick(e); else { e.preventDefault(); scrollToTopRoute(); } }} className="flex items-center gap-2.5 shrink-0">
              <img src={logo} alt="Alhamd Academy" width={48} height={48} loading="eager" decoding="async" className="h-12 w-12 object-cover rounded-xl shadow-soft border-2 border-accent/20" />
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-heading font-extrabold text-primary-foreground uppercase tracking-wider">
                  {t("Alhamd", "الحمد")}
                </span>
                <span className="text-[9px] font-medium text-primary-foreground/60 uppercase tracking-widest">
                  {t("Academy", "أكاديمية")}
                </span>
              </div>
            </Link>

            {/* Center: hamburger */}
            <button
              onClick={() => { cancelPendingScroll(); setMobileOpen(!mobileOpen); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className={`absolute h-[2px] w-5 bg-primary-foreground rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`} />
                <span className={`absolute h-[2px] w-5 bg-primary-foreground rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
                <span className={`absolute h-[2px] w-5 bg-primary-foreground rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`} />
              </div>
            </button>

            {/* Right: Book Trial CTA */}
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

    {/* Mobile fullscreen menu - OUTSIDE header to escape stacking context */}
    <div className={`fixed inset-x-0 bottom-0 top-16 z-[55] bg-primary overscroll-none transition-[opacity,visibility] duration-300 lg:hidden ${mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}>
      <div className={`relative flex h-full flex-col transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-4"}`}>
        {/* Top: Logo on right */}
        <div className="flex items-center justify-end px-6 pt-6 pb-4">
          <Link to="/" onClick={(e) => { e.preventDefault(); scrollToTopRoute(); }} className="flex items-center gap-2.5">
            <span className="text-xs font-heading font-bold text-primary-foreground/80 uppercase tracking-widest">
              {t("Alhamd Academy", "أكاديمية الحمد")}
            </span>
            <img src={logo} alt="Alhamd Academy" width={40} height={40} loading="lazy" decoding="async" className="h-10 w-10 object-cover rounded-xl shadow-soft border border-accent/20" />
          </Link>
        </div>

        {/* Menu items - scrollable */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-6 pb-4 scrollbar-hide" aria-label="Mobile navigation">
          <div className="space-y-0.5">
            {links.map((l) => {
              const hasDropdown = l.dropdown && l.dropdown.length > 0;
              const isExpanded = expandedMobile === l.en;

              return (
                <div key={l.en} className="border-b border-primary-foreground/5 last:border-0">
                  {hasDropdown ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        const next = isExpanded ? null : l.en;
                        setExpandedMobile(next);
                        setExpandedMobileSub(null);
                        if (next) {
                          const target = (e.currentTarget as HTMLElement).closest('[class*="border-b"]');
                          if (target) {
                            setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                          }
                        }
                      }}
                      className="w-full flex items-center justify-between py-3.5 text-base font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
                    >
                      {t(l.en, l.ar)}
                      <ChevronDown className={`w-4 h-4 text-primary-foreground/50 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  ) : l.isRoute ? (
                    <Link
                      to={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block w-full py-3.5 text-base font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
                    >
                      {t(l.en, l.ar)}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      onClick={(e) => { handleAnchorClick(e, l.href); }}
                      className="block w-full py-3.5 text-base font-bold text-primary-foreground uppercase tracking-wider hover:text-accent transition-colors"
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
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
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
                                  onClick={() => setMobileOpen(false)}
                                  className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
                                >
                                  <span className="text-accent">{item.icon}</span>
                                  {t(item.labelEn, item.labelAr)}
                                </Link>
                              ) : item.href.startsWith("http") || item.href.startsWith("mailto:") ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
                                >
                                  <span className="text-accent">{item.icon}</span>
                                  {t(item.labelEn, item.labelAr)}
                                </a>
                              ) : (
                                <a
                                  href={item.href}
                                  onClick={(e) => { handleAnchorClick(e, item.href); }}
                                  className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-primary-foreground/75 hover:text-accent transition-colors rounded-lg hover:bg-primary-foreground/5"
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
                                      onClick={() => setMobileOpen(false)}
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

          {/* Language toggle + Social icons row */}
          <div className="flex items-center justify-center gap-3 pt-5 mt-4 border-t border-primary-foreground/10">
            <button
              onClick={toggleLang}
              className="h-10 px-4 rounded-full bg-accent/15 border border-accent/30 flex items-center gap-2 text-primary-foreground hover:bg-accent/25 transition-all"
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
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-accent hover:bg-primary-foreground/15 transition-all"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </nav>

        {/* Bottom: Book Trial CTA - full width */}
        <div className="px-6 pb-6 pt-2">
          <a
            href="#contact"
            onClick={(e) => { handleAnchorClick(e, "#contact"); }}
            className="block w-full py-3.5 text-center text-sm font-bold uppercase tracking-wider rounded-xl bg-accent text-accent-foreground hover:brightness-110 transition-all shadow-elevated"
          >
            {t("Book Your Free Trial", "احجز حصتك المجانية")}
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
