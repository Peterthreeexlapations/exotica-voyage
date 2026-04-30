-- ============================================================
-- Migration: real fleet daily rates (founder survey 2026-04-28)
-- Sets the public-facing daily_rate for all 45 vehicles based on
-- the founder's confirmed pricing during the price survey.
-- ============================================================

update public.vehicles v
set daily_rate = t.rate
from (values
  ('lamborghini-urus-stage-2-matte-green',                 1250),
  ('lamborghini-urus-pearl-white-stars',                   1250),
  ('lamborghini-urus-black',                               1099),
  ('lamborghini-urus-yellow',                              1100),
  ('lamborghini-urus-orange',                              1100),
  ('lamborghini-huracan-evo-spyder-stage-2-blue-glauco',   1499),
  ('lamborghini-huracan-evo-spyder-red-interior',          1499),
  ('lamborghini-huracan-evo-orange',                       1399),
  ('lamborghini-huracan-evo-yellow',                       1199),
  ('lamborghini-huracan-evo-red',                          1199),
  ('lamborghini-huracan-tecnica',                          1899),
  ('lamborghini-aventador',                                1949),
  ('ferrari-488-spider-red',                               1299),
  ('ferrari-488-spider-white',                             1299),
  ('ferrari-f8',                                           1299),
  ('mclaren-gt-grey',                                      1199),
  ('mclaren-gt-black',                                     1199),
  ('mclaren-artura-spider-neon-yellow',                    1500),
  ('mclaren-570s-orange',                                  1399),
  ('rolls-royce-cullinan-tiffany-blue',                    1250),
  ('rolls-royce-cullinan-black',                           1599),
  ('rolls-royce-ghost-white',                              1250),
  ('rolls-royce-spectre-silver',                           1499),
  ('rolls-royce-dawn-white',                               1200),
  ('bentley-bentayga-white',                               750),
  ('porsche-911-carrera-red',                              800),
  ('porsche-911-cabriolet-blue-2025',                      750),
  ('mercedes-amg-sl55-white',                              600),
  ('mercedes-amg-gt43-white',                              599),
  ('mercedes-amg-gls63-white',                             599),
  ('mercedes-amg-c43-white',                               500),
  ('mercedes-amg-cla35-black',                             399),
  ('mercedes-s580-white',                                  899),
  ('mercedes-g550',                                        599),
  ('maybach-two-tone-stars-2025',                          1500),
  ('cadillac-escalade-esv-luxury-2023',                    999),
  ('cadillac-escalade-platinum-2025',                      850),
  ('bmw-m330i-blue',                                       399),
  ('bmw-m2-manual-blue-2024',                              550),
  ('bmw-7-series-custom-white',                            599),
  ('corvette-c8-z51-blue',                                 600),
  ('corvette-stingray-2025-white-int',                     700),
  ('range-rover-sport-2026',                               550),
  ('dodge-durango-srt-alchemi',                            550),
  ('jeep-wrangler-rubicon',                                399)
) as t(slug, rate)
where v.slug = t.slug;
