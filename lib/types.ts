// ============================================================
// Vehicles (cars)
// ============================================================
export type VehicleCategory =
  | "hypercar"
  | "supercar"
  | "convertible"
  | "grand-tourer"
  | "suv"
  | "sedan";

export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  daily_rate: number;
  weekly_rate: number | null;
  horsepower: number | null;
  top_speed_mph: number | null;
  zero_to_sixty: number | null;
  transmission: string | null;
  seats: number | null;
  description: string | null;
  featured: boolean;
  available: boolean;
  location: string;
  created_at: string;
};

export type VehicleMedia = {
  id: string;
  vehicle_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_hero: boolean;
};

export type VehicleWithMedia = Vehicle & { vehicle_media: VehicleMedia[] };

export const CATEGORY_ORDER: VehicleCategory[] = [
  "hypercar",
  "supercar",
  "convertible",
  "grand-tourer",
  "suv",
  "sedan",
];

export const CATEGORY_LABEL: Record<VehicleCategory, string> = {
  hypercar: "Hypercars",
  supercar: "Supercars",
  convertible: "Convertibles",
  "grand-tourer": "Grand Tourers",
  suv: "SUVs",
  sedan: "Sedans",
};

// ============================================================
// Yachts
// ============================================================
export type YachtCategory =
  | "day-boat"
  | "sport-yacht"
  | "motor-yacht"
  | "sailing"
  | "sportfish"
  | "catamaran";

export type Yacht = {
  id: string;
  slug: string;
  builder: string;
  model: string;
  year: number;
  category: YachtCategory;
  length_ft: number;
  beam_ft: number | null;
  guests: number | null;
  cabins: number | null;
  crew: number | null;
  cruise_speed_kts: number | null;
  top_speed_kts: number | null;
  propulsion: string | null;
  daily_rate: number;
  half_day_rate: number | null;
  weekly_rate: number | null;
  description: string | null;
  featured: boolean;
  available: boolean;
  base_marina: string;
  created_at: string;
};

export type YachtMedia = {
  id: string;
  yacht_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_hero: boolean;
};

export type YachtWithMedia = Yacht & { yacht_media: YachtMedia[] };

export const YACHT_CATEGORY_ORDER: YachtCategory[] = [
  "day-boat",
  "sport-yacht",
  "motor-yacht",
  "sportfish",
  "catamaran",
  "sailing",
];

export const YACHT_CATEGORY_LABEL: Record<YachtCategory, string> = {
  "day-boat": "Day Boats",
  "sport-yacht": "Sport Yachts",
  "motor-yacht": "Motor Yachts",
  sportfish: "Sportfish",
  catamaran: "Catamarans",
  sailing: "Sailing",
};

// ============================================================
// Aircraft
// ============================================================
export type AircraftCategory =
  | "helicopter"
  | "turboprop"
  | "light-jet"
  | "mid-jet"
  | "heavy-jet"
  | "airliner";

export type Aircraft = {
  id: string;
  slug: string;
  manufacturer: string;
  model: string;
  year: number;
  category: AircraftCategory;
  passengers: number;
  range_nm: number | null;
  cruise_speed_kts: number | null;
  ceiling_ft: number | null;
  cabin_height_ft: number | null;
  crew: number | null;
  hourly_rate: number;
  daily_minimum: number | null;
  description: string | null;
  featured: boolean;
  available: boolean;
  base_airport: string;
  created_at: string;
};

export type AircraftMedia = {
  id: string;
  aircraft_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_hero: boolean;
};

export type AircraftWithMedia = Aircraft & { aircraft_media: AircraftMedia[] };

export const AIRCRAFT_CATEGORY_ORDER: AircraftCategory[] = [
  "heavy-jet",
  "mid-jet",
  "light-jet",
  "turboprop",
  "helicopter",
  "airliner",
];

export const AIRCRAFT_CATEGORY_LABEL: Record<AircraftCategory, string> = {
  helicopter: "Helicopters",
  turboprop: "Turboprops",
  "light-jet": "Light Jets",
  "mid-jet": "Mid-Size Jets",
  "heavy-jet": "Heavy Jets",
  airliner: "Airliners",
};

// ============================================================
// Generic spec table row (used by SpecsTable)
// ============================================================
export type SpecRow = { label: string; value: string | null };
