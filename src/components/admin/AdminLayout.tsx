import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Search, Users, Code, LogOut, Menu, X, FileText, Image, FolderOpen, Globe, KeyRound, Video } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChangePasswordDialog from "@/components/admin/ChangePasswordDialog";

const AdminLayout = () => {
  const { user, role, signOut, isAdmin } = useAuth();
  const { t, lang, toggleLang, dir } = useAdminLang();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: t("nav.dashboard"), end: true },
    { to: "/admin/blog", icon: FileText, label: t("nav.posts"), end: false },
    { to: "/admin/categories", icon: FolderOpen, label: t("nav.categories"), end: false },
    { to: "/admin/media", icon: Image, label: t("nav.media"), end: false },
    { to: "/admin/seo", icon: Search, label: t("nav.seo"), end: false },
    { to: "/admin/scripts", icon: Code, label: t("nav.scripts"), end: false },
    { to: "/admin/videos", icon: Video, label: t("nav.videos"), adminOnly: true, end: false },
    { to: "/admin/users", icon: Users, label: t("nav.team"), adminOnly: true, end: false },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const filteredItems = navItems.filter(item => !item.adminOnly || isAdmin);

  const getInitials = (email?: string) => {
    if (!email) return "??";
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  const getRoleLabel = (r: string | null) => {
    if (r === "admin") return t("nav.role.admin");
    if (r === "editor") return t("nav.role.editor");
    return "";
  };

  return (
    <div className="min-h-screen flex bg-background" dir={dir}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 z-50 h-screen w-64 bg-sidebar-background flex flex-col transition-transform lg:translate-x-0",
        dir === "rtl" ? "right-0 border-l border-sidebar-border" : "left-0 border-r border-sidebar-border",
        dir === "rtl"
          ? (sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0")
          : (sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
      )}>
        <div className="p-4 border-b flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-admin.webp" alt="Alhamd Academy" className="h-10 w-10 object-contain rounded-lg" loading="eager" decoding="async" />
            <div>
              <h1 className="font-bold text-base text-sidebar-foreground">Alhamd Academy</h1>
              <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {filteredItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {getInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground truncate flex-1">{user?.email}</p>
          </div>
          {isAdmin && (
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" onClick={() => setShowChangePassword(true)}>
              <KeyRound className="h-4 w-4" /> {t("pwd.change")}
            </Button>
          )}
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> {t("nav.signout")}
          </Button>
          {isAdmin && <ChangePasswordDialog open={showChangePassword} onOpenChange={setShowChangePassword} />}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 h-14 bg-background/95 backdrop-blur border-b flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground ms-2">{t("nav.welcome")}</span>
          </div>
          <Button variant="outline" size="sm" onClick={toggleLang} className="gap-2 text-xs font-medium">
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
