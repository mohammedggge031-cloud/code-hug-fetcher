import { useState, useEffect } from "react";

const TEACHERS_API = "https://xoymllyfwvbnbxsbbinu.supabase.co/functions/v1/public-teachers";

let cachedResult: boolean | null = null;
let fetchPromise: Promise<boolean> | null = null;

function fetchTeachersExist(): Promise<boolean> {
  if (cachedResult !== null) return Promise.resolve(cachedResult);
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch(TEACHERS_API)
    .then((res) => res.json())
    .then((data) => {
      cachedResult = !!(data.teachers && data.teachers.length > 0);
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
