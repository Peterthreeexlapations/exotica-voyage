-- ============================================================
-- Migration: yachts + aviation expansion + photo fixes
-- Date: 2026-04-27
-- Reason: Founder expanded scope from cars-only to a three-category
-- brokerage (cars + yachts + aviation). Replaces 2 broken Unsplash URLs
-- on existing vehicle_media rows in the same transaction.
-- See: ~/Desktop/exotica-voyage-memory/DECISIONS.md
-- ============================================================

------------------------------------------------------------
-- 1. Fix two 404'd hero photos on existing cars
------------------------------------------------------------
update public.vehicle_media
set url = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=80'
where url = 'https://images.unsplash.com/photo-1592853625511-ad0bb1311163?w=2400&q=80';

update public.vehicle_media
set url = 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=2400&q=80'
where url = 'https://images.unsplash.com/photo-1631295387412-7e76d62d4f97?w=2400&q=80';

------------------------------------------------------------
-- 2. yachts table
------------------------------------------------------------
create table if not exists public.yachts (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  builder         text not null,
  model           text not null,
  year            int not null check (year between 1950 and 2100),
  category        text not null check (category in ('day-boat','sport-yacht','motor-yacht','sailing','sportfish','catamaran')),
  length_ft       numeric(5,1) not null,
  beam_ft         numeric(4,1),
  guests          int,
  cabins          int,
  crew            int,
  cruise_speed_kts int,
  top_speed_kts   int,
  propulsion      text,
  daily_rate      numeric(10,2) not null,
  half_day_rate   numeric(10,2),
  weekly_rate     numeric(10,2),
  description     text,
  featured        boolean not null default false,
  available       boolean not null default true,
  base_marina     text not null default 'Miami, FL',
  created_at      timestamptz not null default now()
);

create index if not exists yachts_category_idx on public.yachts(category);
create index if not exists yachts_available_idx on public.yachts(available);
create index if not exists yachts_featured_idx on public.yachts(featured);

create table if not exists public.yacht_media (
  id          uuid primary key default gen_random_uuid(),
  yacht_id    uuid not null references public.yachts(id) on delete cascade,
  url         text not null,
  alt_text    text,
  sort_order  int not null default 0,
  is_hero     boolean not null default false
);

create index if not exists yacht_media_yacht_idx on public.yacht_media(yacht_id);
create unique index if not exists yacht_media_one_hero_per_yacht
  on public.yacht_media(yacht_id) where is_hero = true;

------------------------------------------------------------
-- 3. aircraft table
------------------------------------------------------------
create table if not exists public.aircraft (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  manufacturer    text not null,
  model           text not null,
  year            int not null check (year between 1950 and 2100),
  category        text not null check (category in ('helicopter','turboprop','light-jet','mid-jet','heavy-jet','airliner')),
  passengers      int not null,
  range_nm        int,
  cruise_speed_kts int,
  ceiling_ft      int,
  cabin_height_ft numeric(3,1),
  crew            int,
  hourly_rate     numeric(10,2) not null,
  daily_minimum   numeric(10,2),
  description     text,
  featured        boolean not null default false,
  available       boolean not null default true,
  base_airport    text not null default 'KOPF',
  created_at      timestamptz not null default now()
);

create index if not exists aircraft_category_idx on public.aircraft(category);
create index if not exists aircraft_available_idx on public.aircraft(available);
create index if not exists aircraft_featured_idx on public.aircraft(featured);

create table if not exists public.aircraft_media (
  id          uuid primary key default gen_random_uuid(),
  aircraft_id uuid not null references public.aircraft(id) on delete cascade,
  url         text not null,
  alt_text    text,
  sort_order  int not null default 0,
  is_hero     boolean not null default false
);

create index if not exists aircraft_media_aircraft_idx on public.aircraft_media(aircraft_id);
create unique index if not exists aircraft_media_one_hero_per_aircraft
  on public.aircraft_media(aircraft_id) where is_hero = true;

------------------------------------------------------------
-- 4. Row-Level Security
------------------------------------------------------------
alter table public.yachts enable row level security;
alter table public.yacht_media enable row level security;
alter table public.aircraft enable row level security;
alter table public.aircraft_media enable row level security;

drop policy if exists "yachts public read" on public.yachts;
create policy "yachts public read" on public.yachts for select to anon, authenticated using (true);

drop policy if exists "yacht_media public read" on public.yacht_media;
create policy "yacht_media public read" on public.yacht_media for select to anon, authenticated using (true);

drop policy if exists "aircraft public read" on public.aircraft;
create policy "aircraft public read" on public.aircraft for select to anon, authenticated using (true);

drop policy if exists "aircraft_media public read" on public.aircraft_media;
create policy "aircraft_media public read" on public.aircraft_media for select to anon, authenticated using (true);

------------------------------------------------------------
-- 5. Yacht seed (5 vessels)
------------------------------------------------------------
insert into public.yachts
  (slug, builder, model, year, category, length_ft, beam_ft, guests, cabins, crew, cruise_speed_kts, top_speed_kts, propulsion, daily_rate, half_day_rate, weekly_rate, description, featured, available, base_marina)
values
  ('riva-aquariva-super-33', 'Riva', 'Aquariva Super', 2023, 'day-boat', 33.0, 8.5, 8, 0, 1, 35, 41,
   'Twin Yanmar 8LV-370 diesel', 4500, 2750, 28000,
   'A Riviera classic in modern guise. Mahogany decks, polished steel, and a profile that has seduced the Italian coast since 1962. The Aquariva is the ideal day boat — Star Island lunch, Stiltsville sandbars, sunset on Biscayne Bay.',
   true, true, 'Miami Beach Marina'),
  ('sunseeker-predator-80', 'Sunseeker', 'Predator 80', 2022, 'sport-yacht', 80.0, 19.0, 10, 4, 2, 30, 36,
   'Triple MAN V12-1900 diesel', 9500, 6000, 58000,
   'British engineering, Mediterranean attitude. The Predator 80 carries a flybridge bar, master suite with sea-level windows, and a tender garage that converts to a beach club. Ideal for Bimini, Key West, or extended Bahamas crossings.',
   true, true, 'Pier 66 · Fort Lauderdale'),
  ('princess-v60', 'Princess', 'V60 Express', 2024, 'sport-yacht', 60.0, 16.0, 8, 3, 1, 28, 34,
   'Twin Volvo IPS 950', 6500, 4000, 39000,
   'A 60-foot express coupe that splits the difference between weekend cruiser and overnight retreat. Hardtop with sliding sunroof, dining for eight aft, master forward. The most-requested yacht of last summer.',
   true, true, 'Miami Beach Marina'),
  ('pershing-7x', 'Pershing', '7X', 2023, 'sport-yacht', 75.0, 18.5, 10, 3, 2, 38, 42,
   'Triple Volvo IPS 1200', 8500, 5500, 52000,
   'Italian sport-yacht with the soul of an offshore racer. Twin-step hull, surface drives, and a 42-knot top end. Pershing made its name on speed — this is the most evolved expression of that mission.',
   false, true, 'Pier 66 · Fort Lauderdale'),
  ('lagoon-55-cat', 'Lagoon', '55 Catamaran', 2024, 'catamaran', 55.0, 30.0, 12, 4, 2, 9, 12,
   'Twin Yanmar 80hp diesel + sail', 5500, 3500, 33000,
   'Stability over speed. The Lagoon 55 is the favourite for Bahamas charters that prioritise standing-headroom in every cabin and a full beam aft saloon. Ideal for groups, families, and longer crossings.',
   true, true, 'Miami Beach Marina');

------------------------------------------------------------
-- 6. Yacht media (10 rows: 5 hero + 5 gallery)
------------------------------------------------------------
insert into public.yacht_media (yacht_id, url, alt_text, sort_order, is_hero)
select y.id, t.url, t.alt_text, t.sort_order, t.is_hero
from (values
  ('riva-aquariva-super-33', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=2400&q=80', 'Riva Aquariva Super hero', 0, true),
  ('riva-aquariva-super-33', 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1600&q=80', 'Riva Aquariva gallery', 1, false),
  ('sunseeker-predator-80',  'https://images.unsplash.com/photo-1473042904451-00171c69419d?w=2400&q=80', 'Sunseeker Predator 80 hero', 0, true),
  ('sunseeker-predator-80',  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1600&q=80', 'Sunseeker gallery', 1, false),
  ('princess-v60',           'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=2400&q=80', 'Princess V60 hero', 0, true),
  ('princess-v60',           'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80', 'Princess V60 gallery', 1, false),
  ('pershing-7x',            'https://images.unsplash.com/photo-1500627964684-141351970a7f?w=2400&q=80', 'Pershing 7X hero', 0, true),
  ('pershing-7x',            'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1600&q=80', 'Pershing 7X gallery', 1, false),
  ('lagoon-55-cat',          'https://images.unsplash.com/photo-1560507074-b9eb43faab00?w=2400&q=80', 'Lagoon 55 hero', 0, true),
  ('lagoon-55-cat',          'https://images.unsplash.com/photo-1496559249665-c7e2874707ea?w=1600&q=80', 'Lagoon 55 gallery', 1, false)
) as t(slug, url, alt_text, sort_order, is_hero)
inner join public.yachts y on y.slug = t.slug;

------------------------------------------------------------
-- 7. Aircraft seed (5 aircraft)
------------------------------------------------------------
insert into public.aircraft
  (slug, manufacturer, model, year, category, passengers, range_nm, cruise_speed_kts, ceiling_ft, cabin_height_ft, crew, hourly_rate, daily_minimum, description, featured, available, base_airport)
values
  ('gulfstream-g450', 'Gulfstream', 'G450', 2019, 'heavy-jet', 14, 4350, 476, 45000, 6.2, 2, 14500, 30000,
   'A heavy jet for transcontinental missions — Miami to Aspen non-stop, Miami to London with one stop. Stand-up cabin, full galley, divan that converts to a bed, and a satellite-comms suite for the long crossings.',
   true, true, 'Opa-locka · KOPF'),
  ('bombardier-challenger-350', 'Bombardier', 'Challenger 350', 2021, 'mid-jet', 9, 3200, 459, 45000, 6.0, 2, 9500, 22000,
   'The super-mid-size workhorse. Miami to Aspen with the family, Miami to LA with the team. Class-leading cabin width and a flat floor make it the favourite of clients who treat the aircraft like a moving conference room.',
   true, true, 'Fort Lauderdale Exec · KFXE'),
  ('cessna-citation-cj4', 'Cessna', 'Citation CJ4', 2022, 'light-jet', 8, 2165, 451, 45000, 4.8, 2, 5500, 12000,
   'The most-requested light jet in the fleet. Miami to New York non-stop with seven on board, single-pilot certified, and the most sensible operating economics in its class. The right answer when the run is under three hours.',
   true, true, 'Opa-locka · KOPF'),
  ('pilatus-pc12', 'Pilatus', 'PC-12 NGX', 2023, 'turboprop', 9, 1800, 290, 30000, 4.9, 1, 3500, 8000,
   'A Swiss-built turboprop that goes where jets cannot. Short runways, grass strips, the smaller Bahamas islands. The PC-12 is the right tool for Eleuthera, Exuma, Andros — runways measured in feet, not miles.',
   false, true, 'Fort Lauderdale Exec · KFXE'),
  ('bell-429', 'Bell', '429', 2022, 'helicopter', 7, 360, 150, 20000, 4.9, 2, 4500, 6000,
   'For the short-hop, no-traffic, hotel-rooftop arrival. Miami to Palm Beach in 35 minutes, Miami to Bimini in 50. Twin-engine reliability, stretcher-capable cabin, and IFR-equipped for weather operations.',
   true, true, 'Watson Island Helipad · 09FA');

------------------------------------------------------------
-- 8. Aircraft media (10 rows: 5 hero + 5 gallery)
------------------------------------------------------------
insert into public.aircraft_media (aircraft_id, url, alt_text, sort_order, is_hero)
select a.id, t.url, t.alt_text, t.sort_order, t.is_hero
from (values
  ('gulfstream-g450',           'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=2400&q=80', 'Gulfstream G450 hero', 0, true),
  ('gulfstream-g450',           'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1600&q=80', 'Gulfstream gallery', 1, false),
  ('bombardier-challenger-350', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2400&q=80', 'Challenger 350 hero', 0, true),
  ('bombardier-challenger-350', 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1600&q=80', 'Challenger gallery', 1, false),
  ('cessna-citation-cj4',       'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=80', 'CJ4 hero', 0, true),
  ('cessna-citation-cj4',       'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&q=80', 'CJ4 gallery', 1, false),
  ('pilatus-pc12',              'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=2400&q=80', 'Pilatus PC-12 hero', 0, true),
  ('pilatus-pc12',              'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=80', 'Pilatus gallery', 1, false),
  ('bell-429',                  'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?w=2400&q=80', 'Bell 429 hero', 0, true),
  ('bell-429',                  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80', 'Bell gallery', 1, false)
) as t(slug, url, alt_text, sort_order, is_hero)
inner join public.aircraft a on a.slug = t.slug;
