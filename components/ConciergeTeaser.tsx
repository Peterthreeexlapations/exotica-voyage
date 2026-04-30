import Link from "next/link";
import Eyebrow from "./Eyebrow";

const services = [
  "Estate Rentals",
  "Personal Protection",
  "Police Escorts",
  "Bulletproof Transport",
  "Helipad Arrival",
  "Airport Transfers",
  "Hourly Transport",
  "Yacht Crew & Provisioning",
  "Private Chef & Catering",
  "VIP Airport Handling",
  "Event Coordination",
  "Anything Else",
];

export default function ConciergeTeaser() {
  return (
    <section className="border-y border-ink-700 bg-ink-900/40 py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Beyond the Fleet</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tightest text-bone">
              When the day <span className="italic">expands.</span>
            </h2>
            <p className="mt-6 max-w-prose2 text-bone/65 leading-relaxed text-lg">
              Estate rentals. Personal protection. Helipad transfer. Private chef. VIP airport handling. Anything else the day requires &mdash; arranged through the same number.
            </p>
            <Link
              href="/concierge"
              className="mt-10 inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 bg-bronze-300 text-ink-950 hover:bg-bronze-200 transition-colors duration-300 ease-luxury"
            >
              <span>Explore Concierge</span>
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          <div className="md:col-span-5">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-l border-ink-700 pl-6">
              {services.map((s, i) => (
                <li key={s} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300/60 w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-bone/70">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
