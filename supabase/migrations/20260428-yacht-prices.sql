-- ============================================================
-- Migration: yacht daily rates from founder survey 2026-04-28
-- Updates the 15 Miami yacht daily_rate values; weekly_rate
-- recomputed at daily*6 and half_day_rate at daily*0.6.
-- Greece superyachts (3) kept their seed values per founder.
-- ============================================================

update public.yachts y
set
  daily_rate    = t.daily,
  half_day_rate = (t.daily * 0.6)::numeric(10, 2),
  weekly_rate   = t.daily * 6
from (values
  ('azimut-flybridge-60',     4999),
  ('azimut-68',               6999),
  ('sunseeker-75',            6999),
  ('azimut-80',               9999),
  ('azimut-84',              10199),
  ('pershing-92',            15000),
  ('mangusta-80',            10500),
  ('leopard-80',              9500),
  ('galeon-530-fly',          4000),
  ('galeon-680-fly',          5500),
  ('ferretti-810',            8800),
  ('princess-88',            10500),
  ('sirena-88',              10599),
  ('sunseeker-94',           13500),
  ('benetti-superyacht-100', 18000)
) as t(slug, daily)
where y.slug = t.slug;
