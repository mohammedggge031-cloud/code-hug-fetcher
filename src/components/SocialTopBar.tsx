import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Sparkles } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";

const SocialTopBar = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-10">
        {/* Contact info */}
        <div className="flex items-center gap-4 text-xs">
          <a href="mailto:info@alhamdacademy.net" className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>info@alhamdacademy.net</span>
          </a>
          <a href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>+20 127 113 4828</span>
          </a>
        </div>

        {/* Free trial badge + Social icons */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-[11px] font-semibold hover:bg-accent/30 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            {t("Free Trial", "تجربة مجانية")}
          </a>
          <div className="flex items-center gap-1">
            {[
              { icon: <WhatsAppIcon />, href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B", label: "WhatsApp" },
              { icon: <FacebookIcon />, href: "https://www.facebook.com/share/1BFyf4qMm8/", label: "Facebook" },
              { icon: <InstagramIcon />, href: "https://www.instagram.com/alhamdacademy_official", label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialTopBar;
