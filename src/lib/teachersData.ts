import type { Teacher } from "@/data/fallbackContent";
import { fetchWithTimeout, isGlobalFallbackMode, enableGlobalFallbackMode, SUPABASE_TIMEOUT_MS } from "@/lib/safeRuntimeData";
import { buildExternalTeachersEndpoint } from "@/lib/externalDashboard";

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

export async function loadTeachers(): Promise<Teacher[]> {
  const endpoint = buildExternalTeachersEndpoint();
  const anonKey = import.meta.env.VITE_EXTERNAL_DASHBOARD_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (isGlobalFallbackMode() || !endpoint || !anonKey) return [];

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    }, {
      timeoutMs: SUPABASE_TIMEOUT_MS,
      markGlobalFallbackOnError: false,
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as TeacherRow[];
    if (!Array.isArray(data) || data.length === 0) return [];

    return data.map(mapTeacher);
  } catch {
    return [];
  }
}
