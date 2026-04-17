// Owner-only: create a new dashboard user with role + granular permissions.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PERM_KEYS = [
  "can_manage_seo", "can_manage_blog", "can_manage_media",
  "can_manage_scripts", "can_manage_videos", "can_manage_users",
] as const;

type PermKey = typeof PERM_KEYS[number];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "missing token" }, 401);

    // Identify caller
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData?.user) return json({ error: "invalid session" }, 401);
    const callerId = userData.user.id;
    const callerEmail = userData.user.email ?? "";

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    // Verify caller is owner
    const { data: ownerRow } = await admin
      .from("user_roles").select("role").eq("user_id", callerId).eq("role", "owner").maybeSingle();
    if (!ownerRow) return json({ error: "owner only" }, 403);

    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const role = String(body.role ?? "editor");
    const permissions = (body.permissions ?? {}) as Record<PermKey, boolean>;

    if (!email || !password || password.length < 8) {
      return json({ error: "email + password (min 8) required" }, 400);
    }
    const allowedRoles = ["admin", "editor", "seo_manager", "social_manager", "marketing_manager"];
    if (!allowedRoles.includes(role)) return json({ error: "invalid role" }, 400);
    if (email === "info@alhamdacademy.net" && role !== "owner") {
      return json({ error: "owner email reserved" }, 400);
    }

    // Create auth user (auto-confirm)
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email, password, email_confirm: true,
    });
    if (createErr || !created.user) return json({ error: createErr?.message ?? "create failed" }, 400);
    const newId = created.user.id;

    // Insert role
    const { error: roleErr } = await admin.from("user_roles")
      .insert({ user_id: newId, role });
    if (roleErr) return json({ error: roleErr.message }, 400);

    // Insert permissions
    const permRow: Record<string, unknown> = { user_id: newId };
    for (const k of PERM_KEYS) permRow[k] = !!permissions[k];
    const { error: permErr } = await admin.from("user_permissions").upsert(permRow);
    if (permErr) return json({ error: permErr.message }, 400);

    // Audit
    await admin.from("admin_audit_log").insert({
      actor_id: callerId, actor_email: callerEmail,
      action: "user.created", target_id: newId, target_email: email,
      details: { role, permissions: permRow },
    });

    return json({ ok: true, user_id: newId });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
