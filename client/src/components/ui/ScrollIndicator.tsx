"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator({ label }: { label: string }) {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                 text-gold-500/70 hover:text-gold-500 transition-colors duration-300 group z-10"
    >
      <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.a>
  );
}