import { BookOpen, GraduationCap, Award, Users, Globe, Headphones } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type {
  AudiencePersona,
  ClassStep,
  Challenge,
  CurriculumWeek,
  ComparisonRow,
  LevelInfo,
  FAQ,
} from "@/components/ServicePageLayout";

/**
 * Dedicated conversion-focused course page for the "online ijazah program"
 * / "quran ijazah online" / "sanad connected to the prophet" keyword cluster.
 * Route: /courses/ijazah-program
 * Arabic mirror served automatically at /ar/courses/ijazah-program via the
 * /ar/:path* prerender rewrite + basename-aware BrowserRouter.
 */

const CANONICAL = "https://www.alhamdacademy.net/courses/ijazah-program";

const RELATED = [
  { titleEn: "Ten Qira'at Online", titleAr: "القراءات العشر", href: "/courses/ten-qirat-online" },
  { titleEn: "Quran Memorization (Hifz)", titleAr: "حفظ القرآن", href: "/quran-memorization-hifz" },
  { titleEn: "Learn Quran with Tajweed", titleAr: "تعلم القرآن بالتجويد", href: "/learn-quran-with-tajweed" },
  { titleEn: "Online Quran Classes", titleAr: "دورة القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "One-on-One Quran Classes", titleAr: "حصص فردية", href: "/one-on-one-quran-classes" },
  { titleEn: "Free Trial Class", titleAr: "حصة تجريبية مجانية", href: "/free-trial" },
];

const AUDIENCE: AudiencePersona[] = [
  {
    icon: GraduationCap,
    titleEn: "Serious Students Pursuing Ijazah in Tajweed",
    titleAr: "طلاب جادّون يسعون لإجازة في التجويد",
    descEn: "You have a solid Tajweed foundation and want to complete a full Khatmah on a certified shaykh to earn a formal Ijazah in the Riwayah of Hafs 'an 'Asim with a Sanad connected to the Prophet ﷺ.",
    descAr: "لديك أساس قوي في التجويد وتريد إتمام ختمة كاملة على شيخ مؤهل للحصول على إجازة رسمية في رواية حفص عن عاصم بسند متصل إلى النبي ﷺ.",
  },
  {
    icon: BookOpen,
    titleEn: "Huffaz Ready for Ijazah in Hifz",
    titleAr: "حفاظ مستعدون لإجازة الحفظ",
    descEn: "You have memorized the entire Quran and want to seal your Hifz with a formal Ijazah — a written certificate documenting your unbroken chain of transmission back to the Prophet ﷺ.",
    descAr: "أتممت حفظ القرآن كاملًا وتريد ختم حفظك بإجازة رسمية — وثيقة مكتوبة توثّق سندك المتصل إلى النبي ﷺ.",
  },
  {
    icon: Award,
    titleEn: "Imams, Teachers & Future Muqri'oon",
    titleAr: "الأئمة والمعلمون والمقرئون المستقبليون",
    descEn: "You lead prayers, teach Quran, or plan to open your own halaqah and need a documented Ijazah that authorizes you to teach and, in turn, grant Ijazah to your own students.",
    descAr: "تؤم الناس أو تدرّس القرآن أو تخطط لفتح حلقتك، وتحتاج إجازة موثقة تؤهلك للتدريس ومنح الإجازة لطلابك مستقبلًا.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  { titleEn: "Recite Previous Portion from Memory", titleAr: "تلاوة المقطع السابق حفظًا", descEn: "The shaykh listens to the student recite the previously assigned pages from memory with full Tajweed and no notes.", descAr: "يستمع الشيخ إلى الطالب وهو يتلو الصفحات السابقة حفظًا بتجويد كامل ودون الاطلاع على المصحف." },
  { titleEn: "Precision Tajweed Correction", titleAr: "تصحيح دقيق للتجويد", descEn: "Every hidden error in makharij, sifat, madd, ghunnah or waqf is isolated, demonstrated by the shaykh, and drilled until it is stable.", descAr: "كل خطأ خفي في المخارج والصفات والمد والغنة والوقف يُعزل ويُوضّح ثم يُدرَّب عليه حتى يستقر." },
  { titleEn: "New Portion Talaqqi", titleAr: "تلقٍّ لمقطع جديد", descEn: "The shaykh recites the new portion first, the student follows verse by verse (Talaqqi), then recites it back until it is fully corrected.", descAr: "يتلو الشيخ المقطع الجديد أولًا، ثم يتابعه الطالب آية آية (تلقيًا)، ثم يعيد تلاوته حتى يُصحَّح كليًا." },
  { titleEn: "Assignment & Ijazah Progress Log", titleAr: "التكليف وسجل تقدم الإجازة", descEn: "The student receives the next assignment and a written note added to the Ijazah progress log tracking the Khatmah page by page.", descAr: "يتسلم الطالب التكليف الجديد وملاحظة مكتوبة تُضاف إلى سجل تقدم الإجازة الذي يتابع الختمة صفحة صفحة." },
];

const CHALLENGES: Challenge[] = [
  { problemEn: "\"Are online Ijazahs really recognized?\"", problemAr: "\"هل الإجازة أونلاين معترف بها فعلًا؟\"", solutionEn: "Yes. What matters is the shaykh's Sanad, not the venue. Every Ijazah we grant is issued by an Al-Azhar-qualified shaykh with a written, unbroken chain to the Prophet ﷺ — accepted by scholars and institutions worldwide.", solutionAr: "نعم. المهم هو سند الشيخ لا مكان الحصة. كل إجازة نمنحها تصدر عن شيخ مؤهل من الأزهر بسلسلة مكتوبة متصلة إلى النبي ﷺ، ومقبولة لدى العلماء والمؤسسات في كل مكان." },
  { problemEn: "\"How long does the Ijazah take?\"", problemAr: "\"كم يستغرق الحصول على الإجازة؟\"", solutionEn: "The timeline is fully personalized. Your shaykh sets a pace that matches your existing Tajweed level, your Hifz strength and your weekly schedule — and adjusts it as you progress.", solutionAr: "الوتيرة مخصصة بالكامل. يضع الشيخ خطة تناسب مستواك في التجويد وقوة حفظك وجدولك الأسبوعي، ويعدّلها معك مع تقدمك." },
  { problemEn: "\"I'm not sure I'm ready to start the Khatmah.\"", problemAr: "\"لست متأكدًا أنني مستعد لبدء الختمة.\"", solutionEn: "The free assessment class is exactly for this. Your shaykh will listen to your recitation, evaluate your Tajweed level, and either start the Ijazah Khatmah immediately or place you in a short pre-Ijazah polishing phase.", solutionAr: "حصة التقييم المجانية مخصصة لذلك بالضبط. سيستمع الشيخ لتلاوتك ويقيّم مستواك، ثم إما يبدأ بختمة الإجازة مباشرة أو يضعك في مرحلة قصيرة لصقل التلاوة قبلها." },
  { problemEn: "\"I live in a very different timezone from Egypt.\"", problemAr: "\"أعيش في منطقة زمنية بعيدة عن مصر.\"", solutionEn: "Classes are one-on-one and scheduled 24/7. Students from the USA, Canada, UK, Australia and Europe pick slots that fit their day — before Fajr, after Isha, weekends, whatever works.", solutionAr: "الحصص فردية وتُحجز على مدار الساعة. طلابنا من أمريكا وكندا وبريطانيا وأستراليا وأوروبا يختارون المواعيد التي تناسبهم — قبل الفجر أو بعد العشاء أو في العطلات." },
];

const CURRICULUM: CurriculumWeek[] = [
  { weekEn: "Phase 1 — Assessment & Foundation", weekAr: "المرحلة 1 — التقييم والتأسيس", topicEn: "Tajweed Audit & Pre-Ijazah Polishing", topicAr: "مراجعة التجويد وصقل ما قبل الإجازة", detailsEn: ["Full recitation audit with the shaykh to identify hidden errors", "Targeted drills on makharij (articulation points) and sifat (attributes)", "Rules of madd, ghunnah, idghaam, ikhfa' and iqlaab revisited in depth", "Building consistency in waqf and ibtida' across long passages"], detailsAr: ["مراجعة كاملة للتلاوة مع الشيخ لكشف الأخطاء الخفية", "تدريبات مركّزة على المخارج والصفات", "مراجعة معمقة لأحكام المد والغنة والإدغام والإخفاء والإقلاب", "بناء ثبات في الوقف والابتداء عبر المقاطع الطويلة"] },
  { weekEn: "Phase 2 — Ijazah Khatmah Begins", weekAr: "المرحلة 2 — بدء ختمة الإجازة", topicEn: "Continuous Talaqqi from Al-Fatiha", topicAr: "تلقٍّ متصل من الفاتحة", detailsEn: ["Formal Khatmah opens under the shaykh's ear from Surah Al-Fatiha", "Every page recited to the shaykh until fully corrected", "Written progress notes and error log kept for every session", "A steady weekly rhythm the shaykh sets with the student"], detailsAr: ["افتتاح الختمة الرسمية على الشيخ من سورة الفاتحة", "كل صفحة تُتلى على الشيخ حتى تُصحَّح كليًا", "ملاحظات تقدم مكتوبة وسجل للأخطاء في كل حصة", "وتيرة أسبوعية منتظمة يضعها الشيخ مع الطالب"] },
  { weekEn: "Phase 3 — Deep Khatmah & Consolidation", weekAr: "المرحلة 3 — تعميق الختمة والتثبيت", topicEn: "Long Surahs and Rare Rules", topicAr: "السور الطوال والأحكام النادرة", detailsEn: ["Focus on the long surahs — Al-Baqarah, Aal-'Imran, An-Nisa'", "Attention to rare rules: imalah, tashil, saktah, isti'aadha variations", "Muraaja'ah (revision) of earlier juz interleaved with new material", "Preparation for the oral exam that precedes Ijazah"], detailsAr: ["التركيز على السور الطوال — البقرة وآل عمران والنساء", "الاهتمام بالأحكام النادرة: الإمالة والتسهيل والسكتات وأوجه الاستعاذة", "مراجعة الأجزاء السابقة بالتوازي مع الجديد", "الاستعداد للاختبار الشفهي السابق للإجازة"] },
  { weekEn: "Phase 4 — Ijazah & Sanad", weekAr: "المرحلة 4 — الإجازة والسند", topicEn: "Final Khatmah, Oral Exam & Written Ijazah", topicAr: "الختمة النهائية والامتحان الشفهي ومنح الإجازة", detailsEn: ["Completion of the full Khatmah in front of the shaykh", "Oral examination on Tajweed rules and their application", "Formal written Ijazah issued with the full Sanad chain to the Prophet ﷺ", "Guidance on how to teach and grant Ijazah in turn"], detailsAr: ["إتمام الختمة كاملة أمام الشيخ", "امتحان شفهي في أحكام التجويد وتطبيقها", "منح إجازة رسمية مكتوبة بسلسلة السند المتصل إلى النبي ﷺ", "توجيه لكيفية التدريس ومنح الإجازة لاحقًا"] },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Ijazah Authenticity", featureAr: "أصالة الإجازة", usEn: "✅ Al-Azhar-certified Sanad holders", usAr: "✅ مشايخ مسندون معتمدون من الأزهر", othersEn: "❌ Unverified Ijazah claims", othersAr: "❌ ادعاءات إجازة غير موثقة" },
  { featureEn: "Class Format", featureAr: "نوع الحصة", usEn: "✅ One-on-one Talaqqi, live video", usAr: "✅ تلقٍّ فردي عبر فيديو مباشر", othersEn: "❌ Recorded lectures or group classes", othersAr: "❌ محاضرات مسجلة أو حصص جماعية" },
  { featureEn: "Sanad Documentation", featureAr: "توثيق السند", usEn: "✅ Written Ijazah document with full chain", usAr: "✅ وثيقة إجازة مكتوبة بالسند الكامل", othersEn: "⚠️ Verbal or no formal document", othersAr: "⚠️ شفهية أو بدون وثيقة رسمية" },
  { featureEn: "Ijazah Tracks", featureAr: "مسارات الإجازة", usEn: "✅ Both Tajweed (recitation) and Hifz", usAr: "✅ تجويد (تلاوة) وحفظ", othersEn: "⚠️ Usually one track only", othersAr: "⚠️ عادةً مسار واحد فقط" },
  { featureEn: "Scheduling", featureAr: "المواعيد", usEn: "✅ 24/7 slots for all timezones", usAr: "✅ مواعيد على مدار الساعة لجميع المناطق الزمنية", othersEn: "⚠️ Fixed Egypt-only hours", othersAr: "⚠️ ساعات مصرية ثابتة فقط" },
  { featureEn: "Free Trial", featureAr: "حصة تجريبية", usEn: "✅ Free assessment session", usAr: "✅ حصة تقييم مجانية", othersEn: "❌ Paid intake", othersAr: "❌ حصة قبول مدفوعة" },
];

const LEVELS: LevelInfo[] = [
  {
    titleEn: "Pre-Ijazah — Tajweed Polishing",
    titleAr: "ما قبل الإجازة — صقل التجويد",
    descEn: "For students whose Tajweed still has hidden errors. A short focused phase to polish the recitation before the formal Ijazah Khatmah opens.",
    descAr: "للطلاب الذين لا تزال في تلاوتهم أخطاء خفية. مرحلة قصيرة مركّزة لصقل التلاوة قبل افتتاح ختمة الإجازة الرسمية.",
    topicsEn: ["Full recitation audit", "Makharij & sifat drills", "Madd, ghunnah, idghaam refresher"],
    topicsAr: ["مراجعة كاملة للتلاوة", "تدريبات على المخارج والصفات", "مراجعة المد والغنة والإدغام"],
  },
  {
    titleEn: "Ijazah in Tajweed (Riwayat Hafs)",
    titleAr: "إجازة في التجويد (رواية حفص)",
    descEn: "A full Khatmah of the Quran recited to the shaykh from the mus'haf in the Riwayah of Hafs 'an 'Asim from the Shatibiyyah, culminating in a written Ijazah.",
    descAr: "ختمة كاملة للقرآن الكريم تُتلى على الشيخ من المصحف برواية حفص عن عاصم من الشاطبية، تُتوَّج بإجازة مكتوبة.",
    topicsEn: ["Continuous Khatmah with the shaykh", "Weekly correction and progress notes", "Oral exam on Tajweed rules", "Formal written Ijazah document"],
    topicsAr: ["ختمة متصلة على الشيخ", "تصحيح وملاحظات تقدم أسبوعية", "امتحان شفهي في أحكام التجويد", "وثيقة إجازة رسمية مكتوبة"],
  },
  {
    titleEn: "Ijazah in Hifz",
    titleAr: "إجازة في الحفظ",
    descEn: "For students who have already memorized the Quran and want to seal their Hifz by reciting it from memory to the shaykh across a documented Khatmah.",
    descAr: "للطلاب الذين حفظوا القرآن ويريدون ختم الحفظ بتلاوته حفظًا على الشيخ عبر ختمة موثقة.",
    topicsEn: ["Full recitation from memory across the Khatmah", "Intensive muraaja'ah (revision) schedule", "Oral exam on Tajweed & Hifz stability", "Ijazah document with Sanad chain"],
    topicsAr: ["تلاوة كاملة حفظًا عبر الختمة", "جدول مراجعة مكثف", "امتحان شفهي في التجويد وثبات الحفظ", "وثيقة إجازة بالسند المتصل"],
  },
];

const FAQS: FAQ[] = [
  { questionEn: "What is an Ijazah in the Quran?", questionAr: "ما هي الإجازة في القرآن؟", answerEn: "An Ijazah is a written authorization granted by a qualified shaykh certifying that a student has recited the Quran to him with correct Tajweed (and, for Hifz Ijazah, from memory) and is therefore authorized to teach and, in turn, grant Ijazah to his own students. It is accompanied by the Sanad — the unbroken chain of teachers connecting the student back to the Prophet ﷺ.", answerAr: "الإجازة وثيقة يمنحها شيخ مؤهل تشهد بأن الطالب تلا القرآن عليه بتجويد صحيح (وحفظًا في إجازة الحفظ)، فيصبح مأذونًا بالتدريس ومنح الإجازة لطلابه بدوره. وتُرافقها سلسلة السند المتصل بمشايخه إلى النبي ﷺ." },
  { questionEn: "Do you offer Ijazah in Tajweed or only Hifz?", questionAr: "هل تقدمون إجازة تجويد أم حفظ فقط؟", answerEn: "We offer both. The Tajweed Ijazah is a full Khatmah recited to the shaykh from the mus'haf. The Hifz Ijazah is a full Khatmah recited from memory. Some students take one, some take both.", answerAr: "نقدم النوعين. إجازة التجويد ختمة كاملة تُتلى على الشيخ من المصحف، وإجازة الحفظ ختمة كاملة تُتلى حفظًا. بعض الطلاب يأخذ واحدة والبعض يأخذ الاثنتين." },
  { questionEn: "Is the Sanad really connected to the Prophet ﷺ?", questionAr: "هل السند حقًا متصل إلى النبي ﷺ؟", answerEn: "Yes. Every shaykh on our team holds a documented, unbroken chain of teachers going back generation by generation to the Prophet ﷺ. Once you complete your Ijazah, that same chain is written in your Ijazah document with your name added at its end.", answerAr: "نعم. كل شيخ في فريقنا يملك سلسلة مشايخ متصلة موثقة جيلًا بعد جيل إلى النبي ﷺ. بعد إتمام إجازتك تُكتب لك نفس السلسلة في وثيقة الإجازة مع إضافة اسمك في نهايتها." },
  { questionEn: "How long will the Ijazah take?", questionAr: "كم يستغرق الحصول على الإجازة؟", answerEn: "Your shaykh sets a personalized pace after the free assessment based on your current Tajweed level, Hifz strength and weekly availability. Progress is tracked page by page so you always know where you are on the Khatmah.", answerAr: "يضع الشيخ خطة زمنية مخصصة بعد حصة التقييم المجانية بحسب مستواك في التجويد وقوة حفظك وجدولك الأسبوعي. يُتابَع التقدم صفحة صفحة فتعرف دائمًا موقعك من الختمة." },
  { questionEn: "Can sisters study with a female shaykhah?", questionAr: "هل يمكن للأخوات الدراسة مع شيخة؟", answerEn: "Yes. Alhamd Academy has certified female shaykhat with full Sanad who teach sisters worldwide with the same rigor and grant the same formal Ijazah as our male shuyukh.", answerAr: "نعم. لدى أكاديمية الحمد شيخات مؤهلات ومسندات يدرّسن الأخوات في أنحاء العالم بنفس الدقة، ويمنحن نفس الإجازة الرسمية." },
  { questionEn: "What does the Ijazah program cost?", questionAr: "ما تكلفة برنامج الإجازة؟", answerEn: "Pricing depends on your chosen frequency and track (Tajweed or Hifz). Book a free assessment class and we will send you a personalized plan and quote.", answerAr: "السعر يعتمد على الوتيرة التي تختارها ومسارك (تجويد أو حفظ). احجز حصة تقييم مجانية وسنرسل لك خطة وعرض سعر مخصص." },
];

const TESTIMONIALS = [
  { name: "Omar S.", country: "United States", rating: 5, textEn: "Alhamdulillah I received my Ijazah in Hafs after steady Talaqqi with my shaykh. Holding the written Sanad going back to the Prophet ﷺ was the most powerful moment of my life.", textAr: "الحمد لله حصلت على إجازتي في حفص بعد تلقٍّ منتظم على شيخي. لحظة استلامي وثيقة السند المتصل إلى النبي ﷺ كانت أعظم لحظة في حياتي." },
  { name: "Khadijah R.", country: "United Kingdom", rating: 5, textEn: "As a mother of three, I never thought I could finish an Ijazah. My shaykhah scheduled sessions around my day and, alhamdulillah, I completed my Khatmah at my own pace.", textAr: "كأم لثلاثة أطفال ما كنت أتصور أن أُتم إجازة. رتّبت لي شيختي حصصًا تناسب يومي والحمد لله أتممت ختمتي على راحتي." },
  { name: "Bilal H.", country: "Canada", rating: 5, textEn: "I had already memorized the Quran but had no formal Ijazah. Alhamd Academy paired me with a shaykh who sealed my Hifz with a documented Sanad.", textAr: "كنت قد حفظت القرآن لكن دون إجازة رسمية. رشّحت لي أكاديمية الحمد شيخًا ختم حفظي بسند موثق." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Online Ijazah Program — Quran Ijazah with Sanad Connected to the Prophet ﷺ",
  description: "Earn a formal written Ijazah in Tajweed (Hafs 'an 'Asim) or Hifz of the Quran one-on-one with certified Al-Azhar Sanad-holding shuyukh. Documented chain of transmission connected to the Prophet ﷺ.",
  url: CANONICAL,
  inLanguage: ["en", "ar"],
  provider: {
    "@type": "EducationalOrganization",
    name: "Alhamd Academy",
    sameAs: "https://www.alhamdacademy.net",
    url: "https://www.alhamdacademy.net",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    inLanguage: ["ar", "en"],
  },
  educationalCredentialAwarded: "Formal Ijazah in Quran (Tajweed or Hifz) with Sanad connected to the Prophet ﷺ",
};

const IjazahProgramCourse = () => (
  <ServicePageLayout
    seoTitle="Online Ijazah Program | Quran Ijazah with Sanad to the Prophet ﷺ | Alhamd Academy"
    seoDescription="Earn a formal online Ijazah in Quran — Tajweed (Hafs) or Hifz — one-on-one with certified Al-Azhar shuyukh. Written Sanad connected to the Prophet ﷺ. Free assessment class."
    seoKeywords="online ijazah program, quran ijazah online, ijazah in quran, ijazah in tajweed, ijazah in hifz, sanad connected to the prophet, quran sanad online, ijazah certification, al azhar ijazah, ijazah in hafs, learn quran ijazah, get ijazah online, quran ijazah course, online quran certification"
    canonical={CANONICAL}
    heroTitleEn="Online Ijazah Program — Quran Ijazah with Sanad Connected to the Prophet ﷺ"
    heroTitleAr="برنامج الإجازة أونلاين — إجازة القرآن بسند متصل إلى النبي ﷺ"
    heroSubtitleEn="One-on-One Talaqqi with Certified Al-Azhar Sanad Holders"
    heroSubtitleAr="تلقٍّ فردي على مشايخ مسندين من الأزهر"
    heroDescEn="Complete a full Khatmah of the Quran under a qualified shaykh — from the mus'haf for the Tajweed Ijazah or from memory for the Hifz Ijazah — and receive a written Ijazah document listing an unbroken Sanad chain of teachers back to the Prophet ﷺ."
    heroDescAr="أتمّ ختمة كاملة للقرآن على شيخ مؤهل — من المصحف لإجازة التجويد أو حفظًا لإجازة الحفظ — واستلم وثيقة إجازة مكتوبة تحوي سلسلة سند متصل من المشايخ إلى النبي ﷺ."
    aboutTitleEn="Why Alhamd Academy Is the Right Home for Your Ijazah Journey"
    aboutTitleAr="لماذا أكاديمية الحمد هي المكان المناسب لرحلتك في الإجازة"
    aboutContentEn={[
      "An Ijazah is not a diploma you buy — it is a scholarly authorization granted only after a full Khatmah of the Quran is recited to a qualified shaykh with a valid Sanad. Everything about the process, from the pace to the corrections to the final document, must reflect the seriousness of what is being transmitted.",
      "At Alhamd Academy every Ijazah student is paired with an Al-Azhar-certified shaykh (or shaykhah for sisters) who holds a documented, unbroken Sanad back to the Prophet ﷺ. Every session is one-on-one Talaqqi over live video — nothing is generalized and every hidden error is caught the moment it occurs.",
      "We serve Ijazah students from the USA, Canada, UK, Australia, Germany, France and across the Muslim world. Classes are scheduled 24/7 to fit any timezone, and we offer full brother-with-shaykh and sister-with-shaykhah tracks so every student is comfortable throughout the Khatmah.",
      "The path is clear: a free assessment, then either the pre-Ijazah polishing phase or the direct opening of the Ijazah Khatmah, followed by steady weekly Talaqqi until the Khatmah is sealed and the written Ijazah is issued with the full Sanad chain and your name added at its end.",
    ]}
    aboutContentAr={[
      "الإجازة ليست شهادة تُشترى — بل تفويض علمي لا يُمنح إلا بعد إتمام ختمة كاملة للقرآن الكريم على شيخ مؤهل يحمل سندًا صحيحًا. كل شيء في هذه العملية، من الوتيرة إلى التصحيح إلى الوثيقة النهائية، يجب أن يعكس جدية ما يُنقَل.",
      "في أكاديمية الحمد كل طالب إجازة يُربط بشيخ مؤهل من الأزهر (أو شيخة للأخوات) يحمل سندًا موثقًا متصلًا إلى النبي ﷺ. كل حصة تلقٍّ فردي عبر فيديو مباشر — فلا شيء يُعمَّم وكل خطأ خفي يُلتقط لحظة وقوعه.",
      "نخدم طلاب الإجازة من أمريكا وكندا وبريطانيا وأستراليا وألمانيا وفرنسا وسائر بلاد المسلمين. المواعيد على مدار الساعة لتناسب أي منطقة زمنية، ولدينا مسار كامل للإخوة مع الشيخ وللأخوات مع الشيخة طوال الختمة.",
      "المسار واضح: حصة تقييم مجانية، ثم إما مرحلة صقل ما قبل الإجازة أو افتتاح ختمة الإجازة مباشرة، تليها تلقٍّ أسبوعي منتظم حتى تُختَم ثم تُصدَر وثيقة الإجازة المكتوبة بسلسلة السند الكاملة واسمك مضاف في نهايتها.",
    ]}
    methodTitleEn="Our Ijazah Method — Classical Talaqqi, Modern Convenience"
    methodTitleAr="منهجية الإجازة عندنا — تلقٍّ كلاسيكي وراحة عصرية"
    methodContentEn={[
      "We grant Ijazah exactly the way it has been granted for over fourteen centuries: by continuous Talaqqi (oral transmission) between shaykh and student, corrected verse by verse, until a full Khatmah has been sealed under the shaykh's ear.",
      "Every session begins with what the student prepared, moves into precision correction, then delivers new Talaqqi and a new assignment. Nothing is a lecture; everything is recitation and correction, exactly as it must be for a valid Ijazah.",
      "Progress is tracked in a private student portal: the Khatmah tracker shows every page you have recited and cleared, weekly notes from the shaykh document your strengths and remaining issues, and you always know exactly how far you are from Ijazah.",
      "Once the Khatmah is complete and the oral exam is passed, the shaykh personally issues your written Ijazah document listing the full Sanad chain of his teachers back to the Prophet ﷺ, with your name added at the end.",
    ]}
    methodContentAr={[
      "نمنح الإجازة تمامًا كما تُمنح منذ أكثر من أربعة عشر قرنًا: بتلقٍّ متصل بين الشيخ والطالب، تصحيح آية آية، حتى تُختَم ختمة كاملة على الشيخ.",
      "تبدأ كل حصة بما جهّزه الطالب، ثم تصحيح دقيق، ثم تلقٍّ لمقطع جديد وتكليف جديد. لا شيء على شكل محاضرة؛ كل شيء تلاوة وتصحيح كما ينبغي في إجازة صحيحة.",
      "التقدم يُتابع في بوابة طالب خاصة: مؤشر الختمة يعرض كل صفحة تلوتها وأُقرّت، وملاحظات الشيخ الأسبوعية توثق نقاط قوتك وما تبقى من ملاحظات، فتعرف دائمًا موقعك من الإجازة.",
      "بعد إتمام الختمة واجتياز الامتحان الشفهي، يُصدر الشيخ بنفسه وثيقة إجازتك المكتوبة بسلسلة السند الكامل لمشايخه إلى النبي ﷺ، ويُضاف اسمك في نهايتها.",
    ]}
    audiencePersonas={AUDIENCE}
    audienceTitleEn="Who Is the Ijazah Program For?"
    audienceTitleAr="لمن هذا البرنامج؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="What an Ijazah Class Looks Like — 60 Minutes of Focused Talaqqi"
    classSessionTitleAr="كيف تبدو حصة الإجازة — 60 دقيقة من التلقي المركّز"
    challenges={CHALLENGES}
    challengesTitleEn="Common Concerns From Ijazah Students — And How We Address Them"
    challengesTitleAr="أهم مخاوف طلاب الإجازة — وكيف نعالجها"
    curriculum={CURRICULUM}
    curriculumTitleEn="The Ijazah Path — From Assessment to a Written Sanad"
    curriculumTitleAr="مسار الإجازة — من التقييم إلى سند مكتوب"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Alhamd Academy Ijazah Program vs. Others"
    comparisonTitleAr="برنامج الإجازة في أكاديمية الحمد مقابل غيره"
    levels={LEVELS}
    levelsTitleEn="Tracks Within the Ijazah Program"
    levelsTitleAr="مسارات برنامج الإجازة"
    outcomesEn={[
      "A completed Khatmah of the Quran on a certified shaykh",
      "A formal written Ijazah document in Tajweed or Hifz",
      "A documented Sanad chain of teachers back to the Prophet ﷺ",
      "Deeply polished Tajweed with all hidden errors resolved",
      "Authorization to teach the Quran and grant Ijazah to your own students",
      "Strengthened relationship with the Quran that lasts a lifetime",
    ]}
    outcomesAr={[
      "ختمة كاملة للقرآن على شيخ مؤهل",
      "وثيقة إجازة رسمية في التجويد أو الحفظ",
      "سلسلة سند موثقة من المشايخ إلى النبي ﷺ",
      "تجويد مصقول عميق دون أخطاء خفية",
      "تفويض بتدريس القرآن ومنح الإجازة لطلابك",
      "علاقة عميقة بالقرآن الكريم تدوم مدى الحياة",
    ]}
    featuresEn={[
      "Al-Azhar-certified Sanad-holding shuyukh & shaykhat",
      "Both Ijazah in Tajweed (Hafs) and Ijazah in Hifz",
      "Strict one-on-one Talaqqi — never group lectures",
      "Free assessment class before enrolment",
      "Flexible 24/7 scheduling for every timezone",
      "Formal written Ijazah with the full Sanad chain",
      "Dedicated female shaykhat for sisters",
      "Progress-tracking portal and weekly Khatmah reports",
    ]}
    featuresAr={[
      "مشايخ ومشيخات مسندون معتمدون من الأزهر",
      "إجازة في التجويد (حفص) وإجازة في الحفظ",
      "تلقٍّ فردي صارم — لا محاضرات جماعية",
      "حصة تقييم مجانية قبل التسجيل",
      "مواعيد مرنة على مدار الساعة لكل المناطق الزمنية",
      "إجازة رسمية مكتوبة بالسند الكامل",
      "شيخات مخصصات للأخوات",
      "بوابة متابعة التقدم وتقارير ختمة أسبوعية",
    ]}
    faqs={FAQS}
    testimonials={TESTIMONIALS}
    relatedPages={RELATED}
    jsonLd={JSON_LD}
    deepContentTitleEn="Everything You Should Know Before You Start an Ijazah"
    deepContentTitleAr="كل ما تحتاج معرفته قبل البدء بالإجازة"
    deepContentEn={[
      "An Ijazah in the Quran is one of the oldest and most rigorous authorizations in the Islamic scholarly tradition. It is a written testimony from a qualified shaykh that a student has recited the entire Quran to him — from the mus'haf for Ijazah in Tajweed or from memory for Ijazah in Hifz — with correct application of every rule, and is therefore authorized to teach the Quran and, in turn, grant Ijazah to his own students.",
      "The value of the Ijazah lies in the Sanad. A Sanad is the documented chain of teachers connecting your shaykh, through his own shaykh, and his shaykh's shaykh, generation by generation, all the way back to the Prophet ﷺ. When you receive your Ijazah, your name is added to the end of that chain. That is why every Ijazah must be granted personally, orally, and under direct listening — never merely through recordings or tests.",
      "Our online Ijazah program is built for students who want that authentic experience without needing to travel to Egypt or Madinah. Every shaykh and shaykhah on our team is Al-Azhar-qualified with a Sanad we have personally verified. Every session is delivered live, one-on-one, with the same rigor as a physical halaqah — over high-quality video and around your schedule.",
      "The typical journey is: free assessment → short pre-Ijazah polishing (if needed) → opening of the Ijazah Khatmah → weekly Talaqqi over 8–18 months → oral exam → written Ijazah with the full Sanad. Some students pursue Ijazah in Tajweed only, some in Hifz only, and some complete both.",
      "If you are a serious student, a hafiz who wants to seal his Hifz, or an imam or teacher who needs a formal authorization, book your free assessment class today. Your shaykh will listen to your recitation, evaluate your readiness, and design a personalized Ijazah roadmap for you.",
    ]}
    deepContentAr={[
      "الإجازة في القرآن من أعرق تفويضات التقليد العلمي الإسلامي وأشدّها انضباطًا. وهي شهادة مكتوبة من شيخ مؤهل بأن الطالب تلا القرآن كاملًا عليه — من المصحف لإجازة التجويد أو حفظًا لإجازة الحفظ — بتطبيق صحيح لكل حكم، فيصبح مأذونًا بتدريس القرآن ومنح الإجازة لطلابه.",
      "قيمة الإجازة في السند. السند هو سلسلة المشايخ الموثقة التي تربط شيخك، فشيخه، فشيخ شيخه، جيلًا بعد جيل، حتى النبي ﷺ. حين تتسلم إجازتك يُضاف اسمك إلى نهاية هذه السلسلة. لذلك لا تُمنح الإجازة إلا شخصيًا وشفهيًا وبالسماع المباشر — لا بالتسجيلات ولا بالاختبارات فقط.",
      "برنامجنا مصمم للطالب الجاد الذي يريد هذه التجربة الأصيلة دون الحاجة للسفر إلى مصر أو المدينة. كل شيخ وشيخة عندنا مؤهل من الأزهر وسنده موثق نتحقق منه بأنفسنا. كل حصة مباشرة وفردية بنفس دقة الحلقة الحضورية — عبر فيديو عالي الجودة ووفق جدولك.",
      "المسار المعتاد: حصة تقييم مجانية → مرحلة صقل ما قبل الإجازة عند الحاجة → افتتاح ختمة الإجازة → تلقٍّ أسبوعي على مدى 8–18 شهرًا → امتحان شفهي → إجازة مكتوبة بالسند الكامل. بعض الطلاب يأخذ إجازة التجويد فقط، والبعض إجازة الحفظ فقط، والبعض يجمع بينهما.",
      "إن كنت طالبًا جادًا أو حافظًا يريد ختم حفظه أو إمامًا أو معلمًا يحتاج تفويضًا رسميًا، فاحجز حصة التقييم المجانية اليوم. سيستمع الشيخ لتلاوتك ويقيّم استعدادك ويصمم لك خارطة طريق شخصية للإجازة.",
    ]}
  />
);

export default IjazahProgramCourse;
