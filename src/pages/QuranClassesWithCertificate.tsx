import { Award, GraduationCap, FileCheck, Shield, BookOpen, Star } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, Challenge } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن", href: "/online-quran-classes" },
  { titleEn: "Ijazah Program", titleAr: "برنامج الإجازة", href: "/ijazah-program" },
  { titleEn: "Tajweed Course", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Best Online Quran Classes", titleAr: "أفضل الدروس", href: "/best-online-quran-classes" },
  { titleEn: "Quran Classes Pricing", titleAr: "الأسعار", href: "/quran-classes-pricing" },
  { titleEn: "Free Trial", titleAr: "تجربة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: GraduationCap,
    titleEn: "Students Seeking Ijazah Certification",
    titleAr: "طلاب يسعون لشهادة الإجازة",
    descEn: "You want to obtain an Ijazah — a certificate with an unbroken chain of narration (Sanad) back to the Prophet ﷺ. Our Ijazah program provides this prestigious certification through rigorous one-on-one assessment with certified Mujaaz teachers.",
    descAr: "تريد الحصول على إجازة — شهادة بسند متصل بالنبي ﷺ. برنامج الإجازة يوفر هذه الشهادة المرموقة من خلال تقييم فردي دقيق مع معلمين مجازين.",
  },
  {
    icon: FileCheck,
    titleEn: "Parents Wanting Proof of Their Child's Progress",
    titleAr: "آباء يريدون دليلاً على تقدم أطفالهم",
    descEn: "You want tangible evidence that your child's Quran education is progressing. Our level completion certificates document each milestone — from completing Noorani Qaida to finishing Tajweed curriculum to memorization achievements.",
    descAr: "تريد دليلاً ملموساً على تقدم تعليم طفلك القرآني. شهادات إكمال المستوى توثق كل معلم — من إكمال القاعدة النورانية إلى إنهاء منهج التجويد.",
  },
  {
    icon: BookOpen,
    titleEn: "Aspiring Quran Teachers",
    titleAr: "معلمو قرآن طموحون",
    descEn: "You want to teach Quran to others and need proper certification. Our advanced tracks prepare you for Ijazah certification and include teaching methodology training so you can confidently pass on your knowledge.",
    descAr: "تريد تعليم القرآن للآخرين وتحتاج شهادة مناسبة. مساراتنا المتقدمة تؤهلك لشهادة الإجازة وتشمل تدريب على منهجية التدريس.",
  },
  {
    icon: Shield,
    titleEn: "Professionals Needing Verified Qualifications",
    titleAr: "مهنيون يحتاجون مؤهلات موثقة",
    descEn: "You're an Imam, Islamic school teacher, or community leader who needs documented proof of Quran recitation proficiency. Our Ijazah certification with connected Sanad is recognized worldwide.",
    descAr: "أنت إمام أو معلم مدرسة إسلامية أو قائد مجتمع يحتاج دليلاً موثقاً على إتقان تلاوة القرآن. شهادة الإجازة بسند متصل معترف بها عالمياً.",
  },
  {
    icon: Star,
    titleEn: "Achievers Who Want to Document Their Journey",
    titleAr: "المنجزون الذين يريدون توثيق رحلتهم",
    descEn: "You've worked hard to learn Quran and want a certificate to mark your achievement. Our progress certificates at each level are meaningful milestones that validate your dedication and effort.",
    descAr: "عملت بجد لتعلم القرآن وتريد شهادة لتوثيق إنجازك. شهادات التقدم عند كل مستوى معالم ذات معنى تثبت تفانيك وجهدك.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"Are online Quran certificates actually recognized?\"",
    problemAr: "\"هل شهادات القرآن أونلاين معترف بها فعلاً؟\"",
    solutionEn: "Our Ijazah certificates are issued by certified Mujaaz teachers with connected Sanad (chain of narration) back to the Prophet ﷺ. This is the same Ijazah that would be issued in-person — the method of instruction (online vs. in-person) doesn't affect the validity of the Sanad.",
    solutionAr: "شهادات الإجازة تصدر من معلمين مجازين بسند متصل بالنبي ﷺ. هذه نفس الإجازة التي تصدر حضورياً — طريقة التدريس (أونلاين مقابل حضوري) لا تؤثر على صحة السند.",
  },
  {
    problemEn: "\"How long does it take to get an Ijazah certificate?\"",
    problemAr: "\"كم يستغرق الحصول على شهادة الإجازة؟\"",
    solutionEn: "For students who can already read Quran fluently with good Tajweed, the Ijazah preparation typically takes 6–12 months of intensive one-on-one training. The timeline depends on your starting level and the Ijazah type (Hafs, Warsh, etc.).",
    solutionAr: "للطلاب الذين يقرأون القرآن بطلاقة بتجويد جيد، تحضير الإجازة يستغرق عادة 6–12 شهراً من التدريب المكثف الفردي. الجدول الزمني يعتمد على مستواك الأولي ونوع الإجازة.",
  },
  {
    problemEn: "\"I just want a completion certificate, not a full Ijazah\"",
    problemAr: "\"أريد فقط شهادة إتمام وليس إجازة كاملة\"",
    solutionEn: "We offer level completion certificates at each stage of your learning journey — from completing Noorani Qaida to finishing our Tajweed curriculum to memorizing specific amounts of Quran. These certificates document your achievement without requiring Ijazah-level proficiency.",
    solutionAr: "نقدم شهادات إتمام المستوى عند كل مرحلة من رحلة تعلمك — من إكمال القاعدة النورانية إلى إنهاء منهج التجويد. هذه الشهادات توثق إنجازك بدون الحاجة لمستوى الإجازة.",
  },
];

const QuranClassesWithCertificate = () => (
  <ServicePageLayout
    seoTitle="Online Quran Classes with Certificate | Ijazah Program | Alhamd Academy"
    seoDescription="Get certified in Quran recitation online. Ijazah with connected Sanad, level completion certificates. Certified Al-Azhar teachers. One-on-one sessions. Free trial."
    seoKeywords="online quran classes with certificate, quran certificate online, ijazah quran online, quran certification, quran classes with certification, online quran certificate course, quran ijazah program online, certified quran teacher training"
    canonical="https://alhamdacademy.net/online-quran-classes-with-certificate"
    heroTitleEn="Online Quran Classes with Certificate — Document Your Achievement"
    heroTitleAr="دروس قرآن أونلاين بشهادة — وثّق إنجازك"
    heroSubtitleEn="Ijazah with Connected Sanad · Level Completion Certificates · Recognized Worldwide"
    heroSubtitleAr="إجازة بسند متصل · شهادات إتمام المستوى · معترف بها عالمياً"
    heroDescEn="Whether you're pursuing the prestigious Ijazah certification with an unbroken chain of narration back to the Prophet ﷺ, or simply want a certificate documenting your Quran learning milestones, Alhamd Academy offers verified certification programs with certified Mujaaz teachers."
    heroDescAr="سواء كنت تسعى لشهادة الإجازة المرموقة بسند متصل بالنبي ﷺ، أو تريد ببساطة شهادة توثق معالم تعلمك القرآنية، أكاديمية الحمد تقدم برامج شهادات موثقة مع معلمين مجازين."
    aboutTitleEn="Certification Options at Alhamd Academy"
    aboutTitleAr="خيارات الشهادات في أكاديمية الحمد"
    aboutContentEn={[
      "Alhamd Academy offers two types of certification: Level Completion Certificates and Ijazah Certification. Both are earned through rigorous one-on-one assessment with certified teachers and represent genuine achievement.",
      "Level Completion Certificates are awarded at key milestones in your learning journey. When you complete the Noorani Qaida foundation, pass the Tajweed curriculum assessment, or achieve memorization targets, you receive a certificate documenting your accomplishment. These are especially valuable for children, whose parents want tangible proof of progress.",
      "Ijazah Certification is the highest form of Quran recitation credential. An Ijazah is a certificate with a connected Sanad (chain of narration) that traces back through generations of scholars all the way to the Prophet Muhammad ﷺ. It certifies that you can recite the Quran with proper Tajweed and that a qualified Mujaaz teacher has verified your proficiency.",
      "Our Ijazah program is taught by teachers who themselves hold Ijazah with connected Sanad. When you earn an Ijazah through Alhamd Academy, your certificate includes your complete chain of narration — a spiritual and scholarly lineage that connects you directly to the Prophet ﷺ.",
      "The beauty of our online Ijazah program is accessibility. Previously, obtaining an Ijazah required traveling to Islamic institutions or finding a local Mujaaz teacher. Now, you can earn this prestigious certification from your home in the USA, Canada, UK, Australia, or anywhere in the world — at just $15/hour.",
    ]}
    aboutContentAr={[
      "أكاديمية الحمد تقدم نوعين من الشهادات: شهادات إتمام المستوى وشهادة الإجازة. كلاهما يُكتسب من خلال تقييم فردي دقيق مع معلمين معتمدين ويمثل إنجازاً حقيقياً.",
      "شهادات إتمام المستوى تُمنح عند معالم رئيسية: إكمال القاعدة النورانية، اجتياز تقييم منهج التجويد، أو تحقيق أهداف الحفظ. هذه قيمة خاصة للأطفال الذين يريد آباؤهم دليلاً ملموساً.",
      "شهادة الإجازة أعلى شكل من أوراق اعتماد تلاوة القرآن. الإجازة شهادة بسند متصل يعود عبر أجيال العلماء إلى النبي محمد ﷺ. تشهد أنك تستطيع تلاوة القرآن بالتجويد الصحيح.",
      "برنامج الإجازة يُدرّسه معلمون يحملون إجازة بسند متصل. عندما تحصل على إجازة من أكاديمية الحمد، شهادتك تتضمن سلسلة السند الكاملة.",
      "جمال برنامج الإجازة أونلاين هو الوصولية. سابقاً، الحصول على إجازة تطلب السفر. الآن يمكنك الحصول على هذه الشهادة المرموقة من بيتك في أي مكان — بـ 15$/ساعة فقط.",
    ]}
    methodTitleEn="How Our Certification Process Works"
    methodTitleAr="كيف تعمل عملية الشهادات"
    methodContentEn={[
      "For Level Completion Certificates: As you progress through our structured curriculum, you reach natural assessment points. Your teacher evaluates your proficiency at each stage, and upon successful completion, you receive a certificate documenting your achievement.",
      "For Ijazah Certification: You must first demonstrate strong Quran reading with advanced Tajweed application. Your Mujaaz teacher then works with you one-on-one to refine your recitation to Ijazah standard — this typically involves reading the entire Quran under their supervision.",
      "The Ijazah assessment is rigorous but supportive. Your teacher corrects every subtle error, ensures every Makharij is perfect, and every Tajweed rule is applied consistently. This process ensures that when you receive your Ijazah, it represents genuine mastery.",
      "Upon completion, you receive a formal Ijazah document with your complete chain of narration (Sanad) listed. This document is recognized by Islamic institutions worldwide and qualifies you to issue Ijazah to others in the future.",
    ]}
    methodContentAr={[
      "لشهادات إتمام المستوى: كلما تقدمت في منهجنا المنظم، تصل لنقاط تقييم طبيعية. معلمك يقيّم كفاءتك وعند الإتمام الناجح، تحصل على شهادة توثق إنجازك.",
      "لشهادة الإجازة: يجب أولاً إظهار قراءة قرآن قوية بتطبيق تجويد متقدم. معلمك المجاز يعمل معك فردياً لصقل تلاوتك — عادة يشمل قراءة القرآن كاملاً تحت إشرافه.",
      "تقييم الإجازة دقيق لكنه داعم. معلمك يصحح كل خطأ دقيق ويضمن إتقان كل مخرج وتطبيق كل حكم تجويد بثبات.",
      "عند الإتمام، تحصل على وثيقة إجازة رسمية بسلسلة السند الكاملة. هذه الوثيقة معترف بها من المؤسسات الإسلامية عالمياً وتؤهلك لمنح الإجازة للآخرين.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Who Seeks Quran Certification?"
    audienceTitleAr="من يسعى لشهادة القرآن؟"
    challenges={CHALLENGES}
    challengesTitleEn="Questions About Quran Certification — Clear Answers"
    challengesTitleAr="أسئلة عن شهادة القرآن — إجابات واضحة"
    trustBadges={[
      { icon: Award, textEn: "Ijazah with Connected Sanad", textAr: "إجازة بسند متصل" },
      { icon: FileCheck, textEn: "Level Completion Certificates", textAr: "شهادات إتمام المستوى" },
      { icon: Shield, textEn: "Recognized Worldwide", textAr: "معترف بها عالمياً" },
      { icon: GraduationCap, textEn: "Certified Mujaaz Teachers", textAr: "معلمون مجازون معتمدون" },
    ]}
    levels={[
      { titleEn: "Level Certificates", titleAr: "شهادات المستوى", descEn: "Milestone certificates throughout your journey.", descAr: "شهادات معالم خلال رحلتك.", topicsEn: ["Noorani Qaida completion", "Tajweed curriculum completion", "Memorization milestones", "Reading proficiency"], topicsAr: ["إتمام القاعدة النورانية", "إتمام منهج التجويد", "معالم الحفظ", "كفاءة القراءة"] },
      { titleEn: "Ijazah in Hafs", titleAr: "إجازة بحفص", descEn: "Full Quran recitation certification in Hafs an Asim.", descAr: "شهادة تلاوة القرآن كاملاً بحفص عن عاصم.", topicsEn: ["Complete Quran recitation", "Advanced Tajweed mastery", "Connected Sanad", "Qualification to teach others"], topicsAr: ["تلاوة القرآن كاملاً", "إتقان التجويد المتقدم", "سند متصل", "أهلية لتعليم الآخرين"] },
      { titleEn: "Teaching Certification", titleAr: "شهادة تدريس", descEn: "Learn methodology to teach Quran to others.", descAr: "تعلم منهجية تدريس القرآن للآخرين.", topicsEn: ["Teaching methodology", "Classroom management", "Error identification", "Curriculum design"], topicsAr: ["منهجية التدريس", "إدارة الفصل", "تحديد الأخطاء", "تصميم المنهج"] },
    ]}
    outcomesEn={["Verified Ijazah with unbroken Sanad", "Level completion certificates at each milestone", "Qualification to teach and certify others", "Worldwide recognition of credentials", "Documentation of your Quran achievement"]}
    outcomesAr={["إجازة موثقة بسند متصل", "شهادات إتمام المستوى عند كل معلم", "أهلية لتعليم ومنح الإجازة للآخرين", "اعتراف عالمي بالمؤهلات", "توثيق إنجازك القرآني"]}
    featuresEn={["Ijazah with connected Sanad to Prophet ﷺ", "Level completion certificates", "Certified Mujaaz teachers", "One-on-one intensive training", "Only $15/hour for Ijazah program", "Recognized by Islamic institutions", "Online — study from anywhere", "Free trial to discuss your goals"]}
    featuresAr={["إجازة بسند متصل بالنبي ﷺ", "شهادات إتمام المستوى", "معلمون مجازون معتمدون", "تدريب فردي مكثف", "15$/ساعة فقط لبرنامج الإجازة", "معترف بها من المؤسسات الإسلامية", "أونلاين — ادرس من أي مكان", "تجربة مجانية لمناقشة أهدافك"]}
    faqs={[
      { questionEn: "Is an online Ijazah as valid as an in-person one?", questionAr: "هل الإجازة أونلاين صالحة مثل الحضورية؟", answerEn: "Yes. The validity of an Ijazah comes from the Sanad (chain of narration) and the qualification of the issuing teacher — not the medium of instruction. Our Mujaaz teachers hold the same Ijazah they would issue in person. Major Islamic scholars have confirmed the validity of online Ijazah.", answerAr: "نعم. صلاحية الإجازة تأتي من السند ومؤهلات المعلم المانح — وليس وسيلة التدريس. معلمونا المجازون يحملون نفس الإجازة التي يمنحونها حضورياً." },
      { questionEn: "How much does the Ijazah program cost?", questionAr: "كم يكلف برنامج الإجازة؟", answerEn: "Our Ijazah program is priced at $15/hour — significantly less than what most institutions charge. The total cost depends on your starting level and how quickly you progress. Most students complete the program in 6–12 months.", answerAr: "برنامج الإجازة بـ 15$/ساعة — أقل بكثير مما تتقاضاه معظم المؤسسات. التكلفة الإجمالية تعتمد على مستواك الأولي وسرعة تقدمك." },
      { questionEn: "Do I need to be a Hafiz to get an Ijazah?", questionAr: "هل أحتاج أن أكون حافظاً للحصول على إجازة؟", answerEn: "For a complete Quran Ijazah, yes — you need to be able to recite the entire Quran from memory with proper Tajweed. However, we also offer partial Ijazah (for specific Surahs or Juz) and reading Ijazah (reciting from the Mushaf, not from memory).", answerAr: "لإجازة القرآن الكامل، نعم — تحتاج تلاوة القرآن كاملاً من الذاكرة بالتجويد. لكننا نقدم أيضاً إجازة جزئية (لسور أو أجزاء محددة) وإجازة قراءة (من المصحف)." },
    ]}
    testimonials={[
      { name: "Imam Abdullah K.", country: "USA", textEn: "I received my Ijazah in Hafs through Alhamd Academy after 8 months of intensive one-on-one training. The Sanad is authentic and the teacher was exceptional. Best $15/hour I've ever spent.", textAr: "حصلت على إجازتي في حفص من أكاديمية الحمد بعد 8 أشهر من التدريب المكثف الفردي. السند أصيل والمعلم استثنائي. أفضل 15$/ساعة أنفقتها.", rating: 5 },
      { name: "Zahra H.", country: "Canada", textEn: "My children received level completion certificates as they progressed through the program. It gives them a real sense of achievement and motivates them to keep going. The certificates are beautiful and professional.", textAr: "أطفالي حصلوا على شهادات إتمام المستوى كلما تقدموا في البرنامج. يعطيهم شعوراً حقيقياً بالإنجاز ويحفزهم للاستمرار. الشهادات جميلة واحترافية.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Online Quran Classes with Certificate",
      "description": "Get certified in Quran recitation. Ijazah with connected Sanad, level completion certificates. Certified Mujaaz teachers.",
      "provider": { "@type": "Organization", "name": "Alhamd Academy", "url": "https://alhamdacademy.net" },
      "educationalCredentialAwarded": "Ijazah with Connected Sanad",
      "offers": { "@type": "Offer", "price": "15", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    }}
  />
);

export default QuranClassesWithCertificate;
