import { useEffect, useState } from "react";
import { signalTheme } from "@/components/UI/ThemeToggle";
import { effect } from "@preact/signals-core";

export function useThemeState() {
  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );

  useEffect(() => {
    return () => {
      effect(() => setSignalThemeState(signalTheme.value));
    };
  }, []);
  return { signalThemeState };
}
