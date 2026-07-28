"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px]"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(139,92,246,0) 0%, #6d29cd 40%, #8b5cf6 60%, rgba(139,92,246,0) 100%)",
          boxShadow: "0 0 12px rgba(139,92,246,0.6)",
        }}
      />
    </motion.div>
  );
}
