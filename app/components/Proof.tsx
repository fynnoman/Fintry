"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const kpis = [
  { value: "€ 1,8 Mrd", label: "kumulierte Deal-Volumina, die wir seit 2019 mitverantwortet haben" },
  { value: "27", label: "abgeschlossene Transaktionen — Sell-side, Buy-side, Fundraising" },
  { value: "14 Tage", label: "durchschnittliche Vorlaufzeit bis zum ersten belastbaren 13-Wochen-Cashplan" },
  { value: "0 %", label: "unserer Mandate wurden je an einen anderen Berater übergeben" },
];

export default function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="zahlen" ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <motion.div
          style={{ y }}
          className="mb-16 max-w-[720px]"
        >
          <div className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-body">
            <span className="h-px w-8 bg-white/25" />
            In Zahlen
          </div>
          <h2
            className="font-display text-headline"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Sechs Jahre.{" "}
            <span className="italic text-[color:#8b5cf6]">
              Ein Anspruch.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="glass flex min-h-[220px] flex-col justify-between p-6 lg:p-8"
            >
              <div
                className="font-display text-headline"
                style={{
                  fontSize: "clamp(2.4rem, 3.6vw, 3.4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {k.value}
              </div>
              <div className="mt-6 text-[13px] leading-[1.55] text-body">
                {k.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
