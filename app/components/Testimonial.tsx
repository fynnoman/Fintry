"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function Testimonial() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <GlassCard heavy className="relative overflow-hidden p-8 lg:p-16">
            {/* Corner quotation glyph */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-8 -left-4 select-none font-display text-[220px] leading-none text-white/[0.04] lg:-top-16 lg:-left-8 lg:text-[360px]"
            >
              „
            </div>

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
              <blockquote>
                <p
                  className="font-display text-headline"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.35rem)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.015em",
                  }}
                >
                  Wir hatten drei Beratungsangebote auf dem Tisch. FINTRY war
                  das einzige Team, das im Erstgespräch bereits konkret über
                  unsere Zahlen sprach — nicht über sich selbst. Vier Monate
                  später hatten wir einen sauberen 13-Wochen-Plan, ein neues
                  Working-Capital-Modell und den ersten Zwischenabschluss, der
                  seit Jahren pünktlich stand.
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-full font-display text-[15px] text-headline"
                    style={{
                      background:
                        "linear-gradient(160deg, #7c33e6 0%, #4c1d95 100%)",
                    }}
                    aria-hidden
                  >
                    HS
                  </div>
                  <div>
                    <div className="text-[15px] text-headline">
                      Hendrik&nbsp;Sauerbier
                    </div>
                    <div className="text-[13px] text-body">
                      CEO, Industriegruppe DACH (Umsatz 78 Mio. €)
                    </div>
                  </div>
                </footer>
              </blockquote>

              <div className="flex flex-col justify-between gap-6 border-white/5 pt-8 lg:border-l lg:pl-10 lg:pt-0">
                <MiniStat
                  n="4 Monate"
                  label="von Mandatsstart bis stabiles Reporting"
                />
                <MiniStat n="+18 %" label="freigesetzte Liquidität aus Working Capital" />
                <MiniStat n="1 Team" label="statt drei parallele Berater" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function MiniStat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div
        className="font-display text-headline"
        style={{
          fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {n}
      </div>
      <div className="mt-2 text-[13px] leading-relaxed text-body">{label}</div>
    </div>
  );
}
