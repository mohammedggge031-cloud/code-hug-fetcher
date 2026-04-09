import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { cn } from "@/lib/utils";

interface TranslateButtonProps {
  sourceText: string;
  from: "en" | "ar";
  to: "en" | "ar";
  fieldType?: "title" | "excerpt" | "content";
  onTranslated: (text: string) => void;
  className?: string;
  size?: "sm" | "icon";
}

const TranslateButton = ({
  sourceText,
  from,
  to,
  fieldType = "title",
  onTranslated,
  className,
  size = "sm",
}: TranslateButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useAdminLang();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: t("err.error"),
        description: from === "en" ? "اكتب النص الإنجليزي أولاً" : "Write the Arabic text first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("translate-content", {
        body: { text: sourceText, from, to, field_type: fieldType },
      });

      if (error) throw error;
      if (data?.translated) {
        onTranslated(data.translated);
        toast({
          title: from === "en" ? "تمت الترجمة ✓" : "Translated ✓",
          description: from === "en" ? "تم الترجمة للعربية بنجاح" : "Successfully translated to English",
        });
      }
    } catch (err: any) {
      toast({
        title: t("err.error"),
        description: err?.message || "Translation failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const label = from === "en" ? "🇸🇦 ترجم للعربية" : "🇬🇧 Translate to English";

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      onClick={handleTranslate}
      disabled={loading || !sourceText.trim()}
      className={cn(
        "gap-1.5 text-xs font-medium border-primary/30 text-primary hover:bg-primary/10 hover:text-primary transition-all",
        loading && "animate-pulse",
        className
      )}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Languages className="h-3.5 w-3.5" />
      )}
      {size !== "icon" && label}
    </Button>
  );
};

export default TranslateButton;
