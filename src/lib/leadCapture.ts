/**
 * Lead capture: extracts UTM params from the current URL and appends a lead
 * entry to the local `lead_log` JSON store inside `custom_scripts`.
 *
 * This is ADDITIVE — it never blocks the existing `receive-booking` external
 * flow. It just gives the admin dashboard real data to show.
 */
import { loadAdminConfig, saveAdminConfig } from "@/lib/adminConfig";

export type CapturedLead = {
  id: string;
  name: string;
  contact: string; // phone | email | whatsapp
  source: string; // utm_source or "website"/"direct"
  campaign: string; // utm_campaign
  medium?: string;
  content?: string;
  status: "new" | "contacted" | "converted" | "lost";
  notes: string;
  created_at: string;
};

const KNOWN_PAID_HINTS = ["facebook", "instagram", "meta", "google", "tiktok", "snapchat", "youtube"];

const sanitize = (v: string | null | undefined, max = 80) =>
  (v ?? "").toString().trim().slice(0, max);

const SESSION_KEYS = {
  source: "alhamd_utm_source",
  campaign: "alhamd_utm_campaign",
  medium: "alhamd_utm_medium",
  content: "alhamd_utm_content",
} as const;

/** Persist UTMs in sessionStorage on first visit so they survive navigation. */
export const persistUtmFromUrl = () => {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  const map: Array<[keyof typeof SESSION_KEYS, string]> = [
    ["source", "utm_source"], ["campaign", "utm_campaign"],
    ["medium", "utm_medium"], ["content", "utm_content"],
  ];
  for (const [key, param] of map) {
    const v = sanitize(p.get(param));
    if (v) window.sessionStorage.setItem(SESSION_KEYS[key], v);
  }
};

/** Read UTMs from URL → sessionStorage → referrer. Falls back to "direct". */
export const readUtm = () => {
  if (typeof window === "undefined") {
    return { source: "website", campaign: "", medium: "", content: "" };
  }
  const p = new URLSearchParams(window.location.search);
  const ss = window.sessionStorage;
  let source = sanitize(p.get("utm_source") || ss.getItem(SESSION_KEYS.source)).toLowerCase();
  const campaign = sanitize(p.get("utm_campaign") || ss.getItem(SESSION_KEYS.campaign));
  const medium = sanitize(p.get("utm_medium") || ss.getItem(SESSION_KEYS.medium)).toLowerCase();
  const content = sanitize(p.get("utm_content") || ss.getItem(SESSION_KEYS.content));

  if (!source) {
    const ref = (document.referrer || "").toLowerCase();
    const hit = KNOWN_PAID_HINTS.find((h) => ref.includes(h));
    source = hit || (ref ? "referral" : "direct");
  }
  return { source: source || "direct", campaign, medium, content };
};

/** Append a lead to the `lead_log` JSON in custom_scripts. Best-effort. */
export const captureLead = async (
  input: { name: string; contact: string; notes?: string; sourceOverride?: string }
) => {
  try {
    const utm = readUtm();
    const entry: CapturedLead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: sanitize(input.name, 120) || "Anonymous",
      contact: sanitize(input.contact, 120),
      source: input.sourceOverride || utm.source,
      campaign: utm.campaign,
      medium: utm.medium,
      content: utm.content,
      status: "new",
      notes: sanitize(input.notes ?? "", 500),
      created_at: new Date().toISOString(),
    };

    const existing = await loadAdminConfig<CapturedLead[]>("lead_log", []);
    const next = Array.isArray(existing) ? [entry, ...existing].slice(0, 1000) : [entry];
    await saveAdminConfig("lead_log", next);
  } catch (err) {
    // Never break the submission flow on capture errors
    console.warn("captureLead failed:", err);
  }
};
