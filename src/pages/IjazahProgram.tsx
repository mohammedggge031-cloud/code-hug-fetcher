import ServicePageLayout from "@/components/ServicePageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, Clock, DollarSign, CheckCircle, Star, Sparkles } from "lucide-react";
import { scrollToContactForm } from "@/lib/scrollToForm";

const RELATED = [
  { titleEn: "Tajweed Course Online", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Quran Memorization (Hifz)", titleAr: "حفظ القرآن", href: "/quran-memorization-hifz" },
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Female Quran Teacher", titleAr: "معلمة قرآن", href: "/female-quran-teacher" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const IjazahPricingSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background" id="ijazah-pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            {t("Exclusive Ijazah Rate", "سعر الإجازة الحصري")}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            {t("Ijazah Program Pricing", "أسعار برنامج الإجازة")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "A once-in-a-lifetime investment in your Quranic journey — earn your Ijazah with a connected Sanad to Prophet Muhammad ﷺ",
              "استثمار العمر في رحلتك القرآنية — احصل على إجازتك بسند متصل إلى النبي محمد ﷺ"
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-accent/30 bg-card shadow-xl">
            <div className="bg-gradient-to-r from-accent to-accent/80 px-6 py-3 text-center">
              <div className="flex items-center justify-center gap-2 text-accent-foreground">
                <Award className="w-5 h-5" />
                <span className="font-heading font-bold text-lg">
                  {t("Ijazah Certification", "شهادة الإجازة")}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {t("Unbeatable Value", "قيمة لا تُضاهى")}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("One-on-one sessions with a certified sheikh", "جلسات فردية مع شيخ معتمد")}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  {t("Most affordable Ijazah program online", "أقل سعر لبرنامج إجازة أونلاين")}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  t("Certified sheikh with connected Sanad", "شيخ معتمد بسند متصل"),
                  t("One-on-one private sessions", "جلسات خاصة فردية"),
                  t("Flexible scheduling — learn at your pace", "مواعيد مرنة — تعلم بالسرعة التي تناسبك"),
                  t("Ijazah in Hafs 'an 'Asim (other Qiraat available)", "إجازة في حفص عن عاصم (قراءات أخرى متاحة)"),
                  t("Full Sanad documentation with certificate", "توثيق السند الكامل مع الشهادة"),
                  t("Pre-Ijazah Tajweed preparation included", "تحضير التجويد قبل الإجازة مشمول"),
                  t("Online from anywhere in the world", "أونلاين من أي مكان في العالم"),
                  t("Post-Ijazah mentorship & guidance", "إرشاد ومتابعة بعد الإجازة"),
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact-section"
                onClick={(e) => {
                  e.preventDefault();
                  const contactEl = document.getElementById("contact-section") || document.querySelector("[data-contact]");
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      const nameInput = document.getElementById("fullName") as HTMLInputElement | null;
                      nameInput?.focus({ preventScroll: true });
                    }, 600);
                  } else {
                    window.location.href = "/#contact";
                  }
                }}
                className="block w-full text-center px-6 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 transition-colors shadow-lg"
              >
                {t("Start Your Ijazah Journey — Book Free Trial", "ابدأ رحلة الإجازة — احجز حصة مجانية")}
              </a>

              <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <Clock className="w-3 h-3" />
                {t("Free assessment session to evaluate your readiness", "حصة تقييم مجانية لتحديد جاهزيتك")}
              </p>
            </div>

            <div className="bg-muted/50 px-6 py-4 border-t flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                <span className="font-semibold text-foreground">5.0</span>
                <span>{t("rating", "تقييم")}</span>
              </div>
              <span className="text-border">|</span>
              <span>{t("50+ Ijazah granted", "50+ إجازة ممنوحة")}</span>
              <span className="text-border">|</span>
              <span>{t("8+ countries", "8+ دول")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const IjazahProgram = () => (
  <>
    <ServicePageLayout
      seoTitle="Quran Ijazah Online — Get Ijazah Certification | Alhamd Academy"
      seoDescription="Get Quran Ijazah online with certified sheikhs and connected Sanad to Prophet Muhammad ﷺ. Ijazah course online in Hafs an Asim. Online Ijazah program with Sanad. Free assessment."
      seoKeywords="quran ijazah online, ijazah course online, quran certification program, ijazah in quran recitation, get ijazah online, ijazah in quran with sanad, online ijazah program, ijazah certification, ijazah hafs, qiraat course online, quran sanad, connected chain quran, affordable ijazah online"
      canonical="https://alhamdacademy.net/ijazah-program"
      heroTitleEn="Quran Ijazah Online — Get Your Ijazah Certification"
      heroTitleAr="الإجازة القرآنية أونلاين — احصل على شهادة الإجازة"
      heroSubtitleEn="Get Ijazah Online with Connected Sanad to Prophet Muhammad ﷺ — Most Affordable Program"
      heroSubtitleAr="احصل على إجازة أونلاين بسند متصل إلى النبي محمد ﷺ — أقل الأسعار"
      heroDescEn="The Quran Ijazah is the highest certification in Quran recitation — a license that connects you through an unbroken chain of scholars back to Prophet Muhammad ﷺ. At Alhamd Academy, our Ijazah course online guides you through the entire process at the most competitive rates available."
      heroDescAr="الإجازة القرآنية هي أعلى شهادة في تلاوة القرآن — رخصة تصلك بسلسلة غير منقطعة من العلماء وصولاً إلى النبي محمد ﷺ. في أكاديمية الحمد، برنامج الإجازة أونلاين بأسعار تنافسية لا تُقارن."
      aboutTitleEn="What Is a Quran Ijazah & How to Get Ijazah Online"
      aboutTitleAr="ما هي إجازة القرآن وكيف تحصل على الإجازة أونلاين"
      aboutContentEn={[
        "A Quran Ijazah (إجازة) is a license that certifies you have mastered the recitation of the Quran according to a specific reading (Qira'ah) and that you have the permission to teach and transmit the Quran. It comes with a Sanad — an unbroken chain of transmission going back to the Prophet Muhammad ﷺ. Getting Ijazah online is now possible with qualified certified sheikhs.",
        "The Ijazah system is one of the most rigorous Quran certification programs in the world, predating modern academic degrees by centuries. It ensures the Quran has been preserved and transmitted accurately. Our online Ijazah program maintains this same standard of excellence.",
        "At Alhamd Academy, our Ijazah course online is led by senior sheikhs who hold multiple Ijazah in different Qiraat. They have years of experience helping students get Ijazah online and have successfully granted Ijazah to students worldwide.",
        "We offer Quran Ijazah online primarily in Hafs an Asim, the most widely used reading. For advanced students seeking Ijazah in Quran with Sanad in other readings, we also offer Ijazah in other Qiraat upon request.",
        "The Ijazah process involves reading the entire Quran to a certified sheikh who evaluates your recitation. Once satisfied that your recitation meets the required standard, the sheikh grants you the Ijazah in Quran recitation with his complete Sanad.",
      ]}
      aboutContentAr={[
        "إجازة القرآن هي رخصة تشهد بأنك أتقنت تلاوة القرآن وفق قراءة محددة ولديك الإذن بتعليم القرآن. تأتي مع سند متصل إلى النبي محمد ﷺ. الحصول على الإجازة أونلاين أصبح ممكناً مع شيوخ معتمدين.",
        "نظام الإجازة من أقدم وأدق برامج شهادات القرآن في العالم. برنامجنا أونلاين يحافظ على نفس معيار التميز.",
        "في أكاديمية الحمد، دورة الإجازة أونلاين يقودها شيوخ كبار يحملون إجازات متعددة في قراءات مختلفة.",
        "نقدم إجازة القرآن أونلاين أساساً في حفص عن عاصم. للطلاب المتقدمين، نقدم إجازة في قراءات أخرى.",
        "عملية الإجازة تتضمن قراءة القرآن كاملاً على شيخ معتمد يقيّم تلاوتك ويمنحك الإجازة بسنده الكامل.",
      ]}
      methodTitleEn="How to Get Ijazah Online — Our Preparation Process"
      methodTitleAr="كيف تحصل على الإجازة أونلاين — عملية التحضير"
      methodContentEn={[
        "Our online Ijazah program preparation is thorough and methodical. We first assess your current Tajweed level and Quran memorization to determine your readiness for the Ijazah course online.",
        "The preparation phase of our Ijazah course online focuses on perfecting your Tajweed to the Ijazah standard. Every letter, every Tajweed rule, every nuance must be applied perfectly before you can get Ijazah online.",
        "Once your recitation reaches the required standard, you begin the Quran Ijazah sessions with the certifying sheikh. You read the entire Quran to the sheikh, who verifies the accuracy of your recitation.",
        "Upon successful completion of our online Ijazah program, you receive your Ijazah certificate with the complete Sanad, connecting you through an unbroken line of scholars back to the Prophet Muhammad ﷺ — your authentic Ijazah in Quran with Sanad.",
      ]}
      methodContentAr={[
        "تحضيرنا لبرنامج الإجازة أونلاين شامل ومنهجي. نقيّم أولاً مستواك في التجويد والحفظ لتحديد جاهزيتك.",
        "مرحلة التحضير في دورة الإجازة أونلاين تركز على إتقان التجويد بمعيار الإجازة.",
        "عندما تصل تلاوتك للمعيار المطلوب، تبدأ جلسات إجازة القرآن مع الشيخ المُجيز.",
        "عند الإتمام الناجح لبرنامج الإجازة أونلاين، تحصل على شهادة الإجازة مع السند الكامل المتصل إلى النبي محمد ﷺ.",
      ]}
      levels={[
        {
          titleEn: "Pre-Ijazah Preparation — Tajweed Perfection",
          titleAr: "التحضير للإجازة — إتقان التجويد",
          descEn: "Intensive Tajweed refinement and recitation perfection required before starting your Quran Ijazah online sessions.",
          descAr: "صقل مكثف للتجويد وإتقان التلاوة المطلوب قبل بدء جلسات الإجازة أونلاين.",
          topicsEn: ["Complete Tajweed rules mastery", "Makharij perfection", "Recitation accuracy assessment", "Common mistake elimination", "Reading speed optimization"],
          topicsAr: ["إتقان جميع أحكام التجويد", "إتقان المخارج", "تقييم دقة التلاوة", "إزالة الأخطاء الشائعة", "تحسين سرعة القراءة"],
        },
        {
          titleEn: "Ijazah Reading Sessions — Quran Certification",
          titleAr: "جلسات القراءة للإجازة — شهادة القرآن",
          descEn: "Reading the entire Quran to the certifying sheikh in your online Ijazah program for evaluation and Quran certification.",
          descAr: "قراءة القرآن كاملاً على الشيخ المُجيز في برنامج الإجازة أونلاين للتقييم والشهادة.",
          topicsEn: ["Full Quran recitation to sheikh", "Real-time Tajweed correction", "Consistency evaluation", "Fluency assessment", "Endurance building"],
          topicsAr: ["تلاوة القرآن كاملاً على الشيخ", "تصحيح التجويد آنياً", "تقييم الاتساق", "تقييم الطلاقة", "بناء القدرة على التحمل"],
        },
        {
          titleEn: "Ijazah Certification & Beyond",
          titleAr: "شهادة الإجازة وما بعدها",
          descEn: "Receiving your Quran Ijazah online with complete Sanad and continuing with advanced Qiraat studies.",
          descAr: "الحصول على إجازة القرآن أونلاين بالسند الكامل والاستمرار في دراسة القراءات.",
          topicsEn: ["Ijazah certificate with full Sanad", "Multiple Qiraat exploration", "Teaching methodology training", "Ongoing mentorship", "Community of certified reciters"],
          topicsAr: ["شهادة الإجازة مع السند الكامل", "استكشاف القراءات المتعددة", "التدريب على منهجية التدريس", "الإرشاد المستمر", "مجتمع القراء المعتمدين"],
        },
      ]}
      outcomesEn={[
        "Earn an authentic Quran Ijazah online with complete Sanad",
        "Master every Tajweed rule to the highest standard for Ijazah certification",
        "Be authorized to teach and transmit the Quran to others",
        "Join an unbroken chain of Quran transmission going back to the Prophet ﷺ",
        "Gain confidence in leading prayers and teaching Quran",
        "Option to pursue Ijazah in multiple Qiraat",
      ]}
      outcomesAr={[
        "الحصول على إجازة قرآن أونلاين أصيلة مع سند كامل",
        "إتقان كل أحكام التجويد بأعلى معيار لشهادة الإجازة",
        "الإذن بتعليم القرآن ونقله للآخرين",
        "الانضمام لسلسلة غير منقطعة من نقل القرآن تعود إلى النبي ﷺ",
        "الثقة في إمامة الصلاة وتدريس القرآن",
        "خيار السعي للإجازة في قراءات متعددة",
      ]}
      featuresEn={[
        "Certified senior sheikhs with multiple Ijazah and connected Sanad",
        "The most affordable online Ijazah program — unmatched value",
        "One-on-one sessions with the certifying sheikh throughout your Ijazah course",
        "Quran Ijazah online available in Hafs an Asim and other Qiraat",
        "Complete Sanad documentation — authentic Ijazah in Quran with Sanad",
        "Flexible scheduling for the entire Ijazah journey",
        "Get Ijazah online from anywhere in the world",
        "Post-Ijazah mentorship and advanced Qiraat options",
      ]}
      featuresAr={[
        "شيوخ كبار معتمدون بإجازات متعددة وسند متصل",
        "أقل سعر لبرنامج إجازة أونلاين — قيمة لا تُضاهى",
        "جلسات فردية مع الشيخ المُجيز طوال دورة الإجازة",
        "إجازة القرآن أونلاين متاحة في حفص عن عاصم وقراءات أخرى",
        "توثيق السند الكامل — إجازة أصيلة في القرآن بالسند",
        "مواعيد مرنة طوال رحلة الإجازة",
        "احصل على الإجازة أونلاين من أي مكان في العالم",
        "إرشاد ما بعد الإجازة وخيارات القراءات المتقدمة",
      ]}
      faqs={[
        { questionEn: "How much does the online Ijazah program cost?", questionAr: "كم يكلف برنامج الإجازة أونلاين؟", answerEn: "Our Ijazah course online is one of the most affordable ways to get Ijazah online. We offer competitive per-hour rates for one-on-one sessions with a certified sheikh. Contact us or check our pricing page for current plans.", answerAr: "دورة الإجازة أونلاين من أقل الطرق تكلفة للحصول على الإجازة أونلاين. نقدم أسعاراً تنافسية لجلسات فردية مع شيخ معتمد. تواصل معنا أو راجع صفحة الأسعار." },
        { questionEn: "Can I really get Ijazah online?", questionAr: "هل يمكنني فعلاً الحصول على الإجازة أونلاين؟", answerEn: "Yes! Getting Ijazah online is fully recognized in the Islamic scholarly community. Our online Ijazah program is conducted via video conferencing with certified sheikhs. The authenticity of a Quran Ijazah lies in the sheikh's qualification and the connected Sanad, not the medium of instruction.", answerAr: "نعم! الحصول على الإجازة أونلاين معترف به تماماً. برنامجنا يُجرى عبر مكالمات فيديو مع شيوخ معتمدين. أصالة الإجازة في مؤهلات الشيخ والسند المتصل." },
        { questionEn: "How to get Ijazah in Quran with Sanad?", questionAr: "كيف أحصل على إجازة في القرآن بالسند؟", answerEn: "To get Ijazah in Quran with Sanad, you need to read the entire Quran to a certified sheikh who holds Ijazah with connected Sanad. At Alhamd Academy, our Ijazah course online includes preparation, reading sessions, and upon completion, you receive your Ijazah certificate with the complete Sanad chain back to Prophet Muhammad ﷺ.", answerAr: "للحصول على إجازة في القرآن بالسند، تحتاج لقراءة القرآن كاملاً على شيخ معتمد يحمل إجازة بسند متصل. في أكاديمية الحمد، تحصل على الإجازة مع سلسلة السند الكاملة." },
        { questionEn: "What are the prerequisites for the Ijazah course online?", questionAr: "ما المتطلبات المسبقة لدورة الإجازة أونلاين؟", answerEn: "You need either complete Quran memorization (for Ijazah from memory) or the ability to read the Quran fluently (for Ijazah from reading). Strong Tajweed knowledge is essential for our Quran certification program. We assess your readiness before enrollment.", answerAr: "تحتاج إما حفظ القرآن كاملاً (لإجازة الحفظ) أو القدرة على قراءة القرآن بطلاقة (لإجازة التلاوة). معرفة التجويد القوية ضرورية." },
        { questionEn: "What Qiraat do you offer Quran Ijazah online in?", questionAr: "في أي قراءات تقدمون إجازة القرآن أونلاين؟", answerEn: "Our primary offering is Quran Ijazah online in Hafs an Asim, the most widely used reading globally. For advanced students, we arrange Ijazah in other Qiraat including Warsh, Qalun, and others upon request.", answerAr: "عرضنا الأساسي هو إجازة القرآن أونلاين في حفص عن عاصم. للطلاب المتقدمين، نرتب الإجازة في قراءات أخرى مثل ورش وقالون." },
        { questionEn: "Is the online Ijazah certification recognized worldwide?", questionAr: "هل شهادة الإجازة أونلاين معترف بها عالمياً؟", answerEn: "Yes, online Ijazah certification is recognized worldwide in the Islamic scholarly community. The authenticity of an Ijazah lies in the qualification of the granting sheikh and the connected Sanad. Our sheikhs are internationally recognized scholars.", answerAr: "نعم، شهادة الإجازة أونلاين معترف بها عالمياً في المجتمع العلمي الإسلامي. شيوخنا علماء معترف بهم دولياً." },
      ]}
      testimonials={[
        { name: "Abdullah S.", country: "United States", textEn: "Alhamdulillah, I received my Quran Ijazah online in Hafs an Asim through Alhamd Academy's Ijazah course. The sheikh was thorough, patient, and genuinely invested in my success. The Sanad is authentic and connected. The value is truly unbeatable for an online Ijazah program.", textAr: "الحمد لله، حصلت على إجازة القرآن أونلاين في حفص عن عاصم من خلال دورة الإجازة في أكاديمية الحمد. القيمة لا تُضاهى.", rating: 5 },
        { name: "Maryam K.", country: "United Kingdom", textEn: "Getting my Ijazah online was something I never thought possible. Alhamd Academy's online Ijazah program made it happen. The preparation was rigorous and the Ijazah certification process was authentic — a true Ijazah in Quran with Sanad.", textAr: "الحصول على إجازتي أونلاين شيء لم أكن أظنه ممكناً. برنامج الإجازة أونلاين في أكاديمية الحمد جعله حقيقة.", rating: 5 },
      ]}
      relatedPages={RELATED}
      midCtaTitleEn="Earn Your Ijazah — Book a Free Readiness Assessment"
      midCtaTitleAr="احصل على إجازتك — احجز تقييم جاهزية مجاني"
      midCtaDescEn="Free assessment with certified sheikh • Most affordable Ijazah • Connected Sanad"
      midCtaDescAr="تقييم مجاني مع شيخ معتمد • أقل سعر للإجازة • سند متصل"
      levelsTitleEn="Your Path to Ijazah Certification"
      levelsTitleAr="مسارك نحو شهادة الإجازة"
      outcomesTitleEn="What Earning Your Ijazah Means"
      outcomesTitleAr="ماذا يعني الحصول على إجازتك"
      whyChooseTitleEn="Why Get Your Ijazah with Alhamd Academy?"
      whyChooseTitleAr="لماذا تحصل على إجازتك مع أكاديمية الحمد؟"
      testimonialsTitleEn="Ijazah Graduates Share Their Journey"
      testimonialsTitleAr="خريجو الإجازة يشاركون رحلتهم"
      faqTitleEn="Ijazah Program — Detailed Answers"
      faqTitleAr="برنامج الإجازة — إجابات تفصيلية"
      ctaTitleEn="Your Ijazah Awaits — Take the First Step"
      ctaTitleAr="إجازتك في انتظارك — اتخذ الخطوة الأولى"
      ctaDescEn="Join the legacy of Quran preservation. Get your Ijazah with connected Sanad at the most competitive rates."
      ctaDescAr="انضم لإرث حفظ القرآن. احصل على إجازتك بسند متصل بأسعار تنافسية."
      ctaButtonEn="Begin Your Ijazah Journey"
      ctaButtonAr="ابدأ رحلة الإجازة"
      relatedTitleEn="Prepare for Your Ijazah with These Courses"
      relatedTitleAr="استعد لإجازتك مع هذه الدورات"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Quran Ijazah Online — Ijazah Course with Connected Sanad",
        description: "Get Quran Ijazah online with connected Sanad to Prophet Muhammad ﷺ. Affordable Ijazah course with certified sheikhs.",
        provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
        educationalLevel: "Advanced",
        inLanguage: ["en", "ar"],
        educationalCredentialAwarded: "Ijazah Certification with Connected Sanad",
        
      }}
      extraSection={<IjazahPricingSection />}
    />
  </>
);

export default IjazahProgram;
