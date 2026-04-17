import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Search, Code, Users, FileText, Image, FolderOpen, ArrowUpRight, Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { useNavigate, useLocation } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import { loadAdminConfig } from "@/lib/adminConfig";
import { ensureAdminSeed } from "@/lib/adminSeed";

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
  const { isAdmin, isOwner, can } = useAuth();
  const { t } = useAdminLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ seoPages: 0, scripts: 0, users: 0, posts: 0, media: 0, categories: 0, videos: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        await ensureAdminSeed();
        const [seo, scriptsRes, usersRes, postsRes, mediaRes, catsRes, videoLib, leadLog] = await Promise.all([
          supabase.from("seo_metadata").select("id", { count: "exact", head: true }),
          supabase.from("custom_scripts").select("id", { count: "exact", head: true }),
          supabase.from("user_roles").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("media_assets").select("id", { count: "exact", head: true }),
          supabase.from("blog_categories").select("id", { count: "exact", head: true }),
          loadAdminConfig<unknown[]>("video_library", []),
          loadAdminConfig<unknown[]>("lead_log", []),
        ]);
        if (cancelled) return;
        setStats({
          seoPages: seo.count ?? 0,
          scripts: scriptsRes.count ?? 0,
          users: usersRes.count ?? 0,
          posts: postsRes.count ?? 0,
          media: mediaRes.count ?? 0,
          categories: catsRes.count ?? 0,
          videos: Array.isArray(videoLib) ? videoLib.length : 0,
          leads: Array.isArray(leadLog) ? leadLog.length : 0,
        });
      } catch {
        // silently use defaults
      }
      if (!cancelled) setLoading(false);
    };
    fetchStats();
    return () => { cancelled = true; };
  }, [location.key]);

  const websiteCards = [
    ...(can("can_manage_blog") || isAdmin ? [
      { title: t("dash.posts"), value: stats.posts, icon: FileText, desc: t("dash.posts.desc"), href: "/admin/blog", color: "text-blue-600 bg-blue-500/10" },
      { title: t("dash.categories"), value: stats.categories, icon: FolderOpen, desc: t("dash.categories.desc"), href: "/admin/categories", color: "text-orange-600 bg-orange-500/10" },
    ] : []),
    ...(can("can_manage_media") || isAdmin ? [
      { title: t("dash.media"), value: stats.media, icon: Image, desc: t("dash.media.desc"), href: "/admin/media", color: "text-violet-600 bg-violet-500/10" },
    ] : []),
    ...(can("can_manage_videos") || isAdmin ? [
      { title: t("dash.videos"), value: stats.videos, icon: Video, desc: t("dash.videos.desc"), href: "/admin/videos", color: "text-pink-600 bg-pink-500/10" },
    ] : []),
    ...(can("can_manage_seo") || isAdmin ? [
      { title: t("dash.seo"), value: stats.seoPages, icon: Search, desc: t("dash.seo.desc"), href: "/admin/seo", color: "text-emerald-600 bg-emerald-500/10" },
    ] : []),
    ...(can("can_manage_scripts") || isAdmin ? [
      { title: t("dash.scripts"), value: stats.scripts, icon: Code, desc: t("dash.scripts.desc"), href: "/admin/scripts", color: "text-rose-600 bg-rose-500/10" },
    ] : []),
  ];

  const marketingCards = [
    ...(can("can_manage_leads") || isAdmin ? [
      { title: "Leads", value: stats.leads, icon: FileText, desc: "Captured form submissions", href: "/admin/leads", color: "text-cyan-600 bg-cyan-500/10" },
    ] : []),
    ...(can("can_manage_social") || isAdmin ? [
      { title: "Social", value: 0, icon: FileText, desc: "Social tracking & reports", href: "/admin/social", color: "text-fuchsia-600 bg-fuchsia-500/10" },
    ] : []),
    ...(can("can_manage_leads") || can("can_manage_social") || isAdmin ? [
      { title: "Ads Tracking", value: 0, icon: FileText, desc: "UTM & campaign sources", href: "/admin/ads", color: "text-amber-600 bg-amber-500/10" },
    ] : []),
  ];

  const accessCards = [
    ...(isOwner || can("can_manage_users") ? [
      { title: t("dash.team"), value: stats.users, icon: Users, desc: t("dash.team.desc"), href: "/admin/users", color: "text-indigo-600 bg-indigo-500/10" },
    ] : []),
  ];

  const sections = [
    { label: "Website Management", cards: websiteCards },
    { label: "Marketing & Ads", cards: marketingCards },
    { label: "Users & Access", cards: accessCards },
  ].filter(s => s.cards.length > 0);

  const renderCard = (card: typeof websiteCards[number]) => (
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
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("dash.title")}</h1>
        <p className="text-muted-foreground">{t("dash.subtitle")}</p>
      </div>

      {loading ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        sections.map(section => (
          <section key={section.label} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{section.label}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {section.cards.map(renderCard)}
            </div>
          </section>
        ))
      )}

      <Card>
        <CardHeader><CardTitle className="text-lg">{t("dash.guide")}</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {(can("can_manage_blog") || isAdmin) && <p>📝 <strong className="text-foreground">{t("dash.posts")}</strong> — {t("dash.guide.posts")}</p>}
          {(can("can_manage_seo") || isAdmin) && <p>🔍 <strong className="text-foreground">{t("dash.seo")}</strong> — {t("dash.guide.seo")}</p>}
          {(can("can_manage_media") || isAdmin) && <p>🖼️ <strong className="text-foreground">{t("dash.media")}</strong> — {t("dash.guide.media")}</p>}
          {(can("can_manage_scripts") || isAdmin) && <p>📊 <strong className="text-foreground">{t("dash.scripts")}</strong> — {t("dash.guide.scripts")}</p>}
          {(can("can_manage_videos") || isAdmin) && <p>🎬 <strong className="text-foreground">{t("dash.videos")}</strong> — {t("dash.guide.videos")}</p>}
          {isOwner && <p>👥 <strong className="text-foreground">{t("dash.team")}</strong> — {t("dash.guide.team")}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
