import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle2, Loader2 } from "lucide-react";
import migrationPayload from "@/data/migrationPayload.json";

interface Props {
  onComplete: () => void;
}

const BlogMigrationTrigger = ({ onComplete }: Props) => {
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [result, setResult] = useState<{ inserted: number; skipped: number } | null>(null);
  const { toast } = useToast();

  const runMigration = async () => {
    setStatus("running");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Error", description: "Not authenticated", variant: "destructive" });
        setStatus("error");
        return;
      }

      const res = await supabase.functions.invoke("bulk-insert-posts", {
        body: migrationPayload,
      });

      if (res.error) {
        toast({ title: "Error", description: res.error.message, variant: "destructive" });
        setStatus("error");
        return;
      }

      setResult(res.data);
      setStatus("done");
      toast({ title: "✅ Migration Complete", description: `Inserted ${res.data.inserted} posts, skipped ${res.data.skipped} duplicates` });
      onComplete();
    } catch (err) {
      toast({ title: "Error", description: String(err), variant: "destructive" });
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardContent className="flex items-center gap-3 py-4">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            Migration complete — {result?.inserted} posts inserted, {result?.skipped} skipped
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Migrate Legacy Blog Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {migrationPayload.posts.length} legacy blog posts found. Click to import them into the database.
        </p>
        <Button 
          onClick={runMigration} 
          disabled={status === "running"}
          size="sm"
          variant="outline"
          className="border-amber-300"
        >
          {status === "running" ? (
            <><Loader2 className="h-4 w-4 me-1 animate-spin" /> Migrating...</>
          ) : (
            <><Upload className="h-4 w-4 me-1" /> Import {migrationPayload.posts.length} Posts</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogMigrationTrigger;
