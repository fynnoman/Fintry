"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Ab welcher Unternehmensgröße lohnt sich FINTRY?",
    a: "Unser Sweet Spot liegt zwischen 5 und 250 Mio. € Umsatz. Wir arbeiten aber auch mit kleineren Unternehmen, wenn eine Transaktion, ein Fundraising oder eine Sondersituation ansteht — dort ist der Hebel unserer Arbeit unabhängig von der Bilanzsumme.",
  },
  {
    q: "Wie ist die Zusammenarbeit vertraglich geregelt?",
    a: "Standard ist ein monatlicher Retainer für CFO-Mandate, ein Erfolgshonorar für Transaktionen und ein Werkvertrag für Restrukturierungsprojekte. Alle Modelle sind quartalsweise kündbar. Wir binden niemanden länger, als es der Nutzen rechtfertigt.",
  },
  {
    q: "Arbeiten Sie vor Ort oder remote?",
    a: "Beides. Der Kick-off findet immer bei Ihnen im Haus statt. Danach entscheidet der Mandatstyp: Restrukturierung und Transaktionen erfordern regelmäßige Präsenz, laufende CFO-Mandate laufen meist zu 70 % remote mit festen Vor-Ort-Terminen.",
  },
  {
    q: "Wer arbeitet konkret an meinem Mandat?",
    a: "Jedes Mandat wird von einem Partner geführt und von maximal einer weiteren Person begleitet. Sie erhalten keine wechselnden Junior-Teams, sondern feste Ansprechpartner mit direkter Handynummer.",
  },
  {
    q: "Ersetzen Sie unseren Steuerberater oder Wirtschaftsprüfer?",
    a: "Nein. Wir arbeiten mit Ihren bestehenden Beratern zusammen und übernehmen die kaufmännische Steuerung darüber. Wenn Sie Wechsel oder Ergänzungen im Beraterkreis brauchen, empfehlen wir Kandidaten, an denen wir nicht verdienen.",
  },
  {
    q: "Was kostet ein Erstgespräch?",
    a: "Nichts. 45 Minuten, telefonisch oder vor Ort, mit einem Partner. Danach entscheiden Sie ohne Zeitdruck — und ohne dass wir Ihnen ein Angebot nachschicken, das Sie nicht angefordert haben.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-body">
              <span className="h-px w-8 bg-white/25" />
              Häufige Fragen
            </div>
            <h2
              className="font-display text-headline"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Bevor Sie fragen.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              Wenn Ihre Frage hier fehlt, schreiben Sie uns direkt. Wir
              antworten persönlich, meist innerhalb eines Werktags.
            </p>
          </div>

          <ul className="flex flex-col">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-t border-white/8 last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-headline"
                  >
                    <span
                      className="font-display text-headline"
                      style={{
                        fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full transition-transform"
                      style={{
                        border: "1px solid rgba(255,255,255,0.12)",
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                      aria-hidden
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M6 1v10M1 6h10" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[620px] pb-7 text-[15px] leading-[1.7] text-body">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
