import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import FleetClient from "@/components/FleetClient";
import { getAvailableFleet } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "The Fleet",
  description:
    "Every vehicle currently arrangeable through Exotica Voyage Group — grouped by brand, with daily rates in Miami, Fort Lauderdale, and Palm Beach.",
};

export const revalidate = 60;

export default async function FleetPage() {
  const vehicles = await getAvailableFleet();
  const totalCount = String(vehicles.length).padStart(2, "0");
  const brandCount = new Set(vehicles.map((v) => v.make)).size;

  return (
    <>
      <section className="border-b border-ink-700 py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>The Fleet</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
            Currently <span className="italic">arrangeable.</span>
          </h1>
          <p className="mt-8 max-w-prose2 text-bone/65 leading-relaxed text-lg">
            Every vehicle below is available now or by short notice. Private listings not shown here exist for established clients &mdash; ask the concierge.
          </p>
          {vehicles.length > 0 && (
            <p className="mt-10 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
              {"— "}{totalCount} Vehicles &middot; {brandCount} Marques &middot; License Only
            </p>
          )}
          <div className="mt-8 inline-flex items-center gap-3 border border-ink-700 bg-ink-900/40 px-5 py-3">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
              {"— "}Requirements
            </span>
            <span className="text-bone/70 text-sm">
              Driver's license required.
            </span>
          </div>
        </div>
      </section>

      <FleetClient vehicles={vehicles} />
    </>
  );
}
