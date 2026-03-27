import { Baby, BookOpen, GraduationCap, Heart, Globe, UserCheck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { AudiencePersona, ClassStep, Challenge, CurriculumWeek, ComparisonRow } from "@/components/ServicePageLayout";

const RELATED = [
  { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
  { titleEn: "Tajweed Course Online", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
  { titleEn: "Arabic Classes for Kids", titleAr: "العربية للأطفال", href: "/arabic-for-kids" },
  { titleEn: "Learn Arabic Online", titleAr: "تعلم العربية", href: "/arabic-for-adults" },
  { titleEn: "Ijazah Program Online", titleAr: "برنامج الإجازة", href: "/ijazah-program" },
  { titleEn: "Free Trial Class", titleAr: "حصة مجانية", href: "/free-trial" },
];

const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    icon: Baby,
    titleEn: "Muslim Children Building Their Islamic Identity",
    titleAr: "الأطفال المسلمون الذين يبنون هويتهم الإسلامية",
    descEn: "Your child is growing up in a non-Muslim environment and you want them to understand their faith deeply. Our kids' Islamic studies program teaches the Five Pillars, Prophets' stories, daily Duas, and Islamic manners in an engaging, age-appropriate way that makes Islam feel natural and joyful.",
    descAr: "طفلك ينشأ في بيئة غير مسلمة وتريده أن يفهم دينه بعمق. برنامجنا للأطفال يعلم أركان الإسلام وقصص الأنبياء والأدعية والآداب بطريقة ممتعة ومناسبة للعمر.",
  },
  {
    icon: Heart,
    titleEn: "New Muslims (Reverts) Starting from Scratch",
    titleAr: "المسلمون الجدد الذين يبدأون من الصفر",
    descEn: "You've embraced Islam and need structured, authentic guidance on the basics — how to pray, what to believe, what's obligatory vs recommended. Our beginner Islamic studies track provides a welcoming, patient learning environment with zero assumptions about prior knowledge.",
    descAr: "اعتنقت الإسلام وتحتاج إرشاداً منظماً وأصيلاً في الأساسيات — كيف تصلي، ماذا تعتقد، ما الواجب وما المستحب. مسارنا للمبتدئين يوفر بيئة تعلم مرحبة وصبورة بدون افتراضات.",
  },
  {
    icon: GraduationCap,
    titleEn: "Adults Seeking Deeper Islamic Knowledge",
    titleAr: "البالغون الباحثون عن معرفة إسلامية أعمق",
    descEn: "You know the basics of Islam but want to study Fiqh in detail, understand Tafseer methodology, or explore Hadith sciences. Our intermediate and advanced Islamic studies tracks provide scholarly depth with practical application to modern life questions.",
    descAr: "تعرف أساسيات الإسلام لكنك تريد دراسة الفقه بالتفصيل أو فهم منهجية التفسير أو استكشاف علوم الحديث. مساراتنا المتوسطة والمتقدمة توفر عمقاً علمياً مع تطبيق عملي.",
  },
  {
    icon: Globe,
    titleEn: "Muslim Families in the West",
    titleAr: "العائلات المسلمة في الغرب",
    descEn: "You live far from a mosque or Islamic center and want reliable, authentic Islamic education for your family. Our online Islamic studies program brings qualified Al-Azhar scholars directly to your home, ensuring consistent and credible Islamic learning regardless of your location.",
    descAr: "تعيش بعيداً عن مسجد أو مركز إسلامي وتريد تعليماً إسلامياً موثوقاً لعائلتك. برنامجنا يجلب علماء الأزهر مباشرة إلى منزلك لضمان تعلم إسلامي مستمر وموثوق.",
  },
  {
    icon: BookOpen,
    titleEn: "Parents Wanting to Teach Their Kids Islam",
    titleAr: "الآباء الراغبون في تعليم أطفالهم الإسلام",
    descEn: "You want your children to learn Islam properly but don't feel confident teaching it yourself. Our Islamic studies for kids provides the structured curriculum and qualified scholars you need, while keeping you informed about what your child is learning so you can reinforce it at home.",
    descAr: "تريد أن يتعلم أطفالك الإسلام بشكل صحيح لكنك لا تشعر بالثقة لتعليمهم بنفسك. برنامجنا يوفر المنهج المنظم والعلماء المؤهلين مع إطلاعك على ما يتعلمه طفلك.",
  },
  {
    icon: UserCheck,
    titleEn: "Islamic Studies Students Preparing for Scholarship",
    titleAr: "طلاب الدراسات الإسلامية المستعدون للبحث العلمي",
    descEn: "You aspire to become an Islamic scholar, Da'iyah, or community leader. Our advanced track covers Usool al-Fiqh, Mustalah al-Hadith, advanced Tafseer, and Da'wah methodology to prepare you for serious Islamic scholarship and community service.",
    descAr: "تطمح لتصبح عالماً إسلامياً أو داعية أو قائداً مجتمعياً. مسارنا المتقدم يغطي أصول الفقه ومصطلح الحديث والتفسير المتقدم ومنهجية الدعوة.",
  },
];

const CLASS_STEPS: ClassStep[] = [
  {
    titleEn: "Opening Du'a & Previous Review",
    titleAr: "دعاء الافتتاح ومراجعة سابقة",
    descEn: "Each session begins with a relevant Du'a, setting the spiritual tone for learning. Then the teacher reviews key points from the previous lesson through Q&A, ensuring foundational concepts are solid before building on them.",
    descAr: "كل جلسة تبدأ بدعاء ذي صلة لضبط النبرة الروحية للتعلم. ثم يراجع المعلم النقاط الرئيسية من الدرس السابق من خلال سؤال وجواب.",
  },
  {
    titleEn: "Topic Presentation with Evidences",
    titleAr: "عرض الموضوع بالأدلة",
    descEn: "The scholar presents the day's Islamic topic with direct references to Quran verses and authentic Hadiths. Every ruling, belief, or historical event is grounded in primary sources — students learn not just what Islam teaches, but where each teaching comes from.",
    descAr: "يعرض العالم موضوع اليوم الإسلامي بإشارات مباشرة لآيات القرآن والأحاديث الصحيحة. كل حكم أو عقيدة أو حدث تاريخي مبني على المصادر الأولية.",
  },
  {
    titleEn: "Discussion & Real-Life Application",
    titleAr: "مناقشة وتطبيق على الحياة الواقعية",
    descEn: "Students engage in guided discussion about how the Islamic principle applies to modern life. For kids, this might be 'How do we practice Sabr at school?' For adults, it could be 'How does this Fiqh ruling apply to digital transactions?'",
    descAr: "يشارك الطلاب في نقاش موجه حول كيفية تطبيق المبدأ الإسلامي في الحياة الحديثة. للأطفال قد يكون 'كيف نمارس الصبر في المدرسة؟' للكبار 'كيف ينطبق هذا الحكم على المعاملات الرقمية؟'",
  },
  {
    titleEn: "Interactive Activity or Case Study",
    titleAr: "نشاط تفاعلي أو دراسة حالة",
    descEn: "For children: storytelling, Islamic quiz games, or creative projects (drawing the journey of Hajj, for example). For adults: case studies examining real-world scenarios through the lens of Islamic jurisprudence and ethics.",
    descAr: "للأطفال: رواية القصص أو مسابقات إسلامية أو مشاريع إبداعية. للكبار: دراسات حالة تفحص سيناريوهات واقعية من خلال عدسة الفقه والأخلاق الإسلامية.",
  },
  {
    titleEn: "Key Takeaways & Action Points",
    titleAr: "النقاط الرئيسية وخطوات العمل",
    descEn: "Every session ends with clear, actionable takeaways the student can implement immediately — a Sunnah to practice, a Du'a to memorize, a Fiqh ruling to apply. This transforms knowledge into daily ibadah and character improvement.",
    descAr: "كل جلسة تنتهي بنقاط واضحة وقابلة للتنفيذ — سنة للممارسة أو دعاء للحفظ أو حكم فقهي للتطبيق. هذا يحول المعرفة إلى عبادة يومية وتحسين للأخلاق.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    problemEn: "Overwhelmed by the breadth of Islamic sciences",
    problemAr: "الشعور بالإرهاق من اتساع العلوم الإسلامية",
    solutionEn: "Our structured curriculum breaks Islamic knowledge into a logical sequence: we start with essential Aqeedah and Fiqh of worship, then expand to Seerah, Hadith, and advanced sciences. You never feel lost because each topic builds naturally on what you've already learned.",
    solutionAr: "منهجنا المنظم يقسم المعرفة الإسلامية إلى تسلسل منطقي: نبدأ بالعقيدة الأساسية وفقه العبادات ثم نتوسع للسيرة والحديث والعلوم المتقدمة. لن تشعر بالضياع لأن كل موضوع يبني على ما تعلمته.",
  },
  {
    problemEn: "Conflicting Islamic opinions causing confusion",
    problemAr: "الآراء الإسلامية المتعارضة تسبب حيرة",
    solutionEn: "Our scholars follow Ahl al-Sunnah wal-Jama'ah methodology and present the strongest evidence-based positions. When legitimate scholarly differences exist, we explain the different views respectfully and help you understand the evidences, empowering you to follow knowledge rather than confusion.",
    solutionAr: "علماؤنا يتبعون منهج أهل السنة والجماعة ويقدمون أقوى المواقف المبنية على الأدلة. عند وجود خلافات علمية مشروعة، نشرح الآراء المختلفة باحترام ونساعدك على فهم الأدلة.",
  },
  {
    problemEn: "Children finding Islamic lessons boring",
    problemAr: "الأطفال يجدون الدروس الإسلامية مملة",
    solutionEn: "Our kids' Islamic studies transform dry topics into captivating experiences. Prophets' stories become animated adventures, Fiqh of Salah becomes a step-by-step interactive demonstration, and Islamic manners are taught through role-playing scenarios that children find genuinely fun.",
    solutionAr: "دراساتنا الإسلامية للأطفال تحول المواضيع الجافة إلى تجارب جذابة. قصص الأنبياء تصبح مغامرات متحركة وفقه الصلاة يصبح عرضاً تفاعلياً والآداب تُدرّس من خلال تمثيل أدوار ممتع.",
  },
  {
    problemEn: "No local mosque or Islamic school available",
    problemAr: "عدم توفر مسجد أو مدرسة إسلامية محلية",
    solutionEn: "This is exactly why we built our online Islamic studies program. Students from rural areas, small towns, and countries with limited Islamic infrastructure get the same quality of Al-Azhar-trained scholars as students in Cairo — all from the comfort of home.",
    solutionAr: "هذا بالضبط سبب بنائنا لبرنامجنا أونلاين. الطلاب من المناطق الريفية والبلدات الصغيرة يحصلون على نفس جودة علماء الأزهر المدربين — من راحة المنزل.",
  },
  {
    problemEn: "Difficulty applying Islamic knowledge to modern challenges",
    problemAr: "صعوبة تطبيق المعرفة الإسلامية على التحديات الحديثة",
    solutionEn: "Our scholars specialize in bridging classical Islamic knowledge with contemporary realities. Sessions regularly address modern topics: Islamic perspectives on social media use, financial transactions, bioethics, and raising Muslim children in secular societies.",
    solutionAr: "علماؤنا متخصصون في ربط المعرفة الإسلامية الكلاسيكية بالواقع المعاصر. الجلسات تتناول بانتظام مواضيع حديثة: المنظور الإسلامي لوسائل التواصل والمعاملات المالية وتربية الأطفال.",
  },
];

const CURRICULUM_WEEKS: CurriculumWeek[] = [
  {
    weekEn: "Foundation",
    weekAr: "التأسيس",
    topicEn: "Islamic Essentials & Aqeedah Basics",
    topicAr: "أساسيات الإسلام والعقيدة",
    detailsEn: ["Six Pillars of Iman with detailed explanation", "Five Pillars of Islam — meaning and practice", "Tawheed categories: Rububiyyah, Uluhiyyah, Asma wa Sifat", "Common misconceptions in Aqeedah"],
    detailsAr: ["أركان الإيمان الستة بشرح مفصل", "أركان الإسلام الخمسة — المعنى والممارسة", "أقسام التوحيد: الربوبية والألوهية والأسماء والصفات", "المفاهيم الخاطئة الشائعة في العقيدة"],
  },
  {
    weekEn: "Worship",
    weekAr: "العبادات",
    topicEn: "Fiqh of Worship — Detailed Practice",
    topicAr: "فقه العبادات — الممارسة المفصلة",
    detailsEn: ["Taharah (purification): Wudu, Ghusl, Tayammum", "Salah: conditions, pillars, obligations, Sunnahs", "Fasting: rules, exemptions, voluntary fasts", "Zakat and Hajj fundamentals"],
    detailsAr: ["الطهارة: الوضوء والغسل والتيمم", "الصلاة: شروطها وأركانها وواجباتها وسننها", "الصيام: أحكامه واستثناءاته والصيام التطوعي", "أساسيات الزكاة والحج"],
  },
  {
    weekEn: "Prophetic Life",
    weekAr: "الحياة النبوية",
    topicEn: "Seerah — The Life of Prophet Muhammad ﷺ",
    topicAr: "السيرة — حياة النبي محمد ﷺ",
    detailsEn: ["Pre-Islamic Arabia and the birth of the Prophet ﷺ", "The Meccan period: Da'wah, persecution, and perseverance", "The Medinan period: building the Muslim community", "Key battles and treaties — leadership lessons"],
    detailsAr: ["الجزيرة العربية قبل الإسلام وولادة النبي ﷺ", "الفترة المكية: الدعوة والاضطهاد والصبر", "الفترة المدنية: بناء المجتمع المسلم", "الغزوات والمعاهدات الرئيسية — دروس القيادة"],
  },
  {
    weekEn: "Scripture",
    weekAr: "النص المقدس",
    topicEn: "Introduction to Tafseer & Hadith Sciences",
    topicAr: "مقدمة في التفسير وعلوم الحديث",
    detailsEn: ["Tafseer methodology and major Mufassireen", "Selected Surah analysis with context and lessons", "Hadith authentication: Sahih, Hasan, Da'if", "Major Hadith collections and their significance"],
    detailsAr: ["منهجية التفسير وأبرز المفسرين", "تحليل سور مختارة بالسياق والدروس", "تصحيح الأحاديث: صحيح وحسن وضعيف", "مجموعات الأحاديث الكبرى وأهميتها"],
  },
  {
    weekEn: "Advanced",
    weekAr: "المتقدم",
    topicEn: "Islamic Jurisprudence & Contemporary Issues",
    topicAr: "الفقه الإسلامي والقضايا المعاصرة",
    detailsEn: ["Usool al-Fiqh: principles of deriving rulings", "Comparative Fiqh across major schools of thought", "Contemporary Fiqh: digital transactions, bioethics, interfaith", "Da'wah methodology and community leadership"],
    detailsAr: ["أصول الفقه: مبادئ استنباط الأحكام", "الفقه المقارن عبر المذاهب الرئيسية", "الفقه المعاصر: المعاملات الرقمية والأخلاقيات الحيوية", "منهجية الدعوة وقيادة المجتمع"],
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    featureEn: "Scholar Credentials",
    featureAr: "مؤهلات العالم",
    usEn: "Al-Azhar graduates with formal Islamic studies degrees and teaching certifications",
    usAr: "خريجو الأزهر بشهادات رسمية في الدراسات الإسلامية وشهادات تدريس",
    othersEn: "Self-taught individuals or teachers without verified Islamic credentials",
    othersAr: "أفراد عصاميون أو معلمون بدون مؤهلات إسلامية موثقة",
  },
  {
    featureEn: "Methodology",
    featureAr: "المنهجية",
    usEn: "Ahl al-Sunnah wal-Jama'ah — evidence-based teaching from Quran and authentic Sunnah",
    usAr: "أهل السنة والجماعة — تعليم مبني على الأدلة من القرآن والسنة الصحيحة",
    othersEn: "Unclear methodology or biased toward a single sect without disclosure",
    othersAr: "منهجية غير واضحة أو منحازة لفرقة واحدة بدون إفصاح",
  },
  {
    featureEn: "Content Depth",
    featureAr: "عمق المحتوى",
    usEn: "Comprehensive coverage from Aqeedah to Usool al-Fiqh with primary source references",
    usAr: "تغطية شاملة من العقيدة إلى أصول الفقه مع إشارات للمصادر الأولية",
    othersEn: "Surface-level content focusing on basic rituals without scholarly depth",
    othersAr: "محتوى سطحي يركز على الطقوس الأساسية بدون عمق علمي",
  },
  {
    featureEn: "Age Appropriateness",
    featureAr: "ملاءمة العمر",
    usEn: "Separate curricula for kids, teens, and adults with age-specific teaching methods",
    usAr: "مناهج منفصلة للأطفال والمراهقين والكبار بأساليب تدريس خاصة بكل عمر",
    othersEn: "One-size-fits-all approach used for all age groups",
    othersAr: "نهج واحد يُستخدم لجميع الفئات العمرية",
  },
  {
    featureEn: "Modern Relevance",
    featureAr: "الصلة بالواقع المعاصر",
    usEn: "Regular discussion of contemporary issues through Islamic lens — social media, finance, parenting",
    usAr: "مناقشة منتظمة للقضايا المعاصرة من منظور إسلامي — التواصل الاجتماعي والمالية والتربية",
    othersEn: "Classical content only, disconnected from students' real-life questions",
    othersAr: "محتوى كلاسيكي فقط، منفصل عن أسئلة الطلاب الواقعية",
  },
];

const IslamicStudies = () => (
  <ServicePageLayout
    seoTitle="Islamic Studies Online for Kids & Adults | Learn Islam Online | Alhamd Academy"
    seoDescription="Comprehensive Islamic studies online: Fiqh, Aqeedah, Tafseer, Hadith, Seerah. Islamic classes online for kids and adults. Islamic studies for beginners. Free trial class."
    seoKeywords="islamic studies online, islamic classes online, learn islam online, islamic studies course, islamic studies for kids online, islamic classes for beginners, islamic learning program online, islamic education online, fiqh course online, aqeedah course, tafseer online, hadith studies, seerah course, islamic studies for adults, islamic school online"
    canonical="https://alhamdacademy.net/islamic-studies-online"
    heroTitleEn="Islamic Studies Online — Learn Islam Online for Kids & Adults"
    heroTitleAr="الدراسات الإسلامية أونلاين — تعلم الإسلام للأطفال والكبار"
    heroSubtitleEn="Learn Fiqh, Aqeedah, Tafseer, Hadith & Seerah with Qualified Scholars"
    heroSubtitleAr="تعلم الفقه والعقيدة والتفسير والحديث والسيرة مع علماء مؤهلين"
    heroDescEn="Build a strong Islamic foundation with our comprehensive Islamic studies online program. From basic Islamic knowledge for kids in our Islamic classes for beginners, to advanced Fiqh and Tafseer for adults, our qualified Islamic scholars provide authentic, evidence-based Islamic education that strengthens your faith and practice."
    heroDescAr="ابنِ أساساً إسلامياً قوياً مع برنامج الدراسات الإسلامية أونلاين الشامل. من المعرفة الإسلامية الأساسية للأطفال في دروسنا للمبتدئين إلى الفقه والتفسير المتقدم للكبار."
    aboutTitleEn="Why Every Muslim Needs Islamic Studies Online — Who Is This For?"
    aboutTitleAr="لماذا كل مسلم يحتاج الدراسات الإسلامية أونلاين — لمن هذا؟"
    aboutContentEn={[
      "In an increasingly complex world, having a solid understanding of Islamic principles is essential. Our Islamic studies online program provides the knowledge needed to practice Islam correctly and raise children with strong Islamic values — whether you're looking for Islamic classes for beginners or advanced Islamic studies.",
      "At Alhamd Academy, our Islamic studies course is designed to provide comprehensive, authentic Islamic education based on the Quran and Sunnah. Whether you want to learn Islam online from scratch or deepen your existing knowledge, our scholars follow the methodology of Ahl al-Sunnah wal-Jama'ah.",
      "For children, our Islamic studies for kids online program lays the foundation for a lifelong connection with their faith. Our kids' Islamic classes cover the Five Pillars of Islam, stories of the Prophets, daily Duas, Islamic manners (Adab), and basic Fiqh in an engaging, age-appropriate way.",
      "For adults, our Islamic classes online offer in-depth study of Islamic sciences including Fiqh (jurisprudence), Aqeedah (creed), Tafseer (Quran interpretation), Hadith sciences, and Seerah (Prophetic biography). Each Islamic studies course is designed to deepen understanding and strengthen practice.",
      "Our Islamic learning program online is perfect for: Muslim families wanting structured Islamic education for kids, new Muslims seeking to learn Islam online from basics, adults wanting to deepen their Islamic knowledge, and professionals looking for flexible Islamic classes online.",
    ]}
    aboutContentAr={[
      "في عالم متزايد التعقيد، فهم المبادئ الإسلامية أمر ضروري. برنامجنا في الدراسات الإسلامية أونلاين يوفر المعرفة اللازمة لممارسة الإسلام بشكل صحيح.",
      "في أكاديمية الحمد، دورتنا في الدراسات الإسلامية مصممة لتقديم تعليم إسلامي شامل وأصيل مبني على القرآن والسنة وفق منهج أهل السنة والجماعة.",
      "للأطفال، برنامج الدراسات الإسلامية أونلاين يؤسس لاتصال مدى الحياة مع الإيمان. يغطي أركان الإسلام وقصص الأنبياء والأدعية اليومية والآداب.",
      "للكبار، دروسنا الإسلامية أونلاين تقدم دراسة معمقة في الفقه والعقيدة والتفسير والحديث والسيرة.",
      "برنامجنا الإسلامي أونلاين مثالي للعائلات المسلمة والمسلمين الجدد والبالغين الذين يريدون تعميق معرفتهم الإسلامية.",
    ]}
    methodTitleEn="How We Teach Islamic Studies Online"
    methodTitleAr="كيف ندرّس الدراسات الإسلامية أونلاين"
    methodContentEn={[
      "Our Islamic studies online methodology emphasizes understanding over mere memorization. In our Islamic classes online, we want students to understand the wisdom behind Islamic rulings, not just know the rules.",
      "Our Islamic learning program is interactive and discussion-based. Students in our Islamic classes for beginners and advanced levels alike are encouraged to ask questions, discuss real-life scenarios, and explore how Islamic principles apply to contemporary situations.",
      "We use a variety of teaching materials in our Islamic studies course including classical Islamic texts, modern educational resources, and multimedia content to cater to different learning styles.",
      "For children in our Islamic studies for kids online, we use storytelling, interactive quizzes, and creative projects to make learning Islam fun. For adults, we provide scholarly references and encourage critical thinking in our Islamic classes online.",
    ]}
    methodContentAr={[
      "منهجيتنا في الدراسات الإسلامية أونلاين تركز على الفهم وليس مجرد الحفظ. في دروسنا نريد للطلاب فهم الحكمة وراء الأحكام.",
      "برنامجنا تفاعلي وقائم على النقاش. الطلاب في جميع المستويات مشجعون على طرح الأسئلة ومناقشة سيناريوهات واقعية.",
      "نستخدم مواد تعليمية متنوعة في دورة الدراسات الإسلامية من نصوص كلاسيكية وموارد حديثة.",
      "للأطفال في برنامج الدراسات الإسلامية أونلاين، نستخدم رواية القصص والمسابقات. للكبار، نقدم مراجع علمية ونشجع التفكير النقدي.",
    ]}
    levels={[
      {
        titleEn: "Islamic Studies for Kids — Islamic Classes for Beginners",
        titleAr: "الدراسات الإسلامية للأطفال — دروس إسلامية للمبتدئين",
        descEn: "Essential Islamic knowledge every Muslim child needs. Perfect Islamic classes for beginners and young learners starting their Islamic studies journey.",
        descAr: "المعرفة الإسلامية الأساسية التي يحتاجها كل طفل مسلم. دروس إسلامية مثالية للمبتدئين.",
        topicsEn: ["Five Pillars of Islam & Iman", "Stories of the Prophets", "Daily Duas and Adhkar", "Islamic manners (Adab)", "Basic Fiqh (Wudu, Salah, Fasting)", "Quran stories and lessons"],
        topicsAr: ["أركان الإسلام والإيمان", "قصص الأنبياء", "الأدعية والأذكار اليومية", "الآداب الإسلامية", "الفقه الأساسي (الوضوء، الصلاة، الصيام)", "قصص ودروس القرآن"],
      },
      {
        titleEn: "Intermediate Islamic Studies Online",
        titleAr: "الدراسات الإسلامية المتوسطة أونلاين",
        descEn: "Deeper exploration of Islamic sciences online for teens and adults wanting to learn Islam online at a more advanced level.",
        descAr: "استكشاف أعمق للعلوم الإسلامية أونلاين للمراهقين والكبار.",
        topicsEn: ["Detailed Fiqh of worship", "Aqeedah (Islamic creed)", "Seerah of Prophet Muhammad ﷺ", "Selected Hadith study", "Islamic history", "Contemporary Fiqh issues"],
        topicsAr: ["فقه العبادات المفصل", "العقيدة الإسلامية", "سيرة النبي محمد ﷺ", "دراسة أحاديث مختارة", "التاريخ الإسلامي", "قضايا فقهية معاصرة"],
      },
      {
        titleEn: "Advanced Islamic Sciences Online",
        titleAr: "العلوم الإسلامية المتقدمة أونلاين",
        descEn: "In-depth Islamic studies online covering Tafseer, Hadith sciences, Usool al-Fiqh, and more for serious students of Islamic knowledge.",
        descAr: "دراسات إسلامية أونلاين معمقة في التفسير وعلوم الحديث وأصول الفقه.",
        topicsEn: ["Tafseer (Quran interpretation)", "Hadith sciences (Mustalah)", "Usool al-Fiqh (principles of jurisprudence)", "Comparative Fiqh", "Islamic ethics and spirituality", "Da'wah methodology"],
        topicsAr: ["التفسير", "علوم الحديث (المصطلح)", "أصول الفقه", "الفقه المقارن", "الأخلاق والروحانية الإسلامية", "منهجية الدعوة"],
      },
    ]}
    outcomesEn={[
      "Understand and practice the fundamentals of Islam correctly",
      "Know the rules of worship (Salah, Fasting, Zakat, Hajj) in detail",
      "Understand basic Islamic creed (Aqeedah) from authentic sources",
      "Learn from the life of Prophet Muhammad ﷺ and apply its lessons",
      "Make informed Islamic decisions in daily life situations",
      "Strengthen your connection with Allah through knowledge and practice",
    ]}
    outcomesAr={[
      "فهم وممارسة أساسيات الإسلام بشكل صحيح",
      "معرفة أحكام العبادات بالتفصيل",
      "فهم العقيدة الإسلامية من مصادر أصيلة",
      "التعلم من سيرة النبي محمد ﷺ وتطبيق دروسها",
      "اتخاذ قرارات إسلامية مدروسة في الحياة اليومية",
      "تقوية الاتصال بالله من خلال العلم والعمل",
    ]}
    featuresEn={[
      "Qualified Islamic scholars with degrees from prestigious Islamic universities",
      "Authentic Islamic education online based on Quran and Sunnah",
      "Age-appropriate Islamic studies curriculum for both kids and adults",
      "Interactive and discussion-based Islamic learning program online",
      "Coverage of all major Islamic sciences in our Islamic classes online",
      "One-on-one sessions for personalized Islamic studies learning",
      "Flexible scheduling for Islamic classes worldwide",
      "Free trial Islamic class available",
    ]}
    featuresAr={[
      "علماء مؤهلون بشهادات من جامعات إسلامية مرموقة",
      "تعليم إسلامي أونلاين أصيل مبني على القرآن والسنة",
      "منهج دراسات إسلامية مناسب للعمر للأطفال والكبار",
      "برنامج تعلم إسلامي أونلاين تفاعلي وقائم على النقاش",
      "تغطية جميع العلوم الإسلامية الرئيسية في دروسنا أونلاين",
      "جلسات فردية للتعلم المخصص في الدراسات الإسلامية",
      "مواعيد مرنة للدروس الإسلامية حول العالم",
      "حصة إسلامية تجريبية مجانية متاحة",
    ]}
    faqs={[
      { questionEn: "What Islamic studies topics do you cover in your online program?", questionAr: "ما مواضيع الدراسات الإسلامية التي تغطونها أونلاين؟", answerEn: "Our Islamic studies online program covers a comprehensive range: Fiqh (jurisprudence), Aqeedah (creed), Tafseer (Quran interpretation), Hadith studies, Seerah (Prophetic biography), Islamic history, Islamic manners, and contemporary Islamic issues.", answerAr: "برنامجنا يغطي مجموعة شاملة: الفقه، العقيدة، التفسير، الحديث، السيرة، التاريخ الإسلامي، الآداب الإسلامية، والقضايا المعاصرة." },
      { questionEn: "Do you offer Islamic studies for kids online?", questionAr: "هل تقدمون دراسات إسلامية للأطفال أونلاين؟", answerEn: "Yes! Our Islamic studies for kids online program teaches Islamic fundamentals in an engaging, age-appropriate way using stories, games, and interactive activities. It's the perfect Islamic classes for beginners starting their journey of learning Islam online.", answerAr: "نعم! برنامج الدراسات الإسلامية للأطفال أونلاين يعلم الأساسيات الإسلامية بطريقة ممتعة ومناسبة للعمر." },
      { questionEn: "Can beginners take your Islamic classes online?", questionAr: "هل يمكن للمبتدئين أخذ دروسكم الإسلامية أونلاين؟", answerEn: "Absolutely! Our Islamic classes for beginners are designed for students with no prior Islamic education. Whether you're a new Muslim or someone who grew up Muslim but didn't have formal Islamic education, our program starts from the basics and builds a solid foundation for learning Islam online.", answerAr: "بالتأكيد! دروسنا الإسلامية للمبتدئين مصممة للطلاب بدون تعليم إسلامي مسبق. سواء كنت مسلماً جديداً أو نشأت مسلماً بدون تعليم رسمي." },
      { questionEn: "What methodology do your Islamic scholars follow?", questionAr: "ما المنهجية التي يتبعها علماؤكم الإسلاميون؟", answerEn: "Our scholars follow the methodology of Ahl al-Sunnah wal-Jama'ah in our Islamic studies online, providing balanced and authentic Islamic education based on the Quran, authentic Hadith, and the understanding of the righteous predecessors (Salaf).", answerAr: "يتبع علماؤنا منهج أهل السنة والجماعة في دراساتنا الإسلامية أونلاين، مقدمين تعليماً إسلامياً متوازناً وأصيلاً." },
      { questionEn: "Can I combine Islamic studies with Quran classes online?", questionAr: "هل يمكنني الجمع بين الدراسات الإسلامية ودروس القرآن أونلاين؟", answerEn: "Yes! Many students in our Islamic learning program online combine Islamic studies with online Quran classes, Tajweed, or Hifz. We offer flexible packages that allow you to mix and match courses based on your learning goals.", answerAr: "نعم! كثير من طلابنا يجمعون بين الدراسات الإسلامية ودروس القرآن أونلاين. نقدم حزماً مرنة." },
    ]}
    testimonials={[
      { name: "Noor A.", country: "United States", textEn: "The Islamic studies online program has been transformative for our family. My kids now look forward to their Islamic classes online and have developed a genuine love for learning Islam.", textAr: "برنامج الدراسات الإسلامية أونلاين كان تحويلياً لعائلتنا. أطفالي يتطلعون لدروسهم الإسلامية.", rating: 5 },
      { name: "Bilal M.", country: "Germany", textEn: "As a revert Muslim, I needed to learn Islam online from scratch. Alhamd Academy's Islamic studies course gave me systematic, authentic Islamic knowledge through their Islamic classes for beginners.", textAr: "كمسلم جديد، كنت بحاجة لتعلم الإسلام أونلاين من الصفر. دورة الدراسات الإسلامية قدمت لي معرفة إسلامية منهجية.", rating: 5 },
    ]}
    relatedPages={RELATED}
    audiencePersonas={AUDIENCE_PERSONAS}
    classSteps={CLASS_STEPS}
    challenges={CHALLENGES}
    curriculum={CURRICULUM_WEEKS}
    comparisonRows={COMPARISON_ROWS}
    audienceTitleEn="Who Benefits from Our Islamic Studies Program?"
    audienceTitleAr="من يستفيد من برنامج الدراسات الإسلامية؟"
    classSessionTitleEn="What Happens in an Islamic Studies Session"
    classSessionTitleAr="ماذا يحدث في جلسة الدراسات الإسلامية"
    challengesTitleEn="Islamic Learning Challenges — And How We Address Them"
    challengesTitleAr="تحديات التعلم الإسلامي — وكيف نعالجها"
    curriculumTitleEn="Your Islamic Knowledge Journey"
    curriculumTitleAr="رحلة معرفتك الإسلامية"
    comparisonTitleEn="Alhamd Academy vs Other Islamic Programs"
    comparisonTitleAr="أكاديمية الحمد مقابل البرامج الإسلامية الأخرى"
    midCtaTitleEn="Deepen Your Islamic Knowledge — Book a Free Lesson"
    midCtaTitleAr="عمّق معرفتك الإسلامية — احجز درساً مجانياً"
    midCtaDescEn="Interactive Islamic class • Qualified scholar • No obligation"
    midCtaDescAr="حصة إسلامية تفاعلية • عالم مؤهل • بدون التزام"
    levelsTitleEn="Islamic Studies Curriculum — From Foundation to Advanced"
    levelsTitleAr="منهج الدراسات الإسلامية — من التأسيس إلى المتقدم"
    outcomesTitleEn="Knowledge & Skills You'll Gain"
    outcomesTitleAr="المعرفة والمهارات التي ستكتسبها"
    whyChooseTitleEn="What Makes Our Islamic Studies Program Unique?"
    whyChooseTitleAr="ما الذي يميز برنامج الدراسات الإسلامية لدينا؟"
    testimonialsTitleEn="Students Reflect on Their Islamic Learning Journey"
    testimonialsTitleAr="الطلاب يتحدثون عن رحلة تعلمهم الإسلامية"
    faqTitleEn="Islamic Studies Program — Your Questions"
    faqTitleAr="برنامج الدراسات الإسلامية — أسئلتك"
    ctaTitleEn="Strengthen Your Faith Through Knowledge"
    ctaTitleAr="عزّز إيمانك بالعلم"
    ctaDescEn="Learn Islam authentically with qualified scholars. Book your free Islamic studies class today."
    ctaDescAr="تعلم الإسلام بأصالة مع علماء مؤهلين. احجز حصة الدراسات الإسلامية المجانية اليوم."
    ctaButtonEn="Book Free Islamic Class"
    ctaButtonAr="احجز حصة إسلامية مجانية"
    relatedTitleEn="Complete Your Islamic Education"
    relatedTitleAr="أكمل تعليمك الإسلامي"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Islamic Studies Online — Learn Islam Online",
      description: "Comprehensive Islamic studies online covering Fiqh, Aqeedah, Tafseer, Hadith, and Seerah. Islamic classes for kids and adults.",
      provider: { "@type": "EducationalOrganization", name: "Alhamd Academy", url: "https://alhamdacademy.net" },
      educationalLevel: ["Kids", "Intermediate", "Advanced"],
      inLanguage: ["en", "ar"],
      offers: { "@type": "Offer", price: "57", priceCurrency: "USD", description: "Starting from $57/month for 3 sessions/week" },
    }}
  />
);

export default IslamicStudies;
