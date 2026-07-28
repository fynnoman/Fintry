"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

const links = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Vorgehen", href: "#vorgehen" },
  { label: "Zahlen", href: "#zahlen" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [0, 120], [0, 0.55]);
  const blurAmt = useTransform(scrollY, [0, 120], [0, 22]);
  const padY = useTransform(scrollY, [0, 120], [22, 12]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{
          paddingTop: padY,
          paddingBottom: padY,
          backdropFilter: useTransform(
            blurAmt,
            (b) => `blur(${b}px) saturate(180%)`
          ),
          backgroundColor: useTransform(
            bgAlpha,
            (a) => `rgba(10, 10, 10, ${a})`
          ),
        }}
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent"
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="FINTRY Startseite"
          >
            <span
              aria-hidden
              className="relative grid h-8 w-8 place-items-center rounded-[10px]"
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
            <span className="font-display text-[22px] leading-none tracking-tight text-headline">
              FINTRY
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-body transition-colors hover:text-headline"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#kontakt" className="btn-primary">
              Erstgespräch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü öffnen"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={clsx(
                  "absolute left-0 h-[1.5px] w-4 bg-white transition-all",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 h-[1.5px] w-4 bg-white transition-all",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(28px) saturate(180%)",
              }}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative mx-6 mt-24 rounded-[24px] p-8 glass glass-heavy"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-headline"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-4 justify-center"
                >
                  Erstgespräch buchen
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
