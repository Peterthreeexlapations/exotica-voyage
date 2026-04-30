-- ============================================================
-- Migration: real photos for 34 cars + polished descriptions
-- Date: 2026-04-29
-- All photos are extracted from founder's screenshots, cropped to
-- show the front-3/4 exterior view, served from /public/photos/cars/.
-- ============================================================

-- 1) Update hero photo URLs to local /photos/cars/ paths
update public.vehicle_media m
set url = t.new_url
from (values
  -- Marketplace screenshots (top-photo crop)
  ('porsche-911-carrera-red',                            '/photos/cars/porsche-911-carrera-red.jpg'),
  ('corvette-c8-z51-blue',                               '/photos/cars/corvette-c8-z51-blue.jpg'),
  ('dodge-durango-srt-alchemi',                          '/photos/cars/dodge-durango-srt-alchemi.jpg'),
  ('bmw-m330i-blue',                                     '/photos/cars/bmw-m330i-blue.jpg'),
  ('mercedes-amg-c43-white',                             '/photos/cars/mercedes-amg-c43-white.jpg'),
  ('mercedes-amg-gls63-white',                           '/photos/cars/mercedes-amg-gls63-white.jpg'),
  ('mercedes-amg-sl55-white',                            '/photos/cars/mercedes-amg-sl55-white.jpg'),
  ('mercedes-amg-gt43-white',                            '/photos/cars/mercedes-amg-gt43-white.jpg'),
  ('mercedes-amg-cla35-black',                           '/photos/cars/mercedes-amg-cla35-black.jpg'),
  ('mercedes-s580-white',                                '/photos/cars/mercedes-s580-white.jpg'),
  ('bmw-m2-manual-blue-2024',                            '/photos/cars/bmw-m2-manual-blue-2024.jpg'),
  ('bmw-7-series-custom-white',                          '/photos/cars/bmw-7-series-custom-white.jpg'),
  ('lamborghini-huracan-evo-spyder-red-interior',        '/photos/cars/lamborghini-huracan-evo-spyder-red-interior.jpg'),
  ('rolls-royce-cullinan-tiffany-blue',                  '/photos/cars/rolls-royce-cullinan-tiffany-blue.jpg'),
  ('cadillac-escalade-esv-luxury-2023',                  '/photos/cars/cadillac-escalade-esv-luxury-2023.jpg'),
  ('cadillac-escalade-platinum-2025',                    '/photos/cars/cadillac-escalade-platinum-2025.jpg'),
  ('lamborghini-urus-pearl-white-stars',                 '/photos/cars/lamborghini-urus-pearl-white-stars.jpg'),
  -- SmugMug cinematic photos
  ('maybach-two-tone-stars-2025',                        '/photos/cars/maybach-two-tone-stars-2025.jpg'),
  ('lamborghini-aventador',                              '/photos/cars/lamborghini-aventador.jpg'),
  ('rolls-royce-spectre-silver',                         '/photos/cars/rolls-royce-spectre-silver.jpg'),
  ('lamborghini-huracan-evo-orange',                     '/photos/cars/lamborghini-huracan-evo-orange.jpg'),
  ('lamborghini-huracan-evo-spyder-stage-2-blue-glauco', '/photos/cars/lamborghini-huracan-evo-spyder-stage-2-blue-glauco.jpg'),
  ('mclaren-gt-black',                                   '/photos/cars/mclaren-gt-black.jpg'),
  ('mclaren-gt-grey',                                    '/photos/cars/mclaren-gt-grey.jpg'),
  ('mclaren-570s-orange',                                '/photos/cars/mclaren-570s-orange.jpg'),
  ('mclaren-artura-spider-neon-yellow',                  '/photos/cars/mclaren-artura-spider-neon-yellow.jpg'),
  -- Split-frame top halves
  ('bentley-bentayga-white',                             '/photos/cars/bentley-bentayga-white.jpg'),
  ('corvette-stingray-2025-white-int',                   '/photos/cars/corvette-stingray-2025-white-int.jpg'),
  ('range-rover-sport-2026',                             '/photos/cars/range-rover-sport-2026.jpg'),
  ('rolls-royce-cullinan-black',                         '/photos/cars/rolls-royce-cullinan-black.jpg'),
  ('mercedes-g550',                                      '/photos/cars/mercedes-g550.jpg'),
  ('lamborghini-huracan-tecnica',                        '/photos/cars/lamborghini-huracan-tecnica.jpg'),
  -- Split-frame bottom halves
  ('rolls-royce-ghost-white',                            '/photos/cars/rolls-royce-ghost-white.jpg'),
  ('ferrari-488-spider-red',                             '/photos/cars/ferrari-488-spider-red.jpg')
) as t(slug, new_url)
where m.is_hero = true
  and m.vehicle_id = (select id from public.vehicles where slug = t.slug);

-- 2) Polish descriptions for the headline / featured cars
update public.vehicles v
set description = t.new_desc
from (values
  ('maybach-two-tone-stars-2025',
   'Two-tone Maybach with starlight headliner. The most chauffeur-grade vehicle in the fleet — the way you arrive at the FBO, the gala, or the front door without saying a word.'),
  ('rolls-royce-spectre-silver',
   'Silver Spectre — the first all-electric Rolls-Royce. Whisper-quiet at any speed, the only car in the fleet that arrives in absolute silence.'),
  ('lamborghini-huracan-tecnica',
   'Red Tecnica — the most analytical Huracán. Rear-drive only, sharper aero, sharper brakes. The closest thing to a road-legal STO.'),
  ('lamborghini-huracan-evo-spyder-stage-2-blue-glauco',
   'Tuned 700-hp Spyder in Blue Glauco. Stage 2 exhaust, ambient lighting, the loudest car in the fleet. Drop the top, take the tunnel through Brickell, and the day is yours.'),
  ('lamborghini-urus-pearl-white-stars',
   'Pearl-white Urus with the signature shooting-star headliner. The most-requested SUV for night arrivals — South Beach, Story, every photographer outside Liv.'),
  ('lamborghini-urus-stage-2-matte-green',
   'Pearl-matte green Urus tuned to 800 hp. Starlight headliner, shooting-star ambient lighting — the most-requested SUV in the fleet, and it goes out on a license alone.'),
  ('mclaren-570s-orange',
   'Bright orange 570S. The original Sports Series McLaren — analog, communicative, fast. The right answer when you want to drive, not be driven.'),
  ('cadillac-escalade-esv-luxury-2023',
   'Long-wheelbase Escalade — the default arrival vehicle for groups and the most-booked SUV in the fleet. Captains chairs, 24-inch screens, room for the carry-ons.'),
  ('cadillac-escalade-platinum-2025',
   '2025 Escalade Platinum — the most refined American SUV. Super Cruise, executive seating, the new standard in domestic luxury.'),
  ('bentley-bentayga-white',
   'White Bentayga with diamond-quilted leather. The British answer to a Cullinan — quieter, more discreet, hand-finished where it matters.'),
  ('range-rover-sport-2026',
   'Brand-new 2026 Range Rover Sport. The British SUV that does everything — from causeway to compound — without raising its voice.'),
  ('rolls-royce-cullinan-black',
   'Murdered-out black Cullinan. Discreet, fast, cavernous — the right Rolls when the day calls for arriving without comment.'),
  ('rolls-royce-cullinan-tiffany-blue',
   'White Cullinan with Tiffany-blue leather interior. The most-photographed Rolls in the fleet.'),
  ('corvette-stingray-2025-white-int',
   '2025 Stingray with white interior. American mid-engine performance for half the price of the European answer.'),
  ('ferrari-488-spider-red',
   'Classic red 488 Spider. Twin-turbo V8, retractable hardtop. The Ferrari profile, without the roof.'),
  ('lamborghini-aventador',
   'V12 hypercar, the flagship of the fleet. Tan over brown — the mature take on the Aventador silhouette.'),
  ('mclaren-artura-spider-neon-yellow',
   'Hybrid V6 plug-in supercar Spider. Neon yellow over carbon. The newest McLaren in the fleet — top down, the future on tap.'),
  ('rolls-royce-ghost-white',
   'White-on-tan Ghost. Whisper quiet, starlight headliner standard.')
) as t(slug, new_desc)
where v.slug = t.slug;
