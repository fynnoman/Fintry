"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Zuhören",
    when: "Woche 1",
    body:
      "Wir starten mit dem Erstgespräch, gefolgt von einer ersten Bestandsaufnahme: Zahlen, Verträge, Team, Deadlines. Kein Verkaufsgespräch, keine Präsentation — nur Fragen.",
  },
  {
    n: "02",
    title: "Kartieren",
    when: "Woche 2–3",
    body:
      "Wir übersetzen die Ist-Situation in ein sauberes Modell und definieren mit Ihnen drei bis fünf Hebel, die den größten Unterschied machen. Sie erhalten eine schriftliche Analyse, keine PDF-Broschüre.",
  },
  {
    n: "03",
    title: "Umsetzen",
    when: "ab Woche 4",
    body:
      "Wir arbeiten wie ein internes Team: wöchentlicher Rhythmus, direkter Kontakt zu Geschäftsführung, Team und Beirat. Jede Empfehlung hat einen Verantwortlichen und ein Datum.",
  },
  {
    n: "04",
    title: "Übergeben",
    when: "Ende des Mandats",
    body:
      "Am Ende steht ein sauberer Übergang — an einen internen CFO, an eine neue Struktur oder an eine ruhigere Phase. Wir gehen, bevor wir zur Gewohnheit werden.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.6], ["0%", "100%"]);

  return (
    <section id="vorgehen" ref={ref} className="relative py-24 lg:py-40">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="max-w-[720px]">
          <div className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-body">
            <span className="h-px w-8 bg-white/25" />
            So arbeiten wir
          </div>
          <h2
            className="font-display text-headline"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Vier Schritte,{" "}
            <span className="italic text-[color:#8b5cf6]">keine Präsentationsschlacht.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-body">
            Wir glauben nicht an 80-seitige Foliensätze. Unser Vorgehen ist
            handwerklich: verstehen, ordnen, entscheiden, verantworten.
          </p>
        </div>

        <div className="relative mt-20 lg:mt-28">
          {/* Vertical progress line */}
          <div className="pointer-events-none absolute left-[27px] top-2 bottom-2 w-px bg-white/8 md:left-[35px]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full origin-top"
              aria-hidden
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(139,92,246,0) 0%, #8b5cf6 20%, #6d29cd 100%)",
                  boxShadow: "0 0 12px rgba(139,92,246,0.6)",
                }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-10 lg:gap-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="relative flex gap-6 md:gap-10"
              >
                <div
                  className="relative z-10 grid h-[54px] w-[54px] flex-shrink-0 place-items-center rounded-full md:h-[70px] md:w-[70px]"
                  style={{
                    background: "rgba(10,10,10,0.9)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    boxShadow: "0 0 24px rgba(109,41,205,0.25), 0 8px 20px -8px rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="font-display text-[18px] text-headline md:text-[22px]">
                    {s.n}
                  </span>
                </div>
                <div className="pt-1">
                  <div className="mb-2 flex flex-wrap items-baseline gap-4">
                    <h3
                      className="font-display text-headline"
                      style={{
                        fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <span className="text-[12px] uppercase tracking-[0.2em] text-[color:#8b5cf6]">
                      {s.when}
                    </span>
                  </div>
                  <p className="max-w-[620px] text-[16px] leading-[1.65] text-body">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
