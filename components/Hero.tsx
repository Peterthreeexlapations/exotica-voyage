import Image from "next/image";
import Link from "next/link";
import WhatsAppCTA from "./WhatsAppCTA";
import { whatsappMessages } from "@/lib/whatsapp";

const COLLAGE = [
  { src: "/photos/cars/aventador-svj-gintani/hero.jpg", alt: "Lamborghini Aventador SVJ" },
  { src: "/photos/yachts/axios-47m/hero.jpg", alt: "AXIOS 47m superyacht" },
  { src: "/photos/cars/bugatti-chiron/hero.jpg", alt: "Bugatti Chiron" },
  { src: "/photos/yachts/persefoni-i-54m/hero.jpg", alt: "PERSEFONI I 54m superyacht" },
  { src: "/photos/cars/lamborghini-huracan-tecnica/hero.jpg", alt: "Lamborghini Huracán Tecnica" },
  { src: "/photos/yachts/aqua-libra-40m/hero.jpg", alt: "AQUA LIBRA 40m superyacht" },
];

const departments = [
  { href: "/fleet", label: "By Road" },
  { href: "/yachts", label: "By Sea" },
  { href: "/aviation", label: "By Air" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full animate-ken-burns">
          <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-px bg-ink-700 md:grid-cols-3 md:grid-rows-2">
            {COLLAGE.map((p, i) => (
              <div key={p.src} className="relative overflow-hidden bg-ink-900">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/70 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/40 to-ink-950/60" />
      </div>

      <div className="relative mx-auto max-w-content px-6 lg:px-12">
        <div className="flex min-h-[88vh] items-end pb-20 pt-32 md:pb-32">
          <div className="max-w-3xl">
            <p className="text-eyebrow animate-fade-up">
              {"— "}South Florida &middot; Concierge Voyage
            </p>

            <h1 className="mt-6 font-display text-[15vw] sm:text-[12vw] lg:text-[9rem] xl:text-[10rem] leading-[0.88] tracking-tightest text-bone animate-fade-up stagger-200">
              The Exotic, <span className="italic">arranged.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-bone/75 animate-fade-up stagger-400">
              By road, by sea, by air. A private brokerage for exotic motoring, yacht charters, and private aviation across Miami, Fort Lauderdale, and Palm Beach.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up stagger-700">
              <WhatsAppCTA
                message={whatsappMessages.generic()}
                label="Begin a Reservation"
              />
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 text-bone border border-ink-700 hover:border-bronze-300 hover:text-bronze-300 transition-colors duration-300 ease-luxury"
              >
                <span>Explore Departments</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 animate-fade-up stagger-1000">
              {departments.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="font-mono text-[10px] uppercase tracking-widest2 text-bone/55 hover:text-bronze-300 transition-colors duration-300 ease-luxury"
                >
                  {"— "}{d.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:right-12 lg:flex flex-col items-end gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300/80 [writing-mode:vertical-rl]">
            Vol. I &mdash; MMXXVI
          </span>
          <span className="h-24 w-px bg-bronze-300/40" />
        </div>
      </div>
    </section>
  );
}
