import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "underline";

export default function WhatsAppCTA({
  message,
  label = "Reserve via WhatsApp",
  variant = "primary",
  className,
}: {
  message: string;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  const href = whatsappLink(message);
  const base =
    "inline-flex items-center gap-3 font-mono uppercase text-[11px] tracking-widest2 transition-colors duration-300 ease-luxury";
  const styles: Record<Variant, string> = {
    primary:
      "bg-bronze-300 text-ink-950 hover:bg-bronze-200 px-7 py-4",
    ghost:
      "border border-ink-700 text-bone hover:border-bronze-300 hover:text-bronze-300 px-7 py-4",
    underline:
      "text-bronze-300 hover:text-bronze-200 border-b border-bronze-300/40 hover:border-bronze-200 pb-1",
  };
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(base, styles[variant], className)}
    >
      <span>{label}</span>
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}
