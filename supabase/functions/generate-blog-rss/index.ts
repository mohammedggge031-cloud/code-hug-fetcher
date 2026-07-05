import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://www.alhamdacademy.net";
const FEED_TITLE = "Alhamd Academy — Blog";
const FEED_DESCRIPTION = "Latest articles from Alhamd Academy on online Quran, Arabic, and Islamic studies.";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, title_en, title_ar, excerpt_en, excerpt_ar, featured_image, published_at, updated_at, created_at, author")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(50);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lastBuildDate = new Date().toUTCString();

    const items = (posts || [])
      .map((p: any) => {
        const title = p.title_en || p.title_ar || "Untitled";
        const desc = p.excerpt_en || p.excerpt_ar || "";
        const link = `${BASE_URL}/blog/${p.slug}`;
        const pubDate = new Date(p.published_at || p.created_at).toUTCString();
        return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(desc)}</description>
      ${p.author ? `<author>noreply@alhamdacademy.net (${escapeXml(p.author)})</author>` : ""}
      ${p.featured_image ? `<enclosure url="${escapeXml(p.featured_image)}" type="image/jpeg" />` : ""}
    </item>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE_URL}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
