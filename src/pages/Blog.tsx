import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { blogPosts as staticPosts, blogCategories } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import { Calendar, Clock, ArrowRight, ArrowLeft, Search } from "lucide-react";
import { isGlobalFallbackMode, safeDataRequest } from "@/lib/safeRuntimeData";

const POSTS_PER_PAGE = 6;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhamdacademy.net/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://alhamdacademy.net/blog" }
  ]
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://alhamdacademy.net/blog#collection",
  "name": "Quran & Islamic Studies Blog | Alhamd Academy",
  "description": "Read articles on Quran, Tajweed, Arabic language, and Islamic studies.",
  "url": "https://alhamdacademy.net/blog",
  "isPartOf": { "@id": "https://alhamdacademy.net/#website" },
  "about": { "@id": "https://alhamdacademy.net/#organization" },
  "inLanguage": ["en", "ar"]
};

// Unified post interface
interface UnifiedPost {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  category: string;
  categoryAr: string;
  date: string;
  readTimeEn: string;
  readTimeAr: string;
  image: string;
  source: "static" | "db";
}

const Blog = () => {
  const { t, lang } = useLanguage();
  const { seo } = useSeoMetadata("/blog");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbPosts, setDbPosts] = useState<UnifiedPost[]>([]);
  const [dbCategories, setDbCategories] = useState<{ id: string; name_en: string; name_ar: string }[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchDbPosts = async () => {
      if (isGlobalFallbackMode()) return;

      const result = await safeDataRequest<{ posts: any[]; cats: { id: string; name_en: string; name_ar: string }[] }>({
        fallback: { posts: [], cats: [] },
        markGlobalFallbackOnError: true,
        request: async (signal) => {
          const [postsRes, categoriesRes] = await Promise.all([
            supabase
              .from("blog_posts")
              .select("*, blog_categories(name_en, name_ar)")
              .eq("status", "published")
              .order("published_at", { ascending: false })
              .abortSignal(signal),
            supabase.from("blog_categories").select("id, name_en, name_ar").abortSignal(signal),
          ]);

          if (postsRes.error) throw postsRes.error;
          if (categoriesRes.error) throw categoriesRes.error;

          return {
            posts: postsRes.data ?? [],
            cats: categoriesRes.data ?? [],
          };
        },
      });

      if (cancelled) return;

      if (result.posts.length > 0) {
        setDbPosts(result.posts.map((p: any) => ({
          id: p.slug,
          titleEn: p.title_en || p.title_ar,
          titleAr: p.title_ar || p.title_en,
          excerptEn: p.excerpt_en || p.excerpt_ar || "",
          excerptAr: p.excerpt_ar || p.excerpt_en || "",
          category: p.blog_categories?.name_en || "Uncategorized",
          categoryAr: p.blog_categories?.name_ar || "غير مصنف",
          date: p.published_at ? p.published_at.split("T")[0] : p.created_at.split("T")[0],
          readTimeEn: p.read_time_en || p.read_time_ar || "5 min read",
          readTimeAr: p.read_time_ar || p.read_time_en || "٥ دقائق قراءة",
          image: p.featured_image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=640&q=70",
          source: "db" as const,
        })));
      }

      if (result.cats.length > 0) {
        setDbCategories(result.cats);
      }
    };

    void fetchDbPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const dbSlugs = useMemo(() => new Set(dbPosts.map((post) => post.id)), [dbPosts]);

  const staticUnified = useMemo(
    () =>
      staticPosts
        .filter((post) => !dbSlugs.has(post.id))
        .map((post) => ({ ...post, titleEn: post.titleEn, titleAr: post.titleAr, excerptEn: post.excerptEn, excerptAr: post.excerptAr, source: "static" as const })),
    [dbSlugs],
  );

  const allPosts = useMemo(() => [...dbPosts, ...staticUnified], [dbPosts, staticUnified]);

  const allCategories = useMemo(() => {
    const mergedCategories = [...blogCategories];

    dbCategories.forEach((category) => {
      if (!mergedCategories.find((item) => item.en === category.name_en)) {
        mergedCategories.push({ en: category.name_en, ar: category.name_ar });
      }
    });

    return mergedCategories;
  }, [dbCategories]);

  const filteredPosts = useMemo(
    () =>
      allPosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const searchTerm = searchQuery.trim().toLowerCase();

        if (!searchTerm) return matchesCategory;

        const matchesSearch =
          post.titleEn.toLowerCase().includes(searchTerm) ||
          post.titleAr.includes(searchQuery) ||
          post.excerptEn.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
      }),
    [allPosts, activeCategory, searchQuery],
  );

  const totalPages = useMemo(() => Math.ceil(filteredPosts.length / POSTS_PER_PAGE), [filteredPosts.length]);

  const paginatedPosts = useMemo(
    () => filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filteredPosts, currentPage],
  );

  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Quran & Islamic Studies Blog | Alhamd Academy"
        description="Read articles on Quran, Tajweed, Arabic language, and Islamic studies. Tips for Quran memorization, Tajweed rules, Islamic knowledge and more from certified teachers."
        canonical="https://alhamdacademy.net/blog"
        keywords="quran blog, tajweed articles, islamic studies blog, arabic language tips, quran memorization tips, learn quran articles, islamic education blog"
        dynamicSeo={seo}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <Navbar />

      <main>
        <section className="bg-hero geometric-pattern pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              {t("Our Blog", "مدونتنا")}
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              {t(
                "Explore articles on Quran, Tajweed, Arabic language, and Islamic studies to enrich your knowledge.",
                "استكشف مقالات عن القرآن والتجويد واللغة العربية والدراسات الإسلامية لإثراء معرفتك."
              )}
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
              <div className="relative w-full md:w-80">
                <Search className="absolute top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 start-3" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder={t("Search articles...", "ابحث عن مقالات...")}
                  className="w-full ps-10 pe-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label={t("Search articles", "ابحث عن مقالات")}
                />
              </div>
              <nav className="flex flex-wrap gap-2" aria-label="Blog categories">
                {allCategories.map((cat) => (
                  <button
                    key={cat.en}
                    onClick={() => { setActiveCategory(cat.en); setCurrentPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.en
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                    }`}
                    aria-pressed={activeCategory === cat.en}
                  >
                    {t(cat.en, cat.ar)}
                  </button>
                ))}
              </nav>
            </div>

            {paginatedPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={post.image} alt={t(post.titleEn, post.titleAr)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" fetchPriority="low" />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold mb-3">
                        {t(post.category, post.categoryAr)}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {t(post.titleEn, post.titleAr)}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {t(post.excerptEn, post.excerptAr)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.date}>{post.date}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t(post.readTimeEn, post.readTimeAr)}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        {t("Read More", "اقرأ المزيد")}
                        <ArrowIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">{t("No articles found.", "لم يتم العثور على مقالات.")}</p>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                    }`}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            )}
          </div>
      </section>

      <ExploreMoreSection />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
