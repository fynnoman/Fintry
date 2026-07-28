"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * The big animated cockpit dashboard mockup.
 * Serves as the hero visual. Scales up as the user scrolls into it,
 * with parallax lift and a huge purple halo behind.
 */
export default function HeroCockpit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.88, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.25, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.5]);

  return (
    <div ref={ref} className="relative" style={{ perspective: "2000px" }}>
      {/* Massive halo behind */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        aria-hidden
        className="pointer-events-none absolute -inset-x-32 -top-24 -bottom-24 -z-10"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 45%, rgba(139,92,246,0.55), rgba(76,29,149,0.25) 40%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          scale,
          y,
          rotateX,
          transformPerspective: 2000,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Reflective floor beneath the cockpit */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-[90%] -translate-x-1/2 opacity-40 blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.6), transparent 70%)",
          }}
        />

        <div
          className="glass glass-heavy relative overflow-hidden"
          style={{ borderRadius: 24 }}
        >
          {/* Shimmer sweep across the whole panel */}
          <motion.div
            aria-hidden
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{
              duration: 3.4,
              delay: 1.6,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-y-0 z-30 w-1/3"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
            }}
          />

          <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            {/* Window bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-body sm:flex">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{
                    background: "#8b5cf6",
                    boxShadow: "0 0 8px rgba(139,92,246,0.8)",
                  }}
                />
                Kunden-Cockpit · Q3 2026 · Live
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-body/60">
                fintry.co/cockpit
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <KpiTile
                delay={0.3}
                label="Umsatz LTM"
                value="€ 24,6 M"
                delta="+12,4 %"
                positive
                spark={sparkUp}
              />
              <KpiTile
                delay={0.45}
                label="EBITDA-Marge"
                value="18,4 %"
                delta="+2,1 pp"
                positive
                spark={sparkFlat}
              />
              <KpiTile
                delay={0.6}
                label="Working-Capital-Tage"
                value="42"
                delta="−6 Tage"
                positive
                spark={sparkDown}
              />
            </div>

            {/* Main content grid */}
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
              {/* Big line chart panel */}
              <ChartPanel />
              {/* Sidebar bars */}
              <BudgetPanel />
            </div>

            {/* Status row */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatusPill delay={1.2} label="Board-Report · versendet" />
              <StatusPill delay={1.32} label="13-Wochen-Cash · aktualisiert" />
              <StatusPill delay={1.44} label="Forecast v3.2 · freigegeben" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============ Sub-components ============ */

function KpiTile({
  delay,
  label,
  value,
  delta,
  positive,
  spark,
}: {
  delay: number;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  spark: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
      className="relative overflow-hidden rounded-[16px] border border-white/8 bg-white/[0.02] p-4 backdrop-blur-md"
    >
      <div className="text-[11px] uppercase tracking-[0.15em] text-body">
        {label}
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <div
          className="font-display text-headline"
          style={{
            fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </div>
        <div
          className="text-[12px] font-medium"
          style={{ color: positive ? "#a78bfa" : "#f97373" }}
        >
          {delta}
        </div>
      </div>
      <div className="mt-3 h-8 w-full">
        <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="h-full w-full">
          <motion.path
            d={spark}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: delay + 0.25, duration: 1.1, ease: "easeOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

function ChartPanel() {
  const areaPath =
    "M 0 100 L 0 78 L 40 74 L 80 68 L 120 72 L 160 62 L 200 58 L 240 66 L 280 48 L 320 42 L 360 46 L 400 36 L 440 28 L 480 24 L 520 30 L 560 22 L 600 16 L 600 100 Z";
  const linePath =
    "M 0 78 L 40 74 L 80 68 L 120 72 L 160 62 L 200 58 L 240 66 L 280 48 L 320 42 L 360 46 L 400 36 L 440 28 L 480 24 L 520 30 L 560 22 L 600 16";
  const gridY = [15, 40, 65, 90];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="relative overflow-hidden rounded-[18px] border border-white/8 bg-white/[0.015] p-5"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-body">
            Liquidität — 90-Tage-Verlauf
          </div>
          <div
            className="mt-1 font-display text-headline"
            style={{
              fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            € 4,82 M → € 6,14 M
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-body">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-3 rounded-full" style={{ background: "#8b5cf6" }} />
            Ist
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-3 rounded-full border border-dashed border-white/40" />
            Forecast
          </span>
        </div>
      </div>

      <div className="mt-4 relative h-[180px] w-full sm:h-[220px] lg:h-[240px]">
        <svg
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="cockpitArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#6d29cd" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6d29cd" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cockpitLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridY.map((y) => (
            <line
              key={y}
              x1="0"
              x2="600"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#cockpitArea)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />

          {/* Main line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#cockpitLine)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(139,92,246,0.5))" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1.6, ease: "easeInOut" }}
          />

          {/* Endpoint */}
          <motion.circle
            cx="600"
            cy="16"
            r="4"
            fill="#ffffff"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.4 }}
          />
          <motion.circle
            cx="600"
            cy="16"
            r="10"
            fill="#8b5cf6"
            opacity="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.4 }}
          />
        </svg>

        {/* X-axis labels */}
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.15em] text-body/60">
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>heute</span>
        </div>
      </div>
    </motion.div>
  );
}

function BudgetPanel() {
  const rows = [
    { label: "Vertrieb", pct: 82, value: "€ 1,84 M" },
    { label: "Marketing", pct: 46, value: "€ 0,74 M" },
    { label: "Operations", pct: 68, value: "€ 1,32 M" },
    { label: "R&D", pct: 34, value: "€ 0,58 M" },
    { label: "G&A", pct: 24, value: "€ 0,41 M" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="relative overflow-hidden rounded-[18px] border border-white/8 bg-white/[0.015] p-5"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <div className="text-[11px] uppercase tracking-[0.15em] text-body">
          Budget-Verbrauch
        </div>
        <div className="text-[11px] text-body/60">YTD</div>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((r, i) => (
          <div key={r.label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between text-[12px]">
              <span className="text-white/85">{r.label}</span>
              <span className="text-body">{r.value}</span>
            </div>
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${r.pct}%` }}
                transition={{ delay: 1 + i * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(139,92,246,0.5) 0%, #8b5cf6 100%)",
                  boxShadow: "0 0 10px rgba(139,92,246,0.5)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function StatusPill({ delay, label }: { delay: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2.5 text-[12px] text-white/80 backdrop-blur"
    >
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle
          cx="7"
          cy="7"
          r="6"
          fill="none"
          stroke="rgba(139,92,246,0.4)"
          strokeWidth="1"
        />
        <path
          d="M4 7.2 L6.2 9.4 L10 5"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </motion.div>
  );
}

/* Sparkline paths for KPI tiles */
const sparkUp =
  "M 0 20 L 10 18 L 20 19 L 30 16 L 40 17 L 50 13 L 60 14 L 70 10 L 80 8 L 90 5 L 100 4";
const sparkFlat =
  "M 0 14 L 10 12 L 20 15 L 30 11 L 40 13 L 50 10 L 60 12 L 70 9 L 80 11 L 90 8 L 100 9";
const sparkDown =
  "M 0 4 L 10 6 L 20 5 L 30 9 L 40 8 L 50 12 L 60 11 L 70 14 L 80 15 L 90 17 L 100 18";
