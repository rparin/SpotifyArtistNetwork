"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/UI/button";
import { useThemeDetector } from "@/hooks/ThemeDetector";
import { useState } from "react";

export function ThemeToggle({ className }: { className?: string | undefined }) {
  const { setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(useThemeDetector());

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (isDarkTheme) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

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
