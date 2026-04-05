import { Baby, GraduationCap, UserCheck, Heart, RefreshCw, Globe } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Quran Memorization (Hifz)", titleAr: "حفظ القرآن", href: "/quran-memorization-hifz" },
  { titleEn: "Ijazah Program Online", titleAr: "برنامج الإجازة", href: "/ijazah-program" },
  { titleEn: "Islamic Studies Online", titleAr: "الدراسات الإسلامية", href: "/islamic-studies-online" },
  { titleEn: "Learn Arabic Online", titleAr: "تعلم العربية", href: "/arabic-for-adults" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Children Learning Quran Recitation (Ages 5–12)",
    titleAr: "الأطفال الذين يتعلمون تلاوة القرآن (5–12 سنة)",
    descEn: "Your child reads Quran but stumbles over letter sounds and applies no Tajweed rules. Our kid-friendly Tajweed classes use color-coded charts and repetition games to teach proper Makharij in a way children naturally absorb.",
    descAr: "طفلك يقرأ القرآن لكنه يتعثر في أصوات الحروف ولا يطبق أحكام التجويد. دروسنا تستخدم مخططات ملونة وألعاب تكرار لتعليم المخارج الصحيحة بطريقة يستوعبها الأطفال بشكل طبيعي.",
  },
  {
    icon: GraduationCap,
    titleEn: "Self-Taught Reciters Seeking Correction",
    titleAr: "القراء العصاميون الباحثون عن التصحيح",
    descEn: "You learned Quran recitation from apps or YouTube but suspect you have ingrained pronunciation habits that need fixing. A certified Tajweed teacher can pinpoint exactly which Makharij you're producing incorrectly and retrain your muscle memory.",
    descAr: "تعلمت تلاوة القرآن من التطبيقات أو يوتيوب لكنك تشك أن لديك عادات نطق راسخة تحتاج إصلاح. معلم تجويد معتمد يمكنه تحديد المخارج الخاطئة وإعادة تدريب ذاكرتك العضلية.",
  },
  {
    icon: UserCheck,
    titleEn: "Imams & Prayer Leaders",
    titleAr: "الأئمة وقادة الصلاة",
    descEn: "Leading Salah means your recitation is heard by the entire congregation. Even small Tajweed errors become magnified. Our advanced Tajweed track polishes your recitation to the level expected of someone leading Taraweeh and Jumu'ah prayers.",
    descAr: "إمامة الصلاة تعني أن تلاوتك مسموعة من كل المصلين. حتى أخطاء التجويد الصغيرة تتضخم. مسارنا المتقدم يصقل تلاوتك للمستوى المتوقع ممن يؤم التراويح والجمعة.",
  },
  {
    icon: Heart,
    titleEn: "Sisters Who Prefer Female Tajweed Teachers",
    titleAr: "الأخوات اللواتي يفضلن معلمات تجويد",
    descEn: "You want to perfect your Tajweed with a qualified female teacher who understands your comfort needs. Our Hafidhat teachers hold Ijazah and specialize in teaching Tajweed to women in a private, supportive setting.",
    descAr: "تريدين إتقان التجويد مع معلمة مؤهلة تفهم احتياجاتك. معلماتنا حافظات بإجازة ومتخصصات في تدريس التجويد للنساء في بيئة خاصة وداعمة.",
  },
  {
    icon: RefreshCw,
    titleEn: "Hifz Students Needing Tajweed Refinement",
    titleAr: "طلاب الحفظ الذين يحتاجون صقل التجويد",
    descEn: "You've memorized portions of the Quran but realize your Tajweed needs work before pursuing Ijazah. Our course bridges the gap between memorization ability and recitation excellence.",
    descAr: "حفظت أجزاء من القرآن لكنك تدرك أن تجويدك يحتاج عملاً قبل السعي للإجازة. دورتنا تسد الفجوة بين القدرة على الحفظ والتميز في التلاوة.",
  },
  {
    icon: Globe,
    titleEn: "Non-Arabic Speakers Worldwide",
    titleAr: "غير الناطقين بالعربية حول العالم",
    descEn: "Arabic isn't your first language, making Tajweed especially challenging. Our teachers are experts at explaining articulation points using comparisons to English sounds, making abstract Tajweed concepts tangible and achievable.",
    descAr: "العربية ليست لغتك الأولى مما يجعل التجويد تحدياً خاصاً. معلمونا خبراء في شرح نقاط النطق باستخدام مقارنات بأصوات إنجليزية، مما يجعل مفاهيم التجويد المجردة ملموسة وقابلة للتحقيق.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Recitation Check — Listening to Your Current Level",
    titleAr: "فحص التلاوة — الاستماع لمستواك الحالي",
    descEn: "The teacher asks you to recite a passage you've been practicing. They listen with trained ears, silently noting which Makharij need correction, which Tajweed rules you're applying naturally, and which ones you're missing or misapplying.",
    descAr: "يطلب منك المعلم تلاوة مقطع تدربت عليه. يستمع بأذن مدربة، يلاحظ بصمت أي المخارج تحتاج تصحيح، وأي أحكام التجويد تطبقها بشكل طبيعي وأيها تفوتك.",
  },
  {
    titleEn: "Focused Tajweed Drill — One Rule at a Time",
    titleAr: "تمرين تجويد مركز — قاعدة واحدة في كل مرة",
    descEn: "Rather than overwhelming you with corrections, the teacher isolates the most impactful Tajweed rule from your recitation. They explain the rule with visual aids, demonstrate the correct sound, and have you repeat until the difference becomes clear in your ear and mouth.",
    descAr: "بدلاً من إثقالك بالتصحيحات، يعزل المعلم أهم قاعدة تجويد من تلاوتك. يشرح القاعدة بوسائل بصرية، يوضح الصوت الصحيح، ويطلب منك التكرار حتى يتضح الفرق في أذنك وفمك.",
  },
  {
    titleEn: "Makharij Practice — Training the Tongue and Throat",
    titleAr: "تدريب المخارج — تدريب اللسان والحلق",
    descEn: "The teacher guides you through articulation point exercises. Using mirror positioning, diagrams of the mouth cavity, and side-by-side letter comparisons (like ح vs. ه, or ق vs. ك), you physically train your speech organs to produce each sound correctly.",
    descAr: "يرشدك المعلم عبر تمارين نقاط النطق. باستخدام وضع المرآة، ورسوم تجويف الفم، ومقارنات الحروف جنباً إلى جنب (مثل ح مقابل ه، أو ق مقابل ك)، تدرب أعضاء نطقك فعلياً.",
  },
  {
    titleEn: "Applied Reading — Tajweed in Context",
    titleAr: "القراءة التطبيقية — التجويد في السياق",
    descEn: "You read a new Quranic passage while consciously applying the rule you just drilled. The teacher stops you only when the target rule is violated, building your ability to self-monitor. This is where theoretical knowledge becomes practical recitation skill.",
    descAr: "تقرأ مقطعاً قرآنياً جديداً مع تطبيق القاعدة التي تدربت عليها بوعي. يوقفك المعلم فقط عند مخالفة القاعدة المستهدفة، مما يبني قدرتك على المراقبة الذاتية.",
  },
  {
    titleEn: "Recording & Self-Review Assignment",
    titleAr: "التسجيل ومهمة المراجعة الذاتية",
    descEn: "The teacher assigns specific verses to practice and record yourself reciting. By the next class, you'll submit your recording. This trains your ear to catch your own mistakes — a skill that accelerates Tajweed mastery dramatically.",
    descAr: "يحدد المعلم آيات محددة للتدرب عليها وتسجيل نفسك. بالحصة القادمة، سترسل تسجيلك. هذا يدرب أذنك على التقاط أخطائك — مهارة تسرع إتقان التجويد بشكل كبير.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"I mix up heavy and light letters — ط sounds like ت, and ظ sounds like ذ in my recitation\"",
    problemAr: "\"أخلط بين الحروف المفخمة والمرققة — ط تبدو مثل ت، وظ تبدو مثل ذ في تلاوتي\"",
    solutionEn: "Our teachers use a 'weight contrast' technique: they have you feel the difference between heavy (Tafkheem) and light (Tarqeeq) letters by exaggerating the difference first, then gradually bringing it to natural levels. Physical awareness of tongue position is the breakthrough moment for most students.",
    solutionAr: "معلمونا يستخدمون تقنية 'تباين الثقل': يجعلونك تحس الفرق بين الحروف المفخمة والمرققة بالمبالغة في الفرق أولاً ثم تقليله تدريجياً إلى المستويات الطبيعية. الوعي الجسدي بوضع اللسان هو لحظة الاختراق لمعظم الطلاب.",
  },
  {
    problemEn: "\"I know the Madd rules theoretically but I can't count beats consistently while reading\"",
    problemAr: "\"أعرف أحكام المد نظرياً لكن لا أستطيع عد الحركات بانتظام أثناء القراءة\"",
    solutionEn: "Beat counting becomes natural through our 'Tap & Read' method. You tap your finger for each beat of elongation while reading, training your internal rhythm. Within weeks, the correct Madd lengths become automatic without conscious counting.",
    solutionAr: "عد الحركات يصبح طبيعياً من خلال طريقة 'اضغط واقرأ'. تنقر بإصبعك لكل حركة مد أثناء القراءة، مدرباً إيقاعك الداخلي. خلال أسابيع، تصبح أطوال المد الصحيحة تلقائية.",
  },
  {
    problemEn: "\"Ghunnah, Ikhfa, Idgham — they all sound the same to me and I can't tell them apart\"",
    problemAr: "\"الغنة، الإخفاء، الإدغام — كلهم يبدون متشابهين ولا أميزهم\"",
    solutionEn: "These nasal sounds differ in nasalization intensity and duration. Our teachers use a '3-level Ghunnah scale' visual: full Ghunnah (Idgham), partial Ghunnah (Ikhfa at different levels), and no Ghunnah (Izhar). Audio comparisons played back-to-back make the distinction click.",
    solutionAr: "هذه الأصوات الأنفية تختلف في شدة ومدة الغنة. معلمونا يستخدمون مقياس 'مستويات الغنة الثلاثة' البصري: غنة كاملة (إدغام)، غنة جزئية (إخفاء)، وبدون غنة (إظهار). المقارنات الصوتية المتتالية توضح الفرق.",
  },
  {
    problemEn: "\"I learned Tajweed from one teacher but a different sheikh says I'm applying rules incorrectly\"",
    problemAr: "\"تعلمت التجويد من معلم لكن شيخاً آخر يقول إنني أطبق القواعد بشكل خاطئ\"",
    solutionEn: "Some Tajweed differences stem from valid scholarly opinions in different Qiraat. Our Al-Azhar certified teachers clarify which variations are acceptable and which are genuine errors. They teach Hafs 'an 'Asim (the most widely used reading) with precision while acknowledging other valid readings.",
    solutionAr: "بعض اختلافات التجويد تنبع من آراء علمية صحيحة في قراءات مختلفة. معلمونا المعتمدون من الأزهر يوضحون أي الاختلافات مقبولة وأيها أخطاء حقيقية. يدرّسون حفص عن عاصم بدقة مع الإشارة للقراءات الأخرى.",
  },
  {
    problemEn: "\"I slow down so much applying Tajweed rules that I lose fluency and it doesn't sound natural\"",
    problemAr: "\"أبطئ كثيراً عند تطبيق أحكام التجويد حتى أفقد الطلاقة ولا تبدو طبيعية\"",
    solutionEn: "Speed comes after accuracy. Our approach uses three recitation speeds: ultra-slow drill speed (Tahqeeq), moderate practice speed (Tadweer), and natural flowing speed (Hadr). You graduate through each speed only when the previous one is error-free, building genuine fluency.",
    solutionAr: "السرعة تأتي بعد الدقة. نهجنا يستخدم ثلاث سرعات تلاوة: سرعة التمرين البطيئة جداً (التحقيق)، سرعة التدريب المعتدلة (التدوير)، وسرعة التدفق الطبيعية (الحدر). تتخرج من كل سرعة عندما تكون خالية من الأخطاء.",
  },
  {
    problemEn: "\"My Waqf (stopping) is wrong — I stop in the middle of meanings and my recitation sounds choppy\"",
    problemAr: "\"وقفي خاطئ — أقف في منتصف المعاني وتلاوتي تبدو متقطعة\"",
    solutionEn: "Waqf rules are among the most neglected aspects of Tajweed. Our teachers teach you to read the Waqf symbols in the Mushaf, understand when stopping changes meaning, and develop breath control to reach natural stopping points without gasping.",
    solutionAr: "أحكام الوقف من أكثر جوانب التجويد إهمالاً. معلمونا يعلمونك قراءة رموز الوقف في المصحف، وفهم متى يغير الوقف المعنى، وتطوير التحكم بالنفس للوصول لنقاط الوقف الطبيعية.",
  },
];

const CURRICULUM: CurriculumWeek[] = [
  {
    weekEn: "Stage 1",
    weekAr: "المرحلة 1",
    topicEn: "Makharij al-Huruf — Where Each Letter is Born",
    topicAr: "مخارج الحروف — من أين يولد كل حرف",
    detailsEn: [
      "The five main articulation areas: throat, tongue, lips, nasal cavity, empty mouth",
      "Identifying your personal Makharij weaknesses through diagnostic recitation",
      "Throat letters (ء ه ع ح غ خ) — distinguishing deep, mid, and shallow throat sounds",
      "Tongue letters — tip, edge, back, and middle tongue positions for each letter",
      "Lip and nasal cavity letters with practical exercises",
    ],
    detailsAr: [
      "مناطق النطق الخمس الرئيسية: الحلق، اللسان، الشفتان، التجويف الأنفي، الفم الخاوي",
      "تحديد نقاط ضعفك في المخارج من خلال تلاوة تشخيصية",
      "حروف الحلق — تمييز أصوات الحلق العميقة والوسطى والسطحية",
      "حروف اللسان — مواضع طرف اللسان وحافته وأقصاه ووسطه",
      "حروف الشفتين والتجويف الأنفي مع تمارين عملية",
    ],
  },
  {
    weekEn: "Stage 2",
    weekAr: "المرحلة 2",
    topicEn: "Sifaat al-Huruf — The Character of Each Sound",
    topicAr: "صفات الحروف — شخصية كل صوت",
    detailsEn: [
      "Paired characteristics: Jahr/Hams, Shiddah/Rakhawah, Isti'la/Istifal, Itbaq/Infitah, Idhlaq/Ismat",
      "Unpaired characteristics: Safeer, Qalqalah, Leen, Inhiraf, Takrir, Tafashi, Istitaalah",
      "How Sifaat affect pronunciation when letters appear in different word positions",
      "Exercises to hear and produce each Sifah correctly",
      "Common Sifaat mistakes made by non-Arabic speakers and how to fix them",
    ],
    detailsAr: [
      "الصفات المتضادة: الجهر/الهمس، الشدة/الرخاوة، الاستعلاء/الاستفال، الإطباق/الانفتاح، الإذلاق/الإصمات",
      "الصفات غير المتضادة: الصفير، القلقلة، اللين، الانحراف، التكرير، التفشي، الاستطالة",
      "كيف تؤثر الصفات على النطق عندما تظهر الحروف في مواضع مختلفة",
      "تمارين لسماع وإنتاج كل صفة بشكل صحيح",
      "أخطاء الصفات الشائعة عند غير الناطقين بالعربية وكيفية إصلاحها",
    ],
  },
  {
    weekEn: "Stage 3",
    weekAr: "المرحلة 3",
    topicEn: "Noon & Meem Rules — The Nasal Sound System",
    topicAr: "أحكام النون والميم — نظام الأصوات الأنفية",
    detailsEn: [
      "Noon Sakinah & Tanween: Izhar (clear pronunciation at 6 throat letters)",
      "Idgham with and without Ghunnah — merging into specific following letters",
      "Iqlab — the conversion of Noon into Meem before Ba",
      "Ikhfa Haqeeqi — the hidden sound at 15 remaining letters with varying Ghunnah intensity",
      "Meem Sakinah rules: Idgham Shafawi, Ikhfa Shafawi, Izhar Shafawi",
    ],
    detailsAr: [
      "النون الساكنة والتنوين: الإظهار الحلقي عند 6 حروف حلقية",
      "الإدغام بغنة وبدون غنة — الدمج في حروف تالية محددة",
      "الإقلاب — تحويل النون إلى ميم قبل الباء",
      "الإخفاء الحقيقي — الصوت المخفي عند 15 حرفاً المتبقية بدرجات غنة متفاوتة",
      "أحكام الميم الساكنة: الإدغام الشفوي، الإخفاء الشفوي، الإظهار الشفوي",
    ],
  },
  {
    weekEn: "Stage 4",
    weekAr: "المرحلة 4",
    topicEn: "Madd Rules — Mastering Elongation",
    topicAr: "أحكام المد — إتقان الإطالة",
    detailsEn: [
      "Natural Madd (Madd Tabee'i) — the foundation: 2 beats every time",
      "Madd Muttasil (connected) — obligatory 4-5 beats when Hamzah follows in same word",
      "Madd Munfasil (separated) — permissible 4-5 beats when Hamzah is in the next word",
      "Madd Lazim (compulsory) — 6 beats: Kalimi and Harfi, Muthaqal and Mukhaffaf",
      "Madd 'Arid lil-Sukoon and Madd Leen — elongation when stopping on a word",
    ],
    detailsAr: [
      "المد الطبيعي — الأساس: حركتان دائماً",
      "المد المتصل — واجب 4-5 حركات عندما تتبعه همزة في نفس الكلمة",
      "المد المنفصل — جائز 4-5 حركات عندما تكون الهمزة في الكلمة التالية",
      "المد اللازم — 6 حركات: كلمي وحرفي، مثقل ومخفف",
      "المد العارض للسكون ومد اللين — الإطالة عند الوقف على كلمة",
    ],
  },
  {
    weekEn: "Stage 5",
    weekAr: "المرحلة 5",
    topicEn: "Advanced Tajweed & Ijazah Preparation",
    topicAr: "التجويد المتقدم والتحضير للإجازة",
    detailsEn: [
      "Tafkheem & Tarqeeq — mastering heavy and light letter pronunciation in every context",
      "Laam rules in Allah's name — when it's heavy and when it's light",
      "Qalqalah at three levels — weakest (middle of word), medium (end in continuity), strongest (end with stop)",
      "Waqf & Ibtida — the art of stopping and starting without distorting meaning",
      "Full Mushaf recitation review for Ijazah candidacy assessment",
      "Introduction to different Qiraat upon advanced student request",
    ],
    detailsAr: [
      "التفخيم والترقيق — إتقان نطق الحروف الثقيلة والخفيفة في كل سياق",
      "أحكام لام لفظ الجلالة — متى تُفخم ومتى تُرقق",
      "القلقلة بثلاث مستويات — أضعف (وسط الكلمة)، متوسطة (نهاية مع الوصل)، أقوى (نهاية مع الوقف)",
      "الوقف والابتداء — فن الوقف والبدء دون تشويه المعنى",
      "مراجعة تلاوة المصحف الكامل لتقييم ترشح الإجازة",
      "مقدمة في القراءات المختلفة بطلب الطلاب المتقدمين",
    ],
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    featureEn: "Teacher Certification",
    featureAr: "اعتماد المعلم",
    usEn: "✅ Al-Azhar graduates with Ijazah & connected Sanad",
    usAr: "✅ خريجو الأزهر بإجازة وسند متصل",
    othersEn: "⚠️ Often self-taught or uncertified",
    othersAr: "⚠️ غالباً عصاميون أو غير معتمدين",
  },
  {
    featureEn: "Tajweed Teaching Method",
    featureAr: "طريقة تدريس التجويد",
    usEn: "✅ Rule + Drill + Applied Reading every session",
    usAr: "✅ قاعدة + تمرين + قراءة تطبيقية كل حصة",
    othersEn: "❌ Theory-heavy lectures with minimal practice",
    othersAr: "❌ محاضرات نظرية بتدريب قليل",
  },
  {
    featureEn: "Audio Recording Practice",
    featureAr: "تدريب التسجيل الصوتي",
    usEn: "✅ Students record & self-review between classes",
    usAr: "✅ الطلاب يسجلون ويراجعون ذاتياً بين الحصص",
    othersEn: "❌ No practice guidance between sessions",
    othersAr: "❌ بدون إرشاد تدريب بين الجلسات",
  },
  {
    featureEn: "Class Format",
    featureAr: "نوع الحصة",
    usEn: "✅ 100% One-on-One",
    usAr: "✅ فردية 100%",
    othersEn: "❌ Group Tajweed classes (limited correction time)",
    othersAr: "❌ حصص تجويد جماعية (وقت تصحيح محدود)",
  },
  {
    featureEn: "Ijazah Pathway",
    featureAr: "مسار الإجازة",
    usEn: "✅ Integrated Ijazah preparation with certified sheikh",
    usAr: "✅ تحضير إجازة متكامل مع شيخ معتمد",
    othersEn: "⚠️ Tajweed only — no Ijazah option",
    othersAr: "⚠️ تجويد فقط — بدون خيار إجازة",
  },
  {
    featureEn: "Price Per Hour",
    featureAr: "السعر بالساعة",
    usEn: "✅ Starting best value per session",
    usAr: "✅ يبدأ أفضل قيمة لكل جلسة",
    othersEn: "⚠️ Significantly higher private Tajweed",
    othersAr: "⚠️ أعلى بكثير خاص",
  },
];

const DEEP_CONTENT_EN = [
  "Tajweed is far more than a set of academic rules — it is the science that preserves the Quran exactly as it was revealed to Prophet Muhammad ﷺ through Jibreel (peace be upon him). When you learn Tajweed, you are participating in an unbroken chain of oral transmission stretching back over 1,400 years. Every Makharij correction, every Ghunnah you perfect, connects you to this living tradition.",

  "The word Tajweed comes from the Arabic root ج-و-د meaning 'to improve' or 'to make excellent.' Applied to Quran recitation, it means giving every letter its due right (Haqq) and its due characteristics (Mustahaqq). The 'right' of a letter includes its articulation point (Makhraj) and its inherent characteristics (Sifaat). The 'due characteristics' include contextual changes like Tafkheem, Tarqeeq, Idgham, and other rules that apply depending on surrounding letters.",

  "Many Muslims feel overwhelmed by the number of Tajweed rules, but the reality is that most rules fall into a few logical categories. Once you understand the underlying system — that Arabic letters have specific birth points in the mouth, that certain letters interact with each other in predictable ways, and that elongation follows clear patterns — the rules stop feeling like arbitrary memorization and start feeling like a coherent, beautiful system.",

  "One of the most transformative moments in a student's Tajweed journey is when they first hear themselves recite correctly. After weeks of drilling Makharij, training their tongue to distinguish between ص and س, learning to produce a proper غ without it sounding like خ — suddenly a verse flows out with a clarity and beauty they didn't know they could produce. This moment is what drives our teachers: seeing a student's face light up when they hear themselves recite like they've always wanted to.",

  "Online Tajweed learning has a significant advantage that many people don't expect: audio clarity. In a physical classroom or mosque setting, ambient noise, echo, and distance from the teacher can mask subtle pronunciation differences. In a one-on-one online Tajweed class with professional audio equipment, both the teacher and student can hear every nuance of every letter. This makes error detection faster and correction more precise.",

  "For parents considering Tajweed classes for their children, research in Islamic pedagogy shows that children who learn Tajweed rules alongside Quran reading from the beginning avoid developing bad pronunciation habits that are much harder to correct later. Our child-friendly Tajweed approach teaches rules through colored Tajweed Mushaf reading, where different colors represent different rules, making abstract concepts visual and intuitive for young learners.",

  "The ultimate goal of Tajweed study for many students is Ijazah certification — a formal license confirming that you can recite the entire Quran with correct Tajweed, granted by a certified sheikh with a chain of narration (Sanad) connecting back to the Prophet ﷺ. At Alhamd Academy, students who demonstrate strong Tajweed application in their regular classes are invited to our Ijazah preparation track, where they read the entire Quran under the supervision of a certified sheikh.",

  "Whether you're a complete beginner who has never heard the word 'Makharij' before, or an advanced reciter preparing for Ijazah, Tajweed mastery follows the same principle: patient, consistent practice with expert feedback. There are no shortcuts, but there is a proven path — and our certified Al-Azhar teachers have walked this path themselves and guided hundreds of students along it successfully.",
];

const DEEP_CONTENT_AR = [
  "التجويد أكثر بكثير من مجموعة قواعد أكاديمية — إنه العلم الذي يحفظ القرآن تماماً كما أُنزل على النبي محمد ﷺ عبر جبريل عليه السلام. عندما تتعلم التجويد، أنت تشارك في سلسلة نقل شفهي متصلة تمتد لأكثر من 1400 عام.",

  "كلمة التجويد تأتي من الجذر العربي ج-و-د بمعنى 'التحسين' أو 'الإتقان'. يعني إعطاء كل حرف حقه ومستحقه. حق الحرف يشمل مخرجه وصفاته الذاتية. المستحق يشمل التغييرات السياقية كالتفخيم والترقيق والإدغام.",

  "كثير من المسلمين يشعرون بالإرهاق من عدد أحكام التجويد، لكن الواقع أن معظم القواعد تنتمي لفئات منطقية قليلة. عندما تفهم النظام الأساسي — أن الحروف العربية لها نقاط ولادة محددة في الفم، وأن حروفاً معينة تتفاعل مع بعضها بطرق متوقعة — تتوقف القواعد عن كونها حفظاً عشوائياً.",

  "من أكثر اللحظات تحولاً في رحلة التجويد عندما يسمع الطالب نفسه يتلو بشكل صحيح لأول مرة. بعد أسابيع من تدريب المخارج وتدريب اللسان — تتدفق آية فجأة بوضوح وجمال لم يكن يعرف أنه يستطيع إنتاجهما.",

  "التعلم الأونلاين للتجويد له ميزة مهمة: وضوح الصوت. في الفصل الدراسي أو المسجد، الضوضاء والصدى قد تخفي فروقات النطق الدقيقة. في حصة تجويد أونلاين فردية بمعدات صوتية احترافية، يمكن للمعلم والطالب سماع كل فارق دقيق.",

  "للآباء الذين يفكرون في دروس التجويد لأطفالهم: الأبحاث تظهر أن الأطفال الذين يتعلمون التجويد مع قراءة القرآن من البداية يتجنبون تطوير عادات نطق سيئة يصعب تصحيحها لاحقاً.",

  "الهدف النهائي لكثير من الطلاب هو الإجازة — رخصة رسمية تؤكد قدرتك على تلاوة القرآن كاملاً بالتجويد الصحيح، يمنحها شيخ معتمد بسند متصل إلى النبي ﷺ. في أكاديمية الحمد، الطلاب المتميزون في التجويد يُدعون لمسار الإجازة.",

  "سواء كنت مبتدئاً لم يسمع كلمة 'مخارج' من قبل، أو قارئاً متقدماً يستعد للإجازة، إتقان التجويد يتبع نفس المبدأ: التدريب الصبور والمتسق مع ملاحظات الخبراء. لا توجد اختصارات، لكن يوجد طريق مثبت — ومعلمونا من الأزهر ساروا عليه بأنفسهم.",
];

const TajweedCourse = () => (
  <ServicePageLayout
    seoTitle="Tajweed Course Online | Learn Tajweed Rules with Teacher | Alhamd Academy"
    seoDescription="Master Tajweed rules online with certified teachers. Learn Tajweed online for beginners, adults, and kids. Online Tajweed classes with Makharij and Ijazah preparation. Free trial."
    seoKeywords="tajweed course online, learn tajweed online, quran tajweed classes, tajweed rules course, online tajweed classes, tajweed course for beginners, learn tajweed online with teacher, tajweed classes for adults, tajweed classes for kids, what are tajweed rules, how to learn tajweed, makharij al huruf, tajweed for beginners, advanced tajweed, ijazah in tajweed, quran recitation with tajweed"
    canonical="https://alhamdacademy.net/tajweed-course-online"
    heroTitleEn="Tajweed Course Online — Learn Tajweed Rules with Expert Teachers"
    heroTitleAr="دورة التجويد أونلاين — تعلم أحكام التجويد مع معلمين خبراء"
    heroSubtitleEn="Master Every Tajweed Rule from Certified Al-Azhar Teachers"
    heroSubtitleAr="أتقن كل أحكام التجويد من معلمين معتمدين من الأزهر"
    heroDescEn="Our comprehensive online Tajweed course covers everything from basic Makharij (articulation points) to advanced rules of Quran recitation. Whether you're a beginner learning Tajweed for the first time, an adult improving recitation, or a kid starting Tajweed classes, our certified teachers will guide you step by step to perfect your Quran recitation."
    heroDescAr="دورتنا الشاملة في التجويد أونلاين تغطي كل شيء من المخارج الأساسية إلى أحكام التلاوة المتقدمة. سواء كنت مبتدئاً أو تستعد للإجازة، معلمونا المعتمدون سيرشدونك خطوة بخطوة لإتقان تلاوتك."
    aboutTitleEn="What Are Tajweed Rules & Why Every Muslim Must Learn Tajweed"
    aboutTitleAr="ما هي أحكام التجويد ولماذا يجب على كل مسلم تعلم التجويد"
    aboutContentEn={[
      "Tajweed is the science of reading the Quran correctly. The word 'Tajweed' literally means 'to make better' or 'to beautify.' It encompasses the rules that govern how each letter of the Quran should be pronounced, including the characteristics of letters (Sifaat), their articulation points (Makharij), and how they interact with each other.",
      "Learning Tajweed is considered a communal obligation (Fard Kifayah) in Islam, meaning that some members of the Muslim community must master it. However, reading the Quran with basic Tajweed rules to avoid changing the meaning is an individual obligation (Fard Ayn) for every Muslim who reads the Quran.",
      "Our online Tajweed course is designed for everyone who wants to learn Tajweed — from complete beginners taking their first Tajweed course for beginners, to adults seeking tajweed classes for adults to improve their recitation, to kids learning Tajweed through fun and interactive methods. Our certified Al-Azhar teachers hold Ijazah with connected chains of narration going back to the Prophet Muhammad ﷺ.",
      "Many students find Tajweed challenging when self-studying, but with our one-on-one online Tajweed classes, our teachers can immediately correct pronunciation mistakes and provide real-time feedback. This personalized attention with a dedicated Tajweed teacher is what makes our program so effective.",
      "Our Tajweed course online goes beyond just learning rules — we teach you how to apply Tajweed naturally in your daily Quran recitation. By the end of the course, Tajweed rules will become second nature to you.",
    ]}
    aboutContentAr={[
      "التجويد هو علم قراءة القرآن بشكل صحيح. كلمة 'تجويد' تعني حرفياً 'التحسين' أو 'التجميل'. يشمل القواعد التي تحكم كيفية نطق كل حرف في القرآن بما في ذلك صفات الحروف ومخارجها.",
      "تعلم التجويد يعتبر فرض كفاية في الإسلام. لكن قراءة القرآن بأحكام التجويد الأساسية لتجنب تغيير المعنى هو فرض عين على كل مسلم يقرأ القرآن.",
      "دورتنا في التجويد أونلاين مصممة للجميع — من المبتدئين تماماً إلى الكبار والأطفال. معلمونا المعتمدون من الأزهر يحملون إجازات بسلاسل متصلة إلى النبي محمد ﷺ.",
      "كثير من الطلاب يجدون التجويد صعباً عند الدراسة الذاتية، لكن مع دروس التجويد الفردية أونلاين، يمكن لمعلمينا تصحيح أخطاء النطق فوراً وتقديم ملاحظات آنية.",
      "دورتنا تتجاوز مجرد تعلم القواعد — نعلمك كيف تطبق التجويد بشكل طبيعي في تلاوتك اليومية.",
    ]}
    methodTitleEn="How to Learn Tajweed Online — Our Teaching Approach"
    methodTitleAr="كيف تتعلم التجويد أونلاين — نهجنا في التدريس"
    methodContentEn={[
      "Our online Tajweed classes combine the classical approach used in Islamic schools with modern technology. Each lesson focuses on specific Tajweed rules, with plenty of practical application through Quran reading with your teacher.",
      "We use visual aids, audio recordings of master reciters, and interactive exercises to make learning Tajweed online engaging. Students practice each rule extensively before moving to the next, ensuring thorough understanding and natural application of all Tajweed rules.",
      "For advanced students, we offer Ijazah in Tajweed preparation where students read the entire Quran to a certified sheikh with a connected chain of narration. This is the highest certification in Quran recitation.",
      "Our teachers record sample recitations for students to practice between Tajweed classes, and provide detailed feedback on audio recordings submitted by students. This continuous practice-feedback loop accelerates learning Tajweed significantly.",
    ]}
    methodContentAr={[
      "دروس التجويد أونلاين تجمع بين النهج الكلاسيكي المستخدم في المدارس الإسلامية والتكنولوجيا الحديثة.",
      "نستخدم وسائل بصرية وتسجيلات صوتية لكبار القراء وتمارين تفاعلية لجعل تعلم التجويد أونلاين ممتعاً.",
      "للطلاب المتقدمين، نقدم التحضير للإجازة في التجويد حيث يقرأ الطلاب القرآن كاملاً على شيخ معتمد بسند متصل.",
      "يسجل معلمونا تلاوات نموذجية للطلاب للتدرب بين دروس التجويد، ويقدمون ملاحظات تفصيلية على تسجيلات الطلاب.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Who Needs Our Online Tajweed Course?"
    audienceTitleAr="من يحتاج دورة التجويد أونلاين لدينا؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="Inside a Tajweed Class — What Happens in Each Session"
    classSessionTitleAr="داخل حصة التجويد — ماذا يحدث في كل جلسة"
    challenges={CHALLENGES}
    challengesTitleEn="Tajweed Struggles We Help You Overcome"
    challengesTitleAr="صعوبات التجويد التي نساعدك على تجاوزها"
    curriculum={CURRICULUM}
    curriculumTitleEn="Complete Tajweed Curriculum — From Makharij to Ijazah"
    curriculumTitleAr="منهج التجويد الكامل — من المخارج إلى الإجازة"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Our Tajweed Program vs. Other Platforms"
    comparisonTitleAr="برنامج التجويد لدينا مقارنة بالمنصات الأخرى"
    deepContentTitleEn="The Complete Guide to Learning Tajweed Online"
    deepContentTitleAr="الدليل الشامل لتعلم التجويد أونلاين"
    deepContentEn={DEEP_CONTENT_EN}
    deepContentAr={DEEP_CONTENT_AR}
    levels={[
      {
        titleEn: "Beginner Tajweed — Tajweed Rules for Beginners",
        titleAr: "التجويد للمبتدئين — أحكام التجويد الأساسية",
        descEn: "Learn the foundations of Tajweed rules including letter characteristics (Sifaat) and Makharij al-Huruf (articulation points). Perfect for beginners starting their Tajweed course.",
        descAr: "تعلم أسس أحكام التجويد بما في ذلك صفات الحروف ومخارج الحروف. مثالية للمبتدئين.",
        topicsEn: ["Makharij al-Huruf (articulation points)", "Sifaat (letter characteristics)", "Noon Sakinah & Tanween rules", "Meem Sakinah rules", "Laam Sakinah rules", "Basic Madd rules"],
        topicsAr: ["مخارج الحروف", "صفات الحروف", "أحكام النون الساكنة والتنوين", "أحكام الميم الساكنة", "أحكام اللام الساكنة", "أحكام المد الأساسية"],
      },
      {
        titleEn: "Intermediate Tajweed — Advanced Tajweed Rules",
        titleAr: "التجويد المتوسط — أحكام التجويد المتقدمة",
        descEn: "Deepen your Tajweed knowledge with advanced Madd rules, Waqf & Ibtida rules, and extensive Quran recitation practice with your Tajweed teacher.",
        descAr: "عمّق معرفتك بالتجويد مع أحكام المد المتقدمة والوقف والابتداء.",
        topicsEn: ["Extended Madd categories", "Waqf & Ibtida (stopping & starting)", "Hamzatul Wasl & Qat'", "Heavy & light letters (Tafkheem & Tarqeeq)", "Practical Quran recitation application", "Surah memorization with Tajweed"],
        topicsAr: ["أقسام المد التفصيلية", "الوقف والابتداء", "همزة الوصل والقطع", "التفخيم والترقيق", "التطبيق العملي على التلاوة", "حفظ السور مع التجويد"],
      },
      {
        titleEn: "Advanced Tajweed & Ijazah Certification",
        titleAr: "التجويد المتقدم وشهادة الإجازة",
        descEn: "Master all Tajweed sciences and prepare for Ijazah certification in Quran recitation with our certified Al-Azhar teachers.",
        descAr: "أتقن جميع علوم التجويد واستعد لشهادة الإجازة في تلاوة القرآن.",
        topicsEn: ["Complete Jazariyyah text study", "Different Qiraat (readings)", "Ijazah certification prep", "Advanced Maqamat", "Teaching Tajweed methodology", "Connected chain (Sanad) verification"],
        topicsAr: ["دراسة متن الجزرية كاملاً", "القراءات المختلفة", "التحضير لشهادة الإجازة", "المقامات المتقدمة", "منهجية تدريس التجويد", "التحقق من السند المتصل"],
      },
    ]}
    outcomesEn={[
      "Pronounce every Arabic letter from its correct Makharij (articulation point)",
      "Apply all Tajweed rules naturally while reading the Quran",
      "Identify and correct common Tajweed mistakes in your recitation",
      "Recite the Quran with beautiful, melodic recitation and proper Tajweed",
      "Understand the difference between clear mistakes (Lahn Jaliy) and hidden mistakes (Lahn Khafiy)",
      "Prepare for Ijazah certification in Quran recitation with Tajweed",
    ]}
    outcomesAr={[
      "نطق كل حرف عربي من مخرجه الصحيح",
      "تطبيق جميع أحكام التجويد بشكل طبيعي أثناء قراءة القرآن",
      "تحديد وتصحيح أخطاء التجويد الشائعة في تلاوتك",
      "تلاوة القرآن بتلاوة جميلة ومرتلة مع التجويد الصحيح",
      "فهم الفرق بين اللحن الجلي واللحن الخفي",
      "التحضير لشهادة الإجازة في تلاوة القرآن بالتجويد",
    ]}
    featuresEn={[
      "One-on-one online Tajweed lessons with certified Al-Azhar graduates",
      "Tajweed teachers with Ijazah and connected chains of narration (Sanad)",
      "Audio recording practice between Tajweed classes for continuous improvement",
      "Visual Tajweed charts and interactive learning materials",
      "Ijazah certification program for qualifying students",
      "Flexible scheduling for Tajweed classes worldwide — any timezone",
      "Regular assessments to track your Tajweed progress",
      "Free trial Tajweed class to experience our teaching method",
    ]}
    featuresAr={[
      "دروس تجويد أونلاين فردية مع خريجي الأزهر المعتمدين",
      "معلمو تجويد بإجازة وسند متصل",
      "تدريب بالتسجيل الصوتي بين دروس التجويد للتحسين المستمر",
      "مخططات تجويد بصرية ومواد تعليمية تفاعلية",
      "برنامج شهادة الإجازة للطلاب المؤهلين",
      "مواعيد مرنة لدروس التجويد حول العالم",
      "تقييمات منتظمة لتتبع تقدمك في التجويد",
      "حصة تجويد تجريبية مجانية لتجربة طريقتنا في التدريس",
    ]}
    faqs={[
      { questionEn: "What are Tajweed rules and why are they important?", questionAr: "ما هي أحكام التجويد ولماذا هي مهمة؟", answerEn: "Tajweed rules are the set of guidelines for correctly pronouncing and reciting the Quran as it was revealed to Prophet Muhammad ﷺ. These rules cover letter pronunciation (Makharij), letter characteristics (Sifaat), elongation (Madd), nasalization (Ghunna), and more. Learning Tajweed is important because incorrect pronunciation can change the meaning of Quranic verses.", answerAr: "أحكام التجويد هي مجموعة القواعد للنطق الصحيح وتلاوة القرآن كما أُنزل على النبي محمد ﷺ. تشمل هذه القواعد مخارج الحروف وصفاتها والمد والغنة وغيرها." },
      { questionEn: "How to learn Tajweed online effectively?", questionAr: "كيف أتعلم التجويد أونلاين بفعالية؟", answerEn: "The best way to learn Tajweed online is through one-on-one classes with a certified Tajweed teacher who can hear your recitation and correct mistakes in real-time. At Alhamd Academy, our online Tajweed classes combine rule explanation with extensive Quran reading practice, audio recording between sessions, and regular assessments to track your progress.", answerAr: "أفضل طريقة لتعلم التجويد أونلاين هي من خلال دروس فردية مع معلم تجويد معتمد يسمع تلاوتك ويصحح الأخطاء فوراً." },
      { questionEn: "Can a beginner learn Tajweed online?", questionAr: "هل يمكن للمبتدئ تعلم التجويد أونلاين؟", answerEn: "Absolutely! Our Tajweed course for beginners is designed for students with no prior Tajweed knowledge. Our online Tajweed classes start from the basics — Arabic letter pronunciation and Makharij — and gradually progress to more advanced Tajweed rules.", answerAr: "بالتأكيد! دورة التجويد للمبتدئين مصممة للطلاب بدون معرفة سابقة بالتجويد. نبدأ من الأساسيات ونتقدم تدريجياً." },
      { questionEn: "Are your Tajweed classes suitable for kids?", questionAr: "هل دروس التجويد مناسبة للأطفال؟", answerEn: "Yes! We offer specialized Tajweed classes for kids that use fun, interactive methods to teach correct Quran pronunciation in an age-appropriate way. Our teachers are trained to make Tajweed learning enjoyable for children of all ages.", answerAr: "نعم! نقدم دروس تجويد متخصصة للأطفال تستخدم أساليب تفاعلية وممتعة لتعليم النطق الصحيح للقرآن بطريقة مناسبة للعمر." },
      { questionEn: "What is an Ijazah in Quran recitation?", questionAr: "ما هي الإجازة في تلاوة القرآن؟", answerEn: "An Ijazah is the highest certification in Quran recitation. It's a license that certifies you have read the entire Quran to a qualified sheikh with a connected chain of narration (Sanad) going back to the Prophet Muhammad ﷺ. It authorizes you to teach and recite the Quran with authority.", answerAr: "الإجازة هي أعلى شهادة في تلاوة القرآن. هي رخصة تشهد بأنك قرأت القرآن كاملاً على شيخ مؤهل بسند متصل إلى النبي محمد ﷺ." },
      { questionEn: "Do you offer Tajweed classes for adults?", questionAr: "هل تقدمون دروس تجويد للكبار؟", answerEn: "Yes, our Tajweed classes for adults are specifically designed for busy professionals and adult learners. We understand that adults have different learning needs and schedules, so we offer flexible timing and a focused approach that respects your time while ensuring thorough Tajweed mastery.", answerAr: "نعم، دروس التجويد للكبار مصممة خصيصاً للمهنيين المشغولين والمتعلمين البالغين. نقدم مواعيد مرنة ونهجاً مركزاً يحترم وقتك." },
    ]}
    testimonials={[
      { name: "Yusuf A.", country: "Germany", textEn: "I thought I knew Tajweed until I started my online Tajweed course with Alhamd Academy. My teacher identified Tajweed mistakes I didn't even know I was making. My Quran recitation has completely transformed.", textAr: "ظننت أنني أعرف التجويد حتى بدأت دورة التجويد أونلاين مع أكاديمية الحمد. معلمي حدد أخطاء لم أكن أعرف أنني أرتكبها. تلاوتي تحولت تماماً.", rating: 5 },
      { name: "Aisha T.", country: "United States", textEn: "The online Tajweed classes are excellent. My Tajweed teacher explains each rule clearly and gives me plenty of practice time. I'm now preparing for my Ijazah and couldn't be happier with my progress.", textAr: "دروس التجويد أونلاين ممتازة. معلمتي تشرح كل قاعدة بوضوح وتمنحني وقتاً كافياً للتدريب.", rating: 5 },
    ]}
    relatedPages={RELATED}
    midCtaTitleEn="Perfect Your Recitation — Start with a Free Tajweed Lesson"
    midCtaTitleAr="أتقن تلاوتك — ابدأ بدرس تجويد مجاني"
    midCtaDescEn="Private Tajweed session • Certified teacher with Ijazah • No commitment"
    midCtaDescAr="جلسة تجويد خاصة • معلم معتمد بإجازة • بدون التزام"
    levelsTitleEn="Tajweed Mastery Path — From Basics to Ijazah"
    levelsTitleAr="مسار إتقان التجويد — من الأساسيات إلى الإجازة"
    outcomesTitleEn="Skills You'll Gain from Our Tajweed Course"
    outcomesTitleAr="المهارات التي ستكتسبها من دورة التجويد"
    whyChooseTitleEn="What Sets Our Tajweed Program Apart?"
    whyChooseTitleAr="ما الذي يميز برنامج التجويد لدينا؟"
    testimonialsTitleEn="Tajweed Students Share Their Experience"
    testimonialsTitleAr="طلاب التجويد يشاركون تجربتهم"
    faqTitleEn="Your Tajweed Questions Answered"
    faqTitleAr="إجابات على أسئلتك عن التجويد"
    ctaTitleEn="Transform Your Quran Recitation Today"
    ctaTitleAr="غيّر تلاوتك للقرآن اليوم"
    ctaDescEn="Join our Tajweed course and recite the Quran with confidence. Free trial class available."
    ctaDescAr="انضم لدورة التجويد واقرأ القرآن بثقة. حصة تجريبية مجانية متاحة."
    ctaButtonEn="Start Your Tajweed Journey"
    ctaButtonAr="ابدأ رحلة التجويد"
    relatedTitleEn="Related Courses You May Like"
    relatedTitleAr="دورات ذات صلة قد تعجبك"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Tajweed Course Online — Learn Tajweed Rules",
      description: "Master Tajweed rules online with certified Egyptian teachers. Tajweed course for beginners to advanced with Ijazah preparation.",
      provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
      educationalLevel: ["Beginner", "Intermediate", "Advanced"],
      inLanguage: ["en", "ar"],
    }}
  />
);

export default TajweedCourse;
