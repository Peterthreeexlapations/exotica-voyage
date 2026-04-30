import { getSupabase } from "./supabase";
import type { Vehicle, VehicleWithMedia } from "./types";

export async function getFeaturedVehicles(limit = 3): Promise<VehicleWithMedia[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("vehicles")
    .select("*, vehicle_media(*)")
    .eq("featured", true)
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[getFeaturedVehicles]", error.message);
    return [];
  }
  return (data ?? []) as VehicleWithMedia[];
}

export async function getVehiclesBySlugs(slugs: string[]): Promise<VehicleWithMedia[]> {
  const sb = getSupabase();
  if (!sb || slugs.length === 0) return [];
  const { data, error } = await sb
    .from("vehicles")
    .select("*, vehicle_media(*)")
    .in("slug", slugs);
  if (error) {
    console.error("[getVehiclesBySlugs]", error.message);
    return [];
  }
  const bySlug = new Map((data ?? []).map((v) => [v.slug, v as VehicleWithMedia]));
  return slugs.map((s) => bySlug.get(s)).filter((v): v is VehicleWithMedia => Boolean(v));
}

export async function getAvailableFleet(): Promise<VehicleWithMedia[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("vehicles")
    .select("*, vehicle_media(*)")
    .eq("available", true)
    .order("featured", { ascending: false })
    .order("daily_rate", { ascending: false });
  if (error) {
    console.error("[getAvailableFleet]", error.message);
    return [];
  }
  return (data ?? []) as VehicleWithMedia[];
}

export async function getVehicleBySlug(slug: string): Promise<VehicleWithMedia | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("vehicles")
    .select("*, vehicle_media(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[getVehicleBySlug]", error.message);
    return null;
  }
  return (data as VehicleWithMedia) ?? null;
}

export async function getAllVehicleSlugs(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("vehicles").select("slug");
  if (error || !data) return [];
  return (data as Pick<Vehicle, "slug">[]).map((r) => r.slug);
}

export function pickHero(v: VehicleWithMedia) {
  const hero = v.vehicle_media?.find((m) => m.is_hero);
  return hero ?? v.vehicle_media?.[0] ?? null;
}

export function gallery(v: VehicleWithMedia) {
  const hero = v.vehicle_media?.find((m) => m.is_hero);
  return (v.vehicle_media ?? [])
    .filter((m) => !hero || m.id !== hero.id)
    .sort((a, b) => a.sort_order - b.sort_order);
}
