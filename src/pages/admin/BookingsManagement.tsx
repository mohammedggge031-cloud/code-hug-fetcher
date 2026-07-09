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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { RefreshCw, Trash2, Inbox, Search, Phone, MessageSquare, Eye, CheckCircle2, Clock3, CalendarDays } from "lucide-react";

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
  is_read?: boolean | null;
  transferred_at?: string | null;
  form_details?: Record<string, unknown> | null;
  created_at: string;
};

type RangeMode = "all" | "today" | "month" | "custom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const buildWhatsAppUrl = (booking: Booking) => {
  const phone = booking.phone.replace(/[^\d]/g, "");
  const details = booking.form_details || {};
  const text = [
    "Assalamu alaikum",
    `Name: ${booking.full_name}`,
    `Course: ${booking.course_interest || "—"}`,
    `Preferred date: ${booking.preferred_date || "—"}`,
    `Preferred time: ${booking.preferred_time || "—"}`,
    `Timezone: ${booking.timezone || "—"}`,
    details.egyptTime ? `Egypt time: ${String(details.egyptTime)}` : null,
    booking.message ? `Message: ${booking.message}` : null,
  ].filter(Boolean).join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

const BookingsManagement = () => {
  const { lang } = useAdminLang();
  const { toast } = useToast();
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [rangeMode, setRangeMode] = useState<RangeMode>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
    empty: "لا توجد حجوزات في هذه الفترة.",
    searchPh: "ابحث بالاسم أو الهاتف أو الدورة…",
    total: "الإجمالي",
    unread: "غير مقروء",
    read: "مقروء",
    details: "تفاصيل الحجز",
    markTransferred: "تم التحويل",
    transferred: "محوّل",
    pending: "معلّق",
    whatsApp: "واتساب",
    period: "الفترة",
    all: "كل الفترات",
    today: "اليوم",
    month: "الشهر الحالي",
    custom: "من / إلى",
    from: "من",
    to: "إلى",
    loadErr: "تعذر تحميل الحجوزات. شغّل SQL الحجوزات المحدث أولاً.",
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
    empty: "No bookings in this period.",
    searchPh: "Search by name, phone, or course…",
    total: "Total",
    unread: "Unread",
    read: "Read",
    details: "Booking details",
    markTransferred: "Mark transferred",
    transferred: "Transferred",
    pending: "Pending",
    whatsApp: "WhatsApp",
    period: "Period",
    all: "All time",
    today: "Today",
    month: "This month",
    custom: "From / To",
    from: "From",
    to: "To",
    loadErr: "Could not load bookings. Run the updated bookings SQL first.",
  }, [lang]);

  const dateRange = useMemo(() => {
    const now = new Date();
    if (rangeMode === "today") {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return { start, end };
    }
    if (rangeMode === "month") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return { start, end };
    }
    if (rangeMode === "custom") {
      const start = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
      const end = toDate ? new Date(`${toDate}T00:00:00`) : null;
      if (end) end.setDate(end.getDate() + 1);
      return { start, end };
    }
    return { start: null, end: null };
  }, [fromDate, rangeMode, toDate]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = db
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (dateRange.start) query = query.gte("created_at", dateRange.start.toISOString());
      if (dateRange.end) query = query.lt("created_at", dateRange.end.toISOString());

      const { data, error: err } = await query;
      if (err) throw err;
      setRows((data || []) as Booking[]);
      setSelected(new Set());
    } catch (err) {
      setError(copy.loadErr);
      // eslint-disable-next-line no-console
      console.error("bookings load error:", err);
    } finally {
      setLoading(false);
    }
  }, [copy.loadErr, dateRange.end, dateRange.start]);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.full_name, r.phone, r.course_interest, r.source, r.message, r.timezone]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [rows, search]);

  const unreadCount = rows.filter((r) => r.is_read === false).length;
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

  const patchBooking = (id: string, patch: Partial<Booking>) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, ...patch } : r));
    setActiveBooking((prev) => prev?.id === id ? { ...prev, ...patch } : prev);
  };

  const openDetails = async (booking: Booking) => {
    setActiveBooking(booking);
    if (booking.is_read === false) {
      patchBooking(booking.id, { is_read: true });
      await db.from("bookings").update({ is_read: true }).eq("id", booking.id);
    }
  };

  const markTransferred = async (booking: Booking) => {
    const transferredAt = new Date().toISOString();
    const patch = { status: "transferred", transferred_at: transferredAt, is_read: true };
    patchBooking(booking.id, patch);
    const { error: err } = await db.from("bookings").update(patch).eq("id", booking.id);
    if (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      void load();
      return;
    }
    toast({ title: copy.transferred, description: booking.full_name });
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

  const detailRows = activeBooking ? [
    [copy.name, activeBooking.full_name],
    [copy.phone, activeBooking.phone],
    ["Email", activeBooking.email || "—"],
    [copy.course, activeBooking.course_interest || "—"],
    [copy.date, activeBooking.preferred_date || "—"],
    [copy.time, activeBooking.preferred_time || "—"],
    [copy.tz, activeBooking.timezone || "—"],
    [copy.source, activeBooking.source || "website"],
    [copy.message, activeBooking.message || "—"],
    [copy.created, new Date(activeBooking.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")],
  ] : [];

  const extraDetails = activeBooking?.form_details
    ? Object.entries(activeBooking.form_details).filter(([, v]) => v !== null && v !== undefined && v !== "")
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Inbox className="h-6 w-6 text-primary" /> {copy.title}
            {unreadCount > 0 && <Badge variant="destructive">{unreadCount} {copy.unread}</Badge>}
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
        <CardHeader className="space-y-4">
          <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
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
          </div>
          <div className="grid gap-3 md:grid-cols-[220px_1fr_1fr]">
            <div>
              <label className="mb-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" /> {copy.period}
              </label>
              <Select value={rangeMode} onValueChange={(v) => setRangeMode(v as RangeMode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{copy.all}</SelectItem>
                  <SelectItem value="today">{copy.today}</SelectItem>
                  <SelectItem value="month">{copy.month}</SelectItem>
                  <SelectItem value="custom">{copy.custom}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{copy.from}</label>
              <Input type="date" value={fromDate} onChange={(e) => { setFromDate(e.target.value); setRangeMode("custom"); }} max={toDate || undefined} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{copy.to}</label>
              <Input type="date" value={toDate} onChange={(e) => { setToDate(e.target.value); setRangeMode("custom"); }} min={fromDate || undefined} />
            </div>
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
                <TableHead className="w-28"></TableHead>
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
                <TableRow key={r.id} className={r.is_read === false ? "bg-primary/5" : selected.has(r.id) ? "bg-muted/40" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(r.id)}
                      onCheckedChange={() => toggleOne(r.id)}
                      aria-label={`Select ${r.full_name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <button type="button" onClick={() => void openDetails(r)} className="text-start hover:text-primary">
                      <span className="inline-flex items-center gap-2">
                        {r.is_read === false && <span className="h-2.5 w-2.5 rounded-full bg-destructive" aria-label={copy.unread} />}
                        {r.full_name}
                      </span>
                    </button>
                    {r.message && (
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-start gap-1 max-w-xs">
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{r.message}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={buildWhatsAppUrl(r)}
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
                    {r.timezone ? <div className="max-w-44 truncate" title={r.timezone}>{r.timezone}</div> : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{r.source || "website"}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}
                    <div>
                      {r.status === "transferred" ? <Badge className="mt-1" variant="default">{copy.transferred}</Badge> : <Badge className="mt-1" variant="outline">{copy.pending}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => void openDetails(r)} title={copy.details}>
                        <Eye className="h-4 w-4" />
                      </Button>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!activeBooking} onOpenChange={(open) => !open && setActiveBooking(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {copy.details}
              {activeBooking?.status === "transferred" ? <Badge>{copy.transferred}</Badge> : <Badge variant="outline">{copy.pending}</Badge>}
            </DialogTitle>
          </DialogHeader>
          {activeBooking && (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {detailRows.map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs font-medium text-muted-foreground">{label}</div>
                    <div className="mt-1 break-words text-sm text-foreground">{value}</div>
                  </div>
                ))}
              </div>

              {extraDetails.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">Form details</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {extraDetails.map(([key, value]) => (
                      <div key={key} className="rounded-md bg-secondary/40 p-2 text-sm">
                        <span className="font-medium text-muted-foreground">{key}: </span>
                        <span>{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="sticky bottom-0 -mx-6 -mb-6 flex flex-wrap items-center justify-end gap-2 border-t bg-background p-4">
                <Button asChild variant="outline" className="gap-2">
                  <a href={buildWhatsAppUrl(activeBooking)} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" /> {copy.whatsApp}
                  </a>
                </Button>
                <Button
                  onClick={() => void markTransferred(activeBooking)}
                  disabled={activeBooking.status === "transferred"}
                  className="gap-2"
                >
                  {activeBooking.status === "transferred" ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                  {activeBooking.status === "transferred" ? copy.transferred : copy.markTransferred}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsManagement;