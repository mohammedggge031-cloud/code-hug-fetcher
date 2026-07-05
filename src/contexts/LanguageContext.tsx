import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language routing is directory-based:
 *   English → bare paths ("/", "/blog/foo")
 *   Arabic  → "/ar" prefix ("/ar", "/ar/blog/foo")
 *
 * The `?lang=` query parameter is legacy — Vercel now 308-redirects
 * `?lang=ar` to `/ar/*`, but we still accept it here as a fallback so
 * old inbound links render the correct language before the redirect
 * fires (or in dev where Vercel rules don't run).
 */
const isArabicPath = (pathname: string): boolean =>
  pathname === "/ar" || pathname.startsWith("/ar/");

const stripArabicPrefix = (pathname: string): string => {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return pathname;
};

const addArabicPrefix = (pathname: string): string => {
  if (pathname === "/") return "/ar";
  return `/ar${pathname}`;
};

const readInitialLang = (): Language => {
  if (typeof window === "undefined") return "en";
  if (isArabicPath(window.location.pathname)) return "ar";
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "ar") return "ar";
  return "en";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(readInitialLang);

  // Toggling language swaps the URL pathname to the mirrored language
  // route (adds/strips the `/ar` prefix) and reloads so the prerendered
  // HTML for that language is served fresh — no query parameters.
  const toggleLang = useCallback(() => {
    if (typeof window === "undefined") {
      setLang((prev) => (prev === "en" ? "ar" : "en"));
      return;
    }
    const { pathname, search, hash } = window.location;
    const targetPathname = isArabicPath(pathname)
      ? stripArabicPrefix(pathname)
      : addArabicPrefix(pathname);
    // Drop any lingering ?lang= param from the query string.
    const params = new URLSearchParams(search);
    params.delete("lang");
    const nextSearch = params.toString();
    const nextUrl = `${targetPathname}${nextSearch ? `?${nextSearch}` : ""}${hash}`;
    window.location.assign(nextUrl);
  }, []);

  const t = useCallback((en: string, ar: string) => (lang === "en" ? en : ar), [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Keep <html lang> / <html dir> in sync with the active language.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Strip any legacy `?lang=` param from the visible URL — routing is
  // now driven entirely by the `/ar` path prefix.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has("lang")) return;
    url.searchParams.delete("lang");
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
