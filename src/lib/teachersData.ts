import type { Teacher } from "@/data/fallbackContent";
import { isGlobalFallbackMode } from "@/lib/safeRuntimeData";
import { fetchExternalFunction } from "@/lib/externalDashboard";

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

const mapTeacher = (teacher: TeacherRow): Teacher => ({
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

/** Shared singleton cache — ensures only ONE network request across all consumers. */
let cachedTeachers: Teacher[] | null = null;
let fetchPromise: Promise<Teacher[]> | null = null;

export async function loadTeachers(): Promise<Teacher[]> {
  if (cachedTeachers !== null) return cachedTeachers;
  if (fetchPromise) return fetchPromise;
  if (isGlobalFallbackMode()) return [];

  fetchPromise = (async () => {
    try {
      const response = await fetchExternalFunction("public-teachers", {
        method: "GET",
      });

      if (!response.ok) {
        cachedTeachers = [];
        return [];
      }

      const json = await response.json();
      const data = (json?.teachers ?? json) as TeacherRow[];
      if (!Array.isArray(data) || data.length === 0) {
        cachedTeachers = [];
        return [];
      }

      cachedTeachers = data.map(mapTeacher);
      return cachedTeachers;
    } catch {
      cachedTeachers = [];
      return [];
    }
  })();

  return fetchPromise;
}
