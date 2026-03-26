export interface RecentArticle {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  category: string;
  categoryAr: string;
  date: string;
  readTimeEn: string;
  readTimeAr: string;
  image: string;
}

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=640&q=70`;

export const recentArticles: RecentArticle[] = [
  {
    id: "how-to-learn-quran-online-step-by-step",
    titleEn: "How to Learn Quran Online Step by Step — A Complete Guide",
    titleAr: "كيف تتعلم القرآن أونلاين خطوة بخطوة — دليل شامل",
    excerptEn: "A step-by-step guide to learning the Quran online, from choosing the right academy to mastering recitation with Tajweed.",
    excerptAr: "دليل خطوة بخطوة لتعلم القرآن أونلاين، من اختيار الأكاديمية المناسبة إلى إتقان التلاوة بالتجويد.",
    category: "Quran",
    categoryAr: "القرآن",
    date: "2026-03-05",
    readTimeEn: "12 min read",
    readTimeAr: "١٢ دقيقة قراءة",
    image: img("photo-1609599006353-e629aaabfeae"),
  },
  {
    id: "what-are-tajweed-rules-explained",
    titleEn: "What Are Tajweed Rules? Simple Explanation for Beginners",
    titleAr: "ما هي أحكام التجويد؟ شرح مبسط للمبتدئين",
    excerptEn: "A beginner-friendly breakdown of Tajweed rules with practical examples.",
    excerptAr: "شرح سهل لأحكام التجويد مع أمثلة عملية للمبتدئين.",
    category: "Tajweed",
    categoryAr: "التجويد",
    date: "2026-03-03",
    readTimeEn: "11 min read",
    readTimeAr: "١١ دقيقة قراءة",
    image: img("photo-1542816417-0983c9c9ad53"),
  },
  {
    id: "best-age-to-start-quran-classes",
    titleEn: "Best Age to Start Quran Classes for Kids",
    titleAr: "ما هو أفضل عمر لبدء دروس القرآن للأطفال؟",
    excerptEn: "Learn the ideal age ranges and practical tips to start Quran learning for children.",
    excerptAr: "تعرف على الأعمار المناسبة والنصائح العملية لبدء تعلم القرآن للأطفال.",
    category: "Education",
    categoryAr: "تعليم",
    date: "2026-03-01",
    readTimeEn: "9 min read",
    readTimeAr: "٩ دقائق قراءة",
    image: img("photo-1588072432836-e10032774350"),
  },
  {
    id: "how-to-memorize-quran-fast",
    titleEn: "How to Memorize Quran Fast and Effectively",
    titleAr: "كيف تحفظ القرآن بسرعة وفعالية",
    excerptEn: "Proven memorization techniques, revision strategies, and daily routines for Hifz success.",
    excerptAr: "أساليب حفظ مجرّبة وخطط مراجعة وروتين يومي للنجاح في الحفظ.",
    category: "Hifz",
    categoryAr: "حفظ القرآن",
    date: "2026-02-27",
    readTimeEn: "10 min read",
    readTimeAr: "١٠ دقائق قراءة",
    image: img("photo-1564769625905-50e93615e769"),
  },
  {
    id: "how-to-learn-arabic-fast-for-quran",
    titleEn: "How to Learn Arabic Fast for Quran Understanding",
    titleAr: "كيف تتعلم العربية بسرعة لفهم القرآن",
    excerptEn: "A practical roadmap to learn Quranic Arabic quickly and build daily comprehension.",
    excerptAr: "خطة عملية لتعلم العربية القرآنية بسرعة وبناء الفهم اليومي.",
    category: "Arabic",
    categoryAr: "العربية",
    date: "2026-02-24",
    readTimeEn: "9 min read",
    readTimeAr: "٩ دقائق قراءة",
    image: img("photo-1579187707643-35646d22b596"),
  },
  {
    id: "how-to-choose-best-online-quran-academy",
    titleEn: "How to Choose the Best Online Quran Academy",
    titleAr: "كيف تختار أفضل أكاديمية قرآن أونلاين",
    excerptEn: "Key criteria to choose a trustworthy academy with qualified teachers and a clear curriculum.",
    excerptAr: "معايير مهمة لاختيار أكاديمية موثوقة بمعلمين مؤهلين ومنهج واضح.",
    category: "Education",
    categoryAr: "تعليم",
    date: "2026-02-22",
    readTimeEn: "8 min read",
    readTimeAr: "٨ دقائق قراءة",
    image: img("photo-1457369804613-52c61a468e7d"),
  },
];