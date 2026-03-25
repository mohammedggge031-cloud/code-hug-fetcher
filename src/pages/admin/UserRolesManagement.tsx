import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Shield, Crown, UserPlus, Mail, KeyRound, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchSupabaseFunction } from "@/lib/supabaseFunctions";

const SUPER_ADMIN_ID = "91122b58-4875-42f5-a4a6-6df6569a388d";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

const UserRolesManagement = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [emailMap, setEmailMap] = useState<Record<string, string>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [newRole, setNewRole] = useState<string>("editor");
  const { isAdmin, user } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();
  const [addLoading, setAddLoading] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(false);

  const isSuperAdmin = user?.id === SUPER_ADMIN_ID;

  const fetchEmails = async (userIds: string[]) => {
    if (userIds.length === 0) return;
    setLoadingEmails(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      const res = await fetchSupabaseFunction("list-user-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_ids: userIds }),
      });
      const result = await res.json();
      if (res.ok && result.users) setEmailMap(result.users);
    } catch {} finally { setLoadingEmails(false); }
  };

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("*").order("created_at");
    if (data) { setRoles(data); fetchEmails(data.map(r => r.user_id)); }
  };

  useEffect(() => { fetchRoles(); }, []);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">{t("team.admin_only")}</h2>
        <p className="text-muted-foreground mt-1">{t("team.admin_only_desc")}</p>
      </div>
    );
  }

  const handleAdd = async () => {
    if (!newEmail) { toast({ title: t("err.error"), description: t("err.email_required"), variant: "destructive" }); return; }
    if (createNew && !newPassword) { toast({ title: t("err.error"), description: t("err.password_required"), variant: "destructive" }); return; }
    if (createNew && newPassword.length < 6) { toast({ title: t("err.error"), description: t("err.password_short"), variant: "destructive" }); return; }
    if (newRole === "admin" && !isSuperAdmin) {
      toast({ title: t("err.not_allowed"), description: t("err.only_super_add"), variant: "destructive" }); return;
    }

    setAddLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      const res = await fetchSupabaseFunction("get-user-by-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: newEmail, password: newPassword, create_if_not_found: createNew }),
      });
      const result = await res.json();
      if (!res.ok) { toast({ title: t("err.error"), description: result.error || t("err.user_not_found"), variant: "destructive" }); return; }
      if (result.created) { toast({ title: `✅ ${t("ok.account_created")}`, description: `${t("ok.account_created_for")} ${result.email}` }); }

      const { error } = await supabase.from("user_roles").insert({ user_id: result.user_id, role: newRole as any });
      if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      toast({ title: `✅ ${t("ok.done")}`, description: t("ok.role_assigned") });
      setShowAdd(false); setNewEmail(""); setNewPassword(""); setCreateNew(false); fetchRoles();
    } finally { setAddLoading(false); }
  };

  const handleDelete = async (r: UserRole) => {
    if (r.user_id === SUPER_ADMIN_ID) { toast({ title: t("err.not_allowed"), description: t("err.cant_del_super"), variant: "destructive" }); return; }
    if (!isSuperAdmin) { toast({ title: t("err.not_allowed"), description: t("err.only_super_del"), variant: "destructive" }); return; }
    await supabase.from("user_roles").delete().eq("id", r.id);
    toast({ title: t("ok.deleted") }); fetchRoles();
  };

  const getInitials = (email: string) => email.split("@")[0].slice(0, 2).toUpperCase();

  const getRoleBadge = (role: string, userId: string) => {
    if (userId === SUPER_ADMIN_ID) return <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20 gap-1"><Crown className="h-3 w-3" /> {t("team.badge.super")}</Badge>;
    if (role === "admin") return <Badge className="bg-primary/10 text-primary border-primary/20 gap-1"><Shield className="h-3 w-3" /> {t("team.badge.admin")}</Badge>;
    return <Badge variant="secondary" className="gap-1"><Shield className="h-3 w-3" /> {t("team.badge.editor")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("team.title")}</h1>
          <p className="text-muted-foreground">{t("team.subtitle")}</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2"><UserPlus className="h-4 w-4" /> {t("team.add")}</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("team.member")}</TableHead>
                <TableHead>{t("team.role")}</TableHead>
                <TableHead>{t("team.date")}</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(r => {
                const email = emailMap[r.user_id] || "";
                return (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{email ? getInitials(email) : "??"}</AvatarFallback></Avatar>
                        <p className="font-medium text-sm">{loadingEmails ? <span className="text-muted-foreground">{t("team.loading")}</span> : (email || t("team.unknown"))}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(r.role, r.user_id)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </TableCell>
                    <TableCell>
                      {r.user_id !== SUPER_ADMIN_ID && isSuperAdmin && (
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(r)}><Trash2 className="h-4 w-4" /></Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {roles.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-12"><UserPlus className="h-8 w-8 mx-auto mb-2 opacity-40" />{t("team.empty")}</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> {t("team.dialog.title")}</DialogTitle>
            <DialogDescription>{t("team.dialog.desc")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {t("team.email")}</Label>
              <Input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} dir="ltr" />
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse rounded-lg border p-3 bg-muted/30">
              <Checkbox id="create-new" checked={createNew} onCheckedChange={(v) => setCreateNew(!!v)} />
              <Label htmlFor="create-new" className="cursor-pointer text-sm leading-relaxed">{t("team.create_new")}</Label>
            </div>
            {createNew && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-muted-foreground" /> {t("team.password")}</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} dir="ltr" />
              </div>
            )}
            <div className="space-y-2">
              <Label>{t("team.role_label")}</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {isSuperAdmin && <SelectItem value="admin">{t("team.role.admin")}</SelectItem>}
                  <SelectItem value="editor">{t("team.role.editor")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} className="w-full gap-2" disabled={addLoading}>
              {addLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("team.submitting")}</> : <><UserPlus className="h-4 w-4" /> {t("team.submit")}</>}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRolesManagement;
