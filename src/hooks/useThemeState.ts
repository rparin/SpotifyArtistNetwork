import { useEffect, useState } from "react";
import { effect } from "@preact/signals-core";
import { signalTheme } from "@/components/ThemeToggle";

export default function useThemeState() {
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
