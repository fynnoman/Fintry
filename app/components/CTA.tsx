"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PulseLine from "./PulseLine";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);

  return (
    <section id="kontakt" ref={ref} className="relative py-24 lg:py-40">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] lg:rounded-[32px]">
          {/* Big background halo */}
          <motion.div
            aria-hidden
            style={{ y: parallaxY, scale: glowScale }}
            className="pointer-events-none absolute -top-[30%] left-1/2 -z-0 h-[120%] w-[120%] -translate-x-1/2"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(109,41,205,0.55), rgba(109,41,205,0.15) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
          </motion.div>

          {/* Big glass panel */}
          <div className="glass glass-heavy relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mx-auto max-w-[820px] text-center"
            >
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-body">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "#8b5cf6",
                    boxShadow: "0 0 12px rgba(139,92,246,0.9)",
                  }}
                />
                45 Minuten. Ein Partner. Ihre Zahlen.
              </div>

              <h2
                className="font-display text-headline"
                style={{
                  fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                }}
              >
                Sprechen wir über Ihre{" "}
                <span className="italic text-[color:#8b5cf6]">
                  nächste Entscheidung.
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-[560px] text-[17px] leading-[1.6] text-body">
                Buchen Sie ein Erstgespräch — kostenfrei, ohne Präsentation
                und ohne Nachfassen. Sie sagen uns, was ansteht. Wir sagen
                Ihnen, ob wir dafür die richtigen sind.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hallo@fintry.de?subject=Erstgespr%C3%A4ch%20FINTRY"
                  className="btn-primary"
                >
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
                <a href="tel:+4922112345678" className="btn-ghost">
                  Direkt anrufen
                </a>
              </div>

              <div className="mt-14 opacity-70">
                <PulseLine compact className="mx-auto h-[70px] w-[420px] max-w-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
