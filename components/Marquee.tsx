const ROAD = ["Lamborghini", "Ferrari", "McLaren", "Rolls-Royce", "Bentley", "Aston Martin", "Porsche", "Mercedes-AMG"];
const SEA = ["Riva", "Sunseeker", "Princess", "Pershing", "Lagoon", "Ferretti", "Wally", "Azimut"];
const AIR = ["Gulfstream", "Bombardier", "Cessna", "Pilatus", "Bell", "Embraer", "Dassault", "Sikorsky"];

export default function Marquee() {
  const items = [...ROAD, ...SEA, ...AIR];
  const looped = [...items, ...items];
  return (
    <section
      aria-label="Marques represented"
      className="border-y border-ink-700 bg-ink-950 py-10 overflow-hidden"
    >
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
        {looped.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display italic text-3xl md:text-4xl text-bone/70 tracking-tight"
          >
            {name}
            <span className="ml-16 text-bronze-300/60">&middot;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
