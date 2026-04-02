import { UserCheck, Shield, Clock, Star, Heart, Baby } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, Challenge, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن", href: "/online-quran-classes" },
  { titleEn: "Best Online Quran Classes", titleAr: "أفضل الدروس", href: "/best-online-quran-classes" },
  { titleEn: "Quran Classes for Kids", titleAr: "للأطفال", href: "/quran-classes-for-kids" },
  { titleEn: "Quran Classes for Adults", titleAr: "للبالغين", href: "/quran-classes-for-adults" },
  { titleEn: "Quran Classes Pricing", titleAr: "الأسعار", href: "/quran-classes-pricing" },
  { titleEn: "Free Trial", titleAr: "تجربة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Parents Who Want Full Attention for Their Child",
    titleAr: "آباء يريدون اهتماماً كاملاً لطفلهم",
    descEn: "In a group Quran class, your child might get 3 minutes of direct teacher attention per hour. In our one-on-one sessions, every second of the 20–30 minute class is dedicated entirely to your child's learning needs.",
    descAr: "في حصة جماعية، قد يحصل طفلك على 3 دقائق من اهتمام المعلم المباشر بالساعة. في جلساتنا الفردية، كل ثانية من الـ 20–30 دقيقة مخصصة لاحتياجات طفلك.",
  },
  {
    icon: UserCheck,
    titleEn: "Adult Learners Who Need Personalized Pace",
    titleAr: "متعلمون بالغون يحتاجون سرعة مخصصة",
    descEn: "Group classes move at the average pace — too fast for some, too slow for others. One-on-one classes adapt entirely to YOU. Spend more time on areas you struggle with, move quickly through what you already know.",
    descAr: "الحصص الجماعية تتحرك بالسرعة المتوسطة. الحصص الفردية تتكيف تماماً معك. اقضِ وقتاً أكثر فيما تجد صعوبة فيه، وتقدم بسرعة فيما تعرفه.",
  },
  {
    icon: Heart,
    titleEn: "Shy Learners Who Need a Safe Space",
    titleAr: "المتعلمون الخجولون الذين يحتاجون مساحة آمنة",
    descEn: "If you're self-conscious about your reading level, a private one-on-one environment removes all social pressure. No other students hearing your mistakes, no comparisons, no rushing — just you and a patient, supportive teacher.",
    descAr: "إذا كنت حساساً تجاه مستوى قراءتك، البيئة الفردية الخاصة تزيل كل الضغط الاجتماعي. لا طلاب آخرين يسمعون أخطاءك، لا مقارنات — فقط أنت ومعلم صبور وداعم.",
  },
  {
    icon: Star,
    titleEn: "Advanced Students Preparing for Ijazah",
    titleAr: "طلاب متقدمون يستعدون للإجازة",
    descEn: "Ijazah preparation requires intensive, personalized attention that's impossible in a group setting. Your teacher needs to hear every letter, every Tajweed application, and correct subtle errors that only emerge in detailed one-on-one evaluation.",
    descAr: "تحضير الإجازة يتطلب اهتماماً مكثفاً وشخصياً مستحيل في بيئة جماعية. معلمك يحتاج سماع كل حرف وكل تطبيق تجويد وتصحيح أخطاء دقيقة.",
  },
  {
    icon: Shield,
    titleEn: "Students Who Failed in Group Classes",
    titleAr: "طلاب فشلوا في الحصص الجماعية",
    descEn: "If you tried group Quran classes and didn't progress, it's not your fault — it's the format. One-on-one instruction has been proven to be 3–5x more effective than group instruction for skill-based learning like Quran reading.",
    descAr: "إذا جربت حصصاً جماعية ولم تتقدم، ليس خطأك — إنه النظام. التعليم الفردي أثبت أنه أكثر فعالية 3–5 مرات من الجماعي لتعلم المهارات مثل قراءة القرآن.",
  },
  {
    icon: Clock,
    titleEn: "Busy People Who Can't Waste Time",
    titleAr: "مشغولون لا يستطيعون إضاعة الوقت",
    descEn: "In a group class, much of your time is wasted watching others practice. In a one-on-one session, every minute is productive learning time for YOU. A 30-minute private session achieves more than a 60-minute group class.",
    descAr: "في الحصة الجماعية، كثير من وقتك يُهدر في مشاهدة الآخرين يتدربون. في الجلسة الفردية، كل دقيقة وقت تعلم منتج لك. جلسة 30 دقيقة خاصة تحقق أكثر من 60 دقيقة جماعية.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"One-on-one classes must be much more expensive than group classes\"",
    problemAr: "\"الحصص الفردية بالتأكيد أغلى بكثير من الجماعية\"",
    solutionEn: "At Alhamd Academy, one-on-one classes start from just $6/hour. Many group-class academies charge $10–15/hour for a shared teacher. Our private sessions actually cost less than many group alternatives, while delivering far better results.",
    solutionAr: "في أكاديمية الحمد، الحصص الفردية تبدأ من 6$/ساعة فقط. كثير من أكاديميات الحصص الجماعية تتقاضى 10–15$/ساعة لمعلم مشترك. حصصنا الخاصة تكلف أقل مع نتائج أفضل بكثير.",
  },
  {
    problemEn: "\"My child needs social interaction — won't they miss out?\"",
    problemAr: "\"طفلي يحتاج تفاعلاً اجتماعياً — ألن يفتقده؟\"",
    solutionEn: "Quran learning is a skill-based activity where social interaction actually slows progress. Children get social interaction from school, sports, and play. Quran class should be focused skill-building time. Our students progress 3x faster than in group settings.",
    solutionAr: "تعلم القرآن نشاط قائم على المهارات حيث التفاعل الاجتماعي يبطئ التقدم فعلاً. الأطفال يحصلون على التفاعل من المدرسة والرياضة واللعب. حصة القرآن يجب أن تكون وقت بناء مهارات مركز.",
  },
  {
    problemEn: "\"What if I get nervous being the only student with the teacher?\"",
    problemAr: "\"ماذا لو توترت لكوني الطالب الوحيد مع المعلم؟\"",
    solutionEn: "This is a common concern for adult beginners. Our teachers are specifically trained to create a warm, encouraging environment. Within the first 5 minutes of class, most students forget their nervousness because the teacher's patience and kindness make them feel comfortable.",
    solutionAr: "هذا قلق شائع للمبتدئين البالغين. معلمونا مدربون خصيصاً لخلق بيئة دافئة ومشجعة. خلال أول 5 دقائق، معظم الطلاب ينسون توترهم بسبب صبر المعلم ولطفه.",
  },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Teacher Attention", featureAr: "اهتمام المعلم", usEn: "✅ 100% dedicated to you", usAr: "✅ 100% مخصص لك", othersEn: "❌ Split among 5–20 students", othersAr: "❌ مقسم بين 5–20 طالب" },
  { featureEn: "Pace", featureAr: "السرعة", usEn: "✅ Fully adaptive to your level", usAr: "✅ متكيفة مع مستواك تماماً", othersEn: "❌ Fixed group pace", othersAr: "❌ سرعة جماعية ثابتة" },
  { featureEn: "Error Correction", featureAr: "تصحيح الأخطاء", usEn: "✅ Immediate — every mistake caught", usAr: "✅ فوري — كل خطأ يُلتقط", othersEn: "⚠️ Many errors go unnoticed", othersAr: "⚠️ كثير من الأخطاء تمر بدون ملاحظة" },
  { featureEn: "Speaking Time", featureAr: "وقت التحدث", usEn: "✅ You recite 80%+ of class time", usAr: "✅ تتلو 80%+ من وقت الحصة", othersEn: "❌ Maybe 5–10 min of actual recitation", othersAr: "❌ ربما 5–10 دقائق تلاوة فعلية" },
  { featureEn: "Schedule", featureAr: "المواعيد", usEn: "✅ Your choice — 24/7", usAr: "✅ اختيارك — 24/7", othersEn: "❌ Fixed group times only", othersAr: "❌ أوقات جماعية ثابتة فقط" },
  { featureEn: "Progress Speed", featureAr: "سرعة التقدم", usEn: "✅ 3–5x faster than groups", usAr: "✅ أسرع 3–5 مرات من الجماعي", othersEn: "❌ Slow — limited practice time", othersAr: "❌ بطيء — وقت تدريب محدود" },
];

const OneOnOneQuranClasses = () => (
  <ServicePageLayout
    seoTitle="One-on-One Quran Classes Online | Private Quran Lessons | Alhamd Academy"
    seoDescription="Private one-on-one Quran classes with certified teachers. 100% personalized attention, 3–5x faster progress than group classes. Kids & adults. From $6/hour. Free trial."
    seoKeywords="one on one quran classes, private quran lessons online, one on one quran classes for kids, private quran tutor, one to one quran classes, personal quran teacher, individual quran classes, private quran lessons, quran private tutor online"
    canonical="https://alhamdacademy.net/one-on-one-quran-classes"
    heroTitleEn="One-on-One Quran Classes — 100% Personalized Attention"
    heroTitleAr="حصص قرآن فردية — اهتمام مخصص 100%"
    heroSubtitleEn="Why Private Quran Lessons Produce 3–5x Faster Progress"
    heroSubtitleAr="لماذا الدروس الخاصة تنتج تقدماً أسرع 3–5 مرات"
    heroDescEn="Every class at Alhamd Academy is 100% one-on-one. Your teacher focuses entirely on YOU — your pace, your mistakes, your goals. No waiting for other students, no group pace to keep up with. Just focused, productive Quran learning that gets real results."
    heroDescAr="كل حصة في أكاديمية الحمد فردية 100%. معلمك يركز عليك أنت تماماً — سرعتك وأخطاءك وأهدافك. بدون انتظار طلاب آخرين. فقط تعلم قرآن مركز ومنتج يحقق نتائج حقيقية."
    aboutTitleEn="Why One-on-One Is the Only Way to Learn Quran Properly"
    aboutTitleAr="لماذا الحصص الفردية هي الطريقة الوحيدة لتعلم القرآن بشكل صحيح"
    aboutContentEn={[
      "Quran reading is a precision skill. Every letter has an exact articulation point (Makhraj), every rule has specific application conditions, and every mistake — even subtle ones — can change the meaning of Allah's words. This level of precision requires one thing above all: personalized attention.",
      "In a group Quran class with 10 students, each student gets an average of 6 minutes of direct teacher attention per hour. That means 54 minutes of every hour are spent passively watching others practice. In a one-on-one class, you get 100% of the teacher's attention for 100% of the time.",
      "The mathematics of one-on-one learning are simple but powerful: a student in private lessons gets 10x more direct practice time, 10x more error correction, and 10x more personalized instruction than a group class student. This is why our students progress 3–5x faster.",
      "One-on-one instruction also means your teacher catches every mistake immediately. In group settings, pronunciation errors can go unnoticed for weeks or months, becoming ingrained habits that are much harder to fix later. In private lessons, errors are caught and corrected in real-time.",
      "Perhaps most importantly, one-on-one classes allow your teacher to adapt their teaching style to how YOU learn best. Some students are visual learners, others are auditory. Some need more repetition, others grasp concepts quickly. In a group, the teacher can't accommodate these differences. In a private session, the entire approach is calibrated to you.",
    ]}
    aboutContentAr={[
      "قراءة القرآن مهارة دقيقة. كل حرف له نقطة نطق محددة (مخرج)، وكل قاعدة لها شروط تطبيق. هذا المستوى من الدقة يتطلب شيئاً واحداً فوق كل شيء: اهتمام شخصي.",
      "في حصة جماعية مع 10 طلاب، كل طالب يحصل على 6 دقائق متوسطاً من اهتمام المعلم المباشر بالساعة. في الحصة الفردية، تحصل على 100% من الاهتمام 100% من الوقت.",
      "رياضيات التعلم الفردي بسيطة لكنها قوية: الطالب في الدروس الخاصة يحصل على 10 أضعاف وقت التدريب المباشر و10 أضعاف تصحيح الأخطاء. لهذا طلابنا يتقدمون أسرع 3–5 مرات.",
      "التعليم الفردي يعني أيضاً أن معلمك يلتقط كل خطأ فوراً. في الحصص الجماعية، أخطاء النطق يمكن أن تمر بدون ملاحظة لأسابيع وتصبح عادات راسخة يصعب إصلاحها.",
      "الأهم، الحصص الفردية تتيح لمعلمك تكييف أسلوبه وفق طريقة تعلمك. في المجموعة، لا يمكن للمعلم استيعاب الاختلافات. في الجلسة الخاصة، النهج بأكمله مُعاير لك.",
    ]}
    methodTitleEn="How Our One-on-One Sessions Work"
    methodTitleAr="كيف تعمل جلساتنا الفردية"
    methodContentEn={[
      "Each session follows a structured format: review of previous material (5 min), targeted error correction (5 min), new material introduction (10 min), interactive practice (8 min), and homework assignment (2 min). This structure ensures every session is maximally productive.",
      "Your teacher uses the Noor Al-Bayan methodology adapted to your specific level and learning speed. Whether you need to spend an extra week on a difficult concept or can skip ahead past material you've already mastered, the pace is entirely yours.",
      "We use professional-grade video calling with screen sharing, digital whiteboards, and mushaf annotation tools. Your teacher can highlight specific letters, draw Tajweed rule diagrams, and show mouth positions for correct Makharij — all in real-time.",
      "After every session, your teacher sends a progress note via WhatsApp summarizing what was covered, areas of strength, areas needing practice, and specific homework. This ensures continuity between sessions and keeps parents informed (for children's classes).",
    ]}
    methodContentAr={[
      "كل جلسة تتبع هيكلاً منظماً: مراجعة (5 دقائق)، تصحيح أخطاء مستهدف (5 دقائق)، مادة جديدة (10 دقائق)، تدريب تفاعلي (8 دقائق)، وواجب (2 دقائق).",
      "معلمك يستخدم منهجية نور البيان مكيفة لمستواك وسرعتك. سواء احتجت أسبوعاً إضافياً على مفهوم صعب أو يمكنك التخطي، السرعة ملكك بالكامل.",
      "نستخدم مكالمات فيديو احترافية مع مشاركة شاشة وسبورات رقمية وأدوات تعليق على المصحف. معلمك يمكنه تمييز حروف محددة ورسم مخططات التجويد وإظهار أوضاع الفم للمخارج.",
      "بعد كل جلسة، معلمك يرسل ملاحظة تقدم عبر واتساب تلخص ما تمت تغطيته ونقاط القوة والمجالات التي تحتاج تدريب والواجب المحدد.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Who Benefits Most from One-on-One Quran Classes?"
    audienceTitleAr="من يستفيد أكثر من حصص القرآن الفردية؟"
    challenges={CHALLENGES}
    challengesTitleEn="Common Myths About One-on-One Quran Classes"
    challengesTitleAr="خرافات شائعة عن حصص القرآن الفردية"
    comparisonRows={COMPARISON}
    comparisonTitleEn="One-on-One vs. Group Quran Classes — The Real Difference"
    comparisonTitleAr="الحصص الفردية مقابل الجماعية — الفرق الحقيقي"
    levels={[
      { titleEn: "Beginner", titleAr: "مبتدئ", descEn: "New to Arabic/Quran reading.", descAr: "جديد على قراءة العربية/القرآن.", topicsEn: ["Noorani Qaida", "Letter sounds", "Basic reading"], topicsAr: ["القاعدة النورانية", "أصوات الحروف", "القراءة الأساسية"] },
      { titleEn: "Intermediate", titleAr: "متوسط", descEn: "Can read but needs Tajweed.", descAr: "يقرأ لكنه يحتاج التجويد.", topicsEn: ["Tajweed rules", "Fluent reading", "Surah memorization"], topicsAr: ["أحكام التجويد", "القراءة الطلقة", "حفظ السور"] },
      { titleEn: "Advanced", titleAr: "متقدم", descEn: "Strong reader pursuing excellence.", descAr: "قارئ قوي يسعى للتميز.", topicsEn: ["Hifz program", "Ijazah preparation", "Advanced Tajweed"], topicsAr: ["برنامج الحفظ", "تحضير الإجازة", "التجويد المتقدم"] },
    ]}
    outcomesEn={["3–5x faster progress than group classes", "Every pronunciation error caught immediately", "Curriculum tailored to your exact level", "Flexible scheduling that works for you", "Measurable progress with regular assessments"]}
    outcomesAr={["تقدم أسرع 3–5 مرات من الجماعي", "التقاط كل خطأ نطق فوراً", "منهج مصمم لمستواك تماماً", "مواعيد مرنة تناسبك", "تقدم قابل للقياس بتقييمات منتظمة"]}
    featuresEn={["100% one-on-one private sessions", "Certified Al-Azhar teachers", "Adaptive pace matching your level", "Real-time error correction", "24/7 scheduling flexibility", "From $6/hour", "Free trial — no commitment", "Male & female teachers available"]}
    featuresAr={["100% حصص فردية خاصة", "معلمون معتمدون من الأزهر", "سرعة متكيفة مع مستواك", "تصحيح أخطاء فوري", "مواعيد مرنة 24/7", "من 6$/ساعة", "تجربة مجانية — بدون التزام", "معلمون ومعلمات متاحون"]}
    faqs={[
      { questionEn: "Are one-on-one Quran classes really better than group classes?", questionAr: "هل الحصص الفردية أفضل فعلاً من الجماعية؟", answerEn: "Yes, significantly. In a group class, you get about 6 minutes of teacher attention per hour. In one-on-one, you get the full session. Our students progress 3–5x faster and retain more because every minute is active learning, not passive watching.", answerAr: "نعم، بشكل كبير. في الحصة الجماعية تحصل على 6 دقائق من الاهتمام بالساعة. في الفردية تحصل على الجلسة كاملة. طلابنا يتقدمون أسرع 3–5 مرات." },
      { questionEn: "How much do private Quran lessons cost?", questionAr: "كم تكلفة دروس القرآن الخاصة؟", answerEn: "Our one-on-one sessions start from $6/hour. Plans start at $57/month for 8 sessions. This is actually cheaper than many group-class academies that charge $10–15/hour for shared attention.", answerAr: "جلساتنا الفردية تبدأ من 6$/ساعة. الخطط من 57$/شهرياً لـ 8 حصص. هذا فعلاً أرخص من كثير من الأكاديميات الجماعية." },
    ]}
    testimonials={[
      { name: "Yusuf M.", country: "USA", textEn: "My son was in a group Quran class for a year and barely progressed. After 3 months of one-on-one at Alhamd Academy, he's reading Quran independently. The difference is incredible.", textAr: "ابني كان في حصة جماعية لسنة وبالكاد تقدم. بعد 3 أشهر فردية في أكاديمية الحمد، يقرأ القرآن بشكل مستقل. الفرق لا يصدق.", rating: 5 },
      { name: "Nadia B.", country: "UK", textEn: "The one-on-one format is what made the difference for me. I was too shy to read in a group. In private, I felt safe to make mistakes and my teacher's patience helped me progress faster than I ever expected.", textAr: "النظام الفردي هو ما صنع الفرق لي. كنت خجولة جداً للقراءة في مجموعة. في الخصوصية شعرت بالأمان وصبر معلمتي ساعدني على التقدم أسرع مما توقعت.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "One-on-One Quran Classes Online",
      "description": "Private one-on-one Quran classes with certified Al-Azhar teachers. 100% personalized attention for kids and adults.",
      "provider": { "@type": "Organization", "name": "Alhamd Academy", "url": "https://alhamdacademy.net" },
      "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    }}
  />
);

export default OneOnOneQuranClasses;
