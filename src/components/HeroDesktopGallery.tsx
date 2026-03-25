import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import EgyptFlag from "@/components/EgyptFlag";
import heroStudent1 from "@/assets/hero-student1.webp";
import heroStudent2 from "@/assets/hero-student2.webp";
import heroStudent3 from "@/assets/hero-student3.webp";
import heroStudent4 from "@/assets/hero-student4.webp";
import heroStudent5 from "@/assets/hero-student5.webp";

const heroImages = [heroStudent1, heroStudent2, heroStudent3, heroStudent4, heroStudent5];
import logoImg from "@/assets/logo.webp";
const logoImage = logoImg;

const HeroDesktopGallery = () => {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex justify-center animate-fade-in motion-delay-300">
      <div className="relative">
        <div className="absolute -inset-6 rounded-3xl bg-accent/20 blur-3xl" />
        <div className="relative w-[380px] h-[460px] rounded-2xl shadow-elevated overflow-hidden border-2 border-accent/20">
          <img
            key={currentImage}
            src={heroImages[currentImage]}
            alt={`Student learning Quran online with Alhamd Academy - ${currentImage + 1}`}
            className="absolute inset-0 w-full h-full object-cover animate-fade-in"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
        </div>

        {/* Floating logo */}
        <div className="absolute -bottom-6 -start-6 w-24 h-24 rounded-2xl bg-white shadow-elevated border border-accent/20 flex items-center justify-center p-2 z-20">
          <img
            src={logoImage}
            alt="Alhamd Academy Logo"
            width={80}
            height={80}
            className="w-full h-full object-contain rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Free Trial badge */}
        <div className="absolute -top-4 -end-4 px-4 py-2 rounded-xl bg-accent text-accent-foreground shadow-elevated z-20">
          <div className="text-xs font-bold">{t("Free Trial", "تجربة مجانية")}</div>
          <div className="text-[10px] opacity-80">{t("No commitment", "بدون التزام")}</div>
        </div>

        {/* Native teachers badge */}
        <div className="absolute top-1/2 -start-14 px-5 py-3 rounded-2xl bg-white/95 shadow-elevated z-20 backdrop-blur-sm border border-accent/20">
          <div className="flex items-center gap-3">
            <EgyptFlag className="w-8 h-6 rounded-sm shadow-sm" />
            <div>
              <div className="text-sm font-bold text-foreground">{t("Al-Azhar Graduates", "خريجو الأزهر")}</div>
              <div className="text-xs text-muted-foreground">{t("Certified Teachers", "معلمون معتمدون")}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentImage(idx)} aria-label={`View student image ${idx + 1}`} className="relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300">
              <span className={`block rounded-full transition-all duration-300 ${idx === currentImage ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/50"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroDesktopGallery;
