"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import cn from "@/utils/cn";

export function ThemeToggle({ className }: { className?: string | undefined }) {
  const { setTheme, theme } = useTheme();
  const [checked, setCheck] = useState(false);

  const changeTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
    setCheck(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle Theme`}
      className={cn(
        "h-10 border border-input bg-background px-4 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => changeTheme()}>
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </button>
  );
}
