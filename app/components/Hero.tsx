"use client";

import { motion } from "framer-motion";
import HeroCockpit from "./HeroCockpit";

const line1 = "Finanzen mit";
const line2Words = ["institutioneller", "Präzision."];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[880px]"
        >
          {/* Eyebrow */}
          <motion.div
            variants={word}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-body backdrop-blur-md"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#8b5cf6",
                boxShadow: "0 0 12px rgba(139,92,246,0.9)",
              }}
            />
            Für Unternehmen zwischen 5 und 250 Mio.&nbsp;€ Umsatz
          </motion.div>

          {/* Headline */}
          <h1
            className="font-display text-headline"
            style={{
              fontSize: "clamp(3rem, 8.5vw, 7.2rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            <motion.span variants={word} className="block">
              {line1}
            </motion.span>
            <span className="block">
              {line2Words.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className={
                    w === "Präzision."
                      ? "italic text-accent"
                      : "inline-block mr-[0.25em]"
                  }
                  style={
                    w === "Präzision."
                      ? {
                          fontStyle: "italic",
                          color: "#8b5cf6",
                        }
                      : undefined
                  }
                >
                  {w}
                  {w !== "Präzision." && " "}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Sub */}
          <motion.p
            variants={word}
            className="mt-10 max-w-[620px] text-[19px] leading-[1.55] text-body"
          >
            FINTRY ist die Finanzberatung für ambitionierte Mittelständler.
            Wir übernehmen die Rolle des CFO, führen durch Transaktionen und
            richten Ihre Zahlen so aus, dass jede Entscheidung auf Fakten
            beruht — nicht auf Bauchgefühl.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={word}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a href="#kontakt" className="btn-primary">
              Erstgespräch buchen
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#leistungen" className="btn-ghost">
              Leistungen ansehen
            </a>
            <span className="ml-2 text-[13px] text-body">
              45 Min · unverbindlich · vertraulich
            </span>
          </motion.div>
        </motion.div>

      </div>

      {/* Massive hero visual — the cockpit */}
      <div className="mx-auto mt-20 max-w-[1240px] px-6 lg:mt-28 lg:px-10">
        <HeroCockpit />
      </div>
    </section>
  );
}
