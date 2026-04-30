"use client";

import { cn } from "@/lib/utils";
import Dropdown from "./Dropdown";

type Chip = { key: string; label: string; count: number };

type SortOption = { key: string; label: string };

export default function FilterBar({
  chips,
  currentChip,
  onChipChange,
  sortOptions,
  currentSort,
  onSortChange,
  total,
}: {
  chips: Chip[];
  currentChip: string;
  onChipChange: (k: string) => void;
  sortOptions: SortOption[];
  currentSort: string;
  onSortChange: (k: string) => void;
  total: number;
}) {
  return (
    <div className="sticky top-20 z-30 border-b border-ink-700 bg-ink-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {chips.map((chip) => {
              const active = currentChip === chip.key;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => onChipChange(chip.key)}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-2 px-4 py-2 border font-mono text-[10px] uppercase tracking-widest2 transition-all duration-300 ease-luxury whitespace-nowrap",
                    active
                      ? "border-bronze-300 text-bronze-300 bg-ink-900"
                      : "border-ink-700 text-bone/60 hover:border-bronze-300/60 hover:text-bronze-300",
                  )}
                >
                  <span>{chip.label}</span>
                  <span
                    className={cn(
                      "transition-colors",
                      active ? "text-bronze-300" : "text-bone/35",
                    )}
                  >
                    {String(chip.count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40 hidden sm:inline">
              {String(total).padStart(2, "0")} Showing &middot; Sort
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40 sm:hidden">
              Sort
            </span>
            <Dropdown
              value={currentSort}
              onChange={onSortChange}
              options={sortOptions}
              align="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
