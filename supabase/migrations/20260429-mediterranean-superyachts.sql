-- ============================================================
-- Migration: 3 Mediterranean superyachts (AXIOS, PERSEFONI I, AQUA LIBRA)
-- Date: 2026-04-29
-- Source: yachtcharterfleet.com listings
-- Photos in /public/photos/yachts/{slug}/
-- ============================================================

insert into public.yachts
  (slug, builder, model, year, category, length_ft, beam_ft, guests, cabins, crew, cruise_speed_kts, top_speed_kts, propulsion, daily_rate, half_day_rate, weekly_rate, description, featured, available, base_marina)
values
  ('axios-47m', 'Admiral Yachts', 'AXIOS — 47m Superyacht', 2014, 'motor-yacht',
   154.2, 28.8, 12, 5, 10, 14, 16,
   'Twin Caterpillar diesel · refit 2024',
   30000, null, 215000,
   'AXIOS — a 47m award-winning superyacht built by Admiral Yachts with interior styling by LUCA DINI. Twelve guests across five cabins (master, two VIPs, two convertibles), full crew of ten. Beach club, jacuzzi, gym, sauna, steam room, Starlink, full water-toy complement including jet skis, Seabobs, paddleboards, and an inflatable water park. Mediterranean charter from €180,000–€210,000 / week + expenses.',
   true, true, 'Athens · Mediterranean'),

  ('persefoni-i-54m', 'Admiral Yachts', 'PERSEFONI I — 54m Superyacht', 2012, 'motor-yacht',
   176.5, 34.5, 12, 6, 13, 14, 17,
   'Twin diesel · refit 2021 · 5,000 nm range',
   46000, null, 320000,
   'PERSEFONI I — a 53.8m custom motor yacht by Admiral Yachts, exterior and interior by LUCA DINI. Twelve guests across six cabins (master, VIP, three doubles, twin), thirteen crew. Tender garage, beach club, jacuzzi, outdoor bar, swimming platform, at-anchor stabilizers. Cruising up to 17 knots with 5,000-nautical-mile range. €249,000–€299,000 / week summer · €199,000 / week winter, plus expenses.',
   true, true, 'Athens · Mediterranean'),

  ('aqua-libra-40m', 'Sunseeker', 'AQUA LIBRA — 131 Yacht', 2018, 'motor-yacht',
   131.5, 26.6, 11, 5, 8, 18, 20,
   'Twin MTU · GRP semi-displacement',
   27000, null, 186000,
   'AQUA LIBRA — a 40.05m Sunseeker 131 motor yacht built in 2018. Eleven guests across five cabins (master with private dressing room, two VIPs, two twins, two convertibles, plus pullman), eight crew. Cruise 18 knots, top 20. Jacuzzi, deck jacuzzi, satellite TV, jet skis, Seabob, paddleboards, full snorkeling and fishing kit. Mediterranean cruising — Amalfi, Mykonos, the Balearics. €155,000–€165,000 / week summer · €145,000 / week winter, plus expenses.',
   true, true, 'Mykonos · Mediterranean');

-- Insert media for all three yachts
insert into public.yacht_media (yacht_id, url, alt_text, sort_order, is_hero)
select y.id, t.url, t.alt, t.so, t.hero
from (values
  -- AXIOS (2 photos)
  ('axios-47m',         '/photos/yachts/axios-47m/hero.jpg',         'AXIOS — exterior',     0, true),
  ('axios-47m',         '/photos/yachts/axios-47m/image01.jpg',      'AXIOS — gallery',      1, false),
  -- PERSEFONI I (6 photos)
  ('persefoni-i-54m',   '/photos/yachts/persefoni-i-54m/hero.jpg',   'PERSEFONI I — exterior', 0, true),
  ('persefoni-i-54m',   '/photos/yachts/persefoni-i-54m/image01.jpg', 'PERSEFONI I — interior', 1, false),
  ('persefoni-i-54m',   '/photos/yachts/persefoni-i-54m/image02.jpg', 'PERSEFONI I — deck',     2, false),
  ('persefoni-i-54m',   '/photos/yachts/persefoni-i-54m/image03.jpg', 'PERSEFONI I — salon',    3, false),
  ('persefoni-i-54m',   '/photos/yachts/persefoni-i-54m/image04.jpg', 'PERSEFONI I — master',   4, false),
  ('persefoni-i-54m',   '/photos/yachts/persefoni-i-54m/image05.jpg', 'PERSEFONI I — sundeck',  5, false),
  -- AQUA LIBRA (6 photos)
  ('aqua-libra-40m',    '/photos/yachts/aqua-libra-40m/hero.jpg',    'AQUA LIBRA — exterior', 0, true),
  ('aqua-libra-40m',    '/photos/yachts/aqua-libra-40m/image01.jpg', 'AQUA LIBRA — interior', 1, false),
  ('aqua-libra-40m',    '/photos/yachts/aqua-libra-40m/image02.jpg', 'AQUA LIBRA — deck',     2, false),
  ('aqua-libra-40m',    '/photos/yachts/aqua-libra-40m/image03.jpg', 'AQUA LIBRA — salon',    3, false),
  ('aqua-libra-40m',    '/photos/yachts/aqua-libra-40m/image04.jpg', 'AQUA LIBRA — master',   4, false),
  ('aqua-libra-40m',    '/photos/yachts/aqua-libra-40m/image05.jpg', 'AQUA LIBRA — sundeck',  5, false)
) as t(slug, url, alt, so, hero)
inner join public.yachts y on y.slug = t.slug;
