import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts } from "@/data/blogPosts";
import { courses } from "@/data/courses";
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react";

// Map course slugs to relevant blog post IDs
const courseRelatedPosts: Record<string, string[]> = {
  "quran-course": [
    "how-to-start-learning-quran", "benefits-of-memorizing-quran", "noor-al-bayan-method",
    "quran-for-adults", "best-quran-reciters", "teaching-quran-to-kids",
    "quran-ijazah-explained", "tafseer-surah-fatiha", "quran-learning-mistakes",
    "how-to-learn-quran-online-step-by-step", "best-online-quran-classes-for-kids",
    "best-online-quran-classes-for-adults", "online-quran-learning-guide-for-beginners",
    "how-to-choose-best-online-quran-academy"
  ],
  "tajweed-course": [
    "what-is-tajweed", "makharij-al-huruf", "best-quran-reciters",
    "quran-ijazah-explained", "quran-learning-mistakes",
    "what-are-tajweed-rules-explained-simply", "how-to-learn-tajweed-online",
    "tajweed-rules-every-muslim-should-know", "best-tajweed-course-for-beginners",
    "common-tajweed-mistakes-and-how-to-fix-them"
  ],
  "arabic-course": [
    "importance-of-arabic-language", "al-arabiya-bayna-yadayk-intro",
    "al-arabiya-bayna-yadayk-level1", "al-arabiya-bayna-yadayk-level2",
    "al-arabiya-level3-advanced", "arabic-grammar-basics", "arabic-vocabulary-daily",
    "why-learning-arabic-helps-understand-quran", "best-way-to-learn-arabic-for-beginners",
    "arabic-for-kids-complete-learning-guide", "how-long-does-it-take-to-learn-arabic",
    "arabic-words-every-muslim-should-know"
  ],
  "islamic-studies": [
    "pillars-of-islam", "story-of-prophet-muhammad", "hajj-complete-guide",
    "umrah-guide", "fasting-ramadan-rules", "salah-step-by-step", "wudu-guide",
    "dua-for-studying", "quran-and-science", "story-of-luqman",
    "what-are-islamic-studies-and-why-they-matter", "best-islamic-classes-online-for-kids",
    "what-muslims-should-know-about-their-religion", "basic-islamic-knowledge-every-muslim-should-learn",
    "islamic-education-for-children"
  ],
  "all-in-one-course": [
    "how-to-start-learning-quran", "what-is-tajweed", "importance-of-arabic-language",
    "pillars-of-islam", "online-quran-classes-benefits", "noor-al-bayan-method",
    "how-to-learn-quran-online-step-by-step", "online-quran-learning-guide-for-beginners",
    "how-to-memorize-quran-fast-and-effectively"
  ],
};

// Map blog categories to relevant course slugs
const categoryRelatedCourses: Record<string, string[]> = {
  "Tajweed": ["tajweed-course", "quran-course"],
  "Quran": ["quran-course", "tajweed-course", "all-in-one-course"],
  "Arabic": ["arabic-course", "all-in-one-course"],
  "Islamic Studies": ["islamic-studies", "all-in-one-course"],
  "Islamic Knowledge": ["islamic-studies", "quran-course"],
  "Education": ["all-in-one-course", "quran-course", "arabic-course"],
  "Quran Stories": ["quran-course", "islamic-studies"],
  "Hifz": ["quran-course", "all-in-one-course"],
  "Ijazah": ["quran-course", "tajweed-course"],
};

interface RelatedBlogPostsProps {
  courseSlug: string;
  maxPosts?: number;
}

/**
 * Shows related blog posts on course pages for internal linking.
 */
export const RelatedBlogPosts = React.forwardRef<HTMLElement, RelatedBlogPostsProps>(({ courseSlug, maxPosts = 4 }, ref) => {
  const { t, lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const relatedIds = courseRelatedPosts[courseSlug] || [];
  const related = relatedIds
    .map(id => blogPosts.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, maxPosts);

  if (related.length === 0) return null;

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
            {related.map((post) => (
              <Link
                key={post!.id}
                to={`/blog/${post!.id}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-card transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post!.image}
                    alt={t(post!.titleEn, post!.titleAr)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="250"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] text-accent font-semibold">
                    {t(post!.category, post!.categoryAr)}
                  </span>
                  <h3 className="text-xs font-bold text-foreground line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                    {t(post!.titleEn, post!.titleAr)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
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
    .map(slug => courses.find(c => c.slug === slug))
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
            className="group flex items-center gap-3 bg-card rounded-lg p-3 border border-border hover:border-accent/30 hover:shadow-soft transition-all"
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
