"use client";

import { useMemo, useState } from "react";
import AircraftCard from "./AircraftCard";
import FilterBar from "./FilterBar";
import EmptyState from "./EmptyState";
import {
  AIRCRAFT_CATEGORY_ORDER,
  AIRCRAFT_CATEGORY_LABEL,
  type AircraftCategory,
  type AircraftWithMedia,
} from "@/lib/types";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "passengers-desc", label: "Passengers · Most" },
  { key: "passengers-asc", label: "Passengers · Fewest" },
  { key: "year-desc", label: "Year · Newest" },
];

function sortAircraft(list: AircraftWithMedia[], sort: string): AircraftWithMedia[] {
  const copy = [...list];
  switch (sort) {
    case "passengers-desc":
      return copy.sort((a, b) => b.passengers - a.passengers);
    case "passengers-asc":
      return copy.sort((a, b) => a.passengers - b.passengers);
    case "year-desc":
      return copy.sort((a, b) => b.year - a.year);
    case "featured":
    default:
      return copy.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.passengers - a.passengers,
      );
  }
}

export default function AviationClient({ aircraft }: { aircraft: AircraftWithMedia[] }) {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  const catCounts = useMemo(() => {
    const counts = new Map<AircraftCategory, number>();
    for (const a of aircraft) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    return counts;
  }, [aircraft]);

  const chips = useMemo(
    () => [
      { key: "all", label: "All", count: aircraft.length },
      ...AIRCRAFT_CATEGORY_ORDER.filter((c) => (catCounts.get(c) ?? 0) > 0).map((c) => ({
        key: c,
        label: AIRCRAFT_CATEGORY_LABEL[c],
        count: catCounts.get(c) ?? 0,
      })),
    ],
    [catCounts, aircraft.length],
  );

  const filtered = useMemo(() => {
    let list = aircraft;
    if (category !== "all") list = list.filter((a) => a.category === category);
    return sortAircraft(list, sort);
  }, [aircraft, category, sort]);

  const grouped = useMemo(() => {
    const buckets = new Map<AircraftCategory, AircraftWithMedia[]>();
    for (const a of filtered) {
      const arr = buckets.get(a.category) ?? [];
      arr.push(a);
      buckets.set(a.category, arr);
    }
    return AIRCRAFT_CATEGORY_ORDER.filter((c) => buckets.has(c)).map((c) => ({
      cat: c,
      list: buckets.get(c) ?? [],
    }));
  }, [filtered]);

  return (
    <>
      <FilterBar
        chips={chips}
        currentChip={category}
        onChipChange={setCategory}
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
        grouped.map(({ cat, list }) => (
          <section
            key={cat}
            id={`cat-${cat}`}
            className="py-16 lg:py-24 border-t border-ink-700 first:border-t-0 scroll-mt-44"
          >
            <div className="mx-auto max-w-content px-6 lg:px-12">
              <div className="flex items-end justify-between gap-6 mb-10">
                <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
                  {AIRCRAFT_CATEGORY_LABEL[cat]}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 text-right shrink-0 pb-3">
                  {String(list.length).padStart(2, "0")} &mdash; In Hangar
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <AircraftCard key={a.id} aircraft={a} />
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-content px-6 lg:px-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <AircraftCard key={a.id} aircraft={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
