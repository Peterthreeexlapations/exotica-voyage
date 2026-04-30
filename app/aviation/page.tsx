import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import AviationClient from "@/components/AviationClient";
import { getAvailableAircraft } from "@/lib/aircraft";

export const metadata: Metadata = {
  title: "The Hangar",
  description:
    "Private aviation across South Florida — grouped by jet size, sortable by hourly rate. Heavy, mid-size, and light jets in the fleet.",
};

export const revalidate = 60;

export default async function AviationPage() {
  const aircraft = await getAvailableAircraft();
  const totalCount = String(aircraft.length).padStart(2, "0");
  const classCount = new Set(aircraft.map((a) => a.category)).size;

  return (
    <>
      <section className="border-b border-ink-700 py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>The Hangar</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
            On the <span className="italic">tarmac.</span>
          </h1>
          <p className="mt-8 max-w-prose2 text-bone/65 leading-relaxed text-lg">
            Private aviation arranged from Opa-locka, Fort Lauderdale Executive, and Watson Island. By the hour, with the same single point of contact handling the route, the catering, and the ground transfer.
          </p>
          {aircraft.length > 0 && (
            <p className="mt-10 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
              {"— "}{totalCount} Aircraft &middot; {classCount} Classes &middot; Hourly Charter
            </p>
          )}
        </div>
      </section>

      <AviationClient aircraft={aircraft} />
    </>
  );
}
