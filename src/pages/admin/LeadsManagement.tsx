import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { loadAdminConfig, saveAdminConfig } from "@/lib/adminConfig";
import { useToast } from "@/hooks/use-toast";
import { Inbox, Pencil, Plus, Save } from "lucide-react";

type LeadChannel = {
  id: string;
  name: string;
  source: string;
  destination: string;
  notes: string;
  enabled: boolean;
};

const defaultChannels: LeadChannel[] = [
  { id: "contact-form", name: "Main Contact Form", source: "website", destination: "receive-booking", notes: "Primary site form pushes booking payloads to the external dashboard.", enabled: true },
  { id: "trial-registration", name: "Trial Registration", source: "paid_social", destination: "receive-booking", notes: "Paid campaign landing page reuses the same booking payload with UTM-derived source.", enabled: true },
  { id: "whatsapp", name: "WhatsApp Direct", source: "direct", destination: "wa.me", notes: "Opens WhatsApp for immediate manual lead capture.", enabled: true },
  { id: "email", name: "Email Inquiries", source: "direct", destination: "mailto", notes: "Routes inquiries to info@alhamdacademy.net.", enabled: true },
];

const LeadsManagement = () => {
  const { isAdmin, can } = useAuth();
  const { lang } = useAdminLang();
  const { toast } = useToast();
  const [channels, setChannels] = useState<LeadChannel[]>([]);
  const [editing, setEditing] = useState<LeadChannel | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadAdminConfig<LeadChannel[]>("lead_channels", defaultChannels).then(setChannels);
  }, []);

  const copy = useMemo(() => lang === "ar" ? {
    title: "إدارة العملاء المحتملين",
    subtitle: "قنوات جمع الطلبات الفعلية المركبة في الموقع الآن.",
    info: "طلبات النماذج تُرسل إلى receive-booking في النظام الخارجي، بينما واتساب والبريد يعملان كقنوات مباشرة.",
    add: "إضافة قناة",
    save: "حفظ",
    active: "نشط",
  } : {
    title: "Leads Management",
    subtitle: "The real lead intake channels currently wired into the site.",
    info: "Form submissions are sent to the external receive-booking flow, while WhatsApp and email stay direct-contact channels.",
    add: "Add Channel",
    save: "Save",
    active: "Active",
  }, [lang]);

  if (!(can("can_manage_leads") || isAdmin)) {
    return <div className="py-16 text-center text-muted-foreground">Access denied.</div>;
  }

  const persist = async (next: LeadChannel[]) => {
    setSaving(true);
    const { error } = await saveAdminConfig("lead_channels", next);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    setChannels(next);
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
        <Button onClick={() => setEditing({ id: `lead-${Date.now()}`, name: "", source: "website", destination: "receive-booking", notes: "", enabled: true })} className="gap-2"><Plus className="h-4 w-4" /> {copy.add}</Button>
      </div>

      <Card>
        <CardContent className="p-4 text-sm text-muted-foreground">{copy.info}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Inbox className="h-5 w-5 text-primary" /> {copy.title}</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell>
                    <p className="font-medium">{channel.name}</p>
                    <p className="text-xs text-muted-foreground">{channel.notes}</p>
                  </TableCell>
                  <TableCell>{channel.source}</TableCell>
                  <TableCell>{channel.destination}</TableCell>
                  <TableCell><Badge variant={channel.enabled ? "default" : "secondary"}>{channel.enabled ? copy.active : "Paused"}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon" onClick={() => setEditing(channel)}><Pencil className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.name || copy.add}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Source</Label><Input value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value })} /></div>
                <div className="space-y-2"><Label>Destination</Label><Input value={editing.destination} onChange={(e) => setEditing({ ...editing, destination: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Textarea value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} rows={4} /></div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><Label>{copy.active}</Label><Switch checked={editing.enabled} onCheckedChange={(value) => setEditing({ ...editing, enabled: value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button disabled={saving || !editing} onClick={async () => {
              if (!editing) return;
              const exists = channels.some((item) => item.id === editing.id);
              const next = exists ? channels.map((item) => item.id === editing.id ? editing : item) : [...channels, editing];
              const ok = await persist(next);
              if (ok) setEditing(null);
            }} className="gap-2"><Save className="h-4 w-4" /> {copy.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManagement;