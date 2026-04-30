import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Four departments. One concierge. Choose your route — exotic motoring, yacht charter, private aviation, or beyond-the-fleet concierge services.",
};

const departments: {
  num: string;
  eyebrow: string;
  title: string;
  italicWord: string;
  description: string;
  meta: string;
  href: string;
  cta: string;
  image: string;
}[] = [
  {
    num: "01",
    eyebrow: "By Road",
    title: "The",
    italicWord: "Fleet",
    description:
      "Lamborghini, Ferrari, McLaren, Rolls-Royce, Bentley, Bugatti, Maybach. Eighty-five vehicles sourced from collectors and partner garages across Miami, Fort Lauderdale, and Palm Beach. Driver's license only — no insurance, no deposit.",
    meta: "85 vehicles · 14 marques · daily rates",
    href: "/fleet",
    cta: "Browse the Fleet",
    image: "/photos/cars/aventador-s/hero.jpg",
  },
  {
    num: "02",
    eyebrow: "By Sea",
    title: "The",
    italicWord: "Marina",
    description:
      "From a 25-foot Yamaha to a 206-foot Rossinavi. Crewed charters out of Miami Beach Marina and Pier 66 — day rates from a few thousand, weekly bookings on every vessel.",
    meta: "33 yachts · day & weekly · crewed",
    href: "/yachts",
    cta: "Browse the Marina",
    image: "/photos/yachts/206-rossinavi/hero.jpg",
  },
  {
    num: "03",
    eyebrow: "By Air",
    title: "The",
    italicWord: "Hangar",
    description:
      "Heavy, mid-size, and light jets — Gulfstream, Bombardier, Dassault, Cessna, Hawker, Learjet. Charter by the hour from Opa-locka, Fort Lauderdale Executive, and Watson Island. The concierge handles the route, the catering, the ground transfer.",
    meta: "16 aircraft · hourly charter · KOPF · KFXE",
    href: "/aviation",
    cta: "Browse the Hangar",
    image: "/photos/aircraft/gulfstream-g450/hero.png",
  },
  {
    num: "04",
    eyebrow: "Beyond the Fleet",
    title: "The",
    italicWord: "Concierge",
    description:
      "Estate rentals, personal protection, police escorts, bulletproof transport, helipad arrival on the water, private chef, VIP airport handling, event coordination — anything else the day requires.",
    meta: "12 services · fixed rates & by-quote",
    href: "/concierge",
    cta: "Explore Concierge",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2400&q=80",
  },
];

export default function ExplorePage() {
  return (
    <article>
      {/* Hero */}
      <section className="border-b border-ink-700 py-24 lg:py-36">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>Departments</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone max-w-5xl">
            Where the day <span className="italic">begins.</span>
          </h1>
          <p className="mt-8 max-w-prose2 text-bone/65 leading-relaxed text-lg">
            Four departments. One concierge. One number. Pick your route &mdash; or message us directly and we'll start the conversation from there.
          </p>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
            {"— "}Road · Sea · Air · Beyond
          </p>
        </div>
      </section>

      {/* 2x2 grid of departments */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            {departments.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group flex flex-col border border-ink-700 hover:border-bronze-300 bg-ink-900 transition-colors duration-500 ease-luxury overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                  <Image
                    src={d.image}
                    alt={`${d.title} ${d.italicWord}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                  <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 bg-ink-950/75 backdrop-blur-sm border border-bronze-300/40 font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
                    {"— "}{d.num} · {d.eyebrow}
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col p-8 lg:p-10 border-t border-ink-700">
                  <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tightest text-bone group-hover:text-bronze-300 transition-colors duration-500 ease-luxury">
                    {d.title} <span className="italic">{d.italicWord}</span>
                  </h2>
                  <p className="mt-5 text-bone/65 leading-relaxed flex-1">
                    {d.description}
                  </p>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                    {"— "}{d.meta}
                  </p>
                  <p className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 group-hover:text-bronze-200 transition-colors">
                    <span>{d.cta}</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-luxury group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing — direct concierge */}
      <section className="border-t border-ink-700 bg-ink-900/40 py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="border border-ink-700 px-8 py-20 md:px-16 md:py-28 text-center bg-ink-950">
            <Eyebrow>Skip the Choice</Eyebrow>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-tightest text-bone">
              Or just <span className="italic">message us.</span>
            </h2>
            <p className="mt-8 mx-auto max-w-prose2 text-bone/65 leading-relaxed">
              Tell us the dates, the destination, and what you have in mind &mdash; we'll figure out which department to point you toward.
            </p>
            <div className="mt-10 inline-flex">
              <WhatsAppCTA
                message={whatsappMessages.generic()}
                label="Message Concierge"
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
