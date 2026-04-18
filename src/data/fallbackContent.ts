/**
 * Type definitions for data models used across the app.
 * All data is fetched from Supabase — no hardcoded fallback content.
 */

export interface SeoData {
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

export interface Teacher {
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
  /** External admin fields (controlled via Website Visibility toggle) */
  qualification_en?: string;
  qualification_ar?: string;
  academic_degree_en?: string;
  academic_degree_ar?: string;
  ijazat_en?: string;
  ijazat_ar?: string;
  subjects?: string[];
  gender?: "male" | "female" | string;
  about_en?: string;
  about_ar?: string;
}
