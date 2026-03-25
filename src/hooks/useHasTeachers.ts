import { useState, useEffect } from "react";
import { getSupabaseFunctionUrl } from "@/lib/supabaseFunctions";
import { fallbackTeachers } from "@/data/fallbackContent";

const TEACHERS_API = getSupabaseFunctionUrl("public-teachers");
const TIMEOUT_MS = 5000;

let cachedResult: boolean | null = null;
let fetchPromise: Promise<boolean> | null = null;

function fetchTeachersExist(): Promise<boolean> {
  if (cachedResult !== null) return Promise.resolve(cachedResult);
  if (fetchPromise) return fetchPromise;

  fetchPromise = Promise.race([
    fetch(TEACHERS_API)
      .then((res) => {
        if (!res.ok) return { teachers: fallbackTeachers };
        return res.json();
      })
      .then((data) => {
        const teachers = data.teachers && data.teachers.length > 0 ? data.teachers : fallbackTeachers;
        cachedResult = teachers.length > 0;
        return cachedResult;
      }),
    new Promise<boolean>((resolve) =>
      setTimeout(() => {
        cachedResult = fallbackTeachers.length > 0;
        resolve(cachedResult);
      }, TIMEOUT_MS),
    ),
  ]).catch(() => {
    cachedResult = fallbackTeachers.length > 0;
    return cachedResult;
  });

  return fetchPromise;
}

export function useHasTeachers() {
  const [hasTeachers, setHasTeachers] = useState(cachedResult ?? false);
  const [loading, setLoading] = useState(cachedResult === null);

  useEffect(() => {
    if (cachedResult !== null) {
      setHasTeachers(cachedResult);
      setLoading(false);
      return;
    }
    fetchTeachersExist().then((result) => {
      setHasTeachers(result);
      setLoading(false);
    });
  }, []);

  return { hasTeachers, loading };
}
