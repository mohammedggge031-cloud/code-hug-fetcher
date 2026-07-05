/**
 * Reads server-inlined data from <script id="__ALHAMD_DATA__" type="application/json">
 * injected by api/prerender.ts. Lets client hooks skip redundant Supabase calls
 * on the first paint when the prerender already fetched the data.
 */

interface AlhamdInlineData {
  seo?: Record<string, unknown | null>;
  recentPosts?: unknown[] | null;
}

let cached: AlhamdInlineData | null | undefined;

function read(): AlhamdInlineData | null {
  if (typeof document === "undefined") return null;
  if (cached !== undefined) return cached;
  try {
    const el = document.getElementById("__ALHAMD_DATA__");
    if (!el?.textContent) {
      cached = null;
      return null;
    }
    cached = JSON.parse(el.textContent) as AlhamdInlineData;
    return cached;
  } catch {
    cached = null;
    return null;
  }
}

export function getInlineSeo<T = unknown>(pagePath: string): T | null {
  const data = read();
  const row = data?.seo?.[pagePath];
  return (row as T | undefined) ?? null;
}

export function getInlineRecentPosts<T = unknown>(): T[] | null {
  const data = read();
  const list = data?.recentPosts;
  return Array.isArray(list) ? (list as T[]) : null;
}
