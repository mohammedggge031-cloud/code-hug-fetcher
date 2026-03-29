import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const INDEXNOW_KEY = "e7dc8d90badf93778b26df853c852411";
const HOST = "alhamdacademy.net";

const ALL_URLS = [
  // Homepage
  "/",
  // Courses
  "/courses/quran-course", "/courses/tajweed-course", "/courses/arabic-course",
  "/courses/islamic-studies", "/courses/all-in-one-course",
  // Services
  "/online-quran-classes", "/tajweed-course-online", "/quran-memorization-hifz",
  "/arabic-for-kids", "/arabic-for-adults", "/islamic-studies-online",
  "/ijazah-program", "/female-quran-teacher", "/free-trial",
  "/blog", "/videos",
  // Location hub
  "/learn-quran-online-worldwide",
  // Countries
  "/learn-quran-online-usa", "/learn-quran-online-canada", "/learn-quran-online-uk",
  "/learn-quran-online-australia", "/learn-quran-online-germany", "/learn-quran-online-france",
  "/learn-quran-online-netherlands", "/learn-quran-online-sweden", "/learn-quran-online-norway",
  "/learn-quran-online-denmark", "/learn-quran-online-belgium", "/learn-quran-online-switzerland",
  "/learn-quran-online-ireland",
  // US Cities
  "/learn-quran-online-new-york", "/learn-quran-online-los-angeles", "/learn-quran-online-chicago",
  "/learn-quran-online-houston", "/learn-quran-online-dallas", "/learn-quran-online-san-francisco",
  "/learn-quran-online-miami", "/learn-quran-online-seattle", "/learn-quran-online-boston",
  "/learn-quran-online-washington-dc",
  // Canada Cities
  "/learn-quran-online-toronto", "/learn-quran-online-vancouver", "/learn-quran-online-montreal",
  "/learn-quran-online-calgary", "/learn-quran-online-ottawa",
  // UK Cities
  "/learn-quran-online-london", "/learn-quran-online-manchester", "/learn-quran-online-birmingham",
  "/learn-quran-online-leeds", "/learn-quran-online-glasgow",
  // Europe Cities
  "/learn-quran-online-berlin", "/learn-quran-online-paris", "/learn-quran-online-amsterdam",
  "/learn-quran-online-stockholm", "/learn-quran-online-oslo", "/learn-quran-online-zurich",
  "/learn-quran-online-brussels", "/learn-quran-online-dublin",
];

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json().catch(() => ({ urls: null }));
    
    // Use provided URLs or default to all URLs
    const urlList = (urls && Array.isArray(urls) && urls.length > 0) 
      ? urls 
      : ALL_URLS.map(path => `https://${HOST}${path}`);

    // Ensure full URLs
    const fullUrls = urlList.map((u: string) => 
      u.startsWith("http") ? u : `https://${HOST}${u}`
    );

    // IndexNow supports batch submission (max 10,000 URLs)
    // Submit to Bing/Yandex IndexNow endpoint
    const indexNowPayload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    };

    const results: Record<string, string> = {};

    // Submit to IndexNow (Bing + Yandex + others)
    const indexNowEndpoints = [
      "https://api.indexnow.org/indexnow",
      "https://www.bing.com/indexnow",
      "https://yandex.com/indexnow",
    ];

    for (const endpoint of indexNowEndpoints) {
      try {
        const resp = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(indexNowPayload),
        });
        results[endpoint] = `${resp.status} ${resp.statusText}`;
      } catch (e) {
        results[endpoint] = `Error: ${e.message}`;
      }
    }

    // Ping Google with sitemap URLs
    const sitemapUrls = [
      `https://${HOST}/sitemap.xml`,
      `https://${HOST}/sitemap-main.xml`,
      `https://${HOST}/sitemap-blog.xml`,
      `https://${HOST}/sitemap-locations.xml`,
    ];

    for (const sitemapUrl of sitemapUrls) {
      try {
        const resp = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
        results[`google-ping:${sitemapUrl.split('/').pop()}`] = `${resp.status}`;
      } catch (e) {
        results[`google-ping:${sitemapUrl.split('/').pop()}`] = `Error: ${e.message}`;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        urlsSubmitted: fullUrls.length,
        results,
        message: `Submitted ${fullUrls.length} URLs to IndexNow + pinged Google sitemaps`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
