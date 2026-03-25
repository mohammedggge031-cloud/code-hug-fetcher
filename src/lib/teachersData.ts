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

const buildTeachersEndpoint = () => {
  const baseUrl = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/+$/, "");
  if (!baseUrl) return "";

  const params = new URLSearchParams({
    select: "id,name_en,name_ar,title_en,title_ar,bio_en,bio_ar,photo_url,specializations,rating,experience_years,education_en,education_ar",
    is_active: "eq.true",
    order: "display_order.asc,created_at.desc",
  });

  return `${baseUrl}/rest/v1/teachers?${params.toString()}`;
};

export async function loadTeachersWithFallback(): Promise<FallbackTeacher[]> {
  const endpoint = buildTeachersEndpoint();
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!endpoint || !anonKey) return fallbackTeachers;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TEACHERS_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      signal: controller.signal,
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    if (!response.ok) return fallbackTeachers;

    const data = (await response.json()) as TeacherRow[];
    if (!Array.isArray(data) || data.length === 0) return fallbackTeachers;

    return data.map(mapTeacher);
  } catch {
    return fallbackTeachers;
  } finally {
    clearTimeout(timeout);
  }
}
