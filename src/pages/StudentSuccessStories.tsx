import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, Users, Award, BookOpen, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { Link } from "react-router-dom";

const stories = [
  {
    name: "Naveed S.",
    country: "United States",
    courseEn: "Quran Recitation",
    courseAr: "تلاوة القرآن",
    textEn: "My daughter couldn't read Arabic letters when we started. The teacher used the Noor Al-Bayan method and was incredibly patient with her. Now she reads Quran on her own and actually looks forward to her classes. The one-on-one attention really makes a difference — she wouldn't have gotten this in a group setting. We tried other academies before, but the quality here is genuinely better.",
    textAr: "ابنتي لم تكن تقرأ الحروف العربية عندما بدأنا. المعلمة استخدمت طريقة نور البيان وكانت صبورة جداً معها. الآن تقرأ القرآن بمفردها وتتطلع لحصصها. الاهتمام الفردي يصنع فرقاً حقيقياً.",
    rating: 5,
  },
  {
    name: "Abubakar M.",
    country: "United Kingdom",
    courseEn: "Arabic Language & Quran",
    courseAr: "اللغة العربية والقرآن",
    textEn: "As a busy professional, I needed flexible scheduling. I take classes early morning before work, and my teacher adapted the pace to suit me. I've improved my Arabic reading significantly and started understanding more of what I recite. The one-on-one format is key — you can ask questions freely without feeling rushed.",
    textAr: "كمحترف مشغول، كنت أحتاج مرونة في المواعيد. أحضر دروسي صباحاً قبل العمل والمعلم كيّف الوتيرة لتناسبني. تحسّنت قراءتي للعربية بشكل ملحوظ وبدأت أفهم أكثر مما أتلو.",
    rating: 5,
  },
  {
    name: "Zainab K.",
    country: "Canada",
    courseEn: "Hifz Program",
    courseAr: "برنامج الحفظ",
    textEn: "The structured memorization program really helped me stay consistent — daily revision schedule and regular assessments kept me accountable. My teacher corrected my Tajweed alongside the memorization, which I didn't expect. As an adult learner, I appreciated the encouragement and patience. I'm still on my journey, but the progress I've made gives me confidence to continue.",
    textAr: "برنامج الحفظ المنظم ساعدني حقاً على الاستمرار — جدول مراجعة يومي وتقييمات منتظمة أبقتني ملتزمة. المعلمة صححت تجويدي بجانب الحفظ. كمتعلمة بالغة، قدّرت التشجيع والصبر.",
    rating: 5,
  },
  {
    name: "Bilal H.",
    country: "Australia",
    courseEn: "Kids Quran & Islamic Studies",
    courseAr: "القرآن للأطفال والدراسات الإسلامية",
    textEn: "We enrolled our children and the teachers have a real gift for connecting with kids. My youngest was shy at first but quickly became excited for every class. They mix Quran learning with stories from the Seerah which keeps the kids interested. The family discount helped us enroll more than one child.",
    textAr: "سجّلنا أطفالنا والمعلمون لديهم موهبة حقيقية في التواصل مع الأطفال. ابني الأصغر كان خجولاً في البداية لكن سرعان ما أصبح متحمساً لكل حصة. يمزجون تعلم القرآن مع قصص من السيرة.",
    rating: 5,
  },
  {
    name: "Sumaya T.",
    country: "Saudi Arabia",
    courseEn: "Tajweed for Women",
    courseAr: "التجويد للنساء",
    textEn: "Having a female teacher was important to me, and the academy matched me with a wonderful Ustadha. I was self-conscious about my level but she made me feel comfortable from the first class. My recitation has improved noticeably and I feel more confident in my daily prayers. The booking and follow-up system is very professional.",
    textAr: "كان وجود معلمة أنثى مهماً لي، والأكاديمية وفّرت لي أستاذة رائعة. كنت خجلة من مستواي لكنها جعلتني مرتاحة من أول حصة. تحسّنت تلاوتي بشكل ملحوظ وأشعر بثقة أكبر في صلاتي.",
    rating: 5,
  },
  {
    name: "Ahmed R.",
    country: "Germany",
    courseEn: "Noor Al-Bayan & Quran",
    courseAr: "نور البيان والقرآن",
    textEn: "Living in Germany, it was hard to find quality Quran education nearby. The Egyptian teachers bring warmth and expertise that's hard to find elsewhere. My son's teacher uses creative techniques — songs, stories, and exercises — that keep him focused. We've now added Islamic Studies to his schedule.",
    textAr: "نعيش في ألمانيا وكان صعباً إيجاد تعليم قرآن جيد قريب. المعلمون المصريون يجلبون دفئاً وخبرة. معلم ابني يستخدم تقنيات إبداعية تبقيه مركزاً. أضفنا الآن الدراسات الإسلامية لجدوله.",
    rating: 5,
  },
  {
    name: "Fatima A.",
    country: "United States",
    courseEn: "Quran & Arabic",
    courseAr: "القرآن والعربية",
    textEn: "As a university student, I needed a flexible schedule. I take classes on weekends and some evenings. My teacher helped me create a realistic plan I could stick to. I've been making steady progress in both memorization and Arabic comprehension. The progress reports keep me motivated.",
    textAr: "كطالبة جامعية، كنت أحتاج جدولاً مرناً. أحضر حصصي في عطلات نهاية الأسبوع وبعض الأمسيات. معلمتي ساعدتني في وضع خطة واقعية أستطيع الالتزام بها. تقارير التقدم تبقيني متحمسة.",
    rating: 5,
  },
  {
    name: "Omar J.",
    country: "France",
    courseEn: "Quran for Beginners",
    courseAr: "القرآن للمبتدئين",
    textEn: "I started learning Quran as a complete beginner later in life. I was worried about feeling judged, but my teacher was incredibly respectful and encouraging. He started from the very basics and built up my confidence step by step. The one-on-one format is essential — no embarrassment, just learning at your own pace.",
    textAr: "بدأت تعلم القرآن كمبتدئ تماماً في مرحلة متأخرة. كنت قلقاً من الحكم عليّ، لكن معلمي كان محترماً ومشجعاً بشكل لا يصدق. بدأ من الأساسيات وبنى ثقتي خطوة بخطوة.",
    rating: 5,
  },
];

const stats = [
  { num: "200+", labelEn: "Students Worldwide", labelAr: "طالب حول العالم", icon: Users },
  { num: "4.9★", labelEn: "Student Rating", labelAr: "تقييم الطلاب", icon: Star },
  { num: "8+", labelEn: "Countries Served", labelAr: "دولة", icon: CheckCircle },
  { num: "20+", labelEn: "Certified Teachers", labelAr: "معلم معتمد", icon: Award },
];

const StudentSuccessStories = () => {
  const { t, lang } = useLanguage();
  const { seo } = useSeoMetadata("/student-success-stories");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Student Success Stories - Alhamd Academy",
    description: "Read real success stories from Alhamd Academy students worldwide. See how our online Quran, Arabic, and Islamic studies programs have transformed lives.",
    url: "https://alhamdacademy.net/student-success-stories",
    isPartOf: { "@type": "WebSite", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
    about: { "@type": "EducationalOrganization", name: "Alhamd Academy" },
  };

  // Reviews removed from structured data — Google doesn't support review snippets on EducationalOrganization

  return (
    <div className="min-h-screen bg-background font-body">
      <SEOHead
        title="Student Success Stories | Real Results from Alhamd Academy"
        description="Read inspiring success stories from Alhamd Academy students worldwide. From complete beginners to Ijazah holders — discover how our certified teachers help students achieve their Quran learning goals."
        canonical="https://alhamdacademy.net/student-success-stories"
        keywords="quran student testimonials, online quran success stories, quran memorization results, hifz success stories, learn quran online reviews, alhamd academy reviews, quran academy testimonials"
        dynamicSeo={seo}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              {t("Student Success Stories", "قصص نجاح الطلاب")}
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-4">
              {t(
                "Real Stories from Real Students Around the World",
                "قصص حقيقية من طلاب حقيقيين حول العالم"
              )}
            </p>
            <p className="text-primary-foreground/60 text-lg max-w-3xl mx-auto">
              {t(
                "Every student's journey is unique. Read how our certified teachers have helped hundreds of students — from children learning their first Arabic letters to adults earning Ijazah certification — achieve their Quran learning goals.",
                "رحلة كل طالب فريدة. اقرأ كيف ساعد معلمونا المعتمدون مئات الطلاب — من الأطفال الذين يتعلمون حروفهم العربية الأولى إلى الكبار الذين يحصلون على الإجازة — لتحقيق أهدافهم في تعلم القرآن."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-card border border-border rounded-xl p-6"
              >
                <s.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{s.num}</div>
                <div className="text-sm text-muted-foreground">{t(s.labelEn, s.labelAr)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            {t("Hear From Our Students", "اسمع من طلابنا")}
          </h2>
          <div className="space-y-8">
            {stories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 shrink-0">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: story.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="font-bold text-foreground text-lg">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.country}</p>
                    <div className="mt-2">
                      <div className="text-xs font-semibold text-accent">{t(story.courseEn, story.courseAr)}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Quote className="w-8 h-8 text-accent/30 mb-2" />
                    <p className="text-muted-foreground leading-relaxed italic">
                      {t(story.textEn, story.textAr)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6">
            {t("Your Success Story Starts Here", "قصة نجاحك تبدأ هنا")}
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            {t(
              "Join hundreds of students who have transformed their Quran journey with Alhamd Academy. Book your free trial class today — no commitment required.",
              "انضم لمئات الطلاب الذين حوّلوا رحلتهم مع القرآن مع أكاديمية الحمد. احجز حصتك التجريبية المجانية اليوم — بدون التزام."
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-5 rounded-lg font-bold text-xl hover:scale-105 transition-transform shadow-lg"
            >
              {t("Book Free Trial Now", "احجز حصة مجانية الآن")}
              <ArrowRight className="w-6 h-6" />
            </a>
            <Link
              to="/free-trial"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-5 rounded-lg font-bold text-lg hover:bg-primary-foreground/10 transition-colors"
            >
              {t("Learn About Free Trial", "تعرف على التجربة المجانية")}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">
            {t("Explore Our Courses", "اكتشف دوراتنا")}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { en: "Online Quran Classes", ar: "دروس القرآن", href: "/online-quran-classes" },
              { en: "Tajweed Course", ar: "دورة التجويد", href: "/tajweed-course-online" },
              { en: "Quran Memorization", ar: "حفظ القرآن", href: "/quran-memorization-hifz" },
              { en: "Arabic for Kids", ar: "العربية للأطفال", href: "/arabic-for-kids" },
              { en: "Islamic Studies", ar: "الدراسات الإسلامية", href: "/islamic-studies-online" },
              { en: "Ijazah Program", ar: "برنامج الإجازة", href: "/ijazah-program" },
              { en: "Free Trial", ar: "حصة تجريبية", href: "/free-trial" },
            ].map((p, i) => (
              <Link
                key={i}
                to={p.href}
                className="bg-card border border-border px-5 py-3 rounded-lg text-foreground hover:text-accent hover:border-accent transition-colors font-medium"
              >
                {t(p.en, p.ar)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
    </div>
  );
};

export default StudentSuccessStories;
