import Link from "next/link";
import AircraftCard from "./AircraftCard";
import Eyebrow from "./Eyebrow";
import EmptyState from "./EmptyState";
import { getFeaturedAircraft } from "@/lib/aircraft";

export default async function FeaturedAircraft() {
  const aircraft = await getFeaturedAircraft(3);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Featured · Hangar</Eyebrow>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone max-w-2xl">
              In the <span className="italic">hangar</span> tonight.
            </h2>
          </div>
          <Link
            href="/aviation"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 hover:text-bronze-200 border-b border-bronze-300/40 pb-1 self-start md:self-end"
          >
            <span>View Full Hangar</span>
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="mt-14">
          {aircraft.length === 0 ? (
            <EmptyState
              title="The hangar manifest is updated weekly."
              body="Aircraft availability shifts daily &mdash; the right answer for your route depends on dates, distance, and party size. Message the concierge."
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {aircraft.map((a) => (
                <AircraftCard key={a.id} aircraft={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
