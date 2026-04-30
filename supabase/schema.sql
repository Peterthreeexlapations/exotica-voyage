-- Exotica Voyage Group — initial schema (v1.0)
-- Run this once in the Supabase SQL editor.
-- See PRD §6 for the spec this implements.

------------------------------------------------------------
-- Extensions
------------------------------------------------------------
create extension if not exists "pgcrypto";

------------------------------------------------------------
-- vehicles
------------------------------------------------------------
create table if not exists public.vehicles (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  make          text not null,
  model         text not null,
  year          int not null check (year between 1950 and 2100),
  category      text not null check (category in ('hypercar','supercar','convertible','suv','grand-tourer','sedan')),
  daily_rate    numeric(10,2) not null,
  weekly_rate   numeric(10,2),
  horsepower    int,
  top_speed_mph int,
  zero_to_sixty numeric(3,1),
  transmission  text,
  seats         int,
  description   text,
  featured      boolean not null default false,
  available     boolean not null default true,
  location      text not null default 'Miami, FL',
  created_at    timestamptz not null default now()
);

create index if not exists vehicles_category_idx on public.vehicles(category);
create index if not exists vehicles_available_idx on public.vehicles(available);
create index if not exists vehicles_featured_idx on public.vehicles(featured);

------------------------------------------------------------
-- vehicle_media
------------------------------------------------------------
create table if not exists public.vehicle_media (
  id          uuid primary key default gen_random_uuid(),
  vehicle_id  uuid not null references public.vehicles(id) on delete cascade,
  url         text not null,
  alt_text    text,
  sort_order  int not null default 0,
  is_hero     boolean not null default false
);

create index if not exists vehicle_media_vehicle_idx on public.vehicle_media(vehicle_id);

-- Only one hero photo per vehicle (PRD §6.1)
create unique index if not exists vehicle_media_one_hero_per_vehicle
  on public.vehicle_media(vehicle_id) where is_hero = true;

------------------------------------------------------------
-- inquiries (provisioned for v2; unused by public site in v1)
------------------------------------------------------------
create table if not exists public.inquiries (
  id              uuid primary key default gen_random_uuid(),
  vehicle_id      uuid references public.vehicles(id) on delete set null,
  name            text not null,
  email           text,
  phone           text,
  requested_dates text,
  message         text,
  status          text not null default 'new' check (status in ('new','contacted','booked','closed')),
  created_at      timestamptz not null default now()
);

------------------------------------------------------------
-- Row-Level Security  (PRD §6.2)
------------------------------------------------------------
alter table public.vehicles enable row level security;
alter table public.vehicle_media enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "vehicles public read" on public.vehicles;
create policy "vehicles public read"
  on public.vehicles for select to anon, authenticated
  using (true);

drop policy if exists "vehicle_media public read" on public.vehicle_media;
create policy "vehicle_media public read"
  on public.vehicle_media for select to anon, authenticated
  using (true);

drop policy if exists "inquiries public insert" on public.inquiries;
create policy "inquiries public insert"
  on public.inquiries for insert to anon, authenticated
  with check (true);

drop policy if exists "inquiries auth read" on public.inquiries;
create policy "inquiries auth read"
  on public.inquiries for select to authenticated
  using (true);

------------------------------------------------------------
-- Seed data — 5 vehicles using Unsplash placeholder photography
-- Real photos will replace these via the Supabase Storage UI.
------------------------------------------------------------
insert into public.vehicles
  (slug, make, model, year, category, daily_rate, weekly_rate, horsepower, top_speed_mph, zero_to_sixty, transmission, seats, description, featured, available, location)
values
  ('lamborghini-huracan-evo-spyder', 'Lamborghini', 'Huracán EVO Spyder', 2024, 'supercar', 1995, 11500, 631, 202, 3.1, '7-speed dual-clutch', 2,
   'The Huracán EVO Spyder is the open-top expression of Sant''Agata''s naturally-aspirated V10 — a car as theatrical as it is fast. Delivered with a full tank, detailed by hand, and pre-warmed for sunset on Ocean Drive.',
   true, true, 'Miami, FL'),
  ('ferrari-296-gtb', 'Ferrari', '296 GTB', 2024, 'supercar', 2495, 14500, 818, 205, 2.9, '8-speed dual-clutch', 2,
   'A hybrid V6 that re-defines the small Ferrari archetype. Rear-wheel drive, surgical, and remarkably civilized in the city before it asks more of you on the open road.',
   true, true, 'Miami, FL'),
  ('rolls-royce-cullinan', 'Rolls-Royce', 'Cullinan Black Badge', 2023, 'suv', 1750, 10000, 600, 155, 4.9, '8-speed automatic', 5,
   'For the journey that begins at the FBO and ends at the front door. The Cullinan Black Badge is a private cabin that happens to drive itself across the causeway in absolute silence.',
   true, true, 'Fort Lauderdale, FL'),
  ('mclaren-720s-spider', 'McLaren', '720S Spider', 2023, 'convertible', 1895, 11200, 710, 212, 2.8, '7-speed dual-clutch', 2,
   'A Woking masterclass in carbon-fibre minimalism. The 720S Spider is the most analytical car in the fleet — purest steering, sharpest brakes, lightest soul.',
   false, true, 'Miami, FL'),
  ('bentley-continental-gt-speed', 'Bentley', 'Continental GT Speed', 2024, 'grand-tourer', 1495, 8500, 650, 208, 3.5, '8-speed dual-clutch', 4,
   'The grand tourer in its most accomplished form. W12, mulliner-quilted hides, all-wheel drive — the car that arrives at Palm Beach the same way it arrived at Le Touquet sixty years ago.',
   true, true, 'Palm Beach, FL');

------------------------------------------------------------
-- Seed media (Unsplash placeholders; one hero + one gallery per car)
------------------------------------------------------------
with v as (select id, slug from public.vehicles)
insert into public.vehicle_media (vehicle_id, url, alt_text, sort_order, is_hero)
select v.id,
       case v.slug
         when 'lamborghini-huracan-evo-spyder' then 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=2400&q=80'
         when 'ferrari-296-gtb'                then 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=2400&q=80'
         when 'rolls-royce-cullinan'           then 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=2400&q=80'
         when 'mclaren-720s-spider'            then 'https://images.unsplash.com/photo-1592853625511-ad0bb1311163?w=2400&q=80'
         when 'bentley-continental-gt-speed'   then 'https://images.unsplash.com/photo-1631295387412-7e76d62d4f97?w=2400&q=80'
       end,
       initcap(replace(v.slug, '-', ' ')) || ' — hero',
       0, true
from v;

with v as (select id, slug from public.vehicles)
insert into public.vehicle_media (vehicle_id, url, alt_text, sort_order, is_hero)
select v.id,
       case v.slug
         when 'lamborghini-huracan-evo-spyder' then 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80'
         when 'ferrari-296-gtb'                then 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=80'
         when 'rolls-royce-cullinan'           then 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80'
         when 'mclaren-720s-spider'            then 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=1600&q=80'
         when 'bentley-continental-gt-speed'   then 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1600&q=80'
       end,
       initcap(replace(v.slug, '-', ' ')) || ' — gallery',
       1, false
from v;
