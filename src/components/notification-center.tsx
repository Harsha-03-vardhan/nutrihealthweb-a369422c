import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useApp, useNotifs } from "@/lib/store";
import {
  Bell, Trash2, CheckCheck, Utensils, Syringe, TrendingUp, Droplets,
  Stethoscope, Sparkles, RotateCcw, Eraser,
} from "lucide-react";
import { EmptyState } from "./empty-state";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import type { NotifType } from "@/lib/mock-data";

const meta: Record<NotifType, { icon: typeof Bell; tone: string; key: string }> = {
  meal: { icon: Utensils, tone: "bg-primary-soft text-primary", key: "notif.type.meal" },
  vaccination: { icon: Syringe, tone: "bg-warning-soft text-warning", key: "notif.type.vaccination" },
  growth: { icon: TrendingUp, tone: "bg-success-soft text-success", key: "notif.type.growth" },
  water: { icon: Droplets, tone: "bg-secondary-soft text-secondary", key: "notif.type.water" },
  doctor: { icon: Stethoscope, tone: "bg-destructive-soft text-destructive", key: "notif.type.doctor" },
  ai: { icon: Sparkles, tone: "bg-secondary-soft text-secondary", key: "notif.type.ai" },
  health: { icon: Stethoscope, tone: "bg-destructive-soft text-destructive", key: "notif.type.health" },
};

type Tab = "all" | "unread" | "dismissed";

export function NotificationCenter({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, tx } = useT();
  const items = useNotifs((s) => s.items);
  const markRead = useNotifs((s) => s.markRead);
  const markAllRead = useNotifs((s) => s.markAllRead);
  const remove = useNotifs((s) => s.remove);
  const clearAll = useNotifs((s) => s.clearAll);

  const alerts = useApp((s) => s.alerts);
  const dismissedIds = useApp((s) => s.dismissedAlertIds);
  const restoreAlert = useApp((s) => s.restoreAlert);
  const restoreAllAlerts = useApp((s) => s.restoreAllAlerts);
  const dismissed = alerts.filter((a) => dismissedIds.includes(a.id));

  const [tab, setTab] = useState<Tab>("all");
  const filtered = items.filter((n) => (tab === "unread" ? !n.read : true));
  const unread = items.filter((n) => !n.read).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary"><Bell className="h-5 w-5" /></span>
            <div className="flex-1">
              <SheetTitle>{t("notif.title")}</SheetTitle>
              <SheetDescription>{unread} {t("notif.unread")}</SheetDescription>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="flex gap-1 rounded-full bg-muted p-1">
              {(["all", "unread", "dismissed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTab(f)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    tab === f ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(f === "all" ? "notif.all" : f === "unread" ? "notif.unreadTab" : "notif.dismissedTab")}
                  {f === "dismissed" && dismissed.length > 0 && ` (${dismissed.length})`}
                </button>
              ))}
            </div>
          </div>
          {tab !== "dismissed" ? (
            <div className="mt-2 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="rounded-full text-xs" onClick={markAllRead}>
                <CheckCheck className="mr-1 h-3.5 w-3.5" /> {t("notif.markAllRead")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-xs text-destructive hover:text-destructive"
                onClick={() => { clearAll(); toast(t("notif.clearAll")); }}
              >
                <Eraser className="mr-1 h-3.5 w-3.5" /> {t("notif.clearAll")}
              </Button>
            </div>
          ) : (
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => { restoreAllAlerts(); toast.success(t("dash.remindersRestored")); }}
              >
                <RotateCcw className="mr-1 h-3.5 w-3.5" /> {t("notif.restoreAll")}
              </Button>
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {tab === "dismissed" ? (
            <>
              <AnimatePresence>
                {dismissed.map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-warning-soft text-warning">
                      <Bell className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{tx(a.title)}</p>
                      <p className="text-xs text-muted-foreground">{tx(a.desc)}</p>
                    </div>
                    <button
                      onClick={() => { restoreAlert(a.id); toast.success(t("notif.restore")); }}
                      className="shrink-0 self-center rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary transition-transform hover:scale-105 active:scale-95"
                    >
                      {t("notif.restore")}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {dismissed.length === 0 && (
                <EmptyState emoji="🗂️" title={t("notif.dismissedEmpty")} desc={t("notif.dismissedEmptyDesc")} />
              )}
            </>
          ) : (
            <>
              <AnimatePresence>
                {filtered.map((n) => {
                  const m = meta[n.type] ?? meta.meal;
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={cn(
                        "flex gap-3 rounded-2xl border p-3 transition-shadow hover:shadow-soft",
                        n.read ? "border-border bg-card" : "border-primary/30 bg-primary-soft/40"
                      )}
                    >
                      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-2xl", m.tone)}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <button className="min-w-0 flex-1 text-left" onClick={() => markRead(n.id)}>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t(m.key)}</p>
                        <p className="truncate text-sm font-semibold">{tx(n.title)}</p>
                        <p className="text-xs text-muted-foreground">{tx(n.body)}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                      </button>
                      <button onClick={() => remove(n.id)} aria-label={t("notif.delete")} className="self-start text-muted-foreground transition-colors hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {filtered.length === 0 && (
                <EmptyState emoji="🔔" title={t("notif.empty")} desc={t("notif.emptyDesc")} />
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
