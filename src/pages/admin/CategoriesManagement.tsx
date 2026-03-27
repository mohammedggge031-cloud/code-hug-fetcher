import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Category { id: string; name_en: string; name_ar: string; slug: string; }

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [slug, setSlug] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const { isAdmin } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();

  const fetchCategories = async () => {
    setIsFetching(true);
    try {
      const result = await safeDataRequest<{ data: Category[]; errorMessage: string | null }>({
        fallback: { data: [], errorMessage: null },
        markGlobalFallbackOnError: false,
        request: async (signal) => {
          const { data, error } = await supabase.from("blog_categories").select("*").order("name_en").abortSignal(signal);
          return { data: data ?? [], errorMessage: error?.message || null };
        },
      });

      if (result.errorMessage) {
        toast({ title: t("err.error"), description: result.errorMessage, variant: "destructive" });
      }

      setCategories(result.data);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openNew = () => { setEditing(null); setNameEn(""); setNameAr(""); setSlug(""); setShowDialog(true); };
  const openEdit = (cat: Category) => { setEditing(cat); setNameEn(cat.name_en); setNameAr(cat.name_ar); setSlug(cat.slug); setShowDialog(true); };

  const handleSave = async () => {
    if (!nameEn || !nameAr) { toast({ title: t("err.error"), description: t("cat.err_names"), variant: "destructive" }); return; }
    const finalSlug = slug || nameEn.toLowerCase().replace(/\s+/g, "-");
    setIsSaving(true);
    try {
      let error;
      if (editing) { ({ error } = await supabase.from("blog_categories").update({ name_en: nameEn, name_ar: nameAr, slug: finalSlug }).eq("id", editing.id)); }
      else { ({ error } = await supabase.from("blog_categories").insert({ name_en: nameEn, name_ar: nameAr, slug: finalSlug })); }
      if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      toast({ title: t("ok.done") }); setShowDialog(false); void fetchCategories();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    try {
      const { error } = await supabase.from("blog_categories").delete().eq("id", cat.id);
      if (error) {
        toast({ title: t("err.error"), description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: t("ok.deleted") });
      void fetchCategories();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("cat.title")}</h1>
          <p className="text-muted-foreground">{t("cat.subtitle")}</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4 me-1" /> {t("cat.add")}</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("cat.name_en")}</TableHead>
                <TableHead>{t("cat.name_ar")}</TableHead>
                <TableHead>{t("cat.slug")}</TableHead>
                <TableHead className="w-24">{t("cat.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    {lang === "ar" ? "لا توجد تصنيفات" : "No categories found"}
                  </TableCell>
                </TableRow>
              ) : categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name_en}</TableCell>
                  <TableCell dir="rtl">{cat.name_ar}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{cat.slug}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                      {isAdmin && <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(cat)}><Trash2 className="h-4 w-4" /></Button>}
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
        title={t("cat.confirm_delete")}
        description={lang === "ar" ? "سيتم حذف هذا التصنيف نهائياً." : "This category will be permanently deleted."}
        confirmLabel={t("ok.deleted")}
        cancelLabel={t("blog.cancel")}
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? t("cat.edit") : t("cat.new")}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>{t("cat.name_en")}</Label><Input value={nameEn} onChange={e => { setNameEn(e.target.value); if (!editing) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")); }} /></div>
            <div className="space-y-2"><Label>{t("cat.name_ar")}</Label><Input value={nameAr} onChange={e => setNameAr(e.target.value)} dir="rtl" /></div>
            <div className="space-y-2"><Label>{t("cat.slug")}</Label><Input value={slug} onChange={e => setSlug(e.target.value)} dir="ltr" /></div>
            <Button onClick={handleSave} className="w-full" disabled={isSaving}>
              {isSaving ? <><Loader2 className="h-4 w-4 animate-spin me-1" />{t("login.loading")}</> : (editing ? t("cat.update") : t("cat.create"))}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesManagement;
