import { useMemo, useState } from "react";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Syringe, Check, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { EmptyState } from "./empty-state";
import { ageFromDob } from "@/lib/age";

type Filter = "all" | "upcoming" | "completed";

export function VaccinationTracker() {
  const { t, tx } = useT();
  const vaccines = useApp((s) => s.vaccines);
  const toggleVaccine = useApp((s) => s.toggleVaccine);
  const baby = useApp((s) => s.baby);
  const [filter, setFilter] = useState<Filter>("all");

  const ageMonths = useMemo(() => {
    const a = ageFromDob(baby.dob ?? "");
    return a ? a.months + a.days / 30 : baby.ageMonths ?? 0;
  }, [baby]);

  const list = useMemo(() => {
    const sorted = [...vaccines].sort((a, b) => a.ageMonths - b.ageMonths);
    if (filter === "completed") return sorted.filter((v) => v.completed);
    if (filter === "upcoming") return sorted.filter((v) => !v.completed);
    return sorted;
  }, [vaccines, filter]);

  const doneCount = vaccines.filter((v) => v.completed).length;
  const pct = vaccines.length ? Math.round((doneCount / vaccines.length) * 100) : 0;

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-warning-soft text-warning">
          <Syringe className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold tracking-tight">{t("vax.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("vax.desc")}</p>
        </div>
        <div className="flex gap-1 rounded-full bg-muted p-1">
          {(["all", "upcoming", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                filter === f ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`vax.${f}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {doneCount}/{vaccines.length} · {pct}%
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <AnimatePresence initial={false}>
          {list.map((v) => {
            const isDue = !v.completed && v.ageMonths <= ageMonths + 1;
            return (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-2xl border p-3 transition-shadow hover:shadow-soft",
                  v.completed
                    ? "border-border bg-muted/40"
                    : isDue
                      ? "border-warning/40 bg-warning-soft/40"
                      : "border-border bg-card"
                )}
              >
                <button
                  onClick={() => {
                    toggleVaccine(v.id);
                    toast.success(v.completed ? t("vax.markPending") : t("vax.markDone"));
                  }}
                  aria-label={v.completed ? t("vax.markPending") : t("vax.markDone")}
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition-all active:scale-90",
                    v.completed
                      ? "border-success bg-success text-white"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {v.completed ? <Check className="h-4 w-4" /> : <Syringe className="h-4 w-4" />}
                </button>

                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm font-semibold", v.completed && "text-muted-foreground line-through")}>
                    {tx(v.name)}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {tx(v.dose)} · {tx(v.protects)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="rounded-full bg-secondary-soft px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
                    {tx(v.ageLabel)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarClock className="h-3 w-3" />
                    {v.completed ? `${t("vax.completedOn")} ${v.completedDate}` : `${t("vax.due")} ${v.dueDate}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {list.length === 0 && <EmptyState emoji="💉" title={t("vax.empty")} desc="" />}
      </div>
    </section>
  );
}
