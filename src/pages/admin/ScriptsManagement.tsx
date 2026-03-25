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
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Code } from "lucide-react";

interface Script {
  id: string; name: string; script_content: string;
  placement: string; is_active: boolean | null; created_at: string;
}

const ScriptsManagement = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [editing, setEditing] = useState<Partial<Script> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { user, isAdmin } = useAuth();
  const { t } = useAdminLang();
  const { toast } = useToast();

  const fetchScripts = async () => {
    const { data } = await supabase.from("custom_scripts").select("*").order("created_at", { ascending: false });
    if (data) setScripts(data);
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
    const payload = { ...editing, updated_by: user?.id };
    if (isNew) { const { error } = await supabase.from("custom_scripts").insert(payload as any); if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; } }
    else { const { error } = await supabase.from("custom_scripts").update(payload as any).eq("id", editing.id!); if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; } }
    toast({ title: t("ok.done") }); setEditing(null); fetchScripts();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("custom_scripts").delete().eq("id", id);
    toast({ title: t("ok.deleted") }); fetchScripts();
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

      <div className="grid gap-4">
        {scripts.map(script => (
          <Card key={script.id}>
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Code className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">{script.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{t("scripts.placement")}: {script.placement} • {script.is_active ? t("scripts.active") : t("scripts.inactive")}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => { setEditing(script); setIsNew(false); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(script.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
          </Card>
        ))}
        {scripts.length === 0 && <Card><CardContent className="py-8 text-center text-muted-foreground">{t("scripts.empty")}</CardContent></Card>}
      </div>

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
                <Button onClick={handleSave} className="flex-1">{t("scripts.save")}</Button>
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
