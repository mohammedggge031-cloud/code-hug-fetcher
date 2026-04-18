import { useEffect, useMemo, useState } from "react";
import { Star, Check, EyeOff, Trash2, RefreshCw, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { supabase } from "@/integrations/supabase/client";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

type ReviewStatus = "pending" | "approved" | "hidden";

interface Review {
  id: string;
  name: string;
  country: string | null;
  course: string | null;
  gender: string | null;
  rating: number | null;
  review_text: string;
  status: ReviewStatus;
  created_at: string;
}

type FilterKey = "all" | ReviewStatus;

const statusVariant: Record<ReviewStatus, "default" | "secondary" | "outline"> = {
  approved: "default",
  pending: "secondary",
  hidden: "outline",
};

const ReviewsManagement = () => {
  const { lang } = useAdminLang();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);

  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase
      .from("student_reviews" as never)
      .select("*")
      .order("created_at", { ascending: false }) as unknown as Promise<{
        data: Review[] | null;
        error: { message: string } | null;
      }>);
    if (error) {
      toast({ title: t("Failed to load reviews", "تعذر تحميل الآراء"), description: error.message, variant: "destructive" });
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
    const channel = supabase
      .channel("admin-student-reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "student_reviews" },
        () => { void load(); },
      )
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (review: Review, status: ReviewStatus) => {
    setBusyId(review.id);
    const { error } = await (supabase
      .from("student_reviews" as never)
      .update({ status, updated_at: new Date().toISOString() } as never)
      .eq("id", review.id) as unknown as Promise<{ error: { message: string } | null }>);
    setBusyId(null);
    if (error) {
      toast({ title: t("Update failed", "فشل التحديث"), description: error.message, variant: "destructive" });
      return;
    }
    setReviews((prev) => prev.map((r) => (r.id === review.id ? { ...r, status } : r)));
    toast({
      title:
        status === "approved"
          ? t("Review approved", "تمت الموافقة على الرأي")
          : status === "hidden"
            ? t("Review hidden", "تم إخفاء الرأي")
            : t("Review updated", "تم تحديث الرأي"),
    });
  };

  const removeReview = async (review: Review) => {
    setBusyId(review.id);
    const { error } = await (supabase
      .from("student_reviews" as never)
      .delete()
      .eq("id", review.id) as unknown as Promise<{ error: { message: string } | null }>);
    setBusyId(null);
    setDeleteTarget(null);
    if (error) {
      toast({ title: t("Delete failed", "فشل الحذف"), description: error.message, variant: "destructive" });
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== review.id));
    toast({ title: t("Review deleted", "تم حذف الرأي") });
  };

  const counts = useMemo(() => ({
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    hidden: reviews.filter((r) => r.status === "hidden").length,
  }), [reviews]);

  const filtered = useMemo(
    () => (filter === "all" ? reviews : reviews.filter((r) => r.status === filter)),
    [reviews, filter],
  );

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t("All", "الكل") },
    { key: "pending", label: t("Pending", "قيد المراجعة") },
    { key: "approved", label: t("Approved", "معتمد") },
    { key: "hidden", label: t("Hidden", "مخفي") },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 gap-2"><Inbox className="h-3.5 w-3.5" /> {t("Reviews", "الآراء")}</Badge>
          <h1 className="text-3xl font-bold text-foreground">{t("Student Reviews", "آراء الطلاب")}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {t("Approve, hide or delete reviews. Approved reviews appear on the website automatically.",
               "وافق على الآراء أو أخفها أو احذفها. الآراء المعتمدة تظهر في الموقع تلقائياً.")}
          </p>
        </div>
        <Button variant="outline" onClick={() => void load()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span className="ms-2">{t("Refresh", "تحديث")}</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={filter === f.key ? "default" : "outline"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="ms-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-background/30 px-1.5 text-xs">
              {counts[f.key]}
            </span>
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("All submissions", "كل الآراء المُرسلة")}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {t("No reviews in this category yet.", "لا توجد آراء في هذا التصنيف.")}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Name", "الاسم")}</TableHead>
                  <TableHead className="min-w-[260px]">{t("Comment", "التعليق")}</TableHead>
                  <TableHead>{t("Rating", "التقييم")}</TableHead>
                  <TableHead>{t("Status", "الحالة")}</TableHead>
                  <TableHead>{t("Date", "التاريخ")}</TableHead>
                  <TableHead className="text-end">{t("Actions", "الإجراءات")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {[r.country, r.course].filter(Boolean).join(" · ")}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-foreground/90 whitespace-pre-wrap line-clamp-4">{r.review_text}</p>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-current text-primary" />
                        <span className="text-sm">{r.rating ?? "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[r.status] ?? "secondary"} className="capitalize">
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}
                    </TableCell>
                    <TableCell className="text-end">
                      <div className="inline-flex flex-wrap justify-end gap-2">
                        {r.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="default"
                            disabled={busyId === r.id}
                            onClick={() => void updateStatus(r, "approved")}
                          >
                            <Check className="h-4 w-4" />
                            <span className="ms-1 hidden sm:inline">{t("Approve", "موافقة")}</span>
                          </Button>
                        )}
                        {r.status !== "hidden" && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === r.id}
                            onClick={() => void updateStatus(r, "hidden")}
                          >
                            <EyeOff className="h-4 w-4" />
                            <span className="ms-1 hidden sm:inline">{t("Hide", "إخفاء")}</span>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={busyId === r.id}
                          onClick={() => setDeleteTarget(r)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="ms-1 hidden sm:inline">{t("Delete", "حذف")}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => deleteTarget && void removeReview(deleteTarget)}
        title={t("Delete review", "حذف الرأي")}
        description={t(
          "This permanently removes the review. This cannot be undone.",
          "سيؤدي هذا إلى حذف الرأي نهائياً. لا يمكن التراجع.",
        )}
      />
    </div>
  );
};

export default ReviewsManagement;
