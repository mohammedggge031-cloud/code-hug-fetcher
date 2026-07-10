import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, GraduationCap, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import logo from "@/assets/logo-new.webp";

const Footer = () => {
  const { t } = useLanguage();

  const courseLinks = [
    { en: "The Best Quran Course at Alhamd Academy", ar: "أفضل دورة قرآن في أكاديمية الحمد", href: "/courses/quran-course" },
    { en: "The Best Tajweed Course at Alhamd Academy", ar: "أفضل دورة تجويد في أكاديمية الحمد", href: "/courses/tajweed-course" },
    { en: "The Best Arabic Course at Alhamd Academy", ar: "أفضل دورة عربية في أكاديمية الحمد", href: "/courses/arabic-course" },
    { en: "The Best Islamic Studies at Alhamd Academy", ar: "أفضل دراسات إسلامية في أكاديمية الحمد", href: "/courses/islamic-studies" },
    { en: "All-in-One Course", ar: "الدورة الشاملة", href: "/courses/all-in-one-course" },
  ];

  const quickLinks = [
    { en: "Home", ar: "الرئيسية", href: "/" },
    { en: "Pricing", ar: "الأسعار", href: "/#pricing" },
    { en: "About Us", ar: "من نحن", href: "/#about" },
    { en: "Free Trial", ar: "حصة تجريبية مجانية", href: "/free-trial" },
    { en: "Blog", ar: "المدونة", href: "/blog" },
    { en: "Videos", ar: "فيديوهات", href: "/videos" },
  ];

  const socialLinks = [
    { icon: WhatsAppIcon, href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy", label: "WhatsApp" },
    { icon: FacebookIcon, href: "https://www.facebook.com/share/1BFyf4qMm8/", label: "Facebook" },
    { icon: InstagramIcon, href: "https://www.instagram.com/alhamdacademy_official", label: "Instagram" },
    { icon: Mail, href: "mailto:info@alhamdacademy.net", label: "Email" },
    { icon: YoutubeIcon, href: "https://www.youtube.com/@alhamdacademy_official", label: "YouTube" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@alhamdacademy_official", label: "TikTok" },
  ];

  return (
    <footer className="relative bg-primary overflow-hidden" role="contentinfo" aria-label="Alhamd Academy Footer">
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
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/8 text-primary-foreground/50 transition-colors duration-200 hover:bg-primary-foreground/15 hover:text-accent" 
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
                  className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent hover:translate-x-1 rtl:hover:-translate-x-1 transition-[color,transform] duration-200"
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
                  className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent hover:translate-x-1 rtl:hover:-translate-x-1 transition-[color,transform] duration-200"
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
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/80 text-accent-foreground font-semibold text-sm hover:bg-accent transition-colors"
            >
              <WhatsAppIcon />
              {t("Book Free Trial", "احجز تجربة مجانية")}
            </Link>

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
        <div className="border-t border-primary-foreground/8 mt-12 pt-6 pb-16 md:pb-0 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Alhamd Academy. {t("All rights reserved.", "جميع الحقوق محفوظة.")}
          </p>
          <div className="flex items-center gap-3 text-xs text-primary-foreground/30 flex-wrap justify-center">
            <Link to="/free-trial" className="hover:text-accent transition-colors">{t("Free Trial", "تجربة مجانية")}</Link>
            <span className="text-primary-foreground/15">|</span>
            <Link to="/#pricing" className="hover:text-accent transition-colors">{t("Pricing", "الأسعار")}</Link>
            <span className="text-primary-foreground/15">|</span>
            <Link to="/#contact" className="hover:text-accent transition-colors">{t("Contact", "تواصل")}</Link>
            <span className="text-primary-foreground/15">|</span>
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">{t("Privacy Policy", "سياسة الخصوصية")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
