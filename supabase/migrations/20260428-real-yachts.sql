-- ============================================================
-- Migration: real yacht fleet (replaces 5 placeholder yachts with 18 actual)
-- Date: 2026-04-28
-- 15 Miami yachts (daily rates) + 3 Greece superyachts (weekly rates).
-- daily_rate values are seeded; founder will confirm in price survey.
-- ============================================================

-- Clear existing placeholder yacht data
delete from public.yacht_media;
delete from public.yachts;

-- Insert all real yachts
insert into public.yachts
  (slug, builder, model, year, category, length_ft, beam_ft, guests, cabins, crew, cruise_speed_kts, top_speed_kts, propulsion, daily_rate, half_day_rate, weekly_rate, description, featured, available, base_marina)
values
-- ============ MIAMI FLEET (15) ============
  ('azimut-flybridge-60', 'Azimut', 'Flybridge 60', 2022, 'sport-yacht', 60.0, 16.0, 13, 3, 1, 28, 32, 'Twin Volvo IPS 950 diesel',
   3500, 2200, 21000,
   'A great starter luxury charter — flybridge with bar, big sunpads aft, room for 12–13 guests. The most-booked yacht for first-time charter clients.',
   true, true, 'Miami Beach Marina'),
  ('azimut-68', 'Azimut', '68', 2023, 'sport-yacht', 68.0, 17.0, 12, 4, 2, 28, 32, 'Twin MAN V8 diesel',
   4500, 2800, 27000,
   'Very popular in Miami — the go-to for birthdays and full-day group charters. Three cabins, sun deck, and the right amount of bar space.',
   true, true, 'Miami Beach Marina'),
  ('sunseeker-75', 'Sunseeker', '75 Yacht', 2022, 'sport-yacht', 75.0, 18.5, 10, 4, 2, 30, 34, 'Twin MAN V12-1400',
   5500, 3500, 33000,
   'A classic Miami luxury yacht — sporty British engineering with the social space upscale clients expect.',
   true, true, 'Miami Beach Marina'),
  ('azimut-80', 'Azimut', '80', 2023, 'sport-yacht', 80.0, 19.0, 12, 4, 2, 28, 32, 'Twin MTU diesel',
   7500, 4500, 45000,
   'Mini-superyacht feel — huge upper deck, full crew, the VIP favorite for premium day charters.',
   true, true, 'Miami Beach Marina'),
  ('azimut-84', 'Azimut', '84', 2023, 'sport-yacht', 84.0, 19.5, 12, 4, 2, 28, 32, 'Twin MTU diesel',
   8500, 5000, 51000,
   'Big wow factor. The right answer for premium clients who need the boat to set the tone of the day.',
   false, true, 'Miami Beach Marina'),
  ('pershing-92', 'Pershing', '92', 2022, 'sport-yacht', 92.0, 21.0, 12, 4, 2, 38, 42, 'Triple MTU 16V 2000 M93',
   12500, 7500, 75000,
   'Super exotic — the supercar of yachts. Twin-step hull, surface drives, 42-knot top end.',
   true, true, 'Pier 66 · Fort Lauderdale'),
  ('mangusta-80', 'Mangusta', '80', 2021, 'sport-yacht', 80.0, 19.0, 10, 4, 2, 35, 39, 'Twin MTU 12V 2000 M94',
   9500, 5500, 57000,
   'Very exotic charter option. High-end clientele rebook this one. Sharp Italian lines, soft profile, fast.',
   false, true, 'Miami Beach Marina'),
  ('leopard-80', 'Leopard', '80', 2020, 'sport-yacht', 80.0, 18.0, 10, 4, 2, 35, 40, 'Twin MTU 12V 2000',
   8500, 5000, 51000,
   'Fast and aggressive styling. Built for Miami''s long offshore runs.',
   false, true, 'Miami Beach Marina'),
  ('galeon-530-fly', 'Galeon', '530 Fly', 2023, 'sport-yacht', 53.0, 15.0, 12, 3, 1, 28, 32, 'Twin Volvo IPS 800',
   3500, 2200, 21000,
   'Amazing party yacht — fold-out beach club sides, sunbathing platforms, group-friendly social geometry.',
   true, true, 'Miami Beach Marina'),
  ('galeon-680-fly', 'Galeon', '680 Fly', 2023, 'sport-yacht', 68.0, 17.0, 12, 4, 2, 28, 32, 'Twin Volvo IPS 1050',
   4500, 2800, 27000,
   'The bigger Galeon — same beach-club philosophy with more cabin space and a real flybridge.',
   false, true, 'Miami Beach Marina'),
  ('ferretti-810', 'Ferretti', '810', 2022, 'motor-yacht', 81.0, 19.0, 12, 4, 2, 28, 32, 'Twin MTU diesel',
   7500, 4500, 45000,
   'Italian motor-yacht with the cruising range Miami clients want for Bahamas runs.',
   false, true, 'Miami Beach Marina'),
  ('princess-88', 'Princess', '88 Motor Yacht', 2022, 'motor-yacht', 88.0, 20.0, 12, 4, 2, 25, 28, 'Twin MAN V12-1900',
   9500, 5500, 57000,
   'Elegant Princess motor yacht — full-beam master, social main deck, full crew.',
   false, true, 'Miami Beach Marina'),
  ('sirena-88', 'Sirena', '88', 2023, 'motor-yacht', 88.0, 21.0, 10, 4, 2, 18, 22, 'Twin MAN V8',
   9500, 5500, 57000,
   'Long-range explorer — designed for crossings, not just cruises. Quiet, efficient, capable.',
   false, true, 'Pier 66 · Fort Lauderdale'),
  ('sunseeker-94', 'Sunseeker', '94 Yacht', 2022, 'motor-yacht', 94.0, 21.5, 12, 4, 3, 28, 32, 'Twin MTU 16V',
   12500, 7500, 75000,
   'British flagship-class — full-beam master with sea-level windows.',
   false, true, 'Pier 66 · Fort Lauderdale'),
  ('benetti-superyacht-100', 'Benetti', 'Custom 100+', 2021, 'motor-yacht', 105.0, 23.0, 12, 5, 4, 14, 18, 'Twin MTU 8V 2000',
   17500, 10000, 105000,
   '100''+ Benetti — broker-style fleet option. The right boat when the day is for hosting, not just driving.',
   false, true, 'Pier 66 · Fort Lauderdale'),
-- ============ GREECE / MEDITERRANEAN (3) ============
  ('axios-admiral-47m', 'Admiral Yachts', 'AXIOS — 47m Superyacht', 2014, 'motor-yacht', 154.2, 28.8, 12, 5, 10, 12, 14, 'Twin diesel · Refit 2024',
   28500, null, 200000,
   'AXIOS — a 47m superyacht built by Admiral Yachts, exterior by LUCA DINI. Full week charter standard. Master + 2 VIP + 2 convertible cabins, jacuzzi, beach club, gym, satellite TV, full Mediterranean amenities.',
   true, true, 'Greece · Mediterranean'),
  ('persefoni-i-luca-dini-54m', 'Admiral Yachts', 'PERSEFONI I — 54m Superyacht', 2012, 'motor-yacht', 176.5, 29.6, 12, 6, 13, 14, 16, 'Twin diesel · Refit 2021',
   39500, null, 275000,
   'PERSEFONI I — 53.8m custom motor yacht by Admiral, exterior + interior by LUCA DINI. Master + VIP + 1 twin + 3 double cabins for 12 guests, 13 crew. Tender garage, beach club, sun deck, swimming platform.',
   true, true, 'Greece · Mediterranean'),
  ('aqua-libra-sunseeker-40m', 'Sunseeker', 'AQUA LIBRA — 40m Superyacht', 2018, 'motor-yacht', 131.5, 24.8, 11, 5, 8, 14, 17, 'Twin MTU diesel',
   24500, null, 170000,
   'AQUA LIBRA — 40.05m Sunseeker motor yacht. Master + VIP + twin + 2 convertible cabins for up to 11 guests. Jacuzzi, deck jacuzzi, satellite TV, full Mediterranean charter program.',
   false, true, 'Greece · Mediterranean');

-- Insert hero photos (Unsplash placeholders matched by yacht type)
insert into public.yacht_media (yacht_id, url, alt_text, sort_order, is_hero)
select y.id, m.url, y.builder || ' ' || y.model, 0, true
from public.yachts y
join (values
  ('azimut-flybridge-60',           'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=2400&q=80'),
  ('azimut-68',                     'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=2400&q=80'),
  ('sunseeker-75',                  'https://images.unsplash.com/photo-1473042904451-00171c69419d?w=2400&q=80'),
  ('azimut-80',                     'https://images.unsplash.com/photo-1500627964684-141351970a7f?w=2400&q=80'),
  ('azimut-84',                     'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=2400&q=80'),
  ('pershing-92',                   'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=2400&q=80'),
  ('mangusta-80',                   'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=2400&q=80'),
  ('leopard-80',                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2400&q=80'),
  ('galeon-530-fly',                'https://images.unsplash.com/photo-1496559249665-c7e2874707ea?w=2400&q=80'),
  ('galeon-680-fly',                'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2400&q=80'),
  ('ferretti-810',                  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2400&q=80'),
  ('princess-88',                   'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=2400&q=80'),
  ('sirena-88',                     'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=2400&q=80'),
  ('sunseeker-94',                  'https://images.unsplash.com/photo-1473042904451-00171c69419d?w=2400&q=80'),
  ('benetti-superyacht-100',        'https://images.unsplash.com/photo-1500627964684-141351970a7f?w=2400&q=80'),
  ('axios-admiral-47m',             'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=2400&q=80'),
  ('persefoni-i-luca-dini-54m',     'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=2400&q=80'),
  ('aqua-libra-sunseeker-40m',      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=2400&q=80')
) as m(slug, url) on m.slug = y.slug;
