import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

export default function NotFound() {
  return (
    <section className="py-32 lg:py-48">
      <div className="mx-auto max-w-content px-6 lg:px-12 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-6 font-display text-6xl md:text-9xl leading-[0.9] tracking-tightest text-bone">
          Off the <span className="italic">map.</span>
        </h1>
        <p className="mt-8 mx-auto max-w-prose2 text-bone/65 leading-relaxed">
          The page you were looking for is not where it once was. Return to the front desk &mdash; the concierge will redirect.
        </p>
        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 bg-bronze-300 text-ink-950 hover:bg-bronze-200 transition-colors duration-300 ease-luxury"
        >
          Return to the entrance
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
