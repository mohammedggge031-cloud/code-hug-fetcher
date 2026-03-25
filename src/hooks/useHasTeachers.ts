import { useState, useEffect } from "react";
import { loadTeachers } from "@/lib/teachersData";

let cachedResult: boolean | null = null;
let fetchPromise: Promise<boolean> | null = null;

function fetchTeachersExist(): Promise<boolean> {
  if (cachedResult !== null) return Promise.resolve(cachedResult);
  if (fetchPromise) return fetchPromise;

  fetchPromise = loadTeachers()
    .then((teachers) => {
      cachedResult = teachers.length > 0;
      return cachedResult;
    })
    .catch(() => {
      cachedResult = false;
      return false;
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
