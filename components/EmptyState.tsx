import Eyebrow from "./Eyebrow";
import WhatsAppCTA from "./WhatsAppCTA";
import { whatsappMessages } from "@/lib/whatsapp";

export default function EmptyState({
  title = "Photography Forthcoming",
  body = "Our public fleet is between editions. Reach out directly and we will share availability, including private listings not yet published.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <div className="border border-ink-700 bg-ink-900 px-8 py-20 md:py-32 text-center">
      <Eyebrow>Currently Off-Site</Eyebrow>
      <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[0.95] tracking-tightest text-bone">
        {title}
      </h2>
      <p className="mt-6 mx-auto max-w-prose2 text-bone/60 leading-relaxed">
        {body}
      </p>
      <div className="mt-10 inline-flex">
        <WhatsAppCTA message={whatsappMessages.generic()} label="Reach the Concierge" />
      </div>
    </div>
  );
}
