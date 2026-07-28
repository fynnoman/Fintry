"use client";

import { motion } from "framer-motion";

const trustMarks = [
  "Familienunternehmen",
  "Series-A bis Series-C",
  "PE-Portfolio",
  "Mittelstand DACH",
  "Nachfolgeprojekte",
  "Sondersituationen",
];

export default function TrustBar() {
  return (
    <section aria-label="Zielgruppen" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-[12px] uppercase tracking-[0.2em] text-body"
        >
          Wir arbeiten mit
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="flex flex-wrap items-center gap-x-10 gap-y-5"
        >
          {trustMarks.map((mark) => (
            <motion.span
              key={mark}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                },
              }}
              className="font-display text-[24px] leading-none text-white/45 lg:text-[28px]"
            >
              {mark}
            </motion.span>
          ))}
        </motion.div>

        <div className="divider-pulse mt-16" />
      </div>
    </section>
  );
}
