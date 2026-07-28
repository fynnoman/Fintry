"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Full-width sticky "data scene" between sections.
 * A massive animated area chart that grows and shifts as the user scrolls
 * through it. Includes a big statement headline that fades over the chart.
 */
export default function BigChartScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Chart draw progresses with scroll
  const drawProgress = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);
  const chartScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1]);
  const chartY = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.65, 0.95],
    [0, 1, 1, 0.2]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 lg:py-48"
      aria-label="Datenszene"
    >
      {/* Sticky chart in background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <motion.div
            style={{ scale: chartScale, y: chartY }}
            className="relative h-[80vh] w-[130vw] max-w-none"
          >
            <BigChart drawProgress={drawProgress} />
          </motion.div>
        </div>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-10">
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="mx-auto max-w-[820px] text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[13px] text-body backdrop-blur-md">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#8b5cf6",
                boxShadow: "0 0 12px rgba(139,92,246,0.9)",
              }}
            />
            Zahlen sind kein Nebenprodukt. Sie sind die Sprache, in der wir denken.
          </div>

          <h2
            className="font-display text-headline"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              textShadow: "0 4px 40px rgba(0,0,0,0.6)",
            }}
          >
            Jede Kurve <br />
            hat eine{" "}
            <span className="italic text-[color:#a78bfa]">Ursache.</span>
          </h2>
        </motion.div>

        {/* Bottom stat callouts */}
        <div className="relative mt-[60vh] grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FloatingStat
            delay={0}
            n="+ € 1,32 M"
            label="freigesetzte Liquidität im ersten Quartal"
          />
          <FloatingStat
            delay={0.1}
            n="−34 %"
            label="Zeitaufwand fürs Monats-Reporting"
          />
          <FloatingStat
            delay={0.2}
            n="14 Tage"
            label="von Datenchaos zu handelbarem Cockpit"
          />
        </div>
      </div>
    </section>
  );
}

function BigChart({
  drawProgress,
}: {
  drawProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  const areaPath =
    "M 0 240 " +
    "L 0 200 " +
    "L 80 195 L 160 205 L 240 190 L 320 195 " +
    "L 400 175 L 480 165 L 560 170 " +
    "L 640 140 L 720 145 L 800 120 " +
    "L 880 110 L 960 85 L 1040 95 " +
    "L 1120 70 L 1200 55 L 1280 50 " +
    "L 1360 35 L 1440 20 " +
    "L 1440 240 Z";

  const linePath =
    "M 0 200 " +
    "L 80 195 L 160 205 L 240 190 L 320 195 " +
    "L 400 175 L 480 165 L 560 170 " +
    "L 640 140 L 720 145 L 800 120 " +
    "L 880 110 L 960 85 L 1040 95 " +
    "L 1120 70 L 1200 55 L 1280 50 " +
    "L 1360 35 L 1440 20";

  // strokeDashoffset from 3000 to 0 via drawProgress
  const strokeDashoffset = useTransform(drawProgress, [0, 1], [3000, 0]);
  const areaOpacity = useTransform(drawProgress, [0, 1], [0, 0.85]);
  const endpointOpacity = useTransform(drawProgress, [0.85, 1], [0, 1]);

  return (
    <svg
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="bigArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#6d29cd" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6d29cd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bigLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(167,139,250,0.4)" />
          <stop offset="30%" stopColor="#a78bfa" />
          <stop offset="80%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[40, 90, 140, 190].map((y) => (
        <line
          key={y}
          x1="0"
          x2="1440"
          y1={y}
          y2={y}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
        />
      ))}

      <motion.path d={areaPath} fill="url(#bigArea)" style={{ opacity: areaOpacity }} />

      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#bigLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 3000,
          strokeDashoffset,
          filter: "drop-shadow(0 0 12px rgba(139,92,246,0.7))",
        }}
      />

      <motion.g style={{ opacity: endpointOpacity }}>
        <circle cx="1440" cy="20" r="18" fill="#8b5cf6" opacity="0.3" />
        <circle cx="1440" cy="20" r="10" fill="#a78bfa" opacity="0.5" />
        <circle cx="1440" cy="20" r="5" fill="#ffffff" />
      </motion.g>
    </svg>
  );
}

function FloatingStat({
  delay,
  n,
  label,
}: {
  delay: number;
  n: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="glass p-6 lg:p-7"
    >
      <div
        className="font-display text-headline"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {n}
      </div>
      <div className="mt-3 text-[13px] leading-relaxed text-body">{label}</div>
    </motion.div>
  );
}
