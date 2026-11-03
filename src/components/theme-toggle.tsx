"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="icon-button" aria-hidden="true" />;
  const light = resolvedTheme === "light";
  return (
    <button className="icon-button" onClick={() => setTheme(light ? "dark" : "light")} aria-label={`Switch to ${light ? "dark" : "light"} theme`}>
      {light ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
