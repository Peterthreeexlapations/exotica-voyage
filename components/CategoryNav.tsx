"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { key: string; label: string; count: number };

export default function CategoryNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-20 z-30 border-b border-ink-700 bg-ink-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {items.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={cn(
                "shrink-0 inline-flex items-center gap-2.5 px-4 py-2 border font-mono text-[10px] uppercase tracking-widest2 transition-all duration-300 ease-luxury whitespace-nowrap",
                active === item.key
                  ? "border-bronze-300 text-bronze-300 bg-ink-900"
                  : "border-ink-700 text-bone/60 hover:border-bronze-300/60 hover:text-bronze-300",
              )}
            >
              <span>{item.label}</span>
              <span className={cn("transition-colors", active === item.key ? "text-bronze-300" : "text-bone/35")}>
                {String(item.count).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
