import Eyebrow from "./Eyebrow";
import WhatsAppCTA from "./WhatsAppCTA";
import { whatsappMessages } from "@/lib/whatsapp";

export default function ClosingCTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="border border-ink-700 px-8 py-20 md:px-16 md:py-28 text-center">
          <Eyebrow>The Concierge</Eyebrow>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-tightest text-bone">
            Begin a <span className="italic">reservation.</span>
          </h2>
          <p className="mt-8 mx-auto max-w-prose2 text-bone/65 leading-relaxed">
            Tell us the dates, the destination, and the car. We will return with availability, rates, and the most discreet path to your front door.
          </p>
          <div className="mt-10 inline-flex">
            <WhatsAppCTA message={whatsappMessages.generic()} label="Message Concierge" />
          </div>
        </div>
      </div>
    </section>
  );
}
