/**
 * Auto-seed admin JSON config blobs (stored in `custom_scripts`) on first
 * dashboard load. Idempotent — only seeds when the blob is empty.
 *
 * This makes the dashboard counters reflect REAL configured data instead of
 * showing 0 just because the admin has never opened the sub-modules yet.
 */
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

let seedPromise: Promise<void> | null = null;

export const ensureAdminSeed = (): Promise<void> => {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    try {
      const [social, channels, campaigns, videos] = await Promise.all([
        loadAdminConfig<SocialProfile[]>("social_profiles", []),
        loadAdminConfig<LeadChannel[]>("lead_channels", []),
        loadAdminConfig<AdCampaign[]>("ad_campaigns", []),
        loadAdminConfig<unknown[]>("video_library", []),
      ]);

      const tasks: Promise<unknown>[] = [];
      if (!Array.isArray(social) || social.length === 0) {
        tasks.push(saveAdminConfig("social_profiles", DEFAULT_SOCIAL));
      }
      if (!Array.isArray(channels) || channels.length === 0) {
        tasks.push(saveAdminConfig("lead_channels", DEFAULT_CHANNELS));
      }
      if (!Array.isArray(campaigns) || campaigns.length === 0) {
        tasks.push(saveAdminConfig("ad_campaigns", DEFAULT_AD_CAMPAIGNS));
      }
      if (!Array.isArray(videos) || videos.length === 0) {
        // Lazy-import the hardcoded video catalog so we don't bloat dashboard chunk
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
        tasks.push(saveAdminConfig("video_library", mapped));
      }

      if (tasks.length > 0) {
        await Promise.all(tasks);
      }
    } catch (err) {
      console.warn("ensureAdminSeed failed:", err);
    }
  })();
  return seedPromise;
};
