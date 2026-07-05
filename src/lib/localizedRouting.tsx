/**
 * Language-preserving routing helpers.
 *
 * The app mounts `<BrowserRouter basename="/ar">` when the user lands on an
 * Arabic URL, so React Router automatically:
 *   - Resolves `<Link to="/blog">` → `/ar/blog`
 *   - Resolves `navigate("/free-trial")` → `/ar/free-trial`
 *   - Strips the `/ar` prefix from `useLocation().pathname`
 *
 * The helpers below are the canonical, forward-looking API. They are thin
 * wrappers over react-router-dom so consumers can adopt them incrementally
 * without changing behavior — every existing absolute path stays language
 * aware for free thanks to the basename.
 */
import * as React from "react";
import {
  Link,
  useNavigate,
  type LinkProps,
  type NavigateOptions,
  type To,
} from "react-router-dom";

const AR_PREFIX = "/ar";

export const isArabicPathname = (pathname: string): boolean =>
  pathname === AR_PREFIX || pathname.startsWith(`${AR_PREFIX}/`);

/**
 * Compute the router basename from the current URL. Called once at mount so
 * every `<Link>` / `useNavigate` call preserves the active language directory
 * for the lifetime of the page (language switches trigger a full reload).
 */
export const detectBasename = (): "" | typeof AR_PREFIX => {
  if (typeof window === "undefined") return "";
  return isArabicPathname(window.location.pathname) ? AR_PREFIX : "";
};

/** Prefix an absolute path with `/ar` when appropriate. Idempotent. */
export const withLangPrefix = (path: string, lang: "en" | "ar"): string => {
  if (lang !== "ar") return path;
  if (!path.startsWith("/")) return path;
  if (path === AR_PREFIX || path.startsWith(`${AR_PREFIX}/`)) return path;
  if (path.startsWith("/admin")) return path; // admin console is language-neutral
  return path === "/" ? AR_PREFIX : `${AR_PREFIX}${path}`;
};

/**
 * Drop-in replacement for react-router-dom's `<Link>`. Behavior is identical
 * because the router's `basename` already handles the `/ar` prefix, but this
 * export exists so components can opt into a name that documents intent.
 */
export const LocalizedLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
);
LocalizedLink.displayName = "LocalizedLink";

/**
 * Drop-in replacement for `useNavigate` that always keeps the user inside
 * their active language directory.
 */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  return React.useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        navigate(to);
        return;
      }
      navigate(to as To, options);
    },
    [navigate],
  );
};
