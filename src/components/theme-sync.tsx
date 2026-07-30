import { useEffect } from "react";
import { useSettings } from "@/lib/store";

/** Applies the dark class to <html> based on the persisted setting. */
export function ThemeSync() {
  const dark = useSettings((s) => s.darkMode);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return null;
}
