"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center bg-bg-light hover:bg-bg-dark border border-text-muted/30 rounded-full text-text cursor-pointer relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
      aria-label="Toggle theme"
    >
      {!mounted ? (
        <span className="w-5 h-5" aria-hidden="true" />
      ) : (
        <span className="relative w-5 h-5" aria-hidden="true">
          <motion.span
            initial={false}
            animate={{
              rotate: isDark ? 0 : 90,
              scale: isDark ? 1 : 0,
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-text"
          >
            <Sun className="w-5 h-5" />
          </motion.span>

          <motion.span
            initial={false}
            animate={{
              rotate: isDark ? -90 : 0,
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-text"
          >
            <Moon className="w-5 h-5" />
          </motion.span>
        </span>
      )}
    </button>
  );
}

