"use client";

/**
 * "Der Puls" — FINTRY signature element.
 * A single ECG-like line. Calm, then a decisive spike, then calm.
 * The dot rides along the path continuously via SVG animateMotion.
 */
export default function PulseLine({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const pathD =
    "M 0 60 " +
    "L 80 60 " +
    "Q 100 60 110 50 Q 120 40 130 50 Q 140 60 160 60 " +
    "L 220 60 " +
    "L 240 30 L 255 90 L 268 15 L 282 100 L 300 60 " +
    "L 380 60 " +
    "Q 400 60 410 52 Q 420 44 430 52 Q 440 60 460 60 " +
    "L 620 60";

  const strokeWidth = compact ? 1.5 : 2.25;

  return (
    <svg
      viewBox="0 0 620 120"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Signaturbild: FINTRY-Puls"
      className={className}
    >
      <defs>
        <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(139,92,246,0)" />
          <stop offset="15%" stopColor="rgba(139,92,246,0.9)" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="85%" stopColor="rgba(139,92,246,0.9)" />
          <stop offset="100%" stopColor="rgba(139,92,246,0)" />
        </linearGradient>
        <path id="pulsePath" d={pathD} />
      </defs>

      {/* Ambient halo — soft wide line behind */}
      <path
        d={pathD}
        stroke="rgba(139,92,246,0.18)"
        strokeWidth={strokeWidth * 3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Main pulse line */}
      <g className="pulse-glow">
        <path
          d={pathD}
          className="pulse-path"
          stroke="url(#pulseGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Riding cursor — bright dot follows the line */}
      {!compact && (
        <>
          <circle r="5" fill="#ffffff" opacity="0.95">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              rotate="auto"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#pulsePath" />
            </animateMotion>
          </circle>
          <circle r="14" fill="#8b5cf6" opacity="0.35">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#pulsePath" />
            </animateMotion>
          </circle>
        </>
      )}
    </svg>
  );
}
