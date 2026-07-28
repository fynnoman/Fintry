"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Full-viewport typographic moment: the word FINTRY at massive scale.
 * Letters drift in with stagger; scroll parallax makes them shift.
 * Behind the wordmark: a huge pulse-echo halo that expands.
 */
export default function GiantWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.15, 0.9]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.9, 0.4]);

  const letters = ["F", "I", "N", "T", "R", "Y"];

  return (
    <section
      ref={ref}
      aria-label="Markenmoment"
      className="relative overflow-hidden py-32 lg:py-48"
    >
      {/* Huge halo behind */}
      <motion.div
        aria-hidden
        style={{ scale: haloScale, opacity: haloOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 55%, rgba(139,92,246,0.5), rgba(76,29,149,0.2) 40%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      <motion.div style={{ y }} className="relative flex flex-col items-center">
        <div className="mb-8 text-[12px] uppercase tracking-[0.3em] text-body/80 lg:mb-12">
          <span className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-white/25" />
            Der Kern
            <span className="h-px w-8 bg-white/25" />
          </span>
        </div>

        {/* GIANT letters */}
        <div className="flex select-none items-baseline justify-center leading-none">
          {letters.map((L, i) => (
            <motion.span
              key={L + i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: 0.06 * i,
                duration: 1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="font-display text-headline"
              style={{
                fontSize: "clamp(6rem, 22vw, 22rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.06em",
                textShadow: "0 8px 60px rgba(139,92,246,0.35)",
              }}
            >
              {L}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-10 max-w-[640px] text-center text-[17px] leading-[1.6] text-body lg:mt-14 lg:text-[19px]"
        >
          Wenn Ihre Zahlen zu einer{" "}
          <span className="italic text-white/90">Sprache</span> werden,
          verändert sich, wie Sie über Ihr Unternehmen sprechen. Genau dahin
          arbeiten wir mit Ihnen.
        </motion.p>
      </motion.div>
    </section>
  );
}
