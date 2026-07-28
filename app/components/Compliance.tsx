"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Vertraulichkeit",
    body:
      "Jedes Mandat beginnt mit einer NDA. Datenraumzugänge sind pro Person und Zweck freigeschaltet. Wir arbeiten nach den Standards, die auch in Transaktionsprozessen gelten — dokumentiert und nachvollziehbar.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="24" height="24">
        <path
          d="M16 4l10 4v9c0 6.5-4.4 11.5-10 13-5.6-1.5-10-6.5-10-13V8l10-4z"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M11 16.5l3.2 3.2L21 13"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Regulatorische Nähe",
    body:
      "Wir arbeiten regelmäßig mit Wirtschaftsprüfern, Steuerberatern und Fachanwälten Hand in Hand. In prüfungspflichtigen und meldepflichtigen Situationen kennen wir den Weg — und die Fristen.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="24" height="24">
        <rect x="6" y="7" width="20" height="18" rx="2" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M10 12h12M10 16h12M10 20h7" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Unabhängigkeit",
    body:
      "Wir haben keine Vermittlungsprovisionen mit Banken, Beteiligungsgesellschaften oder Software-Anbietern. Unsere Empfehlung ist unser Honorar. Nichts anderes.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="24" height="24">
        <path d="M16 4v24M6 10c4-2 8-2 10 0s6 2 10 0M6 22c4-2 8-2 10 0s6 2 10 0" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Compliance() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="mb-14 max-w-[720px]">
          <div className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-body">
            <span className="h-px w-8 bg-white/25" />
            Vertraulichkeit & Regulierung
          </div>
          <h2
            className="font-display text-headline"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Diskretion ist keine Nebenleistung.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="glass p-7 lg:p-8"
            >
              <div
                className="mb-6 grid h-11 w-11 place-items-center rounded-[12px]"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.25)",
                }}
              >
                {item.icon}
              </div>
              <h3 className="font-display text-[22px] leading-tight text-headline lg:text-[24px]">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-body">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
