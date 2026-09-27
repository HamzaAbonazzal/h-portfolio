"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-10 h-10 rounded-full flex items-center justify-center
                 border border-gold-500/30 hover:border-gold-500
                 hover:bg-gold-500/10 transition-all duration-300
                 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gold-400" />
      ) : (
        <Moon className="w-5 h-5 text-gold-600" />
      )}
    </button>
  );
}