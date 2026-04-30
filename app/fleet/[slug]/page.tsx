import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import SpecsTable from "@/components/SpecsTable";
import Lightbox from "@/components/Lightbox";
import { gallery, getAllVehicleSlugs, getVehicleBySlug, pickHero } from "@/lib/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { formatRate, formatNumber } from "@/lib/format";
import { CATEGORY_LABEL, type SpecRow } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllVehicleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) return { title: "Not found" };
  return {
    title: `${v.year} ${v.make} ${v.model}`,
    description: `${v.year} ${v.make} ${v.model} — from ${formatRate(v.daily_rate)} per day in ${v.location}. Arrangeable through Exotica Voyage Group.`,
  };
}

export default async function VehicleDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) notFound();

  const hero = pickHero(v);
  const gal = gallery(v);
  const isAvailable = v.available;

  const reserveMsg = isAvailable
    ? whatsappMessages.vehicleReserve(v)
    : whatsappMessages.vehicleUnavailable(v);
  const askMsg = whatsappMessages.vehicleQuestion(v);

  const specs: SpecRow[] = [
    { label: "Power", value: v.horsepower ? `${formatNumber(v.horsepower)} hp` : null },
    { label: "0—60", value: v.zero_to_sixty ? `${v.zero_to_sixty} sec` : null },
    { label: "Top Speed", value: v.top_speed_mph ? `${v.top_speed_mph} mph` : null },
    { label: "Transmission", value: v.transmission },
    { label: "Seats", value: v.seats ? String(v.seats) : null },
    { label: "Location", value: v.location },
  ];

  return (
    <article>
      <section className="pt-16 lg:pt-20 pb-12">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Link
            href="/fleet"
            className="font-mono text-[11px] uppercase tracking-widest2 text-bone/50 hover:text-bronze-300 transition-colors"
          >
            &larr; The Fleet
          </Link>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>{CATEGORY_LABEL[v.category]} &middot; {v.year}</Eyebrow>
              <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
                {v.make} <span className="italic">{v.model}</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40">From</p>
              <p className="mt-2 font-display text-3xl md:text-4xl text-bone tracking-tightest">
                {formatRate(v.daily_rate)}
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40 ml-2">/ day</span>
              </p>
              {v.weekly_rate && (
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-bone/50">
                  {formatRate(v.weekly_rate)} / week
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
              alt={hero.alt_text || `${v.year} ${v.make} ${v.model}`}
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
                {v.description ?? "Detail forthcoming."}
              </p>

              {/* Requirements card */}
              <div className="mt-10 border border-ink-700 bg-ink-900/40 p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
                  {"— "}Requirements
                </p>
                <p className="mt-3 font-display text-xl tracking-tightest text-bone">
                  Driver's license.
                </p>
                <p className="mt-2 text-bone/55 text-[13px] leading-relaxed">
                  Just a valid driver's license and the dates you want the keys.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <WhatsAppCTA
                  message={reserveMsg}
                  label={isAvailable ? "Reserve via WhatsApp" : "Request a Similar Vehicle"}
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
                altPrefix={`${v.year} ${v.make} ${v.model}`}
              />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
