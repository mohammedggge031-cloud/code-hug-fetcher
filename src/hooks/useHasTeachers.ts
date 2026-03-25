import { useState, useEffect } from "react";
import { fallbackTeachers } from "@/data/fallbackContent";
import { loadTeachersWithFallback } from "@/lib/teachersData";

let cachedResult: boolean | null = null;
let fetchPromise: Promise<boolean> | null = null;

function fetchTeachersExist(): Promise<boolean> {
  if (cachedResult !== null) return Promise.resolve(cachedResult);
  if (fetchPromise) return fetchPromise;

  fetchPromise = loadTeachersWithFallback()
    .then((teachers) => {
      cachedResult = teachers.length > 0;
      return cachedResult;
    })
    .catch(() => {
      cachedResult = fallbackTeachers.length > 0;
      return cachedResult;
    });

  return fetchPromise;
}

export function useHasTeachers() {
  const [hasTeachers, setHasTeachers] = useState(cachedResult ?? fallbackTeachers.length > 0);
  const [loading, setLoading] = useState(false);

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
