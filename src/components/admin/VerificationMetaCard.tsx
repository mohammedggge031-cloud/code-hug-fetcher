import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2 } from "lucide-react";

/**
 * Manages search-engine verification meta tags (Google Search Console, Bing,
 * Facebook, etc.). Stored as a JSON array in `custom_scripts` under the name
 * `verification_meta_tags` and injected at runtime by <SiteVerificationMeta />.
 *
 * No placeholder values are ever written — empty rows are skipped on save.
 */

const STORAGE_NAME = "verification_meta_tags";

type Tag = { name: string; content: string };

const COMMON_PRESETS = [
  { label: "Google Search Console", name: "google-site-verification" },
  { label: "Bing Webmaster", name: "msvalidate.01" },
  { label: "Facebook Domain", name: "facebook-domain-verification" },
  { label: "Pinterest", name: "p:domain_verify" },
  { label: "Yandex", name: "yandex-verification" },
];

const VerificationMetaCard = () => {
  const { user } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isAr = lang === "ar";

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from("custom_scripts")
          .select("id, script_content")
          .eq("name", STORAGE_NAME)
          .maybeSingle();
        if (data?.id) setRowId(data.id);
        if (data?.script_content) {
          try {
            const parsed = JSON.parse(data.script_content);
            if (Array.isArray(parsed)) {
              setTags(parsed.filter((x) => x && typeof x.name === "string"));
            }
          } catch {
            /* ignore malformed */
          }
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateTag = (idx: number, patch: Partial<Tag>) => {
    setTags((prev) => prev.map((tag, i) => (i === idx ? { ...tag, ...patch } : tag)));
  };
  const removeTag = (idx: number) => setTags((prev) => prev.filter((_, i) => i !== idx));
  const addTag = (preset?: string) =>
    setTags((prev) => [...prev, { name: preset || "", content: "" }]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const clean = tags
        .map((tag) => ({ name: (tag.name || "").trim(), content: (tag.content || "").trim() }))
        .filter((tag) => tag.name && tag.content);
      const payload = {
        name: STORAGE_NAME,
        placement: "head",
        is_active: false,
        script_content: JSON.stringify(clean),
        updated_by: user?.id,
        updated_at: new Date().toISOString(),
      } as Record<string, unknown>;

      if (rowId) {
        const { error } = await supabase.from("custom_scripts").update(payload as never).eq("id", rowId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("custom_scripts")
          .insert(payload as never)
          .select("id")
          .single();
        if (error) throw error;
        if (data?.id) setRowId(data.id);
      }
      setTags(clean);
      toast({
        title: t("ok.done"),
        description: isAr
          ? "تم حفظ علامات التحقق. حدّث الصفحة لرؤيتها في المصدر."
          : "Verification tags saved. Reload the site to see them in the page source.",
      });
    } catch (err: any) {
      toast({ title: t("err.error"), description: err?.message || "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {isAr ? "علامات تحقق محركات البحث" : "Search-Engine Verification Tags"}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {isAr
            ? "أضف علامات meta للتحقق (Google Search Console، Bing، Facebook، ...). تُحقن داخل <head> تلقائياً."
            : "Add verification <meta> tags (Google Search Console, Bing, Facebook, …). They are injected into <head> automatically."}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {tags.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {isAr ? "لا توجد علامات بعد." : "No verification tags yet."}
              </p>
            )}
            {tags.map((tag, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 items-end">
                <div className="space-y-1">
                  <Label className="text-xs">name</Label>
                  <Input
                    value={tag.name}
                    onChange={(e) => updateTag(idx, { name: e.target.value })}
                    placeholder="google-site-verification"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">content</Label>
                  <Input
                    value={tag.content}
                    onChange={(e) => updateTag(idx, { content: e.target.value })}
                    placeholder="token-from-search-console"
                    dir="ltr"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => removeTag(idx)}
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-1">
              {COMMON_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(preset.name)}
                >
                  <Plus className="h-3 w-3 me-1" /> {preset.label}
                </Button>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addTag()}>
                <Plus className="h-3 w-3 me-1" /> {isAr ? "مخصص" : "Custom"}
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin me-1" /> {t("login.loading")}
                  </>
                ) : isAr ? (
                  "حفظ علامات التحقق"
                ) : (
                  "Save verification tags"
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationMetaCard;
