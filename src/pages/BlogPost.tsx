import { useLanguage } from "@/contexts/LanguageContext";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { RelatedCoursesForBlog } from "@/components/InternalLinking";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import ExploreMoreSection from "@/components/ExploreMoreSection";

const BlogPost = () => {
  const { t, lang } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const BackArrow = lang === "ar" ? ArrowRight : ArrowLeft;

  // Check static posts first
  const staticPost = blogPosts.find((p) => p.id === id);

  const [dbPost, setDbPost] = useState<any>(null);
  const [loading, setLoading] = useState(!staticPost);
  const [relatedDbPosts, setRelatedDbPosts] = useState<any[]>([]);

  useEffect(() => {
    if (staticPost) return;
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(name_en, name_ar)")
        .eq("slug", id!)
        .eq("status", "published")
        .maybeSingle();
      setDbPost(data);
      setLoading(false);

      if (data?.category_id) {
        const { data: related } = await supabase
          .from("blog_posts")
          .select("slug, title_en, title_ar, featured_image, published_at")
          .eq("status", "published")
          .eq("category_id", data.category_id)
          .neq("id", data.id)
          .limit(3);
        if (related) setRelatedDbPosts(related);
      }
    };
    fetchPost();
  }, [id, staticPost]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Use static post data
  if (staticPost) {
    const content = t(staticPost.contentEn, staticPost.contentAr);
    const relatedPosts = blogPosts.filter((p) => p.id !== staticPost.id && p.category === staticPost.category).slice(0, 3);

    const inlineFormat = (text: string) =>
      text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-accent transition-colors">$1</a>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    const renderContent = (md: string) => {
      return md.split("\n").map((line, i) => {
        if (line.startsWith("# ") && i === 0) return null; // skip duplicate H1
        if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-heading font-semibold text-foreground mt-6 mb-3">{line.slice(4)}</h3>;
        if (line.startsWith("- **")) {
          const parts = line.slice(2);
          return <li key={i} className="ms-4 mb-2 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineFormat(parts) }} />;
        }
        if (line.startsWith("- ")) return <li key={i} className="ms-4 mb-2 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2)) }} />;
        if (/^\d+\.\s/.test(line)) {
          const text = line.replace(/^\d+\.\s/, "");
          return <li key={i} className="ms-4 mb-2 text-muted-foreground leading-relaxed list-decimal" dangerouslySetInnerHTML={{ __html: inlineFormat(text) }} />;
        }
        if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-arabic text-lg text-primary font-semibold my-3">{line.slice(2, -2)}</p>;
        if (line.trim() === "---") return <hr key={i} className="my-6 border-border" />;
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return <p key={i} className="text-muted-foreground leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />;
      });
    };

    const articleSchema = {
      "@context": "https://schema.org", "@type": "BlogPosting",
      "headline": t(staticPost.titleEn, staticPost.titleAr),
      "description": t(staticPost.excerptEn, staticPost.excerptAr),
      "image": staticPost.image, "datePublished": staticPost.date, "dateModified": staticPost.date,
      "author": { "@type": "Organization", "name": "Alhamd Academy", "url": "https://alhamdacademy.net/" },
      "publisher": { "@type": "Organization", "name": "Alhamd Academy", "logo": { "@type": "ImageObject", "url": "https://alhamdacademy.net/favicon-512.png", "width": 512, "height": 512 } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://alhamdacademy.net/blog/${staticPost.id}` },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhamdacademy.net/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://alhamdacademy.net/blog" },
        { "@type": "ListItem", "position": 3, "name": t(staticPost.titleEn, staticPost.titleAr), "item": `https://alhamdacademy.net/blog/${staticPost.id}` }
      ]
    };

    return (
      <div className="min-h-screen">
        <SEOHead title={`${t(staticPost.titleEn, staticPost.titleAr)} | Alhamd Academy Blog`} description={t(staticPost.excerptEn, staticPost.excerptAr)} canonical={`https://alhamdacademy.net/blog/${staticPost.id}`} ogType="article" ogImage={staticPost.image} keywords={`${staticPost.category}, quran, islamic studies, alhamd academy`} article={{ publishedTime: staticPost.date, modifiedTime: staticPost.date, author: "Alhamd Academy", section: staticPost.category }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <Navbar />
        <main>
          <section className="bg-hero geometric-pattern pt-32 pb-12 md:pt-40 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent text-sm mb-6 transition-colors"><BackArrow className="w-4 h-4" />{t("Back to Blog", "العودة للمدونة")}</Link>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-4">{t(staticPost.category, staticPost.categoryAr)}</span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4 leading-tight">{t(staticPost.titleEn, staticPost.titleAr)}</h1>
              <div className="flex items-center gap-4 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><time dateTime={staticPost.date}>{staticPost.date}</time></span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{t(staticPost.readTimeEn, staticPost.readTimeAr)}</span>
              </div>
            </div>
          </section>
          <div className="container mx-auto px-4 max-w-4xl -mt-6">
            <div className="rounded-xl overflow-hidden shadow-elevated"><img src={staticPost.image} alt={t(staticPost.titleEn, staticPost.titleAr)} className="w-full h-64 md:h-96 object-cover" decoding="async" fetchPriority="high" /></div>
          </div>
          <article className="container mx-auto px-4 max-w-4xl py-12">
            <div className="bg-card rounded-xl border border-border p-6 md:p-10 shadow-soft">{renderContent(content)}</div>
            
            {/* Related Courses — Internal Linking */}
            <RelatedCoursesForBlog category={staticPost.category} maxCourses={3} />
            
            <div className="mt-12 bg-primary rounded-xl p-8 text-center">
              <BookOpen className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">{t("Start Your Learning Journey Today", "ابدأ رحلة التعلم اليوم")}</h3>
              <p className="text-primary-foreground/70 text-sm mb-5 max-w-lg mx-auto">{t("Join Alhamd Academy and learn with certified teachers in one-on-one sessions.", "انضم إلى أكاديمية الحمد وتعلم مع معلمين معتمدين في جلسات فردية.")}</p>
              <Link to="/#contact" className="inline-flex px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity">{t("Get Free Trial", "احصل على تجربة مجانية")}</Link>
            </div>
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">{t("Related Articles", "مقالات ذات صلة")}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.id} to={`/blog/${rp.id}`} className="group rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
                      <div className="aspect-[16/10] overflow-hidden"><img src={rp.image} alt={t(rp.titleEn, rp.titleAr)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" fetchPriority="low" /></div>
                      <div className="p-4"><h4 className="font-heading font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">{t(rp.titleEn, rp.titleAr)}</h4><p className="text-xs text-muted-foreground mt-2">{rp.date}</p></div>
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
  }

  // DB post
  if (!dbPost) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">{t("Article not found", "المقال غير موجود")}</h1>
          <Link to="/blog" className="text-primary font-semibold hover:underline">{t("← Back to Blog", "← العودة للمدونة")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const catName = dbPost.blog_categories?.name_en || "Uncategorized";
  const catNameAr = dbPost.blog_categories?.name_ar || "غير مصنف";
  const postDate = dbPost.published_at ? dbPost.published_at.split("T")[0] : dbPost.created_at.split("T")[0];

  // Language fallback: if content missing in selected lang, use the other
  const titleEn = dbPost.title_en || dbPost.title_ar;
  const titleAr = dbPost.title_ar || dbPost.title_en;
  const excerptEn = dbPost.excerpt_en || dbPost.excerpt_ar || "";
  const excerptAr = dbPost.excerpt_ar || dbPost.excerpt_en || "";
  const contentEn = dbPost.content_en || dbPost.content_ar || "";
  const contentAr = dbPost.content_ar || dbPost.content_en || "";
  const readTimeEn = dbPost.read_time_en || dbPost.read_time_ar || "5 min";
  const readTimeAr = dbPost.read_time_ar || dbPost.read_time_en || "٥ دقائق";
  const contentHtml = t(contentEn, contentAr);

  return (
    <div className="min-h-screen">
      <SEOHead title={`${t(titleEn, titleAr)} | Alhamd Academy Blog`} description={t(excerptEn, excerptAr)} canonical={`https://alhamdacademy.net/blog/${dbPost.slug}`} ogType="article" ogImage={dbPost.featured_image} keywords={`${catName}, quran, alhamd academy`} article={{ publishedTime: postDate, modifiedTime: postDate, author: "Alhamd Academy", section: catName }} />
      <Navbar />
      <main>
        <section className="bg-hero geometric-pattern pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent text-sm mb-6 transition-colors"><BackArrow className="w-4 h-4" />{t("Back to Blog", "العودة للمدونة")}</Link>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-4">{t(catName, catNameAr)}</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4 leading-tight">{t(titleEn, titleAr)}</h1>
            <div className="flex items-center gap-4 text-primary-foreground/60 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><time dateTime={postDate}>{postDate}</time></span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{t(readTimeEn, readTimeAr)}</span>
            </div>
          </div>
        </section>

        {dbPost.featured_image && (
          <div className="container mx-auto px-4 max-w-4xl -mt-6">
            <div className="rounded-xl overflow-hidden shadow-elevated"><img src={dbPost.featured_image} alt={t(titleEn, titleAr)} className="w-full h-64 md:h-96 object-cover" decoding="async" fetchPriority="high" /></div>
          </div>
        )}

        <article className="container mx-auto px-4 max-w-4xl py-12">
          <div className="bg-card rounded-xl border border-border p-6 md:p-10 shadow-soft prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* Related Courses — Internal Linking */}
          <RelatedCoursesForBlog category={catName} maxCourses={3} />

          <div className="mt-12 bg-primary rounded-xl p-8 text-center">
            <BookOpen className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">{t("Start Your Learning Journey Today", "ابدأ رحلة التعلم اليوم")}</h3>
            <p className="text-primary-foreground/70 text-sm mb-5 max-w-lg mx-auto">{t("Join Alhamd Academy and learn with certified teachers.", "انضم إلى أكاديمية الحمد وتعلم مع معلمين معتمدين.")}</p>
            <Link to="/#contact" className="inline-flex px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity">{t("Get Free Trial", "احصل على تجربة مجانية")}</Link>
          </div>

          {relatedDbPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">{t("Related Articles", "مقالات ذات صلة")}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDbPosts.map((rp: any) => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden"><img src={rp.featured_image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=640&q=70"} alt={t(rp.title_en || rp.title_ar, rp.title_ar || rp.title_en)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" fetchPriority="low" /></div>
                    <div className="p-4"><h4 className="font-heading font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">{t(rp.title_en || rp.title_ar, rp.title_ar || rp.title_en)}</h4><p className="text-xs text-muted-foreground mt-2">{rp.published_at?.split("T")[0]}</p></div>
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
