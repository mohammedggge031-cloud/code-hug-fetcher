import { fetchWithTimeout, SUPABASE_TIMEOUT_MS } from "@/lib/safeRuntimeData";

const normalizeBaseUrl = (url?: string) => (url || "").replace(/\/+$/, "");

const SUPABASE_FUNCTIONS_BASE = `${normalizeBaseUrl(import.meta.env.VITE_SUPABASE_URL)}/functions/v1`;

export const getSupabaseFunctionUrl = (functionName: string) =>
  `${SUPABASE_FUNCTIONS_BASE}/${functionName.replace(/^\/+/, "")}`;

export const fetchSupabaseFunction = (functionName: string, init: RequestInit = {}) =>
  fetchWithTimeout(getSupabaseFunctionUrl(functionName), init, {
    timeoutMs: SUPABASE_TIMEOUT_MS,
    markGlobalFallbackOnError: false,
  });
