import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Code, FileText, FolderOpen, Image, Inbox, Megaphone, Search, Shield, Target, Users, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { loadAdminConfig } from "@/lib/adminConfig";

type Stats = {
  blog: number;
  categories: number;
  media: number;
  seo: number;
  scripts: number;
  users: number;
  leads: number;
  social: number;
  videos: number;
  ads: number;
};

const defaultStats: Stats = { blog: 0, categories: 0, media: 0, seo: 0, scripts: 0, users: 0, leads: 0, social: 0, videos: 0, ads: 0 };

const AdminControlCenter = () => {
  const navigate = useNavigate();
  const { lang } = useAdminLang();
  const { isAdmin, isOwner, can } = useAuth();
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const [seo, scripts, users, posts, media, categories, leads, social, videoLib, ads] = await Promise.all([
          supabase.from("seo_metadata").select("id", { count: "exact", head: true }),
          supabase.from("custom_scripts").select("id", { count: "exact", head: true }),
          supabase.from("user_roles").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("media_assets").select("id", { count: "exact", head: true }),
          supabase.from("blog_categories").select("id", { count: "exact", head: true }),
          loadAdminConfig<Array<unknown>>("lead_channels", []),
          loadAdminConfig<Array<unknown>>("social_profiles", []),
          loadAdminConfig<Array<unknown>>("video_library", []),
          loadAdminConfig<Array<unknown>>("ad_campaigns", []),
        ]);

        if (!mounted) return;
        setStats({
          blog: posts.count ?? 0,
          categories: categories.count ?? 0,
          media: media.count ?? 0,
          seo: seo.count ?? 0,
          scripts: scripts.count ?? 0,
          users: users.count ?? 0,
          leads: leads.length,
          social: social.length,
          videos: Array.isArray(videoLib) ? videoLib.length : 0,
          ads: ads.length,
        });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void run();
    return () => { mounted = false; };
  }, []);

  const copy = useMemo(() => lang === "ar" ? {
    title: "مركز التحكم",
    subtitle: "لوحة إدارة جديدة تعرض الوحدات الحقيقية المركبة في النظام.",
    growth: "النمو والتحويل",
    content: "المحتوى والمكتبة",
    search: "الظهور والهوية",
    access: "الوصول والصلاحيات",
    overview: "الوحدات المركبة الآن",
    note: "كل بطاقة هنا مرتبطة بمسار حقيقي داخل لوحة الإدارة — لا توجد وحدات وهمية.",
    leads: "العملاء المحتملون",
    social: "السوشيال",
    blog: "المقالات",
    categories: "التصنيفات",
    media: "الوسائط",
    seo: "السيو",
    scripts: "السكربتات",
    videos: "الفيديوهات",
    users: "الفريق",
  } : {
    title: "Control Center",
    subtitle: "New mounted admin home with the real modules wired into the router.",
    growth: "Growth & Conversion",
    content: "Content & Library",
    search: "Search & Brand",
    access: "Access & Permissions",
    overview: "Mounted modules",
    note: "Every card here links to a real admin route — no phantom modules.",
    leads: "Leads",
    social: "Social",
    blog: "Blog",
    categories: "Categories",
    media: "Media",
    seo: "SEO",
    scripts: "Scripts",
    videos: "Videos",
    users: "Team",
  }, [lang]);

  const modules = [
    { key: "leads", label: copy.leads, value: stats.leads, icon: Inbox, to: "/admin/leads", show: can("can_manage_leads") || isAdmin },
    { key: "social", label: copy.social, value: stats.social, icon: Megaphone, to: "/admin/social", show: can("can_manage_social") || isAdmin },
    { key: "blog", label: copy.blog, value: stats.blog, icon: FileText, to: "/admin/blog", show: can("can_manage_blog") || isAdmin },
    { key: "categories", label: copy.categories, value: stats.categories, icon: FolderOpen, to: "/admin/categories", show: can("can_manage_blog") || isAdmin },
    { key: "media", label: copy.media, value: stats.media, icon: Image, to: "/admin/media", show: can("can_manage_media") || isAdmin },
    { key: "seo", label: copy.seo, value: stats.seo, icon: Search, to: "/admin/seo", show: can("can_manage_seo") || isAdmin },
    { key: "scripts", label: copy.scripts, value: stats.scripts, icon: Code, to: "/admin/scripts", show: can("can_manage_scripts") || isAdmin },
    { key: "videos", label: copy.videos, value: stats.scripts, icon: Video, to: "/admin/videos", show: can("can_manage_videos") || isAdmin },
    { key: "users", label: copy.users, value: stats.users, icon: Users, to: "/admin/users", show: can("can_manage_users") || isAdmin || isOwner },
  ].filter((item) => item.show);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 gap-2"><Shield className="h-3.5 w-3.5" /> {copy.overview}</Badge>
          <h1 className="text-3xl font-bold text-foreground">{copy.title}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{copy.subtitle}</p>
        </div>
        <Card className="w-full lg:w-auto">
          <CardContent className="flex items-center gap-3 p-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">{copy.note}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx}><CardContent className="space-y-3 p-5"><Skeleton className="h-5 w-24" /><Skeleton className="h-9 w-16" /><Skeleton className="h-4 w-full" /></CardContent></Card>
        )) : modules.map((module) => (
          <Card key={module.key} className="cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md" onClick={() => navigate(module.to)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">{module.label}</CardTitle>
              <module.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{module.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{module.to}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card><CardHeader><CardTitle className="text-lg">{copy.growth}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>{copy.leads} · /admin/leads</p><p>{copy.social} · /admin/social</p><p>{copy.scripts} · /admin/scripts</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">{copy.content}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>{copy.blog} · /admin/blog</p><p>{copy.categories} · /admin/categories</p><p>{copy.media} · /admin/media</p><p>{copy.videos} · /admin/videos</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">{copy.search}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>{copy.seo} · /admin/seo</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">{copy.access}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>{copy.users} · /admin/users</p></CardContent></Card>
      </div>
    </div>
  );
};

export default AdminControlCenter;