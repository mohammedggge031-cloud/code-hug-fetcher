/**
 * External Dashboard Integration
 * 
 * Teachers data and booking submissions go to the external management
 * dashboard (separate Supabase instance) — NOT the main site's Supabase.
 */

import { fetchWithTimeout, SUPABASE_TIMEOUT_MS } from "@/lib/safeRuntimeData";

const normalizeBaseUrl = (url?: string) => (url || "").replace(/\/+$/, "");

const getExternalBaseUrl = () =>
  normalizeBaseUrl(import.meta.env.VITE_EXTERNAL_DASHBOARD_URL);

/** Call an edge function on the external dashboard */
export const fetchExternalFunction = (functionName: string, init: RequestInit = {}) => {
  const base = getExternalBaseUrl();
  if (!base) {
    return Promise.reject(new Error("VITE_EXTERNAL_DASHBOARD_URL is not configured"));
  }

  const url = `${base}/functions/v1/${functionName.replace(/^\/+/, "")}`;
  return fetchWithTimeout(url, init, {
    timeoutMs: SUPABASE_TIMEOUT_MS,
    markGlobalFallbackOnError: false,
  });
};

/** Build the teachers REST endpoint on the external dashboard */
export const buildExternalTeachersEndpoint = () => {
  const base = getExternalBaseUrl();
  if (!base) return "";

  const params = new URLSearchParams({
    select:
      "id,name_en,name_ar,title_en,title_ar,bio_en,bio_ar,photo_url,specializations,rating,experience_years,education_en,education_ar",
    is_active: "eq.true",
    order: "display_order.asc,created_at.desc",
  });

  return `${base}/rest/v1/teachers?${params.toString()}`;
};
