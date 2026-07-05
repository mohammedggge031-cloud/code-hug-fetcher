import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { safeDataRequest, isGlobalFallbackMode } from "@/lib/safeRuntimeData";
import { Calendar, User, ArrowRight, ArrowLeft, Home, ChevronLeft, ChevronRight } from "lucide-react";

interface AuthorPost {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
  author: string | null;
}

const decodeAuthorParam = (raw: string | undefined) => {
  if (!raw) return "";
  try {
    return decodeURIComponent(raw).replace(/-/g, " ").trim();
  } catch {
    return raw.replace(/-/g, " ").trim();
  }
};

const AuthorPage = () => {
  const { name } = useParams<{ name: string }>();
  const { t, lang } = useLanguage();
  const displayName = useMemo(() => decodeAuthorParam(name), [name]);
  const [posts, setPosts] = useState<AuthorPost[]>([]);
  const [loading, setLoading] = useState(true);

  const BackArrow = lang === "ar" ? ArrowRight : ArrowLeft;
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (isGlobalFallbackMode() || !displayName) {
        setLoading(false);
        return;
      }
      const data = await safeDataRequest<AuthorPost[]>({
        fallback: [],
        markGlobalFallbackOnError: true,
        request: async (signal) => {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("id, slug, title_en, title_ar, excerpt_en, excerpt_ar, featured_image, published_at, created_at, author")
            .eq("status", "published")
            .ilike("author", displayName)
            .order("published_at", { ascending: false })
            .abortSignal(signal);
          if (error) throw error;
          return (data as AuthorPost[]) ?? [];
        },
      });
      if (!cancelled) {
        setPosts(data);
        setLoading(false);
      }
    };
    void run();
    return () => { cancelled = true; };
  }, [displayName]);

  const canonicalName = displayName || "Author";
  const slugPart = (name || "").toLowerCase();

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: canonicalName,
      url: `https://www.alhamdacademy.net/blog/author/${slugPart}`,
      worksFor: { "@type": "Organization", name: "Alhamd Academy" },
    },
  };

  const itemListSchema = posts.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.alhamdacademy.net/blog/${p.slug}`,
      name: lang === "ar" ? (p.title_ar || p.title_en) : (p.title_en || p.title_ar),
    })),
  } : null;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t(`${canonicalName} — Author at Alhamd Academy`, `${canonicalName} — كاتب في أكاديمية الحمد`)}
        description={t(
          `Articles by ${canonicalName} on Quran, Tajweed, Arabic and Islamic studies.`,
          `مقالات ${canonicalName} في القرآن والتجويد والعربية والدراسات الإسلامية.`,
        )}
        canonical={`https://www.alhamdacademy.net/blog/author/${slugPart}`}
        ogType="profile"
        structuredData={itemListSchema ? [profileSchema, itemListSchema] : [profileSchema]}
      />
      <Navbar />

      <main>
        <section className="bg-hero geometric-pattern pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav aria-label={t("Breadcrumb", "مسار التصفح")} className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-primary-foreground/60">
                <li><Link to="/" className="inline-flex items-center gap-1 hover:text-accent transition-colors"><Home className="w-3.5 h-3.5" />{t("Home", "الرئيسية")}</Link></li>
                <li aria-hidden="true"><Chevron className="w-3.5 h-3.5" /></li>
                <li><Link to="/blog" className="hover:text-accent transition-colors">{t("Blog", "المدونة")}</Link></li>
                <li aria-hidden="true"><Chevron className="w-3.5 h-3.5" /></li>
                <li className="text-accent" aria-current="page">{canonicalName}</li>
              </ol>
            </nav>

            <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent text-sm mb-6 transition-colors">
              <BackArrow className="w-4 h-4" />
              {t("Back to Blog", "العودة للمدونة")}
            </Link>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                <User className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground leading-tight">
                  {canonicalName}
                </h1>
                <p className="text-primary-foreground/60 text-sm mt-1">
                  {posts.length} {t(posts.length === 1 ? "article" : "articles", posts.length === 1 ? "مقال" : "مقالات")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-5xl py-12">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                {t("No published articles yet by this author.", "لا توجد مقالات منشورة لهذا الكاتب بعد.")}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => {
                const date = (p.published_at || p.created_at || "").split("T")[0];
                const title = lang === "ar" ? (p.title_ar || p.title_en) : (p.title_en || p.title_ar);
                const excerpt = lang === "ar" ? (p.excerpt_ar || p.excerpt_en || "") : (p.excerpt_en || p.excerpt_ar || "");
                return (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
                  >
                    {p.featured_image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={p.featured_image}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h2 className="font-heading font-bold text-foreground text-base line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h2>
                      {excerpt && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{excerpt}</p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mt-4">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={date}>{date}</time>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorPage;
