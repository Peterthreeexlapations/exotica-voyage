import Link from "next/link";
import VehicleCard from "./VehicleCard";
import Eyebrow from "./Eyebrow";
import EmptyState from "./EmptyState";
import { getVehiclesBySlugs } from "@/lib/vehicles";

const HOME_FEATURED_SLUGS = [
  "aventador-svj-gintani",
  "rolls-royce-spectre",
  "keyvany-keyrus-urus",
];

export default async function FeaturedFleet() {
  const vehicles = await getVehiclesBySlugs(HOME_FEATURED_SLUGS);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Featured</Eyebrow>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone max-w-2xl">
              Selections from the <span className="italic">current</span> garage.
            </h2>
          </div>
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 hover:text-bronze-200 border-b border-bronze-300/40 pb-1 self-start md:self-end"
          >
            <span>View Full Fleet</span>
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="mt-14">
          {vehicles.length === 0 ? (
            <EmptyState
              title="The featured edition is currently being curated."
              body="Reach out for the unpublished list — most clients book before a vehicle reaches this page."
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
