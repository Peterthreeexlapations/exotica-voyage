import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import YachtsClient from "@/components/YachtsClient";
import { getAvailableYachts } from "@/lib/yachts";

export const metadata: Metadata = {
  title: "The Marina",
  description:
    "Yacht charters across South Florida and the Mediterranean — grouped by length, sortable by price or year.",
};

export const revalidate = 60;

export default async function YachtsPage() {
  const yachts = await getAvailableYachts();
  const totalCount = String(yachts.length).padStart(2, "0");

  return (
    <>
      <section className="border-b border-ink-700 py-24 lg:py-32">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Eyebrow>The Marina</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
            On the <span className="italic">water.</span>
          </h1>
          <p className="mt-8 max-w-prose2 text-bone/65 leading-relaxed text-lg">
            Charters from Miami Beach Marina, Pier 66, and Mediterranean ports. Crew, provisioning, dock arrangements, and Bahamas clearance handled by the concierge. Day rates listed; weekly charters available on every vessel.
          </p>
          {yachts.length > 0 && (
            <p className="mt-10 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
              {"— "}{totalCount} Vessels &middot; Crewed &middot; Day &amp; Weekly
            </p>
          )}
        </div>
      </section>

      <YachtsClient yachts={yachts} />
    </>
  );
}
