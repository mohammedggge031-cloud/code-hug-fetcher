import ServicePageLayout from "@/components/ServicePageLayout";
import { Heart, BookOpen, Users, Globe, Shield, Sparkles } from "lucide-react";

const LearnQuranForReverts = () => {
  return (
    <ServicePageLayout
      seoTitle="Learn Quran for Reverts & New Muslims | Alhamd Academy"
      seoDescription="Welcoming online Quran classes designed for reverts and new Muslims. Patient, certified Al-Azhar teachers guide you from the Arabic alphabet to fluent recitation. Free trial class."
      seoKeywords="quran for reverts, quran classes for new muslims, learn quran as a convert, new muslim quran lessons, revert quran classes online, quran for beginners reverts, islam for new muslims, quran teacher for reverts"
      canonical="https://alhamdacademy.net/learn-quran-for-reverts"
      heroTitleEn="Learn Quran as a New Muslim"
      heroTitleAr="تعلّم القرآن كمسلم جديد"
      heroSubtitleEn="A Warm, Judgment-Free Journey Into the Quran"
      heroSubtitleAr="رحلة دافئة وبدون أحكام إلى القرآن الكريم"
      heroDescEn="Whether you just took your Shahada or have been Muslim for years, our patient teachers meet you exactly where you are — from learning the Arabic alphabet to reading the Quran with Tajweed."
      heroDescAr="سواء نطقت الشهادة مؤخراً أو كنت مسلماً منذ سنوات، معلمونا الصبورون يقابلونك أينما كنت — من تعلم الأبجدية العربية إلى قراءة القرآن بالتجويد."
      aboutTitleEn="Why Reverts Choose Alhamd Academy"
      aboutTitleAr="لماذا يختار المسلمون الجدد أكاديمية الحمد"
      aboutContentEn={[
        "Embracing Islam is a beautiful journey, and learning the Quran is one of the most meaningful steps you can take. At Alhamd Academy, we understand the unique challenges that reverts face — from starting with zero Arabic knowledge to navigating cultural differences.",
        "Our teachers are trained specifically to work with new Muslims. They are patient, compassionate, and experienced in teaching non-Arabic speakers. There is absolutely no judgment — only encouragement and genuine care for your growth.",
        "We use the proven Noor Al-Bayan method to take you from recognizing Arabic letters to reading Quran fluently. Every lesson is personalized to your pace, goals, and schedule.",
      ]}
      aboutContentAr={[
        "اعتناق الإسلام رحلة جميلة، وتعلم القرآن من أكثر الخطوات المعنوية التي يمكنك اتخاذها. في أكاديمية الحمد، نفهم التحديات الفريدة التي يواجهها المسلمون الجدد — من البدء بدون معرفة بالعربية إلى التعامل مع الاختلافات الثقافية.",
        "معلمونا مدربون خصيصاً للعمل مع المسلمين الجدد. هم صبورون ورحيمون وذوو خبرة في تعليم غير الناطقين بالعربية. لا يوجد أي حكم مسبق — فقط تشجيع واهتمام حقيقي بنموك.",
        "نستخدم طريقة نور البيان المجرّبة لنأخذك من التعرف على الحروف العربية إلى قراءة القرآن بطلاقة. كل درس مخصص لسرعتك وأهدافك وجدولك.",
      ]}
      methodTitleEn="Our Approach for New Muslims"
      methodTitleAr="نهجنا للمسلمين الجدد"
      methodContentEn={[
        "We begin with the Arabic alphabet using the Noor Al-Bayan method — a visual, phonetic system that makes Arabic accessible even if you've never seen the script before.",
        "Once you can read, we introduce short Surahs for daily prayers, then progressively build your Tajweed skills. Our teachers explain the meaning of what you recite so you connect spiritually with every verse.",
        "Beyond Quran reading, we offer Islamic Studies basics — the five pillars, how to pray, essential duas, and the life of Prophet Muhammad ﷺ — all tailored for new Muslims.",
      ]}
      methodContentAr={[
        "نبدأ بالأبجدية العربية باستخدام طريقة نور البيان — نظام بصري صوتي يجعل العربية سهلة حتى لو لم تشاهد الخط من قبل.",
        "بمجرد أن تتمكن من القراءة، نقدم سوراً قصيرة للصلاة اليومية، ثم نبني مهارات التجويد تدريجياً. معلمونا يشرحون معنى ما تتلوه لتتصل روحياً مع كل آية.",
        "بالإضافة إلى قراءة القرآن، نقدم أساسيات الدراسات الإسلامية — أركان الإسلام الخمسة، كيفية الصلاة، الأدعية الأساسية، وسيرة النبي محمد ﷺ — كلها مصممة للمسلمين الجدد.",
      ]}
      audienceTitleEn="Who This Program Is For"
      audienceTitleAr="لمن هذا البرنامج"
      audiencePersonas={[
        { icon: Heart, titleEn: "New Reverts", titleAr: "المسلمون الجدد", descEn: "Just took your Shahada and want to start learning Quran from absolute zero.", descAr: "نطقت الشهادة مؤخراً وتريد البدء في تعلم القرآن من الصفر." },
        { icon: BookOpen, titleEn: "Learning Arabic Script", titleAr: "تعلم الخط العربي", descEn: "Can't read Arabic yet but eager to start your Quran journey.", descAr: "لا تستطيع قراءة العربية بعد لكنك متحمس لبدء رحلة القرآن." },
        { icon: Users, titleEn: "Muslim Families", titleAr: "العائلات المسلمة", descEn: "Revert parents who want their children to grow up with Quran education.", descAr: "آباء مسلمون جدد يريدون أن يكبر أطفالهم مع تعليم القرآن." },
        { icon: Globe, titleEn: "International Reverts", titleAr: "مسلمون جدد دوليون", descEn: "Living anywhere in the world — our classes work across all time zones.", descAr: "تعيش في أي مكان في العالم — دروسنا تعمل عبر جميع المناطق الزمنية." },
        { icon: Shield, titleEn: "Sisters Seeking Privacy", titleAr: "أخوات يبحثن عن الخصوصية", descEn: "Female reverts who prefer learning with a female teacher in a safe space.", descAr: "مسلمات جديدات يفضلن التعلم مع معلمة في بيئة آمنة." },
        { icon: Sparkles, titleEn: "Returning to Practice", titleAr: "العودة للممارسة", descEn: "Converted years ago but never had the chance to learn Quran properly.", descAr: "اعتنقت الإسلام منذ سنوات لكن لم تتح لك الفرصة لتعلم القرآن بشكل صحيح." },
      ]}
      classSteps={[
        { titleEn: "Warm Welcome & Check-in", titleAr: "ترحيب حار ومتابعة", descEn: "Your teacher starts with a friendly greeting and reviews what you learned last session.", descAr: "يبدأ معلمك بترحيب ودي ومراجعة ما تعلمته في الحصة السابقة.", durationEn: "5 min", durationAr: "٥ دقائق" },
        { titleEn: "Arabic Letters / Reading Practice", titleAr: "الحروف العربية / تمارين القراءة", descEn: "Learn new letters or practice reading with the Noor Al-Bayan method. Visual aids and repetition make it easy.", descAr: "تعلم حروفاً جديدة أو تمرن على القراءة بطريقة نور البيان. الوسائل البصرية والتكرار تجعلها سهلة.", durationEn: "15 min", durationAr: "١٥ دقيقة" },
        { titleEn: "Quran Recitation & Correction", titleAr: "تلاوة القرآن والتصحيح", descEn: "Read from the Quran with your teacher correcting pronunciation letter by letter.", descAr: "اقرأ من القرآن مع معلمك الذي يصحح النطق حرفاً بحرف.", durationEn: "15 min", durationAr: "١٥ دقيقة" },
        { titleEn: "Meaning & Spiritual Connection", titleAr: "المعنى والاتصال الروحي", descEn: "Understand what you just read — brief tafsir and practical application in daily life.", descAr: "افهم ما قرأته — تفسير مختصر وتطبيق عملي في الحياة اليومية.", durationEn: "10 min", durationAr: "١٠ دقائق" },
        { titleEn: "Homework & Next Steps", titleAr: "الواجب والخطوات القادمة", descEn: "Get a clear practice plan for the week with audio recordings to help you revise.", descAr: "احصل على خطة تمارين واضحة للأسبوع مع تسجيلات صوتية لمساعدتك في المراجعة.", durationEn: "5 min", durationAr: "٥ دقائق" },
      ]}
      challenges={[
        { problemEn: "I don't know any Arabic at all", problemAr: "لا أعرف أي عربي على الإطلاق", solutionEn: "We start from absolute zero with the Noor Al-Bayan visual method. No prior knowledge needed.", solutionAr: "نبدأ من الصفر المطلق بطريقة نور البيان البصرية. لا حاجة لمعرفة مسبقة." },
        { problemEn: "I feel embarrassed about my level", problemAr: "أشعر بالحرج من مستواي", solutionEn: "Private one-on-one classes. No group pressure. Your teacher celebrates every small win.", solutionAr: "دروس فردية خاصة. لا ضغط جماعي. معلمك يحتفل بكل إنجاز صغير." },
        { problemEn: "I don't have time for regular classes", problemAr: "ليس لدي وقت لدروس منتظمة", solutionEn: "Flexible scheduling — morning, evening, or weekend. Reschedule anytime.", solutionAr: "جدول مرن — صباحاً أو مساءً أو في عطلة نهاية الأسبوع. أعد الجدولة في أي وقت." },
        { problemEn: "I want to understand what I recite", problemAr: "أريد أن أفهم ما أتلوه", solutionEn: "Our teachers explain meaning alongside recitation so you connect deeply with the Quran.", solutionAr: "معلمونا يشرحون المعنى مع التلاوة لتتصل بعمق مع القرآن." },
      ]}
      levels={[
        { titleEn: "Level 1: Arabic Foundations", titleAr: "المستوى ١: أسس العربية", descEn: "Learn to recognize, pronounce, and connect Arabic letters.", descAr: "تعلم التعرف على الحروف العربية ونطقها ووصلها.", topicsEn: ["Arabic alphabet", "Letter forms (beginning, middle, end)", "Short vowels (Fathah, Kasrah, Dammah)", "Basic word reading"], topicsAr: ["الأبجدية العربية", "أشكال الحروف (بداية، وسط، نهاية)", "الحركات القصيرة (فتحة، كسرة، ضمة)", "قراءة الكلمات الأساسية"] },
        { titleEn: "Level 2: Quran Reading", titleAr: "المستوى ٢: قراءة القرآن", descEn: "Read from the Mushaf with basic Tajweed rules.", descAr: "القراءة من المصحف مع قواعد التجويد الأساسية.", topicsEn: ["Sukoon, Shaddah, Tanween", "Reading short Surahs", "Essential Tajweed rules", "Surahs for daily prayers"], topicsAr: ["السكون، الشدة، التنوين", "قراءة السور القصيرة", "قواعد التجويد الأساسية", "سور للصلاة اليومية"] },
        { titleEn: "Level 3: Fluent Recitation", titleAr: "المستوى ٣: التلاوة بطلاقة", descEn: "Read any page of the Quran fluently with proper Tajweed.", descAr: "قراءة أي صفحة من القرآن بطلاقة مع التجويد الصحيح.", topicsEn: ["Advanced Tajweed rules", "Fluent recitation practice", "Understanding basic meanings", "Memorization techniques"], topicsAr: ["قواعد التجويد المتقدمة", "تمارين التلاوة بطلاقة", "فهم المعاني الأساسية", "تقنيات الحفظ"] },
      ]}
      outcomesEn={[
        "Read Arabic letters and words confidently",
        "Recite short Surahs for daily prayers",
        "Apply basic Tajweed rules correctly",
        "Understand the meaning of commonly recited verses",
        "Feel confident in your Quran recitation journey",
        "Learn essential Islamic knowledge for daily life",
      ]}
      outcomesAr={[
        "قراءة الحروف والكلمات العربية بثقة",
        "تلاوة السور القصيرة للصلاة اليومية",
        "تطبيق قواعد التجويد الأساسية بشكل صحيح",
        "فهم معاني الآيات المتلوة بشكل شائع",
        "الشعور بالثقة في رحلة تلاوة القرآن",
        "تعلم المعرفة الإسلامية الأساسية للحياة اليومية",
      ]}
      featuresEn={[
        "Dedicated teachers trained to work with reverts",
        "One-on-one private sessions (no group pressure)",
        "Flexible schedule — any time zone, 7 days a week",
        "Female teachers available for sisters",
        "Patient, compassionate, zero-judgment environment",
        "Progress tracking with regular milestone reports",
        "Noor Al-Bayan method for efficient learning",
        "Free trial class — no commitment required",
      ]}
      featuresAr={[
        "معلمون متخصصون في تعليم المسلمين الجدد",
        "جلسات فردية خاصة (بدون ضغط جماعي)",
        "جدول مرن — أي منطقة زمنية، ٧ أيام في الأسبوع",
        "معلمات متاحات للأخوات",
        "بيئة صبورة ورحيمة بدون أحكام",
        "متابعة التقدم مع تقارير إنجاز منتظمة",
        "طريقة نور البيان للتعلم الفعّال",
        "حصة تجريبية مجانية — بدون التزام",
      ]}
      faqs={[
        { questionEn: "Do I need to know any Arabic to start?", questionAr: "هل أحتاج لمعرفة أي عربي للبدء؟", answerEn: "Not at all! We start from absolute zero — the Arabic alphabet. Our Noor Al-Bayan method is specifically designed for non-Arabic speakers.", answerAr: "ليس على الإطلاق! نبدأ من الصفر المطلق — الأبجدية العربية. طريقة نور البيان مصممة خصيصاً لغير الناطقين بالعربية." },
        { questionEn: "Will my teacher understand the challenges reverts face?", questionAr: "هل سيفهم معلمي التحديات التي يواجهها المسلمون الجدد؟", answerEn: "Absolutely. Our teachers have years of experience working with reverts from all backgrounds. They understand your journey and provide a compassionate, supportive environment.", answerAr: "بالتأكيد. معلمونا لديهم سنوات من الخبرة في العمل مع المسلمين الجدد من جميع الخلفيات. يفهمون رحلتك ويوفرون بيئة رحيمة وداعمة." },
        { questionEn: "Can I learn basic Islamic knowledge too?", questionAr: "هل يمكنني تعلم المعرفة الإسلامية الأساسية أيضاً؟", answerEn: "Yes! We offer Islamic Studies basics alongside Quran learning — how to pray, essential duas, the five pillars, and more. It's all integrated into your learning plan.", answerAr: "نعم! نقدم أساسيات الدراسات الإسلامية مع تعلم القرآن — كيفية الصلاة، الأدعية الأساسية، أركان الإسلام الخمسة، والمزيد. كلها مدمجة في خطة تعلمك." },
        { questionEn: "How long does it take to read Quran as a beginner?", questionAr: "كم يستغرق تعلم قراءة القرآن كمبتدئ؟", answerEn: "With consistent 3-4 classes per week, most students can read basic Arabic in 2-3 months and start reading from the Quran within 4-6 months. Everyone's pace is different, and that's perfectly okay.", answerAr: "مع ٣-٤ حصص منتظمة أسبوعياً، معظم الطلاب يمكنهم قراءة العربية الأساسية في ٢-٣ أشهر والبدء في القراءة من القرآن خلال ٤-٦ أشهر. كل شخص له سرعته الخاصة وهذا طبيعي تماماً." },
        { questionEn: "Is there a female teacher option?", questionAr: "هل يوجد خيار معلمة أنثى؟", answerEn: "Yes, we have experienced female teachers available for sisters. Just let us know your preference when booking your free trial.", answerAr: "نعم، لدينا معلمات ذوات خبرة متاحات للأخوات. فقط أخبرنا بتفضيلك عند حجز حصتك التجريبية المجانية." },
        { questionEn: "What if I feel too old to start?", questionAr: "ماذا لو شعرت أنني كبير جداً للبدء؟", answerEn: "It is never too late! We have students of all ages, from teenagers to people in their 60s and 70s. The Prophet ﷺ said: 'The best of you are those who learn the Quran and teach it.' There is no age limit on this blessing.", answerAr: "لم يفت الأوان أبداً! لدينا طلاب من جميع الأعمار، من المراهقين إلى أشخاص في الستينيات والسبعينيات. قال النبي ﷺ: 'خيركم من تعلم القرآن وعلمه.' لا يوجد حد عمري لهذه النعمة." },
      ]}
      testimonials={[
        { name: "Sarah M.", country: "USA", textEn: "As a revert, I was terrified of learning Arabic. My teacher at Alhamd made it feel so natural and easy. I can now read Quran on my own! 🌟", textAr: "كمسلمة جديدة، كنت خائفة من تعلم العربية. معلمتي في الحمد جعلتها تبدو طبيعية وسهلة. الآن أستطيع قراءة القرآن بمفردي! 🌟", rating: 5 },
        { name: "James R.", country: "UK", textEn: "I took my Shahada 6 months ago and started from zero. Now I read the short Surahs for my prayers. The patience of my teacher is unbelievable.", textAr: "نطقت الشهادة قبل ٦ أشهر وبدأت من الصفر. الآن أقرأ السور القصيرة لصلاتي. صبر معلمي لا يُصدّق.", rating: 5 },
        { name: "Maria L.", country: "Germany", textEn: "What I love most is that my teacher explains the meaning of everything. I don't just read — I understand what I'm reciting. That connection changed everything for me.", textAr: "ما أحبه أكثر هو أن معلمتي تشرح معنى كل شيء. أنا لا أقرأ فحسب — أفهم ما أتلوه. هذا الاتصال غيّر كل شيء بالنسبة لي.", rating: 5 },
      ]}
      relatedPages={[
        { titleEn: "Quran Classes for Beginners", titleAr: "دروس القرآن للمبتدئين", href: "/quran-classes-for-beginners" },
        { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
        { titleEn: "Female Quran Teacher", titleAr: "معلمة قرآن", href: "/female-quran-teacher" },
        { titleEn: "Islamic Studies Online", titleAr: "الدراسات الإسلامية أونلاين", href: "/islamic-studies-online" },
        { titleEn: "Free Trial Class", titleAr: "حصة تجريبية مجانية", href: "/free-trial" },
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Quran Classes for Reverts & New Muslims",
        "description": "Welcoming online Quran classes designed for reverts and new Muslims. Patient, certified Al-Azhar teachers guide you from the Arabic alphabet to fluent recitation.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Alhamd Academy",
          "url": "https://alhamdacademy.net",
          "sameAs": ["https://www.facebook.com/AlhamdAcademy", "https://www.instagram.com/alhamdacademy"]
        },
        "educationalLevel": "Beginner",
        "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "New Muslims / Reverts" },
        "inLanguage": ["en", "ar"],
        "isAccessibleForFree": false,
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "instructor": { "@type": "Person", "name": "Certified Al-Azhar Teachers" }
        },
        "offers": {
          "@type": "Offer",
          "category": "Paid",
          "priceCurrency": "USD",
          "price": "8",
          "url": "https://alhamdacademy.net/learn-quran-for-reverts"
        }
      }}
      ctaTitleEn="Start Your Quran Journey Today"
      ctaTitleAr="ابدأ رحلتك مع القرآن اليوم"
      ctaDescEn="Every great journey begins with a single step. Book your free trial class and experience the warmth and patience of our teachers firsthand."
      ctaDescAr="كل رحلة عظيمة تبدأ بخطوة واحدة. احجز حصتك التجريبية المجانية واختبر دفء وصبر معلمينا بنفسك."
      ctaButtonEn="Book Your Free Trial — No Commitment"
      ctaButtonAr="احجز حصتك المجانية — بدون التزام"
    />
  );
};

export default LearnQuranForReverts;
