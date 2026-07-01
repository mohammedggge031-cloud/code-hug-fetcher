import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Content-Type": "application/json",
};

type TeacherRow = Record<string, unknown> & { id: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ teachers: [] }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    // Explicit allowlist of public-safe columns. Prevents accidental exposure of
    // any future internal columns (contact info, admin notes, salary, etc.) that
    // may be added to the teachers table. Any new public-facing field must be
    // added here intentionally.
    const PUBLIC_COLUMNS = [
      "id",
      "name_en", "name_ar", "name",
      "title_en", "title_ar",
      "bio_en", "bio_ar", "bio",
      "photo_url", "photo",
      "specializations", "subjects",
      "rating", "experience_years",
      "education_en", "education_ar",
      "qualification_en", "qualification_ar", "qualification",
      "academic_degree_en", "academic_degree_ar", "academic_degree",
      "ijazat_en", "ijazat_ar", "ijazat",
      "gender",
      "about_en", "about_ar", "about",
      "is_active", "display_order", "created_at",
    ].join(", ");

    const { data, error } = await supabase
      .from("teachers")
      .select(PUBLIC_COLUMNS)
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "42P01") {
        return new Response(JSON.stringify({ teachers: [] }), {
          status: 200,
          headers: corsHeaders,
        });
      }

      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const teachers = (data as TeacherRow[] | null) ?? [];

    return new Response(JSON.stringify({ teachers }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch {
    return new Response(JSON.stringify({ teachers: [] }), {
      status: 200,
      headers: corsHeaders,
    });
  }
});
