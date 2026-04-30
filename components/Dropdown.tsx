"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  key: string;
  label: string;
}

export default function Dropdown({
  value,
  onChange,
  options,
  className,
  align = "left",
}: {
  value: string;
  onChange: (k: string) => void;
  options: DropdownOption[];
  className?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.key === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "inline-flex items-center justify-between gap-3 bg-ink-950 border transition-colors px-3 py-2 font-mono text-[10px] uppercase tracking-widest2 text-bone focus:outline-none cursor-pointer min-w-[160px]",
          open
            ? "border-bronze-300"
            : "border-ink-700 hover:border-bronze-300",
        )}
      >
        <span className="truncate">{current?.label ?? "Select"}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full mt-1 z-50 min-w-full bg-ink-900 border border-ink-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.85)] max-h-[60vh] overflow-y-auto scrollbar-hide",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <ul className="py-1">
            {options.map((opt) => {
              const active = opt.key === value;
              return (
                <li key={opt.key}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.key);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest2 hover:bg-ink-800/80 transition-colors flex items-center gap-2 whitespace-nowrap",
                      active ? "text-bronze-300" : "text-bone/70 hover:text-bronze-300",
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 w-3 inline-flex items-center justify-center",
                      )}
                    >
                      {active && <Check className="w-3 h-3" strokeWidth={2.5} />}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
