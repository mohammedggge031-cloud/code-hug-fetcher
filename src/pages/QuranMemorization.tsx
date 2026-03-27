import { Baby, GraduationCap, UserCheck, Heart, RefreshCw, Globe } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Tajweed Course Online", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Ijazah Program Online", titleAr: "برنامج الإجازة", href: "/ijazah-program" },
  { titleEn: "Islamic Studies Online", titleAr: "الدراسات الإسلامية", href: "/islamic-studies-online" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Young Children Starting Early Hifz (Ages 5–10)",
    titleAr: "الأطفال الصغار لبدء الحفظ المبكر (5–10 سنوات)",
    descEn: "You want your child to begin memorizing the Quran while their brain is at peak absorption capacity. Our child Hifz program uses repetition songs, visual cues, and reward milestones to make memorization feel like an exciting achievement rather than a task.",
    descAr: "تريد أن يبدأ طفلك حفظ القرآن بينما دماغه في ذروة قدرة الاستيعاب. برنامج حفظ الأطفال يستخدم أناشيد التكرار والإشارات البصرية ومعالم المكافآت ليجعل الحفظ إنجازاً مثيراً.",
  },
  {
    icon: GraduationCap,
    titleEn: "Teenagers Committed to Becoming Hafiz",
    titleAr: "المراهقون الملتزمون بأن يصبحوا حفاظاً",
    descEn: "You're a teen who has decided to memorize the entire Quran. Balancing school and Hifz is challenging, but our flexible scheduling and structured daily revision system make it achievable without sacrificing academics.",
    descAr: "أنت مراهق قررت حفظ القرآن كاملاً. التوازن بين المدرسة والحفظ تحدٍّ، لكن مواعيدنا المرنة ونظام المراجعة اليومي المنظم يجعلانه ممكناً دون التضحية بالدراسة.",
  },
  {
    icon: UserCheck,
    titleEn: "Busy Adults Who Dream of Completing Hifz",
    titleAr: "البالغون المشغولون الذين يحلمون بإتمام الحفظ",
    descEn: "You work full-time, have family responsibilities, and think Hifz is impossible at your age. Our adult Hifz program proves otherwise — with realistic daily goals, smart revision scheduling, and sessions that fit around the busiest lifestyles.",
    descAr: "تعمل بدوام كامل ولديك مسؤوليات عائلية وتظن أن الحفظ مستحيل في عمرك. برنامجنا للكبار يثبت العكس — بأهداف يومية واقعية وجدولة مراجعة ذكية وجلسات تتناسب مع أكثر أساليب الحياة انشغالاً.",
  },
  {
    icon: Heart,
    titleEn: "Sisters Seeking Female Hafizah Teachers",
    titleAr: "الأخوات الباحثات عن معلمات حافظات",
    descEn: "You want to memorize the Quran with a qualified female teacher. Our Hafizat teachers have memorized the entire Quran with Ijazah and understand the unique challenges women face balancing Hifz with family life.",
    descAr: "تريدين حفظ القرآن مع معلمة مؤهلة. معلماتنا الحافظات حفظن القرآن كاملاً بإجازة ويفهمن التحديات الفريدة التي تواجهها النساء في التوازن بين الحفظ والحياة العائلية.",
  },
  {
    icon: RefreshCw,
    titleEn: "Students Who Started Hifz But Stopped",
    titleAr: "الطلاب الذين بدأوا الحفظ ثم توقفوا",
    descEn: "You memorized several Juz years ago but life got in the way and you've forgotten much of it. Our restart program assesses what you still retain, rebuilds your revision foundation, then resumes new memorization from a position of strength.",
    descAr: "حفظت عدة أجزاء منذ سنوات لكن الحياة تدخلت ونسيت كثيراً منها. برنامج إعادة البدء يقيّم ما تتذكره، يعيد بناء أساس المراجعة، ثم يستأنف الحفظ الجديد من موقع قوة.",
  },
  {
    icon: Globe,
    titleEn: "Families Wanting Multiple Children in Hifz",
    titleAr: "العائلات التي تريد أطفالاً متعددين في الحفظ",
    descEn: "You have 2-3 children who all want to memorize the Quran. Our family Hifz plans offer significant discounts, coordinated scheduling, and the same teacher for siblings when possible to maintain consistency.",
    descAr: "لديك 2-3 أطفال جميعهم يريدون حفظ القرآن. خطط الحفظ العائلية تقدم خصومات كبيرة، وجدولة منسقة، ونفس المعلم للإخوة عند الإمكان للحفاظ على الاتساق.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Old Revision (Murajaah Ba'eedah) — Protecting What You've Memorized",
    titleAr: "المراجعة البعيدة — حماية ما حفظته",
    descEn: "The session begins with reciting previously memorized Juz or Surahs from memory without looking at the Mushaf. The teacher listens for accuracy, fluency, and Tajweed. This portion is the most critical — memorization without consistent revision is memorization that will be lost.",
    descAr: "تبدأ الجلسة بتلاوة أجزاء أو سور محفوظة سابقاً من الذاكرة بدون النظر للمصحف. يستمع المعلم للدقة والطلاقة والتجويد. هذا الجزء هو الأكثر أهمية — الحفظ بدون مراجعة متسقة حفظ سيُفقد.",
  },
  {
    titleEn: "Recent Revision (Murajaah Qareebah) — Strengthening New Memorization",
    titleAr: "المراجعة القريبة — تعزيز الحفظ الجديد",
    descEn: "Next, the student recites the most recently memorized page or portion — material from the last few sessions. The teacher checks if the new memorization has solidified or if specific Ayahs need more repetition before they can move to the 'old revision' category.",
    descAr: "بعد ذلك، يتلو الطالب الصفحة أو الجزء المحفوظ مؤخراً — مادة من الجلسات الأخيرة. يتحقق المعلم مما إذا كان الحفظ الجديد قد ترسّخ أو إذا كانت آيات محددة تحتاج مزيداً من التكرار.",
  },
  {
    titleEn: "New Memorization (Hifz Jadeed) — Adding Fresh Verses",
    titleAr: "الحفظ الجديد — إضافة آيات جديدة",
    descEn: "The teacher recites the new portion verse by verse. The student repeats each verse multiple times until pronunciation and melody are correct. Then verses are connected together — two at a time, then four, then the full passage. The teacher ensures Tajweed is embedded from the first repetition.",
    descAr: "يتلو المعلم الجزء الجديد آية بآية. يكرر الطالب كل آية عدة مرات حتى يصبح النطق واللحن صحيحين. ثم تُربط الآيات معاً — اثنتان ثم أربع ثم المقطع كاملاً. يضمن المعلم دمج التجويد من التكرار الأول.",
  },
  {
    titleEn: "Connection Drill — Linking New to Old",
    titleAr: "تمرين الربط — ربط الجديد بالقديم",
    descEn: "The student recites the last few verses of yesterday's memorization flowing directly into today's new portion. This 'bridging' technique prevents the common problem where students can recite individual pages but stumble at page transitions.",
    descAr: "يتلو الطالب الآيات الأخيرة من حفظ الأمس متدفقاً مباشرة إلى الجزء الجديد لليوم. تقنية 'الجسر' هذه تمنع المشكلة الشائعة حيث يستطيع الطلاب تلاوة صفحات فردية لكنهم يتعثرون عند الانتقال بين الصفحات.",
  },
  {
    titleEn: "Homework Assignment & Revision Schedule",
    titleAr: "الواجب وجدول المراجعة",
    descEn: "The teacher assigns specific revision tasks: which Juz to revise tomorrow, how many times to repeat the new portion, and which verses to record for self-assessment. Parents of young Hifz students receive a clear daily plan they can follow at home.",
    descAr: "يحدد المعلم مهام مراجعة محددة: أي جزء يُراجع غداً، كم مرة يُكرر الجزء الجديد، وأي آيات تُسجل للتقييم الذاتي. آباء طلاب الحفظ الصغار يتلقون خطة يومية واضحة يمكنهم اتباعها في المنزل.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"I memorize new verses but forget what I learned last week — it feels like pouring water into a leaking bucket\"",
    problemAr: "\"أحفظ آيات جديدة لكن أنسى ما تعلمته الأسبوع الماضي — أشعر كأنني أسكب الماء في دلو مثقوب\"",
    solutionEn: "This is the #1 Hifz challenge and it's almost always a revision problem, not a memory problem. Our 'Rotating Juz' revision system ensures every memorized portion is reviewed at calculated intervals. Students who follow our revision schedule retain over 95% of their memorization long-term.",
    solutionAr: "هذا التحدي رقم 1 في الحفظ وهو دائماً تقريباً مشكلة مراجعة وليس ذاكرة. نظام 'الأجزاء الدوارة' للمراجعة يضمن مراجعة كل جزء محفوظ بفترات محسوبة. الطلاب الذين يتبعون جدول المراجعة يحتفظون بأكثر من 95% من حفظهم على المدى الطويل.",
  },
  {
    problemEn: "\"My child is good at memorizing but gets bored and doesn't want to continue Hifz\"",
    problemAr: "\"طفلي جيد في الحفظ لكنه يشعر بالملل ولا يريد الاستمرار\"",
    solutionEn: "Motivation fatigue is real for young Hifz students. Our teachers use milestone celebrations (completing a Surah, completing a Juz), star charts, and friendly competitions with other students. We also vary session activities to prevent monotony — some days focus on listening, others on recitation races.",
    solutionAr: "إرهاق الدافعية حقيقي لطلاب الحفظ الصغار. معلمونا يستخدمون احتفالات المعالم (إكمال سورة، إكمال جزء)، ومخططات النجوم، ومسابقات ودية. كما نغير أنشطة الجلسة لمنع الرتابة.",
  },
  {
    problemEn: "\"I'm an adult — isn't it too late for me to memorize the whole Quran?\"",
    problemAr: "\"أنا شخص بالغ — أليس الوقت متأخراً جداً لحفظ القرآن كاملاً؟\"",
    solutionEn: "Many of our most successful Hifz students started as adults. Adult learners bring discipline, understanding of meaning, and genuine spiritual motivation that children lack. We've had students in their 40s and 50s complete significant portions. The key is realistic daily goals and unwavering consistency.",
    solutionAr: "كثير من أنجح طلاب الحفظ لدينا بدأوا كبالغين. المتعلمون البالغون يجلبون الانضباط وفهم المعنى والدافع الروحي الحقيقي. لدينا طلاب في الأربعينات والخمسينات أكملوا أجزاء كبيرة. المفتاح هو أهداف يومية واقعية واتساق لا يتزعزع.",
  },
  {
    problemEn: "\"Similar-sounding verses from different Surahs get mixed up in my head during recitation\"",
    problemAr: "\"الآيات المتشابهة الصوت من سور مختلفة تختلط في رأسي أثناء التلاوة\"",
    solutionEn: "Mutashabihat (similar verses) are a known Hifz obstacle. Our teachers use a dedicated 'Similar Verse Map' technique where confusable verses are studied side-by-side, highlighting the exact word that differs. Students build a mental reference for each pair of similar verses.",
    solutionAr: "المتشابهات عقبة حفظ معروفة. معلمونا يستخدمون تقنية 'خريطة الآيات المتشابهة' حيث تُدرس الآيات المتشابهة جنباً إلى جنب، مع تسليط الضوء على الكلمة المختلفة بالضبط.",
  },
  {
    problemEn: "\"I memorized with wrong Tajweed and now I need to re-learn everything correctly\"",
    problemAr: "\"حفظت بتجويد خاطئ والآن أحتاج إعادة تعلم كل شيء بشكل صحيح\"",
    solutionEn: "Re-learning is harder than learning correctly from the start, but it's absolutely doable. Our approach is to go Juz by Juz — correcting Tajweed in the memorized portions and re-memorizing with correct pronunciation. The meaning doesn't change, so the revision goes faster than fresh memorization.",
    solutionAr: "إعادة التعلم أصعب من التعلم بشكل صحيح من البداية، لكنها ممكنة تماماً. نهجنا هو المضي جزءاً بجزء — تصحيح التجويد في الأجزاء المحفوظة وإعادة الحفظ بالنطق الصحيح.",
  },
  {
    problemEn: "\"I can't find consistent time every day for Hifz revision with my busy schedule\"",
    problemAr: "\"لا أجد وقتاً ثابتاً يومياً لمراجعة الحفظ مع جدولي المزدحم\"",
    solutionEn: "Consistency doesn't require long blocks. Our 'Micro-Revision' approach assigns 10-15 minute daily revision tasks that can be done during commute, lunch break, or before Fajr. Combined with 2-3 structured weekly Hifz sessions, this maintains strong retention even for the busiest students.",
    solutionAr: "الاتساق لا يتطلب فترات طويلة. نهج 'المراجعة المصغرة' يحدد مهام مراجعة يومية 10-15 دقيقة يمكن إنجازها أثناء التنقل أو الاستراحة أو قبل الفجر. مع 2-3 جلسات حفظ أسبوعية منظمة، يحافظ هذا على احتفاظ قوي.",
  },
];

const CURRICULUM: CurriculumWeek[] = [
  {
    weekEn: "Phase 1",
    weekAr: "المرحلة 1",
    topicEn: "Hifz Readiness — Building the Foundation",
    topicAr: "الاستعداد للحفظ — بناء الأساس",
    detailsEn: [
      "Quran reading fluency assessment and improvement if needed",
      "Basic Tajweed rules mastery for correct memorization from day one",
      "Learning effective memorization techniques: repetition methods, audio-visual association",
      "Establishing a personal daily Hifz and revision routine",
      "Memorizing Juz 30 (Juz Amma) as the entry point for building Hifz muscle",
    ],
    detailsAr: [
      "تقييم طلاقة قراءة القرآن وتحسينها إن لزم",
      "إتقان أحكام التجويد الأساسية للحفظ الصحيح من اليوم الأول",
      "تعلم تقنيات الحفظ الفعالة: طرق التكرار، الربط السمعي البصري",
      "تأسيس روتين يومي شخصي للحفظ والمراجعة",
      "حفظ جزء عم كنقطة انطلاق لبناء عضلة الحفظ",
    ],
  },
  {
    weekEn: "Phase 2",
    weekAr: "المرحلة 2",
    topicEn: "Structured Memorization — Building Momentum",
    topicAr: "الحفظ المنظم — بناء الزخم",
    detailsEn: [
      "Memorizing Juz 29 and 28 (or student's chosen starting point)",
      "Implementing the 3-tier revision system: new, recent, old",
      "Daily new memorization targets calibrated to the student's capacity",
      "Weekly full-Juz revision tests to ensure retention strength",
      "Introduction to Mutashabihat (similar verses) tracking system",
    ],
    detailsAr: [
      "حفظ الجزء 29 و28 (أو نقطة بداية الطالب المختارة)",
      "تطبيق نظام المراجعة ثلاثي المستويات: جديد، قريب، بعيد",
      "أهداف حفظ يومية جديدة مُعايرة حسب قدرة الطالب",
      "اختبارات مراجعة جزء كامل أسبوعية لضمان قوة الاحتفاظ",
      "التعريف بنظام تتبع المتشابهات",
    ],
  },
  {
    weekEn: "Phase 3",
    weekAr: "المرحلة 3",
    topicEn: "Deep Memorization — Longer Surahs & Complex Passages",
    topicAr: "الحفظ العميق — السور الطويلة والمقاطع المعقدة",
    detailsEn: [
      "Tackling longer Surahs (Al-Baqarah, Aal-Imran, An-Nisa, etc.)",
      "Advanced Mutashabihat drills for verses that appear across multiple Surahs",
      "Increasing revision load as memorized portions grow",
      "Monthly comprehensive revision tests covering all memorized Juz",
      "Building recitation stamina for continuous reading of multiple Juz",
    ],
    detailsAr: [
      "مواجهة السور الطويلة (البقرة، آل عمران، النساء، إلخ)",
      "تمارين متشابهات متقدمة للآيات التي تظهر عبر سور متعددة",
      "زيادة حمل المراجعة مع نمو الأجزاء المحفوظة",
      "اختبارات مراجعة شاملة شهرية تغطي كل الأجزاء المحفوظة",
      "بناء قدرة تلاوة مستمرة لأجزاء متعددة",
    ],
  },
  {
    weekEn: "Phase 4",
    weekAr: "المرحلة 4",
    topicEn: "Completion & Khatm — Finishing the Quran",
    topicAr: "الإتمام والختم — إنهاء القرآن",
    detailsEn: [
      "Final Juz memorization with increased daily targets",
      "Full Quran revision cycle — reciting the entire Quran from memory",
      "Khatm (completion) test: reciting the full Quran to the Hafiz teacher",
      "Tajweed perfection review across all 30 Juz",
      "Certificate of Hifz completion awarded upon successful Khatm",
    ],
    detailsAr: [
      "حفظ الأجزاء الأخيرة بأهداف يومية مرتفعة",
      "دورة مراجعة القرآن الكامل — تلاوة القرآن كاملاً من الذاكرة",
      "اختبار الختم: تلاوة القرآن كاملاً على المعلم الحافظ",
      "مراجعة إتقان التجويد عبر كل 30 جزء",
      "شهادة إتمام الحفظ تُمنح عند الختم الناجح",
    ],
  },
  {
    weekEn: "Phase 5",
    weekAr: "المرحلة 5",
    topicEn: "Post-Hifz — Lifelong Retention & Ijazah Track",
    topicAr: "ما بعد الحفظ — الاحتفاظ مدى الحياة ومسار الإجازة",
    detailsEn: [
      "Establishing a lifelong revision schedule to maintain full Quran memorization",
      "Ijazah preparation — reading the Quran to a certified sheikh for chain certification",
      "Learning to recite with different Maqamat (melodic modes)",
      "Introduction to different Qiraat for students who wish to expand",
      "Training students to teach Hifz methodology to others",
    ],
    detailsAr: [
      "تأسيس جدول مراجعة مدى الحياة للحفاظ على حفظ القرآن كاملاً",
      "التحضير للإجازة — قراءة القرآن على شيخ معتمد لشهادة السند",
      "تعلم التلاوة بمقامات مختلفة (أنماط لحنية)",
      "مقدمة في القراءات المختلفة للطلاب الراغبين في التوسع",
      "تدريب الطلاب على تعليم منهجية الحفظ للآخرين",
    ],
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    featureEn: "Revision System",
    featureAr: "نظام المراجعة",
    usEn: "✅ 3-tier spaced repetition (new/recent/old)",
    usAr: "✅ تكرار متباعد 3 مستويات (جديد/قريب/بعيد)",
    othersEn: "❌ No structured revision — students forget quickly",
    othersAr: "❌ بدون مراجعة منظمة — الطلاب ينسون بسرعة",
  },
  {
    featureEn: "Class Format",
    featureAr: "نوع الحصة",
    usEn: "✅ 100% One-on-One Hifz sessions",
    usAr: "✅ جلسات حفظ فردية 100%",
    othersEn: "❌ Group Hifz classes (teacher can't hear each student)",
    othersAr: "❌ حصص حفظ جماعية (المعلم لا يسمع كل طالب)",
  },
  {
    featureEn: "Teacher Qualification",
    featureAr: "مؤهلات المعلم",
    usEn: "✅ Hafiz with Ijazah & connected Sanad",
    usAr: "✅ حافظ بإجازة وسند متصل",
    othersEn: "⚠️ Hafiz without formal certification",
    othersAr: "⚠️ حافظ بدون شهادة رسمية",
  },
  {
    featureEn: "Progress Tracking",
    featureAr: "تتبع التقدم",
    usEn: "✅ Weekly reports + milestone tracking",
    usAr: "✅ تقارير أسبوعية + تتبع المعالم",
    othersEn: "❌ No formal tracking system",
    othersAr: "❌ بدون نظام تتبع رسمي",
  },
  {
    featureEn: "Mutashabihat Training",
    featureAr: "تدريب المتشابهات",
    usEn: "✅ Dedicated similar-verse comparison drills",
    usAr: "✅ تمارين مقارنة آيات متشابهة مخصصة",
    othersEn: "❌ Not addressed — students struggle on their own",
    othersAr: "❌ غير معالجة — الطلاب يعانون وحدهم",
  },
  {
    featureEn: "Price Per Hour",
    featureAr: "السعر بالساعة",
    usEn: "✅ Starting from $6/hr",
    usAr: "✅ يبدأ من 6$/الساعة",
    othersEn: "⚠️ $12–25/hr for private Hifz",
    othersAr: "⚠️ 12–25$/الساعة لحفظ خاص",
  },
];

const DEEP_CONTENT_EN = [
  "Quran memorization (Hifz) holds a unique place in Islamic tradition. The Quran is the only religious text in human history that millions of people have memorized completely, word for word, letter for letter, in its original language — and this chain of memorization has remained unbroken for over 1,400 years. When you memorize the Quran, you become part of this extraordinary living tradition.",

  "The Prophet Muhammad ﷺ said: 'It will be said to the companion of the Quran: Read, ascend, and beautify your recitation as you used to beautify it in the world, for your rank will be at the last verse you recite.' This hadith motivates millions of Muslims to undertake the Hifz journey, knowing that every verse memorized elevates their spiritual rank.",

  "Modern neuroscience supports what Islamic scholars have known for centuries: the human brain is remarkably capable of memorizing large volumes of text when the right techniques are used. Spaced repetition, multi-sensory encoding (hearing + seeing + speaking), and emotional connection to material all dramatically improve retention. Our Hifz methodology incorporates all of these evidence-based learning principles.",

  "One of the biggest mistakes in Quran memorization is prioritizing speed over retention. Some programs push students to memorize a page per day, but without adequate revision, this leads to a student who has 'passed through' 10 Juz but can only reliably recite 3. At Alhamd Academy, we measure success by retention quality, not memorization speed. A student who memorizes half a page daily but retains everything is making far more progress than one who memorizes a full page but forgets half.",

  "For parents enrolling children in online Hifz programs, understanding the child's developmental stage is crucial. Children ages 5-7 can typically memorize 2-3 short Ayahs per session with extensive repetition. Children ages 8-12 can handle half a page with proper technique. Teenagers and adults can memorize a full page when motivated and consistent. Our Hafiz teachers calibrate expectations and daily targets to each student's actual capacity — not arbitrary benchmarks.",

  "The revision system is the backbone of successful Quran memorization. At Alhamd Academy, every Hifz student follows our 'Revolving Door' revision protocol: for every new page memorized, specific old pages must be reviewed. The exact schedule is calculated based on the student's total memorized volume. A student with 5 Juz memorized has a different revision cycle than one with 15 Juz. This mathematical approach to revision is what prevents the devastating experience of forgetting.",

  "Adult Hifz is not only possible — it can be deeply rewarding in ways that childhood memorization isn't. Adults understand the meanings of what they're memorizing, which creates powerful emotional and spiritual connections to the verses. Many adult Hifz students report that memorizing the Quran has transformed their Salah, their understanding of khutbahs, and their overall relationship with Allah's words.",

  "The journey to becoming a Hafiz or Hafizah is one of the most rewarding spiritual commitments a Muslim can make. It requires dedication, patience, and expert guidance. At Alhamd Academy, our Hafiz teachers don't just hear recitation — they mentor, motivate, and walk alongside each student through every challenge and triumph on the Hifz path.",
];

const DEEP_CONTENT_AR = [
  "حفظ القرآن يحتل مكانة فريدة في التقليد الإسلامي. القرآن هو النص الديني الوحيد في التاريخ البشري الذي حفظه ملايين الناس كاملاً، كلمة بكلمة، حرفاً بحرف، بلغته الأصلية — وسلسلة الحفظ هذه ظلت متصلة لأكثر من 1400 عام.",

  "قال النبي محمد ﷺ: 'يُقال لصاحب القرآن: اقرأ وارتقِ ورتّل كما كنت ترتل في الدنيا، فإن منزلتك عند آخر آية تقرؤها.' هذا الحديث يحفز ملايين المسلمين لخوض رحلة الحفظ، عالمين أن كل آية محفوظة ترفع مرتبتهم الروحية.",

  "علم الأعصاب الحديث يدعم ما عرفه العلماء المسلمون لقرون: الدماغ البشري قادر بشكل رائع على حفظ أحجام كبيرة من النصوص عند استخدام التقنيات الصحيحة. التكرار المتباعد، والترميز متعدد الحواس، والارتباط العاطفي بالمادة كلها تحسن الاحتفاظ بشكل كبير.",

  "من أكبر الأخطاء في حفظ القرآن إعطاء الأولوية للسرعة على الاحتفاظ. بعض البرامج تدفع الطلاب لحفظ صفحة يومياً، لكن بدون مراجعة كافية يؤدي هذا لطالب 'مرّ' على 10 أجزاء لكنه يستطيع تلاوة 3 فقط بشكل موثوق. في أكاديمية الحمد، نقيس النجاح بجودة الاحتفاظ.",

  "للآباء الذين يسجلون أطفالهم في برامج حفظ أونلاين: فهم المرحلة التنموية للطفل أمر حاسم. الأطفال 5-7 سنوات يمكنهم حفظ 2-3 آيات قصيرة بالجلسة. الأطفال 8-12 يمكنهم التعامل مع نصف صفحة. المراهقون والبالغون يمكنهم حفظ صفحة كاملة.",

  "نظام المراجعة هو العمود الفقري لحفظ القرآن الناجح. في أكاديمية الحمد، كل طالب حفظ يتبع بروتوكول 'الباب الدوار' للمراجعة: لكل صفحة جديدة تُحفظ، صفحات قديمة محددة يجب مراجعتها. الجدول الدقيق يُحسب بناءً على إجمالي ما حفظه الطالب.",

  "حفظ القرآن للكبار ليس ممكناً فحسب — بل يمكن أن يكون مجزياً بعمق بطرق لا يحققها حفظ الطفولة. البالغون يفهمون معاني ما يحفظونه، مما يخلق ارتباطات عاطفية وروحية قوية بالآيات.",

  "رحلة أن تصبح حافظاً أو حافظة هي من أكثر الالتزامات الروحية إثابة. تتطلب تفانياً وصبراً وإرشاداً خبيراً. في أكاديمية الحمد، معلمونا الحافظون لا يسمعون التلاوة فحسب — بل يرشدون ويحفزون ويسيرون مع كل طالب.",
];

const QuranMemorization = () => (
  <ServicePageLayout
    seoTitle="Quran Memorization Online | Hifz Program for Kids & Adults | Alhamd Academy"
    seoDescription="Memorize Quran online with our structured Hifz program. Certified Hafiz teachers, personalized memorization plans, daily revision. Online hifz classes for kids and adults. Free trial."
    seoKeywords="quran memorization online, memorize quran online, hifz program online, online quran memorization course, quran memorization classes, memorize quran online with teacher, online hifz classes for kids, quran memorization program for adults, best online hifz program, how to memorize quran fast, quran hifz course, hafiz program online, quran memorization for kids, hifz quran online"
    canonical="https://alhamdacademy.net/quran-memorization-hifz"
    heroTitleEn="Quran Memorization Online — Hifz Program for Kids & Adults"
    heroTitleAr="حفظ القرآن أونلاين — برنامج حفظ للأطفال والكبار"
    heroSubtitleEn="Memorize the Holy Quran with Expert Hafiz Teachers & Personalized Plans"
    heroSubtitleAr="احفظ القرآن الكريم مع معلمين حافظين خبراء وخطط مخصصة"
    heroDescEn="Our structured online Hifz program is designed to help you memorize the Quran at your own pace. With certified Hafiz teachers, personalized Quran memorization plans, daily revision schedules, and regular assessments, we ensure consistent progress in your Hifz journey — whether you're a child or adult."
    heroDescAr="برنامج الحفظ المنظم أونلاين مصمم لمساعدتك على حفظ القرآن بسرعتك الخاصة. مع معلمين حافظين معتمدين وخطط حفظ مخصصة وجداول مراجعة يومية وتقييمات منتظمة."
    aboutTitleEn="A Complete Guide to Online Quran Memorization — Who Is This For?"
    aboutTitleAr="دليل شامل لحفظ القرآن أونلاين — لمن هذا البرنامج؟"
    aboutContentEn={[
      "Memorizing the Quran (Hifz) is one of the greatest spiritual achievements a Muslim can undertake. The Prophet Muhammad ﷺ said, 'The best among you are those who learn the Quran and teach it.' At Alhamd Academy, we help you achieve this noble goal through our professionally structured online Quran memorization course.",
      "Our online Hifz program is designed for everyone: kids as young as 5 who want to start memorizing Quran early, teenagers who want to become Hafiz, and adults who dream of completing their Quran memorization journey. Whether you want to memorize the entire Quran or specific Surahs, our program adapts to your goals.",
      "What makes our best online Hifz program unique is our emphasis on quality over quantity. We don't rush students through Quran memorization. Instead, we ensure that each portion is memorized with correct Tajweed, proper understanding, and strong revision before moving forward.",
      "Our Hafiz teachers are themselves Huffaz (people who have memorized the entire Quran) with Ijazah certifications. They know from personal experience what it takes to memorize Quran online effectively and can provide practical tips and emotional support throughout the journey.",
      "The Quran memorization program includes structured new memorization sessions, old revision (Murajaah), and regular tests. Parents receive weekly progress reports, and teachers provide detailed feedback on memorization quality, Tajweed accuracy, and areas that need more attention.",
    ]}
    aboutContentAr={[
      "حفظ القرآن هو من أعظم الإنجازات الروحية التي يمكن للمسلم القيام بها. قال النبي محمد ﷺ: 'خيركم من تعلم القرآن وعلمه'. في أكاديمية الحمد، نساعدك على تحقيق هذا الهدف النبيل من خلال برنامج حفظ القرآن أونلاين.",
      "برنامجنا مصمم للجميع: أطفال من سن 5 سنوات، مراهقون يريدون أن يصبحوا حفاظاً، وكبار يحلمون بإتمام رحلة حفظ القرآن. سواء أردت حفظ القرآن كاملاً أو سور محددة.",
      "ما يميز برنامجنا هو تركيزنا على الجودة وليس الكمية. لا نستعجل الطلاب في حفظ القرآن بل نضمن أن كل جزء محفوظ بالتجويد الصحيح.",
      "معلمونا أنفسهم حفاظ للقرآن كاملاً بشهادات إجازة. يعرفون من تجربتهم الشخصية ما يتطلبه حفظ القرآن أونلاين بفعالية.",
      "يتضمن البرنامج جلسات حفظ جديد ومراجعة قديمة واختبارات منتظمة. يحصل الآباء على تقارير أسبوعية.",
    ]}
    methodTitleEn="How to Memorize Quran Online — Our Proven Hifz Methodology"
    methodTitleAr="كيف تحفظ القرآن أونلاين — منهجيتنا المثبتة في الحفظ"
    methodContentEn={[
      "Our Hifz methodology is based on the traditional Islamic Quran memorization approach enhanced with modern learning science. Each session is divided into three parts: new memorization (Hifz Jadeed), recent revision (Qarib), and old revision (Ba'eed).",
      "Students start by listening to the portion to be memorized recited by a master reciter, then repeat it multiple times with the Hafiz teacher. The teacher corrects pronunciation and Tajweed in real-time, ensuring the Quran memorization is done correctly from the start.",
      "We use spaced repetition techniques to strengthen long-term retention. Students in our online Hifz classes follow a carefully designed revision schedule that ensures previously memorized portions are regularly reviewed and never forgotten.",
      "Regular assessments are conducted to test memorization strength. Students must demonstrate they can recite memorized portions fluently and with correct Tajweed before progressing to new material in their Quran memorization program.",
    ]}
    methodContentAr={[
      "منهجيتنا في الحفظ مبنية على النهج الإسلامي التقليدي معززة بعلم التعلم الحديث. كل جلسة مقسمة إلى ثلاثة أجزاء: حفظ جديد ومراجعة قريبة ومراجعة بعيدة.",
      "يبدأ الطلاب بالاستماع إلى الجزء المراد حفظه ثم تكراره عدة مرات مع المعلم الحافظ الذي يصحح النطق والتجويد آنياً.",
      "نستخدم تقنيات التكرار المتباعد لتعزيز الاحتفاظ طويل الأمد في دروس الحفظ أونلاين.",
      "تُجرى تقييمات منتظمة لاختبار قوة الحفظ. يجب على الطلاب إثبات قدرتهم على التلاوة بطلاقة قبل التقدم في برنامج حفظ القرآن.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Who Is Our Hifz Program Designed For?"
    audienceTitleAr="لمن صُمم برنامج الحفظ لدينا؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="Inside a Hifz Session — The 5-Step Memorization Process"
    classSessionTitleAr="داخل جلسة الحفظ — عملية الحفظ المكونة من 5 خطوات"
    challenges={CHALLENGES}
    challengesTitleEn="Hifz Challenges We Help You Overcome"
    challengesTitleAr="تحديات الحفظ التي نساعدك على تجاوزها"
    curriculum={CURRICULUM}
    curriculumTitleEn="Your Hifz Journey — Phase by Phase"
    curriculumTitleAr="رحلة حفظك — مرحلة بمرحلة"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Our Hifz Program vs. Other Platforms"
    comparisonTitleAr="برنامج الحفظ لدينا مقارنة بالمنصات الأخرى"
    deepContentTitleEn="Everything You Need to Know About Quran Memorization Online"
    deepContentTitleAr="كل ما تحتاج معرفته عن حفظ القرآن أونلاين"
    deepContentEn={DEEP_CONTENT_EN}
    deepContentAr={DEEP_CONTENT_AR}
    levels={[
      {
        titleEn: "Foundation — Quran Reading Before Memorization",
        titleAr: "التأسيس — قراءة القرآن قبل الحفظ",
        descEn: "For students who need to build Quran reading skills before starting their Quran memorization journey.",
        descAr: "للطلاب الذين يحتاجون لبناء مهارات قراءة القرآن قبل بدء رحلة الحفظ.",
        topicsEn: ["Fluent Quran reading", "Basic Tajweed application", "Short Surah memorization", "Building reading stamina", "Memorization techniques training"],
        topicsAr: ["قراءة القرآن بطلاقة", "تطبيق التجويد الأساسي", "حفظ السور القصيرة", "بناء القدرة على القراءة", "التدريب على تقنيات الحفظ"],
      },
      {
        titleEn: "Regular Hifz Program — Structured Quran Memorization",
        titleAr: "برنامج الحفظ المنتظم — حفظ قرآن منظم",
        descEn: "Structured online Quran memorization program for students who can read fluently and want to memorize the Quran systematically.",
        descAr: "برنامج حفظ قرآن أونلاين منظم للطلاب الذين يقرأون بطلاقة ويريدون حفظ القرآن بشكل منهجي.",
        topicsEn: ["Systematic Juz-by-Juz memorization", "Daily revision schedule", "Tajweed-accurate memorization", "Weekly progress tests", "Personalized pace adjustment"],
        topicsAr: ["حفظ منهجي جزء بجزء", "جدول مراجعة يومي", "حفظ بتجويد دقيق", "اختبارات تقدم أسبوعية", "تعديل السرعة المخصص"],
      },
      {
        titleEn: "Intensive Hifz & Ijazah Preparation",
        titleAr: "الحفظ المكثف والتحضير للإجازة",
        descEn: "Accelerated Quran memorization program for dedicated students aiming to complete their Hifz and pursue Ijazah certification.",
        descAr: "برنامج حفظ قرآن مكثف للطلاب المتفانين الذين يهدفون لإتمام الحفظ والحصول على الإجازة.",
        topicsEn: ["Accelerated memorization pace", "Comprehensive Murajaah program", "Complete Quran recitation test", "Ijazah preparation", "Graduation ceremony"],
        topicsAr: ["سرعة حفظ مكثفة", "برنامج مراجعة شامل", "اختبار تلاوة القرآن كاملاً", "التحضير للإجازة", "حفل التخرج"],
      },
    ]}
    outcomesEn={[
      "Memorize the Holy Quran partially or completely based on your Hifz goal",
      "Retain memorized portions through effective Quran revision techniques",
      "Recite memorized Surahs with correct Tajweed and beautiful melody",
      "Lead prayers (Taraweeh/Tahajjud) with confidence",
      "Develop discipline and a lifelong connection with the Quran",
      "Earn Ijazah certification upon completing full Quran memorization",
    ]}
    outcomesAr={[
      "حفظ القرآن الكريم جزئياً أو كاملاً بناءً على هدفك",
      "الاحتفاظ بالأجزاء المحفوظة من خلال تقنيات المراجعة الفعالة",
      "تلاوة السور المحفوظة بتجويد صحيح ولحن جميل",
      "إمامة الصلاة (التراويح/التهجد) بثقة",
      "تطوير الانضباط واتصال مدى الحياة مع القرآن",
      "الحصول على شهادة الإجازة عند إتمام حفظ القرآن كاملاً",
    ]}
    featuresEn={[
      "Personalized Quran memorization plan tailored to your pace and schedule",
      "Certified Hafiz teachers with Ijazah and years of Hifz teaching experience",
      "Structured revision system to prevent forgetting previously memorized portions",
      "Weekly progress reports and regular Quran memorization assessments",
      "One-on-one online Hifz sessions ensuring full attention and immediate correction",
      "Flexible scheduling with Quran memorization classes available 24/7",
      "Support for both kids and adult Hifz students in our online program",
      "Affordable pricing with family discounts available",
    ]}
    featuresAr={[
      "خطة حفظ قرآن مخصصة حسب سرعتك وجدولك",
      "معلمون حافظون معتمدون بإجازة وخبرة تدريس حفظ طويلة",
      "نظام مراجعة منظم لمنع نسيان الأجزاء المحفوظة",
      "تقارير تقدم أسبوعية وتقييمات حفظ منتظمة",
      "جلسات حفظ أونلاين فردية تضمن الاهتمام الكامل والتصحيح الفوري",
      "مواعيد مرنة مع دروس حفظ القرآن متاحة 24/7",
      "دعم لطلاب الحفظ من الأطفال والكبار في برنامجنا أونلاين",
      "أسعار معقولة مع خصومات عائلية",
    ]}
    faqs={[
      { questionEn: "How to memorize Quran fast and effectively?", questionAr: "كيف أحفظ القرآن بسرعة وفعالية؟", answerEn: "The fastest way to memorize Quran is through consistent daily practice with a qualified Hafiz teacher. At Alhamd Academy, our online Hifz program uses proven memorization techniques including: memorizing in small portions, repeating each verse multiple times, connecting new memorization to old, maintaining a strict daily revision schedule, and using spaced repetition. The key is quality and consistency, not just speed.", answerAr: "أسرع طريقة لحفظ القرآن هي من خلال الممارسة اليومية المتسقة مع معلم حافظ مؤهل. في أكاديمية الحمد، نستخدم تقنيات حفظ مثبتة تشمل: الحفظ بأجزاء صغيرة، والتكرار عدة مرات، والربط بين الحفظ الجديد والقديم." },
      { questionEn: "What age is best to start Quran memorization?", questionAr: "ما أفضل عمر لبدء حفظ القرآن؟", answerEn: "Children can start our online Hifz classes as early as age 5-6. Young minds are exceptionally receptive to Quran memorization. However, adults can also successfully memorize the Quran online — we have many adult students making excellent progress in our Quran memorization program for adults.", answerAr: "يمكن للأطفال بدء دروس الحفظ أونلاين من سن 5-6 سنوات. العقول الصغيرة متقبلة جداً لحفظ القرآن. لكن الكبار أيضاً يمكنهم حفظ القرآن بنجاح." },
      { questionEn: "How do you prevent students from forgetting what they memorized?", questionAr: "كيف تمنعون الطلاب من نسيان ما حفظوه؟", answerEn: "We use a structured revision system based on spaced repetition in our online Quran memorization course. Each session includes time for old revision alongside new memorization. Students follow a detailed revision schedule, and regular tests ensure retention remains strong throughout their Hifz journey.", answerAr: "نستخدم نظام مراجعة منظم مبني على التكرار المتباعد في دروس حفظ القرآن أونلاين. كل جلسة تتضمن وقتاً للمراجعة القديمة مع الحفظ الجديد." },
      { questionEn: "Can I memorize just specific Surahs instead of the whole Quran?", questionAr: "هل يمكنني حفظ سور محددة فقط؟", answerEn: "Absolutely! Many students in our online Hifz program choose to memorize specific Surahs or the last Juz (Juz Amma) rather than the entire Quran. Our Quran memorization classes are flexible and can be tailored to your specific goals.", answerAr: "بالتأكيد! كثير من الطلاب في برنامج الحفظ يختارون حفظ سور محددة أو الجزء الأخير. دروس حفظ القرآن مرنة ويمكن تخصيصها حسب أهدافك." },
      { questionEn: "Do you provide certificates for Quran memorization?", questionAr: "هل تقدمون شهادات لحفظ القرآن؟", answerEn: "Yes, we provide certificates at various milestones in your Quran memorization journey (completing individual Juz, completing half, completing the full Quran). Students who complete full Quran memorization with proper Tajweed can also pursue Ijazah certification through our Ijazah program.", answerAr: "نعم، نقدم شهادات في مراحل مختلفة من رحلة حفظ القرآن. الطلاب الذين يتمون الحفظ بالتجويد الصحيح يمكنهم أيضاً السعي لشهادة الإجازة." },
      { questionEn: "Can adults memorize the Quran online?", questionAr: "هل يمكن للكبار حفظ القرآن أونلاين؟", answerEn: "Yes! Our Quran memorization program for adults is specifically designed for busy professionals and parents. Many of our adult students have made remarkable progress memorizing Quran online with our personalized Hifz plans and flexible scheduling.", answerAr: "نعم! برنامج حفظ القرآن للكبار مصمم خصيصاً للمهنيين المشغولين والآباء. كثير من طلابنا الكبار حققوا تقدماً ملحوظاً في حفظ القرآن أونلاين." },
    ]}
    testimonials={[
      { name: "Ibrahim H.", country: "United States", textEn: "My son has memorized 10 Juz with Alhamd Academy's online Hifz program. The structured Quran memorization revision system is brilliant — he retains everything he memorizes. The Hafiz teacher is incredibly patient and motivating.", textAr: "ابني حفظ 10 أجزاء مع برنامج الحفظ أونلاين في أكاديمية الحمد. نظام المراجعة المنظم رائع.", rating: 5 },
      { name: "Khadijah N.", country: "United Kingdom", textEn: "As an adult, I never thought I could memorize the Quran online. But the personalized approach and encouraging Hafiz teacher at Alhamd Academy have made it possible. I've already memorized 5 Juz!", textAr: "كشخص بالغ، لم أظن أنني أستطيع حفظ القرآن أونلاين. لكن النهج المخصص والمعلم المشجع جعلا ذلك ممكناً.", rating: 5 },
    ]}
    relatedPages={RELATED}
    midCtaTitleEn="Start Your Hifz Journey — Book a Free Assessment"
    midCtaTitleAr="ابدأ رحلة الحفظ — احجز تقييماً مجانياً"
    midCtaDescEn="Personalized memorization plan • Hafiz teacher • No commitment"
    midCtaDescAr="خطة حفظ مخصصة • معلم حافظ • بدون التزام"
    levelsTitleEn="Hifz Program Stages — Your Memorization Roadmap"
    levelsTitleAr="مراحل برنامج الحفظ — خارطة طريق الحفظ"
    outcomesTitleEn="What You'll Accomplish with Our Hifz Program"
    outcomesTitleAr="ما ستحققه مع برنامج الحفظ لدينا"
    whyChooseTitleEn="Why Our Hifz Program Delivers Results?"
    whyChooseTitleAr="لماذا يحقق برنامج الحفظ لدينا نتائج؟"
    testimonialsTitleEn="Success Stories from Our Hifz Students"
    testimonialsTitleAr="قصص نجاح من طلاب الحفظ لدينا"
    faqTitleEn="Quran Memorization Questions Answered"
    faqTitleAr="إجابات على أسئلة حفظ القرآن"
    ctaTitleEn="Memorize the Quran — Start Your Hifz Today"
    ctaTitleAr="احفظ القرآن — ابدأ الحفظ اليوم"
    ctaDescEn="Take the first step toward becoming a Hafiz. Book a free assessment session now."
    ctaDescAr="اتخذ الخطوة الأولى نحو أن تصبح حافظاً. احجز جلسة تقييم مجانية الآن."
    ctaButtonEn="Book Free Hifz Assessment"
    ctaButtonAr="احجز تقييم حفظ مجاني"
    relatedTitleEn="Strengthen Your Quran Journey"
    relatedTitleAr="عزّز رحلتك القرآنية"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Quran Memorization (Hifz) Program Online",
      description: "Memorize Quran online with certified Hafiz teachers. Personalized Hifz plans and structured revision for kids and adults.",
      provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
      educationalLevel: ["Foundation", "Regular", "Intensive"],
      inLanguage: ["en", "ar"],
      offers: { "@type": "Offer", price: "57", priceCurrency: "USD", description: "Starting from $57/month for 3 sessions/week" },
    }}
  />
);

export default QuranMemorization;
