import Link from "next/link";
import Image from "next/image";
import Eyebrow from "./Eyebrow";

const pillars = [
  {
    eyebrow: "By Road",
    title: "The Fleet",
    body: "Lamborghini, Ferrari, McLaren, Rolls-Royce, Bentley — sourced from collectors and partner garages across South Florida.",
    href: "/fleet",
    cta: "Browse the Fleet",
    image: "/photos/cars/aventador-svj-gintani/hero.jpg",
  },
  {
    eyebrow: "By Sea",
    title: "The Marina",
    body: "Azimut, Sunseeker, Pershing, Maiora, Rossinavi — day boats to 200-foot superyachts, crewed and provisioned.",
    href: "/yachts",
    cta: "Browse the Marina",
    image: "/photos/yachts/206-rossinavi/hero.jpg",
  },
  {
    eyebrow: "By Air",
    title: "The Hangar",
    body: "Gulfstream, Bombardier, Dassault, Cessna, Hawker, Learjet — heavy iron to light jets, by the hour from KOPF, KFXE, Watson Island.",
    href: "/aviation",
    cta: "Browse the Hangar",
    image: "/photos/aircraft/gulfstream-g450/hero.png",
  },
];

export default function HomePillars() {
  return (
    <section className="border-y border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-content px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-3xl">
          <Eyebrow>Three Departments</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
            By road. By <span className="italic">sea.</span> By <span className="italic">air.</span>
          </h2>
          <p className="mt-6 max-w-prose2 text-bone/65 leading-relaxed">
            One concierge. One number. The route is yours to choose.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col border border-ink-700 hover:border-bronze-300 bg-ink-900 transition-colors duration-500 ease-luxury"
            >
              {/* Image — explicit fixed height so layout never collapses */}
              <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden bg-ink-800">
                <Image
                  src={p.image}
                  alt={`${p.title} — ${p.eyebrow}`}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 bg-ink-950/70 backdrop-blur-sm border border-bronze-300/40 font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
                  {"— "}{p.eyebrow}
                </span>
              </div>

              {/* Body — normal flow, no absolute positioning */}
              <div className="flex-1 flex flex-col p-6 lg:p-8 border-t border-ink-700">
                <h3 className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tightest text-bone group-hover:text-bronze-300 transition-colors duration-500 ease-luxury">
                  {p.title}
                </h3>
                <p className="mt-4 text-bone/65 leading-relaxed text-[15px]">
                  {p.body}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 group-hover:text-bronze-200 transition-colors">
                  <span>{p.cta}</span>
                  <span aria-hidden className="transition-transform duration-300 ease-luxury group-hover:translate-x-1">
                    &rarr;
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
