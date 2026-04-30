"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Item = { id: string; url: string; alt_text: string | null };

export default function Lightbox({
  items,
  altPrefix,
}: {
  items: Item[];
  altPrefix: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => {
    setIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const next = useCallback(() => {
    setIndex((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative aspect-[4/3] border border-ink-700 hover:border-bronze-300 overflow-hidden bg-ink-900 transition-colors duration-500 ease-luxury ${i === 0 ? "lg:col-span-2 lg:aspect-[16/9]" : ""}`}
            aria-label={`Open image ${i + 1} of ${items.length}`}
          >
            <Image
              src={m.url}
              alt={m.alt_text || altPrefix}
              fill
              sizes="(max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest2 text-bronze-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Enlarge &rarr;
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 backdrop-blur-md p-4 md:p-12"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-6 right-6 md:top-8 md:right-8 font-mono text-[11px] uppercase tracking-widest2 text-bone/70 hover:text-bronze-300 border border-ink-700 hover:border-bronze-300 px-4 py-2 transition-colors duration-300 ease-luxury z-10"
            aria-label="Close"
          >
            Close &times;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-widest2 text-bone/70 hover:text-bronze-300 border border-ink-700 hover:border-bronze-300 px-4 py-3 transition-colors duration-300 ease-luxury z-10"
            aria-label="Previous"
          >
            &larr;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-widest2 text-bone/70 hover:text-bronze-300 border border-ink-700 hover:border-bronze-300 px-4 py-3 transition-colors duration-300 ease-luxury z-10"
            aria-label="Next"
          >
            &rarr;
          </button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[index].url}
              alt={items[index].alt_text || altPrefix}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest2 text-bone/50">
            {index + 1} &mdash; {items.length}
          </p>
        </div>
      )}
    </>
  );
}
