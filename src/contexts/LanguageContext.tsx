import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const readInitialLang = (): Language => {
  if (typeof window === "undefined") return "en";
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "ar" || param === "en") return param;
  return "en";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(readInitialLang);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback((en: string, ar: string) => (lang === "en" ? en : ar), [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Keep <html lang> / <html dir> in sync with the active language so
  // screen readers, Google, and per-language CSS selectors get the right
  // signal on every route (index.html ships with lang="en" as a fallback).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Reflect the active language in the URL as ?lang=en / ?lang=ar so
  // canonical + hreflang alternates resolve to distinct URLs for crawlers,
  // and users can share language-scoped links.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const current = url.searchParams.get("lang");
    if (current === lang) return;
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
