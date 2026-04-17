import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type Permissions, type PermissionKey } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Crown, Shield, UserPlus, Trash2, Settings2, Loader2, Eye, EyeOff, Lock } from "lucide-react";
import { fetchSupabaseFunction } from "@/lib/supabaseFunctions";
import { withPromiseTimeout } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

const ASSIGNABLE_ROLES = ["admin", "editor", "seo_manager", "social_manager", "marketing_manager"] as const;
type AssignableRole = typeof ASSIGNABLE_ROLES[number];

// 3 simple access modes the owner can grant. Each maps to a real set of permissions.
const ACCESS_MODES = {
  content_seo: {
    label: "Content / SEO Manager",
    labelAr: "إدارة المحتوى والسيو",
    description: "Blog, Categories, Media, SEO, Scripts, Videos",
    perms: { can_manage_blog: true, can_manage_media: true, can_manage_seo: true, can_manage_scripts: true, can_manage_videos: true } as Partial<Permissions>,
  },
  ads_tracking: {
    label: "Ads / Tracking Manager",
    labelAr: "إدارة الإعلانات والتتبع",
    description: "Leads, Social, Ads tracking & reporting",
    perms: { can_manage_leads: true, can_manage_social: true } as Partial<Permissions>,
  },
  full_access: {
    label: "Full Access Admin",
    labelAr: "صلاحية كاملة",
    description: "Every dashboard module (cannot delete owner)",
    perms: { can_manage_seo: true, can_manage_social: true, can_manage_leads: true, can_manage_blog: true, can_manage_media: true, can_manage_scripts: true, can_manage_videos: true, can_manage_users: true } as Partial<Permissions>,
  },
} as const;
type AccessModeKey = keyof typeof ACCESS_MODES;

const MODE_KEYS = Object.keys(ACCESS_MODES) as AccessModeKey[];

// True when the permissions object includes every flag the mode requires.
const modeMatches = (perms: Permissions, mode: AccessModeKey) => {
  const required = ACCESS_MODES[mode].perms;
  return Object.entries(required).every(([k, v]) => v ? !!perms[k as PermissionKey] : true);
};

const activeModes = (perms: Permissions): AccessModeKey[] =>
  MODE_KEYS.filter((m) => modeMatches(perms, m));

const toggleMode = (perms: Permissions, mode: AccessModeKey, on: boolean): Permissions => {
  const next = { ...perms };
  for (const [k, v] of Object.entries(ACCESS_MODES[mode].perms)) {
    if (!v) continue;
    if (on) (next as any)[k] = true;
    else {
      // Only turn off keys that aren't required by another currently-on mode.
      const keepOn = MODE_KEYS.some((other) =>
        other !== mode &&
        modeMatches(perms, other) &&
        (ACCESS_MODES[other].perms as any)[k]
      );
      if (!keepOn) (next as any)[k] = false;
    }
  }
  return next;
};

const DEFAULT_PERMS: Permissions = {
  can_manage_seo: false,
  can_manage_social: false,
  can_manage_leads: false,
  can_manage_blog: false,
  can_manage_media: false,
  can_manage_scripts: false,
  can_manage_videos: false,
  can_manage_users: false,
  is_disabled: false,
};

interface UserRow {
  user_id: string;
  role: string;
  email?: string;
  permissions: Permissions;
  is_owner: boolean;
}

const PERM_LABELS: Record<PermissionKey, string> = {
  can_manage_seo: "SEO",
  can_manage_social: "Social",
  can_manage_leads: "Leads",
  can_manage_blog: "Blog",
  can_manage_media: "Media",
  can_manage_scripts: "Scripts",
  can_manage_videos: "Videos",
  can_manage_users: "Users (advanced)",
};

const UserManagement = () => {
  const { isOwner, isAdmin } = useAuth();
  const { lang } = useAdminLang();
  const { toast } = useToast();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Add dialog
  const [showAdd, setShowAdd] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [addRole, setAddRole] = useState<AssignableRole>("seo_manager");
  const [addPerms, setAddPerms] = useState<Permissions>({ ...DEFAULT_PERMS, ...ACCESS_MODES.content_seo.perms });
  const [adding, setAdding] = useState(false);

  // Edit dialog
  const [editTarget, setEditTarget] = useState<UserRow | null>(null);
  const [editRole, setEditRole] = useState<AssignableRole>("editor");
  const [editPerms, setEditPerms] = useState<Permissions>(DEFAULT_PERMS);
  const [savingEdit, setSavingEdit] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      const { data: roleData } = await supabase.from("user_roles").select("user_id, role").order("created_at");
      const { data: permData } = await (supabase as any).from("user_permissions").select("*");
      const userIds = (roleData ?? []).map(r => r.user_id);

      let emails: Record<string, string> = {};
      if (userIds.length) {
        try {
          const { data: sessionData } = await withPromiseTimeout(supabase.auth.getSession(), { markGlobalFallbackOnError: false });
          const token = sessionData?.session?.access_token;
          const res = await fetchSupabaseFunction("list-user-emails", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ user_ids: userIds }),
          });
          const json = await res.json();
          if (res.ok && json.users) emails = json.users;
        } catch { /* ignore */ }
      }

      const permMap: Record<string, Permissions> = {};
      (permData ?? []).forEach((p: any) => { permMap[p.user_id] = { ...DEFAULT_PERMS, ...p }; });

      const merged: UserRow[] = (roleData ?? []).map(r => ({
        user_id: r.user_id,
        role: r.role,
        email: emails[r.user_id],
        permissions: permMap[r.user_id] ?? DEFAULT_PERMS,
        is_owner: (emails[r.user_id] ?? "").toLowerCase() === "info@alhamdacademy.net" || (r.role as string) === "owner",
      }));
      setRows(merged);
    } finally { setLoading(false); }
  };

  useEffect(() => { void loadAll(); }, []);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Lock className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Owner only</h2>
        <p className="text-muted-foreground mt-1">Only the Owner account can manage users and permissions.</p>
      </div>
    );
  }

  const setMode = (mode: AccessModeKey, on: boolean, target: "add" | "edit") => {
    if (target === "add") setAddPerms((p) => toggleMode(p, mode, on));
    else setEditPerms((p) => toggleMode(p, mode, on));
  };

  const handleCreate = async () => {
    if (!addEmail || addPassword.length < 8) {
      toast({ title: "Error", description: "Email and a password (≥8 chars) are required.", variant: "destructive" });
      return;
    }
    setAdding(true);
    try {
      const { data: sessionData } = await withPromiseTimeout(supabase.auth.getSession(), { markGlobalFallbackOnError: false });
      const token = sessionData?.session?.access_token;
      const res = await fetchSupabaseFunction("admin-create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: addEmail, password: addPassword, role: addRole, permissions: addPerms }),
      });
      const json = await res.json();
      if (!res.ok) { toast({ title: "Error", description: json.error || "Failed", variant: "destructive" }); return; }
      toast({ title: "✅ Account created", description: addEmail });
      setShowAdd(false); setAddEmail(""); setAddPassword(""); setAddRole("seo_manager");
      setAddPerms({ ...DEFAULT_PERMS, ...ACCESS_MODES.content_seo.perms });
      void loadAll();
    } finally { setAdding(false); }
  };

  const openEdit = (row: UserRow) => {
    setEditTarget(row);
    setEditRole((ASSIGNABLE_ROLES.includes(row.role as AssignableRole) ? row.role : "editor") as AssignableRole);
    setEditPerms(row.permissions);
  };

  const handleSaveEdit = async () => {
    if (!editTarget) return;
    setSavingEdit(true);
    try {
      const { data: sessionData } = await withPromiseTimeout(supabase.auth.getSession(), { markGlobalFallbackOnError: false });
      const token = sessionData?.session?.access_token;
      const res = await fetchSupabaseFunction("admin-update-permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id: editTarget.user_id, role: editRole, permissions: editPerms }),
      });
      const json = await res.json();
      if (!res.ok) { toast({ title: "Error", description: json.error || "Failed", variant: "destructive" }); return; }
      toast({ title: "✅ Saved" });
      setEditTarget(null);
      void loadAll();
    } finally { setSavingEdit(false); }
  };

  const handleDelete = async (row: UserRow) => {
    try {
      const { data: sessionData } = await withPromiseTimeout(supabase.auth.getSession(), { markGlobalFallbackOnError: false });
      const token = sessionData?.session?.access_token;
      const res = await fetchSupabaseFunction("admin-delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id: row.user_id }),
      });
      const json = await res.json();
      if (!res.ok) { toast({ title: "Error", description: json.error || "Failed", variant: "destructive" }); return; }
      toast({ title: "Deleted" });
      void loadAll();
    } finally { setDeleteTarget(null); }
  };

  const initials = (e?: string) => (e ? e.split("@")[0].slice(0, 2).toUpperCase() : "??");

  const roleBadge = (row: UserRow) => {
    if (row.is_owner) return <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20 gap-1"><Crown className="h-3 w-3" /> Owner</Badge>;
    return <Badge variant="secondary" className="gap-1"><Shield className="h-3 w-3" /> {row.role}</Badge>;
  };

  const AccessModeChooser = ({ value, target }: { value: Permissions; target: "add" | "edit" }) => {
    const active = activeModes(value);
    return (
      <div className="grid gap-2 sm:grid-cols-3">
        {MODE_KEYS.map((mode) => {
          const isOn = active.includes(mode);
          const meta = ACCESS_MODES[mode];
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setMode(mode, !isOn, target)}
              className={`text-start rounded-lg border p-3 transition-colors ${isOn ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-medium text-sm">{lang === "ar" ? meta.labelAr : meta.label}</span>
                <Checkbox checked={isOn} className="pointer-events-none" />
              </div>
              <p className="text-xs text-muted-foreground">{meta.description}</p>
            </button>
          );
        })}
      </div>
    );
  };

  const PermissionGrid = ({ value, onChange }: { value: Permissions; onChange: (p: Permissions) => void }) => (
    <div className="grid grid-cols-2 gap-2">
      {(Object.keys(PERM_LABELS) as PermissionKey[]).map(k => (
        <label key={k} className="flex items-center gap-2 text-sm rounded-md border p-2 cursor-pointer hover:bg-muted/50">
          <Checkbox checked={!!value[k]} onCheckedChange={(v) => onChange({ ...value, [k]: !!v })} />
          <span>{PERM_LABELS[k]}</span>
        </label>
      ))}
      <label className="col-span-2 flex items-center gap-2 text-sm rounded-md border border-destructive/30 p-2 cursor-pointer hover:bg-destructive/5">
        <Checkbox checked={value.is_disabled} onCheckedChange={(v) => onChange({ ...value, is_disabled: !!v })} />
        <span className="text-destructive">Disable account (revokes all access)</span>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Owner-only: create accounts and assign granular permissions.</p>
        </div>
        {isOwner && <Button onClick={() => setShowAdd(true)} className="gap-2"><UserPlus className="h-4 w-4" /> Add user</Button>}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow><TableCell colSpan={4} className="text-center py-12"><Loader2 className="h-5 w-5 animate-spin mx-auto" /></TableCell></TableRow>
              )}
              {!loading && rows.map(r => {
                const activePerms = (Object.keys(PERM_LABELS) as PermissionKey[]).filter(k => r.is_owner || r.permissions[k]);
                return (
                  <TableRow key={r.user_id} className={r.permissions.is_disabled ? "opacity-50" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials(r.email)}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium text-sm">{r.email ?? r.user_id.slice(0, 8)}</p>
                          {r.permissions.is_disabled && <p className="text-xs text-destructive">Disabled</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{roleBadge(r)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-md">
                        {r.is_owner && <Badge variant="outline" className="text-xs">All</Badge>}
                        {!r.is_owner && activePerms.length === 0 && <span className="text-xs text-muted-foreground">None</span>}
                        {!r.is_owner && activePerms.slice(0, 5).map(k => (
                          <Badge key={k} variant="outline" className="text-xs">{PERM_LABELS[k]}</Badge>
                        ))}
                        {!r.is_owner && activePerms.length > 5 && <Badge variant="outline" className="text-xs">+{activePerms.length - 5}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                         {isOwner && !r.is_owner && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => openEdit(r)} title="Edit"><Settings2 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(r)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
                          </>
                        )}
                        {r.is_owner && <Lock className="h-4 w-4 text-muted-foreground" aria-label="Owner is protected" />}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!loading && rows.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-12">No users yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add user dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Add user</DialogTitle>
            <DialogDescription>Create a new dashboard account with role + permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={addEmail} onChange={e => setAddEmail(e.target.value)} dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>Password (min 8)</Label>
              <div className="relative">
                <Input type={showPwd ? "text" : "password"} value={addPassword} onChange={e => setAddPassword(e.target.value)} dir="ltr" className="pe-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground" tabIndex={-1}>
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={addRole} onValueChange={(v) => setAddRole(v as AssignableRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ASSIGNABLE_ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quick presets</Label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(PRESETS).map(k => (
                  <Button key={k} type="button" variant="outline" size="sm" onClick={() => applyPreset(k, "add")}>{k.replace(/_/g, " ")}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <PermissionGrid value={addPerms} onChange={setAddPerms} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={adding}>
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit user dialog */}
      <Dialog open={!!editTarget} onOpenChange={(v) => !v && setEditTarget(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Settings2 className="h-5 w-5" /> Edit user</DialogTitle>
            <DialogDescription>{editTarget?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={editRole} onValueChange={(v) => setEditRole(v as AssignableRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ASSIGNABLE_ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quick presets</Label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(PRESETS).map(k => (
                  <Button key={k} type="button" variant="outline" size="sm" onClick={() => applyPreset(k, "edit")}>{k.replace(/_/g, " ")}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <PermissionGrid value={editPerms} onChange={setEditPerms} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={savingEdit}>
              {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={async () => { if (deleteTarget) await handleDelete(deleteTarget); }}
        title="Delete user"
        description={`Permanently delete ${deleteTarget?.email}? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default UserManagement;
