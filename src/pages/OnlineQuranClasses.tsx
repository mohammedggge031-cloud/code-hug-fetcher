import { Users, Star, Award, Clock, Baby, GraduationCap, UserCheck, Heart, RefreshCw, Globe } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Tajweed Course Online", titleAr: "دورة التجويد أونلاين", href: "/tajweed-course-online" },
  { titleEn: "Quran Memorization (Hifz)", titleAr: "حفظ القرآن", href: "/quran-memorization-hifz" },
  { titleEn: "Arabic Classes for Kids", titleAr: "العربية للأطفال", href: "/arabic-for-kids" },
  { titleEn: "Islamic Studies Online", titleAr: "الدراسات الإسلامية", href: "/islamic-studies-online" },
  { titleEn: "Female Quran Teacher", titleAr: "معلمة قرآن", href: "/female-quran-teacher" },
  { titleEn: "Ijazah Program Online", titleAr: "برنامج الإجازة", href: "/ijazah-program" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Parents of Young Children (Ages 4–10)",
    titleAr: "آباء الأطفال الصغار (4–10 سنوات)",
    descEn: "Your child is growing up in a non-Arabic-speaking environment and you want them to build a strong Quran reading foundation early. Our teachers use games, rewards, and short engaging sessions designed specifically for young learners who can't sit still for long.",
    descAr: "طفلك ينشأ في بيئة غير عربية وتريد أن يبني أساساً قوياً في قراءة القرآن مبكراً. معلمونا يستخدمون الألعاب والمكافآت وجلسات قصيرة مصممة خصيصاً للأطفال.",
  },
  {
    icon: GraduationCap,
    titleEn: "Teenagers & University Students",
    titleAr: "المراهقون وطلاب الجامعات",
    descEn: "You learned some Quran as a child but stopped. Now you want to restart and actually understand Tajweed rules, not just repeat sounds. Our flexible scheduling fits around school and university hours.",
    descAr: "تعلمت بعض القرآن في الصغر لكن توقفت. الآن تريد إعادة البدء وفهم التجويد فعلياً. مواعيدنا المرنة تتناسب مع الدراسة.",
  },
  {
    icon: UserCheck,
    titleEn: "Working Professionals & Busy Adults",
    titleAr: "المهنيون والبالغون المشغولون",
    descEn: "You have a demanding schedule but still want to learn Quran properly. With 24/7 availability and flexible session lengths, we fit Quran learning into the busiest lifestyles — early morning, lunch breaks, or late evenings.",
    descAr: "لديك جدول مزدحم لكنك تريد تعلم القرآن بشكل صحيح. مع التوفر 24/7 وحصص مرنة، ندمج تعلم القرآن في أكثر الجداول ازدحاماً.",
  },
  {
    icon: Heart,
    titleEn: "Sisters Seeking Female Teachers",
    titleAr: "الأخوات اللواتي يبحثن عن معلمات",
    descEn: "You prefer learning from a qualified female Quran teacher in a comfortable, private environment. All our female teachers are Hafidhat with Ijazah certification and specialize in teaching non-Arabic speaking sisters.",
    descAr: "تفضلين التعلم من معلمة قرآن مؤهلة في بيئة مريحة وخاصة. جميع معلماتنا حافظات وحاصلات على إجازة ومتخصصات في تعليم غير الناطقات بالعربية.",
  },
  {
    icon: RefreshCw,
    titleEn: "New Muslims (Reverts)",
    titleAr: "المسلمون الجدد",
    descEn: "You've recently embraced Islam and want to learn Quran from scratch. Our teachers are trained to teach complete beginners with patience and zero judgment — starting from the Arabic alphabet all the way to reading full Surahs.",
    descAr: "اعتنقت الإسلام مؤخراً وتريد تعلم القرآن من الصفر. معلمونا مدربون على تعليم المبتدئين تماماً بصبر — من الحروف العربية حتى قراءة سور كاملة.",
  },
  {
    icon: Globe,
    titleEn: "Families Living Abroad",
    titleAr: "العائلات المقيمة بالخارج",
    descEn: "You live in a country with no local mosque classes or qualified teachers nearby. Our online Quran classes bring certified Al-Azhar teachers directly to your home — no commute, no waiting lists, and family discounts for multiple children.",
    descAr: "تعيش في بلد ليس فيه دروس مسجد محلية أو معلمون مؤهلون بالقرب منك. دروسنا تجلب معلمين معتمدين من الأزهر مباشرة إلى بيتك — بدون تنقل وخصومات عائلية.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Warm-up & Quran Recitation Review",
    titleAr: "إحماء ومراجعة التلاوة",
    descEn: "The session opens with the student reciting what they practiced since the last class. The teacher listens carefully, noting pronunciation strengths and areas needing correction. This builds confidence and ensures retention before moving forward.",
    descAr: "تبدأ الحصة بتلاوة الطالب لما تدرب عليه منذ الحصة السابقة. يستمع المعلم بعناية ويسجل نقاط القوة والمجالات التي تحتاج تصحيح. هذا يبني الثقة ويضمن الاستيعاب قبل المضي قدماً.",
  },
  {
    titleEn: "Targeted Error Correction",
    titleAr: "تصحيح الأخطاء المستهدف",
    descEn: "The teacher identifies the top 2–3 mistakes from the review and works on them using repetition, comparison with similar sounds, and real-time demonstration. For example: distinguishing between ص and س, or applying the correct Madd length.",
    descAr: "يحدد المعلم أهم 2–3 أخطاء من المراجعة ويعمل عليها باستخدام التكرار والمقارنة مع أصوات مشابهة والتوضيح الفوري. مثلاً: التمييز بين ص وس أو تطبيق طول المد الصحيح.",
  },
  {
    titleEn: "New Material Introduction",
    titleAr: "تقديم المادة الجديدة",
    descEn: "New content is introduced based on the student's curriculum stage — whether that's new letters in Noorani Qaida, a new Tajweed rule with examples, or new verses for memorization. The teacher explains the rule, demonstrates it, then has the student practice immediately.",
    descAr: "يتم تقديم محتوى جديد بناءً على مرحلة الطالب — سواء حروف جديدة في القاعدة النورانية، أو قاعدة تجويد جديدة مع أمثلة، أو آيات جديدة للحفظ. يشرح المعلم القاعدة ويوضحها ثم يطلب من الطالب التطبيق فوراً.",
  },
  {
    titleEn: "Interactive Practice & Application",
    titleAr: "التدريب التفاعلي والتطبيق",
    descEn: "The student applies what they just learned by reading from the Mushaf or practice book. The teacher uses screen sharing, digital whiteboards, and highlighting tools to make the practice visual and engaging. For kids, this includes games and reward points.",
    descAr: "يطبق الطالب ما تعلمه بالقراءة من المصحف أو كتاب التدريب. يستخدم المعلم مشاركة الشاشة والسبورة الرقمية لجعل التدريب بصرياً وممتعاً. للأطفال يشمل ألعاب ونقاط مكافآت.",
  },
  {
    titleEn: "Homework & Next Steps",
    titleAr: "الواجب والخطوات التالية",
    descEn: "The teacher assigns specific practice tasks — which verses to review, which Tajweed rule to focus on, or which page in Noorani Qaida to prepare. Parents receive a brief progress note after each class for children's sessions.",
    descAr: "يحدد المعلم مهام تدريبية محددة — أي آيات تُراجع، أي قاعدة تجويد يُركز عليها، أو أي صفحة في القاعدة النورانية تُحضّر. يتلقى الآباء ملاحظة تقدم مختصرة بعد كل حصة لجلسات الأطفال.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"I can't tell the difference between ض and ظ, or between ص and س\"",
    problemAr: "\"لا أستطيع التمييز بين ض وظ، أو بين ص وس\"",
    solutionEn: "Our teachers use a technique called 'Sound Pairing' — they pronounce both letters side by side repeatedly, showing the exact tongue position and airflow difference. Most students can hear and reproduce the difference within 2–3 sessions.",
    solutionAr: "معلمونا يستخدمون تقنية 'المقارنة الصوتية' — ينطقون الحرفين جنباً إلى جنب بشكل متكرر، مع توضيح وضع اللسان وفرق تدفق الهواء. معظم الطلاب يستطيعون سماع وإنتاج الفرق خلال 2–3 جلسات.",
  },
  {
    problemEn: "\"My child gets bored and won't sit through a Quran class\"",
    problemAr: "\"طفلي يشعر بالملل ولا يستطيع إكمال حصة القرآن\"",
    solutionEn: "Young kids get shorter, age-appropriate sessions with built-in games, sticker rewards, and animated quizzes. Our teachers switch activities frequently to match a child's natural attention span. Parents are amazed at how engaged their kids become.",
    solutionAr: "الأطفال الصغار يحصلون على جلسات قصيرة مناسبة لعمرهم مع ألعاب ومكافآت ملصقات واختبارات متحركة. معلمونا يغيرون الأنشطة باستمرار لتتناسب مع مدى انتباه الطفل الطبيعي.",
  },
  {
    problemEn: "\"I know the Tajweed rules in theory but can't apply them when reading\"",
    problemAr: "\"أعرف أحكام التجويد نظرياً لكن لا أستطيع تطبيقها أثناء القراءة\"",
    solutionEn: "This is the most common issue we see. Theory without practice leads to paralysis. Our teachers use 'Rule Spotting' exercises where you read a passage and identify where each rule applies before reciting. This bridges the gap between knowing and doing.",
    solutionAr: "هذه أكثر مشكلة شائعة نراها. النظرية بدون تطبيق تؤدي للجمود. معلمونا يستخدمون تمارين 'اكتشاف القاعدة' حيث تقرأ مقطعاً وتحدد أين تطبق كل قاعدة قبل التلاوة.",
  },
  {
    problemEn: "\"I tried group classes but the pace was too fast / too slow for me\"",
    problemAr: "\"جربت دروساً جماعية لكن السرعة كانت سريعة / بطيئة جداً بالنسبة لي\"",
    solutionEn: "Every class at Alhamd Academy is one-on-one. Your teacher adapts the pace entirely to you — spending extra time where you struggle and moving faster through what you already know. No one holds you back and no one pushes you forward before you're ready.",
    solutionAr: "كل حصة في أكاديمية الحمد فردية. معلمك يكيّف السرعة تماماً لك — يقضي وقتاً إضافياً فيما تجد صعوبة ويتقدم أسرع فيما تعرفه بالفعل.",
  },
  {
    problemEn: "\"I'm embarrassed to read Quran in front of others — I make too many mistakes\"",
    problemAr: "\"أخجل من قراءة القرآن أمام الآخرين — أرتكب أخطاء كثيرة\"",
    solutionEn: "In a private one-on-one environment, there is zero judgment. Our teachers create a safe space where mistakes are welcomed as learning opportunities. Many adult students tell us they feel comfortable reading Quran for the first time in their lives.",
    solutionAr: "في بيئة فردية خاصة، لا يوجد أي حكم. معلمونا يخلقون مساحة آمنة حيث الأخطاء مرحب بها كفرص للتعلم. كثير من الطلاب البالغين يخبروننا أنهم يشعرون بالراحة في قراءة القرآن لأول مرة.",
  },
  {
    problemEn: "\"The time zones don't work — I can't find a teacher available at my hours\"",
    problemAr: "\"المناطق الزمنية لا تناسب — لا أجد معلماً متاحاً في أوقاتي\"",
    solutionEn: "With 20+ teachers across different schedules, we cover all time zones 24/7. Whether you need classes at 5 AM or 11 PM, we have a qualified teacher ready. We also offer easy rescheduling if your schedule changes.",
    solutionAr: "مع 20+ معلم بجداول مختلفة، نغطي جميع المناطق الزمنية 24/7. سواء احتجت حصصاً الساعة 5 صباحاً أو 11 مساءً، لدينا معلم مؤهل جاهز. نقدم أيضاً إعادة جدولة سهلة.",
  },
];

const CURRICULUM: CurriculumWeek[] = [
  {
    weekEn: "Weeks 1–4",
    weekAr: "الأسابيع 1–4",
    topicEn: "Arabic Letters & Basic Sounds (Noorani Qaida)",
    topicAr: "الحروف العربية والأصوات الأساسية (القاعدة النورانية)",
    detailsEn: [
      "Recognition and pronunciation of all 28 Arabic letters",
      "Understanding letter forms (initial, medial, final, isolated)",
      "Short vowels (Fatha, Kasra, Damma) and their sounds",
      "Sukoon and basic letter connections",
      "Practice reading 2–3 letter words from Noorani Qaida",
    ],
    detailsAr: [
      "التعرف على جميع الحروف العربية الـ 28 ونطقها",
      "فهم أشكال الحروف (أول، وسط، آخر، منفصل)",
      "الحركات القصيرة (الفتحة، الكسرة، الضمة) وأصواتها",
      "السكون ووصل الحروف الأساسي",
      "تدريب على قراءة كلمات من 2–3 حروف من القاعدة النورانية",
    ],
  },
  {
    weekEn: "Weeks 5–8",
    weekAr: "الأسابيع 5–8",
    topicEn: "Tanween, Shaddah & Longer Words",
    topicAr: "التنوين والشدة والكلمات الأطول",
    detailsEn: [
      "Tanween (double vowels) — Fathatayn, Kasratayn, Dammatayn",
      "Shaddah (doubled consonant) and its correct pronunciation",
      "Madd letters (Alif, Waw, Ya) and natural elongation",
      "Reading multi-syllable words fluently",
      "Introduction to reading short Quranic phrases",
    ],
    detailsAr: [
      "التنوين — فتحتين، كسرتين، ضمتين",
      "الشدة ونطقها الصحيح",
      "حروف المد (الألف، الواو، الياء) والمد الطبيعي",
      "قراءة كلمات متعددة المقاطع بطلاقة",
      "مقدمة لقراءة عبارات قرآنية قصيرة",
    ],
  },
  {
    weekEn: "Weeks 9–16",
    weekAr: "الأسابيع 9–16",
    topicEn: "Reading from the Mushaf & Basic Tajweed",
    topicAr: "القراءة من المصحف والتجويد الأساسي",
    detailsEn: [
      "Transition from Noorani Qaida to reading directly from the Mushaf",
      "Noon Sakinah and Tanween rules (Izhar, Idgham, Iqlab, Ikhfa)",
      "Meem Sakinah rules",
      "Stopping and starting rules (Waqf & Ibtida)",
      "Practice reading Juz 'Amma (30th Juz) with Tajweed",
      "Recording and self-evaluation exercises",
    ],
    detailsAr: [
      "الانتقال من القاعدة النورانية للقراءة مباشرة من المصحف",
      "أحكام النون الساكنة والتنوين (إظهار، إدغام، إقلاب، إخفاء)",
      "أحكام الميم الساكنة",
      "أحكام الوقف والابتداء",
      "تدريب على قراءة جزء عمّ مع التجويد",
      "تمارين التسجيل والتقييم الذاتي",
    ],
  },
  {
    weekEn: "Weeks 17–24",
    weekAr: "الأسابيع 17–24",
    topicEn: "Intermediate Tajweed & Fluent Recitation",
    topicAr: "التجويد المتوسط والتلاوة الطلقة",
    detailsEn: [
      "All Madd types (natural, connected, separated, compulsory, permissible)",
      "Qalqalah rules and their degrees",
      "Heavy and light letters (Tafkheem & Tarqeeq)",
      "Laam rules in Allah's name",
      "Fluent reading of selected Surahs from different Juz",
      "Introduction to Maqamat (melodic recitation styles)",
    ],
    detailsAr: [
      "جميع أنواع المد (طبيعي، متصل، منفصل، لازم، جائز)",
      "أحكام القلقلة ودرجاتها",
      "الحروف المفخمة والمرققة (التفخيم والترقيق)",
      "أحكام لام لفظ الجلالة",
      "قراءة طلقة لسور مختارة من أجزاء مختلفة",
      "مقدمة في المقامات (أساليب التلاوة اللحنية)",
    ],
  },
  {
    weekEn: "Weeks 25+",
    weekAr: "الأسابيع 25+",
    topicEn: "Advanced Recitation, Hifz Track, or Ijazah Preparation",
    topicAr: "التلاوة المتقدمة، مسار الحفظ، أو التحضير للإجازة",
    detailsEn: [
      "Students choose their advanced track: Hifz (memorization) or Ijazah",
      "Hifz track: structured memorization schedule with daily review system",
      "Ijazah track: perfecting recitation for chain-of-narration certification",
      "Advanced Tajweed application in continuous reading",
      "Learning different Qiraat (recitation styles) upon request",
      "Teaching methodology training for students who want to teach others",
    ],
    detailsAr: [
      "الطلاب يختارون مسارهم المتقدم: الحفظ أو الإجازة",
      "مسار الحفظ: جدول حفظ منظم مع نظام مراجعة يومي",
      "مسار الإجازة: إتقان التلاوة للحصول على شهادة السند",
      "تطبيق التجويد المتقدم في القراءة المتصلة",
      "تعلم القراءات المختلفة حسب الطلب",
      "تدريب على منهجية التدريس للطلاب الذين يريدون تعليم الآخرين",
    ],
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    featureEn: "Class Format",
    featureAr: "نوع الحصة",
    usEn: "✅ 100% One-on-One",
    usAr: "✅ فردية 100%",
    othersEn: "❌ Group classes (5–20 students)",
    othersAr: "❌ حصص جماعية (5–20 طالب)",
  },
  {
    featureEn: "Teacher Qualification",
    featureAr: "مؤهلات المعلم",
    usEn: "✅ Al-Azhar certified with Ijazah",
    usAr: "✅ معتمد من الأزهر بإجازة",
    othersEn: "⚠️ Varies — often unverified",
    othersAr: "⚠️ متفاوت — غالباً غير موثق",
  },
  {
    featureEn: "Teaching Method",
    featureAr: "طريقة التدريس",
    usEn: "✅ Noor Al-Bayan (structured & proven)",
    usAr: "✅ نور البيان (منهجي ومثبت)",
    othersEn: "⚠️ No standard method",
    othersAr: "⚠️ بدون طريقة موحدة",
  },
  {
    featureEn: "Scheduling Flexibility",
    featureAr: "مرونة المواعيد",
    usEn: "✅ 24/7 — any timezone",
    usAr: "✅ 24/7 — أي منطقة زمنية",
    othersEn: "❌ Fixed time slots only",
    othersAr: "❌ أوقات محددة فقط",
  },
  {
    featureEn: "Progress Reports",
    featureAr: "تقارير التقدم",
    usEn: "✅ After every class",
    usAr: "✅ بعد كل حصة",
    othersEn: "❌ Monthly or none",
    othersAr: "❌ شهرياً أو بدون",
  },
  {
    featureEn: "Price Per Hour",
    featureAr: "السعر بالساعة",
    usEn: "✅ Starting from $6/hr",
    usAr: "✅ يبدأ من 6$/الساعة",
    othersEn: "⚠️ $12–25/hr average",
    othersAr: "⚠️ 12–25$/الساعة متوسط",
  },
  {
    featureEn: "Free Trial",
    featureAr: "حصة تجريبية مجانية",
    usEn: "✅ Yes — no payment needed",
    usAr: "✅ نعم — بدون دفع",
    othersEn: "⚠️ Often requires credit card",
    othersAr: "⚠️ غالباً تتطلب بطاقة ائتمان",
  },
  {
    featureEn: "Male & Female Teachers",
    featureAr: "معلمون ومعلمات",
    usEn: "✅ Both available on request",
    usAr: "✅ متاحون حسب الطلب",
    othersEn: "⚠️ Limited female teachers",
    othersAr: "⚠️ معلمات محدودات",
  },
];

const DEEP_CONTENT_EN = [
  "The journey of learning Quran online has evolved dramatically over the past decade. What was once limited to in-person sessions at local mosques or with visiting scholars is now accessible from anywhere in the world through professional online Quran academies. At Alhamd Academy, we've been at the forefront of this transformation, combining centuries-old Islamic teaching traditions with cutting-edge digital tools to deliver an unmatched online Quran learning experience.",

  "One of the biggest misconceptions about online Quran classes is that they lack the personal connection of face-to-face learning. In reality, one-on-one online Quran classes actually provide MORE personal attention than traditional group settings. In a mosque class with 15–20 students, each learner might get only a few minutes of direct teacher attention per session. In our private online Quran classes, the entire session is dedicated entirely to one student — their specific mistakes, their pace, their goals.",

  "The Noor Al-Bayan method (also known as Noorani Qaida) that we use has been refined over decades by Islamic scholars specifically for teaching non-Arabic speakers. Unlike methods that jump straight into reading the Mushaf, Noor Al-Bayan takes a systematic approach: students first master individual letter sounds, then letter combinations, then words, then sentences, and finally full Quranic passages. Each step builds on the previous one, ensuring no gaps in understanding.",

  "For parents considering online Quran classes for their children, the research is clear: one-on-one instruction produces significantly faster progress than group classes. A child learning in a private setting completes the Noorani Qaida much faster than in a group setting. This is because the teacher can immediately correct mistakes, adapt the pace to the child's understanding, and use teaching strategies that match the individual child's learning style.",

  "Adults learning Quran online face a different set of challenges. Many adult learners feel self-conscious about their reading level, especially if they grew up Muslim but never had proper Quran instruction. Others are revert Muslims starting from zero. In both cases, the privacy of one-on-one online sessions removes the embarrassment factor entirely. Our adult students consistently report that they feel more comfortable and motivated in private classes compared to any group setting they've tried before.",

  "The technology behind effective online Quran classes matters more than most people realize. A good online Quran teacher needs crystal-clear audio (so students can hear the subtle differences between similar Arabic letters), reliable video (so they can see mouth positions for correct Makharij), and interactive tools (digital whiteboards, screen sharing, and mushaf annotation) to make lessons visual and engaging. At Alhamd Academy, all our teachers use professional audio equipment and have been trained in using digital teaching tools effectively.",

  "When evaluating online Quran academies, parents and students should look for several key indicators of quality: Are the teachers native Arabic speakers? Do they hold Ijazah certification? What teaching methodology do they follow? How is student progress tracked? Is the scheduling truly flexible? At Alhamd Academy, we meet all these criteria and more — which is why we maintain a 4.9/5 student satisfaction rating across 200+ active students from 8+ countries.",

  "The long-term benefits of consistent online Quran classes extend far beyond just learning to read Arabic text. Students develop a deep spiritual connection with the words of Allah, gain confidence in leading prayer, build discipline through regular study habits, and often go on to pursue advanced goals like Quran memorization (Hifz) or Ijazah certification. Many of our students who started as complete beginners are now on the path to becoming Huffadh — a journey that begins with a single free trial class.",
];

const DEEP_CONTENT_AR = [
  "تطورت رحلة تعلم القرآن أونلاين بشكل كبير خلال العقد الماضي. ما كان محصوراً في الجلسات الحضورية بالمساجد المحلية أصبح الآن متاحاً من أي مكان في العالم من خلال أكاديميات القرآن المهنية عبر الإنترنت. في أكاديمية الحمد، نجمع بين تقاليد التعليم الإسلامي العريقة وأحدث الأدوات الرقمية لتقديم تجربة تعلم قرآن لا مثيل لها.",

  "من أكبر المفاهيم الخاطئة عن دروس القرآن أونلاين أنها تفتقر للتواصل الشخصي. في الواقع، الدروس الفردية أونلاين توفر اهتماماً شخصياً أكثر من الحضوري. في حصة مسجد مع 15–20 طالب، كل متعلم قد يحصل على دقائق قليلة فقط من انتباه المعلم المباشر. في دروسنا الخاصة، الجلسة كاملة مخصصة لطالب واحد.",

  "طريقة نور البيان (القاعدة النورانية) التي نستخدمها صُقلت على مدى عقود بواسطة علماء إسلاميين خصيصاً لتعليم غير الناطقين بالعربية. بخلاف الطرق التي تقفز مباشرة لقراءة المصحف، نور البيان يأخذ نهجاً منهجياً: أصوات الحروف الفردية أولاً، ثم مجموعات الحروف، ثم الكلمات، ثم الجمل، وأخيراً مقاطع قرآنية كاملة.",

  "للآباء الذين يفكرون في دروس القرآن أونلاين لأطفالهم: الأبحاث واضحة — التعليم الفردي ينتج تقدماً أسرع بكثير من الحصص الجماعية. طفل يتعلم في جلسة خاصة يكمل القاعدة النورانية أسرع بكثير من البيئة الجماعية.",

  "البالغون الذين يتعلمون القرآن أونلاين يواجهون تحديات مختلفة. كثير من المتعلمين البالغين يشعرون بالحرج من مستوى قراءتهم. خصوصية الجلسات الفردية تزيل عامل الإحراج تماماً. طلابنا البالغون يؤكدون أنهم يشعرون براحة ودافعية أكبر في الحصص الخاصة مقارنة بأي بيئة جماعية جربوها.",

  "التكنولوجيا وراء دروس القرآن الفعالة أونلاين أهم مما يدرك معظم الناس. معلم القرآن الجيد يحتاج صوتاً واضحاً تماماً حتى يسمع الطلاب الفروقات الدقيقة بين الحروف المتشابهة، وفيديو موثوق ليروا أوضاع الفم للمخارج الصحيحة، وأدوات تفاعلية. في أكاديمية الحمد، جميع معلمينا يستخدمون معدات صوتية احترافية.",

  "عند تقييم أكاديميات القرآن أونلاين، يجب على الآباء والطلاب البحث عن مؤشرات جودة: هل المعلمون متحدثون أصليون للعربية؟ هل يحملون إجازة؟ ما المنهجية المتبعة؟ كيف يُتابع تقدم الطالب؟ في أكاديمية الحمد، نحقق كل هذه المعايير وأكثر — لهذا نحافظ على تقييم 4.9/5.",

  "الفوائد طويلة المدى لدروس القرآن المنتظمة أونلاين تتجاوز مجرد تعلم قراءة النص العربي. يطور الطلاب ارتباطاً روحياً عميقاً بكلام الله، ويكتسبون ثقة في إمامة الصلاة، ويبنون انضباطاً من خلال عادات دراسية منتظمة. كثير من طلابنا الذين بدأوا كمبتدئين تماماً هم الآن في طريقهم ليصبحوا حفاظاً.",
];

const OnlineQuranClasses = () => (
  <ServicePageLayout
    seoTitle="Online Quran Classes for Kids & Adults | Learn Quran Online | Alhamd Academy"
    seoDescription="Learn Quran online with certified native Arabic teachers. One-on-one online Quran classes for kids and adults. Private Quran lessons online with Tajweed. Best online Quran academy. Free trial class."
    seoKeywords="online quran classes, learn quran online, quran classes online with teacher, online quran classes for adults, best online quran classes, private quran lessons online, learn quran online with tajweed, online quran classes for beginners, one on one quran classes online, online quran tutor for kids, quran teacher online, quran tutor online, online quran academy, online quran school, quran classes for kids, quran classes for adults, quran reading classes, quran recitation online, learn to read quran, noorani qaida online, learn noorani qaida"
    canonical="https://alhamdacademy.net/online-quran-classes"
    heroTitleEn="Online Quran Classes for Kids & Adults — Learn Quran Online"
    heroTitleAr="دروس القرآن أونلاين للأطفال والكبار — تعلم القرآن عبر الإنترنت"
    heroSubtitleEn="Private Quran Lessons Online with Certified Egyptian Teachers"
    heroSubtitleAr="دروس قرآن خاصة أونلاين مع معلمين مصريين معتمدين"
    heroDescEn="Join thousands of students worldwide who trust Alhamd Academy for professional one-on-one online Quran classes. Our certified native Arabic teachers from Al-Azhar University use the proven Noor Al-Bayan method to help you learn Quran online with proper Tajweed rules — whether you're a beginner or advanced learner."
    heroDescAr="انضم إلى آلاف الطلاب حول العالم الذين يثقون بأكاديمية الحمد لدروس القرآن الفردية الاحترافية أونلاين. معلمونا المعتمدون من جامعة الأزهر يستخدمون طريقة نور البيان المثبتة لمساعدتك على تعلم القرآن أونلاين مع أحكام التجويد الصحيحة."
    aboutTitleEn="Why Online Quran Classes Are the Best Choice for Learning Quran"
    aboutTitleAr="لماذا دروس القرآن أونلاين هي الخيار الأفضل لتعلم القرآن"
    aboutContentEn={[
      "In today's digital age, learning the Quran online has become the most effective and convenient way to study the Holy Quran. At Alhamd Academy, we have helped over 200 students from 8+ countries master Quran reading, recitation, and memorization through our professional online Quran classes with a dedicated teacher for every student.",
      "Our online Quran classes are designed for both kids and adults, from complete beginners who have never read Arabic to advanced students seeking Ijazah certification. Whether you want to learn to read Quran from scratch using Noorani Qaida, improve your Quran recitation with Tajweed, or start a Quran memorization program, each student receives a personalized learning plan.",
      "What sets our best online Quran classes apart is our team of certified Quran teachers who are native Arabic speakers from Egypt, graduates of prestigious Islamic universities like Al-Azhar. They bring over 7 years of teaching experience and use the renowned Noor Al-Bayan methodology to ensure rapid progress in Quran reading and recitation.",
      "Whether you're a busy parent looking for online Quran classes for your children, an adult wanting to learn Quran online with Tajweed, or a revert Muslim starting from scratch with Noorani Qaida, our flexible scheduling system allows you to learn at your own pace with private Quran lessons available 24/7.",
      "Our one-on-one Quran classes online ensure that every student receives undivided attention from their online Quran tutor. This personalized approach has proven to be significantly more effective than group classes, allowing students to progress faster in their Quran learning journey.",
    ]}
    aboutContentAr={[
      "في عصرنا الرقمي، أصبح تعلم القرآن أونلاين الطريقة الأكثر فعالية وراحة لدراسة القرآن الكريم. في أكاديمية الحمد، ساعدنا أكثر من 200 طالب من 8+ دول على إتقان قراءة القرآن وتلاوته وحفظه من خلال دروسنا الاحترافية أونلاين مع معلم مخصص لكل طالب.",
      "دروسنا مصممة للأطفال والكبار على حد سواء، من المبتدئين تماماً الذين يريدون تعلم القراءة باستخدام النورانية، إلى الطلاب المتقدمين الذين يسعون للحصول على الإجازة. كل طالب يحصل على خطة تعلم مخصصة.",
      "ما يميز دروسنا هو فريق المعلمين المعتمدين من متحدثي العربية الأصليين من مصر، خريجي جامعة الأزهر بخبرة تزيد عن 7 سنوات في تدريس القرآن.",
      "سواء كنت والداً مشغولاً تبحث عن دروس قرآن أونلاين لأطفالك، أو شخصاً بالغاً يريد تعلم القرآن بالتجويد، أو مسلماً جديداً يبدأ من القاعدة النورانية، نظام المواعيد المرن يتيح لك التعلم بالسرعة التي تناسبك.",
      "دروسنا الفردية تضمن أن كل طالب يحصل على اهتمام كامل من معلمه الخاص، مما يتيح التقدم أسرع في رحلة تعلم القرآن.",
    ]}
    methodTitleEn="How We Teach Quran Online — Our Proven Methodology"
    methodTitleAr="كيف ندرّس القرآن أونلاين — منهجيتنا المثبتة"
    methodContentEn={[
      "At Alhamd Academy, we use a comprehensive teaching methodology that combines traditional Islamic education with modern online learning techniques. Our approach is centered on the Noor Al-Bayan method (Noorani Qaida), which is widely recognized as one of the most effective methods for teaching Quran reading to beginners.",
      "Each online Quran class begins with a review of the previous lesson to reinforce learning, followed by the introduction of new material. Our online Quran tutors use interactive tools, digital whiteboards, and screen sharing to make lessons engaging and productive.",
      "We provide regular progress reports to parents and students, ensuring transparency and allowing for curriculum adjustments based on each student's learning pace. Our Quran teachers also assign homework and practice exercises to reinforce learning between classes.",
      "For younger students in our online Quran classes for kids, we incorporate gamification elements and rewards to keep them motivated. Our teachers are specially trained to work with children and know how to maintain their attention throughout the session.",
    ]}
    methodContentAr={[
      "في أكاديمية الحمد، نستخدم منهجية تدريس شاملة تجمع بين التعليم الإسلامي التقليدي وتقنيات التعلم الحديثة عبر الإنترنت. يرتكز نهجنا على طريقة نور البيان (القاعدة النورانية) المعروفة بفعاليتها في تعليم قراءة القرآن.",
      "كل حصة قرآن أونلاين تبدأ بمراجعة الدرس السابق ثم تقديم مادة جديدة. يستخدم معلمونا أدوات تفاعلية وسبورات رقمية لجعل الدروس ممتعة ومثمرة.",
      "نقدم تقارير تقدم منتظمة للآباء والطلاب لضمان الشفافية والسماح بتعديل المنهج وفقاً لسرعة تعلم كل طالب.",
      "للطلاب الأصغر سناً في دروس القرآن أونلاين للأطفال، ندمج عناصر اللعب والمكافآت للحفاظ على دافعيتهم. معلمونا مدربون خصيصاً للعمل مع الأطفال.",
    ]}
    // NEW DEEP SECTIONS
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Who Are Our Online Quran Classes Designed For?"
    audienceTitleAr="لمن صُممت دروس القرآن أونلاين لدينا؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="Inside a Typical Quran Class — What Happens in 30 Minutes"
    classSessionTitleAr="داخل حصة قرآن نموذجية — ماذا يحدث في 30 دقيقة"
    challenges={CHALLENGES}
    challengesTitleEn="Real Challenges Our Students Face — And How We Solve Them"
    challengesTitleAr="تحديات حقيقية يواجهها طلابنا — وكيف نحلها"
    curriculum={CURRICULUM}
    curriculumTitleEn="Our Step-by-Step Quran Curriculum — From Beginner to Ijazah"
    curriculumTitleAr="منهج القرآن خطوة بخطوة — من المبتدئ للإجازة"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Alhamd Academy vs. Other Online Quran Platforms"
    comparisonTitleAr="أكاديمية الحمد مقارنة بمنصات القرآن الأخرى"
    deepContentEn={DEEP_CONTENT_EN}
    deepContentAr={DEEP_CONTENT_AR}
    deepContentTitleEn="The Complete Guide to Learning Quran Online in 2025"
    deepContentTitleAr="الدليل الشامل لتعلم القرآن أونلاين في 2025"
    levels={[
      {
        titleEn: "Beginner — Learn to Read Quran with Noorani Qaida",
        titleAr: "المستوى المبتدئ — تعلم قراءة القرآن بالقاعدة النورانية",
        descEn: "For students with no prior Quran reading experience. Start from Arabic letters using Noorani Qaida and build a strong foundation for Quran reading.",
        descAr: "للطلاب بدون خبرة سابقة في قراءة القرآن. ابدأ من الحروف العربية بالقاعدة النورانية وابنِ أساساً قوياً.",
        topicsEn: ["Arabic alphabet recognition", "Letter pronunciation (Makharij)", "Connecting letters", "Short vowels (Harakat)", "Reading simple words with Noorani Qaida", "Noor Al-Bayan method basics"],
        topicsAr: ["تعرف الحروف العربية", "نطق الحروف (المخارج)", "وصل الحروف", "الحركات القصيرة", "قراءة كلمات بسيطة بالقاعدة النورانية", "أساسيات نور البيان"],
      },
      {
        titleEn: "Intermediate — Quran Reading & Basic Tajweed",
        titleAr: "المستوى المتوسط — قراءة القرآن والتجويد الأساسي",
        descEn: "For students who can read Arabic and want to improve their Quran reading fluency and learn basic Tajweed rules for proper recitation.",
        descAr: "للطلاب الذين يستطيعون قراءة العربية ويريدون تحسين طلاقتهم في قراءة القرآن وتعلم التجويد الأساسي.",
        topicsEn: ["Fluent Quran reading practice", "Basic Tajweed rules application", "Noon Sakinah & Tanween", "Madd rules", "Stopping rules (Waqf)", "Reading from Mushaf"],
        topicsAr: ["تدريب على قراءة القرآن بطلاقة", "تطبيق أحكام التجويد الأساسية", "النون الساكنة والتنوين", "أحكام المد", "أحكام الوقف", "القراءة من المصحف"],
      },
      {
        titleEn: "Advanced — Quran Recitation & Ijazah Preparation",
        titleAr: "المستوى المتقدم — تلاوة القرآن والتحضير للإجازة",
        descEn: "For students who want to perfect their Quran recitation, learn different Qiraat, and prepare for Ijazah certification.",
        descAr: "للطلاب الذين يريدون إتقان تلاوتهم وتعلم القراءات المختلفة والتحضير للإجازة.",
        topicsEn: ["Advanced Tajweed mastery", "Melodic recitation (Maqamat)", "Ijazah preparation", "Different Qiraat", "Teaching methodology", "Quran interpretation basics"],
        topicsAr: ["إتقان التجويد المتقدم", "التلاوة بالمقامات", "التحضير للإجازة", "القراءات المختلفة", "منهجية التدريس", "أساسيات التفسير"],
      },
    ]}
    outcomesEn={[
      "Read the Quran fluently with proper Arabic pronunciation",
      "Apply basic and advanced Tajweed rules in your Quran recitation",
      "Understand the meaning of commonly recited Surahs",
      "Develop a daily Quran reading habit with confidence",
      "Build confidence in leading prayer with beautiful Quran recitation",
      "Earn a certificate of completion from Alhamd Academy",
      "Connect deeply with the words of Allah through understanding",
      "Prepare for Quran memorization (Hifz) or Ijazah program",
    ]}
    outcomesAr={[
      "قراءة القرآن بطلاقة مع النطق العربي الصحيح",
      "تطبيق أحكام التجويد الأساسية والمتقدمة في تلاوتك",
      "فهم معاني السور المتلوة بشكل شائع",
      "تطوير عادة يومية لقراءة القرآن بثقة",
      "بناء الثقة في إمامة الصلاة بتلاوة جميلة",
      "الحصول على شهادة إتمام من أكاديمية الحمد",
      "التواصل العميق مع كلام الله من خلال الفهم",
      "التحضير لبرنامج حفظ القرآن أو الإجازة",
    ]}
    featuresEn={[
      "One-on-one personalized online Quran classes with your dedicated Quran teacher",
      "Certified native Arabic Quran tutors from Al-Azhar University with 7+ years experience",
      "Flexible scheduling — online Quran classes available 24/7 to fit any timezone",
      "Free trial class with no commitment — try our best online Quran classes before you decide",
      "Regular progress reports sent to parents and students",
      "Interactive digital whiteboard and screen sharing for engaging Quran lessons",
      "Affordable pricing starting from $6/hour with family discounts available",
      "Separate male and female Quran teachers available upon request",
    ]}
    featuresAr={[
      "دروس قرآن أونلاين فردية مخصصة مع معلم قرآن خاص بك",
      "معلمون قرآن معتمدون من جامعة الأزهر بخبرة 7+ سنوات",
      "مواعيد مرنة — دروس القرآن أونلاين متاحة 24/7 لتناسب أي منطقة زمنية",
      "حصة تجريبية مجانية بدون التزام — جرّب دروسنا قبل أن تقرر",
      "تقارير تقدم منتظمة ترسل للآباء والطلاب",
      "سبورة رقمية تفاعلية ومشاركة الشاشة لدروس قرآن ممتعة",
      "أسعار معقولة تبدأ من 6$/الساعة مع خصومات عائلية",
      "معلمون ومعلمات قرآن متاحون حسب الطلب",
    ]}
    faqs={[
      { questionEn: "How do online Quran classes work?", questionAr: "كيف تعمل دروس القرآن أونلاين؟", answerEn: "Our online Quran classes are conducted via Zoom or Google Meet. Each student is paired with a dedicated Quran teacher for one-on-one private lessons online. Classes typically last 30-60 minutes and can be scheduled at any time that suits you. The teacher uses screen sharing, digital whiteboards, and interactive tools to make the session engaging. After each class, you receive homework and a progress report.", answerAr: "تُجرى دروسنا عبر Zoom أو Google Meet. يتم إقران كل طالب مع معلم قرآن مخصص لدروس فردية خاصة. تستمر الحصص عادة 30-60 دقيقة ويمكن جدولتها في أي وقت يناسبك. يستخدم المعلم مشاركة الشاشة والسبورة الرقمية. بعد كل حصة تتلقى واجباً وتقرير تقدم." },
      { questionEn: "How to learn Quran online effectively?", questionAr: "كيف أتعلم القرآن أونلاين بفعالية؟", answerEn: "The most effective way to learn Quran online is through one-on-one classes with a certified Quran teacher who can provide real-time correction. At Alhamd Academy, our private Quran lessons online use the proven Noor Al-Bayan method, regular practice between sessions, and a personalized learning plan tailored to your level and goals. Consistency is key — we recommend at least 3 sessions per week for optimal progress.", answerAr: "أكثر طريقة فعالة لتعلم القرآن أونلاين هي من خلال دروس فردية مع معلم قرآن معتمد يقدم تصحيحاً فورياً. في أكاديمية الحمد، نستخدم طريقة نور البيان المثبتة مع خطة تعلم مخصصة. الاستمرارية مفتاح النجاح — ننصح بـ 3 جلسات أسبوعياً على الأقل." },
      { questionEn: "Are online Quran classes effective?", questionAr: "هل دروس القرآن أونلاين فعالة؟", answerEn: "Absolutely! Online Quran classes are highly effective, especially with one-on-one instruction. Our students consistently achieve excellent results because they receive personalized attention from their dedicated Quran tutor online. The interactive tools, screen sharing, and flexible scheduling make online learning even more convenient than in-person classes. Studies show that students in private online classes complete the Noorani Qaida 2–3x faster than those in group settings.", answerAr: "بالتأكيد! دروس القرآن أونلاين فعالة جداً خاصة مع التعليم الفردي. طلابنا يحققون نتائج ممتازة باستمرار لأنهم يحصلون على اهتمام شخصي. الدراسات تظهر أن الطلاب في الدروس الفردية يكملون القاعدة النورانية أسرع 2–3 مرات من الحصص الجماعية." },
      { questionEn: "What is the best online Quran academy?", questionAr: "ما أفضل أكاديمية قرآن أونلاين؟", answerEn: "Alhamd Academy is rated among the best online Quran academies with 4.9/5 student satisfaction. What makes us the best choice is our certified Al-Azhar teachers, personalized one-on-one classes, proven Noor Al-Bayan methodology, affordable pricing from $6/hour, and flexible scheduling. We also provide progress reports after every class and offer both male and female teachers. Book a free trial to experience the difference.", answerAr: "أكاديمية الحمد مصنفة من بين أفضل أكاديميات القرآن أونلاين بتقييم 4.9/5. ما يجعلنا الخيار الأفضل هو معلمونا المعتمدون من الأزهر، والدروس الفردية المخصصة، وأسعارنا المعقولة. نقدم أيضاً تقارير تقدم بعد كل حصة ومعلمون ومعلمات متاحون." },
      { questionEn: "What age is suitable to start online Quran classes?", questionAr: "ما العمر المناسب لبدء دروس القرآن أونلاين؟", answerEn: "We accept students from age 4 and above. Our online Quran tutors for kids are specially trained to work with young children using interactive and fun teaching methods including games, rewards, animated quizzes, and short 25-minute sessions. For teenagers, we offer a pace-matched curriculum. For adults, we have a separate track designed for online Quran classes for adults that is efficient and respectful of busy schedules.", answerAr: "نقبل الطلاب من سن 4 سنوات فما فوق. معلمونا مدربون خصيصاً للعمل مع الأطفال الصغار باستخدام ألعاب ومكافآت وجلسات قصيرة 25 دقيقة. للمراهقين منهج يتناسب مع سرعتهم. للبالغين، مسار منفصل مصمم ليكون فعالاً ويراعي الجداول المزدحمة." },
      { questionEn: "Do you offer a free trial Quran class?", questionAr: "هل تقدمون حصة قرآن تجريبية مجانية؟", answerEn: "Yes! We offer a completely free trial class with no commitment and no credit card required. This allows you to experience our online Quran teaching methodology, meet your potential Quran teacher online, assess the technology and tools we use, and see if our program is right for you before making any payment. Simply message us on WhatsApp to book your slot.", answerAr: "نعم! نقدم حصة تجريبية مجانية تماماً بدون التزام وبدون بطاقة ائتمان. هذا يتيح لك تجربة منهجيتنا ومقابلة معلمك المحتمل وتقييم الأدوات المستخدمة قبل أي دفع. راسلنا على الواتساب لحجز موعدك." },
      { questionEn: "What qualifications do your online Quran teachers have?", questionAr: "ما مؤهلات معلمي القرآن أونلاين لديكم؟", answerEn: "All our online Quran tutors are native Arabic speakers from Egypt, graduates of Al-Azhar University or similar prestigious Islamic institutions. They have a minimum of 7 years teaching experience, hold Ijazah in Quran recitation with a verified chain of narration (Sanad), and are trained in modern online teaching methods including digital whiteboard usage, screen annotation, and child engagement techniques.", answerAr: "جميع معلمينا متحدثون أصليون للعربية من مصر، خريجو جامعة الأزهر. لديهم خبرة 7+ سنوات على الأقل، ويحملون إجازة في تلاوة القرآن بسند متصل، ومدربون على أساليب التدريس الحديثة أونلاين بما في ذلك السبورة الرقمية وتقنيات إشراك الأطفال." },
      { questionEn: "How much do online Quran classes cost?", questionAr: "كم تكلفة دروس القرآن أونلاين؟", answerEn: "Our online Quran classes pricing is very competitive, starting from just $6 per hour — significantly lower than most online Quran academies. We offer various plans including 2, 3, 4, or 5 classes per week. Family discounts are available for multiple students enrolling together. All plans include progress reports, homework, and access to our teacher for questions between classes.", answerAr: "أسعار دروسنا تنافسية جداً، تبدأ من 6$ فقط للساعة — أقل بكثير من معظم أكاديميات القرآن. نقدم خطط متنوعة تشمل 2، 3، 4، أو 5 حصص أسبوعياً. خصومات عائلية متاحة. جميع الخطط تشمل تقارير التقدم والواجبات والتواصل مع المعلم بين الحصص." },
      { questionEn: "Can I choose between a male or female Quran teacher online?", questionAr: "هل يمكنني الاختيار بين معلم أو معلمة قرآن؟", answerEn: "Absolutely! We have both qualified male and female Quran teachers available for our online Quran classes. All our female teachers are Hafidhat (have memorized the entire Quran), hold Ijazah certification, and specialize in teaching non-Arabic speaking sisters. You can request your preferred teacher gender when booking your free trial class.", answerAr: "بالتأكيد! لدينا معلمون ومعلمات مؤهلون. جميع معلماتنا حافظات وحاصلات على إجازة ومتخصصات في تعليم غير الناطقات بالعربية. يمكنك طلب الجنس المفضل للمعلم عند حجز حصتك التجريبية المجانية." },
      { questionEn: "What countries do your online Quran classes serve?", questionAr: "ما الدول التي تخدمها دروس القرآن أونلاين؟", answerEn: "We serve students worldwide! Our biggest student communities are in the USA, UK, Canada, Australia, Germany, France, Saudi Arabia, and UAE. Since classes are online and available 24/7, you can join from anywhere in the world regardless of your timezone. We have teachers covering all time zones including early morning, evening, and weekend slots.", answerAr: "نخدم الطلاب حول العالم! أكبر مجتمعات طلابنا في أمريكا وبريطانيا وكندا وأستراليا وألمانيا وفرنسا والسعودية والإمارات. بما أن الدروس أونلاين ومتاحة 24/7، يمكنك الانضمام من أي مكان بغض النظر عن منطقتك الزمنية." },
      { questionEn: "Can I learn Quran online with Tajweed?", questionAr: "هل يمكنني تعلم القرآن أونلاين بالتجويد؟", answerEn: "Yes! Learning Quran online with Tajweed is one of our core offerings. All our Quran teachers are certified in Tajweed and incorporate proper recitation rules from the very first lesson. We also offer a dedicated Tajweed course for students who want to focus specifically on mastering all Tajweed rules. Our teachers explain not just the 'what' but the 'why' behind each rule, so you truly understand rather than just memorize.", answerAr: "نعم! تعلم القرآن أونلاين بالتجويد هو أحد عروضنا الأساسية. جميع معلمينا معتمدون في التجويد ويدمجون أحكام التلاوة الصحيحة من الدرس الأول. معلمونا يشرحون ليس فقط 'ماذا' بل 'لماذا' وراء كل قاعدة حتى تفهم فعلاً وليس فقط تحفظ." },
    ]}
    testimonials={[
      { name: "Sarah M.", country: "United States", textEn: "My children have been taking online Quran classes with Alhamd Academy for over a year now and the progress they've made is incredible. Their Quran teacher is patient, professional, and truly cares about their learning. My 6-year-old can now read from the Mushaf independently!", textAr: "أطفالي يأخذون دروس القرآن أونلاين مع أكاديمية الحمد لأكثر من سنة والتقدم الذي حققوه لا يصدق. ابنتي ذات الـ 6 سنوات تستطيع الآن القراءة من المصحف بشكل مستقل!", rating: 5 },
      { name: "Ahmed K.", country: "United Kingdom", textEn: "As an adult learner in my 40s, I was hesitant about online Quran classes. But Alhamd Academy made it so easy and comfortable. My online Quran tutor is excellent — he explains Tajweed rules in a way that finally makes sense. I've learned more in 3 months than I did in years of group classes.", textAr: "كمتعلم بالغ في الأربعينات، كنت متردداً بشأن دروس القرآن أونلاين. لكن أكاديمية الحمد جعلت الأمر سهلاً ومريحاً. تعلمت في 3 أشهر أكثر مما تعلمته في سنوات من الحصص الجماعية.", rating: 5 },
      { name: "Fatima R.", country: "Canada", textEn: "The best online Quran academy I've found after trying three others. My daughter loves her teacher and looks forward to every class. The Noor Al-Bayan method works really well for young kids learning to read Quran. The progress reports after each class help me stay involved in her learning.", textAr: "أفضل أكاديمية قرآن أونلاين وجدتها بعد تجربة ثلاث أخرى. ابنتي تحب معلمتها وتتطلع لكل حصة. تقارير التقدم بعد كل حصة تساعدني أبقى متابعة لتعلمها.", rating: 5 },
      { name: "Omar D.", country: "Germany", textEn: "I wanted to learn Quran online as a working professional with unpredictable hours. The one-on-one online Quran classes at Alhamd Academy are perfectly structured and my Quran teacher is very skilled. I can reschedule easily when work gets busy — something no other academy offered me.", textAr: "أردت تعلم القرآن أونلاين كمهني عامل بساعات غير منتظمة. دروس القرآن الفردية في أكاديمية الحمد منظمة بشكل ممتاز. أقدر أغير الموعد بسهولة لما الشغل يكون مزدحم.", rating: 5 },
    ]}
    relatedPages={RELATED}
    trustBadges={[
      { icon: Users, textEn: "200+ Active Students", textAr: "200+ طالب نشط" },
      { icon: Star, textEn: "4.9/5 Student Rating", textAr: "تقييم الطلاب 4.9/5" },
      { icon: Award, textEn: "Al-Azhar Certified", textAr: "معتمدون من الأزهر" },
      { icon: Clock, textEn: "24/7 Class Availability", textAr: "حصص متاحة 24/7" },
    ]}
    midCtaTitleEn="Try a Quran Class Free — See the Difference"
    midCtaTitleAr="جرّب حصة قرآن مجانية — شاهد الفرق"
    midCtaDescEn="One-on-one Quran lesson • Certified teacher • No payment needed"
    midCtaDescAr="درس قرآن فردي • معلم معتمد • بدون دفع"
    levelsTitleEn="Quran Learning Levels & Curriculum Path"
    levelsTitleAr="مستويات تعلم القرآن ومسار المنهج"
    outcomesTitleEn="What You'll Master in Our Quran Classes"
    outcomesTitleAr="ما ستتقنه في دروس القرآن"
    whyChooseTitleEn="What Makes Our Online Quran Classes Stand Out?"
    whyChooseTitleAr="ما الذي يميز دروس القرآن أونلاين لدينا؟"
    testimonialsTitleEn="Hear from Our Quran Students"
    testimonialsTitleAr="اسمع من طلاب القرآن لدينا"
    faqTitleEn="Common Questions About Online Quran Classes"
    faqTitleAr="أسئلة شائعة عن دروس القرآن أونلاين"
    ctaTitleEn="Begin Your Quran Learning Journey Today"
    ctaTitleAr="ابدأ رحلة تعلم القرآن اليوم"
    ctaDescEn="Book your free Quran class now — experience one-on-one learning with a certified teacher. No payment required, no commitment."
    ctaDescAr="احجز حصة القرآن المجانية الآن — جرّب التعلم الفردي مع معلم معتمد. بدون دفع وبدون التزام."
    ctaButtonEn="Book Free Quran Class"
    ctaButtonAr="احجز حصة قرآن مجانية"
    relatedTitleEn="Continue Exploring Our Programs"
    relatedTitleAr="تابع استكشاف برامجنا"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Online Quran Classes for Kids & Adults",
      description: "Learn Quran online with certified native Arabic teachers. One-on-one online Quran classes with Tajweed for kids and adults.",
      provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
      educationalLevel: ["Beginner", "Intermediate", "Advanced"],
      inLanguage: ["en", "ar"],
      offers: { "@type": "Offer", price: "6", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, bestRating: 5, ratingCount: 200 },
    }}
  />
);

export default OnlineQuranClasses;
