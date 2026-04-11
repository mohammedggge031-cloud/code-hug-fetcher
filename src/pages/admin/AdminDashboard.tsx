import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Search, Code, Users, FileText, Image, FolderOpen, ArrowUpRight, Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { useNavigate, useLocation } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";

const StatCardSkeleton = () => (
  <Card className="transition-all">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <Skeleton className="h-10 w-10 rounded-xl" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-3 w-32" />
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { role } = useAuth();
  const { t } = useAdminLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ seoPages: 0, scripts: 0, users: 0, posts: 0, media: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const results = await Promise.all([
          supabase.from("seo_metadata").select("id", { count: "exact", head: true }),
          supabase.from("custom_scripts").select("id", { count: "exact", head: true }),
          supabase.from("user_roles").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("media_assets").select("id", { count: "exact", head: true }),
          supabase.from("blog_categories").select("id", { count: "exact", head: true }),
        ]);
        if (cancelled) return;
        setStats({
          seoPages: results[0].count ?? 0,
          scripts: results[1].count ?? 0,
          users: results[2].count ?? 0,
          posts: results[3].count ?? 0,
          media: results[4].count ?? 0,
          categories: results[5].count ?? 0,
        });
      } catch {
        // silently use defaults
      }
      if (!cancelled) setLoading(false);
    };
    fetchStats();
    return () => { cancelled = true; };
  }, [location.key]);

  const cards = [
    { title: t("dash.posts"), value: stats.posts, icon: FileText, desc: t("dash.posts.desc"), href: "/admin/blog", color: "text-blue-600 bg-blue-500/10" },
    { title: t("dash.seo"), value: stats.seoPages, icon: Search, desc: t("dash.seo.desc"), href: "/admin/seo", color: "text-emerald-600 bg-emerald-500/10" },
    { title: t("dash.media"), value: stats.media, icon: Image, desc: t("dash.media.desc"), href: "/admin/media", color: "text-violet-600 bg-violet-500/10" },
    { title: t("dash.categories"), value: stats.categories, icon: FolderOpen, desc: t("dash.categories.desc"), href: "/admin/categories", color: "text-orange-600 bg-orange-500/10" },
    { title: t("dash.scripts"), value: stats.scripts, icon: Code, desc: t("dash.scripts.desc"), href: "/admin/scripts", color: "text-rose-600 bg-rose-500/10" },
    ...(role === "admin" ? [
      { title: t("dash.videos"), value: 0, icon: Video, desc: t("dash.videos.desc"), href: "/admin/videos", color: "text-pink-600 bg-pink-500/10" },
      { title: t("dash.team"), value: stats.users, icon: Users, desc: t("dash.team.desc"), href: "/admin/users", color: "text-amber-600 bg-amber-500/10" },
    ] : []),
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("dash.title")}</h1>
        <p className="text-muted-foreground">{t("dash.subtitle")}</p>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: role === "admin" ? 7 : 5 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          cards.map(card => (
            <Card key={card.href} className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5" onClick={() => navigate(card.href)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className={`p-2.5 rounded-xl ${card.color}`}><card.icon className="h-5 w-5" /></div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight tabular-nums">{card.value}</div>
                <p className="text-sm font-medium text-foreground mt-1">{card.title}</p>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">{t("dash.guide")}</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>📝 <strong className="text-foreground">{t("dash.posts")}</strong> — {t("dash.guide.posts")}</p>
          <p>🔍 <strong className="text-foreground">{t("dash.seo")}</strong> — {t("dash.guide.seo")}</p>
          <p>🖼️ <strong className="text-foreground">{t("dash.media")}</strong> — {t("dash.guide.media")}</p>
          <p>📊 <strong className="text-foreground">{t("dash.scripts")}</strong> — {t("dash.guide.scripts")}</p>
          {role === "admin" && <p>👥 <strong className="text-foreground">{t("dash.team")}</strong> — {t("dash.guide.team")}</p>}
          {role === "admin" && <p>🎬 <strong className="text-foreground">{t("dash.videos")}</strong> — {t("dash.guide.videos")}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
