import { Baby, Gamepad2, BookOpenCheck, Users, Heart, GraduationCap } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Learn Arabic Online for Adults", titleAr: "العربية للكبار", href: "/arabic-for-adults" },
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Islamic Studies for Kids", titleAr: "الدراسات الإسلامية", href: "/islamic-studies-online" },
  { titleEn: "Female Quran Teacher", titleAr: "معلمة قرآن", href: "/female-quran-teacher" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Little Explorers (Ages 4–6)",
    titleAr: "المستكشفون الصغار (4–6 سنوات)",
    descEn: "Your toddler is at the perfect age to absorb a new language like a sponge. Our playful Arabic sessions use animated flashcards, nursery rhymes in Arabic, and coloring activities that turn letter recognition into a daily adventure rather than a classroom chore.",
    descAr: "طفلك في العمر المثالي لاستيعاب لغة جديدة كالإسفنجة. جلساتنا المرحة تستخدم بطاقات متحركة وأناشيد عربية وأنشطة تلوين تحول تعلم الحروف إلى مغامرة يومية.",
  },
  {
    icon: Gamepad2,
    titleEn: "School-Age Learners (Ages 7–10)",
    titleAr: "تلاميذ المدرسة (7–10 سنوات)",
    descEn: "Your child can already read in English but hasn't started Arabic yet. Our structured yet fun curriculum introduces Arabic reading and writing through interactive digital games, short stories, and weekly vocabulary challenges that keep kids motivated.",
    descAr: "طفلك يقرأ بالإنجليزية لكنه لم يبدأ العربية بعد. منهجنا المنظم والممتع يقدم القراءة والكتابة العربية من خلال ألعاب رقمية تفاعلية وقصص قصيرة وتحديات مفردات أسبوعية.",
  },
  {
    icon: BookOpenCheck,
    titleEn: "Pre-Teens Building Fluency (Ages 11–13)",
    titleAr: "ما قبل المراهقة لبناء الطلاقة (11–13 سنة)",
    descEn: "Your child knows the Arabic alphabet but struggles to form sentences or hold a conversation. Our intermediate track builds grammar awareness through guided dialogues, journal writing, and reading comprehension exercises drawn from age-appropriate Islamic and cultural texts.",
    descAr: "طفلك يعرف الحروف العربية لكنه يعاني في تكوين الجمل. مسارنا المتوسط يبني الوعي النحوي من خلال حوارات موجهة وكتابة يوميات وتمارين فهم قرائي.",
  },
  {
    icon: GraduationCap,
    titleEn: "Teenagers Preparing for Academic Arabic (Ages 14–16)",
    titleAr: "المراهقون الذين يستعدون للعربية الأكاديمية (14–16 سنة)",
    descEn: "Your teenager needs Arabic for Islamic scholarship, Quran studies, or future university plans. Our advanced teen track covers Nahw and Sarf fundamentals, essay composition, and critical reading skills that prepare them for serious Arabic study.",
    descAr: "ابنك المراهق يحتاج العربية للدراسة الإسلامية أو القرآن أو الجامعة. مسارنا المتقدم يغطي أساسيات النحو والصرف والتعبير والقراءة النقدية.",
  },
  {
    icon: Heart,
    titleEn: "Heritage Speakers Reconnecting with Arabic",
    titleAr: "أبناء الجاليات الراغبون في إعادة التواصل مع العربية",
    descEn: "Your child understands spoken Arabic at home but cannot read or write. Our heritage track rapidly builds literacy skills by leveraging their existing listening comprehension, filling the gap between spoken familiarity and written mastery.",
    descAr: "طفلك يفهم العربية المحكية في البيت لكنه لا يقرأ ولا يكتب. مسارنا يبني مهارات القراءة والكتابة بسرعة بالاستفادة من فهمه السمعي الموجود.",
  },
  {
    icon: Users,
    titleEn: "Siblings Learning Together",
    titleAr: "الأشقاء الذين يتعلمون معاً",
    descEn: "You have multiple children at different Arabic levels. Our flexible scheduling and individual lesson plans mean each child gets personalized attention while the family benefits from a single trusted academy for all their Arabic learning needs.",
    descAr: "لديك عدة أطفال بمستويات عربية مختلفة. مواعيدنا المرنة وخطط الدروس الفردية تعني حصول كل طفل على اهتمام مخصص بينما تستفيد العائلة من أكاديمية موثوقة واحدة.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Warm-Up & Arabic Song",
    titleAr: "إحماء ونشيد عربي",
    descEn: "The session opens with a familiar Arabic greeting song or rhyme to shift your child's mindset into Arabic mode and build excitement for the lesson ahead.",
    descAr: "تبدأ الجلسة بنشيد تحية عربي مألوف لتحويل ذهنية طفلك إلى وضع العربية وبناء الحماس للدرس.",
  },
  {
    titleEn: "Previous Lesson Review Game",
    titleAr: "لعبة مراجعة الدرس السابق",
    descEn: "A quick interactive quiz or matching game reviews last session's vocabulary and concepts, reinforcing retention through playful repetition rather than rote drilling.",
    descAr: "اختبار تفاعلي سريع أو لعبة مطابقة لمراجعة مفردات ومفاهيم الجلسة السابقة، مما يعزز الحفظ من خلال التكرار المرح.",
  },
  {
    titleEn: "New Concept Introduction",
    titleAr: "تقديم المفهوم الجديد",
    descEn: "The teacher introduces new letters, vocabulary, or grammar using colorful slides, animated characters, and real-world examples that connect Arabic to your child's daily life.",
    descAr: "يقدم المعلم حروفاً أو مفردات أو قواعد جديدة باستخدام شرائح ملونة وشخصيات متحركة وأمثلة واقعية تربط العربية بحياة طفلك اليومية.",
  },
  {
    titleEn: "Guided Practice Activity",
    titleAr: "نشاط تدريبي موجه",
    descEn: "Your child practices the new concept through interactive exercises — tracing letters on a digital whiteboard, building sentences from word cards, or role-playing short Arabic conversations.",
    descAr: "يتدرب طفلك على المفهوم الجديد من خلال تمارين تفاعلية — تتبع الحروف على سبورة رقمية أو بناء جمل من بطاقات كلمات أو تمثيل محادثات عربية قصيرة.",
  },
  {
    titleEn: "Story Time or Cultural Activity",
    titleAr: "وقت القصة أو النشاط الثقافي",
    descEn: "Each session includes a short Arabic story, Islamic anecdote, or cultural exploration that expands vocabulary naturally while connecting your child to their heritage.",
    descAr: "كل جلسة تتضمن قصة عربية قصيرة أو حكاية إسلامية أو استكشاف ثقافي يوسع المفردات بشكل طبيعي ويربط طفلك بتراثه.",
  },
  {
    titleEn: "Wrap-Up & Fun Homework",
    titleAr: "الختام والواجب الممتع",
    descEn: "The session closes with a brief summary of what was learned, a star reward for effort, and a fun take-home activity — a coloring sheet, word search, or voice recording challenge — to keep Arabic alive between sessions.",
    descAr: "تختتم الجلسة بملخص موجز لما تم تعلمه ونجمة مكافأة للجهد ونشاط منزلي ممتع — ورقة تلوين أو بحث عن كلمات أو تحدي تسجيل صوتي — للحفاظ على العربية حية بين الجلسات.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "Child refuses to attend Arabic class",
    problemAr: "الطفل يرفض حضور درس العربية",
    solutionEn: "Our teachers are trained child engagement specialists. They build personal rapport through games, humor, and reward systems. Most reluctant learners become enthusiastic within the first few sessions once they see Arabic as play, not work.",
    solutionAr: "معلمونا متخصصون مدربون في إشراك الأطفال. يبنون علاقة شخصية من خلال الألعاب والفكاهة وأنظمة المكافآت. معظم المتعلمين المترددين يصبحون متحمسين خلال الجلسات الأولى.",
  },
  {
    problemEn: "Mixing up similar-looking Arabic letters",
    problemAr: "الخلط بين الحروف العربية المتشابهة",
    solutionEn: "We use a color-coded letter family system: letters that share the same base shape are grouped and taught together with distinct visual cues. Physical movement activities (air-writing, clapping patterns) reinforce the differences kinesthetically.",
    solutionAr: "نستخدم نظام عائلات الحروف المرمز بالألوان: الحروف ذات الشكل الأساسي المشترك تُجمع وتُدرّس معاً مع إشارات بصرية مميزة. أنشطة الحركة الجسدية تعزز الفروقات حركياً.",
  },
  {
    problemEn: "Child can read Arabic letters but not full words",
    problemAr: "الطفل يقرأ الحروف لكن ليس الكلمات الكاملة",
    solutionEn: "We bridge letter-to-word reading through systematic blending exercises. Starting with two-letter combinations, then three-letter words, gradually building to full sentences. Decodable Arabic mini-books provide satisfying independent reading practice.",
    solutionAr: "نسد الفجوة بين قراءة الحروف والكلمات من خلال تمارين مزج منهجية. نبدأ بتركيبات من حرفين ثم كلمات من ثلاثة أحرف وصولاً للجمل الكاملة تدريجياً.",
  },
  {
    problemEn: "Short attention span during online classes",
    problemAr: "مدة انتباه قصيرة أثناء الدروس أونلاين",
    solutionEn: "Our lessons are intentionally segmented into bite-sized activities that change every few minutes. Teachers use digital props, screen-sharing games, and movement breaks. Session duration is matched to age: shorter for younger children, gradually longer for older ones.",
    solutionAr: "دروسنا مقسمة عمداً إلى أنشطة صغيرة تتغير كل بضع دقائق. يستخدم المعلمون أدوات رقمية وألعاب مشاركة الشاشة واستراحات حركية. مدة الجلسة مطابقة للعمر.",
  },
  {
    problemEn: "No Arabic-speaking environment at home",
    problemAr: "عدم وجود بيئة ناطقة بالعربية في المنزل",
    solutionEn: "We provide parents with simple Arabic activities, labeled household item stickers, and curated Arabic YouTube channels and apps. Our weekly vocabulary lists come with audio recordings so the whole family can practice together even with zero Arabic background.",
    solutionAr: "نزود الآباء بأنشطة عربية بسيطة وملصقات أدوات المنزل وقنوات يوتيوب عربية مختارة. قوائم المفردات الأسبوعية مع تسجيلات صوتية ليتدرب الجميع معاً حتى بدون خلفية عربية.",
  },
];

const CURRICULUM_WEEKS: CurriculumWeek[] = [
  {
    weekEn: "Phase 1",
    weekAr: "المرحلة 1",
    topicEn: "Arabic Alphabet & Sounds Mastery",
    topicAr: "إتقان الحروف العربية وأصواتها",
    detailsEn: ["All 28 Arabic letters with correct pronunciation", "Letter forms: isolated, initial, medial, final", "Short vowels (Fathah, Dammah, Kasrah)", "Letter recognition speed games"],
    detailsAr: ["جميع الحروف العربية الـ 28 بالنطق الصحيح", "أشكال الحروف: مفردة، أول، وسط، آخر", "الحركات القصيرة (فتحة، ضمة، كسرة)", "ألعاب سرعة التعرف على الحروف"],
  },
  {
    weekEn: "Phase 2",
    weekAr: "المرحلة 2",
    topicEn: "Blending Letters & Reading First Words",
    topicAr: "مزج الحروف وقراءة الكلمات الأولى",
    detailsEn: ["Two-letter and three-letter word reading", "Tanween and Sukoon introduction", "Building first Arabic vocabulary bank (100+ words)", "Simple reading comprehension activities"],
    detailsAr: ["قراءة كلمات من حرفين وثلاثة أحرف", "تقديم التنوين والسكون", "بناء أول بنك مفردات عربية (100+ كلمة)", "أنشطة فهم قرائي بسيطة"],
  },
  {
    weekEn: "Phase 3",
    weekAr: "المرحلة 3",
    topicEn: "Sentence Building & Conversation",
    topicAr: "بناء الجمل والمحادثة",
    detailsEn: ["Simple sentence construction", "Daily expressions and greetings", "Question-and-answer practice", "Role-playing everyday scenarios in Arabic"],
    detailsAr: ["تركيب جمل بسيطة", "التعبيرات والتحيات اليومية", "تدريب السؤال والجواب", "تمثيل أدوار سيناريوهات يومية بالعربية"],
  },
  {
    weekEn: "Phase 4",
    weekAr: "المرحلة 4",
    topicEn: "Arabic Writing & Creative Expression",
    topicAr: "الكتابة العربية والتعبير الإبداعي",
    detailsEn: ["Letter and word writing practice", "Copying short sentences and Duas", "Creative writing: simple stories and descriptions", "Arabic journaling for older children"],
    detailsAr: ["تدريب كتابة الحروف والكلمات", "نسخ جمل قصيرة وأدعية", "الكتابة الإبداعية: قصص بسيطة وأوصاف", "كتابة يوميات بالعربية للأطفال الأكبر"],
  },
  {
    weekEn: "Phase 5",
    weekAr: "المرحلة 5",
    topicEn: "Grammar Foundations & Reading Fluency",
    topicAr: "أساسيات القواعد وطلاقة القراءة",
    detailsEn: ["Basic Arabic grammar concepts (noun, verb, adjective)", "Reading longer texts with comprehension", "Vocabulary expansion through themed units", "Introduction to Quranic Arabic vocabulary"],
    detailsAr: ["مفاهيم القواعد العربية الأساسية (اسم، فعل، صفة)", "قراءة نصوص أطول مع الفهم", "توسيع المفردات من خلال وحدات موضوعية", "مقدمة لمفردات القرآن العربية"],
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    featureEn: "Teaching Approach",
    featureAr: "أسلوب التدريس",
    usEn: "Game-based learning with songs, stories, and rewards tailored to each child's personality",
    usAr: "تعلم قائم على الألعاب مع أناشيد وقصص ومكافآت مصممة لشخصية كل طفل",
    othersEn: "Traditional textbook-heavy methods that bore young learners",
    othersAr: "أساليب تقليدية مبنية على الكتب تمل المتعلمين الصغار",
  },
  {
    featureEn: "Teacher Specialization",
    featureAr: "تخصص المعلم",
    usEn: "Native Arabic teachers specifically trained in child education and engagement techniques",
    usAr: "معلمون عرب أصليون مدربون خصيصاً على تعليم الأطفال وتقنيات الإشراك",
    othersEn: "General Arabic teachers not specialized in children's education",
    othersAr: "معلمون عربيون عامون غير متخصصين في تعليم الأطفال",
  },
  {
    featureEn: "Parent Involvement",
    featureAr: "مشاركة الآباء",
    usEn: "Regular progress reports, family activities, and parent tips for reinforcing Arabic at home",
    usAr: "تقارير تقدم منتظمة وأنشطة عائلية ونصائح للآباء لتعزيز العربية في المنزل",
    othersEn: "Minimal or no parent communication between classes",
    othersAr: "تواصل محدود أو معدوم مع الآباء بين الدروس",
  },
  {
    featureEn: "Session Flexibility",
    featureAr: "مرونة الجلسات",
    usEn: "Age-adjusted session length — shorter for younger children, longer as they grow",
    usAr: "مدة جلسات مُعدّلة حسب العمر — أقصر للأطفال الأصغر وأطول كلما كبروا",
    othersEn: "Fixed class duration regardless of the child's age or attention span",
    othersAr: "مدة درس ثابتة بغض النظر عن عمر الطفل أو مدة انتباهه",
  },
  {
    featureEn: "Curriculum Design",
    featureAr: "تصميم المنهج",
    usEn: "Based on 'Al-Arabiyyah Bayna Yadayk' adapted for children with supplementary games and cultural content",
    usAr: "مبني على 'العربية بين يديك' مكيف للأطفال مع ألعاب ومحتوى ثقافي إضافي",
    othersEn: "Generic or outdated materials not designed for non-native children",
    othersAr: "مواد عامة أو قديمة غير مصممة للأطفال غير الناطقين بالعربية",
  },
];

const ArabicForKids = () => (
  <ServicePageLayout
    seoTitle="Arabic Classes for Kids Online | Learn Arabic for Children | Alhamd Academy"
    seoDescription="Fun and engaging Arabic classes for kids online. Native Arabic teachers teach reading, writing, speaking, and grammar. Arabic learning program for children ages 4-16. Free trial class."
    seoKeywords="arabic classes for kids, learn arabic for kids online, arabic lessons for children, arabic tutor for kids, arabic classes for kids online, learn arabic for kids beginners, arabic learning program for children, arabic for kids, arabic language for children, arabic classes online for kids, arabic reading for kids, arabic writing for kids, teach kids arabic"
    canonical="https://alhamdacademy.net/arabic-for-kids"
    heroTitleEn="Arabic Classes for Kids Online — Fun, Interactive & Effective"
    heroTitleAr="دروس العربية للأطفال أونلاين — ممتعة وتفاعلية وفعالة"
    heroSubtitleEn="Help Your Children Learn Arabic Online with Native-Speaking Teachers"
    heroSubtitleAr="ساعد أطفالك على تعلم العربية أونلاين مع معلمين أصليين"
    heroDescEn="Give your children the gift of Arabic language! Our specialized Arabic classes for kids are designed to be fun, interactive, and age-appropriate. Native Arabic tutors for kids from Egypt use proven methods including games, stories, and visual aids to help children aged 4-16 learn Arabic reading, writing, speaking, and grammar naturally."
    heroDescAr="امنح أطفالك هدية اللغة العربية! دروسنا المتخصصة للأطفال مصممة لتكون ممتعة وتفاعلية ومناسبة للعمر. معلمون عرب أصليون يستخدمون طرقاً مثبتة لمساعدة الأطفال من 4-16 سنة على تعلم العربية."
    aboutTitleEn="Why Arabic Language Education Matters for Your Kids"
    aboutTitleAr="لماذا تعليم اللغة العربية مهم لأطفالك"
    aboutContentEn={[
      "Arabic is one of the most spoken languages in the world, with over 400 million speakers. For Muslim families, Arabic is essential for understanding the Quran, daily prayers, and Islamic traditions. Enrolling your children in Arabic classes for kids online opens doors to both spiritual growth and cultural connection.",
      "At Alhamd Academy, we understand that children learn differently from adults. That's why our Arabic lessons for children are specifically designed with child-friendly teaching methods that make learning Arabic for kids enjoyable rather than a chore. Our dedicated Arabic tutors for kids know how to keep young learners engaged.",
      "Our Arabic learning program for children is based on the renowned 'Al-Arabiyyah Bayna Yadayk' (Arabic Between Your Hands) series, adapted for younger learners. This comprehensive program covers all four language skills: Arabic reading, writing, listening, and speaking.",
      "Research shows that children who learn a second language at an early age develop better cognitive abilities, including improved memory, problem-solving skills, and creativity. By enrolling your child in our Arabic classes for kids online, you're investing in their intellectual development alongside their cultural and spiritual growth.",
      "Our Arabic teachers for kids are specially trained to work with children. They know how to keep young learners engaged, motivated, and excited about learning Arabic. Using games, songs, stories, and interactive activities, they create a positive learning environment where children thrive.",
    ]}
    aboutContentAr={[
      "العربية من أكثر اللغات تحدثاً في العالم. للعائلات المسلمة، العربية ضرورية لفهم القرآن والصلوات اليومية. تسجيل أطفالك في دروس العربية أونلاين يفتح أبواباً للنمو الروحي والتواصل الثقافي.",
      "في أكاديمية الحمد، نفهم أن الأطفال يتعلمون بشكل مختلف عن الكبار. لذلك دروسنا للأطفال مصممة خصيصاً بطرق تعليم ملائمة تجعل تعلم العربية ممتعاً.",
      "برنامجنا لتعليم العربية للأطفال مبني على سلسلة 'العربية بين يديك' الشهيرة، مكيفة للمتعلمين الأصغر سناً.",
      "تظهر الأبحاث أن الأطفال الذين يتعلمون لغة ثانية في سن مبكرة يطورون قدرات إدراكية أفضل. بتسجيل طفلك في دروسنا أنت تستثمر في تطوره الفكري.",
      "معلمونا المتخصصون في تعليم العربية للأطفال مدربون خصيصاً للعمل مع الأطفال باستخدام الألعاب والأناشيد والقصص.",
    ]}
    methodTitleEn="Our Child-Friendly Arabic Teaching Approach"
    methodTitleAr="نهجنا الصديق للأطفال في تدريس العربية"
    methodContentEn={[
      "Our teaching approach for Arabic classes for kids is built on the principle that children learn best when they're having fun. Each lesson includes a mix of structured Arabic learning and play-based activities.",
      "We use colorful visual aids, digital flashcards, Arabic songs, and interactive games to teach vocabulary and grammar concepts to kids. This multi-sensory approach helps children retain what they learn in their Arabic lessons.",
      "For younger children (ages 4-7), Arabic lessons focus heavily on oral communication, letter recognition, and building basic vocabulary through repetition and play. For older children (ages 8-16), we gradually introduce Arabic reading, writing, and grammar with more structured exercises.",
      "Parents receive regular updates on their child's progress in Arabic classes, including areas of strength and areas that need more practice. We also provide fun homework activities that families can do together to reinforce Arabic learning at home.",
    ]}
    methodContentAr={[
      "نهجنا التعليمي لدروس العربية للأطفال مبني على مبدأ أن الأطفال يتعلمون أفضل عندما يستمتعون.",
      "نستخدم وسائل بصرية ملونة وبطاقات رقمية وأناشيد عربية وألعاب تفاعلية لتعليم المفردات والقواعد للأطفال.",
      "للأطفال الأصغر (4-7)، تركز الدروس على التواصل الشفهي والتعرف على الحروف. للأكبر (8-16)، نقدم القراءة والكتابة والقواعد العربية تدريجياً.",
      "يحصل الآباء على تحديثات منتظمة عن تقدم أطفالهم في دروس العربية مع أنشطة منزلية ممتعة.",
    ]}
    levels={[
      {
        titleEn: "Little Learners (Ages 4-7) — Arabic for Kids Beginners",
        titleAr: "المتعلمون الصغار (4-7 سنوات) — العربية للأطفال المبتدئين",
        descEn: "Fun introduction to Arabic language for kids through play, songs, and stories. Perfect for children learning Arabic for the first time.",
        descAr: "مقدمة ممتعة للغة العربية للأطفال من خلال اللعب والأناشيد والقصص.",
        topicsEn: ["Arabic alphabet recognition & sounds", "Colors, numbers, and basic vocabulary", "Simple greetings and phrases", "Arabic songs and rhymes", "Letter tracing and formation"],
        topicsAr: ["تعرف الحروف العربية وأصواتها", "الألوان والأرقام والمفردات الأساسية", "التحيات والعبارات البسيطة", "الأناشيد العربية", "تتبع وتكوين الحروف"],
      },
      {
        titleEn: "Young Readers (Ages 8-12) — Arabic Reading & Writing for Kids",
        titleAr: "القراء الشباب (8-12 سنة) — القراءة والكتابة العربية للأطفال",
        descEn: "Building Arabic reading, writing, and conversation skills with structured Arabic lessons for children in this age group.",
        descAr: "بناء مهارات القراءة والكتابة والمحادثة بالعربية بدروس منظمة.",
        topicsEn: ["Reading and writing Arabic words", "Basic grammar (sentence structure)", "Expanding Arabic vocabulary", "Simple conversations in Arabic", "Short stories and comprehension"],
        topicsAr: ["قراءة وكتابة الكلمات العربية", "القواعد الأساسية (بنية الجملة)", "توسيع المفردات العربية", "محادثات بسيطة بالعربية", "قصص قصيرة والفهم"],
      },
      {
        titleEn: "Teen Arabic (Ages 13-16) — Advanced Arabic for Kids",
        titleAr: "عربية المراهقين (13-16 سنة) — العربية المتقدمة للأطفال",
        descEn: "Advanced Arabic skills including grammar, composition, and fluent conversation in Arabic for older children and teenagers.",
        descAr: "مهارات عربية متقدمة تشمل القواعد والتعبير والمحادثة الطليقة للمراهقين.",
        topicsEn: ["Intermediate grammar (Nahw & Sarf)", "Essay writing and composition", "Fluent conversation practice", "Arabic literature exposure", "Quran Arabic vocabulary"],
        topicsAr: ["القواعد المتوسطة (النحو والصرف)", "كتابة المقالات والتعبير", "تدريب المحادثة الطليقة", "التعرض للأدب العربي", "مفردات القرآن العربية"],
      },
    ]}
    outcomesEn={[
      "Read and write Arabic letters, words, and sentences confidently",
      "Hold basic to intermediate conversations in Arabic",
      "Understand Arabic grammar fundamentals appropriate for their age",
      "Connect with their Islamic heritage through the Arabic language",
      "Build Arabic vocabulary for everyday situations and Quran understanding",
      "Develop confidence in using Arabic in various contexts",
    ]}
    outcomesAr={[
      "قراءة وكتابة الحروف والكلمات والجمل العربية بثقة",
      "إجراء محادثات أساسية إلى متوسطة بالعربية",
      "فهم أساسيات القواعد العربية المناسبة لعمرهم",
      "التواصل مع تراثهم الإسلامي من خلال اللغة العربية",
      "بناء مفردات عربية للمواقف اليومية وفهم القرآن",
      "تطوير الثقة في استخدام العربية",
    ]}
    featuresEn={[
      "Age-appropriate Arabic curriculum designed specifically for children",
      "Native Arabic tutors for kids trained in child education methods",
      "Fun, interactive Arabic lessons with games, songs, and visual aids",
      "One-on-one attention ensuring your child progresses at their pace",
      "Regular progress reports sent to parents about their Arabic learning",
      "Flexible scheduling to accommodate school timetables",
      "Both male and female Arabic teachers for kids available",
      "Free trial Arabic class to see if your child enjoys the program",
    ]}
    featuresAr={[
      "منهج عربي مناسب للعمر مصمم خصيصاً للأطفال",
      "معلمون عرب أصليون مدربون على أساليب تعليم الأطفال",
      "دروس عربية ممتعة وتفاعلية مع ألعاب وأناشيد ووسائل بصرية",
      "اهتمام فردي يضمن تقدم طفلك بسرعته",
      "تقارير تقدم منتظمة ترسل للآباء عن تعلم العربية",
      "مواعيد مرنة تتوافق مع جداول المدرسة",
      "معلمون ومعلمات عربية للأطفال متاحون",
      "حصة عربية تجريبية مجانية لترى إن كان طفلك يستمتع",
    ]}
    faqs={[
      { questionEn: "What age can my child start Arabic classes for kids?", questionAr: "من أي عمر يمكن لطفلي بدء دروس العربية؟", answerEn: "We accept children from age 4 and above in our Arabic classes for kids online. For very young children (4-5), Arabic lessons are shorter and highly interactive with lots of games and songs to keep them engaged.", answerAr: "نقبل الأطفال من سن 4 سنوات في دروسنا. للأطفال الصغار جداً (4-5)، تكون الدروس أقصر وتفاعلية جداً." },
      { questionEn: "My child doesn't know any Arabic. Can they still learn Arabic online?", questionAr: "طفلي لا يعرف أي عربية. هل يمكنه التعلم أونلاين؟", answerEn: "Absolutely! Most students in our Arabic classes for kids beginners start with zero Arabic knowledge. Our Arabic tutors for kids are experienced in teaching Arabic as a foreign language to children and will start from the very basics.", answerAr: "بالتأكيد! معظم طلابنا في دروس العربية للأطفال المبتدئين يبدأون بدون معرفة. معلمونا ذوو خبرة في تدريس العربية كلغة أجنبية للأطفال." },
      { questionEn: "How do you keep kids engaged in online Arabic classes?", questionAr: "كيف تحافظون على تفاعل الأطفال في الدروس أونلاين؟", answerEn: "Our Arabic teachers for kids use a variety of engagement techniques: interactive games, colorful digital flashcards, Arabic songs and rhymes, storytelling, reward systems with stars and stickers, and age-adjusted session lengths. The key is that every few minutes the activity changes, keeping the child's attention fresh.", answerAr: "معلمونا يستخدمون تقنيات متنوعة: ألعاب تفاعلية وبطاقات رقمية ملونة وأناشيد وقصص ونظام مكافآت. المفتاح هو تغيير النشاط كل بضع دقائق." },
      { questionEn: "What curriculum do you use for Arabic classes for kids?", questionAr: "ما المنهج الذي تستخدمونه لدروس العربية للأطفال؟", answerEn: "We use a customized Arabic learning program for children based on 'Al-Arabiyyah Bayna Yadayk' and other child-friendly resources. The curriculum is adapted for each age group to ensure age-appropriate content and progression.", answerAr: "نستخدم برنامج تعليم عربي مخصص للأطفال مبنياً على 'العربية بين يديك' وموارد أخرى ملائمة للأطفال." },
      { questionEn: "Can my child learn Arabic and Quran at the same time?", questionAr: "هل يمكن لطفلي تعلم العربية والقرآن في نفس الوقت؟", answerEn: "Yes! We offer an All-in-One package where kids can combine Arabic language learning with online Quran classes. This is actually very effective as Arabic language skills enhance Quran understanding and vice versa.", answerAr: "نعم! نقدم حزمة شاملة يمكن فيها للأطفال الجمع بين تعلم اللغة العربية ودروس القرآن أونلاين. هذا فعال جداً." },
    ]}
    testimonials={[
      { name: "Mariam L.", country: "Canada", textEn: "My 6-year-old daughter absolutely loves her Arabic classes for kids! The Arabic tutor makes everything so fun with games and songs. She's already reading Arabic words and making amazing progress!", textAr: "ابنتي ذات الـ 6 سنوات تحب دروس العربية للأطفال تماماً! المعلمة تجعل كل شيء ممتعاً. بدأت تقرأ كلمات عربية!", rating: 5 },
      { name: "Hassan J.", country: "Australia", textEn: "We tried several Arabic learning programs for children but none kept them interested until Alhamd Academy. The one-on-one Arabic classes for kids online and the teacher's patience made all the difference.", textAr: "جربنا عدة برامج تعليم عربية للأطفال لكن لم يبق أي منها مهتماً حتى أكاديمية الحمد.", rating: 5 },
    ]}
    relatedPages={RELATED}
    audiencePersonas={AUDIENCE_PERSONAS}
    classSteps={CLASS_STEPS}
    challenges={CHALLENGES}
    curriculum={CURRICULUM_WEEKS}
    comparisonRows={COMPARISON_ROWS}
    audienceTitleEn="Who Are Our Arabic Classes for Kids Designed For?"
    audienceTitleAr="لمن صُممت دروس العربية للأطفال؟"
    classSessionTitleEn="What Happens in a Typical Kids' Arabic Session"
    classSessionTitleAr="ماذا يحدث في جلسة عربية نموذجية للأطفال"
    challengesTitleEn="Common Arabic Learning Struggles — And How We Solve Them"
    challengesTitleAr="تحديات تعلم العربية الشائعة — وكيف نحلها"
    curriculumTitleEn="Your Child's Arabic Learning Journey"
    curriculumTitleAr="رحلة تعلم طفلك للعربية"
    comparisonTitleEn="Alhamd Academy vs Other Arabic Programs for Kids"
    comparisonTitleAr="أكاديمية الحمد مقابل برامج العربية الأخرى للأطفال"
    midCtaTitleEn="Give Your Child the Gift of Arabic — Try a Free Class"
    midCtaTitleAr="امنح طفلك هدية العربية — جرّب حصة مجانية"
    midCtaDescEn="Fun session • Kid-friendly teacher • Zero obligation"
    midCtaDescAr="جلسة ممتعة • معلم ملائم للأطفال • بدون التزام"
    levelsTitleEn="Arabic Learning Path by Age Group"
    levelsTitleAr="مسار تعلم العربية حسب الفئة العمرية"
    outcomesTitleEn="What Your Child Will Learn in Arabic Class"
    outcomesTitleAr="ما سيتعلمه طفلك في حصة العربية"
    whyChooseTitleEn="Why Parents Trust Us for Their Kids' Arabic Education?"
    whyChooseTitleAr="لماذا يثق الآباء بنا في تعليم أطفالهم العربية؟"
    testimonialsTitleEn="Parents Share Their Kids' Arabic Progress"
    testimonialsTitleAr="الآباء يشاركون تقدم أطفالهم في العربية"
    faqTitleEn="Arabic Classes for Kids — Parent Questions"
    faqTitleAr="دروس العربية للأطفال — أسئلة الآباء"
    ctaTitleEn="Help Your Child Fall in Love with Arabic"
    ctaTitleAr="ساعد طفلك على حب اللغة العربية"
    ctaDescEn="Our fun, interactive Arabic classes make learning natural for kids. Try a free class today!"
    ctaDescAr="دروسنا الممتعة والتفاعلية تجعل تعلم العربية طبيعياً للأطفال. جرّب حصة مجانية اليوم!"
    ctaButtonEn="Book Kids' Free Arabic Class"
    ctaButtonAr="احجز حصة عربية مجانية للأطفال"
    relatedTitleEn="More Learning Opportunities for Your Family"
    relatedTitleAr="فرص تعلم أكثر لعائلتك"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Arabic Classes for Kids Online",
      description: "Fun and engaging Arabic classes for kids online with native Arabic teachers. Arabic learning program for children ages 4-16.",
      provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
      educationalLevel: ["Ages 4-7", "Ages 8-12", "Ages 13-16"],
      inLanguage: ["en", "ar"],
      offers: { "@type": "Offer", price: "6", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, bestRating: 5, ratingCount: 100 },
    }}
  />
);

export default ArabicForKids;
