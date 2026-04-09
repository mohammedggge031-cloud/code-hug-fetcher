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
import { Plus, Trash2, Edit, Play, Video, Loader2, Shield } from "lucide-react";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface VideoEntry {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  youtubeId: string;
  category: string;
  categoryAr: string;
  language: "en" | "ar";
}

const CATEGORIES = [
  { en: "Prophet Stories", ar: "قصص الأنبياء" },
  { en: "Quran Stories", ar: "قصص القرآن" },
  { en: "Islamic Lessons", ar: "دروس إسلامية" },
];

const STORAGE_KEY = "video_library";

const VideoManagement = () => {
  const { isAdmin } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editVideo, setEditVideo] = useState<VideoEntry | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<VideoEntry | null>(null);
  const [filterCat, setFilterCat] = useState("All");

  // Form state
  const [form, setForm] = useState({
    titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "",
    youtubeId: "", category: "Prophet Stories", categoryAr: "قصص الأنبياء", language: "en" as "en" | "ar",
  });

  const loadVideos = async () => {
    setLoading(true);
    try {
      // Try loading from custom_scripts
      const stored = await safeDataRequest<string | null>({
        fallback: null,
        markGlobalFallbackOnError: false,
        request: async (signal) => {
          const { data, error } = await supabase
            .from("custom_scripts")
            .select("script_content")
            .eq("name", STORAGE_KEY)
            .abortSignal(signal)
            .maybeSingle();
          if (error) throw error;
          return data?.script_content || null;
        },
      });

      if (stored) {
        const parsed = JSON.parse(stored);
        setVideos(Array.isArray(parsed) ? parsed : []);
      } else {
        // Seed from hardcoded data
        const { videos: hardcoded } = await import("@/data/videos");
        const mapped: VideoEntry[] = hardcoded.map(v => ({
          id: v.id,
          titleEn: v.titleEn,
          titleAr: v.titleAr,
          descriptionEn: v.descriptionEn,
          descriptionAr: v.descriptionAr,
          youtubeId: v.youtubeId,
          category: v.category,
          categoryAr: v.categoryAr,
          language: v.language,
        }));
        setVideos(mapped);
        // Save initial data
        await saveToDb(mapped);
      }
    } catch {
      const { videos: hardcoded } = await import("@/data/videos");
      setVideos(hardcoded.map(v => ({ ...v })));
    } finally { setLoading(false); }
  };

  const saveToDb = async (data: VideoEntry[]) => {
    const json = JSON.stringify(data);
    // Upsert: check if exists
    const { data: existing } = await supabase
      .from("custom_scripts")
      .select("id")
      .eq("name", STORAGE_KEY)
      .maybeSingle();

    if (existing) {
      await supabase.from("custom_scripts").update({
        script_content: json,
        updated_at: new Date().toISOString(),
      }).eq("id", existing.id);
    } else {
      await supabase.from("custom_scripts").insert({
        name: STORAGE_KEY,
        placement: "data",
        script_content: json,
        is_active: false,
      });
    }
  };

  useEffect(() => { loadVideos(); }, []);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">{t("vid.admin_only")}</h2>
      </div>
    );
  }

  const openNew = () => {
    setEditVideo(null);
    setForm({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", youtubeId: "", category: "Prophet Stories", categoryAr: "قصص الأنبياء", language: "en" });
    setShowEdit(true);
  };

  const openEdit = (v: VideoEntry) => {
    setEditVideo(v);
    setForm({
      titleEn: v.titleEn, titleAr: v.titleAr,
      descriptionEn: v.descriptionEn, descriptionAr: v.descriptionAr,
      youtubeId: v.youtubeId, category: v.category,
      categoryAr: v.categoryAr, language: v.language,
    });
    setShowEdit(true);
  };

  const handleSave = async () => {
    if (!form.titleEn || !form.youtubeId) {
      toast({ title: t("err.error"), description: t("vid.err_required"), variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      let updated: VideoEntry[];
      if (editVideo) {
        updated = videos.map(v => v.id === editVideo.id ? { ...v, ...form } : v);
      } else {
        const newId = `video-${Date.now()}`;
        updated = [...videos, { id: newId, ...form }];
      }
      await saveToDb(updated);
      setVideos(updated);
      setShowEdit(false);
      toast({ title: `✅ ${t("ok.done")}`, description: t("vid.saved") });
    } catch {
      toast({ title: t("err.error"), description: "Failed to save.", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async (v: VideoEntry) => {
    const updated = videos.filter(x => x.id !== v.id);
    await saveToDb(updated);
    setVideos(updated);
    toast({ title: t("ok.deleted") });
  };

  const filtered = filterCat === "All" ? videos : videos.filter(v => v.category === filterCat);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("vid.title")}</h1>
          <p className="text-muted-foreground">{t("vid.subtitle")} — {videos.length} {t("vid.count")}</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> {t("vid.add")}</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filterCat === "All" ? "default" : "outline"} size="sm" onClick={() => setFilterCat("All")}>{t("vid.all")}</Button>
        {CATEGORIES.map(c => (
          <Button key={c.en} variant={filterCat === c.en ? "default" : "outline"} size="sm" onClick={() => setFilterCat(c.en)}>
            {lang === "ar" ? c.ar : c.en}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16"></TableHead>
                  <TableHead>{t("vid.col_title")}</TableHead>
                  <TableHead>{t("vid.col_category")}</TableHead>
                  <TableHead>{t("vid.col_lang")}</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(v => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`}
                        alt={v.titleEn}
                        className="w-16 h-10 object-cover rounded"
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm line-clamp-1">{lang === "ar" ? v.titleAr || v.titleEn : v.titleEn}</p>
                      <p className="text-xs text-muted-foreground">{v.youtubeId}</p>
                    </TableCell>
                    <TableCell className="text-sm">{lang === "ar" ? v.categoryAr : v.category}</TableCell>
                    <TableCell className="text-sm">{v.language === "ar" ? "🇸🇦 AR" : "🇺🇸 EN"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(v)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(v)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-12"><Video className="h-8 w-8 mx-auto mb-2 opacity-40" />{t("vid.empty")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={async () => { if (deleteTarget) { const target = deleteTarget; setDeleteTarget(null); await handleDelete(target); } }}
        title={t("vid.confirm_delete")}
        description={t("vid.confirm_delete_desc")}
        confirmLabel={t("ok.deleted")}
        cancelLabel={t("blog.cancel")}
      />

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Video className="h-5 w-5" /> {editVideo ? t("vid.edit") : t("vid.new")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("vid.title_en")} *</Label>
                <Input value={form.titleEn} onChange={e => setForm({ ...form, titleEn: e.target.value })} dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>{t("vid.title_ar")}</Label>
                <Input value={form.titleAr} onChange={e => setForm({ ...form, titleAr: e.target.value })} dir="rtl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("vid.youtube_id")} *</Label>
              <Input value={form.youtubeId} onChange={e => setForm({ ...form, youtubeId: e.target.value })} dir="ltr" placeholder="e.g. dQw4w9WgXcQ" />
              {form.youtubeId && (
                <img src={`https://img.youtube.com/vi/${form.youtubeId}/hqdefault.jpg`} alt="Preview" className="w-full max-w-xs rounded-lg mt-2" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("vid.desc_en")}</Label>
                <Input value={form.descriptionEn} onChange={e => setForm({ ...form, descriptionEn: e.target.value })} dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>{t("vid.desc_ar")}</Label>
                <Input value={form.descriptionAr} onChange={e => setForm({ ...form, descriptionAr: e.target.value })} dir="rtl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("vid.col_category")}</Label>
                <Select value={form.category} onValueChange={(v) => {
                  const cat = CATEGORIES.find(c => c.en === v);
                  setForm({ ...form, category: v, categoryAr: cat?.ar || "" });
                }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c.en} value={c.en}>{lang === "ar" ? c.ar : c.en}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("vid.col_lang")}</Label>
                <Select value={form.language} onValueChange={(v) => setForm({ ...form, language: v as "en" | "ar" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSave} className="w-full gap-2" disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("team.submitting")}</> : editVideo ? t("blog.update") : t("blog.save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagement;
