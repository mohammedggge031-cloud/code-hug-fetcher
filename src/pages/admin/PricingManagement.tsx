import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Save, Trash2, Wand2 } from "lucide-react";
import { FALLBACK_PACKAGES, type PackagesData, type Duration, type PricingTier } from "@/hooks/usePricingPlan";

interface PricingPlanRow {
  id: string;
  plan_name: string;
  average_hourly_rate: number;
  packages_data: PackagesData;
  is_active: boolean;
  updated_at: string;
}

const DURATIONS: Duration[] = ["30", "45", "60"];
const NUMERIC_FIELDS: (keyof PricingTier)[] = ["days", "hoursPerMonth", "monthly", "was", "semi", "annual"];

const computeAverageRate = (data: PackagesData): number => {
  let totalRevenue = 0;
  let totalHours = 0;
  DURATIONS.forEach((d) => {
    (data[d] || []).forEach((t) => {
      totalRevenue += Number(t.monthly) || 0;
      totalHours += Number(t.hoursPerMonth) || 0;
    });
  });
  return totalHours > 0 ? Math.round((totalRevenue / totalHours) * 100) / 100 : 0;
};

const scalePackagesToRate = (data: PackagesData, targetRate: number): PackagesData => {
  const current = computeAverageRate(data);
  if (current <= 0 || targetRate <= 0 || Math.abs(targetRate - current) < 0.005) return data;
  const factor = targetRate / current;
  const clone = JSON.parse(JSON.stringify(data)) as PackagesData;
  DURATIONS.forEach((d) => {
    (clone[d] || []).forEach((t) => {
      t.monthly = Math.max(1, Math.round(t.monthly * factor));
      t.was = Math.max(1, Math.round(t.was * factor));
      t.semi = Math.max(1, Math.round(t.semi * factor));
      t.annual = Math.max(1, Math.round(t.annual * factor));
    });
  });
  return clone;
};

const emptyPlan = (): PricingPlanRow => ({
  id: "",
  plan_name: "New Plan",
  average_hourly_rate: computeAverageRate(FALLBACK_PACKAGES),
  packages_data: JSON.parse(JSON.stringify(FALLBACK_PACKAGES)) as PackagesData,
  is_active: false,
  updated_at: new Date().toISOString(),
});

const db = supabase as unknown as {
  from: (t: string) => {
    select: (c: string) => {
      order: (c: string, o: { ascending: boolean }) => Promise<{ data: PricingPlanRow[] | null; error: unknown }>;
    };
    insert: (r: Partial<PricingPlanRow>) => { select: () => { single: () => Promise<{ data: PricingPlanRow | null; error: { message?: string } | null }> } };
    update: (r: Partial<PricingPlanRow>) => { eq: (c: string, v: string) => Promise<{ error: { message?: string } | null }> };
    delete: () => { eq: (c: string, v: string) => Promise<{ error: { message?: string } | null }> };
  };
};

const PricingManagement = () => {
  const [plans, setPlans] = useState<PricingPlanRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PricingPlanRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [targetAvgInput, setTargetAvgInput] = useState<string>("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await db.from("pricing_plans").select("*").order("created_at", { ascending: true });
    if (error) {
      toast({ title: "Failed to load pricing plans", description: "Run docs/manual-sql/pricing-plans.sql in Supabase.", variant: "destructive" });
    }
    const rows = data || [];
    setPlans(rows);
    if (rows.length && !selectedId) {
      setSelectedId(rows[0].id);
      setDraft(JSON.parse(JSON.stringify(rows[0])));
    }
    setLoading(false);
  };

  useEffect(() => { void load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const selectPlan = (id: string) => {
    const p = plans.find((x) => x.id === id);
    if (!p) return;
    setSelectedId(id);
    setDraft(JSON.parse(JSON.stringify(p)));
  };

  const updateTier = (dur: Duration, idx: number, field: keyof PricingTier, value: string | number | boolean) => {
    if (!draft) return;
    const clone = JSON.parse(JSON.stringify(draft)) as PricingPlanRow;
    const tier = clone.packages_data[dur][idx];
    if (field === "popular") {
      // ensure only one popular per duration
      clone.packages_data[dur].forEach((tt) => (tt.popular = false));
      tier.popular = Boolean(value);
    } else if (NUMERIC_FIELDS.includes(field)) {
      (tier as unknown as Record<string, number>)[field] = Number(value) || 0;
    } else {
      (tier as unknown as Record<string, string>)[field] = String(value);
    }
    clone.average_hourly_rate = computeAverageRate(clone.packages_data);
    setDraft(clone);
  };

  const savePlan = async () => {
    if (!draft) return;
    setSaving(true);
    const payload: Partial<PricingPlanRow> = {
      plan_name: draft.plan_name,
      average_hourly_rate: computeAverageRate(draft.packages_data),
      packages_data: draft.packages_data,
      is_active: draft.is_active,
    };
    if (draft.id) {
      const { error } = await db.from("pricing_plans").update(payload).eq("id", draft.id);
      if (error) toast({ title: "Update failed", description: error.message, variant: "destructive" });
      else toast({ title: "Plan saved" });
    } else {
      const { data, error } = await db.from("pricing_plans").insert(payload).select().single();
      if (error) toast({ title: "Create failed", description: error.message, variant: "destructive" });
      else if (data) {
        toast({ title: "Plan created" });
        setSelectedId(data.id);
      }
    }
    setSaving(false);
    await load();
  };

  const activatePlan = async (row: PricingPlanRow, active: boolean) => {
    const { error } = await db.from("pricing_plans").update({ is_active: active }).eq("id", row.id);
    if (error) {
      toast({ title: "Activation failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: active ? `Activated: ${row.plan_name}` : `Deactivated: ${row.plan_name}` });
    await load();
    if (draft?.id === row.id) setDraft((d) => (d ? { ...d, is_active: active } : d));
  };

  const deletePlan = async (row: PricingPlanRow) => {
    if (!confirm(`Delete plan "${row.plan_name}"?`)) return;
    const { error } = await db.from("pricing_plans").delete().eq("id", row.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Plan deleted" });
    if (selectedId === row.id) {
      setSelectedId(null);
      setDraft(null);
    }
    await load();
  };

  const startNewPlan = () => {
    const np = emptyPlan();
    setSelectedId(null);
    setDraft(np);
  };

  const liveAverage = useMemo(() => (draft ? computeAverageRate(draft.packages_data) : 0), [draft]);

  return (
    <div className="space-y-6" dir="ltr">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pricing Management</h1>
          <p className="text-sm text-muted-foreground">
            One plan can be active at a time. Activating a plan instantly updates the public site.
          </p>
        </div>
        <Button onClick={startNewPlan} className="gap-2"><Plus className="w-4 h-4" /> New Plan</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Plans</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {plans.map((p) => (
                <div key={p.id} className={`rounded-lg border p-3 ${selectedId === p.id ? "border-primary bg-primary/5" : "border-border"}`}>
                  <button className="text-left w-full" onClick={() => selectPlan(p.id)}>
                    <div className="font-semibold text-sm text-foreground">{p.plan_name}</div>
                    <div className="text-xs text-muted-foreground">
                      Avg ${Number(p.average_hourly_rate).toFixed(2)}/hr
                    </div>
                  </button>
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center gap-2 text-xs">
                      <Switch checked={p.is_active} onCheckedChange={(v) => activatePlan(p, v)} />
                      <span className={p.is_active ? "text-primary font-semibold" : "text-muted-foreground"}>
                        {p.is_active ? "LIVE" : "Inactive"}
                      </span>
                    </label>
                    <Button variant="ghost" size="icon" onClick={() => deletePlan(p)} aria-label="Delete plan">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {plans.length === 0 && (
                <p className="text-xs text-muted-foreground">No plans yet. Run docs/manual-sql/pricing-plans.sql first.</p>
              )}
            </CardContent>
          </Card>

          {draft && (
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">{draft.id ? "Edit Plan" : "New Plan"}</CardTitle>
                <div className="text-sm text-muted-foreground">Computed avg: <span className="font-bold text-foreground">${liveAverage.toFixed(2)}/hr</span></div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Plan name</Label>
                    <Input value={draft.plan_name} onChange={(e) => setDraft({ ...draft, plan_name: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <Switch checked={draft.is_active} onCheckedChange={(v) => setDraft({ ...draft, is_active: v })} />
                    <span className="text-sm">Active (deploys live)</span>
                  </div>
                </div>

                {DURATIONS.map((dur) => (
                  <div key={dur} className="space-y-2">
                    <h3 className="font-semibold text-sm text-foreground">{dur} minute sessions</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-2 text-left">Days/wk</th>
                            <th className="p-2 text-left">Hrs/mo</th>
                            <th className="p-2 text-left">Monthly $</th>
                            <th className="p-2 text-left">Was $</th>
                            <th className="p-2 text-left">6-mo $</th>
                            <th className="p-2 text-left">Save 6m</th>
                            <th className="p-2 text-left">12-mo $</th>
                            <th className="p-2 text-left">Save 12m</th>
                            <th className="p-2 text-left">Popular</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(draft.packages_data[dur] || []).map((tier, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="p-1"><Input className="h-8" type="number" value={tier.days} onChange={(e) => updateTier(dur, idx, "days", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" type="number" value={tier.hoursPerMonth} onChange={(e) => updateTier(dur, idx, "hoursPerMonth", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" type="number" value={tier.monthly} onChange={(e) => updateTier(dur, idx, "monthly", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" type="number" value={tier.was} onChange={(e) => updateTier(dur, idx, "was", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" type="number" value={tier.semi} onChange={(e) => updateTier(dur, idx, "semi", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" value={tier.semiSave} onChange={(e) => updateTier(dur, idx, "semiSave", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" type="number" value={tier.annual} onChange={(e) => updateTier(dur, idx, "annual", e.target.value)} /></td>
                              <td className="p-1"><Input className="h-8" value={tier.annualSave} onChange={(e) => updateTier(dur, idx, "annualSave", e.target.value)} /></td>
                              <td className="p-1 text-center"><Switch checked={!!tier.popular} onCheckedChange={(v) => updateTier(dur, idx, "popular", v)} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button onClick={savePlan} disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingManagement;
