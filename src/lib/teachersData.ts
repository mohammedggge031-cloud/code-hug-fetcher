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
  about_en?: string | null;
  about_ar?: string | null;
  about?: string | null;
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
    about_en: pick(teacher.about_en, teacher.about),
    about_ar: pick(teacher.about_ar, teacher.about),
  };
};

/**
 * Shared cache with 60s TTL — balances performance (no duplicate requests on a page)
 * with freshness (admin changes appear within 1 minute, no Hard Refresh needed).
 * Also auto-revalidates when the tab regains focus.
 */
const CACHE_TTL_MS = 60 * 1000;
let cachedTeachers: Teacher[] | null = null;
let cachedAt = 0;
let fetchPromise: Promise<Teacher[]> | null = null;

export function invalidateTeachersCache() {
  cachedTeachers = null;
  cachedAt = 0;
  fetchPromise = null;
}

if (typeof window !== "undefined") {
  window.addEventListener("focus", () => {
    if (Date.now() - cachedAt > CACHE_TTL_MS) invalidateTeachersCache();
  });
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && Date.now() - cachedAt > CACHE_TTL_MS) {
      invalidateTeachersCache();
    }
  });
}

export async function loadTeachers(): Promise<Teacher[]> {
  const fresh = cachedTeachers !== null && Date.now() - cachedAt < CACHE_TTL_MS;
  if (fresh) return cachedTeachers!;
  if (fetchPromise) return fetchPromise;
  if (isGlobalFallbackMode()) return [];

  fetchPromise = (async () => {
    try {
      const response = await fetchExternalFunction("public-teachers", {
        method: "GET",
      });

      if (!response.ok) {
        cachedTeachers = [];
        cachedAt = Date.now();
        return [];
      }

      const json = await response.json();
      const data = (json?.teachers ?? json) as TeacherRow[];
      if (!Array.isArray(data) || data.length === 0) {
        cachedTeachers = [];
        cachedAt = Date.now();
        return [];
      }

      cachedTeachers = data.map(mapTeacher);
      cachedAt = Date.now();
      return cachedTeachers;
    } catch {
      cachedTeachers = [];
      cachedAt = Date.now();
      return [];
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
