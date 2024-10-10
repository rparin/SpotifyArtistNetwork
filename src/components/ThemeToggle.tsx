"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { signal } from "@preact/signals";
import cn from "@/utils/cn";

export const signalTheme = signal("light");
export function ThemeToggle({ className }: { className?: string | undefined }) {
  const { setTheme } = useTheme();

  const setThemeHelper = (theme: "dark" | "light" | string) => {
    setTheme(theme);
    signalTheme.value = theme;
  };

  const changeTheme = () => {
    const savedTheme = window.localStorage.getItem("theme");
    setThemeHelper(savedTheme == "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      setThemeHelper(savedTheme);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeHelper(isDark ? "dark" : "light");
    }
  });

  return (
    <button
      className={cn(
        "h-10 border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => changeTheme()}>
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
