import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash2, Search } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface SeoEntry {
  id: string; page_path: string; page_name: string;
  title: string | null; description: string | null; keywords: string | null;
  canonical_url: string | null; og_title: string | null; og_description: string | null;
  og_image: string | null; og_type: string | null; twitter_card: string | null;
  twitter_title: string | null; twitter_description: string | null; twitter_image: string | null;
  structured_data: any; no_index: boolean | null; updated_at: string;
}

const defaultEntry: Partial<SeoEntry> = {
  page_path: "", page_name: "", title: "", description: "", keywords: "",
  canonical_url: "", og_title: "", og_description: "", og_image: "",
  og_type: "website", twitter_card: "summary_large_image", twitter_title: "",
  twitter_description: "", twitter_image: "", structured_data: null, no_index: false,
};

const SITE_PAGES: { path: string; name: string; title?: string; description?: string; keywords?: string }[] = [
  // Main pages
  { path: "/", name: "Home", title: "Alhamd Academy | Online Quran, Arabic & Islamic Studies", description: "Professional online Quran, Arabic & Islamic studies classes with certified Al-Azhar teachers for kids & adults. Free trial.", keywords: "online quran classes, learn quran online, tajweed classes, arabic language course, hifz program" },
  { path: "/online-quran-classes", name: "Online Quran Classes", title: "Online Quran Classes for Kids & Adults | Alhamd Academy", description: "Learn Quran online with certified native Arabic teachers. One-on-one online Quran classes for kids and adults. Free trial class.", keywords: "online quran classes, learn quran online, quran classes online with teacher" },
  { path: "/tajweed-course-online", name: "Tajweed Course", title: "Tajweed Course Online | Learn Quran with Tajweed | Alhamd Academy", description: "Master Quran recitation with our comprehensive online Tajweed course. Certified Al-Azhar teachers. Free trial.", keywords: "tajweed course online, learn tajweed online, quran tajweed rules" },
  { path: "/quran-memorization-hifz", name: "Quran Memorization", title: "Quran Memorization (Hifz) Online | Alhamd Academy", description: "Memorize the Quran online with certified Huffaz from Al-Azhar. Personalized Hifz program. Free trial.", keywords: "quran memorization, hifz quran online, memorize quran, hifz program" },
  { path: "/arabic-for-kids", name: "Arabic for Kids", title: "Arabic Classes for Kids Online | Alhamd Academy", description: "Fun and engaging Arabic classes for kids online. Native Arabic-speaking teachers. Ages 4-14. Free trial.", keywords: "arabic classes for kids, learn arabic for children, online arabic classes for kids" },
  { path: "/arabic-for-adults", name: "Arabic for Adults", title: "Arabic Classes for Adults Online | Alhamd Academy", description: "Learn Arabic online with native-speaking teachers. Conversational, MSA, and Quranic Arabic. Free trial.", keywords: "arabic classes for adults, learn arabic online, arabic language course" },
  { path: "/islamic-studies-online", name: "Islamic Studies", title: "Islamic Studies Online | Learn Islam | Alhamd Academy", description: "Comprehensive Islamic Studies courses online. Learn Fiqh, Seerah, Aqeedah with certified teachers. Free trial.", keywords: "islamic studies online, learn islam online, islamic education" },
  { path: "/ijazah-program", name: "Ijazah Program", title: "Ijazah Program Online | Quran Ijazah Certification | Alhamd Academy", description: "Get your Quran Ijazah online with certified Al-Azhar scholars. Connected Sanad certification. Free trial.", keywords: "ijazah program, quran ijazah online, ijazah certification, sanad quran" },
  { path: "/female-quran-teacher", name: "Female Quran Teacher", title: "Female Quran Teacher Online | Women & Girls Quran Classes | Alhamd Academy", description: "Learn Quran with experienced female teachers. Private one-on-one classes for women and girls. Free trial.", keywords: "female quran teacher, women quran classes, girls quran teacher" },
  { path: "/free-trial", name: "Free Trial", title: "Free Trial Class | Try Online Quran Classes Free | Alhamd Academy", description: "Book your free trial Quran class today. No commitment, no payment. Experience one-on-one learning.", keywords: "free quran class, free trial quran lesson, try quran classes free" },
  { path: "/blog", name: "Blog", title: "Quran & Islamic Education Blog | Alhamd Academy", description: "Read articles about Quran learning, Tajweed tips, Islamic education from expert teachers.", keywords: "quran blog, islamic education blog, tajweed tips" },
  { path: "/videos", name: "Videos", title: "Educational Videos | Quran Recitation & Tajweed | Alhamd Academy", description: "Watch educational videos on Quran recitation, Tajweed rules, and Islamic education.", keywords: "quran videos, tajweed videos, quran recitation videos" },
  { path: "/learn-quran-online-worldwide", name: "Learn Quran Worldwide", title: "Learn Quran Online Worldwide | Global Quran Academy | Alhamd Academy", description: "Learn Quran online from anywhere in the world. Certified Al-Azhar teachers available 24/7. Free trial.", keywords: "learn quran online worldwide, global quran classes" },
  { path: "/privacy-policy", name: "Privacy Policy", title: "Privacy Policy | Alhamd Academy", description: "Read Alhamd Academy's privacy policy.", keywords: "privacy policy" },
  // SEO landing pages
  { path: "/quran-classes-for-kids", name: "Quran Classes for Kids", title: "Quran Classes for Kids Online | Alhamd Academy", description: "Fun online Quran classes for kids ages 4–14. Certified child-specialist teachers. Free trial.", keywords: "quran classes for kids online, learn quran for kids" },
  { path: "/quran-classes-for-adults", name: "Quran Classes for Adults", title: "Quran Classes for Adults Online | Alhamd Academy", description: "Start learning Quran as an adult with patient, certified teachers. Free trial.", keywords: "quran classes for adults, adult quran classes online" },
  { path: "/best-online-quran-classes", name: "Best Online Quran Classes", title: "Best Online Quran Classes 2025 | Alhamd Academy", description: "Discover the best online Quran classes with certified Al-Azhar teachers. 4.9/5 rating. Free trial.", keywords: "best online quran classes, best quran academy online" },
  { path: "/one-on-one-quran-classes", name: "One-on-One Quran Classes", title: "One-on-One Quran Classes Online | Alhamd Academy", description: "Personalized one-on-one Quran classes with dedicated teachers. Free trial.", keywords: "one on one quran classes, private quran tutor" },
  { path: "/quran-classes-pricing", name: "Quran Classes Pricing", title: "Quran Classes Pricing | Affordable Online Quran Lessons | Alhamd Academy", description: "Affordable online Quran classes starting from $8/hour. Flexible plans. Free trial.", keywords: "quran classes pricing, online quran class cost" },
  { path: "/quran-classes-for-beginners", name: "Quran Classes for Beginners", title: "Quran Classes for Beginners | Alhamd Academy", description: "Start your Quran learning journey from scratch. Patient teachers, Noor Al-Bayan method. Free trial.", keywords: "quran classes for beginners, learn quran from scratch" },
  { path: "/online-quran-classes-with-certificate", name: "Quran Classes with Certificate", title: "Online Quran Classes with Certificate | Alhamd Academy", description: "Earn a recognized certificate in Quran recitation, Tajweed, or Hifz. Free trial.", keywords: "quran classes with certificate, certified quran course" },
  { path: "/learn-quran-for-reverts", name: "Learn Quran for Reverts", title: "Learn Quran for Reverts & New Muslims | Alhamd Academy", description: "Welcoming online Quran classes designed for reverts and new Muslims. Patient Al-Azhar teachers. Free trial.", keywords: "quran for reverts, quran classes for new muslims, learn quran as a convert" },
  { path: "/noorani-qaida-online", name: "Noorani Qaida Online", title: "Noorani Qaida Online Course | Learn Arabic Alphabet | Alhamd Academy", description: "Learn Noorani Qaida online with certified teachers. Master Arabic letters and Quran reading basics. Free trial.", keywords: "noorani qaida online, learn noorani qaida, arabic alphabet course" },
  { path: "/quran-classes-for-sisters", name: "Quran Classes for Sisters", title: "Quran Classes for Sisters | Female-Only Quran Academy | Alhamd Academy", description: "Private online Quran classes for sisters with experienced female teachers. Comfortable learning environment. Free trial.", keywords: "quran classes for sisters, female quran classes, women quran academy" },
  { path: "/learn-quran-with-tajweed", name: "Learn Quran with Tajweed", title: "Learn Quran with Tajweed Online | Professional Recitation | Alhamd Academy", description: "Master Quran recitation with proper Tajweed rules. Certified Al-Azhar teachers. Free trial.", keywords: "learn quran with tajweed, tajweed quran online, quran recitation rules" },
  // Course detail pages
  { path: "/courses/quran-course", name: "Quran Course", title: "Quran Course Online | Learn Quran Reading | Alhamd Academy", description: "Comprehensive Quran reading course online with certified Al-Azhar teachers. From Noor Al-Bayan to fluent recitation. Free trial.", keywords: "quran course online, learn quran reading, quran lessons" },
  { path: "/courses/tajweed-course", name: "Tajweed Course Detail", title: "Tajweed Course Online | Master Quran Recitation | Alhamd Academy", description: "Master Tajweed rules with certified Al-Azhar teachers. Perfect your Quran recitation with personalized one-on-one lessons.", keywords: "tajweed course, tajweed rules, quran recitation course" },
  { path: "/courses/arabic-course", name: "Arabic Course", title: "Arabic Language Course Online | Learn Arabic | Alhamd Academy", description: "Learn Arabic online with native speakers. MSA, conversational, and Quranic Arabic for all levels. Free trial.", keywords: "arabic course online, learn arabic, arabic language lessons" },
  { path: "/courses/islamic-studies", name: "Islamic Studies Course", title: "Islamic Studies Course Online | Learn Islam | Alhamd Academy", description: "Comprehensive Islamic Studies covering Fiqh, Seerah, Aqeedah, and Hadith with certified scholars. Free trial.", keywords: "islamic studies course, learn islam online, islamic education" },
  { path: "/courses/all-in-one-course", name: "All-in-One Course", title: "All-in-One Quran, Arabic & Islamic Studies | Alhamd Academy", description: "Complete Islamic education package: Quran, Tajweed, Arabic, and Islamic Studies in one course. Best value. Free trial.", keywords: "all in one quran course, complete islamic course, quran arabic islamic studies" },
  // Location pages — Countries
  { path: "/learn-quran-online-usa", name: "Learn Quran Online - USA", title: "Learn Quran Online in USA | Top Quran Academy | Alhamd Academy", description: "Learn Quran online in the USA with certified Al-Azhar teachers. One-on-one classes for kids & adults. Free trial.", keywords: "learn quran online usa, quran classes usa, online quran teacher usa" },
  { path: "/learn-quran-online-canada", name: "Learn Quran Online - Canada", title: "Learn Quran Online in Canada | Alhamd Academy", description: "Online Quran classes for Muslims in Canada. Certified teachers, flexible scheduling. Free trial.", keywords: "learn quran online canada, quran classes canada" },
  { path: "/learn-quran-online-uk", name: "Learn Quran Online - UK", title: "Learn Quran Online in UK | Alhamd Academy", description: "Learn Quran online in the UK with certified Al-Azhar teachers. One-on-one classes. Free trial.", keywords: "learn quran online uk, quran classes uk, quran tutor uk" },
  { path: "/learn-quran-online-australia", name: "Learn Quran Online - Australia", title: "Learn Quran Online in Australia | Alhamd Academy", description: "Online Quran classes for Muslims in Australia. Flexible timezone scheduling. Free trial.", keywords: "learn quran online australia, quran classes australia" },
  { path: "/learn-quran-online-germany", name: "Learn Quran Online - Germany", title: "Learn Quran Online in Germany | Alhamd Academy", description: "Online Quran classes for Muslims in Germany. Certified teachers. Free trial.", keywords: "learn quran online germany, quran classes germany" },
  { path: "/learn-quran-online-france", name: "Learn Quran Online - France", title: "Learn Quran Online in France | Alhamd Academy", description: "Online Quran classes for Muslims in France. Certified Al-Azhar teachers. Free trial.", keywords: "learn quran online france, quran classes france" },
  { path: "/learn-quran-online-netherlands", name: "Learn Quran Online - Netherlands", title: "Learn Quran Online in Netherlands | Alhamd Academy", description: "Online Quran classes for Muslims in the Netherlands. Free trial.", keywords: "learn quran online netherlands, quran classes netherlands" },
  { path: "/learn-quran-online-sweden", name: "Learn Quran Online - Sweden", title: "Learn Quran Online in Sweden | Alhamd Academy", description: "Online Quran classes for Muslims in Sweden. Certified teachers. Free trial.", keywords: "learn quran online sweden, quran classes sweden" },
  { path: "/learn-quran-online-norway", name: "Learn Quran Online - Norway", title: "Learn Quran Online in Norway | Alhamd Academy", description: "Online Quran classes for Muslims in Norway. Free trial.", keywords: "learn quran online norway, quran classes norway" },
  { path: "/learn-quran-online-denmark", name: "Learn Quran Online - Denmark", title: "Learn Quran Online in Denmark | Alhamd Academy", description: "Online Quran classes for Muslims in Denmark. Free trial.", keywords: "learn quran online denmark, quran classes denmark" },
  { path: "/learn-quran-online-belgium", name: "Learn Quran Online - Belgium", title: "Learn Quran Online in Belgium | Alhamd Academy", description: "Online Quran classes for Muslims in Belgium. Free trial.", keywords: "learn quran online belgium, quran classes belgium" },
  { path: "/learn-quran-online-switzerland", name: "Learn Quran Online - Switzerland", title: "Learn Quran Online in Switzerland | Alhamd Academy", description: "Online Quran classes for Muslims in Switzerland. Free trial.", keywords: "learn quran online switzerland, quran classes switzerland" },
  { path: "/learn-quran-online-ireland", name: "Learn Quran Online - Ireland", title: "Learn Quran Online in Ireland | Alhamd Academy", description: "Online Quran classes for Muslims in Ireland. Free trial.", keywords: "learn quran online ireland, quran classes ireland" },
  // Location pages — US Cities
  { path: "/learn-quran-online-new-york", name: "Learn Quran Online - New York", title: "Learn Quran Online in New York | Alhamd Academy", description: "Online Quran classes for Muslims in New York. One-on-one with Al-Azhar teachers. Free trial.", keywords: "quran classes new york, learn quran new york" },
  { path: "/learn-quran-online-los-angeles", name: "Learn Quran Online - Los Angeles", title: "Learn Quran Online in Los Angeles | Alhamd Academy", description: "Online Quran classes in Los Angeles. Certified teachers. Free trial.", keywords: "quran classes los angeles, learn quran la" },
  { path: "/learn-quran-online-chicago", name: "Learn Quran Online - Chicago", title: "Learn Quran Online in Chicago | Alhamd Academy", description: "Online Quran classes in Chicago. Certified teachers. Free trial.", keywords: "quran classes chicago, learn quran chicago" },
  { path: "/learn-quran-online-houston", name: "Learn Quran Online - Houston", title: "Learn Quran Online in Houston | Alhamd Academy", description: "Online Quran classes in Houston. Free trial.", keywords: "quran classes houston, learn quran houston" },
  { path: "/learn-quran-online-dallas", name: "Learn Quran Online - Dallas", title: "Learn Quran Online in Dallas | Alhamd Academy", description: "Online Quran classes in Dallas. Free trial.", keywords: "quran classes dallas, learn quran dallas" },
  { path: "/learn-quran-online-san-francisco", name: "Learn Quran Online - San Francisco", title: "Learn Quran Online in San Francisco | Alhamd Academy", description: "Online Quran classes in San Francisco. Free trial.", keywords: "quran classes san francisco, learn quran sf" },
  { path: "/learn-quran-online-miami", name: "Learn Quran Online - Miami", title: "Learn Quran Online in Miami | Alhamd Academy", description: "Online Quran classes in Miami. Free trial.", keywords: "quran classes miami, learn quran miami" },
  { path: "/learn-quran-online-seattle", name: "Learn Quran Online - Seattle", title: "Learn Quran Online in Seattle | Alhamd Academy", description: "Online Quran classes in Seattle. Free trial.", keywords: "quran classes seattle, learn quran seattle" },
  { path: "/learn-quran-online-boston", name: "Learn Quran Online - Boston", title: "Learn Quran Online in Boston | Alhamd Academy", description: "Online Quran classes in Boston. Free trial.", keywords: "quran classes boston, learn quran boston" },
  { path: "/learn-quran-online-washington-dc", name: "Learn Quran Online - Washington DC", title: "Learn Quran Online in Washington DC | Alhamd Academy", description: "Online Quran classes in Washington DC. Free trial.", keywords: "quran classes washington dc, learn quran dc" },
  // Location pages — Canada Cities
  { path: "/learn-quran-online-toronto", name: "Learn Quran Online - Toronto", title: "Learn Quran Online in Toronto | Alhamd Academy", description: "Online Quran classes in Toronto. Free trial.", keywords: "quran classes toronto, learn quran toronto" },
  { path: "/learn-quran-online-vancouver", name: "Learn Quran Online - Vancouver", title: "Learn Quran Online in Vancouver | Alhamd Academy", description: "Online Quran classes in Vancouver. Free trial.", keywords: "quran classes vancouver, learn quran vancouver" },
  { path: "/learn-quran-online-montreal", name: "Learn Quran Online - Montreal", title: "Learn Quran Online in Montreal | Alhamd Academy", description: "Online Quran classes in Montreal. Free trial.", keywords: "quran classes montreal, learn quran montreal" },
  { path: "/learn-quran-online-calgary", name: "Learn Quran Online - Calgary", title: "Learn Quran Online in Calgary | Alhamd Academy", description: "Online Quran classes in Calgary. Free trial.", keywords: "quran classes calgary, learn quran calgary" },
  { path: "/learn-quran-online-ottawa", name: "Learn Quran Online - Ottawa", title: "Learn Quran Online in Ottawa | Alhamd Academy", description: "Online Quran classes in Ottawa. Free trial.", keywords: "quran classes ottawa, learn quran ottawa" },
  // Location pages — UK Cities
  { path: "/learn-quran-online-london", name: "Learn Quran Online - London", title: "Learn Quran Online in London | Alhamd Academy", description: "Online Quran classes in London. Al-Azhar certified teachers. Free trial.", keywords: "quran classes london, learn quran london" },
  { path: "/learn-quran-online-manchester", name: "Learn Quran Online - Manchester", title: "Learn Quran Online in Manchester | Alhamd Academy", description: "Online Quran classes in Manchester. Free trial.", keywords: "quran classes manchester, learn quran manchester" },
  { path: "/learn-quran-online-birmingham", name: "Learn Quran Online - Birmingham", title: "Learn Quran Online in Birmingham | Alhamd Academy", description: "Online Quran classes in Birmingham. Free trial.", keywords: "quran classes birmingham, learn quran birmingham" },
  { path: "/learn-quran-online-leeds", name: "Learn Quran Online - Leeds", title: "Learn Quran Online in Leeds | Alhamd Academy", description: "Online Quran classes in Leeds. Free trial.", keywords: "quran classes leeds, learn quran leeds" },
  { path: "/learn-quran-online-glasgow", name: "Learn Quran Online - Glasgow", title: "Learn Quran Online in Glasgow | Alhamd Academy", description: "Online Quran classes in Glasgow. Free trial.", keywords: "quran classes glasgow, learn quran glasgow" },
  // Location pages — Europe Cities
  { path: "/learn-quran-online-berlin", name: "Learn Quran Online - Berlin", title: "Learn Quran Online in Berlin | Alhamd Academy", description: "Online Quran classes in Berlin. Free trial.", keywords: "quran classes berlin, learn quran berlin" },
  { path: "/learn-quran-online-paris", name: "Learn Quran Online - Paris", title: "Learn Quran Online in Paris | Alhamd Academy", description: "Online Quran classes in Paris. Free trial.", keywords: "quran classes paris, learn quran paris" },
  { path: "/learn-quran-online-amsterdam", name: "Learn Quran Online - Amsterdam", title: "Learn Quran Online in Amsterdam | Alhamd Academy", description: "Online Quran classes in Amsterdam. Free trial.", keywords: "quran classes amsterdam, learn quran amsterdam" },
  { path: "/learn-quran-online-stockholm", name: "Learn Quran Online - Stockholm", title: "Learn Quran Online in Stockholm | Alhamd Academy", description: "Online Quran classes in Stockholm. Free trial.", keywords: "quran classes stockholm, learn quran stockholm" },
  { path: "/learn-quran-online-oslo", name: "Learn Quran Online - Oslo", title: "Learn Quran Online in Oslo | Alhamd Academy", description: "Online Quran classes in Oslo. Free trial.", keywords: "quran classes oslo, learn quran oslo" },
  { path: "/learn-quran-online-zurich", name: "Learn Quran Online - Zurich", title: "Learn Quran Online in Zurich | Alhamd Academy", description: "Online Quran classes in Zurich. Free trial.", keywords: "quran classes zurich, learn quran zurich" },
  { path: "/learn-quran-online-brussels", name: "Learn Quran Online - Brussels", title: "Learn Quran Online in Brussels | Alhamd Academy", description: "Online Quran classes in Brussels. Free trial.", keywords: "quran classes brussels, learn quran brussels" },
  { path: "/learn-quran-online-dublin", name: "Learn Quran Online - Dublin", title: "Learn Quran Online in Dublin | Alhamd Academy", description: "Online Quran classes in Dublin. Free trial.", keywords: "quran classes dublin, learn quran dublin" },
];

const SeoManagement = () => {
  const [entries, setEntries] = useState<SeoEntry[]>([]);
  const [editing, setEditing] = useState<Partial<SeoEntry> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<SeoEntry | null>(null);
  const { user, isAdmin } = useAuth();
  const { t, lang } = useAdminLang();
  const { toast } = useToast();

  const fetchEntries = async () => {
    setIsFetching(true);
    try {
      const data = await safeDataRequest<SeoEntry[]>({
        fallback: [],
        markGlobalFallbackOnError: false,
        request: async (signal) => {
          const { data, error } = await supabase.from("seo_metadata").select("*").order("page_path").abortSignal(signal);
          if (error) throw error;
          return data ?? [];
        },
      });
      setEntries(data);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSave = async () => {
    if (!editing?.page_path || !editing.page_name) { toast({ title: t("err.error"), description: "Page path and name are required", variant: "destructive" }); return; }
    let structuredData = editing.structured_data;
    if (typeof structuredData === "string" && structuredData.trim()) {
      try { structuredData = JSON.parse(structuredData); } catch { toast({ title: t("err.error"), description: "Invalid JSON", variant: "destructive" }); return; }
    }
    setIsSaving(true);
    try {
      const payload = { ...editing, structured_data: structuredData, updated_by: user?.id } as Record<string, unknown>;
      if (isNew) {
        const { error } = await supabase.from("seo_metadata").insert(payload as never);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      } else {
        const { error } = await supabase.from("seo_metadata").update(payload as never).eq("id", editing.id!);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      }
      toast({ title: t("ok.done") }); setEditing(null); void fetchEntries();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (entry: SeoEntry) => {
    try {
      const { error } = await supabase.from("seo_metadata").delete().eq("id", entry.id);
      if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      toast({ title: t("ok.deleted") }); void fetchEntries();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  const handleInitialize = async () => {
    const existingMap = new Map(entries.map(e => [e.page_path, e]));
    const toInsert: any[] = [];
    const toUpdate: { id: string; data: any }[] = [];

    for (const p of SITE_PAGES) {
      const existing = existingMap.get(p.path);
      if (!existing) {
        toInsert.push({
          page_path: p.path, page_name: p.name,
          title: p.title || null, description: p.description || null,
          keywords: p.keywords || null,
          canonical_url: `https://alhamdacademy.net${p.path === '/' ? '/' : p.path}`,
          updated_by: user?.id,
        });
      } else if (!existing.title && p.title) {
        toUpdate.push({
          id: existing.id,
          data: {
            title: p.title, description: p.description || existing.description,
            keywords: p.keywords || existing.keywords,
            canonical_url: existing.canonical_url || `https://alhamdacademy.net${p.path === '/' ? '/' : p.path}`,
            updated_by: user?.id,
          },
        });
      }
    }

    if (toInsert.length === 0 && toUpdate.length === 0) {
      toast({ title: t("ok.done"), description: lang === "ar" ? "جميع الصفحات مهيأة بالفعل" : "All pages already initialized" });
      return;
    }

    try {
      if (toInsert.length > 0) {
        const { error } = await supabase.from("seo_metadata").insert(toInsert);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      }
      for (const item of toUpdate) {
        const { error } = await supabase.from("seo_metadata").update(item.data).eq("id", item.id);
        if (error) { toast({ title: t("err.error"), description: error.message, variant: "destructive" }); return; }
      }
      toast({ title: t("ok.done"), description: `Added ${toInsert.length}, updated ${toUpdate.length} pages` });
      void fetchEntries();
    } catch {
      toast({ title: t("err.error"), description: "Request timed out. Please try again.", variant: "destructive" });
    }
  };

  const filtered = entries.filter(e => e.page_name.toLowerCase().includes(filter.toLowerCase()) || e.page_path.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("seo.title")}</h1>
          <p className="text-muted-foreground">{t("seo.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleInitialize}>{t("seo.init")}</Button>
          <Button onClick={() => { setEditing({ ...defaultEntry }); setIsNew(true); }}><Plus className="h-4 w-4 me-1" /> {t("seo.add")}</Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder={t("seo.search")} value={filter} onChange={e => setFilter(e.target.value)} className="ps-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("seo.col.page")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("seo.col.path")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("seo.col.title")}</TableHead>
                <TableHead className="hidden md:table-cell">{lang === "ar" ? "آخر تعديل" : "Last Updated"}</TableHead>
                <TableHead className="w-24">{t("seo.col.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <LoadingSpinner label={lang === "ar" ? "جاري التحميل..." : "Loading..."} />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t("seo.empty")}</TableCell></TableRow>
              ) : filtered.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.page_name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{entry.page_path}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm truncate max-w-[200px]">{entry.title || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {entry.updated_at ? new Date(entry.updated_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(entry); setIsNew(false); }}><Pencil className="h-4 w-4" /></Button>
                      {isAdmin && <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(entry)}><Trash2 className="h-4 w-4" /></Button>}
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
        title={lang === "ar" ? "حذف إعدادات السيو؟" : "Delete SEO Entry?"}
        description={lang === "ar" ? "سيتم حذف إعدادات السيو لهذه الصفحة نهائياً." : "SEO settings for this page will be permanently deleted."}
        confirmLabel={t("ok.deleted")}
        cancelLabel={t("seo.cancel")}
      />

      <Dialog open={!!editing} onOpenChange={open => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isNew ? t("seo.add") : `${editing?.page_name}`}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Page Path</Label><Input value={editing.page_path || ""} onChange={e => setEditing({ ...editing, page_path: e.target.value })} disabled={!isNew} dir="ltr" /></div>
                <div className="space-y-2"><Label>Page Name</Label><Input value={editing.page_name || ""} onChange={e => setEditing({ ...editing, page_name: e.target.value })} /></div>
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">Basic SEO</h3>
              <div className="space-y-2"><Label>Page Title</Label><Input value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /><p className="text-xs text-muted-foreground">{(editing.title || "").length}/60 characters</p></div>
              <div className="space-y-2"><Label>Meta Description</Label><Textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} /><p className="text-xs text-muted-foreground">{(editing.description || "").length}/160 characters</p></div>
              <div className="space-y-2"><Label>Keywords</Label><Input value={editing.keywords || ""} onChange={e => setEditing({ ...editing, keywords: e.target.value })} /></div>
              <div className="space-y-2"><Label>Canonical URL</Label><Input value={editing.canonical_url || ""} onChange={e => setEditing({ ...editing, canonical_url: e.target.value })} dir="ltr" /></div>
              <div className="flex items-center gap-2"><Switch checked={editing.no_index || false} onCheckedChange={v => setEditing({ ...editing, no_index: v })} /><Label>No Index</Label></div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">OpenGraph</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>OG Title</Label><Input value={editing.og_title || ""} onChange={e => setEditing({ ...editing, og_title: e.target.value })} /></div>
                <div className="space-y-2"><Label>OG Type</Label><Input value={editing.og_type || ""} onChange={e => setEditing({ ...editing, og_type: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>OG Description</Label><Textarea value={editing.og_description || ""} onChange={e => setEditing({ ...editing, og_description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>OG Image URL</Label><Input value={editing.og_image || ""} onChange={e => setEditing({ ...editing, og_image: e.target.value })} dir="ltr" /></div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">Twitter Card</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Twitter Title</Label><Input value={editing.twitter_title || ""} onChange={e => setEditing({ ...editing, twitter_title: e.target.value })} /></div>
                <div className="space-y-2"><Label>Card Type</Label><Input value={editing.twitter_card || ""} onChange={e => setEditing({ ...editing, twitter_card: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Twitter Description</Label><Textarea value={editing.twitter_description || ""} onChange={e => setEditing({ ...editing, twitter_description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Twitter Image URL</Label><Input value={editing.twitter_image || ""} onChange={e => setEditing({ ...editing, twitter_image: e.target.value })} dir="ltr" /></div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide pt-2">Structured Data (JSON-LD)</h3>
              <Textarea value={typeof editing.structured_data === "string" ? editing.structured_data : JSON.stringify(editing.structured_data, null, 2) || ""} onChange={e => setEditing({ ...editing, structured_data: e.target.value })} rows={6} className="font-mono text-xs" dir="ltr" />
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} className="flex-1" disabled={isSaving}>
                  {isSaving ? <><LoadingSpinner size="sm" className="inline-flex me-1" />{t("login.loading")}</> : t("seo.save")}
                </Button>
                <Button variant="outline" onClick={() => setEditing(null)}>{t("seo.cancel")}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeoManagement;
