// Owner-only: update role and/or granular permissions for a user.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PERM_KEYS = [
  "can_manage_seo", "can_manage_social", "can_manage_leads", "can_manage_blog",
  "can_manage_media", "can_manage_scripts", "can_manage_videos", "can_manage_users", "is_disabled",
] as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "missing token" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData?.user) return json({ error: "invalid session" }, 401);
    const callerId = userData.user.id;
    const callerEmail = userData.user.email ?? "";

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: ownerRow } = await admin
      .from("user_roles").select("role").eq("user_id", callerId).eq("role", "owner").maybeSingle();
    if (!ownerRow) return json({ error: "owner only" }, 403);

    const body = await req.json();
    const targetId = String(body.user_id ?? "");
    const newRole = body.role ? String(body.role) : null;
    const permissions = body.permissions ?? null;

    if (!targetId) return json({ error: "user_id required" }, 400);

    // Look up target email — block dangerous edits to owner
    const { data: targetUser } = await admin.auth.admin.getUserById(targetId);
    const targetEmail = targetUser?.user?.email ?? "";
    if (targetEmail.toLowerCase() === "info@alhamdacademy.net") {
      return json({ error: "owner account is immutable" }, 403);
    }

    // Update role
    if (newRole) {
      const allowedRoles = ["admin", "editor", "seo_manager", "social_manager", "marketing_manager"];
      if (!allowedRoles.includes(newRole)) return json({ error: "invalid role" }, 400);
      // Replace any existing role row for this user
      await admin.from("user_roles").delete().eq("user_id", targetId);
      const { error: roleErr } = await admin.from("user_roles")
        .insert({ user_id: targetId, role: newRole });
      if (roleErr) return json({ error: roleErr.message }, 400);
    }

    // Update permissions
    if (permissions && typeof permissions === "object") {
      const row: Record<string, unknown> = { user_id: targetId };
      for (const k of PERM_KEYS) {
        if (k in permissions) row[k] = !!permissions[k];
      }
      const { error: permErr } = await admin.from("user_permissions").upsert(row);
      if (permErr) return json({ error: permErr.message }, 400);
    }

    await admin.from("admin_audit_log").insert({
      actor_id: callerId, actor_email: callerEmail,
      action: "user.updated", target_id: targetId, target_email: targetEmail,
      details: { role: newRole, permissions },
    });

    return json({ ok: true });
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
