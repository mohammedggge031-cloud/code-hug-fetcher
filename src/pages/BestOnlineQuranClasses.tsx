import { Award, Users, Star, Shield, Clock, CheckCircle } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { ComparisonRow, Challenge } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن", href: "/online-quran-classes" },
  { titleEn: "Quran Classes for Kids", titleAr: "للأطفال", href: "/quran-classes-for-kids" },
  { titleEn: "Quran Classes for Adults", titleAr: "للبالغين", href: "/quran-classes-for-adults" },
  { titleEn: "One-on-One Quran Classes", titleAr: "حصص فردية", href: "/one-on-one-quran-classes" },
  { titleEn: "Quran Classes Pricing", titleAr: "الأسعار", href: "/quran-classes-pricing" },
  { titleEn: "Free Trial", titleAr: "تجربة مجانية", href: "/free-trial" },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Teacher Certification", featureAr: "اعتماد المعلم", usEn: "✅ Al-Azhar University + Ijazah", usAr: "✅ جامعة الأزهر + إجازة", othersEn: "⚠️ Often self-claimed", othersAr: "⚠️ غالباً بدون توثيق" },
  { featureEn: "Class Format", featureAr: "نوع الحصة", usEn: "✅ One-on-one private", usAr: "✅ فردية خاصة", othersEn: "❌ Group classes (5–20)", othersAr: "❌ جماعية (5–20)" },
  { featureEn: "Native Arabic Teachers", featureAr: "معلمون عرب أصليون", usEn: "✅ 100% Egyptian native speakers", usAr: "✅ 100% مصريون", othersEn: "⚠️ Non-native common", othersAr: "⚠️ غير أصليين شائعون" },
  { featureEn: "Teaching Method", featureAr: "المنهجية", usEn: "✅ Noor Al-Bayan (proven)", usAr: "✅ نور البيان (مثبتة)", othersEn: "⚠️ No standard method", othersAr: "⚠️ بدون طريقة موحدة" },
  { featureEn: "Scheduling", featureAr: "المواعيد", usEn: "✅ 24/7 all time zones", usAr: "✅ 24/7 كل المناطق", othersEn: "❌ Limited hours", othersAr: "❌ ساعات محدودة" },
  { featureEn: "Progress Tracking", featureAr: "تتبع التقدم", usEn: "✅ After-class reports", usAr: "✅ تقارير بعد كل حصة", othersEn: "❌ None or monthly", othersAr: "❌ بدون أو شهرياً" },
  { featureEn: "Price per Hour", featureAr: "السعر بالساعة", usEn: "✅ Best value per session", usAr: "✅ أفضل قيمة لكل جلسة", othersEn: "⚠️ Significantly higher", othersAr: "⚠️ أعلى بكثير" },
  { featureEn: "Free Trial", featureAr: "تجربة مجانية", usEn: "✅ Yes — no payment needed", usAr: "✅ نعم — بدون دفع", othersEn: "⚠️ Requires credit card", othersAr: "⚠️ تتطلب بطاقة ائتمان" },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"How do I know which online Quran academy is actually the best?\"",
    problemAr: "\"كيف أعرف أي أكاديمية قرآن أونلاين هي الأفضل فعلاً؟\"",
    solutionEn: "Look for three things: verified teacher credentials (Al-Azhar degrees and Ijazah), one-on-one classes (not groups), and real student reviews. Alhamd Academy checks all three — our teachers are Al-Azhar graduates, every class is private, and we maintain a 4.9/5 rating from 200+ students.",
    solutionAr: "ابحث عن ثلاثة أشياء: مؤهلات معلمين موثقة (شهادات الأزهر وإجازة)، حصص فردية (ليست جماعية)، ومراجعات طلاب حقيقية. أكاديمية الحمد تحقق الثلاثة.",
  },
  {
    problemEn: "\"I've tried other online Quran schools and they were disappointing\"",
    problemAr: "\"جربت مدارس قرآن أونلاين أخرى وكانت مخيبة\"",
    solutionEn: "Most online Quran schools use group classes with non-native teachers and no structured curriculum. Our difference: every student gets a certified native Arabic teacher, a personalized plan, and measurable progress milestones. Try our free trial — you'll feel the difference in 30 minutes.",
    solutionAr: "معظم المدارس تستخدم حصصاً جماعية مع معلمين غير أصليين وبدون منهج منظم. فرقنا: كل طالب يحصل على معلم عربي أصلي معتمد وخطة مخصصة. جرب حصتنا المجانية.",
  },
  {
    problemEn: "\"Best online Quran classes are probably expensive\"",
    problemAr: "\"أفضل دروس القرآن أونلاين غالباً مكلفة\"",
    solutionEn: "Not at Alhamd Academy. Because our teachers are based in Egypt, we offer Al-Azhar quality at prices that undercut most competitors. Flexible plans to suit every budget for 8 sessions — with incredible value per session.",
    solutionAr: "ليس في أكاديمية الحمد. لأن معلمينا مقيمون في مصر، نقدم جودة الأزهر بأسعار أقل من المنافسين. خطط مرنة تناسب كل ميزانية لـ 8 حصص.",
  },
];

const BestOnlineQuranClasses = () => (
  <ServicePageLayout
    seoTitle="Best Online Quran Classes 2025 | Top-Rated Quran Academy | Alhamd Academy"
    seoDescription="Discover the best online Quran classes with certified Al-Azhar teachers. One-on-one private lessons, 4.9/5 rating, 200+ students. Compare and see why families choose us. Free trial."
    seoKeywords="best online quran classes, best quran course, best quran academy online, best online quran academy, top quran classes online, best quran teacher online, best online quran school, best quran learning platform, top rated quran academy"
    canonical="https://alhamdacademy.net/best-online-quran-classes"
    heroTitleEn="Best Online Quran Classes — What Makes a Quran Academy Truly the Best?"
    heroTitleAr="أفضل دروس القرآن أونلاين — ما الذي يجعل أكاديمية القرآن الأفضل حقاً؟"
    heroSubtitleEn="Certified Al-Azhar Teachers · One-on-One · 4.9/5 Rating · 200+ Students"
    heroSubtitleAr="معلمون معتمدون من الأزهر · فردي · تقييم 4.9/5 · 200+ طالب"
    heroDescEn="With hundreds of online Quran academies claiming to be 'the best,' how do you actually choose? We break down the criteria that matter — teacher qualifications, class format, curriculum, and real results — and show why Alhamd Academy consistently ranks as the top choice for Muslim families worldwide."
    heroDescAr="مع مئات الأكاديميات التي تدعي أنها 'الأفضل'، كيف تختار فعلاً؟ نوضح المعايير المهمة — مؤهلات المعلمين، نوع الحصة، المنهج، والنتائج الحقيقية — ونبين لماذا أكاديمية الحمد هي الخيار الأول."
    aboutTitleEn="What Makes the Best Online Quran Classes? A Honest Breakdown"
    aboutTitleAr="ما الذي يجعل دروس القرآن أونلاين الأفضل؟ تحليل صادق"
    aboutContentEn={[
      "Not all online Quran classes are created equal. The 'best' label gets thrown around by every academy, but when you look at what actually determines quality, the differences become clear. Here are the five pillars that separate the best online Quran classes from the rest:",
      "1. Teacher Quality: The best Quran teachers are native Arabic speakers with formal Islamic education. At Alhamd Academy, every teacher is a graduate of Al-Azhar University or equivalent — the world's most prestigious Islamic university — with Ijazah certification in Quran recitation and 7+ years of teaching experience.",
      "2. Class Format: Group classes (5–20 students) are cheaper to provide but dramatically less effective. The best online Quran classes are one-on-one, where every minute of class time is dedicated to one student. At Alhamd Academy, 100% of our classes are private one-on-one sessions.",
      "3. Structured Curriculum: Random teaching produces random results. The best academies use proven methodologies like Noor Al-Bayan with clear learning stages, assessments, and progression criteria. We provide a complete roadmap from alphabet to Ijazah.",
      "4. Accountability: The best programs provide measurable progress through regular assessments, after-class reports, and clear milestone tracking. Parents of children and adult learners alike should know exactly where they stand and what's next.",
      "5. Value for Money: The best doesn't have to mean the most expensive. Because Alhamd Academy's teachers are based in Egypt, we offer certified Al-Azhar quality at the most competitive rates — a fraction of what Western-based academies charge for comparable quality.",
    ]}
    aboutContentAr={[
      "ليست كل دروس القرآن أونلاين متساوية. لقب 'الأفضل' يُستخدم من كل أكاديمية، لكن عند النظر لما يحدد الجودة فعلاً، تتضح الفروقات. إليك الأركان الخمسة:",
      "1. جودة المعلم: أفضل معلمي القرآن هم متحدثون أصليون للعربية بتعليم إسلامي رسمي. في أكاديمية الحمد، كل معلم خريج جامعة الأزهر أو ما يعادلها بإجازة وخبرة 7+ سنوات.",
      "2. نوع الحصة: الحصص الجماعية (5–20 طالب) أرخص لكنها أقل فعالية بكثير. أفضل الدروس فردية حيث كل دقيقة مخصصة لطالب واحد. في أكاديمية الحمد، 100% من حصصنا فردية.",
      "3. منهج منظم: التدريس العشوائي ينتج نتائج عشوائية. أفضل الأكاديميات تستخدم منهجيات مثبتة كنور البيان مع مراحل ومعايير تقدم واضحة.",
      "4. المساءلة: أفضل البرامج توفر تقدماً قابلاً للقياس من خلال تقييمات منتظمة وتقارير بعد الحصة وتتبع معالم واضح.",
      "5. القيمة مقابل المال: الأفضل لا يعني الأغلى. لأن معلمي أكاديمية الحمد مقيمون في مصر، نقدم جودة الأزهر بأسعار لا تُقارن.",
    ]}
    methodTitleEn="Our Teaching Standards — Why Students Rate Us 4.9/5"
    methodTitleAr="معايير تدريسنا — لماذا يقيمنا الطلاب 4.9/5"
    methodContentEn={[
      "Every teacher at Alhamd Academy goes through a rigorous selection process. We accept fewer than 15% of applicants. Beyond Ijazah and university degrees, we evaluate teaching ability, patience, communication skills, and ability to work with both children and adults.",
      "We use the Noor Al-Bayan methodology — a systematic approach that has been refined over decades specifically for teaching non-Arabic speakers. This ensures consistent quality regardless of which teacher you're assigned.",
      "Quality control is ongoing. We regularly review class recordings (with student consent), collect feedback after every class, and conduct monthly performance reviews with teachers. If a teacher's ratings drop, we address it immediately.",
      "Every student receives a personalized learning plan with clear milestones. Whether you're a 5-year-old starting from the alphabet or a 50-year-old pursuing Ijazah, you'll always know exactly where you are and what's next.",
    ]}
    methodContentAr={[
      "كل معلم في أكاديمية الحمد يمر بعملية اختيار صارمة. نقبل أقل من 15% من المتقدمين. بالإضافة للإجازة والشهادات، نقيّم القدرة التدريسية والصبر ومهارات التواصل.",
      "نستخدم منهجية نور البيان — نهج منظم صُقل على مدى عقود لتعليم غير الناطقين بالعربية. هذا يضمن جودة متسقة.",
      "مراقبة الجودة مستمرة. نراجع تسجيلات الحصص ونجمع التعليقات بعد كل حصة ونجري مراجعات أداء شهرية مع المعلمين.",
      "كل طالب يحصل على خطة تعلم مخصصة بمعالم واضحة. سواء كنت طفلاً يبدأ من الحروف أو بالغاً يسعى للإجازة.",
    ]}
    challenges={CHALLENGES}
    challengesTitleEn="Common Questions When Choosing the Best Quran Academy"
    challengesTitleAr="أسئلة شائعة عند اختيار أفضل أكاديمية قرآن"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Alhamd Academy vs. Other Online Quran Schools — An Honest Comparison"
    comparisonTitleAr="أكاديمية الحمد مقابل مدارس القرآن الأخرى — مقارنة صادقة"
    trustBadges={[
      { icon: Award, textEn: "Al-Azhar Certified Teachers", textAr: "معلمون معتمدون من الأزهر" },
      { icon: Users, textEn: "200+ Students, 8+ Countries", textAr: "200+ طالب، 8+ دول" },
      { icon: Star, textEn: "4.9/5 Student Rating", textAr: "تقييم طلاب 4.9/5" },
      { icon: Shield, textEn: "Only 15% Teachers Accepted", textAr: "15% فقط من المتقدمين يُقبلون" },
    ]}
    levels={[
      { titleEn: "Beginner Track", titleAr: "مسار المبتدئين", descEn: "From Arabic alphabet to basic Quran reading.", descAr: "من الحروف العربية للقراءة الأساسية.", topicsEn: ["Noorani Qaida", "Letter recognition", "Basic vowels", "Simple word reading"], topicsAr: ["القاعدة النورانية", "التعرف على الحروف", "الحركات الأساسية", "قراءة كلمات بسيطة"] },
      { titleEn: "Intermediate Track", titleAr: "مسار المتوسط", descEn: "Tajweed application and fluent Mushaf reading.", descAr: "تطبيق التجويد وقراءة طلقة.", topicsEn: ["Complete Tajweed rules", "Mushaf reading", "Surah memorization", "Recitation refinement"], topicsAr: ["أحكام التجويد الكاملة", "القراءة من المصحف", "حفظ السور", "صقل التلاوة"] },
      { titleEn: "Advanced Track", titleAr: "مسار المتقدم", descEn: "Hifz program or Ijazah certification.", descAr: "برنامج الحفظ أو شهادة الإجازة.", topicsEn: ["Full Quran memorization", "Ijazah preparation", "Multiple Qiraat", "Teaching certification"], topicsAr: ["حفظ القرآن كاملاً", "تحضير الإجازة", "القراءات المتعددة", "شهادة تدريس"] },
    ]}
    outcomesEn={[
      "Confident Quran reading with proper Tajweed",
      "Measurable progress with monthly assessments",
      "Personal curriculum tailored to your goals",
      "Certificate of completion at each level",
      "Foundation for Hifz or Ijazah if desired",
    ]}
    outcomesAr={[
      "قراءة قرآن واثقة بالتجويد الصحيح",
      "تقدم قابل للقياس بتقييمات شهرية",
      "منهج مخصص لأهدافك",
      "شهادة إتمام عند كل مستوى",
      "أساس للحفظ أو الإجازة إذا رغبت",
    ]}
    featuresEn={[
      "100% one-on-one private sessions",
      "Al-Azhar University certified teachers only",
      "Proven Noor Al-Bayan teaching methodology",
      "After-class WhatsApp progress reports",
      "24/7 scheduling — all time zones covered",
      "Flexible plans to suit every budget (8 sessions)",
      "Free trial class — no credit card required",
      "Both male and female teachers available",
    ]}
    featuresAr={[
      "100% حصص فردية خاصة",
      "معلمون معتمدون من جامعة الأزهر فقط",
      "منهجية نور البيان المثبتة",
      "تقارير تقدم عبر واتساب بعد كل حصة",
      "مواعيد 24/7 — كل المناطق الزمنية",
      "خطط مرنة تناسب كل ميزانية (8 حصص)",
      "حصة تجريبية مجانية — بدون بطاقة ائتمان",
      "معلمون ومعلمات متاحون",
    ]}
    faqs={[
      { questionEn: "What makes Alhamd Academy the best online Quran academy?", questionAr: "ما الذي يجعل أكاديمية الحمد أفضل أكاديمية قرآن أونلاين؟", answerEn: "Three things: 100% Al-Azhar certified native Arabic teachers (we reject 85% of applicants), 100% one-on-one classes (never groups), and a structured Noor Al-Bayan curriculum with after-class progress reports. Our 4.9/5 rating from 200+ students in 8+ countries speaks for itself.", answerAr: "ثلاثة أشياء: 100% معلمون معتمدون من الأزهر (نرفض 85% من المتقدمين)، 100% حصص فردية (ليست جماعية أبداً)، ومنهج نور البيان المنظم مع تقارير تقدم. تقييمنا 4.9/5 من 200+ طالب يتحدث عن نفسه." },
      { questionEn: "How much do the best online Quran classes cost?", questionAr: "كم تكلفة أفضل دروس القرآن أونلاين؟", answerEn: "Quality doesn't have to be expensive. Our flexible plans to suit every budget for 8 sessions — with incredible value per session. Most Western-based academies charge significantly higher rates for similar quality.", answerAr: "الجودة لا تعني الغلاء. خططنا تبدأ من خطط شهرية معقولة لـ 8 حصص — بقيمة ممتازة لكل جلسة. معظم الأكاديميات الغربية تتقاضى أسعار أعلى بكثير." },
      { questionEn: "Can I try before I commit?", questionAr: "هل يمكنني التجربة قبل الالتزام؟", answerEn: "Absolutely. We offer a completely free trial class with no payment information required. You'll experience a full 30-minute session with your assigned teacher so you can judge our quality firsthand before making any commitment.", answerAr: "بالتأكيد. نقدم حصة تجريبية مجانية تماماً بدون الحاجة لمعلومات دفع. ستختبر جلسة 30 دقيقة كاملة مع معلمك المخصص." },
      { questionEn: "Do you offer classes for both kids and adults?", questionAr: "هل تقدمون حصصاً للأطفال والبالغين؟", answerEn: "Yes. We have specialized teachers for children (ages 4+) who use games and rewards, and experienced teachers for adults who use analytical, mature teaching approaches. Each age group gets an appropriate learning experience.", answerAr: "نعم. لدينا معلمون متخصصون للأطفال (من سن 4+) يستخدمون ألعاباً ومكافآت، ومعلمون ذوو خبرة للبالغين بنهج تحليلي ناضج." },
    ]}
    testimonials={[
      { name: "Dr. Hassan A.", country: "USA", textEn: "I evaluated 5 different online Quran academies before choosing Alhamd. The teacher quality, structured curriculum, and the fact that every class is one-on-one made the decision easy. Six months later, my whole family is enrolled.", textAr: "قيّمت 5 أكاديميات مختلفة قبل اختيار الحمد. جودة المعلمين والمنهج المنظم وكون كل حصة فردية جعلت القرار سهلاً. بعد 6 أشهر، عائلتي كلها مسجلة.", rating: 5 },
      { name: "Khadija L.", country: "Australia", textEn: "The difference between Alhamd Academy and the two other schools we tried is night and day. The teacher actually remembers what my daughter worked on last class and builds on it. That's what 'best' means to me.", textAr: "الفرق بين أكاديمية الحمد والمدرستين الأخريين اللتين جربناهما كبير جداً. المعلمة فعلاً تتذكر ما عملت عليه ابنتي آخر حصة وتبني عليه.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Alhamd Academy — Best Online Quran Classes",
      "description": "Top-rated online Quran academy with certified Al-Azhar teachers. One-on-one private classes for kids and adults. 4.9/5 rating from 200+ students worldwide.",
      "url": "https://alhamdacademy.net/best-online-quran-classes",
      "sameAs": ["https://alhamdacademy.net"],
    }}
  />
);

export default BestOnlineQuranClasses;
