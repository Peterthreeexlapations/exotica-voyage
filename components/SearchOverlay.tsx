"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { getAvailableFleet, pickHero } from "@/lib/vehicles";
import { getAvailableYachts, pickYachtHero } from "@/lib/yachts";
import {
  getAvailableAircraft,
  pickAircraftHero,
} from "@/lib/aircraft";
import {
  CATEGORY_LABEL,
  YACHT_CATEGORY_LABEL,
  AIRCRAFT_CATEGORY_LABEL,
  type VehicleWithMedia,
  type YachtWithMedia,
  type AircraftWithMedia,
} from "@/lib/types";
import { formatRate } from "@/lib/format";
import { cn } from "@/lib/utils";

type Hit =
  | { kind: "car"; item: VehicleWithMedia }
  | { kind: "yacht"; item: YachtWithMedia }
  | { kind: "aircraft"; item: AircraftWithMedia }
  | { kind: "service"; item: { title: string; href: string; body: string } };

const services = [
  { title: "Estate Rentals", href: "/concierge", body: "Penthouse residences, waterfront estates, Star Island compounds." },
  { title: "Personal Protection", href: "/concierge", body: "Executive bodyguards, transport details, event security." },
  { title: "Police Escorts — $3,000 / trip", href: "/concierge", body: "Off-duty motor officer escorts for high-profile movements." },
  { title: "Bulletproof Transportation", href: "/concierge", body: "Armored SUVs and sedans, B6/B7-rated, trained drivers." },
  { title: "Helipad Arrival — $6,000", href: "/concierge", body: "Direct waterfront helipad service, Watson Island, marinas." },
  { title: "Airport Transfers — SUV $250 / Sprinter $400", href: "/concierge", body: "One-way executive transfer between FBO, residence, hotel, marina." },
  { title: "Hourly Transport — SUV $125 / Sprinter $175 / Cullinan $300", href: "/concierge", body: "Chauffeured hourly hire by vehicle class." },
  { title: "Yacht Crew & Provisioning", href: "/concierge", body: "Captains, chefs, deckhands, full provisioning." },
  { title: "Private Chef & Catering", href: "/concierge", body: "Yacht-side, residence, on-board jet." },
  { title: "VIP Airport Handling", href: "/concierge", body: "FBO meet-and-greet, customs, ground transport." },
  { title: "Event Coordination", href: "/concierge", body: "Birthdays, anniversaries, brand activations, proposals." },
  { title: "Anything Else", href: "/concierge", body: "If you don't see it here, ask." },
];

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState<VehicleWithMedia[]>([]);
  const [yachts, setYachts] = useState<YachtWithMedia[]>([]);
  const [aircraft, setAircraft] = useState<AircraftWithMedia[]>([]);
  const [loaded, setLoaded] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lazy-load inventory on first open
  useEffect(() => {
    if (!open || loaded) return;
    (async () => {
      const [c, y, a] = await Promise.all([
        getAvailableFleet(),
        getAvailableYachts(),
        getAvailableAircraft(),
      ]);
      setCars(c);
      setYachts(y);
      setAircraft(a);
      setLoaded(true);
    })();
  }, [open, loaded]);

  const hits = useMemo<Hit[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matchCar = (v: VehicleWithMedia) =>
      [v.make, v.model, String(v.year), CATEGORY_LABEL[v.category], v.description ?? "", v.location]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchYacht = (y: YachtWithMedia) =>
      [y.builder, y.model, String(y.year), YACHT_CATEGORY_LABEL[y.category], y.description ?? "", y.base_marina]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchAircraft = (a: AircraftWithMedia) =>
      [a.manufacturer, a.model, String(a.year), AIRCRAFT_CATEGORY_LABEL[a.category], a.description ?? "", a.base_airport]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchService = (s: (typeof services)[number]) =>
      [s.title, s.body].join(" ").toLowerCase().includes(q);

    return [
      ...cars.filter(matchCar).slice(0, 8).map((item) => ({ kind: "car" as const, item })),
      ...yachts.filter(matchYacht).slice(0, 6).map((item) => ({ kind: "yacht" as const, item })),
      ...aircraft.filter(matchAircraft).slice(0, 4).map((item) => ({ kind: "aircraft" as const, item })),
      ...services.filter(matchService).slice(0, 4).map((item) => ({ kind: "service" as const, item })),
    ];
  }, [query, cars, yachts, aircraft]);

  const grouped = useMemo(() => {
    const out = { car: [] as Hit[], yacht: [] as Hit[], aircraft: [] as Hit[], service: [] as Hit[] };
    for (const h of hits) out[h.kind].push(h);
    return out;
  }, [hits]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Search inventory"
          className="inline-flex items-center justify-center w-10 h-10 border border-ink-700 hover:border-bronze-300 hover:text-bronze-300 text-bone/80 transition-colors duration-300 ease-luxury"
        >
          <Search className="h-4 w-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-50 mx-auto max-w-3xl w-full p-4 md:p-8 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
          <Dialog.Title className="sr-only">Search inventory</Dialog.Title>

          <div className="border border-ink-700 bg-ink-900 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95)]">
            {/* Search input bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-700">
              <Search className="h-4 w-4 text-bronze-300 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the fleet, marina, hangar, or concierge…"
                className="flex-1 bg-transparent text-bone placeholder:text-bone/40 outline-none font-body text-base"
              />
              <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest2 text-bone/40 border border-ink-700 px-2 py-1">
                Esc
              </kbd>
              <Dialog.Close
                aria-label="Close search"
                className="inline-flex items-center justify-center w-8 h-8 text-bone/60 hover:text-bronze-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            {/* Results */}
            <div className="max-h-[70vh] overflow-y-auto">
              {!query && (
                <div className="px-5 py-12 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
                    {"— "}Begin typing
                  </p>
                  <p className="mt-3 font-display text-2xl tracking-tightest text-bone">
                    Search the entire <span className="italic">collection.</span>
                  </p>
                  <p className="mt-2 text-bone/55 text-sm">
                    Cars, yachts, aircraft, concierge services. Try "Lamborghini," "Sunseeker," or "helipad."
                  </p>
                </div>
              )}

              {query && hits.length === 0 && loaded && (
                <div className="px-5 py-12 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
                    {"— "}No matches
                  </p>
                  <p className="mt-3 font-display text-2xl tracking-tightest text-bone">
                    Nothing currently listed for "{query}".
                  </p>
                  <p className="mt-2 text-bone/55 text-sm">
                    Message the concierge — most of our network is unlisted.
                  </p>
                </div>
              )}

              {grouped.car.length > 0 && (
                <ResultGroup label="Fleet" count={grouped.car.length}>
                  {grouped.car.map((h) =>
                    h.kind === "car" ? (
                      <CarRow key={h.item.id} v={h.item} onClick={close} />
                    ) : null,
                  )}
                </ResultGroup>
              )}

              {grouped.yacht.length > 0 && (
                <ResultGroup label="Marina" count={grouped.yacht.length}>
                  {grouped.yacht.map((h) =>
                    h.kind === "yacht" ? (
                      <YachtRow key={h.item.id} y={h.item} onClick={close} />
                    ) : null,
                  )}
                </ResultGroup>
              )}

              {grouped.aircraft.length > 0 && (
                <ResultGroup label="Hangar" count={grouped.aircraft.length}>
                  {grouped.aircraft.map((h) =>
                    h.kind === "aircraft" ? (
                      <AircraftRow key={h.item.id} a={h.item} onClick={close} />
                    ) : null,
                  )}
                </ResultGroup>
              )}

              {grouped.service.length > 0 && (
                <ResultGroup label="Concierge" count={grouped.service.length}>
                  {grouped.service.map((h, i) =>
                    h.kind === "service" ? (
                      <ServiceRow key={i} s={h.item} onClick={close} />
                    ) : null,
                  )}
                </ResultGroup>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ============================================================
// Sub-components
// ============================================================
function ResultGroup({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ink-700 last:border-b-0">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
          {"— "}{label}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
          {String(count).padStart(2, "0")}
        </p>
      </div>
      <ul>{children}</ul>
    </div>
  );
}

function Row({
  href,
  imageUrl,
  alt,
  title,
  meta,
  rate,
  onClick,
}: {
  href: string;
  imageUrl: string | null;
  alt: string;
  title: React.ReactNode;
  meta: string;
  rate?: string | null;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-4 px-5 py-3 hover:bg-ink-800/60 transition-colors duration-200 ease-luxury group/r",
        )}
      >
        <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-ink-800 border border-ink-700">
          {imageUrl ? (
            <Image src={imageUrl} alt={alt} fill sizes="56px" className="object-cover" />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base tracking-tightest text-bone group-hover/r:text-bronze-300 transition-colors truncate">
            {title}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/45 truncate mt-1">
            {meta}
          </p>
        </div>
        {rate && (
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 shrink-0">
            {rate}
          </p>
        )}
        <span className="text-bone/30 group-hover/r:text-bronze-300 transition-colors shrink-0" aria-hidden>
          &rarr;
        </span>
      </Link>
    </li>
  );
}

function CarRow({ v, onClick }: { v: VehicleWithMedia; onClick: () => void }) {
  const hero = pickHero(v);
  return (
    <Row
      href={`/fleet/${v.slug}`}
      imageUrl={hero?.url ?? null}
      alt={`${v.year} ${v.make} ${v.model}`}
      title={
        <>
          {v.make} <span className="italic">{v.model}</span>
        </>
      }
      meta={`${v.year} · ${CATEGORY_LABEL[v.category]} · ${v.location}`}
      rate={`${formatRate(Number(v.daily_rate))} / day`}
      onClick={onClick}
    />
  );
}

function YachtRow({ y, onClick }: { y: YachtWithMedia; onClick: () => void }) {
  const hero = pickYachtHero(y);
  const lengthFt = Number(y.length_ft);
  const useWeekly = lengthFt >= 100;
  const rateAmount = useWeekly
    ? (y.weekly_rate != null ? Number(y.weekly_rate) : Number(y.daily_rate) * 7)
    : Number(y.daily_rate);
  return (
    <Row
      href={`/yachts/${y.slug}`}
      imageUrl={hero?.url ?? null}
      alt={`${y.builder} ${y.model}`}
      title={
        <>
          {y.builder} <span className="italic">{y.model}</span>
        </>
      }
      meta={`${lengthFt.toFixed(0)}' · ${YACHT_CATEGORY_LABEL[y.category]} · ${y.base_marina}`}
      rate={`${formatRate(rateAmount)} / ${useWeekly ? "week" : "day"}`}
      onClick={onClick}
    />
  );
}

function AircraftRow({
  a,
  onClick,
}: {
  a: AircraftWithMedia;
  onClick: () => void;
}) {
  const hero = pickAircraftHero(a);
  return (
    <Row
      href={`/aviation/${a.slug}`}
      imageUrl={hero?.url ?? null}
      alt={`${a.manufacturer} ${a.model}`}
      title={
        <>
          {a.manufacturer} <span className="italic">{a.model}</span>
        </>
      }
      meta={`${a.year} · ${AIRCRAFT_CATEGORY_LABEL[a.category]} · ${a.base_airport}`}
      rate={`${formatRate(Number(a.hourly_rate))} / hr`}
      onClick={onClick}
    />
  );
}

function ServiceRow({
  s,
  onClick,
}: {
  s: { title: string; href: string; body: string };
  onClick: () => void;
}) {
  return (
    <Row
      href={s.href}
      imageUrl={null}
      alt={s.title}
      title={s.title}
      meta={s.body}
      onClick={onClick}
    />
  );
}
