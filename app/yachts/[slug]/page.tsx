import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import SpecsTable from "@/components/SpecsTable";
import Lightbox from "@/components/Lightbox";
import {
  getAllYachtSlugs,
  getYachtBySlug,
  pickYachtHero,
  yachtGallery,
  yachtDisplayRate,
} from "@/lib/yachts";
import { whatsappMessages } from "@/lib/whatsapp";
import { formatRate } from "@/lib/format";
import { YACHT_CATEGORY_LABEL, type SpecRow } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllYachtSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const y = await getYachtBySlug(slug);
  if (!y) return { title: "Not found" };
  return {
    title: `${y.year} ${y.builder} ${y.model}`,
    description: `${y.year} ${y.builder} ${y.model} — ${y.length_ft.toFixed(0)}ft yacht charter from ${formatRate(y.daily_rate)} per day. Based ${y.base_marina}.`,
  };
}

export default async function YachtDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const y = await getYachtBySlug(slug);
  if (!y) notFound();

  const hero = pickYachtHero(y);
  const gal = yachtGallery(y);
  const isAvailable = y.available;

  const reserveMsg = isAvailable
    ? whatsappMessages.yachtCharter(y)
    : whatsappMessages.yachtUnavailable(y);
  const askMsg = whatsappMessages.yachtQuestion(y);

  const specs: SpecRow[] = [
    { label: "Length", value: `${y.length_ft.toFixed(1)} ft` },
    { label: "Beam", value: y.beam_ft ? `${y.beam_ft.toFixed(1)} ft` : null },
    { label: "Guests", value: y.guests ? String(y.guests) : null },
    { label: "Cabins", value: y.cabins != null ? String(y.cabins) : null },
    { label: "Crew", value: y.crew != null ? String(y.crew) : null },
    {
      label: "Cruise / Top",
      value:
        y.cruise_speed_kts && y.top_speed_kts
          ? `${y.cruise_speed_kts} / ${y.top_speed_kts} kts`
          : y.cruise_speed_kts
          ? `${y.cruise_speed_kts} kts`
          : y.top_speed_kts
          ? `${y.top_speed_kts} kts`
          : null,
    },
    { label: "Propulsion", value: y.propulsion },
    { label: "Marina", value: y.base_marina },
  ];

  return (
    <article>
      <section className="pt-16 lg:pt-20 pb-12">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <Link
            href="/yachts"
            className="font-mono text-[11px] uppercase tracking-widest2 text-bone/50 hover:text-bronze-300 transition-colors"
          >
            &larr; The Marina
          </Link>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>{YACHT_CATEGORY_LABEL[y.category]} &middot; {y.year}</Eyebrow>
              <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92] tracking-tightest text-bone">
                {y.builder} <span className="italic">{y.model}</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40">From</p>
              {(() => {
                const primary = yachtDisplayRate(y);
                const isWeeklyPrimary = primary.period === "week";
                return (
                  <>
                    <p className="mt-2 font-display text-3xl md:text-4xl text-bone tracking-tightest">
                      {formatRate(primary.amount)}
                      <span className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40 ml-2">
                        / {primary.period}
                      </span>
                    </p>
                    {!isWeeklyPrimary && y.half_day_rate && (
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-bone/50">
                        {formatRate(y.half_day_rate)} / half-day
                      </p>
                    )}
                    {!isWeeklyPrimary && y.weekly_rate && (
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-bone/50">
                        {formatRate(y.weekly_rate)} / week
                      </p>
                    )}
                    {isWeeklyPrimary && (
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-bone/50">
                        Plus expenses · weekly minimum
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full">
        {hero ? (
          <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
            <Image
              src={hero.url}
              alt={hero.alt_text || `${y.year} ${y.builder} ${y.model}`}
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
                {y.description ?? "Detail forthcoming."}
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <WhatsAppCTA
                  message={reserveMsg}
                  label={isAvailable ? "Charter via WhatsApp" : "Request a Similar Vessel"}
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
                altPrefix={`${y.year} ${y.builder} ${y.model}`}
              />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
