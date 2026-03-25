import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";
import EgyptFlag from "@/components/EgyptFlag";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-section" aria-label="About Alhamd Academy">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-primary/5 flex items-center justify-center border border-border shadow-card">
                <img src={logo} alt="Alhamd Academy - Professional Online Quran, Arabic and Islamic Studies Academy" width={256} height={256} className="w-48 md:w-64 object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-accent/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-primary/10 -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {t("About Us", "من نحن")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              {t("Alhamd Academy", "أكاديمية الحمد")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                "Alhamd Academy is dedicated to providing high-quality online Quran, Arabic, and Islamic studies education. Our certified teachers are native Arabic speakers from Egypt, ensuring authentic pronunciation, deep understanding of Tajweed rules, and genuine connection with the language of the Quran.",
                "أكاديمية الحمد مكرسة لتقديم تعليم عالي الجودة عبر الإنترنت في القرآن والعربية والدراسات الإسلامية. معلمونا المعتمدون هم متحدثون أصليون للغة العربية من مصر، مما يضمن النطق الأصيل والفهم العميق لأحكام التجويد والارتباط الحقيقي بلغة القرآن الكريم."
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t(
                "Whether you're a complete beginner or looking to perfect your recitation, our experienced teachers will guide you every step of the way with patience and dedication through personalized one-on-one sessions.",
                "سواء كنت مبتدئًا بالكامل أو تتطلع إلى إتقان تلاوتك، فإن معلمينا ذوي الخبرة سيرشدونك في كل خطوة على الطريق بصبر وتفانٍ من خلال جلسات فردية مخصصة."
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
