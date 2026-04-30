import VehicleCard from "./VehicleCard";
import { CATEGORY_LABEL, type VehicleCategory, type VehicleWithMedia } from "@/lib/types";

export default function CategorySection({
  category,
  vehicles,
}: {
  category: VehicleCategory;
  vehicles: VehicleWithMedia[];
}) {
  if (vehicles.length === 0) return null;
  const count = String(vehicles.length).padStart(2, "0");

  return (
    <section
      id={`cat-${category}`}
      className="py-16 lg:py-24 border-t border-ink-700 first:border-t-0 scroll-mt-44"
    >
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
            {CATEGORY_LABEL[category]}
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 text-right shrink-0 pb-3">
            {count} &mdash; Available
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
