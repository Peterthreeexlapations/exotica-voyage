import type { SpecRow } from "@/lib/types";

export default function SpecsTable({ rows }: { rows: SpecRow[] }) {
  const visible = rows.filter((r) => r.value !== null && r.value !== "");
  return (
    <dl className="border-t border-ink-700">
      {visible.map((r) => (
        <div
          key={r.label}
          className="flex items-baseline justify-between gap-4 border-b border-ink-700 py-4"
        >
          <dt className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
            {r.label}
          </dt>
          <dd className="font-mono text-sm text-bone text-right">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
