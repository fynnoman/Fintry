"use client";

import PulseLine from "./PulseLine";

const cols = [
  {
    title: "Leistungen",
    links: [
      { label: "Strategie & Planung", href: "#leistungen" },
      { label: "Transaktionen", href: "#leistungen" },
      { label: "Restrukturierung", href: "#leistungen" },
    ],
  },
  {
    title: "Kanzlei",
    links: [
      { label: "Vorgehen", href: "#vorgehen" },
      { label: "Zahlen", href: "#zahlen" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "hallo@fintry.de", href: "mailto:hallo@fintry.de" },
      { label: "+49 221 1234 5678", href: "tel:+4922112345678" },
      { label: "Köln · Frankfurt · München", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 lg:pt-24">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="divider-pulse mb-16" />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:gap-24">
          {/* Brand block */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="relative grid h-9 w-9 place-items-center rounded-[10px]"
                style={{
                  background:
                    "linear-gradient(160deg, #7c33e6 0%, #4c1d95 100%)",
                  boxShadow:
                    "0 8px 20px -8px rgba(109,41,205,0.7), 0 0 0 1px rgba(255,255,255,0.08) inset",
                }}
              >
                <span
                  className="block h-1 w-4 rounded-full"
                  style={{ background: "rgba(255,255,255,0.9)" }}
                />
              </span>
              <span className="font-display text-[28px] leading-none tracking-tight text-headline">
                FINTRY
              </span>
            </a>
            <p className="mt-6 max-w-[360px] text-[15px] leading-[1.65] text-body">
              Finanzberatung mit institutioneller Präzision. Für Unternehmen,
              die verstehen, dass jede Entscheidung eine Zahl hat — und jede
              Zahl eine Geschichte.
            </p>

            <div className="mt-10 max-w-[380px] opacity-60">
              <PulseLine compact className="h-[60px] w-full" />
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">
                  {c.title}
                </div>
                <ul className="flex flex-col gap-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[14px] text-white/80 transition-colors hover:text-headline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/8 pt-8 sm:flex-row sm:items-center">
          <div className="text-[13px] text-white/40">
            © {new Date().getFullYear()} FINTRY GmbH · Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/40">
            <a href="#" className="transition-colors hover:text-headline">
              Impressum
            </a>
            <a href="#" className="transition-colors hover:text-headline">
              Datenschutz
            </a>
            <a href="#" className="transition-colors hover:text-headline">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
