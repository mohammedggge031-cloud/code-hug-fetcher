import { forwardRef, type Ref } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, GraduationCap, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const FacebookIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
));
FacebookIcon.displayName = "FacebookIcon";

const InstagramIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
));
InstagramIcon.displayName = "InstagramIcon";

const WhatsAppIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
));
WhatsAppIcon.displayName = "WhatsAppIcon";

const YoutubeIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
));
YoutubeIcon.displayName = "YoutubeIcon";

const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { t } = useLanguage();

  const courseLinks = [
    { en: "The Best Quran Course at Alhamd Academy", ar: "أفضل كورس قرآن في الحمد أكاديمي", href: "/courses/quran-course" },
    { en: "The Best Tajweed Course at Alhamd Academy", ar: "أفضل كورس تجويد في الحمد أكاديمي", href: "/courses/tajweed-course" },
    { en: "The Best Arabic Course at Alhamd Academy", ar: "أفضل كورس عربي في الحمد أكاديمي", href: "/courses/arabic-course" },
    { en: "The Best Islamic Studies at Alhamd Academy", ar: "أفضل دراسات إسلامية في الحمد أكاديمي", href: "/courses/islamic-studies" },
    { en: "All-in-One Course", ar: "الدورة الشاملة", href: "/courses/all-in-one-course" },
  ];

  const quickLinks = [
    { en: "Home", ar: "الرئيسية", href: "/" },
    { en: "Pricing", ar: "الأسعار", href: "/#pricing" },
    { en: "About Us", ar: "من نحن", href: "/#about" },
    { en: "Free Trial", ar: "حصة تجريبية مجانية", href: "/free-trial" },
    { en: "Student Success Stories", ar: "قصص نجاح الطلاب", href: "/student-success-stories" },
    { en: "Blog", ar: "المدونة", href: "/blog" },
    { en: "Videos", ar: "فيديوهات", href: "/videos" },
  ];

  const socialLinks = [
    { icon: WhatsAppIcon, href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy", label: "WhatsApp" },
    { icon: FacebookIcon, href: "https://www.facebook.com/share/1BFyf4qMm8/", label: "Facebook" },
    { icon: InstagramIcon, href: "https://www.instagram.com/alhamdacademy_official", label: "Instagram" },
    
    { icon: Mail, href: "mailto:info@alhamdacademy.net", label: "Email" },
  ];

  return (
    <footer ref={ref} className="relative bg-primary overflow-hidden" role="contentinfo" aria-label="Alhamd Academy Footer">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-accent" />

      <div className="container mx-auto px-4 sm:px-6 py-14 pb-20 md:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <img 
                src={logo} 
                alt="Alhamd Academy" 
                width={44} 
                height={44} 
                className="h-11 w-11 rounded-xl object-contain bg-primary-foreground/10 p-1 group-hover:scale-105 transition-transform" 
                loading="lazy"
                decoding="async"
              />
              <div>
                <span className="font-heading text-lg font-bold text-primary-foreground block leading-tight">
                  {t("Alhamd Academy", "أكاديمية الحمد")}
                </span>
                <span className="text-[10px] text-accent font-semibold uppercase tracking-widest">
                  {t("Learn · Grow · Excel", "تعلّم · انمُ · تميّز")}
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/50 text-sm leading-relaxed mb-5">
              {t(
                "Professional online Quran, Arabic & Islamic studies with certified native Arabic teachers from Egypt.",
                "تعليم القرآن والعربية والدراسات الإسلامية مع معلمين عرب معتمدين من مصر."
              )}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mb-5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a 
                    key={s.label} 
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/8 text-primary-foreground/50 transition-all duration-200 hover:bg-primary-foreground/15 hover:text-accent" 
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <a href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy" className="flex items-center gap-2.5 text-xs text-primary-foreground/45 hover:text-accent transition-colors group">
                <Phone className="w-3.5 h-3.5 group-hover:text-accent" />
                <span>+20 127 113 4828</span>
              </a>
              <a href="mailto:info@alhamdacademy.net" className="flex items-center gap-2.5 text-xs text-primary-foreground/45 hover:text-accent transition-colors group">
                <Mail className="w-3.5 h-3.5 group-hover:text-accent" />
                <span>info@alhamdacademy.net</span>
              </a>
            </div>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-primary-foreground mb-4 text-sm">
              <BookOpen className="w-4 h-4 text-accent" />
              {t("Our Courses", "دوراتنا")}
            </h3>
            <div className="space-y-2.5">
              {courseLinks.map((l) => (
                <Link 
                  key={l.en} 
                  to={l.href} 
                  className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200"
                >
                  <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                  {t(l.en, l.ar)}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-primary-foreground mb-4 text-sm">
              <Star className="w-4 h-4 text-accent" />
              {t("Quick Links", "روابط سريعة")}
            </h3>
            <div className="space-y-2.5">
              {quickLinks.map((l) => (
                <Link 
                  key={l.en} 
                  to={l.href} 
                  className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200"
                >
                  <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                  {t(l.en, l.ar)}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Column */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-primary-foreground mb-4 text-sm">
              <GraduationCap className="w-4 h-4 text-accent" />
              {t("Get Started", "ابدأ الآن")}
            </h3>
            <p className="text-sm text-primary-foreground/50 leading-relaxed mb-4">
              {t(
                "Book your free trial class today. No commitment required.",
                "احجز حصتك التجريبية المجانية اليوم. بدون التزام."
              )}
            </p>
            <a
              href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/80 text-accent-foreground font-semibold text-sm hover:bg-accent transition-colors"
            >
              <WhatsAppIcon />
              {t("Book Free Trial", "احجز تجربة مجانية")}
            </a>

            <div className="mt-5 p-3.5 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <div className="flex items-center gap-2 mb-1.5">
                <span>🇪🇬</span>
                <span className="text-xs font-bold text-primary-foreground">{t("Native Teachers · Al-Azhar Graduates", "معلمون أصليون · خريجو الأزهر")}</span>
              </div>
              <p className="text-[11px] text-primary-foreground/40 leading-relaxed">
                {t(
                  "All teachers are certified native Arabic speakers from Egypt, Al-Azhar graduates, with 7+ years experience.",
                  "جميع معلمينا معتمدون من مصر، خريجو الأزهر الشريف، بخبرة أكثر من 7 سنوات."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/8 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Alhamd Academy. {t("All rights reserved.", "جميع الحقوق محفوظة.")}
          </p>
          <div className="flex items-center gap-3 text-xs text-primary-foreground/30">
            <Link to="/free-trial" className="hover:text-accent transition-colors">{t("Free Trial", "تجربة مجانية")}</Link>
            <span className="text-primary-foreground/15">|</span>
            <Link to="/#pricing" className="hover:text-accent transition-colors">{t("Pricing", "الأسعار")}</Link>
            <span className="text-primary-foreground/15">|</span>
            <Link to="/#contact" className="hover:text-accent transition-colors">{t("Contact", "تواصل")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
