export default function BackgroundMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="blob"
        style={{
          top: "-15%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(closest-side, rgba(109,41,205,0.55), rgba(109,41,205,0) 70%)",
          animation: "blob-drift-1 26s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(closest-side, rgba(76,29,149,0.5), rgba(76,29,149,0) 70%)",
          animation: "blob-drift-2 32s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          top: "35%",
          left: "30%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.28), rgba(139,92,246,0) 70%)",
          animation: "blob-drift-3 40s ease-in-out infinite",
        }}
      />
      {/* Vignette to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0.8) 100%)",
        }}
      />
    </div>
  );
}
