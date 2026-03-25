import { supabase } from "@/integrations/supabase/client";
import { fallbackTeachers, type FallbackTeacher } from "@/data/fallbackContent";

const TEACHERS_TIMEOUT_MS = 5000;

interface TeacherRow {
  id: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  bio_en: string;
  bio_ar: string;
  photo_url: string | null;
  specializations: string[] | null;
  rating: number | null;
  experience_years: number | null;
  education_en: string | null;
  education_ar: string | null;
}

const mapTeacher = (teacher: TeacherRow): FallbackTeacher => ({
  id: teacher.id,
  name_en: teacher.name_en,
  name_ar: teacher.name_ar,
  title_en: teacher.title_en,
  title_ar: teacher.title_ar,
  bio_en: teacher.bio_en,
  bio_ar: teacher.bio_ar,
  photo_url: teacher.photo_url ?? "",
  specializations: Array.isArray(teacher.specializations) ? teacher.specializations : [],
  rating: typeof teacher.rating === "number" ? teacher.rating : 0,
  experience_years: teacher.experience_years ?? undefined,
  education_en: teacher.education_en ?? undefined,
  education_ar: teacher.education_ar ?? undefined,
});

export async function loadTeachersWithFallback(): Promise<FallbackTeacher[]> {
  try {
    const query = supabase
      .from("teachers")
      .select(
        "id,name_en,name_ar,title_en,title_ar,bio_en,bio_ar,photo_url,specializations,rating,experience_years,education_en,education_ar"
      )
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    const result = await Promise.race([
      query,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), TEACHERS_TIMEOUT_MS)),
    ]);

    if (!result || result.error || !result.data || result.data.length === 0) {
      return fallbackTeachers;
    }

    return (result.data as TeacherRow[]).map(mapTeacher);
  } catch {
    return fallbackTeachers;
  }
}
