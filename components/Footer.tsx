import Link from "next/link";
import Eyebrow from "./Eyebrow";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

const departments = [
  { href: "/fleet", label: "Fleet" },
  { href: "/yachts", label: "Yachts" },
  { href: "/aviation", label: "Aviation" },
  { href: "/concierge", label: "Concierge" },
];

const visitLinks = [
  "Miami",
  "Fort Lauderdale",
  "Palm Beach",
  "New York",
  "Chicago",
  "Monaco",
  "South of France",
  "Greece",
  "St. Barths",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-content px-6 lg:px-12 py-16 lg:py-24">
        {/* Big headline */}
        <div className="max-w-3xl">
          <Eyebrow>Concierge Voyage</Eyebrow>
          <p className="mt-5 font-display text-4xl md:text-5xl leading-[0.95] tracking-tightest text-bone">
            Exotica <span className="italic">Voyage</span> Group
          </p>
          <p className="mt-6 max-w-prose2 text-bone/60 leading-relaxed">
            A private brokerage. South Florida, New York, Chicago, the Côte d'Azur, Monaco, Greece, and St. Barths. Cars, yachts, and aircraft &mdash; arranged in conversation, not at a checkout page.
          </p>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <Eyebrow>Departments</Eyebrow>
            <ul className="mt-5 space-y-3">
              {departments.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="text-bone/70 hover:text-bronze-300 transition-colors"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow>Visit</Eyebrow>
            <ul className="mt-5 space-y-3 text-bone/70">
              {visitLinks.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow>Hours</Eyebrow>
            <ul className="mt-5 space-y-3 text-bone/70">
              <li>Daily &middot; 8 AM – 11 PM ET</li>
              <li>After hours by arrangement</li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-bronze-300 transition-colors"
                >
                  All contact &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Eyebrow>Concierge</Eyebrow>
            <p className="mt-5 font-display text-2xl tracking-tightest text-bone leading-tight">
              +1 (305)<br />765-0043
            </p>
            <Link
              href={whatsappLink(whatsappMessages.generic())}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 hover:text-bronze-200 border-b border-bronze-300/40 hover:border-bronze-200 pb-1 transition-colors"
            >
              <span>WhatsApp</span>
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col gap-4 border-t border-ink-700 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest2 text-bone/40">
            &copy; {year} Exotica Voyage Group
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest2 text-bone/40">
            Inventory sourced from licensed partner operators
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest2 text-bone/40">
            Vol. I &mdash; MMXXVI
          </p>
        </div>
      </div>
    </footer>
  );
}
