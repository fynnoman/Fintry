"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Three floating "report page" mockups, 3D-tilted, with parallax.
 * Each contains a stylized chart / KPI preview. The center report scales up
 * as it enters view; the side reports drift in different directions.
 */
export default function FloatingReports() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [140, -80]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [80, -140]);
  const yRight = useTransform(scrollYProgress, [0, 1], [180, -40]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 1]);
  const rotateCenterX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -6]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-40"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="mb-12 max-w-[720px] lg:mb-20">
          <div className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-body">
            <span className="h-px w-8 bg-white/25" />
            Was Sie erhalten
          </div>
          <h2
            className="font-display text-headline"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Kein Foliensatz.{" "}
            <span className="italic text-[color:#a78bfa]">Arbeitspapiere.</span>
          </h2>
          <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-body">
            Jedes Mandat produziert Dokumente, die auch nach uns weiter verwendet
            werden: sauber gebaut, versionierbar, an Ihre Prozesse übergebbar.
          </p>
        </div>

        {/* Scene */}
        <div
          className="relative mx-auto h-[560px] w-full max-w-[1100px] sm:h-[600px] lg:h-[720px]"
          style={{ perspective: "2200px" }}
        >
          {/* Ambient halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 45% at 50% 50%, rgba(139,92,246,0.35), transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Left report */}
          <motion.div
            style={{
              y: yLeft,
              rotate: -8,
              transformStyle: "preserve-3d",
            }}
            className="absolute left-0 top-12 w-[46%] max-w-[380px] sm:top-16 lg:top-20"
          >
            <ReportCard variant="left" />
          </motion.div>

          {/* Right report */}
          <motion.div
            style={{
              y: yRight,
              rotate: 9,
              transformStyle: "preserve-3d",
            }}
            className="absolute right-0 top-24 w-[46%] max-w-[380px] lg:top-32"
          >
            <ReportCard variant="right" />
          </motion.div>

          {/* Center report — biggest, most prominent */}
          <motion.div
            style={{
              y: yCenter,
              scale: centerScale,
              rotateX: rotateCenterX,
              transformPerspective: 2200,
              transformStyle: "preserve-3d",
            }}
            className="absolute left-1/2 top-0 z-20 w-[62%] max-w-[560px] -translate-x-1/2"
          >
            <ReportCard variant="center" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReportCard({ variant }: { variant: "left" | "center" | "right" }) {
  return (
    <div
      className="glass glass-heavy relative overflow-hidden aspect-[3/4]"
      style={{
        borderRadius: 20,
        boxShadow:
          "0 40px 80px -30px rgba(0,0,0,0.7), 0 20px 50px -10px rgba(109,41,205,0.35), 0 1px 0 0 rgba(255,255,255,0.08) inset",
      }}
    >
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 lg:p-7">
        {/* Header */}
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-body/70">
              FINTRY · Board-Report
            </div>
            <div
              className="mt-1 font-display text-headline"
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              {variant === "left"
                ? "Q2 · Cash-Bridge"
                : variant === "right"
                ? "Q3 · KPI-Kaskade"
                : "Q3 · Executive Summary"}
            </div>
          </div>
          <div className="text-[9px] text-body/50">Seite 03 · 14</div>
        </div>

        {/* Body */}
        {variant === "center" && <CenterReportBody />}
        {variant === "left" && <LeftReportBody />}
        {variant === "right" && <RightReportBody />}

        {/* Footer */}
        <div className="mt-auto pt-4">
          <div className="h-px w-full bg-white/8" />
          <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-body/50">
            <span>Vertraulich</span>
            <span>fintry.co</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenterReportBody() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <MiniKpi label="Umsatz" value="€ 24,6 M" />
        <MiniKpi label="EBITDA" value="18,4 %" />
        <MiniKpi label="Cash" value="€ 6,14 M" />
      </div>
      <div className="relative flex-1 overflow-hidden rounded-[10px] border border-white/8 bg-white/[0.015] p-3">
        <div className="text-[9px] uppercase tracking-[0.2em] text-body/70">
          Liquidität 90 Tage
        </div>
        <svg viewBox="0 0 300 100" className="mt-2 h-[calc(100%-14px)] w-full">
          <defs>
            <linearGradient id="rpArea1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6d29cd" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 100 L0 70 L40 65 L80 55 L120 60 L160 40 L200 45 L240 25 L280 20 L300 15 L300 100 Z"
            fill="url(#rpArea1)"
          />
          <path
            d="M0 70 L40 65 L80 55 L120 60 L160 40 L200 45 L240 25 L280 20 L300 15"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <TextRows />
    </div>
  );
}

function LeftReportBody() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="text-[9px] uppercase tracking-[0.2em] text-body/70">
        Cash-Bridge Q1 → Q2
      </div>
      <div className="relative flex-1 overflow-hidden rounded-[10px] border border-white/8 bg-white/[0.015] p-3">
        <svg viewBox="0 0 200 140" className="h-full w-full">
          {/* Waterfall bars */}
          <rect x="10" y="30" width="20" height="100" fill="rgba(139,92,246,0.7)" />
          <rect x="45" y="45" width="20" height="30" fill="rgba(167,139,250,0.55)" />
          <rect x="80" y="60" width="20" height="20" fill="rgba(167,139,250,0.55)" />
          <rect x="115" y="70" width="20" height="15" fill="rgba(247,115,115,0.55)" />
          <rect x="150" y="20" width="20" height="110" fill="rgba(139,92,246,0.85)" />
          {/* Baseline */}
          <line x1="0" y1="130" x2="200" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </svg>
      </div>
      <TextRows count={3} />
    </div>
  );
}

function RightReportBody() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="text-[9px] uppercase tracking-[0.2em] text-body/70">
        KPI-Kaskade
      </div>
      <div className="flex flex-col gap-2">
        {[
          { l: "Umsatz-Wachstum", p: 82 },
          { l: "Brutto-Marge", p: 66 },
          { l: "OpEx-Effizienz", p: 48 },
          { l: "Working-Cap-Tage", p: 74 },
          { l: "Cash-Coverage", p: 90 },
        ].map((r) => (
          <div key={r.l} className="flex flex-col gap-1">
            <div className="flex justify-between text-[9px] text-white/80">
              <span>{r.l}</span>
              <span>{r.p}%</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${r.p}%`,
                  background:
                    "linear-gradient(90deg, rgba(139,92,246,0.5) 0%, #a78bfa 100%)",
                  boxShadow: "0 0 6px rgba(139,92,246,0.5)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto text-[9px] leading-[1.5] text-body/70">
        Empfehlung: OpEx-Effizienz priorisieren, Working-Capital-Tage im
        nächsten Sprint reduzieren.
      </div>
    </div>
  );
}

function MiniKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-white/8 bg-white/[0.02] p-2">
      <div className="text-[8px] uppercase tracking-[0.15em] text-body/70">
        {label}
      </div>
      <div
        className="mt-1 font-display text-headline"
        style={{
          fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
          lineHeight: 1,
          letterSpacing: "-0.015em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TextRows({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[5px] rounded-full bg-white/8"
          style={{ width: `${94 - i * 12}%` }}
        />
      ))}
    </div>
  );
}
