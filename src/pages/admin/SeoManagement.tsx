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
import { Pencil, Plus, Trash2, Search, Loader2 } from "lucide-react";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

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

const SITE_PAGES: { path: string; name: string; title?: string; description?: string; keywords?: string }[] = [
  // Main pages
  { path: "/", name: "Home", title: "Alhamd Academy | Online Quran, Arabic & Islamic Studies", description: "Professional online Quran, Arabic & Islamic studies classes with certified Al-Azhar teachers for kids & adults. Free trial.", keywords: "online quran classes, learn quran online, tajweed classes, arabic language course, hifz program" },
  { path: "/online-quran-classes", name: "Online Quran Classes", title: "Online Quran Classes for Kids & Adults | Alhamd Academy", description: "Learn Quran online with certified native Arabic teachers. One-on-one online Quran classes for kids and adults. Free trial class.", keywords: "online quran classes, learn quran online, quran classes online with teacher" },
  { path: "/tajweed-course-online", name: "Tajweed Course", title: "Tajweed Course Online | Learn Quran with Tajweed | Alhamd Academy", description: "Master Quran recitation with our comprehensive online Tajweed course. Certified Al-Azhar teachers. Free trial.", keywords: "tajweed course online, learn tajweed online, quran tajweed rules" },
  { path: "/quran-memorization-hifz", name: "Quran Memorization", title: "Quran Memorization (Hifz) Online | Alhamd Academy", description: "Memorize the Quran online with certified Huffaz from Al-Azhar. Personalized Hifz program. Free trial.", keywords: "quran memorization, hifz quran online, memorize quran, hifz program" },
  { path: "/arabic-for-kids", name: "Arabic for Kids", title: "Arabic Classes for Kids Online | Alhamd Academy", description: "Fun and engaging Arabic classes for kids online. Native Arabic-speaking teachers. Ages 4-14. Free trial.", keywords: "arabic classes for kids, learn arabic for children, online arabic classes for kids" },
  { path: "/arabic-for-adults", name: "Arabic for Adults", title: "Arabic Classes for Adults Online | Alhamd Academy", description: "Learn Arabic online with native-speaking teachers. Conversational, MSA, and Quranic Arabic. Free trial.", keywords: "arabic classes for adults, learn arabic online, arabic language course" },
  { path: "/islamic-studies-online", name: "Islamic Studies", title: "Islamic Studies Online | Learn Islam | Alhamd Academy", description: "Comprehensive Islamic Studies courses online. Learn Fiqh, Seerah, Aqeedah with certified teachers. Free trial.", keywords: "islamic studies online, learn islam online, islamic education" },
  { path: "/ijazah-program", name: "Ijazah Program", title: "Ijazah Program Online | Quran Ijazah Certification | Alhamd Academy", description: "Get your Quran Ijazah online with certified Al-Azhar scholars. Connected Sanad certification. Free trial.", keywords: "ijazah program, quran ijazah online, ijazah certification, sanad quran" },
  { path: "/female-quran-teacher", name: "Female Quran Teacher", title: "Female Quran Teacher Online | Women & Girls Quran Classes | Alhamd Academy", description: "Learn Quran with experienced female teachers. Private one-on-one classes for women and girls. Free trial.", keywords: "female quran teacher, women quran classes, girls quran teacher" },
  { path: "/free-trial", name: "Free Trial", title: "Free Trial Class | Try Online Quran Classes Free | Alhamd Academy", description: "Book your free trial Quran class today. No commitment, no payment. Experience one-on-one learning.", keywords: "free quran class, free trial quran lesson, try quran classes free" },
  { path: "/blog", name: "Blog", title: "Quran & Islamic Education Blog | Alhamd Academy", description: "Read articles about Quran learning, Tajweed tips, Islamic education from expert teachers.", keywords: "quran blog, islamic education blog, tajweed tips" },
  { path: "/videos", name: "Videos", title: "Educational Videos | Quran Recitation & Tajweed | Alhamd Academy", description: "Watch educational videos on Quran recitation, Tajweed rules, and Islamic education.", keywords: "quran videos, tajweed videos, quran recitation videos" },
  { path: "/learn-quran-online-worldwide", name: "Learn Quran Worldwide", title: "Learn Quran Online Worldwide | Global Quran Academy | Alhamd Academy", description: "Learn Quran online from anywhere in the world. Certified Al-Azhar teachers available 24/7. Free trial.", keywords: "learn quran online worldwide, global quran classes" },
  { path: "/privacy-policy", name: "Privacy Policy", title: "Privacy Policy | Alhamd Academy", description: "Read Alhamd Academy's privacy policy.", keywords: "privacy policy" },
  // SEO landing pages
  { path: "/quran-classes-for-kids", name: "Quran Classes for Kids", title: "Quran Classes for Kids Online | Alhamd Academy", description: "Fun online Quran classes for kids ages 4–14. Certified child-specialist teachers. Free trial.", keywords: "quran classes for kids online, learn quran for kids" },
  { path: "/quran-classes-for-adults", name: "Quran Classes for Adults", title: "Quran Classes for Adults Online | Alhamd Academy", description: "Start learning Quran as an adult with patient, certified teachers. Free trial.", keywords: "quran classes for adults, adult quran classes online" },
  { path: "/best-online-quran-classes", name: "Best Online Quran Classes", title: "Best Online Quran Classes 2025 | Alhamd Academy", description: "Discover the best online Quran classes with certified Al-Azhar teachers. 4.9/5 rating. Free trial.", keywords: "best online quran classes, best quran academy online" },
  { path: "/one-on-one-quran-classes", name: "One-on-One Quran Classes", title: "One-on-One Quran Classes Online | Alhamd Academy", description: "Personalized one-on-one Quran classes with dedicated teachers. Free trial.", keywords: "one on one quran classes, private quran tutor" },
  { path: "/quran-classes-pricing", name: "Quran Classes Pricing", title: "Quran Classes Pricing | Affordable Online Quran Lessons | Alhamd Academy", description: "Affordable online Quran classes starting from $8/hour. Flexible plans. Free trial.", keywords: "quran classes pricing, online quran class cost" },
  { path: "/quran-classes-for-beginners", name: "Quran Classes for Beginners", title: "Quran Classes for Beginners | Alhamd Academy", description: "Start your Quran learning journey from scratch. Patient teachers, Noor Al-Bayan method. Free trial.", keywords: "quran classes for beginners, learn quran from scratch" },
  { path: "/online-quran-classes-with-certificate", name: "Quran Classes with Certificate", title: "Online Quran Classes with Certificate | Alhamd Academy", description: "Earn a recognized certificate in Quran recitation, Tajweed, or Hifz. Free trial.", keywords: "quran classes with certificate, certified quran course" },
  { path: "/learn-quran-for-reverts", name: "Learn Quran for Reverts", title: "Learn Quran for Reverts & New Muslims | Alhamd Academy", description: "Welcoming online Quran classes designed for reverts and new Muslims. Patient Al-Azhar teachers. Free trial.", keywords: "quran for reverts, quran classes for new muslims, learn quran as a convert" },
  // Course detail pages
  { path: "/courses/quran-course", name: "Quran Course" },
  { path: "/courses/tajweed-course", name: "Tajweed Course Detail" },
  { path: "/courses/arabic-course", name: "Arabic Course" },
  { path: "/courses/islamic-studies", name: "Islamic Studies Course" },
  { path: "/courses/all-in-one-course", name: "All-in-One Course" },
  // Location pages — Countries
  { path: "/learn-quran-online-usa", name: "Learn Quran Online - USA" },
  { path: "/learn-quran-online-canada", name: "Learn Quran Online - Canada" },
  { path: "/learn-quran-online-uk", name: "Learn Quran Online - UK" },
  { path: "/learn-quran-online-australia", name: "Learn Quran Online - Australia" },
  { path: "/learn-quran-online-germany", name: "Learn Quran Online - Germany" },
  { path: "/learn-quran-online-france", name: "Learn Quran Online - France" },
  { path: "/learn-quran-online-netherlands", name: "Learn Quran Online - Netherlands" },
  { path: "/learn-quran-online-sweden", name: "Learn Quran Online - Sweden" },
  { path: "/learn-quran-online-norway", name: "Learn Quran Online - Norway" },
  { path: "/learn-quran-online-denmark", name: "Learn Quran Online - Denmark" },
  { path: "/learn-quran-online-belgium", name: "Learn Quran Online - Belgium" },
  { path: "/learn-quran-online-switzerland", name: "Learn Quran Online - Switzerland" },
  { path: "/learn-quran-online-ireland", name: "Learn Quran Online - Ireland" },
  // Location pages — US Cities
  { path: "/learn-quran-online-new-york", name: "Learn Quran Online - New York" },
  { path: "/learn-quran-online-los-angeles", name: "Learn Quran Online - Los Angeles" },
  { path: "/learn-quran-online-chicago", name: "Learn Quran Online - Chicago" },
  { path: "/learn-quran-online-houston", name: "Learn Quran Online - Houston" },
  { path: "/learn-quran-online-dallas", name: "Learn Quran Online - Dallas" },
  { path: "/learn-quran-online-san-francisco", name: "Learn Quran Online - San Francisco" },
  { path: "/learn-quran-online-miami", name: "Learn Quran Online - Miami" },
  { path: "/learn-quran-online-seattle", name: "Learn Quran Online - Seattle" },
  { path: "/learn-quran-online-boston", name: "Learn Quran Online - Boston" },
  { path: "/learn-quran-online-washington-dc", name: "Learn Quran Online - Washington DC" },
  // Location pages — Canada Cities
  { path: "/learn-quran-online-toronto", name: "Learn Quran Online - Toronto" },
  { path: "/learn-quran-online-vancouver", name: "Learn Quran Online - Vancouver" },
  { path: "/learn-quran-online-montreal", name: "Learn Quran Online - Montreal" },
  { path: "/learn-quran-online-calgary", name: "Learn Quran Online - Calgary" },
  { path: "/learn-quran-online-ottawa", name: "Learn Quran Online - Ottawa" },
  // Location pages — UK Cities
  { path: "/learn-quran-online-london", name: "Learn Quran Online - London" },
  { path: "/learn-quran-online-manchester", name: "Learn Quran Online - Manchester" },
  { path: "/learn-quran-online-birmingham", name: "Learn Quran Online - Birmingham" },
  { path: "/learn-quran-online-leeds", name: "Learn Quran Online - Leeds" },
  { path: "/learn-quran-online-glasgow", name: "Learn Quran Online - Glasgow" },
  // Location pages — Europe Cities
  { path: "/learn-quran-online-berlin", name: "Learn Quran Online - Berlin" },
  { path: "/learn-quran-online-paris", name: "Learn Quran Online - Paris" },
  { path: "/learn-quran-online-amsterdam", name: "Learn Quran Online - Amsterdam" },
  { path: "/learn-quran-online-stockholm", name: "Learn Quran Online - Stockholm" },
  { path: "/learn-quran-online-oslo", name: "Learn Quran Online - Oslo" },
  { path: "/learn-quran-online-zurich", name: "Learn Quran Online - Zurich" },
  { path: "/learn-quran-online-brussels", name: "Learn Quran Online - Brussels" },
  { path: "/learn-quran-online-dublin", name: "Learn Quran Online - Dublin" },
];

const SeoManagement = () => {
  const [entries, setEntries] = useState<SeoEntry[]>([]);
  const [editing, setEditing] = useState<Partial<SeoEntry> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<SeoEntry | null>(null);
  const { user, isAdmin } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();

  const fetchEntries = async () => {
    setIsFetching(true);
    try {
      const data = await safeDataRequest<SeoEntry[]>({
        fallback: [],
        markGlobalFallbackOnError: false,
        request: async (signal) => {
          const { data, error } = await supabase.from("seo_metadata").select("*").order("page_path").abortSignal(signal);
          if (error) throw error;
          return data ?? [];
        },
      });
      setEntries(data);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSave = async () => {
    if (!editing?.page_path || !editing.page_name) { toast({ title: t("err.error"), description: "Page path and name are required", variant: "destructive" }); return; }
    let structuredData = editing.structured_data;
    if (typeof structuredData === "string" && structuredData.trim()) {
      try { structuredData = JSON.parse(structuredData); } catch { toast({ title: t("err.error"), description: "Invalid JSON", variant: "destructive" }); return; }
    }
    setIsSaving(true);
    try {
      const payload = { ...editing, structured_data: structuredData, updated_by: user?.id };
      if (isNew) {
        const { error } = await supabase.from("seo_metadata").insert(payload as any);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      } else {
        const { error } = await supabase.from("seo_metadata").update(payload as any).eq("id", editing.id!);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      }
      toast({ title: t("ok.done") }); setEditing(null); void fetchEntries();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (entry: SeoEntry) => {
    try {
      const { error } = await supabase.from("seo_metadata").delete().eq("id", entry.id);
      if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      toast({ title: t("ok.deleted") }); void fetchEntries();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  const handleInitialize = async () => {
    const existing = entries.map(e => e.page_path);
    const toInsert = SITE_PAGES.filter(p => !existing.includes(p.path)).map(p => ({ page_path: p.path, page_name: p.name, updated_by: user?.id }));
    if (toInsert.length === 0) { toast({ title: t("ok.done"), description: lang === "ar" ? "جميع الصفحات مهيأة بالفعل" : "All pages already initialized" }); return; }
    try {
      const { error } = await supabase.from("seo_metadata").insert(toInsert as any);
      if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      toast({ title: t("ok.done"), description: `Added ${toInsert.length} pages` });
      void fetchEntries();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
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
                <TableHead className="hidden md:table-cell">{lang === "ar" ? "آخر تعديل" : "Last Updated"}</TableHead>
                <TableHead className="w-24">{t("seo.col.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative h-8 w-8">
                        <div className="absolute inset-0 rounded-full border-2 border-muted" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      </div>
                      <span className="text-xs text-muted-foreground">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t("seo.empty")}</TableCell></TableRow>
              ) : filtered.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.page_name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{entry.page_path}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm truncate max-w-[200px]">{entry.title || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {entry.updated_at ? new Date(entry.updated_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(entry); setIsNew(false); }}><Pencil className="h-4 w-4" /></Button>
                      {isAdmin && <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(entry)}><Trash2 className="h-4 w-4" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) { handleDelete(deleteTarget); setDeleteTarget(null); } }}
        title={lang === "ar" ? "حذف إعدادات السيو؟" : "Delete SEO Entry?"}
        description={lang === "ar" ? "سيتم حذف إعدادات السيو لهذه الصفحة نهائياً." : "SEO settings for this page will be permanently deleted."}
        confirmLabel={t("ok.deleted")}
        cancelLabel={t("seo.cancel")}
      />

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
              <div className="space-y-2"><Label>Page Title</Label><Input value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /><p className="text-xs text-muted-foreground">{(editing.title || "").length}/60 characters</p></div>
              <div className="space-y-2"><Label>Meta Description</Label><Textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} /><p className="text-xs text-muted-foreground">{(editing.description || "").length}/160 characters</p></div>
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
                <Button onClick={handleSave} className="flex-1" disabled={isSaving}>
                  {isSaving ? <><Loader2 className="h-4 w-4 animate-spin me-1" />{t("login.loading")}</> : t("seo.save")}
                </Button>
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
