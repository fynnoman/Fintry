"use client";

/**
 * Full-width scrolling ticker — Bloomberg-style, but stylized in purple.
 * Two rows counter-scrolling for visual richness.
 */
const rowA = [
  "€ 1,8 Mrd Deal-Volumen",
  "27 Transaktionen",
  "Sell-side",
  "Buy-side",
  "Fundraising",
  "Restrukturierung",
  "Nachfolge",
  "MBO/MBI",
  "CFO on Demand",
  "13-Wochen-Cashplan",
  "Board-Reporting",
  "Working-Capital",
  "Equity Story",
  "Due Diligence",
];

const rowB = [
  "Familienunternehmen",
  "Series-A bis Series-C",
  "PE-Portfolio",
  "Mittelstand DACH",
  "Sondersituationen",
  "Turnaround",
  "M&A Sell-side",
  "Fundraising Late-Stage",
  "Vertraulich",
  "ISO-nah dokumentiert",
  "45-Min-Erstgespräch",
  "Persönlich, nicht junior",
];

export default function MarqueeTicker() {
  return (
    <section
      aria-label="Auf einen Blick"
      className="relative overflow-hidden py-8 lg:py-12"
    >
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 lg:w-40"
        style={{
          background: "linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 lg:w-40"
        style={{
          background: "linear-gradient(-90deg, #0a0a0a 0%, rgba(10,10,10,0) 100%)",
        }}
      />

      {/* Row A — left-scrolling, big */}
      <MarqueeRow items={rowA} durationSec={45} big />
      {/* Row B — right-scrolling, smaller */}
      <div className="mt-4 lg:mt-6">
        <MarqueeRow items={rowB} durationSec={55} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  durationSec,
  reverse = false,
  big = false,
}: {
  items: string[];
  durationSec: number;
  reverse?: boolean;
  big?: boolean;
}) {
  const content = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <div
        className="flex shrink-0 items-center gap-10 lg:gap-14"
        style={{
          animation: `marquee-${reverse ? "right" : "left"} ${durationSec}s linear infinite`,
          willChange: "transform",
        }}
      >
        {content.map((label, i) => (
          <TickerItem key={i} label={label} big={big} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          from { transform: translate3d(-33.333%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-left"], [style*="marquee-right"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function TickerItem({ label, big }: { label: string; big?: boolean }) {
  return (
    <span
      className={
        big
          ? "font-display text-white/85"
          : "font-sans text-[15px] uppercase tracking-[0.18em] text-body"
      }
      style={
        big
          ? {
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }
          : undefined
      }
    >
      <span className="inline-flex items-center gap-5 lg:gap-8">
        {label}
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{
            background: "#8b5cf6",
            boxShadow: "0 0 10px rgba(139,92,246,0.8)",
          }}
        />
      </span>
    </span>
  );
}
