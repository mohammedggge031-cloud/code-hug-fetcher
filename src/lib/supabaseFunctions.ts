const normalizeBaseUrl = (url?: string) => (url || "").replace(/\/+$/, "");

const SUPABASE_FUNCTIONS_BASE = `${normalizeBaseUrl(import.meta.env.VITE_SUPABASE_URL)}/functions/v1`;

export const getSupabaseFunctionUrl = (functionName: string) =>
  `${SUPABASE_FUNCTIONS_BASE}/${functionName.replace(/^\/+/, "")}`;
