/**
 * Regression tests for api/prerender.ts.
 *
 * These lock in the routing rule that `path` wins over `slug` — Vercel
 * forwards named source params (e.g. `/courses/:slug`) into the destination
 * query string, so without this rule `/courses/tajweed-course` would be
 * hijacked into the blog-post branch and return 404 with a `/blog/*`
 * canonical.
 */
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import handler from "../../api/prerender";

const TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Alhamd Academy</title>
    <meta name="description" content="Default description" />
    <link rel="canonical" href="https://www.alhamdacademy.net/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.alhamdacademy.net/" />
    <meta property="og:title" content="Alhamd Academy" />
    <meta property="og:description" content="Default" />
    <meta property="og:image" content="https://www.alhamdacademy.net/og-image.jpg" />
    <meta property="og:image:alt" content="Alhamd Academy" />
    <meta name="twitter:title" content="Alhamd Academy" />
    <meta name="twitter:description" content="Default" />
    <meta name="twitter:image" content="https://www.alhamdacademy.net/og-image.jpg" />
    <meta name="twitter:image:alt" content="Alhamd Academy" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>`;

type MockRes = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  setHeader: (k: string, v: string) => MockRes;
  status: (code: number) => MockRes;
  send: (body: any) => MockRes;
};

const makeRes = (): MockRes => {
  const res: MockRes = {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; return this; },
    status(code) { this.statusCode = code; return this; },
    send(body) { this.body = typeof body === "string" ? body : JSON.stringify(body); return this; },
  };
  return res;
};

const makeReq = (query: Record<string, string>) => ({
  query,
  headers: { host: "www.alhamdacademy.net" },
});

/**
 * Route every fetch the handler makes:
 *  - PostgREST /blog_posts  → returns a matching post row iff slug matches
 *  - PostgREST /seo_metadata → returns provided override rows keyed by page_path
 *  - Any /index.html         → returns the mock TEMPLATE
 */
function installFetchMock(opts: {
  posts?: Record<string, any>;
  seoByPath?: Record<string, any>;
  templateStatus?: number;
} = {}) {
  const posts = opts.posts ?? {};
  const seoByPath = opts.seoByPath ?? {};
  const templateStatus = opts.templateStatus ?? 200;

  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();

    if (url.includes("/rest/v1/blog_posts")) {
      const m = url.match(/slug=eq\.([^&]+)/);
      const slug = m ? decodeURIComponent(m[1]) : "";
      const row = posts[slug];
      return new Response(JSON.stringify(row ? [row] : []), { status: 200 });
    }

    if (url.includes("/rest/v1/seo_metadata")) {
      const m = url.match(/page_path=eq\.([^&]+)/);
      const path = m ? decodeURIComponent(m[1]) : "";
      const row = seoByPath[path];
      return new Response(JSON.stringify(row ? [row] : []), { status: 200 });
    }

    if (url.endsWith("/app.html") || url.endsWith("/index.html")) {
      return new Response(templateStatus === 200 ? TEMPLATE : "", { status: templateStatus });
    }

    return new Response("not found", { status: 404 });
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("api/prerender routing", () => {
  it("treats /courses/:slug as a page even when Vercel forwards `slug` to the query", async () => {
    installFetchMock({
      // Trap: if the handler took the blog branch, this row would surface
      // as a real post and the response would carry /blog/tajweed-course
      // canonical + og:type=article.
      posts: {
        "tajweed-course": { slug: "tajweed-course", title_en: "SHOULD NOT APPEAR", published_at: "2026-01-01" },
      },
      seoByPath: {
        "/courses/tajweed-course": { title: "Tajweed Course Online | Alhamd Academy", description: "Learn tajweed with certified teachers." },
      },
    });

    const req = makeReq({ path: "/courses/tajweed-course", slug: "tajweed-course" });
    const res = makeRes();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("<title>Tajweed Course Online | Alhamd Academy</title>");
    expect(res.body).toContain('href="https://www.alhamdacademy.net/courses/tajweed-course"');
    expect(res.body).toContain('content="website"');
    expect(res.body).not.toContain('content="article"');
    expect(res.body).not.toContain("/blog/tajweed-course");
    expect(res.body).not.toContain("SHOULD NOT APPEAR");
  });

  it("still renders /blog/:slug as an article when only `slug` is present", async () => {
    installFetchMock({
      posts: {
        "my-first-post": {
          slug: "my-first-post",
          title_en: "My First Post",
          excerpt_en: "An excerpt.",
          featured_image: "https://cdn.example.com/img.jpg",
          published_at: "2026-05-01T00:00:00Z",
          updated_at: "2026-05-02T00:00:00Z",
        },
      },
    });

    const req = makeReq({ slug: "my-first-post" });
    const res = makeRes();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("<title>My First Post | Alhamd Academy</title>");
    expect(res.body).toContain('href="https://www.alhamdacademy.net/blog/my-first-post"');
    expect(res.body).toContain('content="article"');
    expect(res.body).toContain('"@type":"Article"');
  });

  it("returns 404 with noindex fallback when a blog slug does not exist", async () => {
    installFetchMock({ posts: {} });

    const req = makeReq({ slug: "does-not-exist" });
    const res = makeRes();
    await handler(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.body).toContain("noindex");
    expect(res.body).toContain("Article not found");
  });

  it("applies lang/hreflang defaults when a page path has no seo_metadata row", async () => {
    installFetchMock({ seoByPath: {} });

    const req = makeReq({ path: "/videos" });
    const res = makeRes();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    // SPA bundle survives the rewrite
    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('src="/assets/index.js"');
    // Fallback still sets html lang + hreflang alternates on the response
    expect(res.body).toMatch(/<html[^>]*lang="en"/);
    expect(res.body).toContain('hreflang="ar"');
    expect(res.body).toContain('hreflang="x-default"');
    expect(res.body).toContain('href="https://www.alhamdacademy.net/videos"');
  });

  it("switches <html lang> and dir to Arabic when ?lang=ar is present", async () => {
    installFetchMock({
      seoByPath: {
        "/free-trial": { title: "Free Trial", description: "Book a class." },
      },
    });

    const req = makeReq({ path: "/free-trial", lang: "ar" });
    const res = makeRes();
    await handler(req, res);

    expect(res.body).toMatch(/<html[^>]*lang="ar"/);
    expect(res.body).toMatch(/<html[^>]*dir="rtl"/);
    expect(res.body).toContain('content="ar_AR"');
  });

  it("emits exactly one hreflang link per language + x-default (en is bare canonical, ar carries ?lang=ar)", async () => {
    installFetchMock({
      posts: { p: { slug: "p", title_en: "P", published_at: "2026-05-01T00:00:00Z" } },
    });

    const req = makeReq({ slug: "p" });
    const res = makeRes();
    await handler(req, res);

    const en = (res.body.match(/hreflang="en"/g) || []).length;
    const ar = (res.body.match(/hreflang="ar"/g) || []).length;
    const xd = (res.body.match(/hreflang="x-default"/g) || []).length;
    expect(en).toBe(1);
    expect(ar).toBe(1);
    expect(xd).toBe(1);
    // English default: bare canonical, no ?lang= parameter
    expect(res.body).not.toContain("?lang=en");
    expect(res.body).toContain(
      '<link rel="alternate" hreflang="en" href="https://www.alhamdacademy.net/blog/p" />',
    );
    expect(res.body).toContain(
      '<link rel="alternate" hreflang="x-default" href="https://www.alhamdacademy.net/blog/p" />',
    );
    // Arabic override: canonical + ?lang=ar
    expect(res.body).toContain(
      '<link rel="alternate" hreflang="ar" href="https://www.alhamdacademy.net/blog/p?lang=ar" />',
    );
  });

  it("injects per-page title/canonical/og for landing pages", async () => {
    installFetchMock({
      seoByPath: {
        "/free-trial": {
          title: "Free Trial Class | Alhamd Academy",
          description: "Book a free 30-minute trial.",
          og_image: "https://www.alhamdacademy.net/free-trial-og.jpg",
        },
      },
    });

    const req = makeReq({ path: "/free-trial" });
    const res = makeRes();
    await handler(req, res);

    expect(res.body).toContain("<title>Free Trial Class | Alhamd Academy</title>");
    expect(res.body).toContain('content="Book a free 30-minute trial."');
    expect(res.body).toContain('href="https://www.alhamdacademy.net/free-trial"');
    expect(res.body).toContain('content="https://www.alhamdacademy.net/free-trial-og.jpg"');
  });

  it("rejects malformed path with 400", async () => {
    installFetchMock();

    const req = makeReq({ path: "not-a-valid-path" });
    const res = makeRes();
    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("keeps the SPA bundle script tag intact on the blog branch", async () => {
    installFetchMock({
      posts: { p: { slug: "p", title_en: "P", published_at: "2026-05-01T00:00:00Z" } },
    });

    const req = makeReq({ slug: "p" });
    const res = makeRes();
    await handler(req, res);

    expect(res.body).toContain('src="/assets/index.js"');
    expect(res.body).toContain('<div id="root">');
  });
});
