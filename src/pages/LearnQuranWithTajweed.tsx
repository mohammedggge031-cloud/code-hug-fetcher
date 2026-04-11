import ServicePageLayout from "@/components/ServicePageLayout";
import { BookOpen, Award, Users, Star, Clock, Shield } from "lucide-react";

const LearnQuranWithTajweed = () => {
  return (
    <ServicePageLayout
      seoTitle="Learn Quran with Tajweed Online | Tajweed Rules Course for Beginners"
      seoDescription="Learn to read Quran with proper Tajweed rules online. Certified Al-Azhar teachers teach Makharij, Noon Sakinah, Madd rules & more. One-on-one classes. Free trial."
      seoKeywords="learn quran with tajweed, tajweed rules online, quran tajweed classes, learn tajweed online, tajweed for beginners, quran recitation with tajweed, online tajweed course, tajweed quran reading, tajweed rules for beginners, learn quran tajweed online"
      canonical="https://alhamdacademy.net/learn-quran-with-tajweed"
      heroTitleEn="Learn Quran with Tajweed Online"
      heroTitleAr="تعلّم القرآن بالتجويد أونلاين"
      heroSubtitleEn="Master Every Rule, Perfect Every Letter"
      heroSubtitleAr="أتقن كل قاعدة، أحسن كل حرف"
      heroDescEn="Tajweed transforms your Quran recitation from reading words to honoring Allah's sacred text. Our certified Al-Azhar teachers guide you through every Tajweed rule with practical application — from Makharij al-Huruf to advanced Madd rules — until beautiful recitation becomes natural."
      heroDescAr="التجويد يحول تلاوة القرآن من قراءة كلمات إلى تكريم كتاب الله المقدس. معلمونا المعتمدون من الأزهر يرشدونك خلال كل قاعدة تجويد مع التطبيق العملي — من مخارج الحروف إلى أحكام المد المتقدمة — حتى تصبح التلاوة الجميلة طبيعية."
      aboutTitleEn="Why Tajweed Matters for Every Muslim"
      aboutTitleAr="لماذا التجويد مهم لكل مسلم"
      aboutContentEn={[
        "The Prophet Muhammad ﷺ said: 'The one who is proficient in the recitation of the Quran will be with the honorable and obedient scribes (angels).' Tajweed is not an optional extra — scholars consider it obligatory (Wajib) when reciting the Quran, especially in prayer.",
        "Without proper Tajweed, you risk changing the meaning of Quranic words. A single mispronunciation can turn a prayer into something entirely different. Our teachers help you avoid these critical mistakes while building confidence in your recitation.",
        "At Alhamd Academy, we don't teach Tajweed as abstract theory. Every rule is immediately applied to actual Quran recitation. You learn the rule, practice it in verses, and repeat until it becomes second nature. This practical approach is why our students see rapid improvement.",
      ]}
      aboutContentAr={[
        "قال النبي محمد ﷺ: 'الماهر بالقرآن مع السفرة الكرام البررة.' التجويد ليس إضافة اختيارية — يعتبره العلماء واجباً عند تلاوة القرآن، خاصة في الصلاة.",
        "بدون تجويد صحيح، تخاطر بتغيير معنى كلمات القرآن. خطأ نطقي واحد يمكن أن يحول دعاءً إلى شيء مختلف تماماً. معلمونا يساعدونك في تجنب هذه الأخطاء الحرجة مع بناء ثقتك في التلاوة.",
        "في أكاديمية الحمد، لا نعلم التجويد كنظرية مجردة. كل قاعدة تُطبق فوراً على تلاوة القرآن الفعلية. تتعلم القاعدة، تمارسها في الآيات، وتكرر حتى تصبح طبيعة ثانية. هذا النهج العملي هو سبب تحسن طلابنا السريع.",
      ]}
      methodTitleEn="What You'll Learn in Our Tajweed Course"
      methodTitleAr="ما ستتعلمه في دورة التجويد"
      methodContentEn={[
        "Makharij al-Huruf (Articulation Points): Master the 17 points of articulation to pronounce every Arabic letter correctly from its proper origin in the throat, tongue, or lips.",
        "Sifat al-Huruf (Letter Characteristics): Understand the qualities of each letter — heavy vs. light, flowing vs. bouncing — to give every letter its full right.",
        "Noon Sakinah & Tanween Rules: Learn Idgham, Iqlab, Ikhfa, and Izhar — the four rules that govern how Noon sounds interact with following letters.",
        "Madd Rules (Elongation): Master the 9 types of Madd — from natural Madd (2 counts) to Madd Lazim (6 counts) — for rhythmically beautiful recitation.",
      ]}
      methodContentAr={[
        "مخارج الحروف: أتقن 17 نقطة خروج لنطق كل حرف عربي بشكل صحيح من أصله المناسب في الحلق أو اللسان أو الشفتين.",
        "صفات الحروف: افهم خصائص كل حرف — التفخيم والترقيق، الجريان والقلقلة — لإعطاء كل حرف حقه الكامل.",
        "أحكام النون الساكنة والتنوين: تعلم الإدغام والإقلاب والإخفاء والإظهار — القواعد الأربع التي تحكم تفاعل أصوات النون مع الحروف التالية.",
        "أحكام المد: أتقن 9 أنواع من المد — من المد الطبيعي (حركتان) إلى المد اللازم (6 حركات) — لتلاوة إيقاعية جميلة.",
      ]}
      audienceTitleEn="Who Should Take This Course"
      audienceTitleAr="من يجب أن يأخذ هذه الدورة"
      audiencePersonas={[
        { icon: BookOpen, titleEn: "Can Read but Lack Tajweed", titleAr: "تقرأ لكن بدون تجويد", descEn: "You can read Arabic but make Tajweed mistakes. This course will polish your recitation to professional standards.", descAr: "تستطيع قراءة العربية لكنك تخطئ في التجويد. هذه الدورة ستصقل تلاوتك لمعايير احترافية." },
        { icon: Award, titleEn: "Preparing for Ijazah", titleAr: "التحضير للإجازة", descEn: "Strong Tajweed is a prerequisite for Ijazah certification. Perfect your rules before your Ijazah journey.", descAr: "التجويد القوي شرط أساسي لشهادة الإجازة. أتقن قواعدك قبل رحلة الإجازة." },
        { icon: Users, titleEn: "Parents Teaching Kids", titleAr: "آباء يعلمون أطفالهم", descEn: "Learn Tajweed yourself so you can help your children practice correctly at home.", descAr: "تعلم التجويد بنفسك حتى تساعد أطفالك على التمرين بشكل صحيح في المنزل." },
        { icon: Star, titleEn: "Imams & Teachers", titleAr: "أئمة ومعلمون", descEn: "Refine your recitation to lead prayers and teach others with complete confidence.", descAr: "صقّل تلاوتك لإمامة الصلاة وتعليم الآخرين بثقة كاملة." },
        { icon: Clock, titleEn: "Self-Taught Readers", titleAr: "متعلمون ذاتياً", descEn: "Learned Quran reading on your own? A teacher can identify and correct mistakes you don't even know you're making.", descAr: "تعلمت قراءة القرآن بنفسك؟ معلم يمكنه تحديد وتصحيح أخطاء لا تعرف حتى أنك ترتكبها." },
        { icon: Shield, titleEn: "Complete Beginners", titleAr: "مبتدئون تماماً", descEn: "New to Quran reading? We integrate basic Tajweed from day one so you build correct habits from the start.", descAr: "جديد على قراءة القرآن؟ ندمج التجويد الأساسي من اليوم الأول لتبني عادات صحيحة من البداية." },
      ]}
      featuresEn={[
        "Teachers with Ijazah in Quran recitation with Sanad to Prophet Muhammad ﷺ",
        "Practical application — every rule applied immediately to Quran verses",
        "One-on-one sessions for maximum correction and personalized feedback",
        "Audio recordings of your recitation for self-review and progress tracking",
        "Structured curriculum from basic to advanced Tajweed rules",
        "Native Arabic-speaking teachers who model perfect pronunciation",
        "Flexible scheduling — study Tajweed at your convenience 24/7",
        "Free trial class to assess your current level and create a study plan",
      ]}
      featuresAr={[
        "معلمون حاصلون على إجازة في تلاوة القرآن بسند إلى النبي محمد ﷺ",
        "تطبيق عملي — كل قاعدة تُطبق فوراً على آيات قرآنية",
        "جلسات فردية لأقصى تصحيح وملاحظات مخصصة",
        "تسجيلات صوتية لتلاوتك للمراجعة الذاتية وتتبع التقدم",
        "منهج منظم من قواعد التجويد الأساسية إلى المتقدمة",
        "معلمون ناطقون أصليون بالعربية يقدمون نطقاً مثالياً",
        "جدول مرن — ادرس التجويد في وقتك المناسب 24/7",
        "حصة تجريبية مجانية لتقييم مستواك الحالي ووضع خطة دراسية",
      ]}
      faqs={[
        { questionEn: "How long does it take to learn Tajweed?", questionAr: "كم يستغرق تعلم التجويد؟", answerEn: "Basic Tajweed rules can be learned in 3-4 months with consistent practice. Mastering advanced rules and achieving natural, fluent application typically takes 6-12 months. Our teachers create a personalized timeline based on your starting level.", answerAr: "قواعد التجويد الأساسية يمكن تعلمها في 3-4 أشهر مع التمرين المستمر. إتقان القواعد المتقدمة وتحقيق التطبيق الطبيعي والطلاقة يستغرق عادةً 6-12 شهراً. معلمونا يضعون جدولاً زمنياً مخصصاً بناءً على مستواك الابتدائي." },
        { questionEn: "Is Tajweed mandatory for reading Quran?", questionAr: "هل التجويد واجب لقراءة القرآن؟", answerEn: "Islamic scholars agree that basic Tajweed (at least the rules that prevent changing word meanings) is obligatory. Advanced beautification rules are recommended (Mustahabb). Either way, learning Tajweed elevates your connection with the Quran immensely.", answerAr: "يتفق علماء الإسلام على أن التجويد الأساسي (على الأقل القواعد التي تمنع تغيير معاني الكلمات) واجب. قواعد التحسين المتقدمة مستحبة. في كلتا الحالتين، تعلم التجويد يرفع اتصالك بالقرآن بشكل هائل." },
        { questionEn: "Can I learn Tajweed if I'm a complete beginner?", questionAr: "هل يمكنني تعلم التجويد إذا كنت مبتدئاً تماماً؟", answerEn: "Yes! We integrate Tajweed from the very beginning of your Quran learning journey. Even if you're starting with Noorani Qaida, our teachers introduce proper letter pronunciation (Makharij) from lesson one.", answerAr: "نعم! ندمج التجويد من بداية رحلة تعلم القرآن. حتى لو كنت تبدأ بالقاعدة النورانية، معلمونا يقدمون النطق الصحيح للحروف (المخارج) من الدرس الأول." },
        { questionEn: "What's the difference between this and your Tajweed Course?", questionAr: "ما الفرق بين هذا ودورة التجويد الخاصة بكم؟", answerEn: "Our Tajweed Course page focuses on the course curriculum. This page is for students searching specifically for 'learning Quran with Tajweed' — the integrated approach where Tajweed is applied throughout Quran reading, not studied in isolation.", answerAr: "صفحة دورة التجويد تركز على منهج الدورة. هذه الصفحة للطلاب الذين يبحثون تحديداً عن 'تعلم القرآن بالتجويد' — النهج المتكامل حيث يُطبق التجويد خلال قراءة القرآن، لا يُدرس بمعزل." },
      ]}
    />
  );
};

export default LearnQuranWithTajweed;