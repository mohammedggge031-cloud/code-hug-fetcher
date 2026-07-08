import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { RefreshCw, Trash2, Inbox, Search, Phone, MessageSquare } from "lucide-react";

type Booking = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  course_interest: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  timezone: string | null;
  message: string | null;
  source: string | null;
  status: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const BookingsManagement = () => {
  const { lang } = useAdminLang();
  const { toast } = useToast();
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const copy = useMemo(() => lang === "ar" ? {
    title: "الحجوزات",
    subtitle: "كل الحجوزات القادمة من نموذج التسجيل على الموقع.",
    refresh: "تحديث",
    deleteSel: "حذف المحدد",
    deleteAll: "حذف الكل",
    confirmTitle: "تأكيد الحذف",
    confirmDesc: "هذا الإجراء لا يمكن التراجع عنه.",
    cancel: "إلغاء",
    confirm: "حذف",
    name: "الاسم", phone: "الهاتف", course: "الدورة",
    date: "التاريخ", time: "الوقت", tz: "المنطقة",
    source: "المصدر", message: "الرسالة", created: "أُنشئ في",
    empty: "لا توجد حجوزات بعد.",
    searchPh: "ابحث بالاسم أو الهاتف أو الدورة…",
    total: "الإجمالي",
    selCount: (n: number) => `${n} محدد`,
    loadErr: "تعذر تحميل الحجوزات. تحقق من تشغيل جدول bookings في قاعدة البيانات.",
  } : {
    title: "Bookings",
    subtitle: "All bookings submitted through the site's registration form.",
    refresh: "Refresh",
    deleteSel: "Delete selected",
    deleteAll: "Delete all",
    confirmTitle: "Confirm deletion",
    confirmDesc: "This action cannot be undone.",
    cancel: "Cancel",
    confirm: "Delete",
    name: "Name", phone: "Phone", course: "Course",
    date: "Date", time: "Time", tz: "Timezone",
    source: "Source", message: "Message", created: "Created",
    empty: "No bookings yet.",
    searchPh: "Search by name, phone, or course…",
    total: "Total",
    selCount: (n: number) => `${n} selected`,
    loadErr: "Could not load bookings. Make sure the bookings table SQL has been run.",
  }, [lang]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await db
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (err) throw err;
      setRows((data || []) as Booking[]);
    } catch (err) {
      setError(copy.loadErr);
      // eslint-disable-next-line no-console
      console.error("bookings load error:", err);
    } finally {
      setLoading(false);
    }
  }, [copy.loadErr]);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.full_name, r.phone, r.course_interest, r.source, r.message]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [rows, search]);

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const toggleAll = () => {
    if (allChecked) setSelected(new Set());
    else setSelected(new Set(filtered.map((r) => r.id)));
  };
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const deleteMany = async (ids: string[]) => {
    if (ids.length === 0) return;
    try {
      const { error: err } = await db.from("bookings").delete().in("id", ids);
      if (err) throw err;
      setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
      setSelected(new Set());
      toast({ title: copy.confirm, description: `${ids.length}` });
    } catch (err) {
      toast({ title: "Error", description: String(err), variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Inbox className="h-6 w-6 text-primary" /> {copy.title}
          </h1>
          <p className="text-muted-foreground">{copy.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => void load()} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> {copy.refresh}
          </Button>
          {selected.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" /> {copy.deleteSel} ({selected.size})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{copy.confirmTitle}</AlertDialogTitle>
                  <AlertDialogDescription>{copy.confirmDesc}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{copy.cancel}</AlertDialogCancel>
                  <AlertDialogAction onClick={() => void deleteMany(Array.from(selected))}>
                    {copy.confirm}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 flex-wrap">
          <CardTitle className="text-base font-semibold">
            {copy.total}: {rows.length}
          </CardTitle>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={copy.searchPh}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {error && (
            <div className="px-4 py-3 text-sm text-destructive bg-destructive/5 border-y border-destructive/20">
              {error}
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="Select all" />
                </TableHead>
                <TableHead>{copy.name}</TableHead>
                <TableHead>{copy.phone}</TableHead>
                <TableHead>{copy.course}</TableHead>
                <TableHead>{copy.date}</TableHead>
                <TableHead>{copy.time}</TableHead>
                <TableHead>{copy.source}</TableHead>
                <TableHead>{copy.created}</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    {copy.empty}
                  </TableCell>
                </TableRow>
              ) : filtered.map((r) => (
                <TableRow key={r.id} className={selected.has(r.id) ? "bg-muted/40" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(r.id)}
                      onCheckedChange={() => toggleOne(r.id)}
                      aria-label={`Select ${r.full_name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{r.full_name}</div>
                    {r.message && (
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-start gap-1 max-w-xs">
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{r.message}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://wa.me/${r.phone.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <Phone className="h-3 w-3" /> {r.phone}
                    </a>
                  </TableCell>
                  <TableCell className="text-sm">{r.course_interest || "—"}</TableCell>
                  <TableCell className="text-sm">{r.preferred_date || "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {r.preferred_time || "—"}
                    {r.timezone ? <div>{r.timezone}</div> : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{r.source || "website"}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{copy.confirmTitle}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {copy.confirmDesc} — {r.full_name}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{copy.cancel}</AlertDialogCancel>
                          <AlertDialogAction onClick={() => void deleteMany([r.id])}>
                            {copy.confirm}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManagement;
