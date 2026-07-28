"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PulseLine from "./PulseLine";

const pillars = [
  {
    n: "01",
    kicker: "CFO auf Abruf",
    title: "Strategie & Planung",
    body:
      "Wir bauen die Finanzarchitektur, auf der Ihre nächsten drei Jahre stehen: rollierender Forecast, Szenariomodelle, KPI-Cockpit, Board-Reporting. Zahlen, die morgens um sieben lesbar sind.",
    bullets: [
      "3-Statement-Modell mit Treiber-Logik",
      "Szenarien: Basis, Aufwärts, Stresstest",
      "Monatliches Board-Reporting (14 Seiten, max.)",
      "Working-Capital-Steuerung",
    ],
  },
  {
    n: "02",
    kicker: "Transaktionen",
    title: "Transaktionsbegleitung",
    body:
      "Von der Vorbereitung bis zum Signing führen wir Sie durch Fundraising, Buy-outs und Nachfolgeprozesse. Sell-side, buy-side, primary, secondary — Sie sitzen am Verhandlungstisch, wir sitzen daneben.",
    bullets: [
      "Equity-Story, Modell und Datenraum",
      "Investoren- und Käuferansprache",
      "Due-Diligence-Steuerung",
      "Term-Sheet- und SPA-Verhandlung",
    ],
  },
  {
    n: "03",
    kicker: "Sondersituationen",
    title: "Restrukturierung & Effizienz",
    body:
      "Wenn die Liquidität knapp wird oder die Marge einbricht, zählt Geschwindigkeit vor Perfektion. Wir stabilisieren zuerst — dann bauen wir das Fundament, auf dem Sie wieder wachsen können.",
    bullets: [
      "13-Wochen-Liquiditätsplanung",
      "Kostenanalyse und Sofortmaßnahmen",
      "Verhandlung mit Banken und Gläubigern",
      "Operative Turnaround-Roadmap",
    ],
  },
];

export default function PillarsSticky() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const activeIdx = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

  return (
    <section id="leistungen" ref={ref} className="relative">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {/* Header */}
        <div className="pt-24 lg:pt-40">
          <div className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-body">
            <span className="h-px w-8 bg-white/25" />
            Leistungen
          </div>
          <h2
            className="max-w-[820px] font-display text-headline"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Drei Mandate.{" "}
            <span className="italic text-[color:#8b5cf6]">Ein Team.</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-body">
            Wir übernehmen die Verantwortung, für die intern selten Zeit ist —
            und geben sie zurück, sobald Sie sie selbst tragen können.
          </p>
        </div>

        {/* Sticky layout — 3 pillars stack while sticky visual holds */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left: sticky visual with index indicator */}
          <div className="hidden lg:block">
            <div className="sticky top-32 h-[calc(100vh-8rem)] max-h-[720px]">
              <StickyVisual activeIdx={activeIdx} />
            </div>
          </div>

          {/* Right: stacking cards */}
          <div className="flex flex-col gap-6 lg:gap-12">
            {pillars.map((p, i) => (
              <PillarCard key={p.n} pillar={p} index={i} />
            ))}
            <div className="h-16" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyVisual({
  activeIdx,
}: {
  activeIdx: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <div className="relative flex h-full flex-col justify-between rounded-[28px] p-8 glass glass-heavy">
      <div>
        <div className="mb-4 text-[12px] uppercase tracking-[0.2em] text-body">
          Wo Sie stehen
        </div>
        <div className="flex flex-col gap-4">
          {pillars.map((p, i) => (
            <IndicatorRow key={p.n} index={i} label={p.title} activeIdx={activeIdx} />
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-end">
        <PulseLine className="h-[160px] w-full" />
      </div>

      <div className="text-[13px] leading-relaxed text-body">
        Wir wechseln zwischen den Mandaten fließend — meist beginnt es mit
        Punkt 1 und endet dort, wo Sie es brauchen.
      </div>
    </div>
  );
}

function IndicatorRow({
  index,
  label,
  activeIdx,
}: {
  index: number;
  label: string;
  activeIdx: ReturnType<typeof useTransform<number, number>>;
}) {
  const isActive = useTransform(activeIdx, (v) => Math.round(v) === index);
  const opacity = useTransform(activeIdx, (v) => {
    const dist = Math.abs(v - index);
    return Math.max(0.3, 1 - dist * 0.7);
  });
  const barWidth = useTransform(activeIdx, (v) => {
    if (Math.round(v) === index) return "48px";
    return "12px";
  });
  const dotBg = useTransform(isActive, (v) =>
    v ? "#8b5cf6" : "rgba(255,255,255,0.25)"
  );

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-4">
      <motion.span
        style={{ background: dotBg, width: barWidth }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="h-[2px] rounded-full"
      />
      <span className="font-display text-[22px] text-headline">{label}</span>
    </motion.div>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="glass p-8 lg:p-10"
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="font-display text-[52px] leading-none text-white/20 lg:text-[64px]">
          {pillar.n}
        </div>
        <div className="text-right text-[12px] uppercase tracking-[0.2em] text-body">
          {pillar.kicker}
        </div>
      </div>
      <h3 className="mt-6 font-display text-headline" style={{ fontSize: "clamp(2rem, 3.6vw, 2.75rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
        {pillar.title}
      </h3>
      <p className="mt-5 max-w-[520px] text-[16px] leading-[1.6] text-body">
        {pillar.body}
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {pillar.bullets.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.05 * i, duration: 0.5 }}
            className="flex items-start gap-3 text-[14px] text-white/80"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="mt-[3px] flex-shrink-0"
            >
              <circle cx="8" cy="8" r="7" stroke="#8b5cf6" strokeOpacity="0.4" strokeWidth="1" fill="none" />
              <path d="M4.5 8.2 L7 10.5 L11.5 5.5" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
