import { GraduationCap, BookOpen, Globe, Briefcase, Heart, UserCheck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Arabic Classes for Kids", titleAr: "العربية للأطفال", href: "/arabic-for-kids" },
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Islamic Studies Online", titleAr: "الدراسات الإسلامية", href: "/islamic-studies-online" },
  { titleEn: "Tajweed Course Online", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: BookOpen,
    titleEn: "Muslims Wanting to Understand Quran in Arabic",
    titleAr: "المسلمون الراغبون في فهم القرآن بالعربية",
    descEn: "You recite Quran daily but rely on translations to understand its meaning. Our Quranic Arabic track teaches you the vocabulary, grammar patterns, and rhetorical structures used in the Quran so you can connect with Allah's words directly without intermediaries.",
    descAr: "تتلو القرآن يومياً لكنك تعتمد على الترجمات لفهم معناه. مسار العربية القرآنية يعلمك المفردات وأنماط القواعد والبلاغة المستخدمة في القرآن لتتصل بكلام الله مباشرة.",
  },
  {
    icon: GraduationCap,
    titleEn: "Reverts Building Islamic Literacy",
    titleAr: "المسلمون الجدد الذين يبنون المعرفة الإسلامية",
    descEn: "You embraced Islam and want to read the Quran, understand Khutbahs, and engage with Arabic Islamic texts. Our beginner-friendly approach starts from zero and builds a practical Arabic foundation that unlocks your Islamic learning journey.",
    descAr: "اعتنقت الإسلام وتريد قراءة القرآن وفهم الخطب والتعامل مع النصوص الإسلامية العربية. نهجنا الصديق للمبتدئين يبدأ من الصفر ويبني أساساً عربياً عملياً.",
  },
  {
    icon: Briefcase,
    titleEn: "Professionals Seeking Career Arabic",
    titleAr: "المهنيون الباحثون عن العربية المهنية",
    descEn: "You work in business, diplomacy, healthcare, or journalism and need Arabic for professional communication. Our MSA track focuses on formal Arabic writing, business vocabulary, and professional conversation skills relevant to your industry.",
    descAr: "تعمل في الأعمال أو الدبلوماسية أو الصحة أو الصحافة وتحتاج العربية للتواصل المهني. مسار الفصحى يركز على الكتابة الرسمية والمفردات المهنية ومهارات المحادثة.",
  },
  {
    icon: Globe,
    titleEn: "Travelers & Expatriates in Arab Countries",
    titleAr: "المسافرون والمغتربون في الدول العربية",
    descEn: "You're planning to live in or frequently visit an Arab country and need practical conversational Arabic. Our practical communication track gets you speaking quickly with vocabulary for shopping, transportation, social interactions, and navigating daily life.",
    descAr: "تخطط للعيش في دولة عربية أو زيارتها باستمرار وتحتاج عربية محادثة عملية. مسار التواصل العملي يجعلك تتحدث بسرعة بمفردات للتسوق والمواصلات والحياة اليومية.",
  },
  {
    icon: Heart,
    titleEn: "Heritage Speakers Formalizing Their Arabic",
    titleAr: "أبناء الجاليات الذين يريدون إضفاء الطابع الرسمي على عربيتهم",
    descEn: "You grew up hearing Arabic at home and can speak conversationally, but struggle with reading, writing, and formal grammar. Our heritage track builds on your existing speaking ability to develop full literacy and grammatical precision.",
    descAr: "نشأت تسمع العربية في البيت وتستطيع التحدث، لكنك تعاني مع القراءة والكتابة والقواعد الرسمية. مسارنا يبني على قدرتك الحالية في التحدث لتطوير القراءة والكتابة الكاملة.",
  },
  {
    icon: UserCheck,
    titleEn: "Islamic Studies Students Needing Arabic",
    titleAr: "طلاب الدراسات الإسلامية الذين يحتاجون العربية",
    descEn: "You're studying Islamic sciences — Fiqh, Hadith, Tafseer — and realize that English translations lose nuance. Our academic Arabic track equips you with the classical Arabic skills needed to read original Islamic texts and scholarly works independently.",
    descAr: "تدرس العلوم الإسلامية — الفقه والحديث والتفسير — وتدرك أن الترجمات تفقد الدقة. مسار العربية الأكاديمية يزودك بمهارات العربية الكلاسيكية لقراءة النصوص الأصلية مستقلاً.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Warm-Up Conversation",
    titleAr: "محادثة إحماء",
    descEn: "Each session opens with a natural Arabic conversation about your week, current events, or a topic you're interested in. This immediately puts you in Arabic-thinking mode and gives your teacher insight into your current speaking comfort level.",
    descAr: "كل جلسة تبدأ بمحادثة عربية طبيعية عن أسبوعك أو أحداث جارية. هذا يضعك فوراً في وضع التفكير بالعربية ويعطي معلمك نظرة على مستوى راحتك الحالي.",
  },
  {
    titleEn: "Grammar Concept with Real Examples",
    titleAr: "مفهوم نحوي بأمثلة حقيقية",
    descEn: "New grammar is introduced through authentic examples from the Quran, news articles, or daily conversations — never in isolation. You see how the rule works in real Arabic before drilling it, making it memorable and practical.",
    descAr: "القواعد الجديدة تُقدّم من خلال أمثلة أصيلة من القرآن أو المقالات أو المحادثات اليومية — وليس بمعزل. ترى كيف تعمل القاعدة في العربية الحقيقية قبل التدريب عليها.",
  },
  {
    titleEn: "Reading & Comprehension Exercise",
    titleAr: "تمرين قراءة وفهم",
    descEn: "You read a passage appropriate to your level — Quranic verses for Quranic Arabic students, news excerpts for MSA learners, or dialogue scripts for conversation-focused students — then answer comprehension questions and discuss vocabulary.",
    descAr: "تقرأ نصاً مناسباً لمستواك — آيات قرآنية أو مقتطفات إخبارية أو حوارات — ثم تجيب عن أسئلة الفهم وتناقش المفردات.",
  },
  {
    titleEn: "Speaking Practice & Error Correction",
    titleAr: "تدريب التحدث وتصحيح الأخطاء",
    descEn: "Guided speaking exercises where you construct sentences, express opinions, or describe scenarios in Arabic. Your teacher provides gentle, immediate correction and helps you self-correct recurring patterns.",
    descAr: "تمارين تحدث موجهة تبني فيها جملاً وتعبر عن آراء أو تصف سيناريوهات بالعربية. معلمك يقدم تصحيحاً لطيفاً وفورياً ويساعدك على التصحيح الذاتي.",
  },
  {
    titleEn: "Writing Assignment & Review",
    titleAr: "مهمة كتابية ومراجعة",
    descEn: "You complete a writing task — from simple paragraphs at beginner level to essays and formal letters at advanced level. Your teacher reviews previous writing assignments and highlights patterns for improvement.",
    descAr: "تكمل مهمة كتابية — من فقرات بسيطة للمبتدئين إلى مقالات ورسائل رسمية للمتقدمين. معلمك يراجع المهام السابقة ويبرز أنماط التحسين.",
  },
  {
    titleEn: "Session Summary & Next Steps",
    titleAr: "ملخص الجلسة والخطوات التالية",
    descEn: "Your teacher summarizes what you covered, highlights your improvements, notes areas to review, and outlines what the next session will build upon. You leave with a clear sense of progress and direction.",
    descAr: "يلخص معلمك ما تم تناوله ويبرز تحسناتك ويحدد مجالات المراجعة ويوضح ما ستبنيه الجلسة القادمة. تغادر بإحساس واضح بالتقدم والاتجاه.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "Arabic script looks impossible to read",
    problemAr: "الخط العربي يبدو مستحيل القراءة",
    solutionEn: "Our systematic letter introduction method breaks the Arabic alphabet into logical groups based on shape similarity. Within the first phase, most adult beginners can decode Arabic words. We use graduated reading materials that build confidence one step at a time.",
    solutionAr: "طريقتنا المنهجية في تقديم الحروف تقسم الأبجدية العربية إلى مجموعات منطقية حسب تشابه الشكل. خلال المرحلة الأولى يستطيع معظم المبتدئين فك شفرة الكلمات العربية.",
  },
  {
    problemEn: "Understanding grammar rules but unable to use them in speech",
    problemAr: "فهم القواعد لكن عدم القدرة على استخدامها في الكلام",
    solutionEn: "This is the most common adult learner frustration. Our approach dedicates significant session time to guided output — structured speaking exercises where you must apply the grammar rule you just learned in real sentences, not just recognize it in textbook examples.",
    solutionAr: "هذا أكثر إحباط شائع للمتعلمين البالغين. نهجنا يخصص وقتاً كبيراً للإنتاج الموجه — تمارين تحدث منظمة تطبق فيها القاعدة النحوية في جمل حقيقية وليس فقط في أمثلة الكتب.",
  },
  {
    problemEn: "Busy schedule with no time for regular study",
    problemAr: "جدول مزدحم بدون وقت للدراسة المنتظمة",
    solutionEn: "Our flexible scheduling allows you to book Arabic classes at times that work for your routine — early morning, lunch break, or late evening. We also provide micro-study materials (5-minute vocabulary cards, audio clips for commuting) that fit into the gaps of a busy day.",
    solutionAr: "مواعيدنا المرنة تسمح لك بحجز دروس العربية في أوقات تناسب روتينك. نقدم أيضاً مواد دراسية مصغرة (بطاقات مفردات 5 دقائق ومقاطع صوتية) تناسب فجوات اليوم المزدحم.",
  },
  {
    problemEn: "Feeling embarrassed about making mistakes as an adult",
    problemAr: "الشعور بالإحراج من ارتكاب الأخطاء كشخص بالغ",
    solutionEn: "Our one-on-one Arabic classes eliminate the social pressure of group settings. Your teacher creates a judgment-free environment where mistakes are treated as valuable learning data. Adults who feel safe making errors progress significantly faster.",
    solutionAr: "دروسنا الفردية تلغي الضغط الاجتماعي للمجموعات. معلمك يخلق بيئة خالية من الأحكام حيث تُعامل الأخطاء كبيانات تعلم قيمة. البالغون الذين يشعرون بالأمان يتقدمون أسرع بكثير.",
  },
  {
    problemEn: "Plateau after reaching intermediate Arabic level",
    problemAr: "الوصول لهضبة بعد المستوى المتوسط",
    solutionEn: "Breaking through the intermediate plateau requires deliberate exposure to challenging materials. We introduce authentic Arabic texts, advanced grammar analysis, and debate-style conversation exercises that push you beyond your comfort zone into true fluency.",
    solutionAr: "اختراق هضبة المستوى المتوسط يتطلب تعرضاً مقصوداً لمواد تحديّة. نقدم نصوصاً عربية أصيلة وتحليل قواعد متقدم وتمارين محادثة أسلوب النقاش تدفعك نحو الطلاقة الحقيقية.",
  },
];

const CURRICULUM_WEEKS: CurriculumWeek[] = [
  {
    weekEn: "Phase 1",
    weekAr: "المرحلة 1",
    topicEn: "Arabic Alphabet & Foundation Reading",
    topicAr: "الأبجدية العربية والقراءة التأسيسية",
    detailsEn: ["All 28 letters in all positions (isolated, initial, medial, final)", "Short vowels, Sukoon, and Tanween", "Reading two and three-letter words fluently", "Basic writing: letter formation and connecting"],
    detailsAr: ["جميع الحروف الـ 28 في كل المواضع", "الحركات القصيرة والسكون والتنوين", "قراءة كلمات من حرفين وثلاثة أحرف بطلاقة", "الكتابة الأساسية: تكوين الحروف والربط"],
  },
  {
    weekEn: "Phase 2",
    weekAr: "المرحلة 2",
    topicEn: "Essential Vocabulary & Simple Communication",
    topicAr: "المفردات الأساسية والتواصل البسيط",
    detailsEn: ["500+ high-frequency Arabic words", "Self-introduction, greetings, daily expressions", "Simple question-and-answer patterns", "Reading short dialogues and paragraphs"],
    detailsAr: ["500+ كلمة عربية عالية التردد", "التعريف بالنفس والتحيات والتعبيرات اليومية", "أنماط السؤال والجواب البسيطة", "قراءة حوارات وفقرات قصيرة"],
  },
  {
    weekEn: "Phase 3",
    weekAr: "المرحلة 3",
    topicEn: "Core Grammar: Nahw & Sarf Foundations",
    topicAr: "القواعد الأساسية: أسس النحو والصرف",
    detailsEn: ["Noun and verb identification", "Subject-verb-object sentence structure", "Verb conjugation (past, present, imperative)", "Nominal vs verbal sentences"],
    detailsAr: ["تمييز الأسماء والأفعال", "بنية الجملة: فاعل وفعل ومفعول", "تصريف الأفعال (ماضي، مضارع، أمر)", "الجملة الاسمية مقابل الفعلية"],
  },
  {
    weekEn: "Phase 4",
    weekAr: "المرحلة 4",
    topicEn: "Intermediate Reading, Writing & Conversation",
    topicAr: "القراءة والكتابة والمحادثة المتوسطة",
    detailsEn: ["Reading authentic texts: news, Islamic content, stories", "Paragraph and essay writing", "Expressing opinions and debating in Arabic", "Intermediate Nahw: cases (I'raab), Hal, Tamyeez"],
    detailsAr: ["قراءة نصوص أصيلة: أخبار ومحتوى إسلامي وقصص", "كتابة الفقرات والمقالات", "التعبير عن الآراء والمناقشة بالعربية", "نحو متوسط: الإعراب والحال والتمييز"],
  },
  {
    weekEn: "Phase 5",
    weekAr: "المرحلة 5",
    topicEn: "Advanced Fluency & Specialization",
    topicAr: "الطلاقة المتقدمة والتخصص",
    detailsEn: ["Advanced Nahw and Sarf with Balagha introduction", "Literary text analysis and critical reading", "Professional or academic Arabic writing", "Fluent conversation on complex topics"],
    detailsAr: ["نحو وصرف متقدم مع مقدمة في البلاغة", "تحليل النصوص الأدبية والقراءة النقدية", "الكتابة العربية المهنية أو الأكاديمية", "محادثة طليقة في مواضيع معقدة"],
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    featureEn: "Teacher Qualification",
    featureAr: "مؤهلات المعلم",
    usEn: "Native Egyptian Arabic teachers with university degrees in Arabic language and education",
    usAr: "معلمون مصريون أصليون بشهادات جامعية في اللغة العربية والتربية",
    othersEn: "Non-native speakers or teachers without formal Arabic teaching qualifications",
    othersAr: "متحدثون غير أصليين أو معلمون بدون مؤهلات رسمية في تدريس العربية",
  },
  {
    featureEn: "Curriculum",
    featureAr: "المنهج",
    usEn: "'Al-Arabiyyah Bayna Yadayk' — internationally recognized, used in 100+ universities worldwide",
    usAr: "'العربية بين يديك' — معترف به دولياً ومستخدم في 100+ جامعة حول العالم",
    othersEn: "In-house materials of varying quality, often without structured progression",
    othersAr: "مواد داخلية بجودة متفاوتة، غالباً بدون تقدم منظم",
  },
  {
    featureEn: "Lesson Format",
    featureAr: "صيغة الدرس",
    usEn: "One-on-one private sessions adapted to your specific goals, pace, and preferred focus areas",
    usAr: "جلسات خاصة فردية مكيفة لأهدافك المحددة وسرعتك ومجالات تركيزك المفضلة",
    othersEn: "Group classes where individual needs are often overlooked",
    othersAr: "دروس جماعية حيث تُهمل الاحتياجات الفردية غالباً",
  },
  {
    featureEn: "Skills Coverage",
    featureAr: "تغطية المهارات",
    usEn: "Balanced development of all four skills: reading, writing, listening, and speaking in every session",
    usAr: "تطوير متوازن لجميع المهارات الأربع: القراءة والكتابة والاستماع والتحدث في كل جلسة",
    othersEn: "Heavy focus on grammar or reading with minimal speaking practice",
    othersAr: "تركيز كبير على القواعد أو القراءة مع ممارسة تحدث ضئيلة",
  },
  {
    featureEn: "Goal Customization",
    featureAr: "تخصيص الأهداف",
    usEn: "Specialized tracks: Quranic Arabic, conversational, academic, or professional Arabic",
    usAr: "مسارات متخصصة: عربية قرآنية أو محادثة أو أكاديمية أو مهنية",
    othersEn: "One-size-fits-all approach regardless of student's purpose for learning Arabic",
    othersAr: "نهج واحد يناسب الجميع بغض النظر عن هدف الطالب من تعلم العربية",
  },
];

const ArabicForAdults = () => (
  <ServicePageLayout
    seoTitle="Learn Arabic Online | Arabic Language Course for Adults | Alhamd Academy"
    seoDescription="Learn Arabic online with native teachers. Comprehensive Arabic language course covering reading, writing, grammar (Nahw & Sarf), and conversation. Arabic classes online for beginners to advanced. Free trial."
    seoKeywords="learn arabic online, arabic language course online, learn arabic for beginners, arabic classes online, arabic tutor online, learn arabic to understand quran, arabic classes for adults, arabic grammar course, arabic conversation classes, online arabic lessons, arabic reading writing, nahw sarf online, modern standard arabic, arabic course for adults"
    canonical="https://alhamdacademy.net/arabic-for-adults"
    heroTitleEn="Learn Arabic Online — Arabic Language Course for Adults"
    heroTitleAr="تعلم العربية أونلاين — دورة اللغة العربية للكبار"
    heroSubtitleEn="Master Arabic Reading, Writing, Grammar & Conversation Online"
    heroSubtitleAr="أتقن القراءة والكتابة والقواعد والمحادثة بالعربية أونلاين"
    heroDescEn="Whether you want to learn Arabic to understand the Quran in its original language, communicate with Arabic speakers, or pursue academic studies, our comprehensive Arabic language course online is designed to take you from beginner to fluent. Learn Arabic online with native Egyptian Arabic tutors using the proven Al-Arabiyyah Bayna Yadayk methodology."
    heroDescAr="سواء كنت تريد تعلم العربية لفهم القرآن بلغته الأصلية أو التواصل مع المتحدثين بالعربية أو متابعة الدراسات الأكاديمية، دورتنا الشاملة في اللغة العربية أونلاين مصممة لنقلك من المبتدئ إلى الطلاقة."
    aboutTitleEn="Why Adults Should Learn Arabic Online in 2025"
    aboutTitleAr="لماذا يجب على الكبار تعلم العربية أونلاين في 2025"
    aboutContentEn={[
      "Arabic is the 5th most spoken language in the world and the language of the Holy Quran. For Muslims, learning Arabic online unlocks a deeper understanding of Islamic texts, prayers, and scholarly works. Whether you want to learn Arabic to understand Quran or for professional advancement, our Arabic classes online are the perfect starting point.",
      "Many adults believe they've missed the window to learn a new language, but research consistently shows that adults can learn Arabic effectively when given the right approach. Our one-on-one Arabic classes online for adults are specifically designed for adult learners with busy schedules.",
      "At Alhamd Academy, we use the internationally acclaimed 'Al-Arabiyyah Bayna Yadayk' curriculum for our Arabic language course online, which covers Modern Standard Arabic (MSA) comprehensively. This textbook series is used by over 100 universities worldwide and provides a structured pathway for adults learning Arabic for beginners to advanced fluency.",
      "Our native Egyptian Arabic tutors online adapt each lesson to your specific goals. Whether you want to focus on learning Arabic to understand Quran, conversational Arabic, or academic Arabic grammar, we customize the Arabic course to match your objectives.",
      "Each Arabic class online is a balance of theory and practice. You won't just learn grammar rules — you'll practice reading authentic texts, engage in real conversations, and write compositions that build your confidence in using Arabic.",
    ]}
    aboutContentAr={[
      "العربية هي خامس أكثر اللغات تحدثاً في العالم ولغة القرآن الكريم. تعلم العربية أونلاين يفتح أبواباً لفهم أعمق للنصوص الإسلامية وفرص مهنية.",
      "كثير من البالغين يعتقدون أنهم فاتهم وقت تعلم لغة جديدة، لكن الأبحاث تظهر أن البالغين يمكنهم تعلم العربية بفعالية مع النهج الصحيح.",
      "نستخدم منهج 'العربية بين يديك' المعتمد دولياً في دورة اللغة العربية أونلاين الذي يغطي العربية الفصحى الحديثة بشكل شامل.",
      "معلمونا المصريون يكيفون كل درس عربي أونلاين وفق أهدافك المحددة — سواء لفهم القرآن أو المحادثة أو الدراسة الأكاديمية.",
      "كل حصة عربية أونلاين توازن بين النظرية والتطبيق. ستتدرب على قراءة نصوص أصيلة وإجراء محادثات حقيقية.",
    ]}
    methodTitleEn="How We Teach Arabic Online — Our Adult-Focused Approach"
    methodTitleAr="كيف ندرّس العربية أونلاين — نهجنا المركز على الكبار"
    methodContentEn={[
      "Adult learners want to see rapid progress when they learn Arabic online, understand the logic behind language rules, and practice relevant real-world scenarios. Our Arabic classes online address all of these needs with native Arabic tutors.",
      "We use a communicative approach in our Arabic language course where grammar is taught in context rather than in isolation. You learn Arabic grammar rules and immediately apply them in reading and conversation exercises.",
      "Each online Arabic lesson follows a structured format: review of previous material, introduction of new concepts, guided practice, and free practice. This ensures systematic progress while building confidence in Arabic.",
      "We supplement textbook Arabic learning with authentic materials including news articles, Islamic texts, and conversational scenarios. This exposure to real Arabic accelerates your learning and prepares you for real-world use of the Arabic language.",
    ]}
    methodContentAr={[
      "المتعلمون البالغون يريدون رؤية تقدم سريع عند تعلم العربية أونلاين وفهم منطق القواعد. دروسنا تلبي كل هذه الاحتياجات.",
      "نستخدم نهجاً تواصلياً في دورة اللغة العربية حيث تُدرَّس القواعد في سياقها.",
      "كل درس عربي أونلاين يتبع هيكلاً منظماً يضمن التقدم المنهجي مع بناء الثقة.",
      "نكمل تعلم العربية بمواد أصيلة تشمل مقالات إخبارية ونصوص إسلامية وسيناريوهات محادثة.",
    ]}
    levels={[
      {
        titleEn: "Learn Arabic for Beginners (A1-A2)",
        titleAr: "تعلم العربية للمبتدئين (A1-A2)",
        descEn: "Start learning Arabic online from zero. Build a strong foundation in Arabic reading, writing, and basic communication with our beginner Arabic course.",
        descAr: "ابدأ تعلم العربية أونلاين من الصفر. ابنِ أساساً قوياً في القراءة والكتابة والتواصل الأساسي.",
        topicsEn: ["Arabic alphabet mastery", "Basic vocabulary (500+ words)", "Simple sentence construction", "Self-introduction and greetings", "Numbers, colors, and daily life vocabulary", "Basic verb conjugation"],
        topicsAr: ["إتقان الحروف العربية", "مفردات أساسية (500+ كلمة)", "تركيب جمل بسيطة", "التعريف بالنفس والتحيات", "الأرقام والألوان ومفردات الحياة اليومية", "تصريف الأفعال الأساسي"],
      },
      {
        titleEn: "Intermediate Arabic Online (B1-B2)",
        titleAr: "العربية المتوسطة أونلاين (B1-B2)",
        descEn: "Develop Arabic fluency with grammar mastery (Nahw & Sarf), expanded vocabulary, and confident conversation skills in your Arabic classes online.",
        descAr: "طور الطلاقة العربية مع إتقان القواعد والمفردات الموسعة ومهارات محادثة واثقة.",
        topicsEn: ["Nahw (Arabic syntax) fundamentals", "Sarf (morphology) basics", "Reading comprehension of texts", "Paragraph writing", "Intermediate conversation practice", "Quranic vocabulary building"],
        topicsAr: ["أساسيات النحو", "أساسيات الصرف", "فهم النصوص المقروءة", "كتابة الفقرات", "تدريب محادثة متوسط", "بناء مفردات قرآنية"],
      },
      {
        titleEn: "Advanced Arabic Online (C1-C2)",
        titleAr: "العربية المتقدمة أونلاين (C1-C2)",
        descEn: "Achieve mastery in Arabic language with advanced grammar, literary analysis, and professional communication. Learn Arabic to understand Quran deeply.",
        descAr: "حقق الإتقان في اللغة العربية مع القواعد المتقدمة والتحليل الأدبي والتواصل المهني.",
        topicsEn: ["Advanced Nahw & Sarf", "Arabic literature and poetry", "Essay writing and rhetoric (Balagha)", "Academic Arabic reading", "Fluent conversation on complex topics", "Translation skills"],
        topicsAr: ["النحو والصرف المتقدم", "الأدب والشعر العربي", "كتابة المقالات والبلاغة", "القراءة الأكاديمية", "محادثة طليقة في مواضيع معقدة", "مهارات الترجمة"],
      },
    ]}
    outcomesEn={[
      "Read and write Arabic confidently at your target level",
      "Understand Arabic grammar rules (Nahw & Sarf) and apply them correctly",
      "Hold conversations in Arabic on everyday and specialized topics",
      "Learn Arabic to understand Quran and Islamic texts in their original language",
      "Write essays, emails, and formal documents in Arabic",
      "Build a strong vocabulary of 2000+ Arabic words",
    ]}
    outcomesAr={[
      "القراءة والكتابة بالعربية بثقة على مستواك المستهدف",
      "فهم قواعد اللغة العربية وتطبيقها بشكل صحيح",
      "إجراء محادثات بالعربية في مواضيع يومية ومتخصصة",
      "تعلم العربية لفهم القرآن والنصوص الإسلامية بلغتها الأصلية",
      "كتابة مقالات ورسائل إلكترونية ووثائق رسمية بالعربية",
      "بناء مفردات قوية من 2000+ كلمة عربية",
    ]}
    featuresEn={[
      "Native Arabic tutors online from Egypt with university-level Arabic teaching credentials",
      "One-on-one personalized Arabic classes online adapted to your goals and pace",
      "Internationally recognized Al-Arabiyyah Bayna Yadayk curriculum for learning Arabic",
      "Balance of grammar, reading, writing, listening, and speaking in every Arabic lesson",
      "Flexible scheduling perfect for working professionals learning Arabic online",
      "Option to focus on learning Arabic to understand Quran, conversational Arabic, or academic Arabic",
      "Regular assessments and progress tracking in your Arabic language course",
      "Free trial class to evaluate our Arabic classes online program",
    ]}
    featuresAr={[
      "معلمون عرب أصليون أونلاين من مصر بمؤهلات تدريس جامعية",
      "دروس عربية أونلاين فردية مخصصة حسب أهدافك وسرعتك",
      "منهج العربية بين يديك المعترف به دولياً لتعلم العربية",
      "توازن بين القواعد والقراءة والكتابة والاستماع والتحدث في كل درس",
      "مواعيد مرنة مثالية للمهنيين العاملين الذين يتعلمون العربية أونلاين",
      "خيار التركيز على تعلم العربية لفهم القرآن أو المحادثة أو الأكاديمية",
      "تقييمات منتظمة وتتبع التقدم في دورة اللغة العربية",
      "حصة تجريبية مجانية لتقييم دروسنا العربية أونلاين",
    ]}
    faqs={[
      { questionEn: "Can I learn Arabic online as an adult with no prior knowledge?", questionAr: "هل يمكنني تعلم العربية أونلاين كشخص بالغ بدون معرفة سابقة؟", answerEn: "Absolutely! Many adults in our Arabic classes online started with zero Arabic knowledge and have made remarkable progress. Our learn Arabic for beginners level is designed specifically for adults with no prior exposure to the Arabic language.", answerAr: "بالتأكيد! كثير من البالغين في دروسنا بدأوا بدون معرفة بالعربية وحققوا تقدماً ملحوظاً." },
      { questionEn: "Can I learn Arabic to understand Quran?", questionAr: "هل يمكنني تعلم العربية لفهم القرآن؟", answerEn: "Yes! Learning Arabic to understand Quran is one of the most popular goals among our adult students. We offer a specialized Quranic Arabic track within our Arabic language course online that focuses on Quranic vocabulary, grammar structures used in the Quran, and understanding verse meanings directly from the Arabic text.", answerAr: "نعم! تعلم العربية لفهم القرآن هو أحد الأهداف الأكثر شعبية بين طلابنا البالغين. نقدم مسار عربية قرآنية متخصص يركز على مفردات وتراكيب القرآن." },
      { questionEn: "What's the difference between Modern Standard Arabic and Quranic Arabic?", questionAr: "ما الفرق بين العربية الفصحى الحديثة والعربية القرآنية؟", answerEn: "Modern Standard Arabic (MSA) is the formal Arabic used in media, literature, and official communication. Quranic Arabic refers to the classical Arabic of the Quran with some vocabulary differences. Our Arabic language course online covers both, with the option to focus on either.", answerAr: "العربية الفصحى الحديثة هي العربية الرسمية المستخدمة في الإعلام والأدب. العربية القرآنية تشير إلى العربية الكلاسيكية للقرآن. دورتنا تغطي كليهما." },
      { questionEn: "How many Arabic classes online per week do you recommend?", questionAr: "كم درس عربي أونلاين أسبوعياً توصون به؟", answerEn: "We recommend a minimum of 3 Arabic classes online per week for meaningful progress in learning Arabic. 4-5 classes per week is ideal for faster advancement. However, even 2 classes per week with regular self-study can yield good results.", answerAr: "نوصي بحد أدنى 3 دروس عربية أونلاين أسبوعياً للتقدم الملحوظ. 4-5 دروس مثالية للتقدم الأسرع." },
      { questionEn: "Do you teach Arabic grammar (Nahw and Sarf) in your online course?", questionAr: "هل تدرسون القواعد العربية (النحو والصرف) في دورتكم أونلاين؟", answerEn: "Yes, Arabic grammar is an essential part of our Arabic language course online. We teach Nahw (syntax) and Sarf (morphology) progressively in our Arabic classes online, starting with basic concepts and building to advanced levels with practical application.", answerAr: "نعم، القواعد العربية جزء أساسي من دورتنا أونلاين. ندرس النحو والصرف تدريجياً مع التطبيق العملي في دروسنا." },
    ]}
    testimonials={[
      { name: "James R.", country: "United States", textEn: "I'm a revert Muslim who wanted to learn Arabic to understand Quran. With Alhamd Academy's Arabic classes online, I can now read and understand basic Quranic Arabic. The Arabic tutor online is incredibly knowledgeable.", textAr: "أنا مسلم جديد أردت تعلم العربية لفهم القرآن. مع دروس العربية أونلاين في أكاديمية الحمد، أستطيع الآن قراءة وفهم العربية القرآنية.", rating: 5 },
      { name: "Amira B.", country: "France", textEn: "The Arabic language course online is well-structured and the Arabic tutor adapts perfectly to my learning style. I appreciate the focus on both Arabic grammar and conversation. Highly recommend for adults learning Arabic online.", textAr: "دورة اللغة العربية أونلاين منظمة جيداً والمعلم يتكيف تماماً مع أسلوب تعلمي. أنصح بها بشدة.", rating: 5 },
    ]}
    relatedPages={RELATED}
    audiencePersonas={AUDIENCE_PERSONAS}
    classSteps={CLASS_STEPS}
    challenges={CHALLENGES}
    curriculum={CURRICULUM_WEEKS}
    comparisonRows={COMPARISON_ROWS}
    audienceTitleEn="Who Should Learn Arabic Online with Us?"
    audienceTitleAr="من يجب أن يتعلم العربية أونلاين معنا؟"
    classSessionTitleEn="Inside a Typical Arabic Class for Adults"
    classSessionTitleAr="داخل درس عربي نموذجي للكبار"
    challengesTitleEn="Common Arabic Learning Obstacles — And Our Solutions"
    challengesTitleAr="عقبات تعلم العربية الشائعة — وحلولنا"
    curriculumTitleEn="Your Arabic Learning Roadmap"
    curriculumTitleAr="خارطة طريق تعلم العربية"
    comparisonTitleEn="Alhamd Academy vs Other Arabic Courses"
    comparisonTitleAr="أكاديمية الحمد مقابل دورات العربية الأخرى"
    midCtaTitleEn="Learn Arabic with a Native Speaker — Free First Lesson"
    midCtaTitleAr="تعلم العربية مع متحدث أصلي — الدرس الأول مجاني"
    midCtaDescEn="Personalized Arabic lesson • Native Egyptian tutor • No strings attached"
    midCtaDescAr="درس عربي مخصص • معلم مصري أصلي • بدون قيود"
    levelsTitleEn="Arabic Proficiency Levels — Your Learning Roadmap"
    levelsTitleAr="مستويات إتقان العربية — خارطة طريق التعلم"
    outcomesTitleEn="Arabic Skills You'll Develop"
    outcomesTitleAr="المهارات العربية التي ستطورها"
    whyChooseTitleEn="Why Adults Choose Us for Arabic Learning?"
    whyChooseTitleAr="لماذا يختارنا الكبار لتعلم العربية؟"
    testimonialsTitleEn="Adult Learners Share Their Arabic Progress"
    testimonialsTitleAr="المتعلمون الكبار يشاركون تقدمهم في العربية"
    faqTitleEn="Arabic Language Course — Common Questions"
    faqTitleAr="دورة اللغة العربية — أسئلة شائعة"
    ctaTitleEn="Unlock the Beauty of the Arabic Language"
    ctaTitleAr="اكتشف جمال اللغة العربية"
    ctaDescEn="Whether for Quran understanding or professional growth, start your Arabic journey with a free class."
    ctaDescAr="سواء لفهم القرآن أو النمو المهني، ابدأ رحلتك العربية بحصة مجانية."
    ctaButtonEn="Start Learning Arabic Free"
    ctaButtonAr="ابدأ تعلم العربية مجاناً"
    relatedTitleEn="Complement Your Arabic with These Courses"
    relatedTitleAr="أكمل تعلم العربية مع هذه الدورات"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Learn Arabic Online — Arabic Language Course for Adults",
      description: "Comprehensive Arabic language course online for adults covering reading, writing, grammar, and conversation. Learn Arabic to understand Quran.",
      provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
      educationalLevel: ["Beginner (A1-A2)", "Intermediate (B1-B2)", "Advanced (C1-C2)"],
      inLanguage: ["en", "ar"],
      offers: { "@type": "Offer", price: "6", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, bestRating: 5, ratingCount: 80 },
    }}
  />
);

export default ArabicForAdults;
