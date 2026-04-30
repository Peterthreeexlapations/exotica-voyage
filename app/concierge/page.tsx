import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "Beyond the fleet — estate rentals, personal protection, helipad transfer, private chef, VIP airport handling, and the rest of South Florida's most discreet network.",
};

const services: {
  num: string;
  title: string;
  body: string;
  price?: string;
  inquiry: string;
}[] = [
  {
    num: "01",
    title: "Estate Rentals",
    body:
      "Penthouse residences, waterfront estates, Star Island compounds. Day, weekend, weekly — fully staffed, sourced through the same network that supplies the fleet.",
    inquiry: "an estate rental",
  },
  {
    num: "02",
    title: "Personal Protection",
    body:
      "Executive bodyguards, transport details, event security. Licensed professionals from a network we know personally. Discreet, prepared, never the story.",
    inquiry: "personal protection",
  },
  {
    num: "03",
    title: "Police Escorts",
    body:
      "Off-duty motor officer escorts for high-profile arrivals, departures, and route security. Coordinated through licensed law-enforcement partners across South Florida.",
    price: "$3,000 / trip",
    inquiry: "a police escort",
  },
  {
    num: "04",
    title: "Bulletproof Transportation",
    body:
      "Armored SUVs and sedans for executive principals and high-risk movements. B6/B7-rated vehicles, trained drivers, route planning included.",
    inquiry: "bulletproof transportation",
  },
  {
    num: "05",
    title: "Helipad Arrival",
    body:
      "Direct waterfront helipad service — landing platforms on the bay, Watson Island, marina-side, and select private estates. The right answer when traffic is the day's biggest obstacle.",
    price: "$6,000 / arrival",
    inquiry: "a waterfront helipad arrival",
  },
  {
    num: "06",
    title: "Airport Transfers",
    body:
      "One-way executive transfer between FBO, residence, hotel, or marina. Fully chauffeured, on time, every time.",
    price: "SUV $250 · Sprinter $400",
    inquiry: "an airport transfer",
  },
  {
    num: "07",
    title: "Hourly Transport",
    body:
      "Chauffeured hourly hire for the day — meetings, errands, gallery openings. Rates by vehicle class.",
    price: "SUV $125/hr · Sprinter $175/hr · Cullinan $300/hr",
    inquiry: "hourly transport",
  },
  {
    num: "08",
    title: "Yacht Crew & Provisioning",
    body:
      "Captains, chefs, deckhands, full provisioning, Bahamas clearance. Standard with any yacht charter — but available stand-alone for owners and existing clients.",
    inquiry: "yacht crew or provisioning",
  },
  {
    num: "09",
    title: "Private Chef & Catering",
    body:
      "Yacht-side, residence, on-board jet. Menus designed around the occasion, not the kitchen. Wine pairings and service staff included on request.",
    inquiry: "a private chef or catering",
  },
  {
    num: "10",
    title: "VIP Airport Handling",
    body:
      "FBO meet-and-greet, customs assistance, ground-transport coordination. Land at Opa-locka and disappear in under twenty minutes.",
    inquiry: "VIP airport handling",
  },
  {
    num: "11",
    title: "Event Coordination",
    body:
      "Birthdays, anniversaries, brand activations, proposals. Vendors, venues, vehicles, photographers — handled in a single thread.",
    inquiry: "event coordination",
  },
  {
    num: "12",
    title: "Anything Else",
    body:
      "If you don't see it here, ask. The network reaches further than this page — security, logistics, hospitality, art transport, last-minute reservations.",
    inquiry: "a custom request",
  },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2400&q=80";

export default function ConciergePage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/70 to-ink-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40" />
        </div>

        <div className="relative mx-auto max-w-content px-6 lg:px-12">
          <div className="flex min-h-[68vh] items-end pb-20 pt-32 md:pb-28">
            <div className="max-w-3xl">
              <Eyebrow>The Concierge</Eyebrow>
              <h1 className="mt-6 font-display text-[14vw] sm:text-[10vw] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.9] tracking-tightest text-bone">
                Beyond the <span className="italic">fleet.</span>
              </h1>
              <p className="mt-8 max-w-prose2 text-base md:text-lg leading-relaxed text-bone/75">
                The cars, the yachts, the aircraft are the door. Everything that follows &mdash; the residence, the security, the chef, the helipad, the room at the table &mdash; we arrange the same way: in conversation, with one phone number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Services</Eyebrow>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
              Twelve ways the day <span className="italic">expands.</span>
            </h2>
            <p className="mt-6 max-w-prose2 text-bone/65 leading-relaxed">
              Some services have a fixed rate listed below; the rest are quoted on the call. The right answer always depends on the dates, the party, and the route &mdash; message the concierge and we'll respond inside the hour.
            </p>
          </div>

          <div className="grid gap-px bg-ink-700 border border-ink-700">
            {services.map((s) => (
              <Link
                key={s.num}
                href={whatsappLink(whatsappMessages.conciergeService(s.inquiry))}
                target="_blank"
                rel="noopener"
                className="group block bg-ink-950 p-8 lg:p-10 hover:bg-ink-900 transition-colors duration-500 ease-luxury sm:[&:nth-child(odd)]:border-r-0 md:[&]:border-r-0"
                style={{ minHeight: "240px" }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
                      {"— "}{s.num}
                    </p>
                    {s.price && (
                      <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300/80 text-right">
                        {s.price}
                      </p>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-3xl md:text-4xl leading-[0.95] tracking-tightest text-bone group-hover:text-bronze-200 transition-colors duration-500 ease-luxury">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-bone/65 leading-relaxed flex-1">
                    {s.body}
                  </p>
                  <p className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 group-hover:text-bronze-200 transition-colors">
                    <span>{s.price ? "Inquire / Book" : "Inquire via WhatsApp"}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Force 2-col on md+ via inline grid override */}
          <style>
            {`
              @media (min-width: 768px) {
                article section .grid.gap-px {
                  grid-template-columns: 1fr 1fr;
                }
              }
            `}
          </style>
        </div>
      </section>

      {/* Closing block */}
      <section className="border-t border-ink-700 bg-ink-900/40 py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="border border-ink-700 px-8 py-20 md:px-16 md:py-28 text-center bg-ink-950">
            <Eyebrow>Anything Else</Eyebrow>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-tightest text-bone">
              If you don't see it here, <span className="italic">ask.</span>
            </h2>
            <p className="mt-8 mx-auto max-w-prose2 text-bone/65 leading-relaxed">
              Our network reaches further than this page. Security details, last-minute reservations, art logistics, late-night problem-solving &mdash; if it can be arranged in South Florida, we can usually arrange it within the hour.
            </p>
            <div className="mt-10 inline-flex">
              <WhatsAppCTA
                message={whatsappMessages.concierge()}
                label="Message Concierge"
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
