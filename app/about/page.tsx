import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Exotica Voyage Group is a private brokerage across South Florida — exotic motoring, yacht charters, and private aviation, sourced from collectors, captains, and operators we know personally.",
};

const departments = [
  {
    code: "01",
    name: "By Road",
    body:
      "Exotic motoring sourced from collectors and partner garages across Miami, Fort Lauderdale, and Palm Beach. Daily and weekly rates, hand delivery to hotel or residence, single point of contact from handoff to return.",
  },
  {
    code: "02",
    name: "By Sea",
    body:
      "Yacht charters from Miami Beach Marina and Pier 66. Day boats to motor yachts. Crew, provisioning, dock arrangements, and Bahamas clearance handled. Half-day, full-day, and weekly bookings.",
  },
  {
    code: "03",
    name: "By Air",
    body:
      "Private aviation from Opa-locka, Fort Lauderdale Executive, and the Watson Island helipad. Heavy jet to helicopter, by the hour. Routes, catering, and ground transfer arranged through the same concierge.",
  },
];

const locations = [
  { code: "MIA", name: "Miami", body: "Brickell, South Beach, Bal Harbour, Coconut Grove, Star Island. Same-day delivery, often within the hour." },
  { code: "FLL", name: "Fort Lauderdale", body: "Las Olas, Pier 66, the marinas. Yacht-side handoffs are routine. Aircraft from KFXE." },
  { code: "PBI", name: "Palm Beach", body: "Worth Avenue, Breakers, Manalapan. Discreet, by appointment, often unannounced." },
  { code: "NYC", name: "New York", body: "Manhattan and the Hamptons. Cars, helicopters, and Teterboro departures arranged through the same concierge." },
  { code: "CHI", name: "Chicago", body: "Gold Coast, Lincoln Park, the lakefront. Ground transport and private aviation from KPWK and Midway." },
  { code: "MCM", name: "Monaco", body: "Monte-Carlo, Monaco-Ville, Larvotto. Yacht and motoring arrangements coordinated for Grand Prix and Yacht Show weeks." },
  { code: "NCE", name: "South of France", body: "Cannes, Nice, Saint-Tropez, Antibes. Côte d'Azur charters and private aviation through Nice Côte d'Azur." },
  { code: "JTR", name: "Greece", body: "Mykonos, Santorini, Athens, the Cyclades. Crewed yacht charters and island-hop helicopter transfers." },
  { code: "SBH", name: "St. Barths", body: "Gustavia, Saline, Gouverneur. Villa-side handoffs and yacht arrivals through Port de Gustavia." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24 lg:py-36 border-b border-ink-700">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>The House</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone max-w-5xl">
            A private garage, marina, and hangar &mdash; <span className="italic">opened on request.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Brokered. Not rented.</Eyebrow>
          </div>
          <div className="md:col-span-7 space-y-8 text-lg leading-relaxed text-bone/75">
            <p>
              Exotica Voyage Group is a brokerage. We do not own the cars, the yachts, or the aircraft. We <em>know</em> them &mdash; the collectors who keep them, the captains who run them, the FBOs that fuel them.
            </p>
            <p>
              When you ask for a Huracán Spyder for the weekend, a 60-foot Princess for Saturday, or a CJ4 to Aspen by morning, we do not pull from a static fleet. We pull from a relationship. The right car, vessel, or aircraft arrives prepared, with a single point of contact handling every handoff.
            </p>
            <p>
              Pricing is conversational because the trade is conversational. There is no checkout, no surprise fee, and no surcharge. Rates are quoted, agreed, and honored.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-700 py-24 lg:py-32 bg-ink-900/40">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>Three Departments</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone max-w-4xl">
            Road, sea, <span className="italic">air.</span>
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {departments.map((d) => (
              <article key={d.code} className="border border-ink-700 p-8 lg:p-10 bg-ink-950">
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
                  {"— "}{d.code}
                </p>
                <h3 className="mt-5 font-display text-3xl md:text-4xl leading-[0.95] tracking-tightest text-bone">
                  {d.name}
                </h3>
                <p className="mt-5 text-bone/65 leading-relaxed">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-700 py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>The Service Area</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone max-w-3xl">
            Two continents. <span className="italic">One number.</span>
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {locations.map((loc) => (
              <article key={loc.code} className="border border-ink-700 p-8 lg:p-10 bg-ink-950">
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
                  {"— "}{loc.code}
                </p>
                <h3 className="mt-5 font-display text-3xl md:text-4xl leading-[0.95] tracking-tightest text-bone">
                  {loc.name}
                </h3>
                <p className="mt-5 text-bone/65 leading-relaxed">{loc.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
