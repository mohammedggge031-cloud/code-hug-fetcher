import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Duration = "30" | "45" | "60";

export interface PricingTier {
  days: number;
  hoursPerMonth: number;
  monthly: number;
  was: number;
  semi: number;
  semiSave: string;
  annual: number;
  annualSave: string;
  popular?: boolean;
}

export type PackagesData = Record<Duration, PricingTier[]>;

export const FALLBACK_PACKAGES: PackagesData = {
  "30": [
    { days: 1, hoursPerMonth: 2, monthly: 20, was: 24, semi: 113, semiSave: "6%", annual: 206, annualSave: "14%" },
    { days: 2, hoursPerMonth: 4, monthly: 38, was: 45, semi: 214, semiSave: "6%", annual: 392, annualSave: "14%" },
    { days: 3, hoursPerMonth: 6, monthly: 54, was: 64, semi: 305, semiSave: "6%", annual: 557, annualSave: "14%", popular: true },
    { days: 4, hoursPerMonth: 8, monthly: 69, was: 82, semi: 389, semiSave: "6%", annual: 712, annualSave: "14%" },
    { days: 5, hoursPerMonth: 10, monthly: 83, was: 98, semi: 468, semiSave: "6%", annual: 857, annualSave: "14%" },
  ],
  "45": [
    { days: 1, hoursPerMonth: 3, monthly: 29, was: 35, semi: 164, semiSave: "6%", annual: 299, annualSave: "14%" },
    { days: 2, hoursPerMonth: 6, monthly: 55, was: 65, semi: 310, semiSave: "6%", annual: 567, annualSave: "14%" },
    { days: 3, hoursPerMonth: 9, monthly: 78, was: 92, semi: 440, semiSave: "6%", annual: 805, annualSave: "14%", popular: true },
    { days: 4, hoursPerMonth: 12, monthly: 99, was: 117, semi: 558, semiSave: "6%", annual: 1022, annualSave: "14%" },
    { days: 5, hoursPerMonth: 15, monthly: 122, was: 144, semi: 688, semiSave: "6%", annual: 1259, annualSave: "14%" },
  ],
  "60": [
    { days: 1, hoursPerMonth: 4, monthly: 38, was: 45, semi: 214, semiSave: "6%", annual: 392, annualSave: "14%" },
    { days: 2, hoursPerMonth: 8, monthly: 72, was: 85, semi: 406, semiSave: "6%", annual: 743, annualSave: "14%" },
    { days: 3, hoursPerMonth: 12, monthly: 102, was: 121, semi: 575, semiSave: "6%", annual: 1053, annualSave: "14%", popular: true },
    { days: 4, hoursPerMonth: 16, monthly: 131, was: 155, semi: 739, semiSave: "6%", annual: 1352, annualSave: "14%" },
    { days: 5, hoursPerMonth: 20, monthly: 160, was: 189, semi: 902, semiSave: "6%", annual: 1651, annualSave: "14%" },
  ],
};

/**
 * Fetch the single active pricing plan from Supabase. Falls back to hardcoded
 * baseline instantly on any error / timeout so the section always renders.
 */
export function useActivePricingPackages(): PackagesData {
  const [packages, setPackages] = useState<PackagesData>(FALLBACK_PACKAGES);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await (supabase as unknown as {
          from: (t: string) => {
            select: (c: string) => {
              eq: (c: string, v: boolean) => {
                maybeSingle: () => Promise<{ data: { packages_data: PackagesData } | null; error: unknown }>;
              };
            };
          };
        })
          .from("pricing_plans")
          .select("packages_data")
          .eq("is_active", true)
          .maybeSingle();

        if (cancelled || error || !data?.packages_data) return;
        const pd = data.packages_data;
        if (pd["30"] && pd["45"] && pd["60"]) setPackages(pd);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return packages;
}
