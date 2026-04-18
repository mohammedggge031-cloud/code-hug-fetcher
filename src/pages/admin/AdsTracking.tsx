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
import { ExternalLink, Pencil, Plus, Save, Target, Trash2 } from "lucide-react";

type Campaign = {
  id: string;
  network: "google" | "facebook" | "instagram" | "tiktok" | "whatsapp" | "other";
  name: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_url: string;
  conversion_pixel?: string;
  notes: string;
  active: boolean;
};

type LeadEntry = { source: string; campaign: string; status: string };

const NETWORK_LABEL: Record<Campaign["network"], string> = {
  google: "Google Ads",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  other: "Other",
};

const EXTERNAL_DASHBOARDS: { label: string; url: string }[] = [
  { label: "Google Ads", url: "https://ads.google.com" },
  { label: "Meta Business Suite", url: "https://business.facebook.com" },
  { label: "TikTok Ads Manager", url: "https://ads.tiktok.com" },
  { label: "Google Analytics", url: "https://analytics.google.com" },
];

const defaultCampaigns: Campaign[] = [];

const AdsTracking = () => {
  const { isAdmin, can } = useAuth();
  const { lang } = useAdminLang();
  const { toast } = useToast();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadAdminConfig<Campaign[]>("ad_campaigns", defaultCampaigns).then(setCampaigns);
    void loadAdminConfig<LeadEntry[]>("lead_log", []).then(setLeads);
  }, []);

  const copy = useMemo(() => lang === "ar" ? {
    title: "تتبع الإعلانات والمصادر",
    subtitle: "تقارير وتتبع — هذا ليس بديلاً عن مدير إعلانات Google أو Meta.",
    add: "إضافة حملة",
    save: "حفظ",
    active: "نشطة",
    paused: "متوقفة",
    network: "الشبكة",
    name: "الحملة",
    utm: "UTM",
    landing: "صفحة الهبوط",
    leads: "الطلبات",
    conv: "تحويلات",
    convRate: "نسبة التحويل",
    info: "أضف هنا حملاتك الفعلية في Google Ads / Meta / TikTok بمعاملات UTM. ستُحسب الأرقام تلقائياً من سجل الطلبات.",
    externalLinks: "افتح لوحات الإعلانات الفعلية",
    none: "لا توجد حملات بعد.",
  } : {
    title: "Ads & Source Tracking",
    subtitle: "Reporting and attribution — this is not a replacement for Google Ads or Meta Ads Manager.",
    add: "Add Campaign",
    save: "Save",
    active: "Active",
    paused: "Paused",
    network: "Network",
    name: "Campaign",
    utm: "UTM",
    landing: "Landing URL",
    leads: "Leads",
    conv: "Converted",
    convRate: "Conv. rate",
    info: "Register your real Google Ads / Meta / TikTok campaigns here with their UTM tags. Counts are computed automatically from the lead log.",
    externalLinks: "Open real ad dashboards",
    none: "No campaigns yet.",
  }, [lang]);

  const stats = useMemo(() => {
    const map = new Map<string, { total: number; converted: number }>();
    for (const l of leads) {
      const key = `${l.source}::${l.campaign}`;
      const cur = map.get(key) || { total: 0, converted: 0 };
      cur.total++;
      if (l.status === "converted") cur.converted++;
      map.set(key, cur);
    }
    return map;
  }, [leads]);

  if (!(can("can_manage_leads") || can("can_manage_social") || isOwner)) {
    return <div className="py-16 text-center text-muted-foreground">Access denied.</div>;
  }

  const persist = async (next: Campaign[]) => {
    setSaving(true);
    const { error } = await saveAdminConfig("ad_campaigns", next);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return false; }
    setCampaigns(next); toast({ title: copy.save }); return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{copy.title}</h1>
          <p className="text-muted-foreground">{copy.subtitle}</p>
        </div>
        <Button onClick={() => setEditing({ id: `camp-${Date.now()}`, network: "google", name: "", utm_source: "google", utm_medium: "cpc", utm_campaign: "", landing_url: "", notes: "", active: true })} className="gap-2"><Plus className="h-4 w-4" /> {copy.add}</Button>
      </div>

      <Card><CardContent className="p-4 text-sm text-muted-foreground">{copy.info}</CardContent></Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{copy.externalLinks}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {EXTERNAL_DASHBOARDS.map((d) => (
            <Button key={d.url} asChild variant="outline" size="sm" className="gap-2">
              <a href={d.url} target="_blank" rel="noreferrer noopener"><ExternalLink className="h-3.5 w-3.5" /> {d.label}</a>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> {copy.title}</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.network}</TableHead>
                <TableHead>{copy.name}</TableHead>
                <TableHead>{copy.utm}</TableHead>
                <TableHead className="text-end">{copy.leads}</TableHead>
                <TableHead className="text-end">{copy.conv}</TableHead>
                <TableHead className="text-end">{copy.convRate}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-10">{copy.none}</TableCell></TableRow>
              )}
              {campaigns.map((c) => {
                const s = stats.get(`${c.utm_source}::${c.utm_campaign}`) || { total: 0, converted: 0 };
                const rate = s.total ? Math.round((s.converted / s.total) * 100) : 0;
                return (
                  <TableRow key={c.id}>
                    <TableCell><Badge variant="secondary">{NETWORK_LABEL[c.network]}</Badge></TableCell>
                    <TableCell>
                      <p className="font-medium">{c.name}</p>
                      {c.landing_url && <p className="text-xs text-muted-foreground truncate max-w-[260px]">{c.landing_url}</p>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <code>{c.utm_source}/{c.utm_medium}/{c.utm_campaign || "—"}</code>
                    </TableCell>
                    <TableCell className="text-end font-medium">{s.total}</TableCell>
                    <TableCell className="text-end">{s.converted}</TableCell>
                    <TableCell className="text-end text-muted-foreground">{rate}%</TableCell>
                    <TableCell><Badge variant={c.active ? "default" : "secondary"}>{c.active ? copy.active : copy.paused}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setEditing(c)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => void persist(campaigns.filter((x) => x.id !== c.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.name || copy.add}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{copy.network}</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={editing.network} onChange={(e) => setEditing({ ...editing, network: e.target.value as Campaign["network"] })}>
                    {(Object.keys(NETWORK_LABEL) as Campaign["network"][]).map((n) => <option key={n} value={n}>{NETWORK_LABEL[n]}</option>)}
                  </select>
                </div>
                <div className="space-y-2"><Label>{copy.name}</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2"><Label>utm_source</Label><Input value={editing.utm_source} onChange={(e) => setEditing({ ...editing, utm_source: e.target.value })} /></div>
                <div className="space-y-2"><Label>utm_medium</Label><Input value={editing.utm_medium} onChange={(e) => setEditing({ ...editing, utm_medium: e.target.value })} /></div>
                <div className="space-y-2"><Label>utm_campaign</Label><Input value={editing.utm_campaign} onChange={(e) => setEditing({ ...editing, utm_campaign: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>{copy.landing}</Label><Input value={editing.landing_url} onChange={(e) => setEditing({ ...editing, landing_url: e.target.value })} placeholder="/trial-registration?utm_source=..." /></div>
              <div className="space-y-2"><Label>Conversion pixel / tag (optional)</Label><Textarea value={editing.conversion_pixel || ""} onChange={(e) => setEditing({ ...editing, conversion_pixel: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Notes</Label><Textarea value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} rows={3} /></div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><Label>{copy.active}</Label><Switch checked={editing.active} onCheckedChange={(value) => setEditing({ ...editing, active: value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button disabled={saving || !editing} onClick={async () => {
              if (!editing) return;
              const exists = campaigns.some((item) => item.id === editing.id);
              const next = exists ? campaigns.map((item) => item.id === editing.id ? editing : item) : [...campaigns, editing];
              if (await persist(next)) setEditing(null);
            }} className="gap-2"><Save className="h-4 w-4" /> {copy.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdsTracking;
