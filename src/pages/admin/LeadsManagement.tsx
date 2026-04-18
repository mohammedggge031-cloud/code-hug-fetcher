import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { loadAdminConfig, saveAdminConfig } from "@/lib/adminConfig";
import { useToast } from "@/hooks/use-toast";
import { Inbox, Pencil, Plus, Save, Trash2, TrendingUp } from "lucide-react";

type LeadChannel = {
  id: string;
  name: string;
  source: string;
  destination: string;
  notes: string;
  enabled: boolean;
};

type LeadEntry = {
  id: string;
  name: string;
  contact: string;
  source: string; // free text or matches a channel id
  campaign: string;
  status: "new" | "contacted" | "converted" | "lost";
  notes: string;
  created_at: string;
};

const defaultChannels: LeadChannel[] = [
  { id: "contact-form", name: "Main Contact Form", source: "website", destination: "receive-booking", notes: "Primary site form pushes booking payloads to the external dashboard.", enabled: true },
  { id: "trial-registration", name: "Trial Registration", source: "paid_social", destination: "receive-booking", notes: "Paid campaign landing page reuses the same booking payload with UTM-derived source.", enabled: true },
  { id: "whatsapp", name: "WhatsApp Direct", source: "direct", destination: "wa.me", notes: "Opens WhatsApp for immediate manual lead capture.", enabled: true },
  { id: "google-ads", name: "Google Ads", source: "google_ads", destination: "receive-booking", notes: "Search/display campaigns tagged with utm_source=google.", enabled: true },
  { id: "facebook-ads", name: "Facebook / Instagram Ads", source: "meta_ads", destination: "receive-booking", notes: "Meta campaigns tagged with utm_source=facebook or instagram.", enabled: true },
  { id: "tiktok-ads", name: "TikTok Ads", source: "tiktok_ads", destination: "receive-booking", notes: "TikTok campaigns tagged with utm_source=tiktok.", enabled: true },
  { id: "email", name: "Email Inquiries", source: "direct", destination: "mailto", notes: "Routes inquiries to info@alhamdacademy.net.", enabled: true },
];

const STATUS_VARIANT: Record<LeadEntry["status"], "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  converted: "outline",
  lost: "destructive",
};

const LeadsManagement = () => {
  const { isOwner, can } = useAuth();
  const { lang } = useAdminLang();
  const { toast } = useToast();

  const [channels, setChannels] = useState<LeadChannel[]>([]);
  const [entries, setEntries] = useState<LeadEntry[]>([]);
  const [editingChannel, setEditingChannel] = useState<LeadChannel | null>(null);
  const [editingEntry, setEditingEntry] = useState<LeadEntry | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadAdminConfig<LeadChannel[]>("lead_channels", defaultChannels).then(setChannels);
    void loadAdminConfig<LeadEntry[]>("lead_log", []).then(setEntries);
  }, []);

  const copy = useMemo(() => lang === "ar" ? {
    title: "إدارة العملاء المحتملين",
    subtitle: "تتبع المصادر والقنوات وسجل الطلبات.",
    tabChannels: "القنوات",
    tabLog: "سجل الطلبات",
    tabReport: "تقرير المصادر",
    addChannel: "إضافة قناة",
    addLead: "إضافة طلب",
    save: "حفظ",
    active: "نشط",
    paused: "متوقف",
    name: "الاسم",
    contact: "وسيلة التواصل",
    source: "المصدر",
    campaign: "الحملة",
    status: "الحالة",
    notes: "ملاحظات",
    created: "التاريخ",
    info: "طلبات النماذج تُرسل إلى receive-booking في النظام الخارجي. هذا السجل لتتبع يدوي وتقارير المصدر.",
    leadsBySource: "الطلبات بحسب المصدر",
    none: "لا توجد بيانات بعد.",
  } : {
    title: "Leads Management",
    subtitle: "Source attribution, channels, and a manual lead log.",
    tabChannels: "Channels",
    tabLog: "Lead Log",
    tabReport: "Source Report",
    addChannel: "Add Channel",
    addLead: "Add Lead",
    save: "Save",
    active: "Active",
    paused: "Paused",
    name: "Name",
    contact: "Contact",
    source: "Source",
    campaign: "Campaign",
    status: "Status",
    notes: "Notes",
    created: "Created",
    info: "Form submissions are sent to the external receive-booking flow. Use the log for manual capture and source reporting.",
    leadsBySource: "Leads by source",
    none: "No data yet.",
  }, [lang]);

  const sourceCounts = useMemo(() => {
    const counts: Record<string, { total: number; converted: number; new: number }> = {};
    for (const e of entries) {
      const key = e.source || "unknown";
      counts[key] = counts[key] || { total: 0, converted: 0, new: 0 };
      counts[key].total++;
      if (e.status === "converted") counts[key].converted++;
      if (e.status === "new") counts[key].new++;
    }
    return Object.entries(counts).sort((a, b) => b[1].total - a[1].total);
  }, [entries]);

  if (!(can("can_manage_leads") || isOwner)) {
    return <div className="py-16 text-center text-muted-foreground">Access denied.</div>;
  }

  const persistChannels = async (next: LeadChannel[]) => {
    setSaving(true);
    const { error } = await saveAdminConfig("lead_channels", next);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return false; }
    setChannels(next); toast({ title: copy.save }); return true;
  };

  const persistEntries = async (next: LeadEntry[]) => {
    setSaving(true);
    const { error } = await saveAdminConfig("lead_log", next);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return false; }
    setEntries(next); toast({ title: copy.save }); return true;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{copy.title}</h1>
        <p className="text-muted-foreground">{copy.subtitle}</p>
      </div>

      <Card><CardContent className="p-4 text-sm text-muted-foreground">{copy.info}</CardContent></Card>

      <Tabs defaultValue="log">
        <TabsList>
          <TabsTrigger value="log">{copy.tabLog}</TabsTrigger>
          <TabsTrigger value="report">{copy.tabReport}</TabsTrigger>
          <TabsTrigger value="channels">{copy.tabChannels}</TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setEditingEntry({
                id: `lead-${Date.now()}`, name: "", contact: "", source: channels[0]?.source || "website",
                campaign: "", status: "new", notes: "", created_at: new Date().toISOString(),
              })}
              className="gap-2"
            ><Plus className="h-4 w-4" /> {copy.addLead}</Button>
          </div>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Inbox className="h-5 w-5 text-primary" /> {copy.tabLog}</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{copy.name}</TableHead>
                    <TableHead>{copy.contact}</TableHead>
                    <TableHead>{copy.source}</TableHead>
                    <TableHead>{copy.campaign}</TableHead>
                    <TableHead>{copy.status}</TableHead>
                    <TableHead>{copy.created}</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-10">{copy.none}</TableCell></TableRow>
                  )}
                  {entries.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.name}</TableCell>
                      <TableCell className="text-muted-foreground">{e.contact}</TableCell>
                      <TableCell><Badge variant="secondary">{e.source}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{e.campaign || "—"}</TableCell>
                      <TableCell><Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setEditingEntry(e)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => void persistEntries(entries.filter((x) => x.id !== e.id))}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> {copy.leadsBySource}</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{copy.source}</TableHead>
                    <TableHead className="text-end">Total</TableHead>
                    <TableHead className="text-end">New</TableHead>
                    <TableHead className="text-end">Converted</TableHead>
                    <TableHead className="text-end">Conv. rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sourceCounts.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-10">{copy.none}</TableCell></TableRow>
                  )}
                  {sourceCounts.map(([src, c]) => (
                    <TableRow key={src}>
                      <TableCell><Badge variant="secondary">{src}</Badge></TableCell>
                      <TableCell className="text-end font-medium">{c.total}</TableCell>
                      <TableCell className="text-end">{c.new}</TableCell>
                      <TableCell className="text-end">{c.converted}</TableCell>
                      <TableCell className="text-end text-muted-foreground">{c.total ? Math.round((c.converted / c.total) * 100) : 0}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setEditingChannel({ id: `lead-${Date.now()}`, name: "", source: "website", destination: "receive-booking", notes: "", enabled: true })} className="gap-2"><Plus className="h-4 w-4" /> {copy.addChannel}</Button>
          </div>
          <Card>
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
                      <TableCell><Badge variant={channel.enabled ? "default" : "secondary"}>{channel.enabled ? copy.active : copy.paused}</Badge></TableCell>
                      <TableCell><Button variant="ghost" size="icon" onClick={() => setEditingChannel(channel)}><Pencil className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Channel editor */}
      <Dialog open={!!editingChannel} onOpenChange={(open) => !open && setEditingChannel(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingChannel?.name || copy.addChannel}</DialogTitle></DialogHeader>
          {editingChannel && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={editingChannel.name} onChange={(e) => setEditingChannel({ ...editingChannel, name: e.target.value })} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Source</Label><Input value={editingChannel.source} onChange={(e) => setEditingChannel({ ...editingChannel, source: e.target.value })} /></div>
                <div className="space-y-2"><Label>Destination</Label><Input value={editingChannel.destination} onChange={(e) => setEditingChannel({ ...editingChannel, destination: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Textarea value={editingChannel.notes} onChange={(e) => setEditingChannel({ ...editingChannel, notes: e.target.value })} rows={4} /></div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><Label>{copy.active}</Label><Switch checked={editingChannel.enabled} onCheckedChange={(value) => setEditingChannel({ ...editingChannel, enabled: value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingChannel(null)}>Cancel</Button>
            <Button disabled={saving || !editingChannel} onClick={async () => {
              if (!editingChannel) return;
              const exists = channels.some((item) => item.id === editingChannel.id);
              const next = exists ? channels.map((item) => item.id === editingChannel.id ? editingChannel : item) : [...channels, editingChannel];
              if (await persistChannels(next)) setEditingChannel(null);
            }} className="gap-2"><Save className="h-4 w-4" /> {copy.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lead entry editor */}
      <Dialog open={!!editingEntry} onOpenChange={(open) => !open && setEditingEntry(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingEntry?.name || copy.addLead}</DialogTitle></DialogHeader>
          {editingEntry && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>{copy.name}</Label><Input value={editingEntry.name} onChange={(e) => setEditingEntry({ ...editingEntry, name: e.target.value })} /></div>
                <div className="space-y-2"><Label>{copy.contact}</Label><Input value={editingEntry.contact} onChange={(e) => setEditingEntry({ ...editingEntry, contact: e.target.value })} placeholder="email / phone / WhatsApp" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{copy.source}</Label>
                  <Select value={editingEntry.source} onValueChange={(v) => setEditingEntry({ ...editingEntry, source: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Array.from(new Set(channels.map((c) => c.source).concat(["google_ads", "meta_ads", "tiktok_ads", "whatsapp", "website", "direct"]))).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>{copy.campaign}</Label><Input value={editingEntry.campaign} onChange={(e) => setEditingEntry({ ...editingEntry, campaign: e.target.value })} placeholder="utm_campaign or label" /></div>
              </div>
              <div className="space-y-2">
                <Label>{copy.status}</Label>
                <Select value={editingEntry.status} onValueChange={(v) => setEditingEntry({ ...editingEntry, status: v as LeadEntry["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">new</SelectItem>
                    <SelectItem value="contacted">contacted</SelectItem>
                    <SelectItem value="converted">converted</SelectItem>
                    <SelectItem value="lost">lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>{copy.notes}</Label><Textarea value={editingEntry.notes} onChange={(e) => setEditingEntry({ ...editingEntry, notes: e.target.value })} rows={3} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEntry(null)}>Cancel</Button>
            <Button disabled={saving || !editingEntry} onClick={async () => {
              if (!editingEntry) return;
              const exists = entries.some((item) => item.id === editingEntry.id);
              const next = exists ? entries.map((item) => item.id === editingEntry.id ? editingEntry : item) : [editingEntry, ...entries];
              if (await persistEntries(next)) setEditingEntry(null);
            }} className="gap-2"><Save className="h-4 w-4" /> {copy.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManagement;
