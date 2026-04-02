import { BookOpen, Baby, GraduationCap, RefreshCw, Globe, Heart } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن", href: "/online-quran-classes" },
  { titleEn: "Quran Classes for Adults", titleAr: "للبالغين", href: "/quran-classes-for-adults" },
  { titleEn: "Quran Classes for Kids", titleAr: "للأطفال", href: "/quran-classes-for-kids" },
  { titleEn: "Tajweed Course", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Quran Classes Pricing", titleAr: "الأسعار", href: "/quran-classes-pricing" },
  { titleEn: "Free Trial", titleAr: "تجربة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Children Starting Their First Quran Class",
    titleAr: "أطفال يبدأون أول حصة قرآن",
    descEn: "Your child has never read Arabic before and you want them to start from the very beginning with a patient, qualified teacher. Our beginner program for kids uses songs, games, and visual aids to make the first steps exciting.",
    descAr: "طفلك لم يقرأ العربية من قبل وتريد أن يبدأ من البداية مع معلم صبور ومؤهل. برنامجنا للمبتدئين يستخدم أناشيد وألعاب ووسائل بصرية.",
  },
  {
    icon: GraduationCap,
    titleEn: "Adults Who Never Learned to Read Arabic",
    titleAr: "بالغون لم يتعلموا قراءة العربية أبداً",
    descEn: "You grew up without formal Quran education, or you're a revert Muslim. Starting as an adult feels daunting, but our beginner program is specifically designed for adult learners with zero prior knowledge. No judgment, just patient teaching.",
    descAr: "نشأت بدون تعليم قرآن رسمي أو أنت مسلم جديد. البدء كبالغ يبدو مخيفاً، لكن برنامج المبتدئين مصمم خصيصاً للبالغين بدون معرفة سابقة.",
  },
  {
    icon: RefreshCw,
    titleEn: "Returners Who Forgot What They Learned",
    titleAr: "عائدون نسوا ما تعلموه",
    descEn: "You learned some Arabic or Quran years ago but have forgotten most of it. Our assessment identifies exactly what you retain and rebuilds from there — no need to start completely from scratch.",
    descAr: "تعلمت بعض العربية أو القرآن قبل سنوات لكنك نسيت معظمه. تقييمنا يحدد بالضبط ما تتذكره ويعيد البناء من هناك — لا حاجة للبدء من الصفر تماماً.",
  },
  {
    icon: Globe,
    titleEn: "Non-Arabic Speaking Families",
    titleAr: "عائلات لا تتحدث العربية",
    descEn: "Your family doesn't speak Arabic at home and you worry about learning barriers. Our Noor Al-Bayan method is specifically designed for non-Arabic speakers — it teaches reading through phonetic recognition, not language understanding.",
    descAr: "عائلتك لا تتحدث العربية في البيت وأنت قلق بشأن حواجز التعلم. طريقة نور البيان مصممة خصيصاً لغير الناطقين بالعربية — تعلم القراءة من خلال التعرف الصوتي.",
  },
  {
    icon: Heart,
    titleEn: "Revert Muslims Embracing the Quran",
    titleAr: "مسلمون جدد يعتنقون القرآن",
    descEn: "You've accepted Islam and want to connect with the Quran. Our teachers have extensive experience with revert students and approach teaching with extra cultural sensitivity, patience, and understanding of your unique journey.",
    descAr: "اعتنقت الإسلام وتريد التواصل مع القرآن. معلمونا لديهم خبرة واسعة مع المسلمين الجدد ويدرّسون بحساسية ثقافية وصبر وفهم لرحلتك الفريدة.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Assessment & Level Check",
    titleAr: "تقييم وفحص المستوى",
    descEn: "Your first class begins with a friendly assessment — not a test. The teacher determines your starting point: Do you recognize any Arabic letters? Can you distinguish between similar sounds? This ensures your learning plan starts exactly where you need it.",
    descAr: "حصتك الأولى تبدأ بتقييم ودي — ليس اختباراً. المعلم يحدد نقطة بدايتك: هل تعرف أي حروف عربية؟ هذا يضمن أن خطة تعلمك تبدأ من حيث تحتاج.",
  },
  {
    titleEn: "Arabic Letter Introduction",
    titleAr: "تقديم الحروف العربية",
    descEn: "Letters are introduced 3–5 at a time using visual flashcards and audio repetition. The teacher demonstrates the exact mouth position for each sound, and you practice until the pronunciation feels natural. No rushing — we move at your pace.",
    descAr: "تُقدم الحروف 3–5 في كل مرة باستخدام بطاقات بصرية وتكرار صوتي. المعلم يوضح وضع الفم الدقيق لكل صوت وتتدرب حتى يصبح النطق طبيعياً. بدون استعجال.",
  },
  {
    titleEn: "Guided Practice",
    titleAr: "تدريب موجّه",
    descEn: "You practice reading letter combinations, simple words, and eventually short phrases. The teacher guides you through each step, correcting gently and praising progress. Interactive whiteboards make practice visual and engaging.",
    descAr: "تتدرب على قراءة مجموعات الحروف والكلمات البسيطة وأخيراً العبارات القصيرة. المعلم يرشدك خلال كل خطوة ويصحح بلطف ويثني على التقدم.",
  },
  {
    titleEn: "Clear Homework Assignment",
    titleAr: "واجب واضح",
    descEn: "Each class ends with specific, achievable practice tasks. For beginners, this might be: 'Practice pronouncing these 5 letters 10 times each.' The tasks are designed to be completed in 10–15 minutes daily to build consistent study habits.",
    descAr: "كل حصة تنتهي بمهام تدريب محددة وقابلة للتحقيق. للمبتدئين، قد يكون: 'تدرب على نطق هذه الحروف الـ 5 عشر مرات كل منها.' المهام مصممة لتُكمل في 10–15 دقيقة يومياً.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "\"I don't know a single Arabic letter — is it too late?\"",
    problemAr: "\"لا أعرف حرفاً عربياً واحداً — هل فات الأوان؟\"",
    solutionEn: "It's never too late, and knowing zero Arabic is exactly where most of our beginner students start. The Noor Al-Bayan method begins with individual letter sounds — no prior knowledge needed. We've helped students from age 4 to age 65 go from zero to reading Quran.",
    solutionAr: "لم يفت الأوان أبداً، ومعرفة صفر عربية هي تماماً من حيث يبدأ معظم طلابنا المبتدئين. طريقة نور البيان تبدأ بأصوات الحروف الفردية — لا حاجة لمعرفة سابقة.",
  },
  {
    problemEn: "\"I'm afraid I'll be too slow and waste the teacher's time\"",
    problemAr: "\"أخاف أن أكون بطيئاً وأضيع وقت المعلم\"",
    solutionEn: "Our teachers are specifically selected for their patience with beginners. They've taught hundreds of students who started from zero. There is no 'too slow' — every student has their own natural pace, and your teacher adapts entirely to yours.",
    solutionAr: "معلمونا مختارون خصيصاً لصبرهم مع المبتدئين. درّسوا مئات الطلاب الذين بدأوا من الصفر. لا يوجد 'بطيء جداً' — كل طالب له سرعته الطبيعية ومعلمك يتكيف تماماً معك.",
  },
  {
    problemEn: "\"How long until I can actually read the Quran?\"",
    problemAr: "\"كم من الوقت حتى أستطيع فعلاً قراءة القرآن؟\"",
    solutionEn: "With 3–5 sessions per week, most beginners complete the Noorani Qaida in 2–4 months and start reading from the Mushaf. Within 6–8 months, most students can read Quran independently with basic Tajweed. Your exact timeline depends on your practice consistency.",
    solutionAr: "مع 3–5 حصص أسبوعياً، معظم المبتدئين يكملون القاعدة النورانية في 2–4 أشهر ويبدأون القراءة من المصحف. خلال 6–8 أشهر، معظم الطلاب يقرأون القرآن بشكل مستقل مع تجويد أساسي.",
  },
];

const CURRICULUM: CurriculumWeek[] = [
  {
    weekEn: "Stage 1 (Weeks 1–4)",
    weekAr: "المرحلة 1 (الأسابيع 1–4)",
    topicEn: "Arabic Alphabet Mastery",
    topicAr: "إتقان الحروف العربية",
    detailsEn: ["All 28 Arabic letters with correct pronunciation", "Short vowels (Fatha, Kasra, Damma)", "Letter forms in different positions", "Two-letter word reading"],
    detailsAr: ["جميع الحروف الـ 28 بالنطق الصحيح", "الحركات القصيرة (الفتحة، الكسرة، الضمة)", "أشكال الحروف في المواضع المختلفة", "قراءة كلمات من حرفين"],
  },
  {
    weekEn: "Stage 2 (Weeks 5–10)",
    weekAr: "المرحلة 2 (الأسابيع 5–10)",
    topicEn: "Word Building & Noorani Qaida Completion",
    topicAr: "بناء الكلمات وإكمال القاعدة النورانية",
    detailsEn: ["Tanween, Shaddah, Sukoon", "Madd letters and elongation", "Multi-syllable words", "Completion of Noorani Qaida"],
    detailsAr: ["التنوين والشدة والسكون", "حروف المد والإطالة", "كلمات متعددة المقاطع", "إكمال القاعدة النورانية"],
  },
  {
    weekEn: "Stage 3 (Weeks 11–20)",
    weekAr: "المرحلة 3 (الأسابيع 11–20)",
    topicEn: "Transition to Mushaf Reading",
    topicAr: "الانتقال لقراءة المصحف",
    detailsEn: ["Reading from the actual Quran", "Short Surah reading and memorization", "Basic Tajweed rules introduced naturally", "Building reading fluency"],
    detailsAr: ["القراءة من القرآن الفعلي", "قراءة وحفظ سور قصيرة", "تقديم أحكام التجويد الأساسية بشكل طبيعي", "بناء طلاقة القراءة"],
  },
  {
    weekEn: "Stage 4 (Weeks 21+)",
    weekAr: "المرحلة 4 (الأسابيع 21+)",
    topicEn: "Independent Reading & Next Steps",
    topicAr: "القراءة المستقلة والخطوات التالية",
    detailsEn: ["Independent Quran reading with Tajweed", "Choosing next path: Tajweed mastery, Hifz, or Ijazah", "Advanced Tajweed rules", "Continuous improvement and fluency"],
    detailsAr: ["قراءة القرآن المستقلة بالتجويد", "اختيار المسار التالي: إتقان التجويد أو الحفظ أو الإجازة", "أحكام التجويد المتقدمة", "التحسن المستمر والطلاقة"],
  },
];

const QuranClassesForBeginners = () => (
  <ServicePageLayout
    seoTitle="Quran Classes for Beginners | Learn Quran from Scratch | Alhamd Academy"
    seoDescription="Start your Quran journey from zero. Beginner-friendly online Quran classes with patient certified teachers. No prior Arabic knowledge needed. Kids & adults. Free trial."
    seoKeywords="quran classes for beginners, best quran course online for beginners, quran classes for beginners adults, learn quran from scratch, quran for beginners online, beginner quran classes, quran reading for beginners, learn quran online for beginners, noorani qaida online, quran classes for beginners near me"
    canonical="https://alhamdacademy.net/quran-classes-for-beginners"
    heroTitleEn="Quran Classes for Beginners — Start from Zero with Confidence"
    heroTitleAr="حصص قرآن للمبتدئين — ابدأ من الصفر بثقة"
    heroSubtitleEn="Patient Teachers · Step-by-Step Progress · No Prior Knowledge Needed"
    heroSubtitleAr="معلمون صبورون · تقدم تدريجي · لا حاجة لمعرفة سابقة"
    heroDescEn="Never read Arabic before? Starting Quran as a complete beginner? You're in the right place. Our beginner program takes you from zero — from the very first Arabic letter — to reading Quran fluently. Patient, certified teachers guide you every step of the way."
    heroDescAr="لم تقرأ العربية من قبل؟ تبدأ القرآن كمبتدئ تماماً؟ أنت في المكان الصحيح. برنامج المبتدئين يأخذك من الصفر — من أول حرف عربي — إلى قراءة القرآن بطلاقة."
    aboutTitleEn="Your Complete Beginner's Roadmap to Reading Quran"
    aboutTitleAr="خريطة طريقك الشاملة كمبتدئ لقراءة القرآن"
    aboutContentEn={[
      "Starting to learn Quran as a complete beginner is one of the most courageous and rewarding decisions you can make. Whether you're a child, a teenager, an adult, or a revert Muslim, the journey from the Arabic alphabet to reading Quran is achievable — and it's shorter than you think.",
      "At Alhamd Academy, we specialize in beginner students. More than 60% of our students started with zero Arabic reading ability. Our teachers are not just Quran experts — they are trained specifically in teaching beginners, with the extra patience, encouragement, and creative techniques needed for first-time learners.",
      "The Noor Al-Bayan (Noorani Qaida) method we use is widely recognized as the most effective approach for teaching Quran reading from scratch. It takes a systematic, phonetic approach: you learn individual letter sounds first, then how letters connect, then words, then sentences, and finally full Quranic verses. Each step builds confidently on the previous one.",
      "One of the biggest advantages of our beginner program is that it works for non-Arabic speakers. You don't need to understand Arabic as a language to learn to read the Quran. Our method teaches you to recognize and produce Arabic sounds accurately — the same way children learn to read in any language.",
      "With consistent practice (3–5 sessions per week), most beginners complete the Noorani Qaida foundation in 2–4 months and begin reading directly from the Mushaf. Within 6–8 months, you'll be reading Quran independently with basic Tajweed rules applied naturally.",
    ]}
    aboutContentAr={[
      "البدء في تعلم القرآن كمبتدئ تماماً من أكثر القرارات شجاعة وإثمارًا. سواء كنت طفلاً أو مراهقاً أو بالغاً أو مسلماً جديداً، الرحلة من الحروف إلى القراءة ممكنة — وأقصر مما تظن.",
      "في أكاديمية الحمد، نتخصص في الطلاب المبتدئين. أكثر من 60% من طلابنا بدأوا بدون قدرة قراءة عربية. معلمونا مدربون خصيصاً على تعليم المبتدئين بصبر إضافي وتشجيع.",
      "طريقة نور البيان (القاعدة النورانية) معروفة بأنها الأكثر فعالية لتعليم قراءة القرآن من الصفر. تأخذ نهجاً منهجياً: أصوات الحروف أولاً، ثم كيف تتصل، ثم الكلمات، ثم الجمل، وأخيراً آيات قرآنية.",
      "من أكبر مزايا برنامج المبتدئين أنه يعمل لغير الناطقين بالعربية. لا تحتاج فهم العربية كلغة لتتعلم قراءة القرآن. طريقتنا تعلمك التعرف على الأصوات العربية وإنتاجها بدقة.",
      "مع الممارسة المنتظمة (3–5 حصص أسبوعياً)، معظم المبتدئين يكملون القاعدة النورانية في 2–4 أشهر ويبدأون القراءة من المصحف. خلال 6–8 أشهر، ستقرأ القرآن بشكل مستقل بتجويد أساسي.",
    ]}
    methodTitleEn="How We Teach Complete Beginners — Our Step-by-Step Approach"
    methodTitleAr="كيف ندرّس المبتدئين تماماً — نهجنا خطوة بخطوة"
    methodContentEn={[
      "Every beginner starts with a friendly assessment to determine their exact starting point. Some students know a few letters; others have never seen Arabic script. The assessment ensures your curriculum begins exactly where you need it — no time wasted on what you already know, and no gaps left unfilled.",
      "Our teachers introduce new material in small, digestible pieces. For the Arabic alphabet, this means learning 3–5 letters per class with their correct pronunciation (Makharij), practicing them repeatedly, and then combining them into simple words.",
      "Between classes, you receive specific, achievable practice tasks designed to take just 10–15 minutes daily. This daily practice is the single most important factor in beginner success — it builds the muscle memory needed for fluent reading.",
      "Progress is measured through regular milestones: completing each section of the Noorani Qaida, reading your first words, reading your first verse, and reading your first complete page of the Mushaf. Each milestone is celebrated to keep you motivated.",
    ]}
    methodContentAr={[
      "كل مبتدئ يبدأ بتقييم ودي لتحديد نقطة بدايته بالضبط. بعض الطلاب يعرفون حروفاً قليلة؛ آخرون لم يروا الخط العربي أبداً. التقييم يضمن أن منهجك يبدأ من حيث تحتاج.",
      "معلمونا يقدمون المادة الجديدة بقطع صغيرة سهلة الهضم. للحروف العربية، هذا يعني تعلم 3–5 حروف لكل حصة مع نطقها الصحيح (مخارجها) والتدرب عليها وثم دمجها في كلمات بسيطة.",
      "بين الحصص، تتلقى مهام تدريب محددة مصممة لتأخذ 10–15 دقيقة يومياً. هذا التدريب اليومي هو العامل الأهم في نجاح المبتدئ — يبني الذاكرة العضلية للقراءة الطلقة.",
      "التقدم يُقاس من خلال معالم منتظمة: إكمال كل قسم من القاعدة النورانية، قراءة أول كلمات، قراءة أول آية، وقراءة أول صفحة كاملة. كل معلم يُحتفى به.",
    ]}
    audiencePersonas={AUDIENCE_PERSONAS}
    audienceTitleEn="Which Type of Beginner Are You?"
    audienceTitleAr="أي نوع من المبتدئين أنت؟"
    classSteps={CLASS_STEPS}
    classSessionTitleEn="Your First Quran Class — What to Expect"
    classSessionTitleAr="حصتك الأولى — ماذا تتوقع"
    challenges={CHALLENGES}
    challengesTitleEn="Beginner Fears — And Why They Shouldn't Stop You"
    challengesTitleAr="مخاوف المبتدئين — ولماذا لا يجب أن توقفك"
    curriculum={CURRICULUM}
    curriculumTitleEn="The Beginner's Journey — From Alphabet to Fluent Quran Reading"
    curriculumTitleAr="رحلة المبتدئ — من الحروف إلى قراءة القرآن الطلقة"
    levels={[
      { titleEn: "Stage 1: Arabic Alphabet", titleAr: "المرحلة 1: الحروف", descEn: "Learning all Arabic letters and sounds.", descAr: "تعلم جميع الحروف والأصوات.", topicsEn: ["28 Arabic letters", "Vowel sounds", "Letter forms", "Simple words"], topicsAr: ["28 حرفاً عربياً", "أصوات الحركات", "أشكال الحروف", "كلمات بسيطة"] },
      { titleEn: "Stage 2: Word Building", titleAr: "المرحلة 2: بناء الكلمات", descEn: "Reading multi-syllable words.", descAr: "قراءة كلمات متعددة المقاطع.", topicsEn: ["Tanween & Shaddah", "Madd rules", "Noorani Qaida completion", "Short phrases"], topicsAr: ["التنوين والشدة", "أحكام المد", "إكمال القاعدة النورانية", "عبارات قصيرة"] },
      { titleEn: "Stage 3: Mushaf Reading", titleAr: "المرحلة 3: قراءة المصحف", descEn: "Reading directly from the Quran.", descAr: "القراءة من القرآن مباشرة.", topicsEn: ["Quran reading", "Basic Tajweed", "Surah memorization", "Independent reading"], topicsAr: ["قراءة القرآن", "التجويد الأساسي", "حفظ السور", "القراءة المستقلة"] },
    ]}
    outcomesEn={["Read Arabic letters and words independently", "Complete the Noorani Qaida foundation", "Read from the Quran (Mushaf) with basic Tajweed", "Memorize short Surahs for daily prayers", "Build confidence to continue to advanced learning"]}
    outcomesAr={["قراءة الحروف والكلمات العربية بشكل مستقل", "إكمال أساس القاعدة النورانية", "القراءة من المصحف بتجويد أساسي", "حفظ سور قصيرة للصلاة اليومية", "بناء الثقة لمتابعة التعلم المتقدم"]}
    featuresEn={["Zero prior knowledge needed", "Patient teachers trained for beginners", "Noor Al-Bayan (Noorani Qaida) method", "One-on-one private sessions", "Clear milestones and progress tracking", "Both kids (age 4+) and adults", "24/7 flexible scheduling", "Free trial — start your journey today"]}
    featuresAr={["لا حاجة لمعرفة سابقة", "معلمون صبورون مدربون للمبتدئين", "طريقة نور البيان (القاعدة النورانية)", "حصص فردية خاصة", "معالم واضحة وتتبع التقدم", "أطفال (من سن 4+) وبالغون", "مواعيد مرنة 24/7", "تجربة مجانية — ابدأ رحلتك اليوم"]}
    faqs={[
      { questionEn: "Can I really learn Quran with no Arabic background?", questionAr: "هل يمكنني فعلاً تعلم القرآن بدون خلفية عربية؟", answerEn: "Absolutely. Over 60% of our students started with zero Arabic knowledge. The Noor Al-Bayan method is specifically designed for non-Arabic speakers. You'll learn to read Arabic sounds phonetically — the same way children learn to read in any language.", answerAr: "بالتأكيد. أكثر من 60% من طلابنا بدأوا بدون معرفة عربية. طريقة نور البيان مصممة خصيصاً لغير الناطقين بالعربية." },
      { questionEn: "How long does it take a beginner to read Quran?", questionAr: "كم يستغرق المبتدئ ليقرأ القرآن؟", answerEn: "With 3–5 sessions/week: 2–4 months to complete Noorani Qaida, 6–8 months to read Quran independently with basic Tajweed. Practice between classes accelerates progress significantly.", answerAr: "مع 3–5 حصص/أسبوع: 2–4 أشهر لإكمال القاعدة النورانية، 6–8 أشهر للقراءة المستقلة بتجويد أساسي." },
      { questionEn: "What age is best to start as a beginner?", questionAr: "ما أفضل عمر للبدء كمبتدئ؟", answerEn: "Any age works. We teach beginners from age 4 to 65+. Children aged 4–6 use shorter play-based sessions. Adults often progress faster due to cognitive maturity and motivation. It's never too early or too late.", answerAr: "أي عمر ينجح. ندرّس مبتدئين من سن 4 إلى 65+. الأطفال 4–6 يستخدمون جلسات قصيرة باللعب. البالغون غالباً يتقدمون أسرع بسبب النضج المعرفي والدافعية." },
    ]}
    testimonials={[
      { name: "Rebecca M.", country: "USA", textEn: "I reverted to Islam and didn't know a single Arabic letter. My Alhamd Academy teacher started from absolute zero with incredible patience. 5 months later, I read Surah Al-Fatiha in prayer for the first time. I cried.", textAr: "اعتنقت الإسلام ولم أكن أعرف حرفاً عربياً واحداً. معلمتي بدأت من الصفر المطلق بصبر لا يصدق. بعد 5 أشهر، قرأت سورة الفاتحة في الصلاة لأول مرة. بكيت.", rating: 5 },
      { name: "Ali D.", country: "UK", textEn: "My 4-year-old had never seen Arabic before. After 3 months of the kids' beginner program, he recognizes all letters and reads short words. The games and stickers keep him excited about every class.", textAr: "ابني ذو الـ 4 سنوات لم ير العربية من قبل. بعد 3 أشهر من برنامج المبتدئين للأطفال، يعرف كل الحروف ويقرأ كلمات قصيرة. الألعاب والملصقات تبقيه متحمساً.", rating: 5 },
    ]}
    relatedPages={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Quran Classes for Beginners",
      "description": "Beginner-friendly online Quran classes. Start from the Arabic alphabet with patient certified teachers. No prior knowledge needed.",
      "provider": { "@type": "Organization", "name": "Alhamd Academy", "url": "https://alhamdacademy.net" },
      "educationalLevel": "Beginner",
      "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    }}
  />
);

export default QuranClassesForBeginners;
