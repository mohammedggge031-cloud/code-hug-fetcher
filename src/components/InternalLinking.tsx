import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { courses } from "@/data/courses";
import { supabase } from "@/integrations/supabase/client";
import { safeDataRequest } from "@/lib/safeRuntimeData";
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react";

// Map course slugs to relevant blog categories for DB queries
const courseCategoryMap: Record<string, string[]> = {
  "quran-course": ["Quran"],
  "tajweed-course": ["Tajweed"],
  "arabic-course": ["Arabic"],
  "islamic-studies": ["Islamic Studies", "Islamic Knowledge"],
  "all-in-one-course": ["Quran", "Tajweed", "Arabic", "Islamic Studies"],
};

// Map blog categories to relevant course slugs
const categoryRelatedCourses: Record<string, string[]> = {
  Tajweed: ["tajweed-course", "quran-course"],
  Quran: ["quran-course", "tajweed-course", "all-in-one-course"],
  Arabic: ["arabic-course", "all-in-one-course"],
  "Islamic Studies": ["islamic-studies", "all-in-one-course"],
  "Islamic Knowledge": ["islamic-studies", "quran-course"],
  Education: ["all-in-one-course", "quran-course", "arabic-course"],
  "Quran Stories": ["quran-course", "islamic-studies"],
  Hifz: ["quran-course", "all-in-one-course"],
  Ijazah: ["quran-course", "tajweed-course"],
};

interface RelatedBlogPostsProps {
  courseSlug: string;
  maxPosts?: number;
}

/**
 * Shows related blog posts on course pages — fetched from DB.
 */
export const RelatedBlogPosts = React.forwardRef<HTMLElement, RelatedBlogPostsProps>(
  ({ courseSlug, maxPosts = 4 }, ref) => {
    const { t, lang } = useLanguage();
    const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
      let cancelled = false;
      const categories = courseCategoryMap[courseSlug];
      if (!categories?.length) return;

      const fetchRelated = async () => {
        const data = await safeDataRequest<any[]>({
          fallback: [],
          request: async (signal) => {
            const { data, error } = await supabase
              .from("blog_posts")
              .select("slug, title_en, title_ar, featured_image, blog_categories!inner(name_en, name_ar)")
              .eq("status", "published")
              .in("blog_categories.name_en", categories)
              .limit(maxPosts)
              .abortSignal(signal);
            if (error) throw error;
            return data ?? [];
          },
        });
        if (!cancelled) setPosts(data);
      };

      void fetchRelated();
      return () => { cancelled = true; };
    }, [courseSlug, maxPosts]);

    if (posts.length === 0) return null;

    return (
      <section className="py-8 md:py-10 bg-section" aria-label="Related Articles">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                {t("Related Articles", "مقالات ذات صلة")}
              </h2>
              <Link
                to="/blog"
                className="text-xs text-primary hover:text-accent font-semibold flex items-center gap-1 transition-colors"
              >
                {t("View All", "عرض الكل")}
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {posts.map((post: any) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-card transition-[border-color,box-shadow] duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.featured_image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=640&q=70"}
                      alt={t(post.title_en || post.title_ar, post.title_ar || post.title_en)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="400"
                      height="250"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-accent font-semibold">
                      {t(post.blog_categories?.name_en || "", post.blog_categories?.name_ar || "")}
                    </span>
                    <h3 className="text-xs font-bold text-foreground line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                      {t(post.title_en || post.title_ar, post.title_ar || post.title_en)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
RelatedBlogPosts.displayName = "RelatedBlogPosts";

interface RelatedCoursesForBlogProps {
  category: string;
  maxCourses?: number;
}

/**
 * Shows related courses on blog posts for internal linking.
 */
export const RelatedCoursesForBlog = ({ category, maxCourses = 3 }: RelatedCoursesForBlogProps) => {
  const { t, lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const relatedSlugs = categoryRelatedCourses[category] || ["quran-course", "all-in-one-course"];
  const related = relatedSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter(Boolean)
    .slice(0, maxCourses);

  if (related.length === 0) return null;

  return (
    <div className="mt-10 bg-muted rounded-xl p-5 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-base font-bold text-foreground">
          {t("Explore Our Courses", "استكشف دوراتنا")}
        </h3>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {related.map((course) => (
          <Link
            key={course!.slug}
            to={`/courses/${course!.slug}`}
            className="group flex items-center gap-3 bg-card rounded-lg p-3 border border-border hover:border-accent/30 hover:shadow-soft transition-[border-color,box-shadow]"
          >
            <div className="flex-1">
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {t(course!.titleEn, course!.titleAr)}
              </h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                {t(course!.descEn, course!.descAr)}
              </p>
            </div>
            <ArrowIcon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};
