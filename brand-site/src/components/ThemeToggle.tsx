"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <span className="block transition-transform duration-500 hover:rotate-45">
        {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </span>
    </button>
  );
}
