import Eyebrow from "./Eyebrow";

const points = [
  {
    n: "01",
    title: "Conversation, not checkout.",
    body:
      "Reservations are arranged in dialogue. We learn the dates, the occasion, the route — and propose accordingly. WhatsApp is the door; the rest is hospitality.",
  },
  {
    n: "02",
    title: "Delivered to you.",
    body:
      "Your vehicle arrives at the hotel, residence, or marina, full of fuel and detailed by hand. The handoff is short and dignified. The keys do not pass through a counter.",
  },
  {
    n: "03",
    title: "Discretion as standard.",
    body:
      "We do not photograph our clients. We do not post your booking. The relationship is private — and our client list is the better for it.",
  },
];

export default function PhilosophyBlock() {
  return (
    <section className="border-y border-ink-700 bg-ink-900/40 py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="max-w-3xl">
          <Eyebrow>The House</Eyebrow>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone">
            How a <span className="italic">private</span> garage operates.
          </h2>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {points.map((p) => (
            <article key={p.n} className="border-t border-ink-700 pt-8">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-bronze-300">
                {"— "}{p.n}
              </p>
              <h3 className="mt-5 font-display text-2xl md:text-3xl leading-[0.95] tracking-tightest text-bone">
                {p.title}
              </h3>
              <p className="mt-5 text-bone/65 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
