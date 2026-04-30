import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "WhatsApp the concierge at Exotica Voyage Group. Daily 8 AM – 11 PM ET, after hours by arrangement. Service area: Miami, Fort Lauderdale, Palm Beach.",
};

export default function ContactPage() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-12 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow>Concierge</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
            How may we <span className="italic">assist?</span>
          </h1>
          <p className="mt-8 max-w-prose2 text-lg leading-relaxed text-bone/70">
            Tell us the dates, the destination, and the car you have in mind. We will return with availability, rates, and the most discreet path to your front door.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <WhatsAppCTA message={whatsappMessages.generic()} label="WhatsApp Concierge" />
            <Link
              href="mailto:concierge@exoticavoyage.com"
              className="inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 text-bone border border-ink-700 hover:border-bronze-300 hover:text-bronze-300 transition-colors duration-300 ease-luxury"
            >
              Email
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>

        <aside className="md:col-span-5">
          <div className="border border-ink-700 p-8 lg:p-10 bg-ink-900/40 space-y-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                {"— "}WhatsApp
              </p>
              <p className="mt-2 font-display text-2xl tracking-tightest text-bone">
                +1 (954) 770-2500
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                {"— "}Email
              </p>
              <p className="mt-2 text-bone">concierge@exoticavoyage.com</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                {"— "}Hours
              </p>
              <p className="mt-2 text-bone">Daily, 8 AM &ndash; 11 PM ET</p>
              <p className="text-bone/60">After hours by arrangement</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                {"— "}Service Area
              </p>
              <p className="mt-2 text-bone">Miami &middot; Fort Lauderdale &middot; Palm Beach</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
