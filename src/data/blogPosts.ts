/** Lightweight blog types — all content lives in the database. */

export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  category: string;
  categoryAr: string;
  date: string;
  readTimeEn: string;
  readTimeAr: string;
  image: string;
}

export const blogCategories = [
  { en: "All", ar: "الكل" },
  { en: "Quran", ar: "القرآن" },
  { en: "Tajweed", ar: "التجويد" },
  { en: "Arabic", ar: "العربية" },
  { en: "Islamic Studies", ar: "دراسات إسلامية" },
  { en: "Islamic Knowledge", ar: "معارف إسلامية" },
  { en: "Education", ar: "تعليم" },
  { en: "Quran Stories", ar: "قصص قرآنية" },
  { en: "Hifz", ar: "حفظ القرآن" },
  { en: "Ijazah", ar: "إجازة" },
];
