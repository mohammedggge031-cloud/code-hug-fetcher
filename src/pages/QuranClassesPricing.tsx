import { DollarSign, Shield, Clock, Star, Users, Award } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { Challenge, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن", href: "/online-quran-classes" },
  { titleEn: "Best Online Quran Classes", titleAr: "أفضل الدروس", href: "/best-online-quran-classes" },
  { titleEn: "One-on-One Quran Classes", titleAr: "حصص فردية", href: "/one-on-one-quran-classes" },
  { titleEn: "Quran Classes for Kids", titleAr: "للأطفال", href: "/quran-classes-for-kids" },
  { titleEn: "Quran Classes for Adults", titleAr: "للبالغين", href: "/quran-classes-for-adults" },
  { titleEn: "Free Trial", titleAr: "تجربة مجانية", href: "/free-trial" },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"How can you offer certified teachers at such low prices?\"",
    problemAr: "\"كيف تقدمون معلمين معتمدين بأسعار منخفضة كهذه؟\"",
    solutionEn: "Our teachers are based in Egypt where the cost of living is significantly lower than in Western countries. This allows us to pay our teachers competitively in their local market while offering prices that are 60–70% lower than Western-based academies — without any compromise on quality.",
    solutionAr: "معلمونا مقيمون في مصر حيث تكلفة المعيشة أقل بكثير من الدول الغربية. هذا يتيح لنا دفع رواتب تنافسية لمعلمينا مع تقديم أسعار أقل 60–70% من الأكاديميات الغربية — بدون أي تنازل عن الجودة.",
  },
  {
    problemEn: "\"Is cheap Quran education really good quality?\"",
    problemAr: "\"هل تعليم القرآن الرخيص فعلاً بجودة عالية؟\"",
    solutionEn: "Affordable doesn't mean cheap quality. Every one of our teachers is a graduate of Al-Azhar University with Ijazah certification and 7+ years experience. Our 4.9/5 rating from 200+ students proves that you don't have to overpay for excellence. Try our free trial and judge the quality yourself.",
    solutionAr: "معقول التكلفة لا يعني جودة ضعيفة. كل معلمينا خريجو جامعة الأزهر بإجازة وخبرة 7+ سنوات. تقييمنا 4.9/5 من 200+ طالب يثبت أنك لا تحتاج دفع مبالغ مبالغ فيها للتميز.",
  },
  {
    problemEn: "\"I can't afford regular Quran classes for my whole family\"",
    problemAr: "\"لا أستطيع تحمل تكلفة حصص قرآن منتظمة لكل عائلتي\"",
    solutionEn: "We offer family discounts for multiple children or family members enrolling together. Contact us on WhatsApp and we'll create a custom package that fits your budget while ensuring every family member gets quality Quran education.",
    solutionAr: "نقدم خصومات عائلية لعدة أطفال أو أفراد عائلة يسجلون معاً. تواصل معنا عبر واتساب وسنضع لك حزمة مخصصة تناسب ميزانيتك مع ضمان جودة التعليم لكل فرد.",
  },
];

const COMPARISON: ComparisonRow[] = [
  { featureEn: "Monthly Cost (8 sessions)", featureAr: "التكلفة الشهرية (8 حصص)", usEn: "✅ From $57/month", usAr: "✅ من 57$/شهرياً", othersEn: "⚠️ $120–240/month typical", othersAr: "⚠️ 120–240$/شهرياً عادة" },
  { featureEn: "Cost per Hour", featureAr: "التكلفة بالساعة", usEn: "✅ From $6/hour", usAr: "✅ من 6$/ساعة", othersEn: "⚠️ $15–30/hour average", othersAr: "⚠️ 15–30$/ساعة متوسط" },
  { featureEn: "Class Format Included", featureAr: "نوع الحصة", usEn: "✅ One-on-one (private)", usAr: "✅ فردية (خاصة)", othersEn: "❌ Group (shared teacher)", othersAr: "❌ جماعية (معلم مشترك)" },
  { featureEn: "Teacher Quality", featureAr: "جودة المعلم", usEn: "✅ Al-Azhar certified + Ijazah", usAr: "✅ معتمد من الأزهر + إجازة", othersEn: "⚠️ Varies widely", othersAr: "⚠️ متفاوت جداً" },
  { featureEn: "Free Trial", featureAr: "تجربة مجانية", usEn: "✅ Yes — zero payment", usAr: "✅ نعم — بدون دفع", othersEn: "⚠️ Often paid or requires CC", othersAr: "⚠️ غالباً مدفوعة أو تتطلب بطاقة" },
  { featureEn: "Family Discount", featureAr: "خصم عائلي", usEn: "✅ Available", usAr: "✅ متاح", othersEn: "❌ Rarely offered", othersAr: "❌ نادراً ما يُقدم" },
];

const QuranClassesPricing = () => (
  <ServicePageLayout
    seoTitle="Quran Classes Fees & Pricing | Affordable Quran Academy | Alhamd Academy"
    seoDescription="Transparent Quran classes pricing from $57/month. One-on-one sessions with certified Al-Azhar teachers from $6/hour. Family discounts available. No hidden fees. Free trial."
    seoKeywords="quran classes fees, quran course price, online quran classes cost, affordable quran classes online, cheap quran classes online, affordable quran academy, quran classes pricing, quran tutor cost, online quran fees, how much are quran classes"
    canonical="https://alhamdacademy.net/quran-classes-pricing"
    heroTitleEn="Quran Classes Pricing — Certified Quality at Affordable Rates"
    heroTitleAr="أسعار حصص القرآن — جودة معتمدة بأسعار معقولة"
    heroSubtitleEn="Al-Azhar Certified Teachers · One-on-One · From $6/Hour"
    heroSubtitleAr="معلمون معتمدون من الأزهر · فردي · من 6$/ساعة"
    heroDescEn="Quality Quran education shouldn't break the bank. Alhamd Academy offers one-on-one private classes with certified Al-Azhar teachers starting from just $57/month. No hidden fees, no contracts, and a free trial to experience the quality before you pay anything."
    heroDescAr="تعليم القرآن الجيد لا يجب أن يكون مكلفاً. أكاديمية الحمد تقدم حصصاً فردية خاصة مع معلمين معتمدين من الأزهر تبدأ من 57$/شهرياً فقط. بدون رسوم مخفية وتجربة مجانية."
    aboutTitleEn="Why Alhamd Academy Offers the Best Value in Online Quran Education"
    aboutTitleAr="لماذا أكاديمية الحمد تقدم أفضل قيمة في تعليم القرآن أونلاين"
    aboutContentEn={[
      "When parents search for 'Quran classes fees' or 'online Quran classes cost,' they're often shocked by what they find. Many Western-based online Quran academies charge $20–30 per hour for group classes — and even more for one-on-one sessions.",
      "At Alhamd Academy, we've built a different model. Our teachers are based in Egypt, home to Al-Azhar University — the most prestigious Islamic institution in the world. By employing teachers in Egypt (where they receive competitive local salaries), we can offer certified Al-Azhar quality at prices 60–70% lower than Western alternatives.",
      "Here's what you get at Alhamd Academy: Private one-on-one sessions (never groups), certified native Arabic teachers from Al-Azhar University with Ijazah, proven Noor Al-Bayan curriculum, after-class WhatsApp progress reports, and 24/7 flexible scheduling — all starting from $57/month for 8 sessions.",
      "We believe every Muslim family deserves access to quality Quran education regardless of their budget. That's why we offer our best quality at our lowest prices — there's no 'premium tier' with better teachers. Every student gets the same Al-Azhar certified instruction.",
      "For families with multiple children, we offer special family discounts. Contact us on WhatsApp to discuss a custom package that fits your family's needs and budget. We want to make it easy for your entire family to learn Quran properly.",
    ]}
    aboutContentAr={[
      "عندما يبحث الآباء عن 'رسوم حصص القرآن' أو 'تكلفة دروس القرآن أونلاين'، غالباً يُصدمون مما يجدون. كثير من الأكاديميات الغربية تتقاضى 20–30$ بالساعة للحصص الجماعية.",
      "في أكاديمية الحمد، بنينا نموذجاً مختلفاً. معلمونا مقيمون في مصر — موطن جامعة الأزهر. بتوظيف معلمين في مصر، نقدم جودة الأزهر بأسعار أقل 60–70% من البدائل الغربية.",
      "ما تحصل عليه: حصص فردية خاصة (ليست جماعية أبداً)، معلمون معتمدون من الأزهر بإجازة، منهج نور البيان المثبت، تقارير تقدم عبر واتساب، ومواعيد مرنة 24/7 — كل ذلك يبدأ من 57$/شهرياً.",
      "نؤمن أن كل عائلة مسلمة تستحق الوصول لتعليم قرآن جيد بغض النظر عن ميزانيتها. لذلك نقدم أفضل جودة بأقل أسعار — لا يوجد 'مستوى مميز' بمعلمين أفضل.",
      "للعائلات ذات الأطفال المتعددين، نقدم خصومات عائلية خاصة. تواصل معنا عبر واتساب لمناقشة حزمة مخصصة تناسب احتياجات وميزانية عائلتك.",
    ]}
    methodTitleEn="Our Pricing Plans — Simple, Transparent, No Hidden Fees"
    methodTitleAr="خطط أسعارنا — بسيطة وشفافة وبدون رسوم مخفية"
    methodContentEn={[
      "We keep our pricing structure simple. Choose the number of sessions per month that works for you, and pay one transparent monthly fee. There are no registration fees, no material fees, no hidden charges.",
      "All plans include: one-on-one private sessions with a certified teacher, access to digital learning materials, after-class WhatsApp progress reports, and flexible scheduling with easy rescheduling.",
      "We recommend 3–5 sessions per week for optimal progress. But even 2 sessions per week will produce steady improvement. Your teacher will suggest the best frequency based on your goals and availability.",
      "Not sure which plan is right for you? Start with our free trial — a full 30-minute session with a certified teacher, no payment required. You'll experience our teaching quality firsthand before making any financial commitment.",
    ]}
    methodContentAr={[
      "نبقي هيكل أسعارنا بسيطاً. اختر عدد الحصص الشهرية التي تناسبك وادفع رسوماً شهرية شفافة واحدة. لا رسوم تسجيل ولا رسوم مواد ولا رسوم مخفية.",
      "جميع الخطط تشمل: حصص فردية مع معلم معتمد، مواد تعلم رقمية، تقارير تقدم عبر واتساب، ومواعيد مرنة مع إعادة جدولة سهلة.",
      "نوصي بـ 3–5 حصص أسبوعياً للتقدم الأمثل. لكن حتى حصتان أسبوعياً ستنتج تحسناً مستمراً. معلمك سيقترح أفضل تردد بناءً على أهدافك.",
      "غير متأكد أي خطة مناسبة؟ ابدأ بتجربتنا المجانية — جلسة 30 دقيقة كاملة مع معلم معتمد، بدون دفع مطلوب.",
    ]}
    challenges={CHALLENGES}
    challengesTitleEn="Questions About Our Pricing — Honest Answers"
    challengesTitleAr="أسئلة عن أسعارنا — إجابات صادقة"
    comparisonRows={COMPARISON}
    comparisonTitleEn="Alhamd Academy Pricing vs. Other Quran Schools"
    comparisonTitleAr="أسعار أكاديمية الحمد مقابل مدارس أخرى"
    trustBadges={[
      { icon: DollarSign, textEn: "From $57/month", textAr: "من 57$/شهرياً" },
      { icon: Shield, textEn: "No Hidden Fees", textAr: "بدون رسوم مخفية" },
      { icon: Star, textEn: "4.9/5 Rating", textAr: "تقييم 4.9/5" },
      { icon: Clock, textEn: "Free Trial Available", textAr: "تجربة مجانية متاحة" },
    ]}
    levels={[
      { titleEn: "Starter Plan", titleAr: "الخطة المبدئية", descEn: "8 sessions/month — ideal for beginners.", descAr: "8 حصص/شهرياً — مثالية للمبتدئين.", topicsEn: ["8 one-on-one sessions", "From $57/month", "Perfect for 2x/week schedule", "All subjects available"], topicsAr: ["8 حصص فردية", "من 57$/شهرياً", "مثالية لجدول حصتين/أسبوع", "جميع المواد متاحة"] },
      { titleEn: "Standard Plan", titleAr: "الخطة العادية", descEn: "12 sessions/month — recommended for steady progress.", descAr: "12 حصة/شهرياً — موصى بها للتقدم المستمر.", topicsEn: ["12 one-on-one sessions", "Better value per session", "3x/week recommended", "Progress reports included"], topicsAr: ["12 حصة فردية", "قيمة أفضل لكل حصة", "3 مرات/أسبوع موصى بها", "تقارير تقدم مشمولة"] },
      { titleEn: "Intensive Plan", titleAr: "الخطة المكثفة", descEn: "20 sessions/month — fastest results.", descAr: "20 حصة/شهرياً — أسرع النتائج.", topicsEn: ["20 one-on-one sessions", "Best value per session", "5x/week — fastest progress", "Priority teacher matching"], topicsAr: ["20 حصة فردية", "أفضل قيمة لكل حصة", "5 مرات/أسبوع — أسرع تقدم", "أولوية اختيار المعلم"] },
    ]}
    outcomesEn={["Transparent pricing with no surprises", "One-on-one sessions at group-class prices", "Certified Al-Azhar teachers at every price point", "Family discounts for multiple enrollments", "Free trial to verify quality before paying"]}
    outcomesAr={["أسعار شفافة بدون مفاجآت", "حصص فردية بأسعار الجماعية", "معلمون معتمدون من الأزهر في كل مستوى سعري", "خصومات عائلية لعدة تسجيلات", "تجربة مجانية للتحقق من الجودة قبل الدفع"]}
    featuresEn={["Plans from $57/month", "One-on-one sessions from $6/hour", "No registration or material fees", "Family discounts available", "Free trial — no credit card needed", "Easy monthly payment", "Cancel anytime — no contracts", "Same quality at every price point"]}
    featuresAr={["خطط من 57$/شهرياً", "حصص فردية من 6$/ساعة", "بدون رسوم تسجيل أو مواد", "خصومات عائلية متاحة", "تجربة مجانية — بدون بطاقة ائتمان", "دفع شهري سهل", "إلغاء في أي وقت — بدون عقود", "نفس الجودة في كل مستوى سعري"]}
    faqs={[
      { questionEn: "How much do Quran classes cost at Alhamd Academy?", questionAr: "كم تكلفة حصص القرآن في أكاديمية الحمد؟", answerEn: "Our plans start from $57/month for 8 one-on-one sessions. That works out to about $7 per session. For more frequent sessions, our 12 and 20-session plans offer better per-session value. Contact us on WhatsApp for the exact pricing for each plan.", answerAr: "خططنا تبدأ من 57$/شهرياً لـ 8 حصص فردية. هذا يعادل حوالي 7$ لكل حصة. للحصص الأكثر تكراراً، خطط 12 و20 حصة تقدم قيمة أفضل. تواصل معنا عبر واتساب للأسعار الدقيقة." },
      { questionEn: "Are there any hidden fees?", questionAr: "هل هناك رسوم مخفية؟", answerEn: "None. You pay one monthly fee and that covers everything: the teacher, the sessions, the learning materials, progress reports, and scheduling flexibility. There are no registration fees, no material fees, no cancellation penalties.", answerAr: "لا. تدفع رسوماً شهرية واحدة تغطي كل شيء: المعلم والحصص والمواد وتقارير التقدم ومرونة المواعيد. لا رسوم تسجيل ولا رسوم مواد ولا غرامات إلغاء." },
      { questionEn: "Do you offer discounts for families?", questionAr: "هل تقدمون خصومات للعائلات؟", answerEn: "Yes. We offer family discounts when multiple children or family members enroll together. The more family members you enroll, the better the per-student rate. Contact us on WhatsApp for a custom family package.", answerAr: "نعم. نقدم خصومات عائلية عند تسجيل عدة أطفال أو أفراد عائلة معاً. كلما زاد عدد المسجلين، أفضل كان السعر للفرد. تواصل معنا عبر واتساب لحزمة عائلية مخصصة." },
      { questionEn: "Can I cancel anytime?", questionAr: "هل يمكنني الإلغاء في أي وقت؟", answerEn: "Yes. There are no long-term contracts or lock-in periods. You pay month-to-month and can cancel at the end of any billing cycle. We keep students through quality, not contracts.", answerAr: "نعم. لا توجد عقود طويلة الأمد. تدفع شهرياً ويمكنك الإلغاء في نهاية أي دورة فوترة. نحافظ على الطلاب من خلال الجودة لا العقود." },
    ]}
    testimonials={[
      { name: "Bilal T.", country: "USA", textEn: "I was paying $25/hour at another online Quran school. Alhamd Academy gives me a better teacher, one-on-one attention, and costs less than a third. The value is unbeatable.", textAr: "كنت أدفع 25$/ساعة في مدرسة قرآن أونلاين أخرى. أكاديمية الحمد تعطيني معلماً أفضل واهتماماً فردياً وتكلف أقل من الثلث. القيمة لا تُضاهى.", rating: 5 },
      { name: "Maryam K.", country: "Canada", textEn: "With 3 kids enrolled, the family discount saved us a significant amount. All three are learning with certified teachers in private sessions. Best educational investment we've ever made.", textAr: "مع 3 أطفال مسجلين، الخصم العائلي وفر لنا مبلغاً كبيراً. الثلاثة يتعلمون مع معلمين معتمدين في حصص خاصة. أفضل استثمار تعليمي قمنا به.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Alhamd Academy Online Quran Classes",
      "description": "Affordable online Quran classes with certified Al-Azhar teachers. One-on-one private sessions from $57/month.",
      "brand": { "@type": "Brand", "name": "Alhamd Academy" },
      "offers": { "@type": "AggregateOffer", "lowPrice": "57", "highPrice": "250", "priceCurrency": "USD", "offerCount": "3" },
    }}
  />
);

export default QuranClassesPricing;
