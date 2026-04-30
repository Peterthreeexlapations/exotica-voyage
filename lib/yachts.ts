import { getSupabase } from "./supabase";
import type { Yacht, YachtWithMedia } from "./types";

// Yachts ≥ 100 ft are charter-week boats; show weekly rate publicly.
// Smaller yachts are day-charter; show daily rate.
export function yachtDisplayRate(y: Pick<Yacht, "length_ft" | "daily_rate" | "weekly_rate">): {
  amount: number;
  period: "week" | "day";
} {
  const lengthFt = Number(y.length_ft);
  const daily = Number(y.daily_rate);
  if (lengthFt >= 100) {
    const weekly = y.weekly_rate != null ? Number(y.weekly_rate) : daily * 7;
    return { amount: weekly, period: "week" };
  }
  return { amount: daily, period: "day" };
}

// Always-comparable weekly-equivalent value used by sorting.
export function yachtWeeklyEquivalent(y: Pick<Yacht, "length_ft" | "daily_rate" | "weekly_rate">): number {
  const daily = Number(y.daily_rate);
  return y.weekly_rate != null ? Number(y.weekly_rate) : daily * 7;
}

export async function getFeaturedYachts(limit = 3): Promise<YachtWithMedia[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("yachts")
    .select("*, yacht_media(*)")
    .eq("featured", true)
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[getFeaturedYachts]", error.message);
    return [];
  }
  return (data ?? []) as YachtWithMedia[];
}

export async function getAvailableYachts(): Promise<YachtWithMedia[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("yachts")
    .select("*, yacht_media(*)")
    .eq("available", true)
    .order("featured", { ascending: false })
    .order("daily_rate", { ascending: false });
  if (error) {
    console.error("[getAvailableYachts]", error.message);
    return [];
  }
  return (data ?? []) as YachtWithMedia[];
}

export async function getYachtBySlug(slug: string): Promise<YachtWithMedia | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("yachts")
    .select("*, yacht_media(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[getYachtBySlug]", error.message);
    return null;
  }
  return (data as YachtWithMedia) ?? null;
}

export async function getAllYachtSlugs(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("yachts").select("slug");
  if (error || !data) return [];
  return (data as Pick<Yacht, "slug">[]).map((r) => r.slug);
}

export function pickYachtHero(y: YachtWithMedia) {
  const hero = y.yacht_media?.find((m) => m.is_hero);
  return hero ?? y.yacht_media?.[0] ?? null;
}

export function yachtGallery(y: YachtWithMedia) {
  const hero = y.yacht_media?.find((m) => m.is_hero);
  return (y.yacht_media ?? [])
    .filter((m) => !hero || m.id !== hero.id)
    .sort((a, b) => a.sort_order - b.sort_order);
}
