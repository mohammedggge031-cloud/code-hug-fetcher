import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify the caller is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify user is admin
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: corsHeaders });
    }

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin only" }), { status: 403, headers: corsHeaders });
    }

    const { categories, posts } = await req.json();

    // Insert categories first (ignore duplicates)
    if (categories && categories.length > 0) {
      const { error: catError } = await supabaseAdmin
        .from("blog_categories")
        .upsert(categories, { onConflict: "slug", ignoreDuplicates: true });
      if (catError) console.error("Cat insert error:", catError);
    }

    // Fetch all categories for mapping
    const { data: allCats } = await supabaseAdmin
      .from("blog_categories")
      .select("id, slug");
    
    const catMap: Record<string, string> = {};
    for (const c of allCats || []) catMap[c.slug] = c.id;

    // Check existing slugs
    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("slug");
    const existingSlugs = new Set((existing || []).map((p: any) => p.slug));

    // Map posts with category IDs and filter existing
    const newPosts = posts
      .filter((p: any) => !existingSlugs.has(p.slug))
      .map((p: any) => ({
        ...p,
        category_id: catMap[p.category_slug] || null,
        category_slug: undefined,
      }));

    // Batch insert
    let inserted = 0;
    const BATCH = 15;
    for (let i = 0; i < newPosts.length; i += BATCH) {
      const batch = newPosts.slice(i, i + BATCH);
      // Remove category_slug from each
      const clean = batch.map(({ category_slug, ...rest }: any) => rest);
      const { error } = await supabaseAdmin.from("blog_posts").insert(clean);
      if (error) {
        console.error(`Batch ${i} error:`, error);
      } else {
        inserted += clean.length;
      }
    }

    return new Response(
      JSON.stringify({ inserted, skipped: posts.length - newPosts.length, total: posts.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
});
