import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const RecentArticlesSection = () => {
  const { t, lang } = useLanguage();

  // Pick 4 most recent articles
  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

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
          {recent.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/blog/${post.id}`}
                className="group block rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow h-full"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={lang === "ar" ? post.titleAr : post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={320}
                    height={200}
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-accent uppercase">
                    {lang === "ar" ? post.categoryAr : post.category}
                  </span>
                  <h3 className="text-sm font-bold text-foreground mt-1 line-clamp-2 group-hover:text-accent transition-colors">
                    {lang === "ar" ? post.titleAr : post.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {lang === "ar" ? post.excerptAr : post.excerptEn}
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
