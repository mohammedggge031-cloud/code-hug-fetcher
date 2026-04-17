import { supabase } from "@/integrations/supabase/client";

export const loadAdminConfig = async <T,>(name: string, fallback: T): Promise<T> => {
  const { data, error } = await supabase
    .from("custom_scripts")
    .select("script_content")
    .eq("name", name)
    .maybeSingle();

  if (error || !data?.script_content) return fallback;

  try {
    return JSON.parse(data.script_content) as T;
  } catch {
    return fallback;
  }
};

export const saveAdminConfig = async <T,>(name: string, value: T) => {
  // NOTE: `placement` has a CHECK constraint (head|body_start|body_end).
  // We use 'head' as a neutral parking value combined with is_active=false so
  // these rows are never rendered as actual <script> tags on the site.
  const payload = {
    name,
    placement: "head",
    script_content: JSON.stringify(value),
    is_active: false,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from("custom_scripts")
    .select("id")
    .eq("name", name)
    .maybeSingle();

  if (existing?.id) {
    return supabase.from("custom_scripts").update(payload).eq("id", existing.id);
  }

  return supabase.from("custom_scripts").insert(payload);
};