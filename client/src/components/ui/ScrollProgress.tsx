"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // ⚡ Spring أسرع وأكثر استجابة (كان 100/30)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,   // ⚡ من 100 → 250 (استجابة أسرع)
    damping: 40,      // ⚡ من 30 → 40 (بدون اهتزاز)
    restDelta: 0.001,
  });

  const circleProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* ═══════════════════════════════════════ */}
      {/* 1️⃣ شريط التقدم العلوي */}
      {/* ═══════════════════════════════════════ */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60]
                   origin-left rtl:origin-right
                   bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600
                   shadow-[0_0_12px_rgba(212,175,55,0.9)]
                   will-change-transform"
      />

      {/* ═══════════════════════════════════════ */}
      {/* 2️⃣ دائرة التقدم الذهبية */}
      {/* ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{
          opacity: progress > 3 ? 1 : 0,
          scale: progress > 3 ? 1 : 0.7,
          y: progress > 3 ? 0 : 30,
        }}
        transition={{ duration: 0.35, type: "spring", bounce: 0.3 }}
        className="fixed bottom-6 end-6 z-[60] pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gold-500/40 blur-xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1.5 rounded-full border border-dashed border-gold-500/30"
        />

        <div className="relative w-16 h-16 rounded-full
                        bg-gradient-to-br from-dark-800/95 via-dark-900/95 to-black/95
                        backdrop-blur-xl
                        border-2 border-gold-500/50
                        shadow-[0_0_30px_rgba(212,175,55,0.5),inset_0_0_20px_rgba(212,175,55,0.15)]
                        flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 64 64"
          >
            <defs>
              <linearGradient id="scrollRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B8" />
                <stop offset="40%" stopColor="#F5D973" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8941F" />
              </linearGradient>
            </defs>

            <circle
              cx="32"
              cy="32"
              r="27"
              fill="none"
              stroke="rgba(212, 175, 55, 0.15)"
              strokeWidth="3"
            />

            <motion.circle
              cx="32"
              cy="32"
              r="27"
              fill="none"
              stroke="url(#scrollRingGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 27}
              style={{
                pathLength: circleProgress,
                filter: "drop-shadow(0 0 4px rgba(212,175,55,0.9))",
              }}
            />
          </svg>

          <div className="relative flex items-baseline gap-0.5">
            <span className="text-sm font-bold bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600
                             bg-clip-text text-transparent tabular-nums pb-0.5 leading-none">
              {progress}
            </span>
            <span className="text-[9px] font-bold text-gold-500/80 leading-none">
              %
            </span>
          </div>
        </div>

        <motion.span
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          className="absolute -top-1 -end-1 w-1.5 h-1.5 rounded-full bg-gold-300
                     shadow-[0_0_8px_rgba(255,220,120,1)]"
        />
        <motion.span
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          className="absolute -bottom-1 -start-1 w-1 h-1 rounded-full bg-gold-400
                     shadow-[0_0_6px_rgba(255,220,120,0.9)]"
        />
        <motion.span
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          className="absolute top-1/2 -start-2 w-1 h-1 rounded-full bg-gold-300
                     shadow-[0_0_6px_rgba(255,220,120,0.8)]"
        />
      </motion.div>
    </>
  );
}