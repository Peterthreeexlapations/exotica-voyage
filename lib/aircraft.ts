import { getSupabase } from "./supabase";
import type { Aircraft, AircraftWithMedia } from "./types";

export async function getFeaturedAircraft(limit = 3): Promise<AircraftWithMedia[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("aircraft")
    .select("*, aircraft_media(*)")
    .eq("featured", true)
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[getFeaturedAircraft]", error.message);
    return [];
  }
  return (data ?? []) as AircraftWithMedia[];
}

export async function getAvailableAircraft(): Promise<AircraftWithMedia[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("aircraft")
    .select("*, aircraft_media(*)")
    .eq("available", true)
    .order("featured", { ascending: false })
    .order("hourly_rate", { ascending: false });
  if (error) {
    console.error("[getAvailableAircraft]", error.message);
    return [];
  }
  return (data ?? []) as AircraftWithMedia[];
}

export async function getAircraftBySlug(slug: string): Promise<AircraftWithMedia | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("aircraft")
    .select("*, aircraft_media(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[getAircraftBySlug]", error.message);
    return null;
  }
  return (data as AircraftWithMedia) ?? null;
}

export async function getAllAircraftSlugs(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("aircraft").select("slug");
  if (error || !data) return [];
  return (data as Pick<Aircraft, "slug">[]).map((r) => r.slug);
}

export function pickAircraftHero(a: AircraftWithMedia) {
  const hero = a.aircraft_media?.find((m) => m.is_hero);
  return hero ?? a.aircraft_media?.[0] ?? null;
}

export function aircraftGallery(a: AircraftWithMedia) {
  const hero = a.aircraft_media?.find((m) => m.is_hero);
  return (a.aircraft_media ?? [])
    .filter((m) => !hero || m.id !== hero.id)
    .sort((a, b) => a.sort_order - b.sort_order);
}
