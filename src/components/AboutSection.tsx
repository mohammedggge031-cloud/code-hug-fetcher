import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import logo from "@/assets/logo-new.webp";
import EgyptFlag from "@/components/EgyptFlag";
import { scrollToContactForm } from "@/lib/scrollToForm";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";

const AboutSection = () => {
  const { t } = useLanguage();
  const { slideInLeft, slideInRight, fadeIn } = useMobileSafeMotion();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-section" aria-label="About Alhamd Academy">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <motion.div {...slideInLeft()} className="flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl bg-card flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Alhamd Academy - Professional Online Quran, Arabic and Islamic Studies Academy" width={256} height={256} className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 object-contain" loading="lazy" decoding="async" />
              </div>


            </div>
          </motion.div>

          <motion.div {...slideInRight()}>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {t("About Us", "من نحن")}
            </span>
            <motion.h2 {...fadeIn(0.1)} className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              {t("Alhamd Academy", "أكاديمية الحمد")}
            </motion.h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                "Alhamd Academy is dedicated to providing high-quality online Quran, Arabic, and Islamic studies education. Our certified teachers are native Arabic speakers from Egypt, ensuring authentic pronunciation, deep understanding of Tajweed rules, and genuine connection with the language of the Quran.",
                "أكاديمية الحمد مكرسة لتقديم تعليم عالي الجودة عبر الإنترنت في القرآن والعربية والدراسات الإسلامية. معلمونا المعتمدون هم متحدثون أصليون للغة العربية من مصر، مما يضمن النطق الأصيل والفهم العميق لأحكام التجويد والارتباط الحقيقي بلغة القرآن الكريم."
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t(
                "Whether you're a complete beginner or looking to perfect your recitation, our experienced teachers will guide you every step of the way with patience and dedication through personalized one-on-one sessions.",
                "سواء كنت مبتدئًا تمامًا أو تسعى لإتقان تلاوتك، سيرشدك معلمونا ذوو الخبرة في كل خطوة بصبر وإخلاص من خلال جلسات فردية مخصصة."
              )}
            </p>
            <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <EgyptFlag className="w-6 h-4 rounded-sm" />
              </div>
              <p className="text-sm font-medium text-foreground">
                {t(
                  "All our teachers are graduates of Al-Azhar University — the world's most prestigious Islamic institution — with 7+ years of experience and certified Ijazah with connected Sanad.",
                  "جميع معلمينا خريجو جامعة الأزهر الشريف — أعرق مؤسسة إسلامية في العالم — مع خبرة تزيد عن 7 سنوات وإجازات معتمدة بسند متصل."
                )}
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToContactForm(); }}
              className="inline-flex px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {t("Get Started Today", "ابدأ اليوم")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
