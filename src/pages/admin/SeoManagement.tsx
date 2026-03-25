import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash2, Search } from "lucide-react";

interface SeoEntry {
  id: string; page_path: string; page_name: string;
  title: string | null; description: string | null; keywords: string | null;
  canonical_url: string | null; og_title: string | null; og_description: string | null;
  og_image: string | null; og_type: string | null; twitter_card: string | null;
  twitter_title: string | null; twitter_description: string | null; twitter_image: string | null;
  structured_data: any; no_index: boolean | null; updated_at: string;
}

const defaultEntry: Partial<SeoEntry> = {
  page_path: "", page_name: "", title: "", description: "", keywords: "",
  canonical_url: "", og_title: "", og_description: "", og_image: "",
  og_type: "website", twitter_card: "summary_large_image", twitter_title: "",
  twitter_description: "", twitter_image: "", structured_data: null, no_index: false,
};

const SITE_PAGES = [
  { path: "/", name: "Home" }, { path: "/online-quran-classes", name: "Online Quran Classes" },
  { path: "/tajweed-course-online", name: "Tajweed Course" }, { path: "/quran-memorization-hifz", name: "Quran Memorization" },
  { path: "/arabic-for-kids", name: "Arabic for Kids" }, { path: "/arabic-for-adults", name: "Arabic for Adults" },
  { path: "/islamic-studies-online", name: "Islamic Studies" }, { path: "/ijazah-program", name: "Ijazah Program" },
  { path: "/female-quran-teacher", name: "Female Quran Teacher" }, { path: "/free-trial", name: "Free Trial" },
  { path: "/blog", name: "Blog" }, { path: "/videos", name: "Videos" },
  { path: "/student-success-stories", name: "Student Success Stories" },
];

const SeoManagement = () => {
  const [entries, setEntries] = useState<SeoEntry[]>([]);
  const [editing, setEditing] = useState<Partial<SeoEntry> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filter, setFilter] = useState("");
  const { user, isAdmin } = useAuth();
  const { t } = useAdminLang();
  const { toast } = useToast();

  const fetchEntries = async () => {
    const { data } = await supabase.from("seo_metadata").select("*").order("page_path");
    if (data) setEntries(data);
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSave = async () => {
    if (!editing?.page_path || !editing.page_name) { toast({ title: t("err.error"), description: "Page path and name are required", variant: "destructive" }); return; }
    let structuredData = editing.structured_data;
    if (typeof structuredData === "string" && structuredData.trim()) {
      try { structuredData = JSON.parse(structuredData); } catch { toast({ title: t("err.error"), description: "Invalid JSON", variant: "destructive" }); return; }
    }
    const payload = { ...editing, structured_data: structuredData, updated_by: user?.id };
    if (isNew) { const { error } = await supabase.from("seo_metadata").insert(payload as any); if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; } }
    else { const { error } = await supabase.from("seo_metadata").update(payload as any).eq("id", editing.id!); if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; } }
    toast({ title: t("ok.done") }); setEditing(null); fetchEntries();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("seo_metadata").delete().eq("id", id);
    if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
    toast({ title: t("ok.deleted") }); fetchEntries();
  };

  const handleInitialize = async () => {
    const existing = entries.map(e => e.page_path);
    const toInsert = SITE_PAGES.filter(p => !existing.includes(p.path)).map(p => ({ page_path: p.path, page_name: p.name, updated_by: user?.id }));
    if (toInsert.length === 0) { toast({ title: t("ok.done") }); return; }
    const { error } = await supabase.from("seo_metadata").insert(toInsert as any);
    if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
    toast({ title: t("ok.done"), description: `Added ${toInsert.length} pages` }); fetchEntries();
  };

  const filtered = entries.filter(e => e.page_name.toLowerCase().includes(filter.toLowerCase()) || e.page_path.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("seo.title")}</h1>
          <p className="text-muted-foreground">{t("seo.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleInitialize}>{t("seo.init")}</Button>
          <Button onClick={() => { setEditing({ ...defaultEntry }); setIsNew(true); }}><Plus className="h-4 w-4 me-1" /> {t("seo.add")}</Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder={t("seo.search")} value={filter} onChange={e => setFilter(e.target.value)} className="ps-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("seo.col.page")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("seo.col.path")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("seo.col.title")}</TableHead>
                <TableHead className="w-24">{t("seo.col.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.page_name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{entry.page_path}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm truncate max-w-[200px]">{entry.title || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(entry); setIsNew(false); }}><Pencil className="h-4 w-4" /></Button>
                      {isAdmin && <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(entry.id)}><Trash2 className="h-4 w-4" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">{t("seo.empty")}</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={open => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isNew ? t("seo.add") : `${editing?.page_name}`}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Page Path</Label><Input value={editing.page_path || ""} onChange={e => setEditing({ ...editing, page_path: e.target.value })} disabled={!isNew} dir="ltr" /></div>
                <div className="space-y-2"><Label>Page Name</Label><Input value={editing.page_name || ""} onChange={e => setEditing({ ...editing, page_name: e.target.value })} /></div>
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">Basic SEO</h3>
              <div className="space-y-2"><Label>Page Title</Label><Input value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="space-y-2"><Label>Meta Description</Label><Textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Keywords</Label><Input value={editing.keywords || ""} onChange={e => setEditing({ ...editing, keywords: e.target.value })} /></div>
              <div className="space-y-2"><Label>Canonical URL</Label><Input value={editing.canonical_url || ""} onChange={e => setEditing({ ...editing, canonical_url: e.target.value })} dir="ltr" /></div>
              <div className="flex items-center gap-2"><Switch checked={editing.no_index || false} onCheckedChange={v => setEditing({ ...editing, no_index: v })} /><Label>No Index</Label></div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">OpenGraph</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>OG Title</Label><Input value={editing.og_title || ""} onChange={e => setEditing({ ...editing, og_title: e.target.value })} /></div>
                <div className="space-y-2"><Label>OG Type</Label><Input value={editing.og_type || ""} onChange={e => setEditing({ ...editing, og_type: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>OG Description</Label><Textarea value={editing.og_description || ""} onChange={e => setEditing({ ...editing, og_description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>OG Image URL</Label><Input value={editing.og_image || ""} onChange={e => setEditing({ ...editing, og_image: e.target.value })} dir="ltr" /></div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">Twitter Card</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Twitter Title</Label><Input value={editing.twitter_title || ""} onChange={e => setEditing({ ...editing, twitter_title: e.target.value })} /></div>
                <div className="space-y-2"><Label>Card Type</Label><Input value={editing.twitter_card || ""} onChange={e => setEditing({ ...editing, twitter_card: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Twitter Description</Label><Textarea value={editing.twitter_description || ""} onChange={e => setEditing({ ...editing, twitter_description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Twitter Image URL</Label><Input value={editing.twitter_image || ""} onChange={e => setEditing({ ...editing, twitter_image: e.target.value })} dir="ltr" /></div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">Structured Data (JSON-LD)</h3>
              <Textarea value={typeof editing.structured_data === "string" ? editing.structured_data : JSON.stringify(editing.structured_data, null, 2) || ""} onChange={e => setEditing({ ...editing, structured_data: e.target.value })} rows={6} className="font-mono text-xs" dir="ltr" />
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} className="flex-1">{t("seo.save")}</Button>
                <Button variant="outline" onClick={() => setEditing(null)}>{t("seo.cancel")}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeoManagement;
