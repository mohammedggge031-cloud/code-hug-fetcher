import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Loader2, Globe, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const preloadAdminShell = async () => {
  await Promise.all([
    import("@/components/admin/ProtectedRoute"),
    import("@/components/admin/AdminLayout"),
    import("@/components/admin/AdminErrorBoundary"),
    import("@/pages/admin/AdminControlCenter"),
  ]);
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [allowRender, setAllowRender] = useState(false);
  const { signIn, user, role, loading } = useAuth();
  const { t, lang, toggleLang } = useAdminLang();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setAllowRender(true);
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = "Admin";
    return () => {
      meta.remove();
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    void preloadAdminShell().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!loading && user && role) {
      navigate("/admin", { replace: true });
    }
  }, [loading, user, role, navigate]);

  if ((loading || redirecting) && !allowRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user && role) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setRedirecting(false);

    const preloadPromise = preloadAdminShell().catch(() => undefined);
    const { error } = await signIn(email, password);

    if (error) {
      toast({ title: t("login.failed"), description: t("login.failed_desc"), variant: "destructive" });
      setRedirecting(false);
    } else {
      setRedirecting(true);
      await preloadPromise;
    }

    setSubmitting(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: t("err.error"), description: t("err.email_required"), variant: "destructive" });
      return;
    }
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });
      if (error) {
        toast({ title: t("login.reset_error"), description: error.message, variant: "destructive" });
      } else {
        toast({ title: t("login.reset_sent"), description: t("login.reset_sent_desc") });
      }
    } catch {
      toast({ title: t("login.reset_error"), description: "Request failed", variant: "destructive" });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />

      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="absolute -top-32 -end-32 w-96 h-96 rounded-full opacity-10" style={{ background: "var(--gold-gradient)" }} />
      <div className="absolute -bottom-24 -start-24 w-72 h-72 rounded-full opacity-[0.07]" style={{ background: "var(--gold-gradient)" }} />

      <div className="absolute top-5 end-5 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLang}
          className="gap-2 text-xs text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 border border-white/10"
        >
          <Globe className="h-3.5 w-3.5" />
          {lang === "ar" ? "English" : "العربية"}
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-5 shadow-xl bg-white overflow-hidden">
            <img src="/logo-admin.webp" alt="Alhamd Academy" className="w-full h-full object-cover scale-110" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground tracking-tight">
            Alhamd Academy
          </h1>
          <p className="text-sm text-primary-foreground/50 mt-1.5">{t("login.panel")}</p>
        </div>

        <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          <div className="h-1" style={{ background: "var(--gold-gradient)" }} />

          <div className="p-8">
            <div className="text-center mb-7">
              <h2 className="text-lg font-semibold text-foreground">{t("login.title")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("login.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t("login.email")}
                </Label>
                <div className="relative">
                  <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="ps-11 h-11 bg-muted/40 border-border/60 focus:bg-background transition-colors"
                    placeholder="email@example.com"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    {t("login.password")}
                  </Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading || submitting || redirecting}
                    className="text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                  >
                    {resetLoading ? <Loader2 className="h-3 w-3 animate-spin inline" /> : t("login.forgot")}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="ps-11 pe-11 h-11 bg-muted/40 border-border/60 focus:bg-background transition-colors"
                    placeholder="••••••••"
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={submitting || redirecting}
              >
                {submitting || redirecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("login.loading")}
                  </>
                ) : (
                  t("login.submit")
                )}
              </Button>
            </form>
          </div>
        </div>

        <p className="text-xs text-center text-primary-foreground/30 mt-6">
          © {new Date().getFullYear()} Alhamd Academy — All rights reserved
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
