import { Globe } from "lucide-react";
import { useSettings } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Shared language switch — every instance reads/writes the same persisted
 * setting, so the header and Settings selectors stay in sync automatically.
 */
export function LanguageSwitch({ className, compact = false }: { className?: string; compact?: boolean }) {
  const language = useSettings((s) => s.language);
  const set = useSettings((s) => s.set);

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border bg-card p-1",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {!compact && <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
      {(["English", "Tamil"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => set("language", l)}
          aria-pressed={language === l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            language === l
              ? "bg-primary-soft text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l === "English" ? "English" : "தமிழ்"}
        </button>
      ))}
    </div>
  );
}
