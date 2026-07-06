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
 * Dedicated conversion-focused course page for the "online qirat course"
 * / "ten qirat online" keyword cluster. Route: /courses/ten-qirat-online
 * (Arabic mirror served automatically at /ar/courses/ten-qirat-online via
 * the /ar/:path* prerender rewrite + basename-aware BrowserRouter).
 */

const CANONICAL = "https://www.alhamdacademy.net/courses/ten-qirat-online";

const RELATED = [
  { titleEn: "Ijazah Program", titleAr: "برنامج الإجازة", href: "/ijazah-program" },
  { titleEn: "Learn Quran with Tajweed", titleAr: "تعلم القرآن بالتجويد", href: "/learn-quran-with-tajweed" },
  { titleEn: "Online Quran Classes", titleAr: "دورة القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "One-on-One Quran Classes", titleAr: "حصص فردية", href: "/one-on-one-quran-classes" },
  { titleEn: "Female Quran Teacher", titleAr: "معلمة قرآن", href: "/female-quran-teacher" },
  { titleEn: "Free Trial Class", titleAr: "حصة تجريبية مجانية", href: "/free-trial" },
];

const AUDIENCE: AudiencePersona[] = [
  {
    icon: GraduationCap,
    titleEn: "Advanced Huffaz Ready for Qira'at",
    titleAr: "الحفاظ المتقدمون المستعدون للقراءات",
    descEn: "You have completed Hifz of the full Quran with Hafs 'an 'Asim and want to expand into the ten Qira'at (Al-Qira'at Al-'Ashr) through the Shatibiyyah and Durrah routes with a certified Al-Azhar Sanad-holder.",
    descAr: "أتممت حفظ القرآن الكريم برواية حفص عن عاصم وترغب في التوسع بالقراءات العشر من طريقي الشاطبية والدرة على يد شيخ مسند من الأزهر.",
  },
  {
    icon: BookOpen,
    titleEn: "Imams, Teachers & Recitation Students",
    titleAr: "الأئمة والمعلمون وطلاب التلاوة",
    descEn: "You lead prayers or teach Quran and want to add scholarly depth by mastering the differences between Nafi', Ibn Kathir, Abu 'Amr, Ibn 'Amir, 'Asim, Hamzah, Al-Kisa'i, Abu Ja'far, Ya'qub and Khalaf.",
    descAr: "تؤم الناس أو تدرّس القرآن وترغب في التعمق العلمي بإتقان الفروق بين نافع وابن كثير وأبي عمرو وابن عامر وعاصم وحمزة والكسائي وأبي جعفر ويعقوب وخلف.",
  },
  {
    icon: Award,
    titleEn: "Students Pursuing Sanad & Ijazah in Qira'at",
    titleAr: "طلاب السند والإجازة في القراءات",
    descEn: "You want a formal Ijazah in one or all of the ten Qira'at with a documented chain (Sanad) connected to the Prophet ﷺ, taught one-on-one at your pace.",
    descAr: "تطلب إجازة رسمية في قراءة واحدة أو في القراءات العشر بسند متصل إلى النبي ﷺ، بتعليم فردي يناسب وتيرتك.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  { titleEn: "Review of Previous Portion", titleAr: "مراجعة المقطع السابق", descEn: "The shaykh listens to the student recite the previously assigned pages under the target Qira'ah with full application of usool (principles).", descAr: "يستمع الشيخ إلى الطالب وهو يتلو الصفحات السابقة بالقراءة المستهدفة مع تطبيق كامل للأصول." },
  { titleEn: "Precision Error Correction", titleAr: "تصحيح دقيق للأخطاء", descEn: "Every deviation in madd, hamz, imalah, ishmam, rawm, or takbir is isolated, demonstrated by the shaykh, and drilled until stable.", descAr: "كل انحراف في المد والهمز والإمالة والإشمام والروم والتكبير يُعزل ويُوضّح ثم يُدرَّب حتى يستقر." },
  { titleEn: "New Usool or Farsh Lesson", titleAr: "درس أصول أو فرش جديد", descEn: "New principles from the Shatibiyyah or Durrah are explained with textual references, then applied on live ayat from the current juz.", descAr: "أصول جديدة من الشاطبية أو الدرة تُشرح بالنصوص ثم تُطبَّق على آيات مباشرة من الجزء الحالي." },
  { titleEn: "Guided Talaqqi & Assignment", titleAr: "تلقٍ موجَّه وتكليف", descEn: "The student recites the new portion under the shaykh's ear (Talaqqi), receives the next assignment and a written progress note.", descAr: "يتلو الطالب المقطع الجديد على الشيخ (تلقٍّ) ثم يتسلم التكليف الجديد وملاحظة تقدم مكتوبة." },
];

const CHALLENGES: Challenge[] = [
  { problemEn: "\"I only know Hafs — can I really jump into all ten Qira'at?\"", problemAr: "\"لا أعرف إلا حفصًا — هل يمكنني فعلاً دخول القراءات العشر؟\"", solutionEn: "You begin with a bridge phase that maps your existing Hafs foundation onto the Shatibiyyah, then move Qira'ah by Qira'ah so you never study more than one at a time.", solutionAr: "تبدأ بمرحلة تمهيدية تربط أساسك في حفص بالشاطبية، ثم تنتقل قراءة قراءة حتى لا تدرس أكثر من قراءة في وقت واحد." },
  { problemEn: "\"Will the certification be recognized?\"", problemAr: "\"هل الإجازة معترف بها؟\"", solutionEn: "Every Sanad we grant is issued by an Al-Azhar-qualified shaykh with a documented, unbroken chain back to the Prophet ﷺ, accepted worldwide by scholarly institutions.", solutionAr: "كل سند نمنحه يصدر عن شيخ مؤهل من الأزهر بسلسلة موثقة متصلة إلى النبي ﷺ، ومقبول عالميًا لدى المؤسسات الشرعية." },
  { problemEn: "\"I live in a different timezone from Egypt.\"", problemAr: "\"أعيش في منطقة زمنية مختلفة عن مصر.\"", solutionEn: "Classes are one-on-one and scheduled 24/7. Students from the USA, Canada, UK, Australia and Europe pick slots that suit their day.", solutionAr: "الحصص فردية وتُحجز على مدار الساعة. طلابنا من أمريكا وكندا وبريطانيا وأستراليا وأوروبا يختارون المواعيد التي تناسبهم." },
  { problemEn: "\"How long does the full ten Qira'at Ijazah take?\"", problemAr: "\"كم يستغرق إتمام إجازة القراءات العشر؟\"", solutionEn: "The pace is set by your shaykh after the free assessment based on your prior mastery and weekly availability. Every stage — bridge, Shatibiyyah, Durrah — is tracked page by page so you always know your position on the path.", solutionAr: "يضع الشيخ الوتيرة بعد حصة التقييم المجانية بحسب مستواك السابق وجدولك الأسبوعي. كل مرحلة — التمهيد والشاطبية والدرة — تُتابَع صفحة صفحة فتعرف دائمًا موقعك من المسار." },
];

const CURRICULUM: CurriculumWeek[] = [
  { weekEn: "Phase 1 — Foundation", weekAr: "المرحلة 1 — التأسيس", topicEn: "Hafs Consolidation & Introduction to Shatibiyyah", topicAr: "تثبيت حفص ومقدمة الشاطبية", detailsEn: ["Full Hafs recitation audit and correction of hidden errors", "Introduction to the Shatibiyyah poem and its symbols (rumooz)", "Understanding the concept of Qira'at, Riwayat, and Turuq", "Building the Talaqqi discipline"], detailsAr: ["مراجعة كاملة لتلاوة حفص وتصحيح الأخطاء الخفية", "مقدمة نظم الشاطبية ورموزه", "فهم مفهوم القراءات والروايات والطرق", "بناء أدب التلقي"] },
  { weekEn: "Phase 2 — Shatibiyyah Route", weekAr: "المرحلة 2 — طريق الشاطبية", topicEn: "Seven Qira'at from the Shatibiyyah", topicAr: "القراءات السبع من الشاطبية", detailsEn: ["Nafi' (Qaloon & Warsh), Ibn Kathir (Al-Bazzi & Qunbul)", "Abu 'Amr (Ad-Duri & As-Susi), Ibn 'Amir (Hisham & Ibn Dhakwan)", "'Asim (Shu'bah & Hafs), Hamzah (Khalaf & Khallad)", "Al-Kisa'i (Abu Al-Harith & Ad-Duri)"], detailsAr: ["نافع (قالون وورش)، ابن كثير (البزي وقنبل)", "أبو عمرو (الدوري والسوسي)، ابن عامر (هشام وابن ذكوان)", "عاصم (شعبة وحفص)، حمزة (خلف وخلاد)", "الكسائي (أبو الحارث والدوري)"] },
  { weekEn: "Phase 3 — Durrah Route", weekAr: "المرحلة 3 — طريق الدرة", topicEn: "Three Additional Qira'at from the Durrah", topicAr: "الثلاث المتممة من الدرة", detailsEn: ["Abu Ja'far Al-Madani (Ibn Wardan & Ibn Jammaz)", "Ya'qub Al-Hadrami (Ruways & Rawh)", "Khalaf Al-'Ashir (Ishaq & Idris)", "Reconciliation with Shatibiyyah usool"], detailsAr: ["أبو جعفر المدني (ابن وردان وابن جماز)", "يعقوب الحضرمي (رويس وروح)", "خلف العاشر (إسحاق وإدريس)", "التوفيق مع أصول الشاطبية"] },
  { weekEn: "Phase 4 — Ijazah & Sanad", weekAr: "المرحلة 4 — الإجازة والسند", topicEn: "Final Recitation & Certification", topicAr: "الختمة النهائية والإجازة", detailsEn: ["Full Khatmah under the shaykh in each Qira'ah", "Oral examination on the usool and farsh differences", "Ijazah document issued with the full Sanad chain", "Guidance on how to teach and grant Ijazah in turn"], detailsAr: ["ختمة كاملة على الشيخ في كل قراءة", "امتحان شفهي في الفروق الأصولية والفرشية", "منح وثيقة الإجازة بالسند المتصل الكامل", "توجيه لكيفية التدريس ومنح الإجازة لاحقًا"] },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Curriculum", featureAr: "المنهج", usEn: "✅ Full Shatibiyyah + Durrah (Ten Qira'at)", usAr: "✅ الشاطبية والدرة كاملة (القراءات العشر)", othersEn: "⚠️ Often Hafs only or one extra Qira'ah", othersAr: "⚠️ غالبًا حفص فقط أو قراءة إضافية" },
  { featureEn: "Teacher Qualification", featureAr: "تأهيل الشيخ", usEn: "✅ Al-Azhar-certified Sanad holders", usAr: "✅ مشايخ مسندون من الأزهر", othersEn: "❌ Unverified Ijazah claims", othersAr: "❌ ادعاءات إجازة غير موثقة" },
  { featureEn: "Class Format", featureAr: "نوع الحصة", usEn: "✅ One-on-one Talaqqi", usAr: "✅ تلقٍّ فردي", othersEn: "❌ Recorded lectures or groups", othersAr: "❌ محاضرات مسجلة أو مجموعات" },
  { featureEn: "Sanad Documentation", featureAr: "توثيق السند", usEn: "✅ Written Ijazah with full chain to the Prophet ﷺ", usAr: "✅ إجازة مكتوبة بسند متصل إلى النبي ﷺ", othersEn: "⚠️ Verbal or no formal document", othersAr: "⚠️ شفهي أو بدون وثيقة رسمية" },
  { featureEn: "Scheduling", featureAr: "المواعيد", usEn: "✅ 24/7 slots for all timezones", usAr: "✅ مواعيد على مدار الساعة لجميع المناطق الزمنية", othersEn: "⚠️ Fixed Egypt-only hours", othersAr: "⚠️ ساعات مصرية ثابتة فقط" },
  { featureEn: "Free Trial", featureAr: "حصة تجريبية", usEn: "✅ Free assessment session", usAr: "✅ حصة تقييم مجانية", othersEn: "❌ Paid intake", othersAr: "❌ حصة قبول مدفوعة" },
];

const LEVELS: LevelInfo[] = [
  {
    titleEn: "Bridge Level — Hafs to Shatibiyyah",
    titleAr: "المستوى التمهيدي — من حفص إلى الشاطبية",
    descEn: "For huffaz who know only Hafs and need to be re-anchored inside the Shatibiyyah system before starting the other Qira'at.",
    descAr: "للحفاظ الذين لا يعرفون إلا حفص ويحتاجون إلى تأسيس داخل نظام الشاطبية قبل بدء بقية القراءات.",
    topicsEn: ["Full Hafs recitation audit", "Shatibiyyah symbols and terminology", "Introduction to usool vs farsh differences"],
    topicsAr: ["مراجعة كاملة لتلاوة حفص", "رموز الشاطبية ومصطلحاتها", "مقدمة الفروق بين الأصول والفرش"],
  },
  {
    titleEn: "Intermediate — Seven Qira'at (Sab'ah)",
    titleAr: "المستوى المتوسط — القراءات السبع",
    descEn: "Systematic study of the seven Qira'at through the Shatibiyyah with continuous Khatmah on the shaykh.",
    descAr: "دراسة منهجية للقراءات السبع من الشاطبية مع ختمة مستمرة على الشيخ.",
    topicsEn: ["Nafi', Ibn Kathir, Abu 'Amr, Ibn 'Amir", "'Asim, Hamzah, Al-Kisa'i", "All fourteen Riwayat"],
    topicsAr: ["نافع وابن كثير وأبو عمرو وابن عامر", "عاصم وحمزة والكسائي", "الروايات الأربع عشرة"],
  },
  {
    titleEn: "Advanced — Full Ten Qira'at ('Ashr)",
    titleAr: "المستوى المتقدم — القراءات العشر كاملة",
    descEn: "The three additional Qira'at from the Durrah are added on top of the Shatibiyyah for the full Al-'Ashr Al-Sughra.",
    descAr: "تُضاف القراءات الثلاث من الدرة إلى الشاطبية لإتمام العشر الصغرى.",
    topicsEn: ["Abu Ja'far, Ya'qub, Khalaf Al-'Ashir", "Durrah symbols and usool", "Formal Ijazah with Sanad"],
    topicsAr: ["أبو جعفر ويعقوب وخلف العاشر", "رموز الدرة وأصولها", "إجازة رسمية بالسند"],
  },
];

const FAQS: FAQ[] = [
  { questionEn: "What are the ten Qira'at?", questionAr: "ما هي القراءات العشر؟", answerEn: "The ten Qira'at (Al-Qira'at Al-'Ashr) are the ten authentic recitations of the Quran preserved through mass transmission: Nafi' Al-Madani, Ibn Kathir Al-Makki, Abu 'Amr Al-Basri, Ibn 'Amir Ash-Shami, 'Asim Al-Kufi, Hamzah Az-Zayyat, Al-Kisa'i, Abu Ja'far Al-Madani, Ya'qub Al-Hadrami, and Khalaf Al-'Ashir. Each Qira'ah has two Rawis, giving twenty documented Riwayat.", answerAr: "القراءات العشر هي القراءات المتواترة الصحيحة للقرآن الكريم: نافع المدني وابن كثير المكي وأبو عمرو البصري وابن عامر الشامي وعاصم الكوفي وحمزة الزيات والكسائي وأبو جعفر المدني ويعقوب الحضرمي وخلف العاشر. لكل قراءة راويان فيكون مجموع الروايات عشرين رواية." },
  { questionEn: "Do I need to complete Hifz before starting?", questionAr: "هل يجب أن أُتمّ الحفظ قبل البدء؟", answerEn: "Completing the Hifz of the entire Quran in Hafs 'an 'Asim is strongly recommended before starting Qira'at, because you will recite each Qira'ah from memory during Talaqqi. Students without full Hifz can start the bridge level while continuing memorization.", answerAr: "يُستحسن إتمام حفظ القرآن كاملًا برواية حفص عن عاصم قبل البدء بالقراءات لأنك ستتلو كل قراءة عن ظهر قلب أثناء التلقي. من لم يُتم الحفظ يمكنه البدء بالمرحلة التمهيدية مع استمرار الحفظ." },
  { questionEn: "How is the Ijazah granted?", questionAr: "كيف تُمنح الإجازة؟", answerEn: "After completing a full Khatmah on the shaykh in the target Qira'ah and passing an oral examination on its usool and farsh, the shaykh issues a written Ijazah document listing the full Sanad chain of teachers back to the Prophet ﷺ.", answerAr: "بعد إتمام ختمة كاملة على الشيخ في القراءة المستهدفة واجتياز امتحان شفهي في أصولها وفرشها، يمنح الشيخ وثيقة إجازة مكتوبة تحوي سلسلة السند المتصل إلى النبي ﷺ." },
  { questionEn: "Can women study Qira'at with a female shaykhah?", questionAr: "هل تستطيع النساء دراسة القراءات مع شيخة؟", answerEn: "Yes. Alhamd Academy has certified female Qira'at teachers (Shaykhat) with full Sanad who teach sisters worldwide with the same rigor as our male shuyukh.", answerAr: "نعم. لدى أكاديمية الحمد شيخات مؤهلات في القراءات ومسندات، يدرّسن الأخوات في أنحاء العالم بنفس الدقة العلمية." },
  { questionEn: "What is the price of the ten Qira'at course?", questionAr: "ما سعر دورة القراءات العشر؟", answerEn: "Pricing depends on your chosen frequency and your current level. Book a free assessment class and we will send you a personalized plan and quote.", answerAr: "السعر يعتمد على الوتيرة التي تختارها ومستواك الحالي. احجز حصة تقييم مجانية وسنرسل لك خطة وعرض سعر مخصص." },
];

const TESTIMONIALS = [
  { name: "Yusuf A.", country: "United States", rating: 5, textEn: "Alhamdulillah I completed my Warsh Ijazah with my shaykh in under a year. The Talaqqi is serious, the Sanad is documented and the scheduling around my New York timezone was flawless.", textAr: "الحمد لله أتممت إجازتي في ورش على شيخي في أقل من عام. التلقي جاد والسند موثق والمواعيد متوفرة تمامًا لتوقيت نيويورك." },
  { name: "Aisha M.", country: "United Kingdom", rating: 5, textEn: "As a sister I always wanted to study the ten Qira'at with a female Shaykhah. I finally found that here — she is patient, precise and holds a real Sanad.", textAr: "كأخت كنت أرغب دائمًا بدراسة القراءات العشر على شيخة. وجدت ذلك هنا — صبورة ودقيقة وتملك سندًا حقيقيًا." },
  { name: "Ibrahim K.", country: "Canada", rating: 5, textEn: "The bridge phase from Hafs into the Shatibiyyah completely restructured my recitation. I now understand why each Qari reads the way he does.", textAr: "المرحلة التمهيدية من حفص إلى الشاطبية أعادت هيكلة تلاوتي كليًا. صرت أفهم لماذا يقرأ كل قارئ بطريقته." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Online Ten Qira'at Course — Al-Qira'at Al-'Ashr with Ijazah",
  description: "Study the ten authentic Qira'at of the Quran (Shatibiyyah & Durrah routes) one-on-one with certified Al-Azhar Sanad holders. Full Ijazah with documented chain to the Prophet ﷺ.",
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
    courseWorkload: "PT5H",
    inLanguage: ["ar", "en"],
  },
  educationalCredentialAwarded: "Ijazah with Sanad in the Ten Qira'at",
};

const TenQiratOnline = () => (
  <ServicePageLayout
    seoTitle="Online Ten Qira'at Course with Ijazah | Al-Qira'at Al-'Ashr | Alhamd Academy"
    seoDescription="Study the ten authentic Qira'at of the Quran online with certified Al-Azhar Sanad-holders. One-on-one Talaqqi in Shatibiyyah & Durrah routes with a full documented Ijazah. Free trial class."
    seoKeywords="online qirat course, ten qirat online, qira'at al ashr online, learn qiraat online, ten qiraat course, al qiraat al ashr, shatibiyyah online, durrah online, ijazah in qiraat, sanad in qiraat, qirat teacher online, qirat classes online, qirat course with ijazah, learn the ten qiraat"
    canonical={CANONICAL}
    heroTitleEn="Online Ten Qira'at Course — Al-Qira'at Al-'Ashr with Ijazah"
    heroTitleAr="دورة القراءات العشر أونلاين — بالسند والإجازة"
    heroSubtitleEn="One-on-One Talaqqi with Certified Al-Azhar Sanad Holders"
    heroSubtitleAr="تلقٍّ فردي على مشايخ مسندين من الأزهر"
    heroDescEn="Take your Quran journey from Hafs to the full Al-'Ashr. Study the Shatibiyyah and the Durrah systematically with a certified shaykh, complete a full Khatmah in every Qira'ah, and receive a documented written Ijazah with a Sanad chain that connects you to the Prophet ﷺ."
    heroDescAr="انتقل من حفص إلى العشر كاملة. ادرس الشاطبية والدرة بمنهجية على شيخ مسند، وأتمّ ختمة في كل قراءة، ثم استلم إجازة مكتوبة موثقة بسند متصل إلى النبي ﷺ."
    aboutTitleEn="Why Alhamd Academy Is the Right Home for Your Qira'at Journey"
    aboutTitleAr="لماذا أكاديمية الحمد هي المكان المناسب لرحلتك في القراءات"
    aboutContentEn={[
      "The ten Qira'at ('Al-Qira'at Al-'Ashr) are the ten mass-transmitted (mutawatir) recitations of the Quran preserved from the Prophet ﷺ through unbroken chains of Sanad. Studying them properly is one of the highest sciences of the Quran and requires a qualified, connected shaykh — not just recordings or books.",
      "At Alhamd Academy every Qira'at student is paired with an Al-Azhar-certified shaykh who holds a documented, unbroken Sanad in each Qira'ah he teaches. Every session is one-on-one Talaqqi over live video, so nothing is generalized and every error is corrected the moment it occurs.",
      "We serve students from the USA, Canada, UK, Australia, Germany, France and the broader Muslim world. Classes are scheduled 24/7 to fit any timezone, and we offer full brother-with-shaykh and sister-with-shaykhah tracks so every student is comfortable.",
      "Our curriculum walks you from a Hafs bridge phase into the full Shatibiyyah (seven Qira'at) and then the Durrah (three additional Qira'at) to complete Al-'Ashr Al-Sughra. Each stage ends with a Khatmah on the shaykh and, ultimately, a written Ijazah document with the full Sanad chain.",
    ]}
    aboutContentAr={[
      "القراءات العشر هي القراءات المتواترة الصحيحة للقرآن الكريم المحفوظة عن النبي ﷺ بأسانيد متصلة. دراستها على وجهها الصحيح من أعلى علوم القرآن، وتتطلب شيخًا مؤهلًا مسندًا لا مجرد تسجيلات أو كتب.",
      "في أكاديمية الحمد كل طالب في القراءات يُربط بشيخ مؤهل من الأزهر يحمل سندًا موثقًا متصلًا في كل قراءة يُدرّسها. كل حصة تلقٍّ فردي عبر فيديو مباشر، فلا شيء يُعمَّم وكل خطأ يُصحَّح لحظة وقوعه.",
      "نخدم طلابًا من أمريكا وكندا وبريطانيا وأستراليا وألمانيا وفرنسا وسائر بلاد المسلمين. المواعيد على مدار الساعة لتناسب أي منطقة زمنية، ولدينا مسار كامل للإخوة مع الشيخ وللأخوات مع الشيخة.",
      "منهجنا ينقلك من مرحلة تمهيدية من حفص إلى الشاطبية كاملة (سبع قراءات) ثم الدرة (ثلاث قراءات إضافية) لإتمام العشر الصغرى. كل مرحلة تنتهي بختمة على الشيخ ثم إجازة مكتوبة بالسند المتصل.",
    ]}
    methodTitleEn="Our Talaqqi Method — Classical Rigor, Modern Convenience"
    methodTitleAr="منهجية التلقي عندنا — دقة كلاسيكية وراحة عصرية"
    methodContentEn={[
      "We teach the ten Qira'at through the classical Talaqqi (oral transmission) method exactly as it has been transmitted for over fourteen centuries. Nothing is delivered as a lecture — every ayah is recited by the student directly to the shaykh and corrected immediately.",
      "Each Qira'ah is studied as a complete system: first the usool (recurring principles) from the Shatibiyyah or the Durrah, then the farsh (word-specific differences), then a full continuous Khatmah on the shaykh to prove mastery.",
      "Progress is tracked in a private student portal: recorded assignments, weekly notes from the shaykh, and a Khatmah tracker so you always know exactly where you are inside each Qira'ah and how far from Ijazah.",
      "Once the shaykh is satisfied with your recitation and your understanding of the usool, a formal written Ijazah is issued listing the full Sanad chain of your shaykh's teachers back to the Prophet ﷺ.",
    ]}
    methodContentAr={[
      "ندرّس القراءات العشر بطريقة التلقي الكلاسيكية كما تُوورثت لأكثر من أربعة عشر قرنًا. لا شيء يُقدَّم على شكل محاضرة — كل آية يتلوها الطالب مباشرة على الشيخ وتُصحَّح فورًا.",
      "كل قراءة تُدرَس كنظام متكامل: أولًا الأصول من الشاطبية أو الدرة، ثم الفرش، ثم ختمة كاملة متصلة على الشيخ لإثبات الإتقان.",
      "التقدم يُتابع في بوابة طالب خاصة: تسجيلات الواجبات وملاحظات الشيخ الأسبوعية ومؤشر الختمة، فتعرف دائمًا موقعك من كل قراءة وبعدك عن الإجازة.",
      "متى رضي الشيخ عن تلاوتك وفهمك للأصول، تُمنح إجازة رسمية مكتوبة تُدرَج فيها سلسلة السند الكاملة لمشايخ شيخك حتى النبي ﷺ.",
    ]}
    audiencePersonas={AUDIENCE}
    audienceTitleEn="Who Is This Qira'at Course For?"
    audienceTitleAr="لمن هذه الدورة؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="What a Qira'at Class Looks Like — 60 Minutes of Focused Talaqqi"
    classSessionTitleAr="كيف تبدو حصة القراءات — 60 دقيقة من التلقي المركّز"
    challenges={CHALLENGES}
    challengesTitleEn="Common Concerns From Qira'at Students — And How We Address Them"
    challengesTitleAr="أهم مخاوف طلاب القراءات — وكيف نعالجها"
    curriculum={CURRICULUM}
    curriculumTitleEn="The Qira'at Path — From Hafs Bridge to Full Al-'Ashr Ijazah"
    curriculumTitleAr="مسار القراءات — من التأسيس على حفص إلى إجازة العشر الكاملة"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Alhamd Academy Qira'at Program vs. Others"
    comparisonTitleAr="برنامج القراءات في أكاديمية الحمد مقابل غيره"
    levels={LEVELS}
    levelsTitleEn="Levels of the Ten Qira'at Program"
    levelsTitleAr="مستويات برنامج القراءات العشر"
    outcomesEn={[
      "Confident recitation of the Quran in the seven Qira'at from the Shatibiyyah",
      "Mastery of the three additional Qira'at from the Durrah for the full 'Ashr",
      "Deep understanding of usool and farsh differences between every Qari",
      "A completed Khatmah on the shaykh in each Qira'ah studied",
      "A formal written Ijazah with a documented Sanad chain to the Prophet ﷺ",
      "Readiness to teach the Qira'at and, in time, grant Ijazah to your own students",
    ]}
    outcomesAr={[
      "تلاوة واثقة للقرآن بالقراءات السبع من الشاطبية",
      "إتقان القراءات الثلاث من الدرة لإتمام العشر",
      "فهم عميق للفروق الأصولية والفرشية بين القراء",
      "ختمة كاملة على الشيخ في كل قراءة تُدرَس",
      "إجازة رسمية مكتوبة بسند متصل إلى النبي ﷺ",
      "الاستعداد لتدريس القراءات ومنح الإجازة لطلابك مستقبلًا",
    ]}
    featuresEn={[
      "Al-Azhar-certified Sanad-holding shuyukh & shaykhat",
      "Strict one-on-one Talaqqi — never group lectures",
      "Shatibiyyah + Durrah routes for full Al-'Ashr Al-Sughra",
      "Free assessment class before enrolment",
      "Flexible 24/7 scheduling for every timezone",
      "Formal written Ijazah with full Sanad chain",
      "Dedicated female shaykhat for sisters",
      "Progress tracking portal and weekly reports",
    ]}
    featuresAr={[
      "مشايخ ومشيخات مسندون معتمدون من الأزهر",
      "تلقٍّ فردي صارم — لا محاضرات جماعية",
      "طريقا الشاطبية والدرة لإتمام العشر الصغرى",
      "حصة تقييم مجانية قبل التسجيل",
      "مواعيد مرنة على مدار الساعة لكل المناطق الزمنية",
      "إجازة رسمية مكتوبة بالسند الكامل",
      "شيخات مخصصات للأخوات",
      "بوابة متابعة التقدم وتقارير أسبوعية",
    ]}
    faqs={FAQS}
    testimonials={TESTIMONIALS}
    relatedPages={RELATED}
    jsonLd={JSON_LD}
    deepContentTitleEn="Everything You Should Know Before You Start the Ten Qira'at"
    deepContentTitleAr="كل ما تحتاج معرفته قبل البدء بالقراءات العشر"
    deepContentEn={[
      "Al-Qira'at Al-'Ashr — the ten authentic Qira'at — are the recitations that reached us through unbroken mass transmission (tawatur) from the Prophet ﷺ. Seven of them (the Sab'ah) were canonized by Imam Ibn Mujahid in the 4th century Hijri and later versified in the famous Shatibiyyah poem of Imam Ash-Shatibi (d. 590 AH). The remaining three were versified by Imam Ibn Al-Jazari (d. 833 AH) in his Ad-Durrah Al-Mudiyyah, completing what is now known as Al-'Ashr Al-Sughra.",
      "Studying the Qira'at is not simply memorizing variant readings. It is a scholarly discipline that combines phonetics ('ilm al-tajweed), textual analysis of the two poems, and above all Talaqqi — receiving the recitation orally from a shaykh who received it from his shaykh in an unbroken chain. That chain is your Sanad, and only a qualified shaykh with a valid Sanad can grant you Ijazah in a Qira'ah.",
      "Our online ten Qira'at course is built for serious students who want that authentic experience without needing to travel to Egypt or Madinah. Every shaykh and shaykhah on our team is Al-Azhar-qualified with a Sanad we have verified. Every session is delivered live, one-on-one, with the same rigor as a physical halaqah — just over high-quality video with your own personal schedule.",
      "The typical route we recommend is Hafs bridge → Shatibiyyah (seven Qira'at) → Durrah (three additional Qira'at) → written Ijazah. Some advanced students prefer to focus on one Qira'ah at a time — such as Warsh 'an Nafi' for the Maliki lands or Ad-Duri 'an Abi 'Amr for parts of Sudan — and receive a Sanad in that specific Riwayah. Both routes are available.",
      "If you are a hafiz ready to expand into the ten Qira'at, or an imam or teacher who wants scholarly depth, or a student pursuing Ijazah, book your free assessment class today. Your shaykh will listen to your current recitation, evaluate your level, and design a personalized Qira'at roadmap for you.",
    ]}
    deepContentAr={[
      "القراءات العشر هي القراءات المتواترة الصحيحة التي وصلتنا عن النبي ﷺ بنقل الجماعة عن الجماعة. سبعة منها (السبعة) اختارها الإمام ابن مجاهد في القرن الرابع الهجري ثم نظمها الإمام الشاطبي (ت 590هـ) في الشاطبية، وأتم الإمام ابن الجزري (ت 833هـ) الثلاث في الدرة المضية، فاكتملت العشر الصغرى.",
      "دراسة القراءات ليست مجرد حفظ فروق. هي علم متكامل يجمع التجويد وتحليل نصي المتنَين، وقبل ذلك التلقي عن شيخ تلقّى عن شيخه بسند متصل. هذا السند لا يمنحه إلا شيخ مؤهل مسند.",
      "دورتنا مصممة للطالب الجاد الذي يريد هذه التجربة الأصيلة دون الحاجة للسفر إلى مصر أو المدينة. كل شيخ وشيخة عندنا مؤهل من الأزهر وسنده موثق. كل حصة مباشرة وفردية بنفس دقة الحلقة الحضورية.",
      "المسار الذي نوصي به عادة: مرحلة تمهيد على حفص → الشاطبية (سبع قراءات) → الدرة (ثلاث قراءات) → إجازة مكتوبة. بعض المتقدمين يفضلون التركيز على قراءة واحدة كورش عن نافع لبلاد المغرب أو الدوري عن أبي عمرو لأجزاء من السودان، وأخذ سند في تلك الرواية. كلا الطريقين متاح.",
      "إن كنت حافظًا مستعدًا للتوسع بالقراءات العشر أو إمامًا أو معلمًا يريد التعمق العلمي أو طالبًا يسعى للإجازة، احجز حصة التقييم المجانية اليوم. سيستمع الشيخ لتلاوتك ويقيّم مستواك ويصمم لك خارطة طريق شخصية في القراءات.",
    ]}
  />
);

export default TenQiratOnline;
