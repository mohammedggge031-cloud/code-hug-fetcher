import { BookOpen, Languages, Moon, GraduationCap, Sparkles } from "lucide-react";

export type CourseSlug = "quran-course" | "tajweed-course" | "arabic-course" | "islamic-studies" | "all-in-one-course";

export interface SubCourse {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  highlightsEn?: string[];
  highlightsAr?: string[];
}

export interface CourseFAQ {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface CourseReview {
  name: string;
  country: string;
  rating: number;
  textEn: string;
  textAr: string;
}

export interface Course {
  slug: CourseSlug;
  icon: typeof BookOpen;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  objectivesEn: string[];
  objectivesAr: string[];
  outcomesEn: string[];
  outcomesAr: string[];
  personalizedPlanEn: string[];
  personalizedPlanAr: string[];
  subCourses: SubCourse[];
  featuresEn: string[];
  featuresAr: string[];
  faqs: CourseFAQ[];
  reviews: CourseReview[];
}

export const courses: Course[] = [
  {
    slug: "quran-course",
    icon: BookOpen,
    titleEn: "Online Quran Classes — Learn Quran Online with Expert Teachers",
    titleAr: "دورة القرآن الكريم — تعلم القرآن أونلاين مع معلمين خبراء",
    descEn: "Join the best online Quran classes for kids and adults. Learn Quran online with one-on-one live sessions from certified Al-Azhar teachers. Our comprehensive Quran course covers Noorani Qaida for beginners, Quran reading lessons, Quran memorization (Hifz), and Ijazah certification — all through private Quran lessons online tailored to your level and pace.",
    descAr: "انضم لأفضل دروس القرآن أونلاين للأطفال والكبار. تعلم القرآن عبر الإنترنت مع جلسات فردية مباشرة من معلمين معتمدين من الأزهر. دورتنا الشاملة تغطي النورانية للمبتدئين، دروس قراءة القرآن، حفظ القرآن، وشهادة الإجازة — كل ذلك من خلال حصص خاصة مصممة لمستواك ووتيرتك.",
    objectivesEn: [
      "Build a strong foundation in Arabic letter recognition and Quran reading",
      "Develop accurate recitation with real-time teacher correction",
      "Progress from basic reading to fluent Quran recitation",
      "Master memorization techniques with structured Hifz methodology",
      "Prepare advanced students for Ijazah certification with Sanad",
    ],
    objectivesAr: [
      "بناء أساس قوي في التعرف على الحروف العربية وقراءة القرآن",
      "تطوير تلاوة دقيقة مع تصحيح فوري من المعلم",
      "التقدم من القراءة الأساسية إلى تلاوة القرآن بطلاقة",
      "إتقان تقنيات الحفظ بمنهجية حفظ منظمة",
      "تحضير الطلاب المتقدمين لشهادة الإجازة بالسند",
    ],
    outcomesEn: [
      "Read the Quran independently with correct pronunciation",
      "Recite with proper Tajweed rules applied naturally",
      "Memorize selected Surahs or the entire Quran based on your plan",
      "Understand the connection between Arabic letters and Quranic sounds",
      "Gain confidence to lead prayers and recite publicly",
      "Earn an Ijazah certificate with an unbroken chain to the Prophet ﷺ (advanced track)",
    ],
    outcomesAr: [
      "قراءة القرآن بشكل مستقل مع نطق صحيح",
      "التلاوة بأحكام التجويد بشكل طبيعي",
      "حفظ سور مختارة أو القرآن كاملاً حسب خطتك",
      "فهم العلاقة بين الحروف العربية والأصوات القرآنية",
      "اكتساب الثقة لإمامة الصلاة والتلاوة علناً",
      "الحصول على إجازة بسند متصل إلى النبي ﷺ (المسار المتقدم)",
    ],
    personalizedPlanEn: [
      "Free assessment to determine your exact reading level and goals",
      "Custom curriculum designed around your starting point — beginner, intermediate, or advanced",
      "Dedicated teacher matched to your age group, learning style, and preferred pace",
      "Flexible schedule that adapts to your availability across any timezone",
      "Regular progress reports shared with parents (for kids) or directly with adult learners",
      "Adaptive lesson plans — your teacher adjusts the approach based on your strengths and challenges",
    ],
    personalizedPlanAr: [
      "تقييم مجاني لتحديد مستوى القراءة وأهدافك بدقة",
      "منهج مخصص مصمم حول نقطة بدايتك — مبتدئ أو متوسط أو متقدم",
      "معلم مخصص يتناسب مع فئتك العمرية وأسلوب تعلمك والوتيرة المفضلة",
      "جدول مرن يتكيف مع توفرك في أي منطقة زمنية",
      "تقارير تقدم منتظمة تُشارك مع الأهل (للأطفال) أو مباشرة مع المتعلمين البالغين",
      "خطط دروس تكيفية — يعدّل معلمك المنهج بناءً على نقاط قوتك وتحدياتك",
    ],
    subCourses: [
      {
        titleEn: "Learn to Read Quran — Quran Reading Course Online",
        titleAr: "تعلم قراءة القرآن — دورة قراءة القرآن أونلاين",
        descEn: "Our online Quran reading course helps beginners learn to read Quran from scratch. Starting with Noorani Qaida (Noor Al-Bayan), students master Arabic letter recognition, vowel marks, and connected reading through one-on-one Quran reading lessons with a dedicated online Quran reading teacher. Ideal for kids and adults who want to learn Quran reading for beginners.",
        descAr: "دورة قراءة القرآن أونلاين تساعد المبتدئين على تعلم قراءة القرآن من الصفر. بدءاً من النورانية (نور البيان)، يتقن الطلاب التعرف على الحروف العربية والحركات والقراءة المتصلة من خلال دروس فردية مع معلم متخصص.",
        highlightsEn: ["Noorani Qaida methodology", "One-on-one Quran reading lessons", "Letter recognition & connected reading", "For kids and adult beginners"],
        highlightsAr: ["منهج النورانية", "دروس قراءة قرآن فردية", "تعلم الحروف والقراءة المتصلة", "للأطفال والكبار المبتدئين"],
      },
      {
        titleEn: "Quran Memorization Online — Hifz Program",
        titleAr: "حفظ القرآن أونلاين — برنامج الحفظ",
        descEn: "Memorize Quran online with our structured Hifz program. Students memorize new verses daily with a dedicated online Quran tutor, repeat them until mastery, and maintain retention through daily revision. Our online Quran memorization course is available for kids and adults, with personalized Hifz plans designed by certified teachers. The best online Hifz program for committed learners.",
        descAr: "احفظ القرآن أونلاين مع برنامج الحفظ المنظم. يحفظ الطلاب آيات جديدة يومياً مع معلم متخصص، ويكررونها حتى الإتقان، ويحافظون على الحفظ من خلال المراجعة اليومية. برنامج حفظ القرآن أونلاين متاح للأطفال والكبار.",
        highlightsEn: ["Memorize Quran online with teacher", "Personalized Hifz plan", "Online hifz classes for kids & adults", "Daily revision & progress tracking"],
        highlightsAr: ["حفظ القرآن أونلاين مع معلم", "خطة حفظ مخصصة", "دروس حفظ أونلاين للأطفال والكبار", "مراجعة يومية وتتبع التقدم"],
      },
      {
        titleEn: "Quran Course Full Track",
        titleAr: "دورة القرآن المتكاملة",
        descEn: "A comprehensive course that combines reading correction, memorization, and Tajweed in one track. This longer and deeper course is ideal for those who wish to advance holistically in their Quranic studies — covering fluency, proper pronunciation, and retention together.",
        descAr: "دورة شاملة تجمع بين تصحيح القراءة والحفظ والتجويد في مسار واحد. مسار أطول وأعمق مثالي لمن يرغب في التقدم الشامل في دراسته القرآنية.",
        highlightsEn: ["Reading + Memorization + Tajweed combined", "Slower & deeper pace", "Holistic Quran mastery", "Suitable for committed learners"],
        highlightsAr: ["قراءة + حفظ + تجويد مدمج", "وتيرة أبطأ وأعمق", "إتقان شامل للقرآن", "مناسب للطلاب الملتزمين"],
      },
      {
        titleEn: "Quran for Kids",
        titleAr: "القرآن للأطفال",
        descEn: "A fun, interactive Quran learning experience designed specifically for children. Teachers use engaging methods, colorful materials, and positive reinforcement to help kids fall in love with the Quran from an early age.",
        descAr: "تجربة تعلم قرآن تفاعلية وممتعة مصممة خصيصاً للأطفال. يستخدم المعلمون أساليب جذابة ومواد ملونة وتعزيزاً إيجابياً لمساعدة الأطفال على حب القرآن.",
        highlightsEn: ["Child-friendly teaching methods", "Short engaging sessions", "Positive reinforcement", "Age-appropriate curriculum"],
        highlightsAr: ["أساليب تعليم مناسبة للأطفال", "جلسات قصيرة وجذابة", "تعزيز إيجابي", "منهج مناسب للعمر"],
      },
      {
        titleEn: "Ijazah Program",
        titleAr: "برنامج الإجازة",
        descEn: "For advanced students seeking an official Ijazah certificate in Quran recitation. Students perfect their recitation under certified scholars with an unbroken chain of narration (Sanad) back to the Prophet ﷺ.",
        descAr: "للطلاب المتقدمين الذين يسعون للحصول على شهادة إجازة رسمية في تلاوة القرآن مع سند متصل إلى النبي ﷺ.",
        highlightsEn: ["Certified Ijazah with Sanad", "Multiple Qiraat available", "One-on-one with Ijazah holders", "Internationally recognized"],
        highlightsAr: ["إجازة معتمدة بالسند", "قراءات متعددة متاحة", "جلسات فردية مع حملة الإجازة", "معترف بها دولياً"],
      },
    ],
    featuresEn: ["Certified Quran teachers from Al-Azhar", "One-on-one live sessions", "Daily progress reports", "Flexible scheduling 24/7"],
    featuresAr: ["معلمون معتمدون من الأزهر", "جلسات فردية مباشرة", "تقارير يومية", "جداول مرنة على مدار الساعة"],
    faqs: [
      { questionEn: "How to learn Quran online effectively?", questionAr: "كيف أتعلم القرآن أونلاين بفعالية؟", answerEn: "The most effective way to learn Quran online is through one-on-one live sessions with a certified Quran teacher. At Alhamd Academy, our private Quran lessons online follow a structured curriculum — starting with Noorani Qaida for beginners, progressing through fluent Quran reading, and advancing to memorization and Tajweed. Real-time teacher correction and personalized plans make online Quran classes just as effective as in-person learning.", answerAr: "أفضل طريقة لتعلم القرآن أونلاين هي من خلال جلسات فردية مباشرة مع معلم قرآن معتمد. في أكاديمية الحمد، دروسنا الخاصة أونلاين تتبع منهجاً منظماً — بدءاً من النورانية للمبتدئين، مروراً بالقراءة بطلاقة، ووصولاً للحفظ والتجويد." },
      { questionEn: "Are online Quran classes effective for kids?", questionAr: "هل دروس القرآن أونلاين فعالة للأطفال؟", answerEn: "Yes! Online Quran classes for kids are highly effective when taught by experienced teachers using interactive methods. Our online Quran tutor for kids uses engaging activities, positive reinforcement, and age-appropriate pacing to keep children motivated. Many parents report their kids reading Quran fluently within months of starting our Quran classes for kids online.", answerAr: "نعم! دروس القرآن أونلاين للأطفال فعالة جداً عندما يدرّسها معلمون ذوو خبرة بأساليب تفاعلية. معلمونا يستخدمون أنشطة جذابة وتعزيزاً إيجابياً ووتيرة مناسبة للعمر." },
      { questionEn: "What is the best online Quran academy?", questionAr: "ما أفضل أكاديمية قرآن أونلاين؟", answerEn: "The best online Quran academy combines certified teachers, personalized learning plans, and flexible scheduling. Alhamd Academy features Al-Azhar University graduates, one-on-one sessions, a free trial class with no commitment, and a 4.9/5 student rating — making it one of the best online Quran schools available globally for both kids and adults.", answerAr: "أفضل أكاديمية قرآن أونلاين تجمع بين معلمين معتمدين وخطط تعلم مخصصة ومواعيد مرنة. أكاديمية الحمد تضم خريجي الأزهر وجلسات فردية وتجربة مجانية بدون التزام وتقييم 4.9/5." },
      { questionEn: "Can adults take online Quran classes for beginners?", questionAr: "هل يمكن للكبار أخذ دروس قرآن أونلاين للمبتدئين؟", answerEn: "Absolutely. Our online Quran classes for adults include a complete beginner track starting from Noorani Qaida (Arabic letter recognition). Many adult learners — including new Muslims and those who never learned to read Quran — have successfully completed our program. Private one-on-one Quran lessons online ensure a comfortable, judgment-free environment.", answerAr: "بالتأكيد. دروس القرآن أونلاين للكبار تشمل مساراً كاملاً للمبتدئين يبدأ من النورانية. العديد من المتعلمين البالغين أكملوا برنامجنا بنجاح في بيئة مريحة وخالية من الأحكام." },
      { questionEn: "How long does it take to learn to read Quran online?", questionAr: "كم يستغرق تعلم قراءة القرآن أونلاين؟", answerEn: "With consistent online Quran reading classes (3-5 sessions per week), most beginners can read Quran fluently within 3-6 months. Starting with Noorani Qaida online, students progress through letter recognition, connected reading, and then independent Quran reading. The timeline depends on your starting level and practice consistency.", answerAr: "مع دروس قراءة القرآن المنتظمة (3-5 جلسات أسبوعياً)، معظم المبتدئين يقرؤون القرآن بطلاقة خلال 3-6 أشهر. بدءاً من النورانية، يتقدم الطلاب عبر تعلم الحروف والقراءة المتصلة ثم القراءة المستقلة." },
      { questionEn: "Do you offer one-on-one Quran classes online?", questionAr: "هل تقدمون دروس قرآن فردية أونلاين؟", answerEn: "Yes, all our online Quran classes are one-on-one with a dedicated Quran teacher online. This ensures maximum attention, real-time correction, and a personalized learning pace. You can also choose a female Quran teacher if preferred.", answerAr: "نعم، جميع دروس القرآن أونلاين لدينا فردية مع معلم قرآن مخصص. هذا يضمن أقصى اهتمام وتصحيح فوري ووتيرة تعلم مخصصة." },
      { questionEn: "Can I choose my Quran teacher online?", questionAr: "هل يمكنني اختيار معلم القرآن أونلاين؟", answerEn: "Yes, after the free trial we match you with the best Quran tutor online for your needs. If you'd like to switch, you can request a different teacher at any time. We have both male and female Quran teachers available.", answerAr: "نعم، بعد التجربة المجانية نوفق بينك وبين أفضل معلم قرآن لاحتياجاتك. إذا أردت التغيير يمكنك طلب معلم مختلف في أي وقت." },
    ],
    reviews: [
      { name: "Ibrahim Khan", country: "USA", rating: 5, textEn: "My son went from not knowing the Arabic alphabet to reading Quran fluently in just a few months. The structured approach really works.", textAr: "ابني انتقل من عدم معرفة الحروف العربية إلى قراءة القرآن بطلاقة في بضعة أشهر فقط. المنهج المنظم فعال حقاً." },
      { name: "Fatima Ali", country: "UK", rating: 5, textEn: "The Hifz program is well-structured. My daughter memorizes consistently and the teacher is incredibly patient.", textAr: "برنامج الحفظ منظم جداً. ابنتي تحفظ بانتظام والمعلمة صبورة بشكل مذهل." },
      { name: "Ahmed Hassan", country: "Canada", rating: 5, textEn: "I'm an adult learner and was hesitant to start. The teachers made me feel comfortable from the first session.", textAr: "أنا متعلم بالغ وكنت متردداً في البدء. المعلمون جعلوني أشعر بالراحة من الجلسة الأولى." },
    ],
  },
  {
    slug: "tajweed-course",
    icon: Moon,
    titleEn: "Tajweed Course Online — Learn Tajweed Rules with Expert Teachers",
    titleAr: "دورة التجويد أونلاين — تعلم أحكام التجويد مع معلمين خبراء",
    descEn: "Learn Tajweed online with certified Al-Azhar teachers in our comprehensive Tajweed course. Master Tajweed rules through one-on-one online Tajweed classes covering Makharij, Sifaat, and all recitation rules. Available for beginners, kids, and adults — our Quran Tajweed classes help you recite the Quran with accuracy and beauty.",
    descAr: "تعلم التجويد أونلاين مع معلمين معتمدين من الأزهر في دورتنا الشاملة. أتقن أحكام التجويد من خلال دروس فردية تغطي المخارج والصفات وجميع أحكام التلاوة. متاح للمبتدئين والأطفال والكبار.",
    objectivesEn: [
      "Understand and apply all Tajweed rules correctly during recitation",
      "Master the articulation points (Makharij) of every Arabic letter",
      "Learn letter characteristics (Sifaat) and how they affect pronunciation",
      "Apply rules of Noon Sakinah, Tanween, Meem Sakinah, and Madd naturally",
      "Prepare for Ijazah certification in Tajweed (advanced track)",
    ],
    objectivesAr: [
      "فهم وتطبيق جميع أحكام التجويد بشكل صحيح أثناء التلاوة",
      "إتقان مخارج كل حرف عربي",
      "تعلم صفات الحروف وكيف تؤثر على النطق",
      "تطبيق أحكام النون الساكنة والتنوين والميم الساكنة والمد بشكل طبيعي",
      "التحضير لشهادة الإجازة في التجويد (المسار المتقدم)",
    ],
    outcomesEn: [
      "Recite the Quran with accurate Tajweed that listeners can notice",
      "Self-correct your own pronunciation mistakes without teacher guidance",
      "Distinguish between similar-sounding Arabic letters with precision",
      "Apply all types of Madd (elongation) correctly and consistently",
      "Master Waqf (stopping) and Ibtidaa (starting) rules for meaningful recitation",
      "Qualify for Ijazah certification after completing the advanced track",
    ],
    outcomesAr: [
      "تلاوة القرآن بتجويد دقيق يلاحظه المستمعون",
      "تصحيح أخطاء النطق بنفسك دون توجيه المعلم",
      "التمييز بين الحروف العربية المتشابهة بدقة",
      "تطبيق جميع أنواع المد بشكل صحيح ومتسق",
      "إتقان قواعد الوقف والابتداء لتلاوة ذات معنى",
      "التأهل لشهادة الإجازة بعد إتمام المسار المتقدم",
    ],
    personalizedPlanEn: [
      "Initial recitation assessment to identify your specific Tajweed gaps",
      "Custom lesson sequence focusing on your weakest areas first",
      "Teacher trains your ear to hear differences before explaining rules — sound before theory",
      "Audio recording practice so you can review and compare your progress",
      "Gradual complexity increase based on your mastery, not a fixed timeline",
      "One-on-one sessions where every mistake is caught and corrected in real-time",
    ],
    personalizedPlanAr: [
      "تقييم تلاوة أولي لتحديد نقاط ضعفك في التجويد",
      "تسلسل دروس مخصص يركز على أضعف نقاطك أولاً",
      "المعلم يدرب أذنك على سماع الفروقات قبل شرح القواعد — الصوت قبل النظرية",
      "تدريب بالتسجيل الصوتي لمراجعة ومقارنة تقدمك",
      "زيادة التعقيد تدريجياً بناءً على إتقانك وليس جدول زمني ثابت",
      "جلسات فردية حيث يُلتقط كل خطأ ويُصحح في الوقت الحقيقي",
    ],
    subCourses: [
      {
        titleEn: "Basic Tajweed",
        titleAr: "التجويد الأساسي",
        descEn: "Learn the fundamental rules of Tajweed including Makharij Al-Huroof (articulation points), Sifaat Al-Huroof (letter characteristics), and the basic rules of Noon Sakinah, Tanween, and Meem Sakinah. This is the essential foundation every Muslim reciter needs.",
        descAr: "تعلم القواعد الأساسية للتجويد بما في ذلك مخارج الحروف وصفات الحروف وأحكام النون الساكنة والتنوين والميم الساكنة.",
        highlightsEn: ["Makharij Al-Huroof", "Noon Sakinah & Tanween rules", "Meem Sakinah rules", "Practical application on Quran"],
        highlightsAr: ["مخارج الحروف", "أحكام النون الساكنة والتنوين", "أحكام الميم الساكنة", "تطبيق عملي على القرآن"],
      },
      {
        titleEn: "Intermediate Tajweed",
        titleAr: "التجويد المتوسط",
        descEn: "Advance your Tajweed knowledge with detailed rules of Madd (elongation), Laam rules, Raa rules, Qalqalah, and Waqf & Ibtidaa (stopping and starting). Includes extensive practice with different Surahs.",
        descAr: "طوّر معرفتك بالتجويد مع أحكام المد التفصيلية وأحكام اللام والراء والقلقلة والوقف والابتداء مع تدريب مكثف.",
        highlightsEn: ["Types of Madd (elongation)", "Laam & Raa rules", "Qalqalah mastery", "Waqf & Ibtidaa"],
        highlightsAr: ["أنواع المد", "أحكام اللام والراء", "إتقان القلقلة", "الوقف والابتداء"],
      },
      {
        titleEn: "Advanced Tajweed",
        titleAr: "التجويد المتقدم",
        descEn: "Master advanced Tajweed concepts and perfect your recitation to the highest standard. This track prepares students for Ijazah with deep analysis of recitation nuances and advanced rules application.",
        descAr: "أتقن مفاهيم التجويد المتقدمة وارتقِ بتلاوتك إلى أعلى مستوى. يُعد هذا المسار الطلاب للإجازة مع تحليل معمق لدقائق التلاوة.",
        highlightsEn: ["Ijazah preparation", "Advanced rules mastery", "Recitation perfection", "Scholar-level Tajweed"],
        highlightsAr: ["تحضير للإجازة", "إتقان القواعد المتقدمة", "إتقان التلاوة", "تجويد على مستوى العلماء"],
      },
      {
        titleEn: "Tajweed for Kids",
        titleAr: "التجويد للأطفال",
        descEn: "Simplified Tajweed rules taught through fun, interactive methods designed for children. Kids learn correct pronunciation through games, repetition, and engaging activities that make Tajweed enjoyable.",
        descAr: "أحكام تجويد مبسطة تُدرَّس بأساليب تفاعلية وممتعة مصممة للأطفال. يتعلم الأطفال النطق الصحيح من خلال الألعاب والتكرار.",
        highlightsEn: ["Game-based learning", "Simplified rules", "Fun pronunciation drills", "Age-appropriate pace"],
        highlightsAr: ["تعلم قائم على الألعاب", "قواعد مبسطة", "تمارين نطق ممتعة", "وتيرة مناسبة للعمر"],
      },
    ],
    featuresEn: ["Step-by-step learning path", "Audio recording practice", "Ijazah preparation track", "Certified Al-Azhar teachers"],
    featuresAr: ["مسار تعلم تدريجي", "تدريب بالتسجيل الصوتي", "مسار تحضير للإجازة", "قراءات متعددة متاحة"],
    faqs: [
      { questionEn: "What are Tajweed rules and why are they important?", questionAr: "ما هي أحكام التجويد ولماذا هي مهمة؟", answerEn: "Tajweed rules are the set of guidelines for reciting the Quran correctly, giving every letter its proper articulation point (Makhraj) and characteristics (Sifaat). Learning Tajweed is obligatory for every Muslim to preserve the meaning of the Quran. Our online Tajweed classes teach these rules systematically from basic to advanced levels.", answerAr: "أحكام التجويد هي مجموعة القواعد لتلاوة القرآن بشكل صحيح، وإعطاء كل حرف مخرجه وصفاته. تعلم التجويد واجب على كل مسلم للحفاظ على معاني القرآن." },
      { questionEn: "How to learn Tajweed online effectively?", questionAr: "كيف أتعلم التجويد أونلاين بفعالية؟", answerEn: "The best way to learn Tajweed online is through one-on-one classes with a certified teacher who can correct your recitation in real-time. At Alhamd Academy, our Tajweed course online uses a sound-before-theory approach — your teacher trains your ear first, then explains the rules. This method, combined with audio recording practice, makes our online Tajweed classes highly effective for both beginners and advanced learners.", answerAr: "أفضل طريقة لتعلم التجويد أونلاين هي من خلال دروس فردية مع معلم معتمد يصحح تلاوتك مباشرة. في أكاديمية الحمد، دورتنا تستخدم منهج الصوت قبل النظرية." },
      { questionEn: "Are Tajweed classes available for kids?", questionAr: "هل دروس التجويد متاحة للأطفال؟", answerEn: "Yes! Our Tajweed classes for kids use fun, interactive methods designed for young learners. Children learn correct Quran pronunciation through games, repetition, and engaging activities. Our Tajweed course for beginners starts with simplified rules that kids can easily grasp and apply during Quran recitation.", answerAr: "نعم! دروس التجويد للأطفال تستخدم أساليب تفاعلية وممتعة مصممة للمتعلمين الصغار. الأطفال يتعلمون النطق الصحيح من خلال الألعاب والتكرار والأنشطة الجذابة." },
      { questionEn: "Can I learn Tajweed without knowing Arabic?", questionAr: "هل يمكنني تعلم التجويد بدون معرفة العربية؟", answerEn: "Yes, you can learn Tajweed online even if you don't speak Arabic. Our Quran Tajweed classes are taught by teachers who explain rules in English and focus on practical application. However, basic Quran reading ability is recommended — if you're a complete beginner, we suggest starting with our Noorani Qaida course first.", answerAr: "نعم، يمكنك تعلم التجويد أونلاين حتى لو لم تتحدث العربية. معلمونا يشرحون القواعد بالإنجليزية ويركزون على التطبيق العملي." },
      { questionEn: "Do you offer a Tajweed course for adults?", questionAr: "هل تقدمون دورة تجويد للكبار؟", answerEn: "Yes, our Tajweed classes for adults are designed for learners of all levels — from those who can read Quran but want to improve their pronunciation, to advanced reciters preparing for Ijazah certification. Each student gets a personalized learning plan with one-on-one sessions from certified Al-Azhar teachers.", answerAr: "نعم، دروس التجويد للكبار مصممة لجميع المستويات — من الذين يقرؤون القرآن ويريدون تحسين نطقهم، إلى المتقدمين المستعدين لشهادة الإجازة." },
      { questionEn: "Will I get a certificate after completing the Tajweed course?", questionAr: "هل سأحصل على شهادة بعد إتمام دورة التجويد؟", answerEn: "Yes, you'll receive a completion certificate for our Tajweed rules course. Advanced students can also pursue an official Ijazah certificate with Sanad (unbroken chain of narration) through our Ijazah program.", answerAr: "نعم، ستحصل على شهادة إتمام لدورة التجويد. الطلاب المتقدمون يمكنهم الحصول على شهادة إجازة رسمية بالسند." },
      { questionEn: "What's the difference between Tajweed and Qiraat?", questionAr: "ما الفرق بين التجويد والقراءات؟", answerEn: "Tajweed is the set of rules for correct Quran pronunciation and recitation. Qiraat are the different authentic ways of reciting the Quran (like Hafs and Warsh), each with its own variations. Our advanced Tajweed track covers multiple Qiraat for students who want to master different recitation styles.", answerAr: "التجويد هو مجموعة قواعد النطق الصحيح والتلاوة. القراءات هي الطرق الأصيلة المختلفة لتلاوة القرآن. مسار التجويد المتقدم يغطي قراءات متعددة." },
    ],
    reviews: [
      { name: "Maryam Johnson", country: "Australia", rating: 5, textEn: "My Tajweed improved dramatically. The teacher identified exactly where I was making mistakes and corrected them patiently.", textAr: "تحسن تجويدي بشكل ملحوظ. المعلم حدد بالضبط أين كنت أخطئ وصححها بصبر." },
      { name: "Omar Siddiqui", country: "UAE", rating: 5, textEn: "The step-by-step approach makes complex Tajweed rules easy to understand. I feel much more confident in my recitation now.", textAr: "المنهج التدريجي يجعل قواعد التجويد المعقدة سهلة الفهم. أشعر بثقة أكبر في تلاوتي الآن." },
      { name: "Sarah Williams", country: "USA", rating: 5, textEn: "As a convert, I was nervous about learning Tajweed. The teacher was so supportive and made every session comfortable.", textAr: "كمسلمة جديدة، كنت متوترة من تعلم التجويد. المعلمة كانت داعمة جداً وجعلت كل جلسة مريحة." },
    ],
  },
  {
    slug: "arabic-course",
    icon: BookOpen,
    titleEn: "Learn Arabic Online — Arabic Language Course for Kids & Adults",
    titleAr: "تعلم العربية أونلاين — دورة اللغة العربية للأطفال والكبار",
    descEn: "Learn Arabic online with native Arab teachers from Egypt. Our Arabic language course online covers everything from Noorani Qaida for beginners to advanced grammar (Nahw & Sarf), conversation skills, and Quranic Arabic. Whether you need Arabic classes for kids, Arabic classes for adults, or want to learn Arabic to understand Quran — our online Arabic tutor will create a personalized plan for you.",
    descAr: "تعلم العربية أونلاين مع معلمين عرب أصليين من مصر. دورتنا تغطي كل شيء من النورانية للمبتدئين إلى القواعد المتقدمة (النحو والصرف) ومهارات المحادثة والعربية القرآنية. سواء كنت تبحث عن دروس عربية للأطفال أو للكبار.",
    objectivesEn: [
      "Build Arabic reading and writing skills from the ground up",
      "Master Arabic grammar (Nahw & Sarf) through practical application",
      "Develop real conversation skills with native Arabic speakers",
      "Understand Quranic Arabic vocabulary and grammar structures",
      "Achieve fluency in Modern Standard Arabic for academic and daily use",
    ],
    objectivesAr: [
      "بناء مهارات القراءة والكتابة العربية من الصفر",
      "إتقان قواعد النحو والصرف من خلال التطبيق العملي",
      "تطوير مهارات المحادثة الحقيقية مع متحدثين عرب أصليين",
      "فهم مفردات وتراكيب القرآن العربية",
      "تحقيق الطلاقة في اللغة العربية الفصحى للاستخدام الأكاديمي واليومي",
    ],
    outcomesEn: [
      "Read Arabic texts fluently including news, books, and Islamic literature",
      "Write Arabic correctly with proper grammar and sentence structure",
      "Hold meaningful conversations in Arabic on everyday topics",
      "Understand Quran verses directly from the Arabic text without translation",
      "Analyze Arabic root words to expand vocabulary rapidly",
      "Pass Arabic proficiency assessments with confidence",
    ],
    outcomesAr: [
      "قراءة النصوص العربية بطلاقة بما في ذلك الأخبار والكتب والأدب الإسلامي",
      "كتابة العربية بشكل صحيح مع قواعد نحوية وبنية جمل سليمة",
      "إجراء محادثات ذات معنى بالعربية في مواضيع يومية",
      "فهم آيات القرآن مباشرة من النص العربي بدون ترجمة",
      "تحليل جذور الكلمات العربية لتوسيع المفردات بسرعة",
      "اجتياز اختبارات الكفاءة العربية بثقة",
    ],
    personalizedPlanEn: [
      "Placement assessment to determine your exact Arabic level across all skills",
      "Custom curriculum — children get gamified lessons; adults get logic-based grammar explanations",
      "Heritage speakers skip alphabet drills and start at their actual level",
      "Teacher adapts vocabulary and examples to your interests and goals (Quranic focus, academic, conversational)",
      "Progress milestones set collaboratively between you and your teacher",
      "Supplementary materials and homework tailored to reinforce your specific weak areas",
    ],
    personalizedPlanAr: [
      "اختبار تحديد مستوى لتحديد مستواك الدقيق في جميع المهارات",
      "منهج مخصص — الأطفال يحصلون على دروس تفاعلية؛ الكبار يحصلون على شرح قواعد منطقي",
      "المتحدثون بالعربية كلغة أم يتخطون تدريبات الأبجدية ويبدأون من مستواهم الفعلي",
      "المعلم يكيف المفردات والأمثلة حسب اهتماماتك وأهدافك (تركيز قرآني، أكاديمي، محادثة)",
      "مراحل تقدم تُحدد بالتعاون بينك وبين معلمك",
      "مواد إضافية وواجبات مصممة لتعزيز نقاط ضعفك المحددة",
    ],
    subCourses: [
      {
        titleEn: "Noorani Qaida Online — Arabic Foundation Course",
        titleAr: "النورانية أونلاين — دورة التأسيس العربي",
        descEn: "Learn Noorani Qaida online with our expert teachers. This essential Noorani Qaida course online serves as the foundation before Quran reading. Students master Arabic letter recognition, short and long vowels, Sukoon, Shaddah, and connected reading through the proven Qaida methodology. Our Noorani Qaida classes online are available for kids and adult beginners — learn Noorani Qaida online with a dedicated teacher at your own pace.",
        descAr: "تعلم النورانية أونلاين مع معلمينا الخبراء. هذه الدورة التأسيسية الأساسية تُعد الأساس قبل قراءة القرآن. يتقن الطلاب التعرف على الحروف العربية والحركات والسكون والشدة والقراءة المتصلة.",
        highlightsEn: ["Learn Noorani Qaida with teacher", "Qaida for beginners (kids & adults)", "Letter recognition & connected reading", "Foundation for Quran reading"],
        highlightsAr: ["تعلم النورانية مع معلم", "النورانية للمبتدئين (أطفال وكبار)", "تعلم الحروف والقراءة المتصلة", "أساس لقراءة القرآن"],
      },
      {
        titleEn: "Arabic for Kids",
        titleAr: "العربية للأطفال",
        descEn: "Fun and engaging Arabic course designed specifically for children aged 4-12. Covers vocabulary building, basic conversation, alphabet mastery, and simple grammar through stories, games, and interactive activities.",
        descAr: "دورة عربية ممتعة وجذابة مصممة خصيصاً للأطفال من 4-12 سنة. تغطي بناء المفردات والمحادثة الأساسية وإتقان الأبجدية والقواعد البسيطة.",
        highlightsEn: ["Interactive games & stories", "Vocabulary building", "Basic conversation skills", "Alphabet mastery"],
        highlightsAr: ["ألعاب وقصص تفاعلية", "بناء المفردات", "مهارات المحادثة الأساسية", "إتقان الأبجدية"],
      },
      {
        titleEn: "Arabic for Adults",
        titleAr: "العربية للكبار",
        descEn: "Comprehensive Arabic program for adults covering Modern Standard Arabic (MSA) with focus on reading, writing, grammar (Nahw & Sarf), and conversation skills. Suitable for beginners through advanced learners.",
        descAr: "برنامج عربي شامل للكبار يغطي اللغة العربية الفصحى مع التركيز على القراءة والكتابة والقواعد (النحو والصرف) ومهارات المحادثة.",
        highlightsEn: ["Modern Standard Arabic", "Nahw & Sarf grammar", "Reading & writing skills", "Conversation practice"],
        highlightsAr: ["اللغة العربية الفصحى", "قواعد النحو والصرف", "مهارات القراءة والكتابة", "تدريب المحادثة"],
      },
      {
        titleEn: "Quranic Arabic",
        titleAr: "العربية القرآنية",
        descEn: "Specialized course focusing on understanding the Arabic of the Quran. Learn Quranic vocabulary, grammar structures used in the Quran, and how to understand the meaning of verses directly from the Arabic text.",
        descAr: "دورة متخصصة تركز على فهم عربية القرآن. تعلم مفردات القرآن والتراكيب النحوية المستخدمة في القرآن وكيفية فهم معاني الآيات مباشرة من النص العربي.",
        highlightsEn: ["Quranic vocabulary", "Grammar in Quran context", "Direct verse understanding", "Root word analysis"],
        highlightsAr: ["مفردات قرآنية", "القواعد في سياق القرآن", "فهم الآيات مباشرة", "تحليل الجذور"],
      },
    ],
    featuresEn: ["Native Arab teachers from Egypt", "Grammar & conversation focus", "All age groups welcome", "Customized curriculum per student"],
    featuresAr: ["معلمون عرب أصليون من مصر", "تركيز على القواعد والمحادثة", "جميع الأعمار مرحب بها", "منهج مخصص لكل طالب"],
    faqs: [
      { questionEn: "How can I learn Arabic online effectively?", questionAr: "كيف أتعلم العربية أونلاين بفعالية؟", answerEn: "The most effective way to learn Arabic online is through one-on-one sessions with a native Arabic tutor online. At Alhamd Academy, our Arabic language course online uses a personalized approach — your teacher adapts vocabulary, grammar, and conversation practice to your goals, whether you want to learn Arabic to understand Quran, for academic purposes, or daily communication.", answerAr: "أفضل طريقة لتعلم العربية أونلاين هي من خلال جلسات فردية مع معلم عربي أصلي. في أكاديمية الحمد، دورتنا تستخدم منهجاً مخصصاً حسب أهدافك." },
      { questionEn: "Are Arabic classes for kids available online?", questionAr: "هل دروس العربية للأطفال متاحة أونلاين؟", answerEn: "Yes! Our Arabic classes for kids online are designed for children aged 4-12. We use interactive games, stories, and engaging activities to make learning Arabic for kids fun and effective. Our Arabic tutor for kids uses age-appropriate methods to build vocabulary, basic conversation, and alphabet mastery.", answerAr: "نعم! دروس العربية للأطفال أونلاين مصممة للأطفال من 4-12 سنة. نستخدم ألعاباً تفاعلية وقصصاً وأنشطة جذابة لجعل تعلم العربية ممتعاً وفعالاً." },
      { questionEn: "What is Noorani Qaida and do I need it before Quran reading?", questionAr: "ما هي النورانية وهل أحتاجها قبل قراءة القرآن؟", answerEn: "Noorani Qaida (Noor Al-Bayan) is the foundational Arabic reading course that teaches letter recognition, vowel marks, and connected reading. It's the essential prerequisite before starting Quran reading. Our Noorani Qaida online course is available for both kids and adult beginners who want to learn Noorani Qaida with a dedicated teacher.", answerAr: "النورانية (نور البيان) هي دورة القراءة العربية التأسيسية التي تعلم التعرف على الحروف والحركات والقراءة المتصلة. هي المتطلب الأساسي قبل بدء قراءة القرآن." },
      { questionEn: "Do you offer Arabic classes for adults with no prior knowledge?", questionAr: "هل تقدمون دروس عربية للكبار بدون معرفة مسبقة؟", answerEn: "Absolutely! Our learn Arabic for beginners track is designed for adults with zero prior knowledge. You'll start from Arabic alphabet recognition and progress through reading, writing, grammar, and conversation with a patient, native Arabic-speaking teacher.", answerAr: "بالتأكيد! مسار تعلم العربية للمبتدئين مصمم للكبار بدون أي معرفة مسبقة. ستبدأ من التعرف على الأبجدية وتتقدم عبر القراءة والكتابة والقواعد والمحادثة." },
      { questionEn: "Can I learn Arabic to understand the Quran?", questionAr: "هل يمكنني تعلم العربية لفهم القرآن؟", answerEn: "Yes! Our Quranic Arabic track is specifically designed for students who want to learn Arabic to understand Quran directly from the Arabic text. You'll study Quranic vocabulary, grammar structures used in the Quran, and root word analysis — enabling you to understand the meaning of verses without relying on translations.", answerAr: "نعم! مسار العربية القرآنية مصمم خصيصاً للطلاب الذين يريدون تعلم العربية لفهم القرآن مباشرة من النص العربي. ستدرس مفردات القرآن والتراكيب النحوية وتحليل الجذور." },
      { questionEn: "What Arabic curriculum and materials do you use?", questionAr: "ما المنهج والمواد العربية التي تستخدمونها؟", answerEn: "We use a combination of established Arabic curricula like Al-Arabiyyah Bayna Yadayk, Noorani Qaida for foundation, and our own curated materials. All materials are adapted to each student's level, age, and learning goals by their dedicated Arabic tutor online.", answerAr: "نستخدم مزيجاً من المناهج العربية المعتمدة مثل العربية بين يديك والنورانية للتأسيس ومواد خاصة بنا، مُكيَّفة لمستوى وعمر وأهداف كل طالب." },
    ],
    reviews: [
      { name: "Khadijah Brown", country: "UK", rating: 5, textEn: "My kids love their Arabic classes! The teacher uses games and songs which makes learning fun. They're already forming sentences.", textAr: "أطفالي يحبون حصص العربية! المعلمة تستخدم الألعاب والأغاني مما يجعل التعلم ممتعاً. بدأوا بالفعل بتكوين الجمل." },
      { name: "Yusuf Ahmad", country: "Germany", rating: 5, textEn: "As a non-Arab Muslim, learning Quranic Arabic opened up a whole new understanding of the Quran for me. Highly recommend this track.", textAr: "كمسلم غير عربي، تعلم العربية القرآنية فتح لي فهماً جديداً تماماً للقرآن. أوصي بشدة بهذا المسار." },
      { name: "Amina Sheikh", country: "Canada", rating: 5, textEn: "The Arabic for Adults course is excellent. The grammar explanations are clear and the conversation practice gives real confidence.", textAr: "دورة العربية للكبار ممتازة. شرح القواعد واضح وتدريب المحادثة يعطي ثقة حقيقية." },
    ],
  },
  {
    slug: "islamic-studies",
    icon: GraduationCap,
    titleEn: "Islamic Studies Online — Learn Islam with Qualified Scholars",
    titleAr: "الدراسات الإسلامية أونلاين — تعلم الإسلام مع علماء مؤهلين",
    descEn: "Enroll in our Islamic studies online course and learn Islam online with qualified scholars. Our Islamic classes online cover Aqeedah, Fiqh, Tafseer, Hadith, Seerah, and Islamic manners. Available as an Islamic studies course for kids, adults, and new Muslims — our Islamic learning program online provides comprehensive Islamic education through one-on-one sessions with certified teachers.",
    descAr: "سجّل في دورة الدراسات الإسلامية أونلاين وتعلم الإسلام مع علماء مؤهلين. دروسنا الإسلامية أونلاين تغطي العقيدة والفقه والتفسير والحديث والسيرة والأدب الإسلامي. متاح للأطفال والكبار والمسلمين الجدد.",
    objectivesEn: [
      "Build a solid foundation of Islamic belief (Aqeedah) based on Quran and Sunnah",
      "Understand practical Fiqh rulings for worship and daily life",
      "Learn the biography of Prophet Muhammad ﷺ and its lessons for today",
      "Study Quran interpretation (Tafseer) to deepen understanding of Allah's words",
      "Develop Islamic character and manners (Adab) in children and adults",
    ],
    objectivesAr: [
      "بناء أساس متين من العقيدة الإسلامية بناءً على القرآن والسنة",
      "فهم أحكام الفقه العملية للعبادات والحياة اليومية",
      "تعلم سيرة النبي محمد ﷺ ودروسها لليوم",
      "دراسة تفسير القرآن لتعميق فهم كلام الله",
      "تطوير الأخلاق والآداب الإسلامية لدى الأطفال والكبار",
    ],
    outcomesEn: [
      "Perform all acts of worship (Salah, Wudu, Fasting, etc.) correctly and confidently",
      "Explain core Islamic beliefs clearly to others",
      "Apply Islamic ethics and manners in daily interactions",
      "Understand the context and meaning of Quran verses through Tafseer",
      "Connect with the Prophet's ﷺ life and draw applicable lessons",
      "Feel confident answering common questions about Islam",
    ],
    outcomesAr: [
      "أداء جميع العبادات (الصلاة، الوضوء، الصيام، إلخ) بشكل صحيح وبثقة",
      "شرح العقائد الإسلامية الأساسية بوضوح للآخرين",
      "تطبيق الأخلاق والآداب الإسلامية في التعاملات اليومية",
      "فهم سياق ومعاني آيات القرآن من خلال التفسير",
      "التواصل مع حياة النبي ﷺ واستخلاص الدروس التطبيقية",
      "الشعور بالثقة في الإجابة على الأسئلة الشائعة حول الإسلام",
    ],
    personalizedPlanEn: [
      "Initial consultation to understand your Islamic knowledge background and priorities",
      "Customized syllabus — new Muslims start with essentials; born Muslims can dive into advanced topics",
      "Age-appropriate delivery — kids learn through stories and activities; adults through discussion and analysis",
      "Topics sequenced based on what's most relevant to your life right now",
      "Teacher adjusts depth and pace based on your questions and engagement",
      "Family coordination available — parents and children can study complementary topics",
    ],
    personalizedPlanAr: [
      "استشارة أولية لفهم خلفيتك في المعرفة الإسلامية وأولوياتك",
      "منهج مخصص — المسلمون الجدد يبدأون بالأساسيات؛ المسلمون بالولادة يمكنهم الغوص في مواضيع متقدمة",
      "طريقة تقديم مناسبة للعمر — الأطفال يتعلمون من خلال القصص والأنشطة؛ الكبار من خلال النقاش والتحليل",
      "ترتيب المواضيع بناءً على ما هو أكثر صلة بحياتك الآن",
      "المعلم يعدّل العمق والوتيرة بناءً على أسئلتك وتفاعلك",
      "تنسيق عائلي متاح — الآباء والأطفال يمكنهم دراسة مواضيع متكاملة",
    ],
    subCourses: [
      {
        titleEn: "Islamic Essentials for Kids",
        titleAr: "الأساسيات الإسلامية للأطفال",
        descEn: "Everything a Muslim child needs to know — the five pillars of Islam, pillars of faith, daily Duas, Wudu and Salah practice, stories of the Prophets, and Islamic manners (Adab). Taught in a fun, age-appropriate way.",
        descAr: "كل ما يحتاج طفل مسلم معرفته — أركان الإسلام الخمسة وأركان الإيمان والأدعية اليومية وتعلم الوضوء والصلاة وقصص الأنبياء والأدب الإسلامي.",
        highlightsEn: ["Five Pillars of Islam", "Daily Duas & Adhkar", "Wudu & Salah training", "Stories of the Prophets"],
        highlightsAr: ["أركان الإسلام الخمسة", "الأدعية والأذكار اليومية", "تعلم الوضوء والصلاة", "قصص الأنبياء"],
      },
      {
        titleEn: "Fiqh & Aqeedah",
        titleAr: "الفقه والعقيدة",
        descEn: "Study Islamic jurisprudence (Fiqh) covering worship, transactions, and daily life rulings, alongside Islamic creed (Aqeedah) to build a solid foundation of belief based on Quran and Sunnah.",
        descAr: "دراسة الفقه الإسلامي بما يشمل العبادات والمعاملات وأحكام الحياة اليومية، إلى جانب العقيدة الإسلامية لبناء أساس متين من الإيمان.",
        highlightsEn: ["Worship rulings (Ibadat)", "Daily life Fiqh", "Aqeedah from Quran & Sunnah", "Practical application"],
        highlightsAr: ["أحكام العبادات", "فقه الحياة اليومية", "عقيدة من القرآن والسنة", "تطبيق عملي"],
      },
      {
        titleEn: "Tafseer, Hadith & Seerah",
        titleAr: "التفسير والحديث والسيرة",
        descEn: "Deep dive into Quran interpretation (Tafseer), study of Prophetic traditions (Hadith) and their application, and the comprehensive biography of Prophet Muhammad ﷺ (Seerah) to understand Islam in its full context.",
        descAr: "دراسة معمقة في تفسير القرآن والحديث النبوي وتطبيقاته والسيرة النبوية الشاملة لفهم الإسلام في سياقه الكامل.",
        highlightsEn: ["Quran Tafseer studies", "Hadith sciences basics", "Complete Seerah coverage", "Contextual understanding"],
        highlightsAr: ["دراسات التفسير", "أساسيات علوم الحديث", "تغطية شاملة للسيرة", "فهم سياقي"],
      },
      {
        titleEn: "New Muslim Program",
        titleAr: "برنامج المسلمين الجدد",
        descEn: "A welcoming, supportive program for those who have recently embraced Islam. Covers the essentials of Islamic belief, how to pray, basic Arabic for worship, and answering common questions in a safe, non-judgmental environment.",
        descAr: "برنامج ترحيبي وداعم لمن اعتنقوا الإسلام حديثاً. يغطي أساسيات العقيدة الإسلامية وكيفية الصلاة والعربية الأساسية للعبادة.",
        highlightsEn: ["Core beliefs explained simply", "How to pray step-by-step", "Basic Arabic for worship", "Safe & supportive environment"],
        highlightsAr: ["العقائد الأساسية بشكل مبسط", "كيفية الصلاة خطوة بخطوة", "عربية أساسية للعبادة", "بيئة آمنة وداعمة"],
      },
    ],
    featuresEn: ["Qualified Islamic scholars", "Age-appropriate content", "Interactive learning methods", "Certificate upon completion"],
    featuresAr: ["علماء إسلاميون مؤهلون", "محتوى مناسب للعمر", "أساليب تعلم تفاعلية", "شهادة عند الإتمام"],
    faqs: [
      { questionEn: "What topics are covered in your Islamic studies online course?", questionAr: "ما المواضيع التي تُغطى في دورة الدراسات الإسلامية أونلاين؟", answerEn: "Our Islamic studies course covers Aqeedah (Islamic creed), Fiqh (jurisprudence), Tafseer (Quran interpretation), Hadith sciences, Seerah (Prophet's biography), Islamic history, and Islamic manners. Each topic is taught through structured Islamic classes online with qualified scholars.", answerAr: "دورة الدراسات الإسلامية تغطي العقيدة والفقه والتفسير وعلوم الحديث والسيرة النبوية والتاريخ الإسلامي والأدب الإسلامي. كل موضوع يُدرَّس من خلال دروس إسلامية منظمة مع علماء مؤهلين." },
      { questionEn: "Are Islamic studies for kids available online?", questionAr: "هل الدراسات الإسلامية للأطفال متاحة أونلاين؟", answerEn: "Yes! Our Islamic studies for kids online track is designed for children from age 5. It covers the five pillars of Islam, daily Duas, Wudu and Salah practice, stories of the Prophets, and Islamic manners — all taught through fun, interactive Islamic classes for beginners using age-appropriate methods.", answerAr: "نعم! مسار الدراسات الإسلامية للأطفال أونلاين مصمم للأطفال من سن 5 سنوات. يغطي أركان الإسلام الخمسة والأدعية والوضوء والصلاة وقصص الأنبياء." },
      { questionEn: "Is your Islamic learning program suitable for new Muslims?", questionAr: "هل برنامجكم الإسلامي مناسب للمسلمين الجدد؟", answerEn: "Absolutely! We have a dedicated New Muslim Program within our Islamic learning program online. It covers Islamic essentials in a welcoming, patient environment — including core beliefs, how to pray step-by-step, basic Arabic for worship, and answering common questions about Islam. No prior knowledge is needed.", answerAr: "بالتأكيد! لدينا برنامج مخصص للمسلمين الجدد ضمن برنامجنا التعليمي الإسلامي. يغطي الأساسيات في بيئة ترحيبية وصبورة." },
      { questionEn: "How can I learn Islam online effectively?", questionAr: "كيف أتعلم الإسلام أونلاين بفعالية؟", answerEn: "The best way to learn Islam online is through structured one-on-one Islamic classes online with a qualified teacher. At Alhamd Academy, our Islamic studies online program combines theoretical knowledge with practical application — students don't just learn rules, they understand the wisdom behind them and apply them in daily life.", answerAr: "أفضل طريقة لتعلم الإسلام أونلاين هي من خلال دروس إسلامية منظمة مع معلم مؤهل. في أكاديمية الحمد، نجمع بين المعرفة النظرية والتطبيق العملي." },
      { questionEn: "Do you teach a specific Islamic school of thought (Madhab)?", questionAr: "هل تُدرّسون مذهباً إسلامياً محدداً؟", answerEn: "We teach mainstream Sunni Islam based on Quran and Sunnah in our Islamic studies course. When covering Fiqh, we present the views of the four major Madhabs so students can follow their preferred school of thought with full understanding.", answerAr: "نُدرّس الإسلام السني المعتدل بناءً على القرآن والسنة. عند تغطية الفقه، نعرض آراء المذاهب الأربعة الرئيسية." },
      { questionEn: "Is the Islamic classes online course only theoretical?", questionAr: "هل دروس الإسلام أونلاين نظرية فقط؟", answerEn: "Not at all. Our Islamic studies online program emphasizes practical application — students learn how to pray correctly, make Wudu, apply Islamic manners in daily life, and understand the wisdom behind Islamic rulings through hands-on practice in every session.", answerAr: "لا على الإطلاق. نركز على التطبيق العملي — يتعلم الطلاب الصلاة الصحيحة والوضوء وتطبيق الأدب الإسلامي." },
    ],
    reviews: [
      { name: "Aisha Rahman", country: "USA", rating: 5, textEn: "My children love their Islamic Studies classes. They come out excited telling us about the Prophets' stories and showing us how to make Dua.", textAr: "أطفالي يحبون حصص الدراسات الإسلامية. يخرجون متحمسين يخبروننا عن قصص الأنبياء ويُرُوننا كيفية الدعاء." },
      { name: "James (Yaqoob) Miller", country: "UK", rating: 5, textEn: "As a new Muslim, this program was exactly what I needed. The teacher was patient, answered all my questions, and made me feel welcome.", textAr: "كمسلم جديد، هذا البرنامج كان بالضبط ما احتجته. المعلم كان صبوراً وأجاب على كل أسئلتي وجعلني أشعر بالترحيب." },
      { name: "Noor Al-Din", country: "France", rating: 5, textEn: "The Fiqh classes are excellent. I finally understand the reasoning behind Islamic rulings, not just the rules themselves.", textAr: "حصص الفقه ممتازة. أخيراً أفهم الحكمة وراء الأحكام الإسلامية وليس فقط القواعد نفسها." },
    ],
  },
  {
    slug: "all-in-one-course",
    icon: Sparkles,
    titleEn: "All-in-One Islamic Course — Quran, Arabic & Islamic Studies Combined",
    titleAr: "الدورة الشاملة — القرآن والعربية والدراسات الإسلامية معاً",
    descEn: "Get the complete Islamic education experience with our All-in-One course. Combine online Quran classes, Tajweed rules, Arabic language learning, and Islamic studies in one customized plan. Perfect for families and individuals who want to learn Quran online alongside Arabic and Islamic knowledge — all with a dedicated online Quran teacher from Al-Azhar University.",
    descAr: "احصل على تجربة التعليم الإسلامي الكاملة مع دورتنا الشاملة. اجمع بين دروس القرآن أونلاين وأحكام التجويد وتعلم اللغة العربية والدراسات الإسلامية في خطة واحدة مخصصة.",
    objectivesEn: [
      "Combine Quran, Tajweed, Arabic, and Islamic Studies in one unified plan",
      "Address multiple learning goals simultaneously without feeling overwhelmed",
      "Create a balanced learning experience that covers all aspects of Islamic education",
      "Provide families with a coordinated learning plan for all members",
      "Offer maximum flexibility for busy schedules and diverse learning needs",
    ],
    objectivesAr: [
      "الجمع بين القرآن والتجويد والعربية والدراسات الإسلامية في خطة موحدة",
      "تحقيق أهداف تعلم متعددة في وقت واحد دون الشعور بالإرهاق",
      "توفير تجربة تعلم متوازنة تغطي جميع جوانب التعليم الإسلامي",
      "تقديم خطة تعلم منسقة لجميع أفراد العائلة",
      "تقديم أقصى مرونة للجداول المزدحمة واحتياجات التعلم المتنوعة",
    ],
    outcomesEn: [
      "Build well-rounded Islamic knowledge across multiple disciplines",
      "Read Quran with Tajweed while understanding Arabic vocabulary",
      "Gain practical Islamic knowledge applicable to daily life",
      "Achieve specific goals you set at the beginning of your journey",
      "Develop consistent learning habits through structured weekly plans",
      "Unite your family's Islamic education under one coordinated program",
    ],
    outcomesAr: [
      "بناء معرفة إسلامية شاملة عبر تخصصات متعددة",
      "قراءة القرآن بالتجويد مع فهم المفردات العربية",
      "اكتساب معرفة إسلامية عملية قابلة للتطبيق في الحياة اليومية",
      "تحقيق أهداف محددة وضعتها في بداية رحلتك",
      "تطوير عادات تعلم مستمرة من خلال خطط أسبوعية منظمة",
      "توحيد التعليم الإسلامي لعائلتك تحت برنامج واحد منسق",
    ],
    personalizedPlanEn: [
      "Comprehensive free assessment covering all subjects to identify priorities",
      "Your teacher designs a unique roadmap based on your age, background, goals, and learning style",
      "Subject mix adjusted dynamically — spend more time on areas you find challenging",
      "Regular check-ins to review progress and adjust the plan as your goals evolve",
      "Family members each get individual tracks while sharing a coordinated schedule",
      "Homework and practice materials balanced across all subjects in your plan",
    ],
    personalizedPlanAr: [
      "تقييم شامل مجاني يغطي جميع المواد لتحديد الأولويات",
      "معلمك يصمم خريطة طريق فريدة بناءً على عمرك وخلفيتك وأهدافك وأسلوب تعلمك",
      "مزيج المواد يُعدَّل بشكل ديناميكي — تقضي وقتاً أطول في المجالات التي تجدها صعبة",
      "مراجعات منتظمة لتقييم التقدم وتعديل الخطة مع تطور أهدافك",
      "كل فرد من العائلة يحصل على مسار فردي مع مشاركة جدول منسق",
      "واجبات ومواد تدريب متوازنة عبر جميع المواد في خطتك",
    ],
    subCourses: [
      {
        titleEn: "Customized Learning Plan",
        titleAr: "خطة تعلم مخصصة",
        descEn: "A personalized course that combines Quran, Tajweed, Arabic, and Islamic Studies based on your specific goals. Your teacher designs a unique curriculum that covers exactly what you need, at your pace.",
        descAr: "دورة مخصصة تجمع بين القرآن والتجويد والعربية والدراسات الإسلامية بناءً على أهدافك المحددة. يصمم معلمك منهجاً فريداً يغطي بالضبط ما تحتاجه بالوتيرة المناسبة.",
        highlightsEn: ["Tailored to your goals", "Mix & match subjects", "Flexible pacing", "Regular progress reviews"],
        highlightsAr: ["مصمم وفقاً لأهدافك", "مزج المواد حسب الرغبة", "وتيرة مرنة", "مراجعات تقدم منتظمة"],
      },
      {
        titleEn: "Family Package",
        titleAr: "الباقة العائلية",
        descEn: "Enroll multiple family members with a coordinated learning plan. Parents and children can each have their own customized track while benefiting from family scheduling and unified progress tracking.",
        descAr: "سجل عدة أفراد من العائلة مع خطة تعلم منسقة. يمكن للآباء والأطفال كل منهم أن يكون له مساره المخصص مع الاستفادة من الجدولة العائلية.",
        highlightsEn: ["Multiple family members", "Coordinated scheduling", "Individual tracks per member", "Unified progress reports"],
        highlightsAr: ["أفراد عائلة متعددون", "جدولة منسقة", "مسارات فردية لكل فرد", "تقارير تقدم موحدة"],
      },
      {
        titleEn: "Weekend Intensive",
        titleAr: "المكثفة في عطلة الأسبوع",
        descEn: "For busy professionals and students who can only dedicate weekends. Longer sessions on Saturdays and Sundays covering a combination of subjects with homework for the week.",
        descAr: "للمحترفين والطلاب المشغولين الذين يمكنهم تخصيص عطلات نهاية الأسبوع فقط. جلسات أطول في السبت والأحد تغطي مزيجاً من المواد مع واجبات للأسبوع.",
        highlightsEn: ["Weekend-only schedule", "Longer focused sessions", "Weekly homework assignments", "Perfect for busy schedules"],
        highlightsAr: ["جدول عطلة نهاية الأسبوع فقط", "جلسات مركزة أطول", "واجبات أسبوعية", "مثالي للجداول المزدحمة"],
      },
    ],
    featuresEn: ["Fully personalized curriculum", "Dedicated mentor guidance", "Flexible subject combination", "Comprehensive progress tracking"],
    featuresAr: ["منهج مخصص بالكامل", "إرشاد مرشد مخصص", "مزيج مرن من المواد", "تتبع تقدم شامل"],
    faqs: [
      { questionEn: "How does the All-in-One course work?", questionAr: "كيف تعمل الدورة الشاملة؟", answerEn: "After a free assessment, we design a customized plan combining the subjects you need most. Your teacher follows this plan while adjusting based on your progress and feedback.", answerAr: "بعد تقييم مجاني، نصمم خطة مخصصة تجمع بين المواد التي تحتاجها أكثر. يتبع معلمك هذه الخطة مع التعديل بناءً على تقدمك وملاحظاتك." },
      { questionEn: "Can I change the subjects mid-course?", questionAr: "هل يمكنني تغيير المواد أثناء الدورة؟", answerEn: "Absolutely! The beauty of the All-in-One course is its flexibility. You can adjust the subject mix at any time based on your evolving needs and interests.", answerAr: "بالتأكيد! جمال الدورة الشاملة هو مرونتها. يمكنك تعديل مزيج المواد في أي وقت بناءً على احتياجاتك واهتماماتك المتطورة." },
      { questionEn: "Is the Family Package more affordable?", questionAr: "هل الباقة العائلية أقل تكلفة؟", answerEn: "Yes, the Family Package offers better value per person compared to individual enrollments. Contact us for a custom quote based on your family size and needs.", answerAr: "نعم، الباقة العائلية تقدم قيمة أفضل للشخص مقارنة بالتسجيل الفردي. تواصل معنا للحصول على عرض مخصص بناءً على حجم عائلتك واحتياجاتها." },
      { questionEn: "What if I'm not sure what I need?", questionAr: "ماذا لو لم أكن متأكداً مما أحتاج؟", answerEn: "That's perfectly fine! Book a free trial and our teacher will assess your current level, discuss your goals, and recommend the best combination of subjects for you.", answerAr: "هذا طبيعي تماماً! احجز تجربة مجانية وسيقيم معلمنا مستواك الحالي ويناقش أهدافك ويوصي بأفضل مزيج من المواد لك." },
      { questionEn: "Can I have different teachers for different subjects?", questionAr: "هل يمكن أن يكون لدي معلمون مختلفون لمواد مختلفة؟", answerEn: "Usually one teacher covers your entire All-in-One plan for consistency. However, for specialized tracks like Ijazah, we may assign a specialist teacher.", answerAr: "عادة معلم واحد يغطي خطتك الشاملة بالكامل للاتساق. لكن للمسارات المتخصصة مثل الإجازة، قد نعين معلماً متخصصاً." },
    ],
    reviews: [
      { name: "Hamza Patel", country: "UK", rating: 5, textEn: "The All-in-One course was perfect for our family. My wife and I study Arabic while our kids learn Quran — all coordinated with one schedule.", textAr: "الدورة الشاملة كانت مثالية لعائلتنا. زوجتي وأنا ندرس العربية بينما أطفالنا يتعلمون القرآن — كل شيء منسق بجدول واحد." },
      { name: "Zainab Mohammed", country: "Nigeria", rating: 5, textEn: "I wanted to learn Quran, Tajweed and some Arabic all together. The customized plan made it possible without feeling overwhelmed.", textAr: "أردت تعلم القرآن والتجويد وبعض العربية معاً. الخطة المخصصة جعلت ذلك ممكناً بدون الشعور بالإرهاق." },
      { name: "Ali Kareem", country: "USA", rating: 5, textEn: "The weekend intensive works perfectly with my busy work schedule. I get quality learning on Saturdays and Sundays with clear goals for the week.", textAr: "المكثفة في عطلة الأسبوع تعمل بشكل مثالي مع جدول عملي المزدحم. أحصل على تعلم جيد في السبت والأحد مع أهداف واضحة للأسبوع." },
    ],
  },
];
