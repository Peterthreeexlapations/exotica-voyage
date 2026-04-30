import Image from "next/image";
import Link from "next/link";
import type { VehicleWithMedia } from "@/lib/types";
import { pickHero } from "@/lib/vehicles";
import { formatRate } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/types";

export default function VehicleCard({ vehicle }: { vehicle: VehicleWithMedia }) {
  const hero = pickHero(vehicle);
  return (
    <Link
      href={`/fleet/${vehicle.slug}`}
      className="group block border border-ink-700 hover:border-bronze-300 transition-colors duration-500 ease-luxury bg-ink-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        {hero ? (
          <Image
            src={hero.url}
            alt={hero.alt_text || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-bone/30 font-mono text-[11px] uppercase tracking-widest2">
            Photography Forthcoming
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
              {"— "}{CATEGORY_LABEL[vehicle.category]} &middot; {vehicle.year}
            </p>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-[0.95] tracking-tightest text-bone group-hover:text-bronze-200 transition-colors duration-500 ease-luxury">
              {vehicle.make} <span className="italic">{vehicle.model}</span>
            </h3>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-ink-700 pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
              From
            </p>
            <p className="mt-1 font-display text-xl text-bone">
              {formatRate(vehicle.daily_rate)}
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40 ml-2">/ day</span>
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-widest2 text-bronze-300/70">
              Driver's License
            </p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 group-hover:text-bronze-200 transition-colors">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
