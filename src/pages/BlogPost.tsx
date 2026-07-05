import { useLanguage } from "@/contexts/LanguageContext";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { RelatedCoursesForBlog } from "@/components/InternalLinking";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen, ChevronRight, ChevronLeft, Home } from "lucide-react";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import { isGlobalFallbackMode, safeDataRequest } from "@/lib/safeRuntimeData";
import { sanitizeHtml } from "@/lib/sanitize";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import TableOfContents from "@/components/blog/TableOfContents";

const BlogPost = () => {
  const { t, lang } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const BackArrow = lang === "ar" ? ArrowRight : ArrowLeft;
  const { seo: dynamicSeo } = useSeoMetadata(`/blog/${id ?? ""}`);

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      if (isGlobalFallbackMode()) {
        if (!cancelled) setLoading(false);
        return;
      }

      const data = await safeDataRequest<any | null>({
        fallback: null,
        markGlobalFallbackOnError: true,
        request: async (signal) => {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("*, blog_categories(name_en, name_ar)")
            .eq("slug", id!)
            .eq("status", "published")
            .abortSignal(signal)
            .maybeSingle();
          if (error) throw error;
          return data;
        },
      });

      if (cancelled) return;
      setPost(data);

      if (data?.category_id) {
        const related = await safeDataRequest<any[]>({
          fallback: [],
          markGlobalFallbackOnError: true,
          request: async (signal) => {
            const { data: rel, error } = await supabase
              .from("blog_posts")
              .select("slug, title_en, title_ar, featured_image, published_at")
              .eq("status", "published")
              .eq("category_id", data.category_id)
              .neq("id", data.id)
              .limit(3)
              .abortSignal(signal);
            if (error) throw error;
            return rel ?? [];
          },
        });
        if (!cancelled) setRelatedPosts(related);
      }

      if (!cancelled) setLoading(false);
    };

    void fetchPost().finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            {t("Article not found", "المقال غير موجود")}
          </h1>
          <Link to="/blog" className="text-primary font-semibold hover:underline">
            {t("← Back to Blog", "← العودة للمدونة")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const catName = post.blog_categories?.name_en || "Uncategorized";
  const catNameAr = post.blog_categories?.name_ar || "غير مصنف";
  const postDate = (post.published_at || post.created_at || "").split("T")[0];
  const modifiedDate = (post.updated_at || post.published_at || post.created_at || "").split("T")[0];
  const titleEn = post.title_en || post.title_ar;
  const titleAr = post.title_ar || post.title_en;
  const excerptEn = post.excerpt_en || post.excerpt_ar || "";
  const excerptAr = post.excerpt_ar || post.excerpt_en || "";
  const contentEn = post.content_en || post.content_ar || "";
  const contentAr = post.content_ar || post.content_en || "";
  const readTimeEn = post.read_time_en || "5 min";
  const readTimeAr = post.read_time_ar || "٥ دقائق";
  const contentHtml = t(contentEn, contentAr);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(titleEn, titleAr),
    description: t(excerptEn, excerptAr),
    image: post.featured_image || "https://www.alhamdacademy.net/og-image.jpg",
    datePublished: post.published_at || post.created_at || postDate,
    dateModified: post.updated_at || post.published_at || post.created_at || modifiedDate,
    // Use Person to match the prerender schema; falls back to org name so
    // Search Console still sees a valid author string when post.author is empty.
    author: { "@type": "Person", name: post.author || "Alhamd Academy" },
    publisher: {
      "@type": "Organization",
      name: "Alhamd Academy",
      logo: { "@type": "ImageObject", url: "https://www.alhamdacademy.net/favicon-512.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.alhamdacademy.net/blog/${post.slug}` },
    inLanguage: lang === "ar" ? "ar" : "en",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alhamdacademy.net/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.alhamdacademy.net/blog" },
      { "@type": "ListItem", position: 3, name: t(titleEn, titleAr), item: `https://www.alhamdacademy.net/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${t(titleEn, titleAr)} | Alhamd Academy Blog`}
        description={t(excerptEn, excerptAr)}
        canonical={`https://www.alhamdacademy.net/blog/${post.slug}`}
        ogType="article"
        ogImage={post.featured_image}
        keywords={`${catName}, quran, alhamd academy`}
        article={{ publishedTime: post.published_at || postDate, modifiedTime: post.updated_at || post.published_at || postDate, author: post.author || "Alhamd Academy", section: catName }}
        structuredData={[articleSchema, breadcrumbSchema]}
        dynamicSeo={dynamicSeo}
      />
      <Navbar />

      <main>
        <section className="bg-hero geometric-pattern pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Visible breadcrumbs (also emitted as BreadcrumbList schema above) */}
            <nav aria-label={t("Breadcrumb", "مسار التصفح")} className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-primary-foreground/60">
                <li>
                  <Link to="/" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
                    <Home className="w-3.5 h-3.5" />
                    {t("Home", "الرئيسية")}
                  </Link>
                </li>
                <li aria-hidden="true">
                  {lang === "ar" ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </li>
                <li>
                  <Link to="/blog" className="hover:text-accent transition-colors">
                    {t("Blog", "المدونة")}
                  </Link>
                </li>
                <li aria-hidden="true">
                  {lang === "ar" ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </li>
                <li className="text-accent line-clamp-1 max-w-[60%]" aria-current="page">
                  {t(titleEn, titleAr)}
                </li>
              </ol>
            </nav>

            <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent text-sm mb-6 transition-colors">
              <BackArrow className="w-4 h-4" />
              {t("Back to Blog", "العودة للمدونة")}
            </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-4">
              {t(catName, catNameAr)}
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4 leading-tight">
              {t(titleEn, titleAr)}
            </h1>
            <div className="flex items-center gap-4 text-primary-foreground/60 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={postDate}>{postDate}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {t(readTimeEn, readTimeAr)}
              </span>
            </div>
          </div>
        </section>

        {post.featured_image && (
          <div className="container mx-auto px-4 max-w-4xl -mt-6">
            <div className="rounded-xl overflow-hidden shadow-elevated">
              <img src={post.featured_image} alt={t(titleEn, titleAr)} width={1200} height={630} className="w-full h-64 md:h-96 object-cover" decoding="async" {...({ fetchpriority: "high" } as any)} />
            </div>
          </div>
        )}

        <article className="container mx-auto px-4 max-w-4xl py-12">
          <div
            className="bg-card rounded-xl border border-border p-6 md:p-10 shadow-soft prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(contentHtml) }}
          />

          <RelatedCoursesForBlog category={catName} maxCourses={3} />

          <div className="mt-12 bg-primary rounded-xl p-8 text-center">
            <BookOpen className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">
              {t("Start Your Learning Journey Today", "ابدأ رحلة التعلم اليوم")}
            </h3>
            <p className="text-primary-foreground/70 text-sm mb-5 max-w-lg mx-auto">
              {t("Join Alhamd Academy and learn with certified teachers.", "انضم إلى أكاديمية الحمد وتعلم مع معلمين معتمدين.")}
            </p>
            <Link to="/#contact" className="inline-flex px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              {t("Get Free Trial", "احصل على تجربة مجانية")}
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                {t("Related Articles", "مقالات ذات صلة")}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp: any) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={rp.featured_image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=640&q=70"}
                        alt={t(rp.title_en || rp.title_ar, rp.title_ar || rp.title_en)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        {...({ fetchpriority: "low" } as any)}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {t(rp.title_en || rp.title_ar, rp.title_ar || rp.title_en)}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-2">
                        {(rp.published_at || "").split("T")[0]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <ExploreMoreSection />
      <Footer />
    </div>
  );
};

export default BlogPost;
