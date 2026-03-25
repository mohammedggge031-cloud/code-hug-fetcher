import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Content-Type": "application/json",
};

type TeacherRow = {
  id: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  bio_en: string;
  bio_ar: string;
  photo_url: string | null;
  specializations: string[] | null;
  rating: number | null;
  experience_years: number | null;
  education_en: string | null;
  education_ar: string | null;
};

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
    const { data, error } = await supabase
      .from("teachers")
      .select(
        "id,name_en,name_ar,title_en,title_ar,bio_en,bio_ar,photo_url,specializations,rating,experience_years,education_en,education_ar"
      )
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

    const teachers = (data as TeacherRow[] | null)?.map((teacher) => ({
      id: teacher.id,
      name_en: teacher.name_en,
      name_ar: teacher.name_ar,
      title_en: teacher.title_en,
      title_ar: teacher.title_ar,
      bio_en: teacher.bio_en,
      bio_ar: teacher.bio_ar,
      photo_url: teacher.photo_url ?? "",
      specializations: Array.isArray(teacher.specializations) ? teacher.specializations : [],
      rating: typeof teacher.rating === "number" ? teacher.rating : 0,
      experience_years: teacher.experience_years ?? undefined,
      education_en: teacher.education_en ?? undefined,
      education_ar: teacher.education_ar ?? undefined,
    })) ?? [];

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
