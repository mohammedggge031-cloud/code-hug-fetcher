/**
 * Auto-seed admin JSON config blobs (stored in `custom_scripts`) on first
 * authenticated dashboard load. Idempotent — only seeds when the blob is empty.
 *
 * IMPORTANT: We only run AFTER an authenticated session is available, otherwise
 * RLS blocks the INSERT silently and we'd cache a failed promise forever.
 */
import { supabase } from "@/integrations/supabase/client";
import { loadAdminConfig, saveAdminConfig } from "@/lib/adminConfig";

type SocialProfile = { id: string; platform: string; label: string; url: string; active: boolean };
type LeadChannel = { id: string; name: string; source: string; destination: string; notes: string; enabled: boolean };
type AdCampaign = { id: string; channel: string; campaign: string; landingUrl: string; utmSource: string; utmCampaign: string; status: "active" | "paused" };

const DEFAULT_SOCIAL: SocialProfile[] = [
  { id: "whatsapp", platform: "WhatsApp", label: "WhatsApp", url: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B", active: true },
  { id: "facebook", platform: "Facebook", label: "Facebook", url: "https://www.facebook.com/share/1BFyf4qMm8/", active: true },
  { id: "instagram", platform: "Instagram", label: "Instagram", url: "https://www.instagram.com/alhamdacademy_official", active: true },
  { id: "youtube", platform: "YouTube", label: "YouTube", url: "https://www.youtube.com/@alhamdacademy_official", active: true },
  { id: "tiktok", platform: "TikTok", label: "TikTok", url: "https://www.tiktok.com/@alhamdacademy_official", active: true },
];

const DEFAULT_CHANNELS: LeadChannel[] = [
  { id: "contact-form", name: "Main Contact Form", source: "website", destination: "receive-booking", notes: "Primary site form pushes booking payloads to the external dashboard.", enabled: true },
  { id: "trial-registration", name: "Trial Registration", source: "paid_social", destination: "receive-booking", notes: "Paid landing page reuses booking payload with UTM-derived source.", enabled: true },
  { id: "whatsapp", name: "WhatsApp Direct", source: "direct", destination: "wa.me", notes: "Opens WhatsApp for immediate manual lead capture.", enabled: true },
  { id: "google-ads", name: "Google Ads", source: "google_ads", destination: "receive-booking", notes: "Search/display campaigns tagged with utm_source=google.", enabled: true },
  { id: "facebook-ads", name: "Facebook / Instagram Ads", source: "meta_ads", destination: "receive-booking", notes: "Meta campaigns tagged with utm_source=facebook/instagram.", enabled: true },
  { id: "tiktok-ads", name: "TikTok Ads", source: "tiktok_ads", destination: "receive-booking", notes: "TikTok campaigns tagged with utm_source=tiktok.", enabled: true },
  { id: "email", name: "Email Inquiries", source: "direct", destination: "mailto", notes: "Routes inquiries to info@alhamdacademy.net.", enabled: true },
];

const DEFAULT_AD_CAMPAIGNS: AdCampaign[] = [
  { id: "camp-google-search", channel: "Google Ads", campaign: "Brand Search", landingUrl: "/free-trial", utmSource: "google", utmCampaign: "brand_search", status: "active" },
  { id: "camp-meta-trial", channel: "Facebook / Instagram", campaign: "Free Trial — Meta", landingUrl: "/trial-registration", utmSource: "facebook", utmCampaign: "free_trial", status: "active" },
  { id: "camp-tiktok-quran", channel: "TikTok", campaign: "Quran Reels", landingUrl: "/trial-registration", utmSource: "tiktok", utmCampaign: "quran_reels", status: "paused" },
];

let seedPromise: Promise<boolean> | null = null;

const seedOne = async <T>(name: string, value: T): Promise<boolean> => {
  const res = await saveAdminConfig(name, value);
  if (res?.error) {
    console.warn(`[adminSeed] ${name} write failed:`, res.error);
    return false;
  }
  console.info(`[adminSeed] ${name} seeded (${Array.isArray(value) ? value.length : "?"} items)`);
  return true;
};

/**
 * Ensure default admin config rows exist in `custom_scripts`.
 * Returns true if seeding succeeded (or nothing needed seeding).
 * On failure (e.g. RLS block before auth is ready) the cached promise is
 * cleared so the next call retries.
 */
export const ensureAdminSeed = (): Promise<boolean> => {
  if (seedPromise) return seedPromise;

  seedPromise = (async () => {
    try {
      // Bail out if not authenticated — RLS will reject the insert otherwise.
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        console.info("[adminSeed] no session — skipping seed");
        return false;
      }

      const [social, channels, campaigns, videos] = await Promise.all([
        loadAdminConfig<SocialProfile[]>("social_profiles", []),
        loadAdminConfig<LeadChannel[]>("lead_channels", []),
        loadAdminConfig<AdCampaign[]>("ad_campaigns", []),
        loadAdminConfig<unknown[]>("video_library", []),
      ]);

      const tasks: Promise<boolean>[] = [];
      if (!Array.isArray(social) || social.length === 0) {
        tasks.push(seedOne("social_profiles", DEFAULT_SOCIAL));
      }
      if (!Array.isArray(channels) || channels.length === 0) {
        tasks.push(seedOne("lead_channels", DEFAULT_CHANNELS));
      }
      if (!Array.isArray(campaigns) || campaigns.length === 0) {
        tasks.push(seedOne("ad_campaigns", DEFAULT_AD_CAMPAIGNS));
      }
      if (!Array.isArray(videos) || videos.length === 0) {
        const { videos: hardcoded } = await import("@/data/videos");
        const mapped = hardcoded.map((v) => ({
          id: v.id,
          titleEn: v.titleEn,
          titleAr: v.titleAr,
          descriptionEn: v.descriptionEn,
          descriptionAr: v.descriptionAr,
          youtubeId: v.youtubeId,
          category: v.category,
          categoryAr: v.categoryAr,
          language: v.language,
          isOurs: v.isOurs,
          placement: v.isOurs ? ["testimonials", "about_us"] : ["other"],
        }));
        tasks.push(seedOne("video_library", mapped));
      }

      if (tasks.length === 0) {
        console.info("[adminSeed] all config blobs already present");
        return true;
      }

      const results = await Promise.all(tasks);
      const ok = results.every(Boolean);
      if (!ok) {
        // Don't cache a failure — let the next call retry.
        seedPromise = null;
      }
      return ok;
    } catch (err) {
      console.warn("[adminSeed] failed:", err);
      seedPromise = null;
      return false;
    }
  })();

  return seedPromise;
};
