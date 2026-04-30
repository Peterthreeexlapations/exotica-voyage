import Link from "next/link";
import YachtCard from "./YachtCard";
import Eyebrow from "./Eyebrow";
import EmptyState from "./EmptyState";
import { getFeaturedYachts } from "@/lib/yachts";

export default async function FeaturedYachts() {
  const yachts = await getFeaturedYachts(3);

  return (
    <section className="py-24 lg:py-32 bg-ink-900/40 border-y border-ink-700">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Featured · Marina</Eyebrow>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone max-w-2xl">
              On the water <span className="italic">this season.</span>
            </h2>
          </div>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 hover:text-bronze-200 border-b border-bronze-300/40 pb-1 self-start md:self-end"
          >
            <span>View Full Marina</span>
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="mt-14">
          {yachts.length === 0 ? (
            <EmptyState
              title="The marina is currently between editions."
              body="Charters fill quickly &mdash; our most-requested vessels are not always listed publicly. Reach out for the current availability."
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {yachts.map((y) => (
                <YachtCard key={y.id} yacht={y} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
