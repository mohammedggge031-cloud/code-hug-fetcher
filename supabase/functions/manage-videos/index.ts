import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user: caller } } = await supabaseClient.auth.getUser();
    if (!caller) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    // Check caller is super admin (first admin by created_at)
    const { data: allAdmins } = await supabaseClient
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin")
      .order("created_at", { ascending: true });

    const superAdminId = allAdmins?.[0]?.user_id;
    if (caller.id !== superAdminId) {
      return new Response(JSON.stringify({ error: "Only Super Admin can manage videos" }), { status: 403, headers: corsHeaders });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (req.method === "GET" || action === "list") {
      const { data, error } = await adminClient
        .from("videos")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
      return new Response(JSON.stringify({ videos: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    if (action === "add") {
      const { title_en, title_ar, description_en, description_ar, youtube_id, category, category_ar, language } = body;
      if (!title_en || !youtube_id || !category) {
        return new Response(JSON.stringify({ error: "title_en, youtube_id, category required" }), { status: 400, headers: corsHeaders });
      }
      const { data, error } = await adminClient.from("videos").insert({
        title_en, title_ar: title_ar || "", description_en: description_en || "", description_ar: description_ar || "",
        youtube_id, category, category_ar: category_ar || "", language: language || "en",
      }).select().single();
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
      return new Response(JSON.stringify({ video: data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "update") {
      const { id, ...updates } = body;
      if (!id) return new Response(JSON.stringify({ error: "id required" }), { status: 400, headers: corsHeaders });
      const { error } = await adminClient.from("videos").update(updates).eq("id", id);
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "delete") {
      const { id } = body;
      if (!id) return new Response(JSON.stringify({ error: "id required" }), { status: 400, headers: corsHeaders });
      const { error } = await adminClient.from("videos").delete().eq("id", id);
      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
