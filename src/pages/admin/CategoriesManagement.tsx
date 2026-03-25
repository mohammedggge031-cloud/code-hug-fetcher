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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Category { id: string; name_en: string; name_ar: string; slug: string; }

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [slug, setSlug] = useState("");
  const { isAdmin } = useAuth();
  const { t } = useAdminLang();
  const { toast } = useToast();

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("blog_categories").select("*").order("name_en");
    if (error) {
      toast({ title: t("err.error"), description: error.message, variant: "destructive" });
      return;
    }
    if (data) setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const openNew = () => { setEditing(null); setNameEn(""); setNameAr(""); setSlug(""); setShowDialog(true); };
  const openEdit = (cat: Category) => { setEditing(cat); setNameEn(cat.name_en); setNameAr(cat.name_ar); setSlug(cat.slug); setShowDialog(true); };

  const handleSave = async () => {
    if (!nameEn || !nameAr) { toast({ title: t("err.error"), description: t("cat.err_names"), variant: "destructive" }); return; }
    const finalSlug = slug || nameEn.toLowerCase().replace(/\s+/g, "-");
    let error;
    if (editing) { ({ error } = await supabase.from("blog_categories").update({ name_en: nameEn, name_ar: nameAr, slug: finalSlug }).eq("id", editing.id)); }
    else { ({ error } = await supabase.from("blog_categories").insert({ name_en: nameEn, name_ar: nameAr, slug: finalSlug })); }
    if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
    toast({ title: t("ok.done") }); setShowDialog(false); fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("cat.confirm_delete"))) return;
    const { error } = await supabase.from("blog_categories").delete().eq("id", id);
    if (error) {
      toast({ title: t("err.error"), description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t("ok.deleted") });
    fetchCategories();
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
              {categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name_en}</TableCell>
                  <TableCell dir="rtl">{cat.name_ar}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{cat.slug}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                      {isAdmin && <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(cat.id)}><Trash2 className="h-4 w-4" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? t("cat.edit") : t("cat.new")}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>{t("cat.name_en")}</Label><Input value={nameEn} onChange={e => { setNameEn(e.target.value); if (!editing) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")); }} /></div>
            <div className="space-y-2"><Label>{t("cat.name_ar")}</Label><Input value={nameAr} onChange={e => setNameAr(e.target.value)} dir="rtl" /></div>
            <div className="space-y-2"><Label>{t("cat.slug")}</Label><Input value={slug} onChange={e => setSlug(e.target.value)} dir="ltr" /></div>
            <Button onClick={handleSave} className="w-full">{editing ? t("cat.update") : t("cat.create")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesManagement;
