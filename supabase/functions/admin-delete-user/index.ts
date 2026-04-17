// Owner-only: hard-delete a dashboard user (auth + role + perms). Owner email is protected.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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
    if (!targetId) return json({ error: "user_id required" }, 400);
    if (targetId === callerId) return json({ error: "cannot delete yourself" }, 400);

    const { data: targetUser } = await admin.auth.admin.getUserById(targetId);
    const targetEmail = targetUser?.user?.email ?? "";
    if (targetEmail.toLowerCase() === "info@alhamdacademy.net") {
      return json({ error: "owner account cannot be deleted" }, 403);
    }

    // Delete child rows first (RLS bypassed by service role)
    await admin.from("user_permissions").delete().eq("user_id", targetId);
    await admin.from("user_roles").delete().eq("user_id", targetId);
    const { error: delErr } = await admin.auth.admin.deleteUser(targetId);
    if (delErr) return json({ error: delErr.message }, 400);

    await admin.from("admin_audit_log").insert({
      actor_id: callerId, actor_email: callerEmail,
      action: "user.deleted", target_id: targetId, target_email: targetEmail,
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
