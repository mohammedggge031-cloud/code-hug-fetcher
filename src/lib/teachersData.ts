import type { Teacher } from "@/data/fallbackContent";
import { isGlobalFallbackMode } from "@/lib/safeRuntimeData";
import { fetchExternalFunction } from "@/lib/externalDashboard";

interface TeacherRow {
  id: string;
  name_en?: string;
  name_ar?: string;
  name?: string;
  title_en?: string;
  title_ar?: string;
  bio_en?: string;
  bio_ar?: string;
  bio?: string;
  photo_url?: string | null;
  photo?: string | null;
  specializations?: string[] | null;
  subjects?: string[] | null;
  rating?: number | null;
  experience_years?: number | null;
  education_en?: string | null;
  education_ar?: string | null;
  qualification_en?: string | null;
  qualification_ar?: string | null;
  qualification?: string | null;
  academic_degree_en?: string | null;
  academic_degree_ar?: string | null;
  academic_degree?: string | null;
  ijazat_en?: string | null;
  ijazat_ar?: string | null;
  ijazat?: string | null;
  gender?: string | null;
}

const pick = <T,>(...vals: (T | null | undefined)[]): T | undefined => {
  for (const v of vals) if (v !== null && v !== undefined && v !== "") return v as T;
  return undefined;
};

const mapTeacher = (teacher: TeacherRow): Teacher => {
  const name_en = pick(teacher.name_en, teacher.name) ?? "";
  const name_ar = pick(teacher.name_ar, teacher.name) ?? "";
  const bio_en = pick(teacher.bio_en, teacher.bio) ?? "";
  const bio_ar = pick(teacher.bio_ar, teacher.bio) ?? "";
  const subjects = Array.isArray(teacher.subjects) ? teacher.subjects
    : Array.isArray(teacher.specializations) ? teacher.specializations : [];
  const qualification_en = pick(teacher.qualification_en, teacher.qualification, teacher.education_en);
  const qualification_ar = pick(teacher.qualification_ar, teacher.qualification, teacher.education_ar);

  return {
    id: teacher.id,
    name_en,
    name_ar,
    title_en: teacher.title_en ?? "",
    title_ar: teacher.title_ar ?? "",
    bio_en,
    bio_ar,
    photo_url: pick(teacher.photo_url, teacher.photo) ?? "",
    specializations: subjects,
    subjects,
    rating: typeof teacher.rating === "number" ? teacher.rating : 0,
    experience_years: teacher.experience_years ?? undefined,
    education_en: qualification_en,
    education_ar: qualification_ar,
    qualification_en,
    qualification_ar,
    academic_degree_en: pick(teacher.academic_degree_en, teacher.academic_degree),
    academic_degree_ar: pick(teacher.academic_degree_ar, teacher.academic_degree),
    ijazat_en: pick(teacher.ijazat_en, teacher.ijazat),
    ijazat_ar: pick(teacher.ijazat_ar, teacher.ijazat),
    gender: teacher.gender ?? undefined,
  };
};

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
