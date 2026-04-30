"use client";

import { useMemo, useState } from "react";
import VehicleCard from "./VehicleCard";
import EmptyState from "./EmptyState";
import Dropdown from "./Dropdown";
import { cn } from "@/lib/utils";
import type { VehicleWithMedia } from "@/lib/types";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-desc", label: "Price · High to Low" },
  { key: "price-asc", label: "Price · Low to High" },
  { key: "year-desc", label: "Year · Newest" },
  { key: "name", label: "Name · A–Z" },
];

// Hand-curated coolest / rarest cars, in display order for the "Featured" sort.
// Bugatti first, then Aventador SVJ with custom Gintani exhaust, then halo Lamborghinis,
// the rare Ferraris, custom Rolls-Royces, and special-edition Urus variants.
const CURATED_FEATURED: string[] = [
  "bugatti-chiron",
  "aventador-svj-gintani",
  "aventador-s",
  "ferrari-purosangue",
  "huracan-sto",
  "lamborghini-huracan-tecnica",
  "ferrari-f8-tributo-berlinetta-whitered",
  "rolls-royce-spectre",
  "custom-rr-cullinan-tiffany-blue",
  "immersive-cullinan",
  "mclaren-720s-custom",
  "keyvany-keyrus-urus",
  "rr-dawn-black-badge",
  "maybach-s680-v12",
  "lamborghini-urus-performante-2024",
  "lamborghini-urus-se-2026",
  "lamborghini-urus-wide-body",
  "ferrari-488-spider",
  "tailor-made-488-spider",
  "mclaren-artura-spider-silverred",
  "2025-mclaren-artura-spider",
  "rolls-royce-cullinan-blackblack",
  "maybach-gls600-with-stars-white",
  "g63-amg-whiteout",
  "widebody-g63-amg-custom",
];

function sortVehicles(list: VehicleWithMedia[], sort: string): VehicleWithMedia[] {
  const copy = [...list];
  switch (sort) {
    case "price-desc":
      return copy.sort((a, b) => Number(b.daily_rate) - Number(a.daily_rate));
    case "price-asc":
      return copy.sort((a, b) => Number(a.daily_rate) - Number(b.daily_rate));
    case "year-desc":
      return copy.sort((a, b) => b.year - a.year || Number(b.daily_rate) - Number(a.daily_rate));
    case "name":
      return copy.sort((a, b) =>
        `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`),
      );
    case "featured":
    default:
      return copy.sort((a, b) => {
        const ai = CURATED_FEATURED.indexOf(a.slug);
        const bi = CURATED_FEATURED.indexOf(b.slug);
        // Both curated → preserve curated order
        if (ai !== -1 && bi !== -1) return ai - bi;
        // Only one curated → curated wins
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        // Neither curated → fall back to featured flag, then price desc
        return (
          Number(b.featured) - Number(a.featured) ||
          Number(b.daily_rate) - Number(a.daily_rate)
        );
      });
  }
}

export default function FleetClient({ vehicles }: { vehicles: VehicleWithMedia[] }) {
  const [brand, setBrand] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  // Unique brands sorted alphabetically
  const brandsList = useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of vehicles) counts.set(v.make, (counts.get(v.make) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, [vehicles]);

  // Apply filter + sort
  const filtered = useMemo(() => {
    let list = vehicles;
    if (brand !== "all") list = list.filter((v) => v.make === brand);
    return sortVehicles(list, sort);
  }, [vehicles, brand, sort]);

  // Group by brand for display
  const grouped = useMemo(() => {
    const out = new Map<string, VehicleWithMedia[]>();
    for (const v of filtered) {
      const arr = out.get(v.make) ?? [];
      arr.push(v);
      out.set(v.make, arr);
    }
    // Sort group keys alphabetically
    return Array.from(out.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const showingAll = brand === "all";
  const total = filtered.length;

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-20 z-30 border-b border-ink-700 bg-ink-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <label className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                {"— "}Brand
              </label>
              <Dropdown
                value={brand}
                onChange={setBrand}
                className="min-w-[200px]"
                options={[
                  { key: "all", label: `All Brands (${vehicles.length})` },
                  ...brandsList.map((b) => ({
                    key: b.name,
                    label: `${b.name} (${b.count})`,
                  })),
                ]}
              />
              <button
                type="button"
                onClick={() => setBrand("all")}
                disabled={showingAll}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 border font-mono text-[10px] uppercase tracking-widest2 transition-colors duration-300 ease-luxury whitespace-nowrap",
                  showingAll
                    ? "border-ink-700 text-bone/30 cursor-not-allowed"
                    : "border-bronze-300 text-bronze-300 hover:bg-bronze-300 hover:text-ink-950",
                )}
              >
                <span>View Full Fleet</span>
                {!showingAll && <span aria-hidden>&rarr;</span>}
              </button>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40 hidden sm:inline">
                {String(total).padStart(2, "0")} Showing &middot; Sort
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40 sm:hidden">
                Sort
              </span>
              <Dropdown
                value={sort}
                onChange={setSort}
                options={SORT_OPTIONS}
                align="right"
              />
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-content px-6 lg:px-12 py-16">
          <EmptyState />
        </div>
      ) : sort === "featured" ? (
        grouped.map(([make, list]) => {
          const slug = make.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const count = String(list.length).padStart(2, "0");
          return (
            <section
              key={make}
              id={`brand-${slug}`}
              className="py-16 lg:py-24 border-t border-ink-700 first:border-t-0 scroll-mt-44"
            >
              <div className="mx-auto max-w-content px-6 lg:px-12">
                <div className="flex items-end justify-between gap-6 mb-10">
                  <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
                    {make}
                  </h2>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 text-right shrink-0 pb-3">
                    {count} &mdash; In Fleet
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-content px-6 lg:px-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
