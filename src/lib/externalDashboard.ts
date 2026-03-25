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

const getExternalAnonKey = () =>
  import.meta.env.VITE_EXTERNAL_DASHBOARD_ANON_KEY || "";

/** Call an edge function on the external dashboard */
export const fetchExternalFunction = (functionName: string, init: RequestInit = {}) => {
  const base = getExternalBaseUrl();
  const anonKey = getExternalAnonKey();
  if (!base) {
    return Promise.reject(new Error("VITE_EXTERNAL_DASHBOARD_URL is not configured"));
  }

  const url = `${base}/functions/v1/${functionName.replace(/^\/+/, "")}`;
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string>),
  };
  if (anonKey) {
    headers["apikey"] = anonKey;
    headers["Authorization"] = `Bearer ${anonKey}`;
  }

  return fetchWithTimeout(url, { ...init, headers }, {
    timeoutMs: SUPABASE_TIMEOUT_MS,
    markGlobalFallbackOnError: false,
  });
};

