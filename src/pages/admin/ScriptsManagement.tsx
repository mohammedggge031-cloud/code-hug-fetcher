import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Code, Loader2 } from "lucide-react";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Script {
  id: string; name: string; script_content: string;
  placement: string; is_active: boolean | null; created_at: string;
}

const ScriptsManagement = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [editing, setEditing] = useState<Partial<Script> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Script | null>(null);
  const { user, isAdmin } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();

  const fetchScripts = async () => {
    setIsFetching(true);
    try {
      const data = await safeDataRequest<Script[]>({
        fallback: [],
        markGlobalFallbackOnError: false,
        request: async (signal) => {
          const { data, error } = await supabase.from("custom_scripts").select("*").order("created_at", { ascending: false }).abortSignal(signal);
          if (error) throw error;
          return data ?? [];
        },
      });
      setScripts(data);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchScripts(); }, []);

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">{t("scripts.admin_only")}</h2>
        <p className="text-muted-foreground">{t("scripts.admin_only_desc")}</p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!editing?.name || !editing.script_content) {
      toast({ title: t("err.error"), description: "Name and script content are required", variant: "destructive" }); return;
    }
    setIsSaving(true);
    try {
      const payload: Record<string, unknown> = { ...editing, updated_by: user?.id };
      if (isNew) {
        const { error } = await supabase.from("custom_scripts").insert(payload);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      } else {
        const { error } = await supabase.from("custom_scripts").update(payload).eq("id", editing.id!);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      }
      toast({ title: t("ok.done") }); setEditing(null); void fetchScripts();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (script: Script) => {
    try {
      const { error } = await supabase.from("custom_scripts").delete().eq("id", script.id);
      if (error) {
        toast({ title: t("err.error"), description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: t("ok.deleted") }); void fetchScripts();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("scripts.title")}</h1>
          <p className="text-muted-foreground">{t("scripts.subtitle")}</p>
        </div>
        <Button onClick={() => { setEditing({ name: "", script_content: "", placement: "head", is_active: true }); setIsNew(true); }}>
          <Plus className="h-4 w-4 me-1" /> {t("scripts.add")}
        </Button>
      </div>

      {isFetching ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4">
          {scripts.map(script => (
            <Card key={script.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{script.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{t("scripts.placement")}: {script.placement}</span>
                      <Badge variant={script.is_active ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                        {script.is_active ? t("scripts.active") : t("scripts.inactive")}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditing(script); setIsNew(false); }}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(script)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
            </Card>
          ))}
          {scripts.length === 0 && <Card><CardContent className="py-8 text-center text-muted-foreground">{t("scripts.empty")}</CardContent></Card>}
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) { handleDelete(deleteTarget); setDeleteTarget(null); } }}
        title={lang === "ar" ? "حذف السكربت؟" : "Delete Script?"}
        description={lang === "ar" ? "سيتم حذف هذا السكربت نهائياً." : "This script will be permanently deleted."}
        confirmLabel={t("ok.deleted")}
        cancelLabel={t("scripts.cancel")}
      />

      <Dialog open={!!editing} onOpenChange={open => !open && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{isNew ? t("scripts.add") : `${editing?.name}`}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>{t("scripts.name")}</Label><Input value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Facebook Pixel" /></div>
              <div className="space-y-2"><Label>{t("scripts.placement")}</Label>
                <Select value={editing.placement || "head"} onValueChange={v => setEditing({ ...editing, placement: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="head">Head</SelectItem><SelectItem value="body_start">Body Start</SelectItem><SelectItem value="body_end">Body End</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>{t("scripts.content")}</Label><Textarea value={editing.script_content || ""} onChange={e => setEditing({ ...editing, script_content: e.target.value })} rows={8} className="font-mono text-xs" dir="ltr" /></div>
              <div className="flex items-center gap-2"><Switch checked={editing.is_active ?? true} onCheckedChange={v => setEditing({ ...editing, is_active: v })} /><Label>{t("scripts.active")}</Label></div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1" disabled={isSaving}>
                  {isSaving ? <><Loader2 className="h-4 w-4 animate-spin me-1" />{t("login.loading")}</> : t("scripts.save")}
                </Button>
                <Button variant="outline" onClick={() => setEditing(null)}>{t("scripts.cancel")}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptsManagement;
