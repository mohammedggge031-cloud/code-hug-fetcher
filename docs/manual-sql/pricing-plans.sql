-- =============================================================
-- Dynamic Pricing Plans — schema, RLS, single-active trigger, seed
-- Run once in the Supabase SQL Editor (safe to re-run: uses IF NOT EXISTS + ON CONFLICT).
-- =============================================================

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  plan_name text not null unique,
  average_hourly_rate numeric(5,2) not null,
  packages_data jsonb not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Data-API access (RLS still applies)
grant select on public.pricing_plans to anon, authenticated;
grant insert, update, delete on public.pricing_plans to authenticated;
grant all on public.pricing_plans to service_role;

alter table public.pricing_plans enable row level security;

drop policy if exists "Public can read pricing" on public.pricing_plans;
drop policy if exists "Admin/Editor can insert pricing" on public.pricing_plans;
drop policy if exists "Admin/Editor can update pricing" on public.pricing_plans;
drop policy if exists "Admin can delete pricing" on public.pricing_plans;

create policy "Public can read pricing"
  on public.pricing_plans for select using (true);

create policy "Admin/Editor can insert pricing"
  on public.pricing_plans for insert to authenticated
  with check (public.is_admin_or_editor(auth.uid()));

create policy "Admin/Editor can update pricing"
  on public.pricing_plans for update to authenticated
  using (public.is_admin_or_editor(auth.uid()));

create policy "Admin can delete pricing"
  on public.pricing_plans for delete to authenticated
  using (public.is_admin(auth.uid()));

-- updated_at trigger (reuses global helper)
drop trigger if exists update_pricing_plans_updated_at on public.pricing_plans;
create trigger update_pricing_plans_updated_at
  before update on public.pricing_plans
  for each row execute function public.update_updated_at_column();

-- Ensure only one plan is ever active
create or replace function public.enforce_single_active_pricing_plan()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_active then
    update public.pricing_plans
      set is_active = false
      where id <> new.id and is_active = true;
  end if;
  return new;
end;
$$;

drop trigger if exists pricing_plans_single_active on public.pricing_plans;
create trigger pricing_plans_single_active
  after insert or update of is_active on public.pricing_plans
  for each row
  when (new.is_active is true)
  execute function public.enforce_single_active_pricing_plan();

-- =============================================================
-- Seed: Plan A (Standard Baseline — CURRENT LIVE) + Plan B (Budget Alternative)
-- =============================================================

insert into public.pricing_plans (plan_name, average_hourly_rate, is_active, packages_data)
values (
  'Standard Baseline',
  8.90,
  true,
  '{
    "30": [
      {"days":1,"hoursPerMonth":2,"monthly":20,"was":24,"semi":113,"semiSave":"6%","annual":206,"annualSave":"14%"},
      {"days":2,"hoursPerMonth":4,"monthly":38,"was":45,"semi":214,"semiSave":"6%","annual":392,"annualSave":"14%"},
      {"days":3,"hoursPerMonth":6,"monthly":54,"was":64,"semi":305,"semiSave":"6%","annual":557,"annualSave":"14%","popular":true},
      {"days":4,"hoursPerMonth":8,"monthly":69,"was":82,"semi":389,"semiSave":"6%","annual":712,"annualSave":"14%"},
      {"days":5,"hoursPerMonth":10,"monthly":83,"was":98,"semi":468,"semiSave":"6%","annual":857,"annualSave":"14%"}
    ],
    "45": [
      {"days":1,"hoursPerMonth":3,"monthly":29,"was":35,"semi":164,"semiSave":"6%","annual":299,"annualSave":"14%"},
      {"days":2,"hoursPerMonth":6,"monthly":55,"was":65,"semi":310,"semiSave":"6%","annual":567,"annualSave":"14%"},
      {"days":3,"hoursPerMonth":9,"monthly":78,"was":92,"semi":440,"semiSave":"6%","annual":805,"annualSave":"14%","popular":true},
      {"days":4,"hoursPerMonth":12,"monthly":99,"was":117,"semi":558,"semiSave":"6%","annual":1022,"annualSave":"14%"},
      {"days":5,"hoursPerMonth":15,"monthly":122,"was":144,"semi":688,"semiSave":"6%","annual":1259,"annualSave":"14%"}
    ],
    "60": [
      {"days":1,"hoursPerMonth":4,"monthly":38,"was":45,"semi":214,"semiSave":"6%","annual":392,"annualSave":"14%"},
      {"days":2,"hoursPerMonth":8,"monthly":72,"was":85,"semi":406,"semiSave":"6%","annual":743,"annualSave":"14%"},
      {"days":3,"hoursPerMonth":12,"monthly":102,"was":121,"semi":575,"semiSave":"6%","annual":1053,"annualSave":"14%","popular":true},
      {"days":4,"hoursPerMonth":16,"monthly":131,"was":155,"semi":739,"semiSave":"6%","annual":1352,"annualSave":"14%"},
      {"days":5,"hoursPerMonth":20,"monthly":160,"was":189,"semi":902,"semiSave":"6%","annual":1651,"annualSave":"14%"}
    ]
  }'::jsonb
)
on conflict (plan_name) do update set
  average_hourly_rate = excluded.average_hourly_rate,
  packages_data       = excluded.packages_data,
  updated_at          = now();

insert into public.pricing_plans (plan_name, average_hourly_rate, is_active, packages_data)
values (
  'Budget Alternative',
  6.20,
  false,
  '{
    "30": [
      {"days":1,"hoursPerMonth":2,"monthly":14,"was":17,"semi":79,"semiSave":"6%","annual":144,"annualSave":"14%"},
      {"days":2,"hoursPerMonth":4,"monthly":27,"was":32,"semi":152,"semiSave":"6%","annual":279,"annualSave":"14%"},
      {"days":3,"hoursPerMonth":6,"monthly":39,"was":46,"semi":220,"semiSave":"6%","annual":402,"annualSave":"14%","popular":true},
      {"days":4,"hoursPerMonth":8,"monthly":50,"was":60,"semi":282,"semiSave":"6%","annual":516,"annualSave":"14%"},
      {"days":5,"hoursPerMonth":10,"monthly":60,"was":71,"semi":338,"semiSave":"6%","annual":619,"annualSave":"14%"}
    ],
    "45": [
      {"days":1,"hoursPerMonth":3,"monthly":20,"was":24,"semi":113,"semiSave":"6%","annual":206,"annualSave":"14%"},
      {"days":2,"hoursPerMonth":6,"monthly":39,"was":46,"semi":220,"semiSave":"6%","annual":402,"annualSave":"14%"},
      {"days":3,"hoursPerMonth":9,"monthly":56,"was":67,"semi":316,"semiSave":"6%","annual":578,"annualSave":"14%","popular":true},
      {"days":4,"hoursPerMonth":12,"monthly":73,"was":87,"semi":412,"semiSave":"6%","annual":754,"annualSave":"14%"},
      {"days":5,"hoursPerMonth":15,"monthly":90,"was":107,"semi":508,"semiSave":"6%","annual":929,"annualSave":"14%"}
    ],
    "60": [
      {"days":1,"hoursPerMonth":4,"monthly":26,"was":31,"semi":147,"semiSave":"6%","annual":268,"annualSave":"14%"},
      {"days":2,"hoursPerMonth":8,"monthly":50,"was":60,"semi":282,"semiSave":"6%","annual":516,"annualSave":"14%"},
      {"days":3,"hoursPerMonth":12,"monthly":73,"was":87,"semi":412,"semiSave":"6%","annual":753,"annualSave":"14%","popular":true},
      {"days":4,"hoursPerMonth":16,"monthly":96,"was":114,"semi":542,"semiSave":"6%","annual":990,"annualSave":"14%"},
      {"days":5,"hoursPerMonth":20,"monthly":118,"was":140,"semi":666,"semiSave":"6%","annual":1218,"annualSave":"14%"}
    ]
  }'::jsonb
)
on conflict (plan_name) do update set
  average_hourly_rate = excluded.average_hourly_rate,
  packages_data       = excluded.packages_data,
  updated_at          = now();
