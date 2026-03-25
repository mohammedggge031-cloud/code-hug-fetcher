import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  structuredData?: any;
  // Dynamic overrides from DB
  dynamicSeo?: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
    canonical_url?: string | null;
    og_title?: string | null;
    og_description?: string | null;
    og_image?: string | null;
    og_type?: string | null;
    twitter_card?: string | null;
    twitter_title?: string | null;
    twitter_description?: string | null;
    twitter_image?: string | null;
    structured_data?: any;
    no_index?: boolean | null;
  } | null;
}

const DEFAULT_OG_IMAGE = "https://alhamdacademy.net/og-image.jpg";

const SEOHead = ({
  title: defaultTitle,
  description: defaultDesc,
  canonical: defaultCanonical,
  ogType: defaultOgType = "website",
  ogImage: defaultOgImage,
  keywords: defaultKeywords,
  noIndex: defaultNoIndex = false,
  article,
  structuredData: defaultStructuredData,
  dynamicSeo,
}: SEOHeadProps) => {
  // Dynamic values override static defaults
  const title = dynamicSeo?.title || defaultTitle;
  const description = dynamicSeo?.description || defaultDesc;
  const keywords = dynamicSeo?.keywords || defaultKeywords;
  const canonical = dynamicSeo?.canonical_url || defaultCanonical;
  const ogType = dynamicSeo?.og_type || defaultOgType;
  const ogImage = dynamicSeo?.og_image || defaultOgImage;
  const ogTitle = dynamicSeo?.og_title || title;
  const ogDesc = dynamicSeo?.og_description || description;
  const twitterCard = dynamicSeo?.twitter_card || "summary_large_image";
  const twitterTitle = dynamicSeo?.twitter_title || title;
  const twitterDesc = dynamicSeo?.twitter_description || description;
  const twitterImage = dynamicSeo?.twitter_image || ogImage;
  const noIndex = dynamicSeo?.no_index ?? defaultNoIndex;
  const structuredData = dynamicSeo?.structured_data || defaultStructuredData;

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    setMeta("og:title", ogTitle, "property");
    setMeta("og:description", ogDesc, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:image", ogImage || DEFAULT_OG_IMAGE, "property");
    setMeta("og:image:alt", ogTitle, "property");
    setMeta("og:site_name", "Alhamd Academy — Online Quran & Arabic Education", "property");

    setMeta("twitter:card", twitterCard);
    setMeta("twitter:title", twitterTitle);
    setMeta("twitter:description", twitterDesc);
    setMeta("twitter:image", twitterImage || DEFAULT_OG_IMAGE);
    setMeta("twitter:image:alt", twitterTitle);

    if (article) {
      if (article.publishedTime) setMeta("article:published_time", article.publishedTime, "property");
      if (article.modifiedTime) setMeta("article:modified_time", article.modifiedTime, "property");
      if (article.author) setMeta("article:author", article.author, "property");
      if (article.section) setMeta("article:section", article.section, "property");
    }

    // Always set canonical — use provided or derive from current path
    const effectiveCanonical = canonical || `https://alhamdacademy.net${window.location.pathname.replace(/\/$/, '') || '/'}`;
    setMeta("og:url", effectiveCanonical, "property");
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", effectiveCanonical);

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      document.title = "Alhamd Academy | Online Quran, Arabic & Islamic Studies Academy";
      const jsonLd = document.querySelector('script[data-seo-jsonld]');
      if (jsonLd) jsonLd.remove();
      // Remove canonical so next page sets its own (prevents stale canonicals)
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) canonicalLink.remove();
    };
  }, [title, description, canonical, ogType, ogImage, ogTitle, ogDesc, keywords, noIndex, article, twitterCard, twitterTitle, twitterDesc, twitterImage, structuredData]);

  return null;
};

export default SEOHead;
