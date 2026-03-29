import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { safeDataRequest } from "@/lib/safeRuntimeData";

interface RecentPost {
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  category: string;
  categoryAr: string;
  readTimeEn: string;
  readTimeAr: string;
  image: string;
}

const RecentArticlesSection = () => {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<RecentPost[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      const data = await safeDataRequest<any[]>({
        fallback: [],
        request: async (signal) => {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("slug, title_en, title_ar, excerpt_en, excerpt_ar, featured_image, read_time_en, read_time_ar, blog_categories(name_en, name_ar)")
            .eq("status", "published")
            .order("published_at", { ascending: false })
            .limit(4)
            .abortSignal(signal);
          if (error) throw error;
          return data ?? [];
        },
      });

      if (cancelled) return;

      setPosts(
        data.map((p: any) => ({
          slug: p.slug,
          title_en: p.title_en || p.title_ar,
          title_ar: p.title_ar || p.title_en,
          excerpt_en: p.excerpt_en || p.excerpt_ar || "",
          excerpt_ar: p.excerpt_ar || p.excerpt_en || "",
          category: p.blog_categories?.name_en || "Uncategorized",
          categoryAr: p.blog_categories?.name_ar || "غير مصنف",
          readTimeEn: p.read_time_en || "5 min read",
          readTimeAr: p.read_time_ar || "٥ دقائق قراءة",
          image: p.featured_image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=640&q=70",
        }))
      );
    };

    void fetch();
    return () => { cancelled = true; };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-secondary/30" aria-label="Latest Blog Articles from Alhamd Academy">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("Knowledge Hub", "مركز المعرفة")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            {t("Latest Articles & Guides", "أحدث المقالات والأدلة")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            {t(
              "Expert insights on Quran learning, Tajweed rules, Arabic language tips, and Islamic education — written by our certified teachers.",
              "رؤى متخصصة في تعلم القرآن وقواعد التجويد ونصائح اللغة العربية والتعليم الإسلامي — بقلم معلمينا المعتمدين."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow h-full"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={lang === "ar" ? post.title_ar : post.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={200}
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-accent uppercase">
                    {lang === "ar" ? post.categoryAr : post.category}
                  </span>
                  <h3 className="text-sm font-bold text-foreground mt-1 line-clamp-2 group-hover:text-accent transition-colors">
                    {lang === "ar" ? post.title_ar : post.title_en}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {lang === "ar" ? post.excerpt_ar : post.excerpt_en}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {lang === "ar" ? post.readTimeAr : post.readTimeEn}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-4 h-4" />
            {t("View All Articles", "عرض جميع المقالات")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentArticlesSection;
