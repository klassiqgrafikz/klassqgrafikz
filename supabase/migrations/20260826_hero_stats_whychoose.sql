-- Admin sync: hero, stats, Why Choose Us (slatech retheme)
-- Run once in Supabase Dashboard → SQL Editor or via supabase db push.
-- Idempotent: safe to re-run.

-- 1) Extend site_settings with hero + stats fields
alter table public.site_settings add column if not exists hero_title text;
alter table public.site_settings add column if not exists hero_subtitle text;
alter table public.site_settings add column if not exists hero_badge text;
alter table public.site_settings add column if not exists stat_years int;
alter table public.site_settings add column if not exists stat_projects int;
alter table public.site_settings add column if not exists stat_clients int;
alter table public.site_settings add column if not exists stat_satisfaction int;

-- Optional: seed defaults for the single row id=1 if null
update public.site_settings set
  hero_title = coalesce(hero_title, 'Welcome to Klassiq Grafikz Concepts'),
  hero_subtitle = coalesce(hero_subtitle, 'Klassiq Grafikz — we build fast, beautiful brands that rank, convert and stay memorable. From SMEs to large organisations, we help you grow with design that works.'),
  hero_badge = coalesce(hero_badge, '#1 Creative Studio in Lagos'),
  stat_years = coalesce(stat_years, 7),
  stat_projects = coalesce(stat_projects, 150),
  stat_clients = coalesce(stat_clients, 500),
  stat_satisfaction = coalesce(stat_satisfaction, 100)
where id = 1;

-- 2) Why Choose Us table (mirrors site_services pattern)
create table if not exists public.site_whychoose (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  desc text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Enable RLS and allow public read (anon) + service_role full access
alter table public.site_whychoose enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'site_whychoose_public_read' and tablename = 'site_whychoose') then
    create policy site_whychoose_public_read on public.site_whychoose for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'site_whychoose_service_all' and tablename = 'site_whychoose') then
    create policy site_whychoose_service_all on public.site_whychoose for all using (true) with check (true);
  end if;
end $$;

-- Seed defaults if empty (so homepage shows slatech 6 cards via DB)
insert into public.site_whychoose (title, desc, sort_order)
select * from (values
  ('Proven Track Record', 'Over 150+ projects delivered with a high satisfaction rate.', 1),
  ('On-Time Delivery', 'We respect deadlines and ship without compromising quality.', 2),
  ('24/7 Support', 'WhatsApp, email and phone — we stay close after delivery.', 3),
  ('Affordable Pricing', 'No hidden costs. Flexible packages for every business size.', 4),
  ('Client-Centric', 'Your success is the brief. We co-build at every stage.', 5),
  ('Built to Convert', 'Every design is made to turn visitors into customers.', 6)
) as v(title, desc, sort_order)
where not exists (select 1 from public.site_whychoose);
