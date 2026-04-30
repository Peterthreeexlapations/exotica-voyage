import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import SpecsTable from "@/components/SpecsTable";
import Lightbox from "@/components/Lightbox";
import {
  aircraftGallery,
  getAircraftBySlug,
  getAllAircraftSlugs,
  pickAircraftHero,
} from "@/lib/aircraft";
import { whatsappMessages } from "@/lib/whatsapp";
import { formatRate, formatNumber } from "@/lib/format";
import { AIRCRAFT_CATEGORY_LABEL, type SpecRow } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllAircraftSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAircraftBySlug(slug);
  if (!a) return { title: "Not found" };
  return {
    title: `${a.year} ${a.manufacturer} ${a.model}`,
    description: `${a.year} ${a.manufacturer} ${a.model} — ${AIRCRAFT_CATEGORY_LABEL[a.category]} from ${formatRate(a.hourly_rate)} per hour. Based ${a.base_airport}.`,
  };
}

export default async function AircraftDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const a = await getAircraftBySlug(slug);
  if (!a) notFound();

  const hero = pickAircraftHero(a);
  const gal = aircraftGallery(a);
  const isAvailable = a.available;

  const reserveMsg = isAvailable
    ? whatsappMessages.aircraftArrange(a)
    : whatsappMessages.aircraftUnavailable(a);
  const askMsg = whatsappMessages.aircraftQuestion(a);

  const specs: SpecRow[] = [
    { label: "Passengers", value: String(a.passengers) },
    { label: "Range", value: a.range_nm ? `${formatNumber(a.range_nm)} nm` : null },
    { label: "Cruise Speed", value: a.cruise_speed_kts ? `${a.cruise_speed_kts} kts` : null },
    { label: "Ceiling", value: a.ceiling_ft ? `${formatNumber(a.ceiling_ft)} ft` : null },
    { label: "Cabin Height", value: a.cabin_height_ft ? `${a.cabin_height_ft} ft` : null },
    { label: "Crew", value: a.crew != null ? String(a.crew) : null },
    { label: "Base", value: a.base_airport },
  ];

  return (
    <article>
      <section className="pt-16 lg:pt-20 pb-12">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Link
            href="/aviation"
            className="font-mono text-[11px] uppercase tracking-widest2 text-bone/50 hover:text-bronze-300 transition-colors"
          >
            &larr; The Hangar
          </Link>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>{AIRCRAFT_CATEGORY_LABEL[a.category]} &middot; {a.year}</Eyebrow>
              <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
                {a.manufacturer} <span className="italic">{a.model}</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40">From</p>
              <p className="mt-2 font-display text-3xl md:text-4xl text-bone tracking-tightest">
                {formatRate(a.hourly_rate)}
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40 ml-2">/ hr</span>
              </p>
              {a.daily_minimum && (
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-bone/50">
                  {formatRate(a.daily_minimum)} daily min.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full">
        {hero ? (
          <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
            <Image
              src={hero.url}
              alt={hero.alt_text || `${a.year} ${a.manufacturer} ${a.model}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent" />
          </div>
        ) : (
          <div className="mx-auto max-w-content px-6 lg:px-12 my-16">
            <div className="border border-ink-700 bg-ink-900 aspect-[16/9] flex items-center justify-center text-bone/40 font-mono text-xs uppercase tracking-widest2">
              Photography Forthcoming
            </div>
          </div>
        )}
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow>Disposition</Eyebrow>
              <p className="mt-6 font-display text-2xl md:text-3xl leading-[1.2] tracking-tight text-bone/85">
                {a.description ?? "Detail forthcoming."}
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <WhatsAppCTA
                  message={reserveMsg}
                  label={isAvailable ? "Arrange a Flight" : "Request a Similar Aircraft"}
                />
                {isAvailable && (
                  <WhatsAppCTA message={askMsg} label="Ask a Question" variant="ghost" />
                )}
              </div>

              {!isAvailable && (
                <p className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
                  {"— "}Currently Unavailable
                </p>
              )}
            </div>

            <aside className="md:col-span-5">
              <Eyebrow>Specification</Eyebrow>
              <div className="mt-6">
                <SpecsTable rows={specs} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {gal.length > 0 && (
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-content px-6 lg:px-12">
            <Eyebrow>Plates</Eyebrow>
            <div className="mt-8">
              <Lightbox
                items={gal.map((m) => ({ id: m.id, url: m.url, alt_text: m.alt_text }))}
                altPrefix={`${a.year} ${a.manufacturer} ${a.model}`}
              />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
