import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminLang } from "@/contexts/AdminLangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [allowRender, setAllowRender] = useState(false);
  const { signIn, user, role, loading } = useAuth();
  const { t, lang, toggleLang } = useAdminLang();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timeout = window.setTimeout(() => setAllowRender(true), 3200);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading && user && role) {
      navigate("/admin", { replace: true });
    }
  }, [loading, user, role, navigate]);

  if (loading && !allowRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user && role) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: t("login.failed"), description: t("login.failed_desc"), variant: "destructive" });
    } else {
      navigate("/admin");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="absolute top-4 end-4">
        <Button variant="outline" size="sm" onClick={toggleLang} className="gap-2 text-xs">
          <Globe className="h-3.5 w-3.5" />
          {lang === "ar" ? "English" : "العربية"}
        </Button>
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/favicon-48.png" alt="Alhamd Academy" className="h-16 w-16 mx-auto rounded-2xl shadow-lg mb-4" loading="lazy" decoding="async" />
          <h1 className="text-xl font-bold text-foreground">Alhamd Academy</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("login.panel")}</p>
        </div>

        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">{t("login.title")}</CardTitle>
            <CardDescription className="text-center">{t("login.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("login.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required dir="ltr" />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={submitting}>
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("login.loading")}</> : t("login.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">© {new Date().getFullYear()} Alhamd Academy</p>
      </div>
    </div>
  );
};

export default AdminLogin;
