import { useEffect, useMemo, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const slugify = (input: string, seen: Map<string, number>) => {
  const base = input
    .toString()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "") // Arabic diacritics
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "section";
  const n = (seen.get(base) ?? 0) + 1;
  seen.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
};

/**
 * Auto-generated Table of Contents.
 * - Parses the sanitized article HTML for H2 / H3 headings.
 * - Injects stable ids into the live DOM so the anchors work.
 * - Only renders when there are 3+ headings (short posts don't need a TOC).
 */
interface Props {
  /** Sanitized HTML string of the article body. */
  html: string;
  /** CSS selector for the rendered article container (headings live here). */
  containerSelector: string;
  titleEn?: string;
  titleAr?: string;
  lang: "en" | "ar";
}

const TableOfContents = ({ html, containerSelector, titleEn = "In this article", titleAr = "في هذه المقالة", lang }: Props) => {
  const items = useMemo<TocItem[]>(() => {
    if (typeof window === "undefined" || !html) return [];
    const doc = new DOMParser().parseFromString(html, "text/html");
    const nodes = Array.from(doc.querySelectorAll("h2, h3"));
    const seen = new Map<string, number>();
    return nodes.map((n) => {
      const text = (n.textContent || "").trim();
      const level = (n.tagName === "H3" ? 3 : 2) as 2 | 3;
      return { id: slugify(text || "section", seen), text, level };
    }).filter((i) => i.text.length > 0);
  }, [html]);

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>("h2, h3"));
    const seen = new Map<string, number>();
    headings.forEach((h) => {
      const text = (h.textContent || "").trim();
      if (!text) return;
      const id = slugify(text, seen);
      h.id = id;
      h.style.scrollMarginTop = "120px";
    });

    // Track active section for highlight.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId((visible.target as HTMLElement).id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items, containerSelector]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label={lang === "ar" ? "فهرس المقال" : "Article contents"}
      className="mb-8 rounded-xl border border-border bg-muted/40 p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <List className="w-4 h-4 text-accent" />
        <h2 className="text-sm font-heading font-bold text-foreground m-0">
          {lang === "ar" ? titleAr : titleEn}
        </h2>
      </div>
      <ol className="space-y-1.5 list-none p-0 m-0">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? (lang === "ar" ? "pr-4" : "pl-4") : ""}>
            <a
              href={`#${item.id}`}
              className={[
                "block text-sm no-underline transition-colors",
                activeId === item.id ? "text-accent font-semibold" : "text-muted-foreground hover:text-primary",
              ].join(" ")}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
