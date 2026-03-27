import { useState, useEffect } from "react";
import { loadTeachers } from "@/lib/teachersData";

/**
 * Lightweight hook that checks if any teachers exist.
 * Shares the same singleton cache as loadTeachers() — zero extra network requests.
 */
export function useHasTeachers() {
  const [hasTeachers, setHasTeachers] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    loadTeachers()
      .then((teachers) => {
        if (!cancelled) {
          setHasTeachers(teachers.length > 0);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasTeachers(false);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { hasTeachers, loading };
}
