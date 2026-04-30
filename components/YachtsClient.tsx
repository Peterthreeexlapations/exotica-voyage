"use client";

import { useMemo, useState } from "react";
import YachtCard from "./YachtCard";
import FilterBar from "./FilterBar";
import EmptyState from "./EmptyState";
import type { YachtWithMedia } from "@/lib/types";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-desc", label: "Price · High to Low" },
  { key: "price-asc", label: "Price · Low to High" },
  { key: "length-desc", label: "Length · Largest" },
  { key: "length-asc", label: "Length · Smallest" },
  { key: "year-desc", label: "Year · Newest" },
];

const TIERS = [
  { key: "tier-day", label: "Day Boats", min: 0, max: 49.999 },
  { key: "tier-mid", label: "50–69 ft", min: 50, max: 69.999 },
  { key: "tier-large", label: "70–99 ft", min: 70, max: 99.999 },
  { key: "tier-mega", label: "100–149 ft", min: 100, max: 149.999 },
  { key: "tier-super", label: "150 ft+", min: 150, max: 9999 },
];

function tierForLength(ft: number) {
  return TIERS.find((t) => ft >= t.min && ft <= t.max)?.key ?? "tier-mid";
}

// Normalize prices to weekly equivalent so 100ft+ yachts (priced weekly)
// and smaller day-charter yachts compare apples-to-apples.
function priceComparable(y: YachtWithMedia): number {
  return y.weekly_rate != null ? Number(y.weekly_rate) : Number(y.daily_rate) * 7;
}

function sortYachts(list: YachtWithMedia[], sort: string): YachtWithMedia[] {
  const copy = [...list];
  switch (sort) {
    case "price-desc":
      return copy.sort((a, b) => priceComparable(b) - priceComparable(a));
    case "price-asc":
      return copy.sort((a, b) => priceComparable(a) - priceComparable(b));
    case "length-desc":
      return copy.sort((a, b) => Number(b.length_ft) - Number(a.length_ft));
    case "length-asc":
      return copy.sort((a, b) => Number(a.length_ft) - Number(b.length_ft));
    case "year-desc":
      return copy.sort((a, b) => b.year - a.year || priceComparable(b) - priceComparable(a));
    case "featured":
    default:
      return copy.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          priceComparable(b) - priceComparable(a),
      );
  }
}

export default function YachtsClient({ yachts }: { yachts: YachtWithMedia[] }) {
  const [tier, setTier] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  const tierCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const y of yachts) {
      const t = tierForLength(Number(y.length_ft));
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return counts;
  }, [yachts]);

  const chips = useMemo(
    () => [
      { key: "all", label: "All", count: yachts.length },
      ...TIERS.filter((t) => (tierCounts.get(t.key) ?? 0) > 0).map((t) => ({
        key: t.key,
        label: t.label,
        count: tierCounts.get(t.key) ?? 0,
      })),
    ],
    [tierCounts, yachts.length],
  );

  const filtered = useMemo(() => {
    let list = yachts;
    if (tier !== "all") list = list.filter((y) => tierForLength(Number(y.length_ft)) === tier);
    return sortYachts(list, sort);
  }, [yachts, tier, sort]);

  // Group by tier (smallest to largest)
  const grouped = useMemo(() => {
    const buckets = new Map<string, YachtWithMedia[]>();
    for (const y of filtered) {
      const k = tierForLength(Number(y.length_ft));
      const arr = buckets.get(k) ?? [];
      arr.push(y);
      buckets.set(k, arr);
    }
    return TIERS.filter((t) => buckets.has(t.key)).map((t) => ({
      tier: t,
      list: (buckets.get(t.key) ?? []).sort((a, b) => Number(a.length_ft) - Number(b.length_ft)),
    }));
  }, [filtered]);

  return (
    <>
      <FilterBar
        chips={chips}
        currentChip={tier}
        onChipChange={setTier}
        sortOptions={SORT_OPTIONS}
        currentSort={sort}
        onSortChange={setSort}
        total={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-content px-6 lg:px-12 py-16">
          <EmptyState />
        </div>
      ) : sort === "featured" ? (
        grouped.map(({ tier: t, list }) => (
          <section
            key={t.key}
            id={t.key}
            className="py-16 lg:py-24 border-t border-ink-700 first:border-t-0 scroll-mt-44"
          >
            <div className="mx-auto max-w-content px-6 lg:px-12">
              <div className="flex items-end justify-between gap-6 mb-10">
                <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
                  {t.label}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 text-right shrink-0 pb-3">
                  {String(list.length).padStart(2, "0")} &mdash; In Marina
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {list.map((y) => (
                  <YachtCard key={y.id} yacht={y} />
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-content px-6 lg:px-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((y) => (
                <YachtCard key={y.id} yacht={y} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
