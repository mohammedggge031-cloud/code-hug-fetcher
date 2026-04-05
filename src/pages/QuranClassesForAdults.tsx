import { GraduationCap, UserCheck, Heart, RefreshCw, Globe, Briefcase } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, Challenge, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Tajweed Course for Adults", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Quran Memorization (Hifz)", titleAr: "حفظ القرآن", href: "/quran-memorization-hifz" },
  { titleEn: "Quran Classes for Beginners", titleAr: "للمبتدئين", href: "/quran-classes-for-beginners" },
  { titleEn: "One-on-One Quran Classes", titleAr: "حصص فردية", href: "/one-on-one-quran-classes" },
  { titleEn: "Free Trial Class", titleAr: "حصة تجريبية مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Briefcase,
    titleEn: "Busy Professionals with Limited Time",
    titleAr: "مهنيون مشغولون بوقت محدود",
    descEn: "You work 9-to-5 (or more) and think you don't have time for Quran. With early morning, lunch break, and late evening sessions available, we fit into the busiest schedules. Even 3 sessions of 30 minutes per week will transform your recitation.",
    descAr: "تعمل من 9 إلى 5 (أو أكثر) وتظن أنه ليس لديك وقت للقرآن. مع جلسات صباحية مبكرة واستراحة غداء ومسائية متاحة، نتناسب مع أكثر الجداول ازدحاماً.",
  },
  {
    icon: GraduationCap,
    titleEn: "Adults Who Never Had Proper Quran Education",
    titleAr: "بالغون لم يحصلوا على تعليم قرآن صحيح",
    descEn: "You grew up Muslim but never had formal Quran instruction, or you learned by ear without understanding Tajweed rules. In a private one-on-one environment, there's zero judgment — just patient, professional teaching starting from wherever you are.",
    descAr: "نشأت مسلماً لكنك لم تحصل على تعليم قرآن رسمي، أو تعلمت بالسمع بدون فهم أحكام التجويد. في بيئة فردية خاصة، لا يوجد أي حكم — فقط تعليم صبور ومحترف من أي مستوى أنت فيه.",
  },
  {
    icon: RefreshCw,
    titleEn: "Revert Muslims Starting from Zero",
    titleAr: "المسلمون الجدد يبدأون من الصفر",
    descEn: "You've embraced Islam and want to learn Quran from the Arabic alphabet. Our teachers have extensive experience with revert students, teaching with extra patience and cultural sensitivity. Many of our most successful students are reverts.",
    descAr: "اعتنقت الإسلام وتريد تعلم القرآن من الحروف العربية. معلمونا لديهم خبرة واسعة مع المسلمين الجدد، يدرّسون بصبر إضافي وحساسية ثقافية.",
  },
  {
    icon: Heart,
    titleEn: "Sisters Seeking Female Teachers",
    titleAr: "أخوات يبحثن عن معلمات",
    descEn: "You want to learn Quran with a qualified female teacher in complete privacy. Our female Quran teachers hold Ijazah certification and create a comfortable, supportive learning environment for women of all ages and levels.",
    descAr: "تريدين تعلم القرآن مع معلمة مؤهلة في خصوصية كاملة. معلماتنا يحملن إجازة ويوفرن بيئة مريحة وداعمة للنساء من جميع الأعمار والمستويات.",
  },
  {
    icon: UserCheck,
    titleEn: "Adults Preparing for Hajj or Umrah",
    titleAr: "بالغون يستعدون للحج أو العمرة",
    descEn: "You want to improve your Quran reading before performing Hajj or Umrah. Our intensive short-term programs can significantly improve your recitation in 2–3 months, helping you connect more deeply with the Quran during your spiritual journey.",
    descAr: "تريد تحسين قراءتك للقرآن قبل أداء الحج أو العمرة. برامجنا المكثفة قصيرة المدى يمكنها تحسين تلاوتك بشكل كبير في 2–3 أشهر.",
  },
  {
    icon: Globe,
    titleEn: "Adults Living in Non-Muslim Countries",
    titleAr: "بالغون يعيشون في دول غير إسلامية",
    descEn: "You live in a country with no nearby mosques or qualified Quran teachers. Our online classes connect you with certified Al-Azhar teachers from the comfort of your home — available in your time zone, 24/7.",
    descAr: "تعيش في بلد ليس فيه مساجد قريبة أو معلمي قرآن مؤهلين. دروسنا أونلاين تربطك بمعلمين معتمدين من الأزهر من راحة بيتك — متاحون في منطقتك الزمنية، 24/7.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"I'm too old to learn Quran — it's too late for me\"",
    problemAr: "\"أنا كبير جداً لتعلم القرآن — فات الأوان\"",
    solutionEn: "It is never too late. We have students in their 50s and 60s who started from the Arabic alphabet and are now reading Quran fluently. The Prophet ﷺ said the one who struggles with the Quran gets double the reward. Every letter you learn counts.",
    solutionAr: "لم يفت الأوان أبداً. لدينا طلاب في الخمسينات والستينات بدأوا من الحروف وهم الآن يقرأون القرآن بطلاقة. قال النبي ﷺ أن الذي يتعتع في القرآن له أجران.",
  },
  {
    problemEn: "\"I'm embarrassed about my reading level\"",
    problemAr: "\"أخجل من مستوى قراءتي\"",
    solutionEn: "In a private one-on-one class, there's nobody else to compare yourself to. Your teacher has taught hundreds of adult beginners and treats every mistake as a learning opportunity. You'll be surprised how quickly the embarrassment disappears.",
    solutionAr: "في حصة فردية خاصة، لا يوجد أحد آخر لتقارن نفسك به. معلمك درّس مئات المبتدئين البالغين ويعامل كل خطأ كفرصة للتعلم.",
  },
  {
    problemEn: "\"My schedule changes every week — I can't commit to fixed times\"",
    problemAr: "\"جدولي يتغير كل أسبوع — لا أستطيع الالتزام بمواعيد ثابتة\"",
    solutionEn: "We offer truly flexible scheduling. You can reschedule with 6 hours' notice, book different time slots each week, and even switch between morning and evening sessions. Our teachers work across all time zones 24/7.",
    solutionAr: "نقدم مواعيد مرنة حقاً. يمكنك إعادة الجدولة بإشعار 6 ساعات، وحجز أوقات مختلفة كل أسبوع. معلمونا يعملون في جميع المناطق الزمنية 24/7.",
  },
  {
    problemEn: "\"I tried learning before but gave up because I wasn't progressing\"",
    problemAr: "\"حاولت التعلم من قبل لكنني استسلمت لعدم التقدم\"",
    solutionEn: "Progress stalls usually happen because of one-size-fits-all approaches. Our teachers create a personalized plan based on YOUR specific weaknesses and goals. With measurable milestones and regular assessments, you'll see clear progress every month.",
    solutionAr: "التوقف عادة يحدث بسبب النهج الموحد. معلمونا يضعون خطة مخصصة بناءً على نقاط ضعفك وأهدافك المحددة. مع معالم قابلة للقياس وتقييمات منتظمة، سترى تقدماً واضحاً.",
  },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Learning Environment", featureAr: "بيئة التعلم", usEn: "✅ Private — no judgment", usAr: "✅ خاصة — بدون حكم", othersEn: "❌ Group — uncomfortable for adults", othersAr: "❌ جماعية — غير مريحة للبالغين" },
  { featureEn: "Schedule Flexibility", featureAr: "مرونة المواعيد", usEn: "✅ 24/7 — any timezone", usAr: "✅ 24/7 — أي منطقة زمنية", othersEn: "❌ Fixed evening/weekend only", othersAr: "❌ مساء أو عطلة أسبوع فقط" },
  { featureEn: "Pace", featureAr: "السرعة", usEn: "✅ Fully personalized to you", usAr: "✅ مخصصة لك بالكامل", othersEn: "⚠️ One pace for everyone", othersAr: "⚠️ سرعة واحدة للجميع" },
  { featureEn: "Teacher Expertise", featureAr: "خبرة المعلم", usEn: "✅ Al-Azhar certified + adult teaching experience", usAr: "✅ معتمد من الأزهر + خبرة تعليم البالغين", othersEn: "⚠️ Often trained for kids only", othersAr: "⚠️ غالباً مدربون للأطفال فقط" },
  { featureEn: "Starting Price", featureAr: "السعر المبدئي", usEn: "✅ Best value per session", usAr: "✅ أفضل قيمة لكل جلسة", othersEn: "⚠️ Significantly higher", othersAr: "⚠️ أعلى بكثير" },
];

const QuranClassesForAdults = () => (
  <ServicePageLayout
    seoTitle="Quran Classes for Adults Online | Learn Quran for Adults | Alhamd Academy"
    seoDescription="Private online Quran classes for adults. Learn at your own pace with certified teachers. Perfect for beginners, busy professionals, and revert Muslims. No judgment. Free trial."
    seoKeywords="learn quran online for adults, quran classes for adults, quran classes for beginners adults, tajweed course for adults, online quran classes for adults, adult quran classes, quran for adults online, learn quran as adult, quran reading for adults, adult quran learning"
    canonical="https://alhamdacademy.net/quran-classes-for-adults"
    heroTitleEn="Online Quran Classes for Adults — Learn at Your Own Pace"
    heroTitleAr="دروس القرآن أونلاين للبالغين — تعلم بسرعتك"
    heroSubtitleEn="Private, Judgment-Free Quran Learning with Certified Teachers"
    heroSubtitleAr="تعلم قرآن خاص وبدون حكم مع معلمين معتمدين"
    heroDescEn="Whether you're a complete beginner or want to perfect your Tajweed, our certified Al-Azhar teachers create a comfortable, private learning environment designed specifically for adult learners. No group classes, no embarrassment — just focused Quran education that fits your busy schedule."
    heroDescAr="سواء كنت مبتدئاً تماماً أو تريد إتقان التجويد، معلمونا المعتمدون يوفرون بيئة تعلم مريحة وخاصة مصممة للبالغين. بدون حصص جماعية ولا إحراج — فقط تعليم قرآن مركز يتناسب مع جدولك."
    aboutTitleEn="Why Adults Choose Private Online Quran Classes"
    aboutTitleAr="لماذا يختار البالغون حصص القرآن الخاصة أونلاين"
    aboutContentEn={[
      "Learning Quran as an adult comes with unique challenges that group classes simply can't address. You might feel self-conscious about your reading level, struggle to find time in a packed schedule, or have tried before and given up because the pace didn't suit you.",
      "At Alhamd Academy, we've helped hundreds of adults — from complete beginners who never read Arabic to intermediate readers looking to master Tajweed. Our approach is built around three principles: privacy, flexibility, and personalization.",
      "Privacy means you learn one-on-one with your teacher. There's no group to compare yourself to, no pressure to keep up with others, and no embarrassment when you make mistakes. Your teacher celebrates every small improvement and creates a safe space for learning.",
      "Flexibility means classes happen when YOU are available — 5 AM before work, during lunch, or at 11 PM after the kids are asleep. We operate 24/7 across all time zones, and you can reschedule with just 6 hours' notice.",
      "Personalization means your curriculum is designed around your specific goals, current level, and learning speed. Whether you want to read Quran fluently for prayer, memorize specific Surahs, learn Tajweed rules, or pursue Ijazah — your plan is yours alone.",
    ]}
    aboutContentAr={[
      "تعلم القرآن كبالغ يأتي بتحديات فريدة لا تستطيع الحصص الجماعية معالجتها. قد تشعر بالحرج من مستوى قراءتك أو تجد صعوبة في إيجاد الوقت أو جربت من قبل واستسلمت.",
      "في أكاديمية الحمد، ساعدنا مئات البالغين — من مبتدئين تماماً إلى قراء متوسطين يسعون لإتقان التجويد. نهجنا مبني على ثلاثة مبادئ: الخصوصية والمرونة والتخصيص.",
      "الخصوصية تعني أنك تتعلم فردياً مع معلمك. لا توجد مجموعة لتقارن نفسك بها ولا ضغط ولا إحراج عند الخطأ. معلمك يحتفل بكل تحسن صغير.",
      "المرونة تعني أن الحصص تحدث عندما تكون أنت متاحاً — 5 صباحاً قبل العمل أو وقت الغداء أو 11 مساءً بعد نوم الأطفال. نعمل 24/7.",
      "التخصيص يعني أن منهجك مصمم حول أهدافك المحددة ومستواك الحالي وسرعة تعلمك. سواء كنت تريد القراءة الطلقة أو الحفظ أو التجويد أو الإجازة.",
    ]}
    methodTitleEn="How We Teach Adult Learners Differently"
    methodTitleAr="كيف ندرّس البالغين بشكل مختلف"
    methodContentEn={[
      "Adult learners process information differently than children. We don't use childish games or songs — instead, our teachers use logical explanations, real-world connections, and analytical approaches that respect your intelligence while building your skills.",
      "For beginners, we start with the Noor Al-Bayan method but taught at an adult pace. You'll learn letter sounds, connections, and basic reading skills much faster than children because you already have cognitive frameworks for learning.",
      "Each session builds logically on the previous one with clear learning objectives. You'll always know what you're working toward and can see measurable progress through regular assessments.",
      "We also offer specialized tracks: Tajweed perfection for intermediate readers, Hifz programs for adults with realistic memorization schedules, and Ijazah preparation for advanced students seeking certification.",
    ]}
    methodContentAr={[
      "البالغون يعالجون المعلومات بشكل مختلف عن الأطفال. لا نستخدم ألعاباً طفولية — بل يستخدم معلمونا شروحات منطقية وروابط عملية ونهجاً تحليلياً يحترم ذكاءك.",
      "للمبتدئين، نبدأ بطريقة نور البيان لكن بسرعة مناسبة للبالغين. ستتعلم أسرع من الأطفال لأن لديك بالفعل أطر معرفية للتعلم.",
      "كل جلسة تبني منطقياً على السابقة بأهداف تعلم واضحة. ستعرف دائماً ما تعمل نحوه وترى تقدماً قابلاً للقياس.",
      "نقدم أيضاً مسارات متخصصة: إتقان التجويد للقراء المتوسطين، برامج حفظ للبالغين، وتحضير الإجازة للمتقدمين.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Which Type of Adult Learner Are You?"
    audienceTitleAr="أي نوع من المتعلمين البالغين أنت؟"
    challenges={CHALLENGES}
    challengesTitleEn="Common Barriers to Adult Quran Learning — And Our Solutions"
    challengesTitleAr="عوائق شائعة لتعلم القرآن للبالغين — وحلولنا"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Private Adult Classes vs. Group Classes"
    comparisonTitleAr="الحصص الخاصة للبالغين مقابل الجماعية"
    deepContentTitleEn="The Complete Guide to Learning Quran as an Adult"
    deepContentTitleAr="الدليل الشامل لتعلم القرآن كبالغ"
    deepContentEn={[
      "The decision to learn Quran as an adult is one of the most rewarding spiritual commitments you can make. Unlike childhood learning, adult Quran education comes with understanding and intention — every letter you read carries the weight of conscious devotion.",
      "Many adults hesitate to start because they compare themselves to children who seem to learn effortlessly. But adults actually have significant advantages: you understand why you're learning, you can apply logical thinking to Tajweed rules, and you bring life experience that gives the Quran's meanings deeper resonance.",
      "The biggest obstacle for most adult learners isn't ability — it's finding the right learning environment. Traditional mosque classes are often designed for children, with teaching styles, pace, and scheduling that don't work for working adults. Online one-on-one classes solve every one of these problems.",
      "Research shows that adult learners who study consistently 3–5 times per week, even in short 25-minute sessions, make significantly more progress than those who do one long weekly session. Consistency and repetition are the keys to building the muscle memory needed for fluent Quran reading.",
    ]}
    deepContentAr={[
      "قرار تعلم القرآن كبالغ من أكثر الالتزامات الروحية المجزية. بخلاف تعلم الطفولة، تعليم القرآن للبالغين يأتي بفهم ونية — كل حرف تقرأه يحمل ثقل العبادة الواعية.",
      "كثير من البالغين يترددون لأنهم يقارنون أنفسهم بالأطفال. لكن البالغين لديهم مزايا كبيرة: تفهم لماذا تتعلم، يمكنك تطبيق التفكير المنطقي على أحكام التجويد، وتجربة الحياة تعطي معاني القرآن صدى أعمق.",
      "العقبة الأكبر لمعظم البالغين ليست القدرة — إنها إيجاد بيئة التعلم المناسبة. حصص المسجد التقليدية مصممة للأطفال. الحصص الفردية أونلاين تحل كل هذه المشاكل.",
      "الأبحاث تظهر أن البالغين الذين يدرسون 3–5 مرات أسبوعياً، حتى في جلسات 25 دقيقة قصيرة، يحققون تقدماً أكبر بكثير. الانتظام والتكرار مفاتيح بناء الذاكرة العضلية.",
    ]}
    levels={[
      { titleEn: "Absolute Beginner", titleAr: "مبتدئ تماماً", descEn: "Never read Arabic before — starting from the alphabet.", descAr: "لم يقرأ العربية من قبل — يبدأ من الحروف.", topicsEn: ["Arabic alphabet mastery", "Noorani Qaida completion", "Basic word reading", "Short Surah memorization for prayer"], topicsAr: ["إتقان الحروف العربية", "إكمال القاعدة النورانية", "قراءة الكلمات الأساسية", "حفظ سور قصيرة للصلاة"] },
      { titleEn: "Intermediate Reader", titleAr: "قارئ متوسط", descEn: "Can read Arabic but needs Tajweed improvement.", descAr: "يقرأ العربية لكنه يحتاج تحسين التجويد.", topicsEn: ["Tajweed rules application", "Makharij perfection", "Fluent Mushaf reading", "Selected Surah memorization"], topicsAr: ["تطبيق أحكام التجويد", "إتقان المخارج", "قراءة طلقة من المصحف", "حفظ سور مختارة"] },
      { titleEn: "Advanced — Hifz or Ijazah", titleAr: "متقدم — حفظ أو إجازة", descEn: "Strong reader pursuing memorization or certification.", descAr: "قارئ قوي يسعى للحفظ أو الإجازة.", topicsEn: ["Structured Hifz program", "Ijazah preparation", "Advanced Tajweed mastery", "Teaching methodology (optional)"], topicsAr: ["برنامج حفظ منظم", "تحضير الإجازة", "إتقان التجويد المتقدم", "منهجية التدريس (اختياري)"] },
    ]}
    outcomesEn={[
      "Read Quran fluently with proper Tajweed application",
      "Understand and apply all essential Tajweed rules",
      "Memorize key Surahs needed for daily prayers",
      "Build confidence in reciting Quran in any setting",
      "Achieve personal Quran learning goals at your own pace",
      "Optionally pursue Hifz or Ijazah certification",
    ]}
    outcomesAr={[
      "قراءة القرآن بطلاقة مع تطبيق التجويد",
      "فهم وتطبيق جميع أحكام التجويد الأساسية",
      "حفظ السور الأساسية للصلاة اليومية",
      "بناء الثقة في التلاوة في أي بيئة",
      "تحقيق أهدافك الشخصية بسرعتك",
      "اختيارياً متابعة الحفظ أو الإجازة",
    ]}
    featuresEn={[
      "Private one-on-one classes — zero judgment environment",
      "Certified Al-Azhar teachers experienced with adults",
      "24/7 flexible scheduling for all time zones",
      "Male and female teachers available",
      "Personalized curriculum based on your goals",
      "Flexible plans to suit every budget",
      "Free trial class with no commitment",
      "Easy rescheduling with 6 hours' notice",
    ]}
    featuresAr={[
      "حصص فردية خاصة — بيئة بدون حكم",
      "معلمون معتمدون من الأزهر بخبرة مع البالغين",
      "مواعيد مرنة 24/7 لجميع المناطق الزمنية",
      "معلمون ومعلمات متاحون",
      "منهج مخصص بناءً على أهدافك",
      "خطط تبدأ من خطط شهرية معقولة",
      "حصة تجريبية مجانية بدون التزام",
      "إعادة جدولة سهلة بإشعار 6 ساعات",
    ]}
    faqs={[
      { questionEn: "Is it really too late to learn Quran as an adult?", questionAr: "هل فعلاً فات الأوان لتعلم القرآن كبالغ؟", answerEn: "Absolutely not. We have students who started in their 40s, 50s, and even 60s. Adult learners often progress faster than expected because they bring motivation, discipline, and cognitive maturity. The Prophet ﷺ said the one who struggles with Quran gets double the reward.", answerAr: "بالتأكيد لا. لدينا طلاب بدأوا في الأربعينات والخمسينات وحتى الستينات. البالغون غالباً يتقدمون أسرع من المتوقع لأنهم يجلبون الدافعية والانضباط والنضج المعرفي." },
      { questionEn: "How long will it take me to read Quran fluently?", questionAr: "كم سيستغرق حتى أقرأ القرآن بطلاقة؟", answerEn: "With 3–5 sessions per week, most adult beginners can read basic Quranic text within 3–4 months and achieve fluent reading within 8–12 months. Your exact timeline depends on your starting level, consistency, and practice between classes.", answerAr: "مع 3–5 حصص أسبوعياً، معظم البالغين المبتدئين يقرأون نصوصاً قرآنية أساسية خلال 3–4 أشهر ويحققون قراءة طلقة خلال 8–12 شهراً." },
      { questionEn: "Can I learn Quran if I don't speak Arabic?", questionAr: "هل يمكنني تعلم القرآن إذا لم أكن أتحدث العربية؟", answerEn: "Yes. The majority of our adult students are non-Arabic speakers. The Noor Al-Bayan method teaches Quran reading through phonetic recognition — you learn to read the sounds correctly without needing to understand Arabic as a language.", answerAr: "نعم. غالبية طلابنا البالغين لا يتحدثون العربية. طريقة نور البيان تعلم قراءة القرآن من خلال التعرف الصوتي — تتعلم قراءة الأصوات بدون الحاجة لفهم العربية كلغة." },
      { questionEn: "What if I can only do 2 classes per week?", questionAr: "ماذا لو أستطيع حضور حصتين فقط أسبوعياً؟", answerEn: "Two classes per week still works — you'll progress, just more gradually. We'll give you specific practice assignments between classes to maximize each session's impact. Many of our working professionals start with 2 classes and add more as they see progress.", answerAr: "حصتان أسبوعياً تنجح أيضاً — ستتقدم لكن بشكل تدريجي أكثر. سنعطيك تمارين محددة بين الحصص لتعظيم تأثير كل جلسة." },
    ]}
    testimonials={[
      { name: "James R.", country: "USA", textEn: "I reverted to Islam at 35 and was embarrassed about not being able to read Quran. My teacher at Alhamd Academy was incredibly patient. In 6 months, I went from zero to reading Juz Amma with Tajweed.", textAr: "اعتنقت الإسلام في سن 35 وكنت محرجاً لعدم قدرتي على قراءة القرآن. معلمي كان صبوراً بشكل لا يصدق. في 6 أشهر، انتقلت من الصفر لقراءة جزء عم بالتجويد.", rating: 5 },
      { name: "Amina S.", country: "UK", textEn: "As a working mother of 3, I never thought I'd find time to learn Quran properly. The late-night sessions after the kids sleep have been life-changing. I finally feel confident reading in Salah.", textAr: "كأم عاملة لـ 3 أطفال، لم أظن أنني سأجد وقتاً لتعلم القرآن. الجلسات المتأخرة بعد نوم الأطفال غيرت حياتي. أخيراً أشعر بالثقة في القراءة أثناء الصلاة.", rating: 5 },
      { name: "Omar H.", country: "Canada", textEn: "I grew up Muslim but never learned Tajweed properly. After 4 months with Alhamd Academy, my Imam noticed the improvement and asked what changed. Best investment I've ever made.", textAr: "نشأت مسلماً لكنني لم أتعلم التجويد بشكل صحيح. بعد 4 أشهر مع أكاديمية الحمد، لاحظ الإمام التحسن وسألني ماذا تغير. أفضل استثمار قمت به.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Online Quran Classes for Adults",
      "description": "Private online Quran classes designed for adult learners. Flexible scheduling, certified teachers, judgment-free environment.",
      "provider": { "@type": "Organization", "name": "Alhamd Academy", "url": "https://alhamdacademy.net" },
      "educationalLevel": "Beginner to Advanced",
      "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Adult learners" },
      "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    }}
  />
);

export default QuranClassesForAdults;
