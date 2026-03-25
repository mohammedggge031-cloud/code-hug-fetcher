/**
 * Fallback content layer — used when Supabase is unavailable.
 * This ensures the site NEVER shows a blank screen or broken SEO.
 *
 * To update: run `npm run export-fallback` or manually paste fresh data here.
 */

export interface FallbackSeoData {
  title: string;
  description: string;
  keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  structured_data: any;
  no_index: boolean;
}

// ─── SEO fallbacks per page path ─────────────────────────────────────
export const fallbackSeo: Record<string, Partial<FallbackSeoData>> = {
  "/": {
    title: "Alhamd Academy | Online Quran, Arabic & Islamic Studies",
    description:
      "Alhamd Academy offers professional online Quran, Arabic and Islamic studies classes for kids and adults. Certified native Arabic teachers. Free trial class. Contact us on WhatsApp +201271134828.",
    keywords:
      "online quran classes, learn quran online, tajweed classes, arabic language course, hifz program, quran memorization, islamic studies online, quran classes for kids, quran classes for adults, best online quran academy",
    canonical_url: "https://alhamdacademy.net/",
    og_title: "Alhamd Academy | Online Quran, Arabic & Islamic Studies",
    og_description:
      "Professional online Quran, Arabic and Islamic studies classes for kids and adults. Certified Al-Azhar teachers. Free trial class.",
    og_image: "https://alhamdacademy.net/og-image.jpg",
    og_type: "website",
    twitter_card: "summary_large_image",
    no_index: false,
  },
  "/tajweed-course": {
    title: "Tajweed Course Online — Learn Quran Recitation | Alhamd Academy",
    description:
      "Master Tajweed rules with certified Al-Azhar teachers. From basic to Ijazah level. One-on-one online Tajweed classes for kids and adults.",
    canonical_url: "https://alhamdacademy.net/tajweed-course",
  },
  "/quran-memorization": {
    title: "Quran Memorization (Hifz) Online | Alhamd Academy",
    description:
      "Memorize the Quran with personalized Hifz plans and certified Egyptian teachers. One-on-one online classes for kids and adults.",
    canonical_url: "https://alhamdacademy.net/quran-memorization",
  },
  "/arabic-for-kids": {
    title: "Arabic for Kids — Online Arabic Classes | Alhamd Academy",
    description:
      "Fun and engaging Arabic classes for kids with native Arabic teachers. Learn reading, writing, and conversation.",
    canonical_url: "https://alhamdacademy.net/arabic-for-kids",
  },
  "/arabic-for-adults": {
    title: "Arabic for Adults — Online Arabic Language Course | Alhamd Academy",
    description:
      "Learn Arabic online with native speakers. Al-Arabiyyah Bayna Yadayk curriculum. Reading, writing, grammar, and conversation.",
    canonical_url: "https://alhamdacademy.net/arabic-for-adults",
  },
  "/islamic-studies": {
    title: "Islamic Studies Online — Fiqh, Aqeedah, Tafseer | Alhamd Academy",
    description:
      "Comprehensive Islamic Studies covering Fiqh, Aqeedah, Tafseer, Hadith & Seerah with certified Al-Azhar scholars.",
    canonical_url: "https://alhamdacademy.net/islamic-studies",
  },
  "/ijazah-program": {
    title: "Ijazah Certification Program — Connected Sanad | Alhamd Academy",
    description:
      "Earn your Ijazah with a connected Sanad back to Prophet Muhammad ﷺ. One-on-one with certified sheikhs at only $15/hour.",
    canonical_url: "https://alhamdacademy.net/ijazah-program",
  },
  "/online-quran-classes": {
    title: "Online Quran Classes for Kids & Adults | Alhamd Academy",
    description:
      "Professional online Quran classes with certified native Arabic teachers. One-on-one personalized lessons. Free trial available.",
    canonical_url: "https://alhamdacademy.net/online-quran-classes",
  },
  "/female-quran-teacher": {
    title: "Female Quran Teacher Online | Alhamd Academy",
    description:
      "Certified female Quran teachers for sisters and children. Learn Quran, Tajweed, and Arabic in a comfortable environment.",
    canonical_url: "https://alhamdacademy.net/female-quran-teacher",
  },
  "/free-trial": {
    title: "Book a Free Trial Class | Alhamd Academy",
    description:
      "Try a free Quran or Arabic class with no commitment. Book your trial now on WhatsApp +201271134828.",
    canonical_url: "https://alhamdacademy.net/free-trial",
  },
  "/blog": {
    title: "Blog — Quran & Islamic Education Articles | Alhamd Academy",
    description:
      "Read articles about Quran learning, Tajweed, Arabic language, and Islamic studies from Alhamd Academy.",
    canonical_url: "https://alhamdacademy.net/blog",
  },
};

// ─── Teachers fallback ───────────────────────────────────────────────
export interface FallbackTeacher {
  id: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  bio_en: string;
  bio_ar: string;
  photo_url: string;
  specializations: string[];
  rating: number;
  experience_years?: number;
  education_en?: string;
  education_ar?: string;
}

// Empty by default — populated via export script or manually
export const fallbackTeachers: FallbackTeacher[] = [];
