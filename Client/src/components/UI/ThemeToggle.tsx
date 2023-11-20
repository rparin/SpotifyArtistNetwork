"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/UI/button";
import { useEffect } from "react";
import { signal } from "@preact/signals";

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
    <Button
      className={className}
      variant="outline"
      onClick={() => changeTheme()}>
      <Sun className="h-[2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
