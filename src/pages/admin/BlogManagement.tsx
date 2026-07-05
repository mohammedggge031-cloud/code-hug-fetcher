import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, Search, Loader2, RefreshCw, Zap } from "lucide-react";
import TipTapEditor from "@/components/admin/TipTapEditor";
import TranslateButton from "@/components/admin/TranslateButton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface BlogPost {
  id: string; title_en: string; title_ar: string; slug: string;
  excerpt_en: string | null; excerpt_ar: string | null;
  content_en: string | null; content_ar: string | null;
  category_id: string | null; featured_image: string | null;
  status: "draft" | "published"; tags: string[];
  read_time_en: string | null; read_time_ar: string | null;
  published_at: string | null; created_at: string;
}

interface Category { id: string; name_en: string; name_ar: string; slug: string; }

const emptyPost = {
  title_en: "", title_ar: "", slug: "", excerpt_en: "", excerpt_ar: "",
  content_en: "", content_ar: "", category_id: "", featured_image: "",
  status: "draft" as "draft" | "published", tags: [] as string[], read_time_en: "", read_time_ar: "",
};

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<typeof emptyPost & { id?: string; published_at?: string | null }>(emptyPost);
  const [showEditor, setShowEditor] = useState(false);
  const [search, setSearch] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [reindexingId, setReindexingId] = useState<string | null>(null);
  const [reindexingAll, setReindexingAll] = useState(false);
  const { isAdmin } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const result = await safeDataRequest<{ posts: BlogPost[]; cats: Category[]; errorMessage: string | null }>({
        fallback: { posts: [], cats: [], errorMessage: null },
        markGlobalFallbackOnError: false,
        timeoutMs: 12000,
        request: async (signal) => {
          const [{ data: postsData, error: postsError }, { data: catsData, error: catsError }] = await Promise.all([
            supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).abortSignal(signal),
            supabase.from("blog_categories").select("*").order("name_en").abortSignal(signal),
          ]);

          return {
            posts: postsData ?? [],
            cats: catsData ?? [],
            errorMessage: postsError?.message || catsError?.message || null,
          };
        },
      });

      if (result.errorMessage) {
        toast({ title: t("err.error"), description: result.errorMessage, variant: "destructive" });
      }

      setPosts(result.posts);
      setCategories(result.cats);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 100);

  const openNew = () => { setEditing(emptyPost); setTagsInput(""); setActiveTab("en"); setShowEditor(true); };

  const openEdit = (post: BlogPost) => {
    setEditing({
      id: post.id, title_en: post.title_en, title_ar: post.title_ar, slug: post.slug,
      excerpt_en: post.excerpt_en || "", excerpt_ar: post.excerpt_ar || "",
      content_en: post.content_en || "", content_ar: post.content_ar || "",
      category_id: post.category_id || "", featured_image: post.featured_image || "",
      status: post.status, tags: post.tags || [],
      read_time_en: post.read_time_en || "", read_time_ar: post.read_time_ar || "",
      published_at: post.published_at,
    });
    setTagsInput((post.tags || []).join(", "));
    setActiveTab("en"); setShowEditor(true);
  };

  const handleSave = async () => {
    if (!editing.title_en || !editing.title_ar) {
      toast({ title: t("err.error"), description: t("blog.err_title"), variant: "destructive" }); return;
    }

    setIsSaving(true);
    const slug = editing.slug || generateSlug(editing.title_en);
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

    // Only set published_at on first publish, preserve existing value on edit
    let publishedAt = editing.published_at || null;
    if (editing.status === "published" && !publishedAt) {
      publishedAt = new Date().toISOString();
    }
    if (editing.status === "draft") {
      publishedAt = null;
    }

    const payload = {
      title_en: editing.title_en, title_ar: editing.title_ar, slug,
      excerpt_en: editing.excerpt_en || null, excerpt_ar: editing.excerpt_ar || null,
      content_en: editing.content_en || null, content_ar: editing.content_ar || null,
      category_id: editing.category_id || null, featured_image: editing.featured_image || null,
      status: editing.status as "draft" | "published", tags,
      read_time_en: editing.read_time_en || null, read_time_ar: editing.read_time_ar || null,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
    };

    try {
      let error;
      if (editing.id) { ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id)); }
      else { ({ error } = await supabase.from("blog_posts").insert(payload)); }

      if (error) {
        toast({ title: t("err.error"), description: error.message, variant: "destructive" });
        return;
      }

      // Ping IndexNow on publish OR unpublish so search engines re-crawl immediately
      const prevStatus = editing.id ? posts.find(p => p.id === editing.id)?.status : undefined;
      const becamePublished = editing.status === "published";
      const becameUnpublished = prevStatus === "published" && editing.status === "draft";
      if (becamePublished || becameUnpublished) {
        void supabase.functions.invoke("indexnow-ping", {
          body: { urls: [`https://www.alhamdacademy.net/blog/${slug}`] },
        }).catch(() => { /* non-blocking */ });
      }

      toast({ title: t("blog.saved"), description: `"${editing.title_en}"` });
      setShowEditor(false);
      void fetchData();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Using fallback state.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
      if (error) {
        toast({ title: t("err.error"), description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: t("ok.deleted") });
      void fetchData();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  const pingIndexNow = async (urls: string[] | undefined, label: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("indexnow-ping", {
        body: urls && urls.length > 0 ? { urls } : {},
      });
      if (error) throw error;
      const count = (data as { urlsSubmitted?: number } | null)?.urlsSubmitted ?? urls?.length ?? 0;
      toast({
        title: lang === "ar" ? "تم إرسال طلب الفهرسة" : "Re-index submitted",
        description: lang === "ar"
          ? `${label} — ${count} رابط أُرسل إلى Bing / Yandex / IndexNow.`
          : `${label} — ${count} URL(s) sent to Bing / Yandex / IndexNow.`,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: t("err.error"), description: msg, variant: "destructive" });
    }
  };

  const handleReindexPost = async (post: BlogPost) => {
    setReindexingId(post.id);
    try {
      await pingIndexNow(
        [`https://www.alhamdacademy.net/blog/${post.slug}`],
        lang === "ar" ? post.title_ar || post.title_en : post.title_en,
      );
    } finally {
      setReindexingId(null);
    }
  };

  const handleReindexAll = async () => {
    setReindexingAll(true);
    try {
      await pingIndexNow(undefined, lang === "ar" ? "كل صفحات الموقع" : "All site pages");
    } finally {
      setReindexingAll(false);
    }
  };

  const filtered = posts.filter(p => p.title_en.toLowerCase().includes(search.toLowerCase()) || p.title_ar.includes(search));
  const getCategoryName = (catId: string | null) => {
    if (!catId) return "—";
    const cat = categories.find(c => c.id === catId);
    return cat ? (lang === "ar" ? cat.name_ar : cat.name_en) : "—";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("blog.title")}</h1>
          <p className="text-muted-foreground">{posts.length} {t("blog.total")}</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4 me-1" /> {t("blog.new")}</Button>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("blog.search")} className="ps-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("blog.col.title")}</TableHead>
                <TableHead>{t("blog.col.category")}</TableHead>
                <TableHead>{t("blog.col.status")}</TableHead>
                <TableHead>{t("blog.col.date")}</TableHead>
                <TableHead className="w-28">{t("blog.col.actions")}</TableHead>
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
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {t("blog.empty")}
                  </TableCell>
                </TableRow>
              ) : filtered.map(post => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{lang === "ar" ? post.title_ar : post.title_en}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1" dir={lang === "ar" ? "ltr" : "rtl"}>{lang === "ar" ? post.title_en : post.title_ar}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{getCategoryName(post.category_id)}</TableCell>
                  <TableCell><Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status === "published" ? t("blog.published") : t("blog.draft")}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div>{new Date(post.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</div>
                    {post.published_at && <div className="text-xs text-muted-foreground/60">{lang === "ar" ? "نُشر: " : "Pub: "}{new Date(post.published_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</div>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(post)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}><Eye className="h-4 w-4" /></Button>
                      {isAdmin && <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(post)}><Trash2 className="h-4 w-4" /></Button>}
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
        title={t("blog.confirm_delete")}
        description={lang === "ar" ? "سيتم حذف هذا المقال نهائياً. لا يمكن التراجع." : "This post will be permanently deleted. This cannot be undone."}
        confirmLabel={t("ok.deleted")}
        cancelLabel={t("blog.cancel")}
      />

      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing.id ? t("blog.edit") : t("blog.create")}</DialogTitle></DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("blog.title_en")}</Label>
                  <TranslateButton sourceText={editing.title_ar} from="ar" to="en" fieldType="title" onTranslated={text => setEditing(prev => ({ ...prev, title_en: text, slug: prev.id ? prev.slug : generateSlug(text) }))} />
                </div>
                <Input value={editing.title_en} onChange={e => { setEditing(prev => ({ ...prev, title_en: e.target.value, slug: prev.id ? prev.slug : generateSlug(e.target.value) })); }} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("blog.title_ar")}</Label>
                  <TranslateButton sourceText={editing.title_en} from="en" to="ar" fieldType="title" onTranslated={text => setEditing(prev => ({ ...prev, title_ar: text }))} />
                </div>
                <Input value={editing.title_ar} onChange={e => setEditing(prev => ({ ...prev, title_ar: e.target.value }))} dir="rtl" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>{t("blog.slug")}</Label><Input value={editing.slug} onChange={e => setEditing(prev => ({ ...prev, slug: e.target.value }))} dir="ltr" /></div>
              <div className="space-y-2"><Label>{t("blog.category")}</Label>
                <Select value={editing.category_id} onValueChange={v => setEditing(prev => ({ ...prev, category_id: v }))}>
                  <SelectTrigger><SelectValue placeholder={t("blog.select_cat")} /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name_en} / {c.name_ar}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>{t("blog.status")}</Label>
                <Select value={editing.status} onValueChange={v => setEditing(prev => ({ ...prev, status: v as "draft" | "published" }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="draft">{t("blog.draft")}</SelectItem><SelectItem value="published">{t("blog.published")}</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("blog.excerpt_en")}</Label>
                  <TranslateButton sourceText={editing.excerpt_ar} from="ar" to="en" fieldType="excerpt" onTranslated={text => setEditing(prev => ({ ...prev, excerpt_en: text }))} />
                </div>
                <Textarea value={editing.excerpt_en} onChange={e => setEditing(prev => ({ ...prev, excerpt_en: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("blog.excerpt_ar")}</Label>
                  <TranslateButton sourceText={editing.excerpt_en} from="en" to="ar" fieldType="excerpt" onTranslated={text => setEditing(prev => ({ ...prev, excerpt_ar: text }))} />
                </div>
                <Textarea value={editing.excerpt_ar} onChange={e => setEditing(prev => ({ ...prev, excerpt_ar: e.target.value }))} dir="rtl" rows={2} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>{t("blog.image")}</Label><Input value={editing.featured_image} onChange={e => setEditing(prev => ({ ...prev, featured_image: e.target.value }))} dir="ltr" placeholder="https://..." /></div>
              <div className="space-y-2"><Label>{t("blog.read_en")}</Label><Input value={editing.read_time_en} onChange={e => setEditing(prev => ({ ...prev, read_time_en: e.target.value }))} placeholder="5 min read" /></div>
              <div className="space-y-2"><Label>{t("blog.read_ar")}</Label><Input value={editing.read_time_ar} onChange={e => setEditing(prev => ({ ...prev, read_time_ar: e.target.value }))} dir="rtl" placeholder="٥ دقائق قراءة" /></div>
            </div>
            <div className="space-y-2"><Label>{t("blog.tags")}</Label><Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="tajweed, quran, learning" /></div>
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Button variant={activeTab === "en" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("en")}>{t("blog.content_en")}</Button>
                <Button variant={activeTab === "ar" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("ar")}>{t("blog.content_ar")}</Button>
                <div className="flex-1" />
                {activeTab === "en" ? (
                  <TranslateButton sourceText={editing.content_ar} from="ar" to="en" fieldType="content" onTranslated={text => setEditing(prev => ({ ...prev, content_en: text }))} />
                ) : (
                  <TranslateButton sourceText={editing.content_en} from="en" to="ar" fieldType="content" onTranslated={text => setEditing(prev => ({ ...prev, content_ar: text }))} />
                )}
              </div>
              {activeTab === "en" ? (
                <TipTapEditor key={`en-${editing.id || "new"}`} content={editing.content_en} onChange={html => setEditing(prev => ({ ...prev, content_en: html }))} placeholder="Write your article in English..." />
              ) : (
                <TipTapEditor key={`ar-${editing.id || "new"}`} content={editing.content_ar} onChange={html => setEditing(prev => ({ ...prev, content_ar: html }))} placeholder="اكتب المقال بالعربية..." dir="rtl" />
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEditor(false)}>{t("blog.cancel")}</Button>
              <Button onClick={handleSave} disabled={isSaving}>{isSaving ? <><Loader2 className="h-4 w-4 animate-spin me-1" />{t("login.loading")}</> : (editing.id ? t("blog.update") : t("blog.save"))}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
