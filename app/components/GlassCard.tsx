"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { clsx } from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  heavy?: boolean;
  as?: "div" | "article" | "section";
};

export default function GlassCard({
  children,
  className,
  style,
  heavy = false,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--glow", "1");
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow", "0");
  }

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={clsx("glass glass-glow", heavy && "glass-heavy", className)}
      style={style}
    >
      <div className="relative z-[2]">{children}</div>
    </Tag>
  );
}
