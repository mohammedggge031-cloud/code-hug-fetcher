import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Copy, Search, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { safeDataRequest } from "@/lib/safeRuntimeData";

interface MediaAsset {
  id: string; file_name: string; file_url: string;
  file_size: number | null; file_type: string | null;
  alt_text: string | null; created_at: string;
}

const MediaLibrary = () => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const { isAdmin } = useAuth();
  const { t } = useAdminLang();
  const { toast } = useToast();

  const fetchAssets = async () => {
    const data = await safeDataRequest<MediaAsset[]>({
      fallback: [],
      markGlobalFallbackOnError: false,
      request: async (signal) => {
        const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false }).abortSignal(signal);
        if (error) throw error;
        return data ?? [];
      },
    });

    setAssets(data);
  };

  useEffect(() => { fetchAssets(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        try {
          const ext = file.name.split(".").pop();
          const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
          if (uploadError) { toast({ title: t("err.error"), description: uploadError.message, variant: "destructive" }); continue; }
          const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
          const { error: insertError } = await supabase.from("media_assets").insert({ file_name: file.name, file_url: publicUrl, file_size: file.size, file_type: file.type });
          if (insertError) {
            toast({ title: t("err.error"), description: insertError.message, variant: "destructive" });
          }
        } catch {
          toast({ title: t("err.error"), description: "Upload timed out for one file. Skipped.", variant: "destructive" });
        }
      }
      toast({ title: t("ok.done"), description: `${files.length} file(s) uploaded.` });
      void fetchAssets();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyUrl = (url: string) => { navigator.clipboard.writeText(url); toast({ title: t("media.copied"), description: t("media.copied_desc") }); };

  const handleDelete = async (asset: MediaAsset) => {
    if (!confirm(t("media.confirm_delete"))) return;
    try {
      const urlParts = asset.file_url.split("/media/");
      const storagePath = urlParts[urlParts.length - 1];
      await supabase.storage.from("media").remove([storagePath]);
      await supabase.from("media_assets").delete().eq("id", asset.id);
      toast({ title: t("ok.deleted") });
      void fetchAssets();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  const filtered = assets.filter(a => a.file_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("media.title")}</h1>
          <p className="text-muted-foreground">{assets.length} {t("media.files")}</p>
        </div>
        <div>
          <input type="file" id="media-upload" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} />
          <Button asChild disabled={uploading}>
            <label htmlFor="media-upload" className="cursor-pointer"><Upload className="h-4 w-4 me-1" /> {uploading ? t("media.uploading") : t("media.upload")}</label>
          </Button>
        </div>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("media.search")} className="ps-10" />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(asset => (
            <Card key={asset.id} className="group overflow-hidden">
              <div className="aspect-square bg-muted relative">
                {asset.file_type?.startsWith("image/") ? (
                  <img src={asset.file_url} alt={asset.alt_text || asset.file_name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><ImageIcon className="h-8 w-8 text-muted-foreground" /></div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => copyUrl(asset.file_url)}><Copy className="h-4 w-4" /></Button>
                  {isAdmin && <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(asset)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-xs text-foreground truncate">{asset.file_name}</p>
                <p className="text-xs text-muted-foreground">{asset.file_size ? `${(asset.file_size / 1024).toFixed(0)} KB` : "—"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>{t("media.empty")}</p>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
