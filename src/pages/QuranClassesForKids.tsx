import { Baby, Heart, Star, Shield, Gamepad2, Clock } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Quran Memorization (Hifz)", titleAr: "حفظ القرآن", href: "/quran-memorization-hifz" },
  { titleEn: "Arabic for Kids", titleAr: "العربية للأطفال", href: "/arabic-for-kids" },
  { titleEn: "Female Quran Teacher", titleAr: "معلمة قرآن", href: "/female-quran-teacher" },
  { titleEn: "One-on-One Quran Classes", titleAr: "حصص فردية", href: "/one-on-one-quran-classes" },
  { titleEn: "Free Trial Class", titleAr: "حصة تجريبية مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Toddlers & Pre-Schoolers (Ages 4–6)",
    titleAr: "الأطفال الصغار (4–6 سنوات)",
    descEn: "Your little one is at the perfect age to start recognizing Arabic letters through play-based learning. Our teachers use colorful flashcards, animated songs, and 15–20 minute micro-sessions designed for tiny attention spans.",
    descAr: "طفلك في العمر المثالي لبدء التعرف على الحروف العربية من خلال التعلم باللعب. معلمونا يستخدمون بطاقات ملونة وأناشيد وجلسات 15–20 دقيقة مصممة للأطفال الصغار.",
  },
  {
    icon: Gamepad2,
    titleEn: "Primary School Children (Ages 7–10)",
    titleAr: "أطفال المرحلة الابتدائية (7–10 سنوات)",
    descEn: "Your child can read some Arabic but needs structured Quran reading practice. At this stage, we transition from Noorani Qaida to reading directly from the Mushaf, building fluency and introducing basic Tajweed rules through interactive exercises.",
    descAr: "طفلك يقرأ بعض العربية لكنه يحتاج تدريب منظم على قراءة القرآن. في هذه المرحلة، ننتقل من القاعدة النورانية للقراءة من المصحف مباشرة مع تقديم أحكام التجويد الأساسية.",
  },
  {
    icon: Star,
    titleEn: "Pre-Teens Ready for Hifz (Ages 11–14)",
    titleAr: "ما قبل المراهقة الجاهزون للحفظ (11–14 سنة)",
    descEn: "Your child reads Quran well and is ready to start memorization. Our structured Hifz program for this age group sets realistic weekly targets with daily revision schedules that work alongside school commitments.",
    descAr: "طفلك يقرأ القرآن جيداً وجاهز لبدء الحفظ. برنامج الحفظ المنظم لهذه الفئة العمرية يضع أهدافاً أسبوعية واقعية مع جداول مراجعة يومية تتوافق مع المدرسة.",
  },
  {
    icon: Shield,
    titleEn: "Children with No Arabic Background",
    titleAr: "أطفال بدون خلفية عربية",
    descEn: "Your family doesn't speak Arabic at home and you're worried your child will struggle. Our teachers specialize in teaching non-Arabic-speaking children from scratch using visual and auditory methods that bypass the language barrier entirely.",
    descAr: "عائلتك لا تتحدث العربية في البيت وأنت قلق أن طفلك سيجد صعوبة. معلمونا متخصصون في تعليم الأطفال غير الناطقين بالعربية من الصفر باستخدام طرق بصرية وسمعية.",
  },
  {
    icon: Heart,
    titleEn: "Girls Who Prefer Female Teachers",
    titleAr: "بنات يفضلن معلمات",
    descEn: "Many parents prefer female teachers for their daughters. We have qualified Hafidhat teachers who create a comfortable, nurturing environment specifically for young girls learning Quran.",
    descAr: "كثير من الآباء يفضلون معلمات لبناتهم. لدينا معلمات حافظات مؤهلات يوفرن بيئة مريحة ورعاية خاصة للبنات.",
  },
  {
    icon: Clock,
    titleEn: "Busy Families Needing Flexible Schedules",
    titleAr: "عائلات مشغولة تحتاج مواعيد مرنة",
    descEn: "Between school, sports, and activities, finding time for Quran class is hard. Our 24/7 scheduling means you can book classes early morning before school, after dinner, or even on weekends — whatever works for your family.",
    descAr: "بين المدرسة والرياضة والأنشطة، إيجاد وقت لحصة القرآن صعب. مواعيدنا 24/7 تعني أنك تستطيع الحجز صباحاً قبل المدرسة أو بعد العشاء أو في عطلة الأسبوع.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Fun Warm-Up & Review Game",
    titleAr: "إحماء ممتع ولعبة مراجعة",
    descEn: "The class starts with a quick game reviewing what the child learned last time — letter recognition quizzes, sound matching, or verse recitation with sticker rewards for correct answers.",
    descAr: "تبدأ الحصة بلعبة سريعة لمراجعة ما تعلمه الطفل — اختبارات التعرف على الحروف، مطابقة الأصوات، أو تلاوة مع مكافآت ملصقات للإجابات الصحيحة.",
    durationEn: "5 min",
    durationAr: "5 دقائق",
  },
  {
    titleEn: "Gentle Error Correction",
    titleAr: "تصحيح لطيف للأخطاء",
    descEn: "The teacher identifies pronunciation issues from the review and corrects them using comparison, repetition, and positive reinforcement — never criticism. Children learn best when they feel safe to make mistakes.",
    descAr: "يحدد المعلم مشاكل النطق ويصححها باستخدام المقارنة والتكرار والتعزيز الإيجابي — بدون انتقاد أبداً. الأطفال يتعلمون أفضل عندما يشعرون بالأمان.",
    durationEn: "5 min",
    durationAr: "5 دقائق",
  },
  {
    titleEn: "New Lesson with Visual Aids",
    titleAr: "درس جديد بوسائل بصرية",
    descEn: "New letters, words, or Tajweed rules are introduced using colorful digital whiteboards, animated presentations, and interactive screen sharing. The teacher demonstrates, then the child practices immediately.",
    descAr: "تُقدم حروف أو كلمات أو أحكام تجويد جديدة باستخدام سبورات رقمية ملونة وعروض متحركة. يوضح المعلم ثم يتدرب الطفل فوراً.",
    durationEn: "10 min",
    durationAr: "10 دقائق",
  },
  {
    titleEn: "Interactive Practice & Games",
    titleAr: "تدريب تفاعلي وألعاب",
    descEn: "The child applies what they learned through reading exercises, matching games, or recitation practice. For younger kids, this includes digital stickers, point systems, and mini-competitions that make learning feel like play.",
    descAr: "يطبق الطفل ما تعلمه من خلال تمارين القراءة وألعاب المطابقة أو تدريب التلاوة. للأصغر سناً، يشمل ملصقات رقمية ونظام نقاط ومسابقات صغيرة.",
    durationEn: "8 min",
    durationAr: "8 دقائق",
  },
  {
    titleEn: "Parent Update & Homework",
    titleAr: "تحديث الوالدين والواجب",
    descEn: "The teacher sends a brief progress note to parents via WhatsApp after each class — what was covered, what the child excelled at, and what to practice before next class. Parents stay informed without needing to sit in.",
    descAr: "يرسل المعلم ملاحظة تقدم مختصرة للوالدين عبر واتساب بعد كل حصة — ما تمت تغطيته، ما تميز فيه الطفل، وما يجب التدرب عليه.",
    durationEn: "2 min",
    durationAr: "2 دقائق",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"My child can't sit still for more than 10 minutes\"",
    problemAr: "\"طفلي لا يستطيع الجلوس لأكثر من 10 دقائق\"",
    solutionEn: "We offer 20-minute sessions for young children (ages 4–7) with activity changes every 3–5 minutes. Games, songs, and visual rewards keep them engaged. Most parents are surprised at how focused their children become within the first week.",
    solutionAr: "نقدم جلسات 20 دقيقة للأطفال الصغار (4–7 سنوات) مع تغيير النشاط كل 3–5 دقائق. الألعاب والأناشيد والمكافآت البصرية تبقيهم منخرطين.",
  },
  {
    problemEn: "\"We don't speak Arabic at home — how will my child learn?\"",
    problemAr: "\"لا نتحدث العربية في البيت — كيف سيتعلم طفلي؟\"",
    solutionEn: "Most of our students come from non-Arabic-speaking families. Our teachers use the Noor Al-Bayan method which teaches Quran reading through phonetic recognition — your child learns to read Arabic sounds without needing to understand the language first.",
    solutionAr: "معظم طلابنا من عائلات لا تتحدث العربية. معلمونا يستخدمون طريقة نور البيان التي تعلم القراءة من خلال التعرف الصوتي — طفلك يتعلم قراءة الأصوات العربية بدون الحاجة لفهم اللغة أولاً.",
  },
  {
    problemEn: "\"My child had a bad experience with a strict Quran teacher before\"",
    problemAr: "\"طفلي مر بتجربة سيئة مع معلم قرآن صارم من قبل\"",
    solutionEn: "Our teachers are specifically selected for their patience and child-friendly approach. We use positive reinforcement, never punishment or harsh criticism. The first class is a free trial so you can see our teaching style before committing.",
    solutionAr: "معلمونا مختارون خصيصاً لصبرهم ونهجهم الودود مع الأطفال. نستخدم التعزيز الإيجابي وليس العقاب أو النقد. الحصة الأولى تجريبية مجانية لترى أسلوبنا.",
  },
  {
    problemEn: "\"I can't monitor every class — how do I know my child is progressing?\"",
    problemAr: "\"لا أستطيع مراقبة كل حصة — كيف أعرف أن طفلي يتقدم؟\"",
    solutionEn: "After every single class, your teacher sends a WhatsApp progress report detailing what was covered, how the child performed, and what to practice. Monthly progress assessments show measurable improvement in reading accuracy and speed.",
    solutionAr: "بعد كل حصة، يرسل المعلم تقرير تقدم عبر واتساب يفصل ما تمت تغطيته وأداء الطفل وما يجب التدرب عليه. تقييمات شهرية تظهر تحسناً ملموساً.",
  },
  {
    problemEn: "\"Online classes won't work for my young child\"",
    problemAr: "\"الدروس أونلاين لن تنجح مع طفلي الصغير\"",
    solutionEn: "We've taught hundreds of children aged 4+ successfully online. The key is our age-appropriate session lengths, interactive tools, and teachers who are specifically trained for online teaching with children. Our retention rate speaks for itself.",
    solutionAr: "درّسنا مئات الأطفال من سن 4+ بنجاح أونلاين. المفتاح هو مدة الجلسات المناسبة للعمر والأدوات التفاعلية والمعلمون المدربون خصيصاً للتدريس أونلاين مع الأطفال.",
  },
];

const CURRICULUM: CurriculumWeek[] = [
  {
    weekEn: "Weeks 1–4",
    weekAr: "الأسابيع 1–4",
    topicEn: "Arabic Letter Recognition & Sounds",
    topicAr: "التعرف على الحروف العربية وأصواتها",
    detailsEn: [
      "Learning all 28 Arabic letters through songs and flashcards",
      "Recognizing letter shapes in all positions",
      "Short vowel sounds (Fatha, Kasra, Damma) with fun exercises",
      "Simple 2-letter word reading",
    ],
    detailsAr: [
      "تعلم جميع الحروف الـ 28 من خلال أناشيد وبطاقات",
      "التعرف على أشكال الحروف في جميع المواضع",
      "أصوات الحركات القصيرة بتمارين ممتعة",
      "قراءة كلمات بسيطة من حرفين",
    ],
  },
  {
    weekEn: "Weeks 5–10",
    weekAr: "الأسابيع 5–10",
    topicEn: "Noorani Qaida Completion & Word Building",
    topicAr: "إكمال القاعدة النورانية وبناء الكلمات",
    detailsEn: [
      "Tanween, Shaddah, and Sukoon rules",
      "Madd letters and natural elongation",
      "Reading multi-syllable Arabic words fluently",
      "Short Quranic phrases introduction",
    ],
    detailsAr: [
      "أحكام التنوين والشدة والسكون",
      "حروف المد والمد الطبيعي",
      "قراءة كلمات عربية متعددة المقاطع بطلاقة",
      "مقدمة لعبارات قرآنية قصيرة",
    ],
  },
  {
    weekEn: "Weeks 11–20",
    weekAr: "الأسابيع 11–20",
    topicEn: "Reading from the Mushaf & Short Surahs",
    topicAr: "القراءة من المصحف والسور القصيرة",
    detailsEn: [
      "Transition from Qaida to reading Quran directly",
      "Memorizing short Surahs from Juz Amma",
      "Basic Tajweed rules applied naturally",
      "Building reading confidence and speed",
    ],
    detailsAr: [
      "الانتقال من القاعدة للقراءة من القرآن مباشرة",
      "حفظ سور قصيرة من جزء عم",
      "تطبيق أحكام التجويد الأساسية بشكل طبيعي",
      "بناء الثقة والسرعة في القراءة",
    ],
  },
  {
    weekEn: "Weeks 21+",
    weekAr: "الأسابيع 21+",
    topicEn: "Fluent Recitation or Hifz Track",
    topicAr: "تلاوة طلقة أو مسار الحفظ",
    detailsEn: [
      "Choose: continue improving recitation or start Hifz program",
      "Intermediate Tajweed rules for better recitation",
      "Structured memorization with daily revision schedule",
      "Monthly assessments and progress certificates",
    ],
    detailsAr: [
      "اختيار: الاستمرار في تحسين التلاوة أو بدء برنامج الحفظ",
      "أحكام تجويد متوسطة لتلاوة أفضل",
      "حفظ منظم مع جدول مراجعة يومي",
      "تقييمات شهرية وشهادات تقدم",
    ],
  },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Class Format", featureAr: "نوع الحصة", usEn: "✅ Private one-on-one", usAr: "✅ فردية خاصة", othersEn: "❌ Group (5–15 kids)", othersAr: "❌ جماعية (5–15 طفل)" },
  { featureEn: "Session Length", featureAr: "مدة الجلسة", usEn: "✅ Age-appropriate (20–30 min)", usAr: "✅ مناسبة للعمر (20–30 دقيقة)", othersEn: "❌ Fixed 60 min for all ages", othersAr: "❌ 60 دقيقة ثابتة لكل الأعمار" },
  { featureEn: "Teaching Style", featureAr: "أسلوب التدريس", usEn: "✅ Games, rewards, interactive", usAr: "✅ ألعاب ومكافآت وتفاعلي", othersEn: "⚠️ Traditional lecture style", othersAr: "⚠️ أسلوب محاضرة تقليدي" },
  { featureEn: "Progress Reports", featureAr: "تقارير التقدم", usEn: "✅ After every class via WhatsApp", usAr: "✅ بعد كل حصة عبر واتساب", othersEn: "❌ Monthly or none", othersAr: "❌ شهرياً أو بدون" },
  { featureEn: "Teacher Training", featureAr: "تدريب المعلم", usEn: "✅ Child-specialist certified", usAr: "✅ معتمد متخصص أطفال", othersEn: "⚠️ General Quran teachers", othersAr: "⚠️ معلمو قرآن عامون" },
  { featureEn: "Family Discount", featureAr: "خصم عائلي", usEn: "✅ Yes — multi-child pricing", usAr: "✅ نعم — أسعار متعددة الأطفال", othersEn: "❌ No discounts", othersAr: "❌ بدون خصومات" },
];

const QuranClassesForKids = () => (
  <ServicePageLayout
    seoTitle="Quran Classes for Kids Online | Learn Quran for Kids | Alhamd Academy"
    seoDescription="Fun, engaging online Quran classes for kids ages 4–14. Certified child-specialist teachers. Games, rewards & progress reports. One-on-one sessions. Free trial class."
    seoKeywords="quran classes for kids online, online quran classes for kids, learn quran for kids, quran teacher for kids online, one on one quran classes for kids, quran classes for children, kids quran tutor, quran for kids online, quran learning for kids, quran classes for kids near me, online quran classes for beginners kids"
    canonical="https://alhamdacademy.net/quran-classes-for-kids"
    heroTitleEn="Online Quran Classes for Kids — Fun, Engaging & Effective"
    heroTitleAr="دروس القرآن أونلاين للأطفال — ممتعة وفعالة"
    heroSubtitleEn="Certified Child-Specialist Teachers Who Make Quran Learning Exciting"
    heroSubtitleAr="معلمون متخصصون بالأطفال يجعلون تعلم القرآن مثيراً"
    heroDescEn="Give your child the gift of Quran education with teachers who understand how children learn. Our kid-friendly online Quran classes use games, rewards, and interactive tools to keep young learners engaged while building strong Quran reading foundations."
    heroDescAr="امنح طفلك هدية تعلم القرآن مع معلمين يفهمون كيف يتعلم الأطفال. دروسنا تستخدم الألعاب والمكافآت والأدوات التفاعلية للحفاظ على تفاعل المتعلمين الصغار."
    aboutTitleEn="Why Parents Choose Alhamd Academy for Their Children's Quran Education"
    aboutTitleAr="لماذا يختار الآباء أكاديمية الحمد لتعليم أطفالهم القرآن"
    aboutContentEn={[
      "Finding the right Quran teacher for your child is one of the most important decisions you'll make as a Muslim parent. The teacher needs to be patient, engaging, qualified, and able to connect with children in a way that makes them love the Quran — not fear it.",
      "At Alhamd Academy, our kids' Quran teachers are not just qualified in Quran recitation and Tajweed — they are specifically trained to teach children. They understand child psychology, attention spans, and learning styles. They know when to push and when to praise, when to play and when to practice.",
      "Our online Quran classes for kids are designed around how children actually learn: short sessions (20–30 minutes), frequent activity changes, visual and auditory teaching methods, gamification with points and rewards, and constant positive reinforcement.",
      "We serve families from 8+ countries who don't have access to quality local Quran teachers. Parents in the USA, Canada, UK, Australia, and Europe trust us because their children are learning faster, enjoying their classes, and developing a genuine love for the Quran.",
      "Every child gets a personalized learning plan based on their age, current level, and learning pace. Whether your child is 4 years old and starting from the Arabic alphabet or 12 years old and ready for Hifz, we have the right program and teacher for them.",
    ]}
    aboutContentAr={[
      "إيجاد معلم القرآن المناسب لطفلك من أهم القرارات التي ستتخذها كوالد مسلم. المعلم يحتاج أن يكون صبوراً وجذاباً ومؤهلاً وقادراً على التواصل مع الأطفال بطريقة تجعلهم يحبون القرآن.",
      "في أكاديمية الحمد، معلمو القرآن للأطفال ليسوا مؤهلين في التلاوة والتجويد فحسب — بل مدربون خصيصاً لتعليم الأطفال. يفهمون نفسية الطفل ومدى انتباهه وأساليب تعلمه.",
      "دروسنا مصممة حول الطريقة التي يتعلم بها الأطفال فعلاً: جلسات قصيرة (20–30 دقيقة)، تغيير أنشطة متكرر، طرق بصرية وسمعية، ألعاب بنقاط ومكافآت.",
      "نخدم عائلات من 8+ دول ليس لديها معلمي قرآن محليين مؤهلين. الآباء في أمريكا وكندا وبريطانيا وأستراليا وأوروبا يثقون بنا لأن أطفالهم يتعلمون أسرع ويستمتعون بحصصهم.",
      "كل طفل يحصل على خطة تعلم مخصصة بناءً على عمره ومستواه الحالي وسرعة تعلمه. سواء كان طفلك 4 سنوات يبدأ من الحروف أو 12 سنة جاهز للحفظ.",
    ]}
    methodTitleEn="Our Child-Friendly Teaching Approach"
    methodTitleAr="نهجنا التعليمي الصديق للأطفال"
    methodContentEn={[
      "We use the Noor Al-Bayan method adapted specifically for children. Instead of dry repetition, our teachers incorporate songs, visual patterns, and hands-on activities that help children internalize Arabic letter sounds naturally.",
      "Each child's session is structured around the '3-3-3 rule': 3 minutes of review, 3 minutes of new material, 3 minutes of practice — then cycle. This keeps the learning fresh and prevents boredom.",
      "Our digital classroom tools include interactive whiteboards where children can draw letters, point-and-click quizzes, and a reward system where kids earn stars and badges for milestones. Children actually ask their parents for more Quran time.",
      "For parents, we provide complete transparency: a WhatsApp message after every class summarizing what was taught, how the child performed, and what to practice. Monthly progress reports show measurable improvement in reading accuracy.",
    ]}
    methodContentAr={[
      "نستخدم طريقة نور البيان المكيفة خصيصاً للأطفال. بدلاً من التكرار الجاف، معلمونا يدمجون الأناشيد والأنماط البصرية والأنشطة العملية.",
      "كل جلسة طفل مبنية حول قاعدة '3-3-3': 3 دقائق مراجعة، 3 دقائق مادة جديدة، 3 دقائق تدريب — ثم تكرار الدورة. هذا يبقي التعلم منتعشاً.",
      "أدوات فصلنا الرقمي تشمل سبورات تفاعلية يمكن للأطفال الرسم عليها، واختبارات نقر، ونظام مكافآت بنجوم وشارات. الأطفال يطلبون وقت قرآن أكثر.",
      "للوالدين، نوفر شفافية كاملة: رسالة واتساب بعد كل حصة تلخص ما تم تدريسه وأداء الطفل وما يجب التدرب عليه.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Which Age Group Is Your Child In?"
    audienceTitleAr="في أي فئة عمرية طفلك؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="What a Kids' Quran Class Looks Like — 30 Minutes of Fun Learning"
    classSessionTitleAr="كيف تبدو حصة القرآن للأطفال — 30 دقيقة من التعلم الممتع"
    challenges={CHALLENGES}
    challengesTitleEn="Parents' Top Concerns — And How We Address Them"
    challengesTitleAr="أهم مخاوف الآباء — وكيف نعالجها"
    curriculum={CURRICULUM}
    curriculumTitleEn="Kids' Quran Learning Path — From Letters to Fluent Reading"
    curriculumTitleAr="مسار تعلم القرآن للأطفال — من الحروف إلى القراءة الطلقة"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Alhamd Academy Kids' Classes vs. Others"
    comparisonTitleAr="حصص أكاديمية الحمد للأطفال مقابل الآخرين"
    deepContentTitleEn="Everything You Need to Know About Online Quran Classes for Kids"
    deepContentTitleAr="كل ما تحتاج معرفته عن دروس القرآن أونلاين للأطفال"
    deepContentEn={[
      "The decision to enroll your child in online Quran classes is increasingly popular among Muslim families living in Western countries. With limited access to qualified local Quran teachers and the convenience of learning from home, online Quran classes for kids have become the preferred choice for parents in the USA, Canada, UK, Australia, and across Europe.",
      "What makes online Quran learning particularly effective for children is the one-on-one attention they receive. In a traditional mosque class with 10–20 children, your child might get only 2–3 minutes of direct teacher interaction per hour. In our private online sessions, the entire 20–30 minutes is dedicated solely to your child — their mistakes are corrected immediately, their pace is respected, and the teaching style adapts to how they learn best.",
      "Many parents worry that young children can't learn effectively through a screen. Our experience with hundreds of students aged 4 and above proves otherwise. The key is age-appropriate session design: short sessions, frequent activity changes, interactive digital tools, and teachers who are genuinely enthusiastic about working with children. When learning feels like playing, children don't just tolerate it — they love it.",
      "The Noor Al-Bayan (Noorani Qaida) method we use is specifically designed to teach Quran reading to non-Arabic speakers. It takes a phonetic approach, teaching children to recognize and produce Arabic sounds systematically. This means your child doesn't need to understand Arabic to learn to read the Quran — they build reading ability through sound recognition, just like learning to read any language.",
      "For families considering Quran memorization (Hifz) for their children, starting early is a proven advantage. Children's brains are neurologically wired for absorption and memorization between ages 5–12. Our structured Hifz program for kids sets achievable daily targets, incorporates revision techniques that prevent forgetting, and makes memorization milestones feel like exciting achievements rather than burdens.",
    ]}
    deepContentAr={[
      "قرار تسجيل طفلك في دروس قرآن أونلاين أصبح شائعاً بين العائلات المسلمة في الدول الغربية. مع محدودية الوصول لمعلمي قرآن محليين مؤهلين وراحة التعلم من المنزل، أصبحت دروس القرآن أونلاين الخيار المفضل.",
      "ما يجعل التعلم أونلاين فعالاً بشكل خاص للأطفال هو الاهتمام الفردي. في حصة مسجد تقليدية مع 10–20 طفل، قد يحصل طفلك على 2–3 دقائق فقط من التفاعل المباشر. في جلساتنا الخاصة، الـ 20–30 دقيقة كاملة مخصصة لطفلك وحده.",
      "كثير من الآباء يقلقون أن الأطفال الصغار لا يمكنهم التعلم بفعالية عبر الشاشة. تجربتنا مع مئات الطلاب من سن 4+ تثبت العكس. المفتاح هو تصميم جلسات مناسبة للعمر ومعلمين متحمسين للعمل مع الأطفال.",
      "طريقة نور البيان التي نستخدمها مصممة خصيصاً لتعليم قراءة القرآن لغير الناطقين بالعربية. تأخذ نهجاً صوتياً يعلم الأطفال التعرف على الأصوات العربية بشكل منهجي.",
      "للعائلات التي تفكر في حفظ القرآن لأطفالها، البدء مبكراً ميزة مثبتة. أدمغة الأطفال مهيأة عصبياً للاستيعاب والحفظ بين سن 5–12.",
    ]}
    levels={[
      {
        titleEn: "Foundation Level — Learning to Read Arabic",
        titleAr: "المستوى التأسيسي — تعلم قراءة العربية",
        descEn: "For children starting from scratch with no Arabic reading ability.",
        descAr: "للأطفال الذين يبدأون من الصفر بدون قدرة قراءة عربية.",
        topicsEn: ["Arabic alphabet recognition", "Short vowels & letter connections", "Noorani Qaida completion", "Simple word reading"],
        topicsAr: ["التعرف على الحروف", "الحركات القصيرة ووصل الحروف", "إكمال القاعدة النورانية", "قراءة كلمات بسيطة"],
      },
      {
        titleEn: "Intermediate Level — Quran Reading with Tajweed",
        titleAr: "المستوى المتوسط — قراءة القرآن بالتجويد",
        descEn: "For children who can read Arabic and are ready for Quran with proper rules.",
        descAr: "للأطفال الذين يقرأون العربية وجاهزون للقرآن بالأحكام الصحيحة.",
        topicsEn: ["Reading from the Mushaf", "Basic Tajweed rules", "Juz Amma memorization", "Fluency building"],
        topicsAr: ["القراءة من المصحف", "أحكام التجويد الأساسية", "حفظ جزء عم", "بناء الطلاقة"],
      },
      {
        titleEn: "Advanced Level — Hifz & Advanced Tajweed",
        titleAr: "المستوى المتقدم — الحفظ والتجويد المتقدم",
        descEn: "For children ready to begin structured Quran memorization.",
        descAr: "للأطفال الجاهزين لبدء الحفظ المنظم.",
        topicsEn: ["Structured Hifz program", "Advanced Tajweed application", "Daily revision system", "Progress milestone tracking"],
        topicsAr: ["برنامج حفظ منظم", "تطبيق التجويد المتقدم", "نظام مراجعة يومي", "تتبع معالم التقدم"],
      },
    ]}
    outcomesEn={[
      "Read Quran independently with proper pronunciation",
      "Apply basic Tajweed rules naturally while reading",
      "Memorize Juz Amma and key Surahs for daily prayer",
      "Develop genuine love and connection with the Quran",
      "Build confidence in reciting Quran in front of others",
      "Receive structured progress certificates at each milestone",
    ]}
    outcomesAr={[
      "قراءة القرآن بشكل مستقل مع النطق الصحيح",
      "تطبيق أحكام التجويد الأساسية بشكل طبيعي",
      "حفظ جزء عم والسور الأساسية للصلاة اليومية",
      "تطوير حب حقيقي وارتباط بالقرآن",
      "بناء الثقة في التلاوة أمام الآخرين",
      "الحصول على شهادات تقدم منظمة عند كل معلم",
    ]}
    featuresEn={[
      "Certified Al-Azhar teachers trained specifically for children",
      "Age-appropriate session lengths (20–30 minutes)",
      "Interactive games, rewards, and digital stickers",
      "WhatsApp progress reports after every class",
      "Both male and female teachers available",
      "Family discounts for multiple children",
      "24/7 flexible scheduling across all time zones",
      "Free trial class with no commitment required",
    ]}
    featuresAr={[
      "معلمون معتمدون من الأزهر مدربون خصيصاً للأطفال",
      "مدة جلسات مناسبة للعمر (20–30 دقيقة)",
      "ألعاب تفاعلية ومكافآت وملصقات رقمية",
      "تقارير تقدم عبر واتساب بعد كل حصة",
      "معلمون ومعلمات متاحون",
      "خصومات عائلية لعدة أطفال",
      "مواعيد مرنة 24/7 في جميع المناطق الزمنية",
      "حصة تجريبية مجانية بدون التزام",
    ]}
    faqs={[
      { questionEn: "What age can my child start online Quran classes?", questionAr: "من أي عمر يمكن لطفلي البدء؟", answerEn: "We accept students from age 4. For children aged 4–6, we use shorter 15–20 minute sessions with heavy emphasis on play-based learning. Children aged 7+ typically do 25–30 minute sessions.", answerAr: "نقبل طلاباً من سن 4 سنوات. للأطفال 4–6، نستخدم جلسات 15–20 دقيقة مع تركيز على التعلم باللعب. الأطفال 7+ عادة 25–30 دقيقة." },
      { questionEn: "Do you have female teachers for my daughter?", questionAr: "هل لديكم معلمات لابنتي؟", answerEn: "Yes. We have qualified female Quran teachers (Hafidhat with Ijazah) available for girls and young women. Many parents specifically request female teachers for their daughters.", answerAr: "نعم. لدينا معلمات قرآن مؤهلات (حافظات بإجازة) للبنات. كثير من الآباء يطلبون معلمات خصيصاً لبناتهم." },
      { questionEn: "How many classes per week do you recommend for kids?", questionAr: "كم حصة في الأسبوع توصون بها للأطفال؟", answerEn: "We recommend 3–5 classes per week for best results. Consistency matters more than session length. Even 20-minute daily sessions produce faster progress than one long weekly session.", answerAr: "نوصي بـ 3–5 حصص أسبوعياً لأفضل النتائج. الانتظام أهم من مدة الجلسة. حتى جلسات 20 دقيقة يومية تنتج تقدماً أسرع." },
      { questionEn: "What if my child doesn't like the teacher?", questionAr: "ماذا لو لم يحب طفلي المعلم؟", answerEn: "Teacher-student chemistry is crucial for children. If your child isn't connecting with their assigned teacher, we offer a free teacher change — no questions asked. We want your child to love their Quran time.", answerAr: "التوافق بين المعلم والطالب مهم جداً للأطفال. إذا لم يتوافق طفلك مع معلمه، نقدم تغيير معلم مجاني — بدون أسئلة." },
      { questionEn: "How much do kids' Quran classes cost?", questionAr: "كم تكلفة حصص القرآن للأطفال؟", answerEn: "Our plans start from $57/month for 8 sessions. We offer family discounts for siblings. Check our pricing page for detailed plans or contact us on WhatsApp for a custom quote.", answerAr: "خططنا تبدأ من 57$/شهرياً لـ 8 حصص. نقدم خصومات عائلية للأشقاء. راجع صفحة الأسعار أو تواصل معنا عبر واتساب." },
      { questionEn: "Can I sit with my child during the class?", questionAr: "هل يمكنني الجلوس مع طفلي أثناء الحصة؟", answerEn: "Absolutely. Parents are welcome to observe any class. For younger children (4–6), we actually encourage parent presence in the first few sessions until the child is comfortable with the teacher.", answerAr: "بالتأكيد. الآباء مرحب بهم في أي حصة. للأطفال الأصغر (4–6)، نشجع وجود الوالدين في الجلسات الأولى حتى يرتاح الطفل مع المعلم." },
    ]}
    testimonials={[
      { name: "Sarah M.", country: "USA", textEn: "My 5-year-old daughter was scared of Quran class after a bad experience with a local teacher. Alhamd Academy's teacher was so patient and fun — now my daughter asks for extra Quran time!", textAr: "ابنتي ذات الـ 5 سنوات كانت خائفة من حصة القرآن. معلمة أكاديمية الحمد كانت صبورة وممتعة — الآن ابنتي تطلب وقت قرآن إضافي!", rating: 5 },
      { name: "Ahmed K.", country: "Canada", textEn: "Both my sons (7 and 9) have been taking classes for 6 months. Their reading improved dramatically. The after-class WhatsApp reports are amazing for tracking progress.", textAr: "ولداي (7 و9 سنوات) يأخذون دروساً منذ 6 أشهر. قراءتهم تحسنت بشكل كبير. تقارير واتساب بعد كل حصة ممتازة لمتابعة التقدم.", rating: 5 },
      { name: "Fatima R.", country: "UK", textEn: "We tried 3 different online Quran schools before finding Alhamd Academy. The difference is night and day — the teachers actually know how to teach kids, not just adults.", textAr: "جربنا 3 مدارس قرآن أونلاين قبل إيجاد أكاديمية الحمد. الفرق كبير جداً — المعلمون فعلاً يعرفون كيف يعلمون الأطفال وليس فقط الكبار.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Online Quran Classes for Kids",
      "description": "Fun, engaging online Quran classes for kids ages 4–14 with certified child-specialist teachers from Al-Azhar University.",
      "provider": { "@type": "Organization", "name": "Alhamd Academy", "url": "https://alhamdacademy.net" },
      "educationalLevel": "Beginner to Intermediate",
      "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Children ages 4-14" },
      "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    }}
  />
);

export default QuranClassesForKids;
