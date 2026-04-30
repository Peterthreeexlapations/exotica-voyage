-- ============================================================
-- Migration: pricing survey results (2026-04-29)
-- Applies founder's confirmed prices to all 134 listings.
-- Run this AFTER the complete-inventory migration.
-- ============================================================

-- ============================================================
-- 85 cars — updated daily rates
-- ============================================================
update public.vehicles v set daily_rate = t.rate from (values
  -- GROUPS
  ('2025-escalade-platinum',                 599),
  ('escalade-esv-sport-platinum-2025',       599),
  ('escalade-esv-sport',                     599),
  ('escalade-esv-sport-2',                   599),
  ('escalade-esv-sport-2025',                599),
  ('corvette-c8-z51-blue',                   699),
  ('corvette-c8-z51-orange',                 699),
  ('corvette-c8-z51-white',                  699),
  ('lamborghini-huracan',                   1299),
  ('lamborghini-huracan-evo2',              1299),
  ('lamborghini-huracan-evo-green',         1299),
  ('2022-lamborghini-hurracan-evo-sp',      1399),
  ('lamborghini-huracan-evo-spyder',        1399),
  ('2024-lamborghini-urus-s',                899),
  ('lamborghini-urus',                       899),
  ('lamborghini-urus-blackblack',            899),
  ('lamborghini-urus-blueblack',             899),
  ('lamborghini-urus-redblack-white',        899),
  ('lamborghini-urus-s',                     899),
  ('lamborghini-urus-performante-2024',      899),
  ('urus-performante',                       899),
  ('gls-600-maybach',                        799),
  ('maybach-gls600',                         799),
  ('maybach-gls600-with-stars-white',        799),
  ('mercedes-maybach-gls600-obsidian-black-kalahari-gold-black', 799),
  ('2025-mclaren-artura-spider',             999),
  ('mclaren-artura-spider-silverred',        999),
  ('2023-mercedes-g63-amg-gwagon',           699),
  ('g63-amg',                                699),
  ('mercedes-benz-g63-amg-whitered',         699),
  ('mercedes-g63',                           699),
  ('mercedes-s580',                          699),
  ('mercedes-s580-white',                    699),
  ('cullinan',                              1399),
  ('rolls-royce-cullinan',                  1399),
  ('rolls-royce-cullinan-blackblack',       1399),
  ('ferrari-488-spider',                    1399),
  ('tailor-made-488-spider',                1399),
  ('mercedes-benz-gle-63s',                  599),
  ('mercedes-benz-gle63s-silverred',         599),
  -- SPECIALS
  ('2019-mclaren-570s-orange',              1499),
  ('2022-mercedes-party-van-13ppl-ma',       999),
  ('2024-mclaren-artura-red-blk',            899),
  ('2025-china-blue-g-wagon',               1099),
  ('2025-corvette-stingray-white-interior',  699),
  ('2025-porsche-911-targa-4s-1-4-cu',       899),
  ('2026-range-rover-sport',                 799),
  ('aventador-s',                           2999),
  ('aventador-svj-gintani',                 6999),
  ('bmw-m340i-blue',                         399),
  ('bmw-m4-competition-convertible-whiteorange', 799),
  ('bentley-bentayga',                      1199),
  ('bugatti-chiron',                       14999),
  ('c8-z06',                                 799),
  ('chevrolet-corvette-coupe-yellowblack',   599),
  ('chevrolet-corvette-z06-convertible-redblack', 899),
  ('corvette-c8-convertible',                649),
  ('custom-rr-cullinan-tiffany-blue',       1499),
  ('dodge-durango-srt-hellcat',              499),
  ('ferrari-f8-tributo-berlinetta-whitered', 1299),
  ('ferrari-purosangue',                    1199),
  ('g63-amg-whiteout',                       899),
  ('huracan-sto',                           1799),
  ('immersive-cullinan',                    1499),
  ('keyvany-keyrus-urus',                    999),
  ('lamborghini-huracan-tecnica',           1399),
  ('lamborghini-urus-se-2026',               899),
  ('lamborghini-urus-wide-body',             899),
  ('maybach-s580',                           799),
  ('maybach-s680-v12',                       849),
  ('mclaren-570gt',                         1299),
  ('mclaren-720s-custom',                   1399),
  ('mercedes-amg-c63-white',                 599),
  ('mercedes-amg-cla35-black',               449),
  ('mercedes-amg-gls63-white',               699),
  ('mercedes-amg-gt43-silver',               499),
  ('mercedes-amg-sl55-white',                599),
  ('mercedes-benz-c63s-amg-whiteblack',      499),
  ('mercedes-benz-gle53-whiteblack',         449),
  ('porsche-911-carrera-red',                699),
  ('rr-dawn-black-badge',                   1499),
  ('rolls-royce-ghost',                     1399),
  ('rolls-royce-spectre',                   1499),
  ('tesla-cybertruck',                       599),
  ('widebody-g63-amg-custom',                799)
) as t(slug, rate)
where v.slug = t.slug;

-- ============================================================
-- 33 yachts — broker estimates + $1,000 each
-- ============================================================
update public.yachts y set
  daily_rate = t.rate,
  half_day_rate = (t.rate * 0.6)::numeric(10, 2),
  weekly_rate = t.rate * 6
from (values
  ('103ft-luxury-azimut-w-toys-yach',  19000),
  ('110ft-maiora-yacht',               23000),
  ('118-azimut-grande-tycoon',         29000),
  ('118-azimut',                       26000),
  ('120-majesty',                      27000),
  ('130ft-azimut-infinity-w-jacuzzi',  31000),
  ('135ft-w-jacuzzi',                  36000),
  ('206-rossinavi',                    91000),
  ('25ft-easy-yamaha-225xd',            1850),
  ('40ft-vandutch-2017',                4200),
  ('45ft-fjord-yacht',                  4800),
  ('50ft-fountaine-pajot-2023-happy',   5500),
  ('52ft-azimut-sport-luxury-yacht',    4800),
  ('52ft-the-ark-flybridge-yacht',      4500),
  ('52ft-pershing-velocity',            5200),
  ('53ft-2023-galeon-yacht',            5000),
  ('54ft-prestigie-500fly-yacht',       4800),
  ('55ft-galeon-yacht',                 5100),
  ('56ft-azimut-fly-dream-ii-ftll',     5200),
  ('57ft-azimut-yacht',                 5300),
  ('59ft-princess-yacht',               5500),
  ('60ft-azimut-flybridge-vdv',         6000),
  ('63ft-pershing-finstar-yacht',       7500),
  ('63ft-life-is-great-yacht',          6500),
  ('64ft-pershing-wind',                7800),
  ('68ft-money-waves-yacht',            7500),
  ('70ft-galeon-yacht',                 8800),
  ('70ft-azimut-fly-le-grand-bleu-ya',  8500),
  ('70ft-azimut-flybridge-days-like',   8500),
  ('72ft-azimut-flybridge-yacht',       9000),
  ('75ft-sunseeker-yacht',              9500),
  ('78ft-sunseeker-do-it-anyways',     10500),
  ('92ft-hargave-mega-yacht',          15000)
) as t(slug, rate)
where y.slug = t.slug;

-- ============================================================
-- 16 aircraft — broker estimates + $1,000/hr each
-- ============================================================
update public.aircraft a set hourly_rate = t.rate from (values
  ('challenger-850',     7500),
  ('citation-cj1-plus',  3400),
  ('citation-vi',        4800),
  ('citation-xls-plus',  4500),
  ('falcon-900dx',       8500),
  ('falcon-900lx',       8800),
  ('gulfstream-g150',    5200),
  ('gulfstream-g400',    8800),
  ('gulfstream-g450',    9500),
  ('gulfstream-giv-sp',  8500),
  ('hawker-400xp',       3800),
  ('hawker-850xp',       5300),
  ('hawker-900xp',       5500),
  ('learjet-40xr',       4200),
  ('learjet-60',         4900),
  ('learjet-60xr',       5200)
) as t(slug, rate)
where a.slug = t.slug;

-- ============================================================
-- Re-mark featured (top 6 per category by rate)
-- ============================================================
update public.vehicles set featured = false;
update public.vehicles set featured = true where slug in (select slug from public.vehicles order by daily_rate desc limit 6);
update public.yachts set featured = false;
update public.yachts set featured = true where slug in (select slug from public.yachts order by daily_rate desc limit 6);
update public.aircraft set featured = false;
update public.aircraft set featured = true where slug in (select slug from public.aircraft order by hourly_rate desc limit 6);
