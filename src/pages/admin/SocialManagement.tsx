import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { loadAdminConfig, saveAdminConfig } from "@/lib/adminConfig";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Pencil, Plus, Save } from "lucide-react";

type SocialProfile = {
  id: string;
  platform: string;
  label: string;
  url: string;
  active: boolean;
};

const defaultProfiles: SocialProfile[] = [
  { id: "whatsapp", platform: "WhatsApp", label: "WhatsApp", url: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B", active: true },
  { id: "facebook", platform: "Facebook", label: "Facebook", url: "https://www.facebook.com/share/1BFyf4qMm8/", active: true },
  { id: "instagram", platform: "Instagram", label: "Instagram", url: "https://www.instagram.com/alhamdacademy_official", active: true },
  { id: "youtube", platform: "YouTube", label: "YouTube", url: "https://www.youtube.com/@alhamdacademy_official", active: true },
  { id: "tiktok", platform: "TikTok", label: "TikTok", url: "https://www.tiktok.com/@alhamdacademy_official", active: true },
];

const SocialManagement = () => {
  const { isAdmin, can } = useAuth();
  const { lang } = useAdminLang();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<SocialProfile[]>([]);
  const [editing, setEditing] = useState<SocialProfile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadAdminConfig<SocialProfile[]>("social_profiles", defaultProfiles).then(setProfiles);
  }, []);

  const copy = useMemo(() => lang === "ar" ? {
    title: "إدارة السوشيال",
    subtitle: "روابط القنوات التسويقية والاجتماعية المستخدمة حالياً.",
    add: "إضافة قناة",
    save: "حفظ",
    active: "نشط",
  } : {
    title: "Social Management",
    subtitle: "The marketing and social links currently used by the brand.",
    add: "Add Profile",
    save: "Save",
    active: "Active",
  }, [lang]);

  if (!(can("can_manage_social") || isOwner)) {
    return <div className="py-16 text-center text-muted-foreground">Access denied.</div>;
  }

  const persist = async (next: SocialProfile[]) => {
    setSaving(true);
    const { error } = await saveAdminConfig("social_profiles", next);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    setProfiles(next);
    toast({ title: copy.save });
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{copy.title}</h1>
          <p className="text-muted-foreground">{copy.subtitle}</p>
        </div>
        <Button onClick={() => setEditing({ id: `social-${Date.now()}`, platform: "", label: "", url: "", active: true })} className="gap-2"><Plus className="h-4 w-4" /> {copy.add}</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-primary" /> {copy.title}</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.platform}</TableCell>
                  <TableCell>{profile.label}</TableCell>
                  <TableCell className="max-w-[320px] truncate text-muted-foreground">{profile.url}</TableCell>
                  <TableCell><Badge variant={profile.active ? "default" : "secondary"}>{profile.active ? copy.active : "Paused"}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon" onClick={() => setEditing(profile)}><Pencil className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.label || copy.add}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Platform</Label><Input value={editing.platform} onChange={(e) => setEditing({ ...editing, platform: e.target.value })} /></div>
                <div className="space-y-2"><Label>Label</Label><Input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>URL</Label><Input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} /></div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><Label>{copy.active}</Label><Switch checked={editing.active} onCheckedChange={(value) => setEditing({ ...editing, active: value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button disabled={saving || !editing} onClick={async () => {
              if (!editing) return;
              const exists = profiles.some((item) => item.id === editing.id);
              const next = exists ? profiles.map((item) => item.id === editing.id ? editing : item) : [...profiles, editing];
              const ok = await persist(next);
              if (ok) setEditing(null);
            }} className="gap-2"><Save className="h-4 w-4" /> {copy.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialManagement;