import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Weight, Ruler, Droplets, Utensils, Heart, ArrowRight, CheckCircle2, Circle,
  Sparkles, Plus, TrendingUp, AlertTriangle, Info, X, Syringe, RotateCcw,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState } from "react";
import { useApp, useMeals } from "@/lib/store";
import { cn } from "@/lib/utils";
import { UpdateGrowthDialog } from "@/components/update-growth-dialog";
import { RecipeModal } from "@/components/recipe-modal";
import { AIChat } from "@/components/ai-chat";
import type { Meal } from "@/lib/mock-data";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { ageFromDob } from "@/lib/age";
import { initialAiRecommendation } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Baby Dashboard — NutriHealth" },
      {
        name: "description",
        content:
          "Daily overview of your baby's meals, water intake, growth trend, vaccinations and AI nutrition tips in English and Tamil.",
      },
      { property: "og:title", content: "Baby Dashboard — NutriHealth" },
      {
        property: "og:description",
        content: "Track meals, growth, water and vaccinations for your baby in one bilingual dashboard.",
      },
    ],
  }),
});

const cardBase = "rounded-3xl bg-card border border-border/70 shadow-card hover:shadow-soft transition-shadow";

type Tone = "primary" | "secondary" | "success" | "warning";
function StatCard({
  icon: Icon, label, value, unit, tone, onClick,
}: { icon: any; label: string; value: string | number; unit?: string; tone: Tone; onClick?: () => void }) {
  const tones: Record<Tone, string> = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
  };
  return (
    <motion.button whileHover={{ y: -3 }} onClick={onClick} className={cn(cardBase, "p-5 text-left")}>
      <div className="flex items-center justify-between">
        <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", tones[tone])}><Icon className="h-5 w-5" /></span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">
        {value}
        {unit && <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>}
      </p>
    </motion.button>
  );
}

function ProgressRing({ value, label, size = 120, stroke = 12 }: { value: number; label: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="var(--muted)" fill="none" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="var(--primary)" fill="none" strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{value}%</p>
          <p className="text-[10px] font-medium uppercase text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const baby = useApp((s) => s.baby);
  const mother = useApp((s) => s.mother);
  const growth = useApp((s) => s.growth);
  const allAlerts = useApp((s) => s.alerts);
  const dismissedIds = useApp((s) => s.dismissedAlertIds);
  const dismissAlert = useApp((s) => s.dismissAlert);
  const restoreAllAlerts = useApp((s) => s.restoreAllAlerts);
  const vaccines = useApp((s) => s.vaccines);
  const alerts = allAlerts.filter((a) => !dismissedIds.includes(a.id));
  const meals = useMeals((s) => s.meals);
  const toggleComplete = useMeals((s) => s.toggleComplete);
  const navigate = useNavigate();
  const [growthOpen, setGrowthOpen] = useState(false);
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const completedMeals = meals.filter((m) => m.completed).length;
  const mealPct = Math.round((completedMeals / meals.length) * 100);

  const { t, tx } = useT();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("dash.goodMorning") : hour < 18 ? t("dash.goodAfternoon") : t("dash.goodEvening");
  const age = ageFromDob(baby.dob ?? "");
  const nextVaccine = [...vaccines].filter((v) => !v.completed).sort((a, b) => a.ageMonths - b.ageMonths)[0];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl gradient-soft p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-3xl bg-white text-3xl shadow-soft sm:h-20 sm:w-20 sm:text-4xl">
              {baby.photo ? <img src={baby.photo} alt={baby.name} className="h-full w-full object-cover" /> : "👶"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{greeting}, {mother.name}</p>
              <h1 className="mt-1 truncate text-2xl font-bold text-foreground sm:text-3xl">{baby.name}</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {age ? age.months : baby.ageMonths} {t("dash.months")} {age ? age.days : baby.ageDays} {t("dash.days")} · {t("dash.born")} {age ? age.bornOn : baby.bornOn}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-xs font-semibold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {tx(baby.status)}
            </span>
            <button onClick={() => navigate({ to: "/profile" })} className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-[1.02] sm:inline-flex">
              <Sparkles className="h-3.5 w-3.5" /> {t("dash.viewProfile")}
            </button>
          </div>
        </div>
      </motion.div>

      <section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={Weight} label={t("dash.weight")} value={baby.weight} unit="kg" tone="primary" onClick={() => navigate({ to: "/growth" })} />
          <StatCard icon={Ruler} label={t("dash.height")} value={baby.height} unit="cm" tone="secondary" onClick={() => navigate({ to: "/growth" })} />
          <StatCard icon={Utensils} label={t("dash.todaysMeals")} value={`${completedMeals}/${meals.length}`} tone="success" onClick={() => navigate({ to: "/food" })} />
          <StatCard icon={Droplets} label={t("dash.water")} value={baby.waterMl} unit="ml" tone="warning" onClick={() => toast(t("dash.waterHint"))} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={cn(cardBase, "p-6")}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{t("dash.mealPlan")}</h3>
              <p className="text-xs text-muted-foreground">{t("dash.mealPlanDesc")}</p>
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{mealPct}% {t("dash.complete")}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {meals.map((m) => (
              <button
                key={m.id}
                onClick={() => setRecipe(m)}
                className="group rounded-2xl border border-border/60 bg-primary-soft/40 p-4 text-left transition-all hover:border-primary/40 hover:bg-primary-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.emoji}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); toggleComplete(m.id); toast.success(m.completed ? t("meal.upcomingToast") : t("meal.completedToast")); }}
                    className="rounded-full p-1 hover:bg-white/60"
                  >
                    {m.completed ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx(m.slot)}</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-foreground">{tx(m.name)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{m.time}</p>
              </button>
            ))}
          </div>
        </div>

        <div className={cn(cardBase, "p-6")}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{t("dash.feedingSchedule")}</h3>
              <p className="text-xs text-muted-foreground">{t("dash.feedingScheduleDesc")}</p>
            </div>
            <button onClick={() => navigate({ to: "/food" })} aria-label={t("dash.addMeal")} className="rounded-full border border-border p-2 hover:bg-primary-soft">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <ol className="relative space-y-4 border-l-2 border-dashed border-border pl-6">
            {meals.map((m) => (
              <li key={m.id} className="relative">
                <span className={cn("absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full ring-4 ring-card", m.completed ? "bg-success" : "bg-primary")}>
                  <span className="text-[10px] text-white">{m.completed ? "✓" : "•"}</span>
                </span>
                <button onClick={() => setRecipe(m)} className="flex w-full items-center justify-between rounded-2xl bg-secondary-soft/40 p-3 text-left hover:bg-secondary-soft/70">
                  <div>
                    <p className="text-sm font-semibold">{tx(m.slot)}</p>
                    <p className="text-xs text-muted-foreground">{m.time} · {tx(m.name)}</p>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold", m.completed ? "bg-success-soft text-success" : "bg-primary-soft text-primary")}>
                    {m.completed ? t("common.completed") : t("common.upcoming")}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className={cn(cardBase, "flex flex-col p-6")}>
          <h3 className="text-lg font-bold">{t("dash.mealProgress")}</h3>
          <p className="text-xs text-muted-foreground">{t("dash.mealProgressDesc")}</p>
          <div className="mt-4 flex flex-1 items-center justify-center"><ProgressRing value={mealPct} label={t("dash.doneLabel")} /></div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-2xl bg-success-soft py-2">
              <p className="text-xs text-muted-foreground">{t("common.completed")}</p>
              <p className="text-sm font-bold text-success">{completedMeals}</p>
            </div>
            <div className="rounded-2xl bg-primary-soft py-2">
              <p className="text-xs text-muted-foreground">{t("common.upcoming")}</p>
              <p className="text-sm font-bold text-primary">{meals.length - completedMeals}</p>
            </div>
          </div>
        </div>

        <div className={cn(cardBase, "p-6")}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{t("dash.growthSnapshot")}</h3>
              <p className="text-xs text-muted-foreground">{t("dash.weightTrend", { n: growth.length })}</p>
            </div>
            <button onClick={() => navigate({ to: "/growth" })} className="inline-flex items-center gap-1 rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
              <TrendingUp className="h-3 w-3" /> {t("dash.healthy")}
            </button>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer>
              <LineChart data={growth} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Line type="monotone" dataKey="weight" stroke="var(--primary)" strokeWidth={3}
                  dot={{ r: 5, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--card)" }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold">{t("dash.alerts")}</h3>
          {dismissedIds.length > 0 && (
            <button
              onClick={() => { restoreAllAlerts(); toast.success(t("dash.remindersRestored")); }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-secondary transition-colors hover:bg-secondary-soft"
            >
              <RotateCcw className="h-3.5 w-3.5" /> {t("dash.restoreReminders")}
            </button>
          )}
        </div>
        {alerts.length === 0 ? (
          <div className={cn(cardBase, "p-8 text-center")}>
            <p className="text-3xl">✨</p>
            <p className="mt-2 text-sm font-semibold">{t("dash.noAlerts")}</p>
            <p className="text-xs text-muted-foreground">{t("dash.noAlertsDesc")}</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {alerts.map((a) => {
              const Icon = a.tone === "warning" ? AlertTriangle : Info;
              const tone = a.tone === "warning" ? "bg-warning-soft text-warning" : "bg-secondary-soft text-secondary";
              return (
                <div key={a.id} className={cn(cardBase, "flex gap-3 p-4")}>
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-2xl", tone)}><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{tx(a.title)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{tx(a.desc)}</p>
                  </div>
                  <button onClick={() => { dismissAlert(a.id); toast(t("dash.reminderHidden")); }} aria-label={t("dash.dismiss")} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className={cn(cardBase, "flex gap-4 p-5")}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-warning-soft text-warning"><Syringe className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("dash.upcomingVaccine")}</p>
            {nextVaccine ? (
              <>
                <p className="mt-1 truncate text-sm font-bold">{tx(nextVaccine.name)} · {tx(nextVaccine.dose)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{tx(nextVaccine.ageLabel)} · {t("vax.due")} {nextVaccine.dueDate}</p>
                <button onClick={() => navigate({ to: "/growth" })} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  {t("vax.title")} <ArrowRight className="h-3 w-3" />
                </button>
              </>
            ) : (
              <p className="mt-1 text-sm font-semibold">{t("dash.noUpcomingVaccine")}</p>
            )}
          </div>
        </div>
        <div className={cn(cardBase, "flex gap-4 p-5")}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary-soft text-secondary"><Sparkles className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("dash.aiRecommendation")}</p>
            <p className="mt-1 text-sm font-bold">{tx(initialAiRecommendation.title)}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{tx(initialAiRecommendation.body)}</p>
            <button onClick={() => setChatOpen(true)} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
              {t("dash.askAI")} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-bold">{t("dash.quickActions")}</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: t("dash.logMeal"), icon: Utensils, tone: "bg-primary-soft text-primary", action: () => navigate({ to: "/food" }) },
            { label: t("dash.addGrowth"), icon: TrendingUp, tone: "bg-secondary-soft text-secondary", action: () => setGrowthOpen(true) },
            { label: t("dash.symptoms"), icon: Heart, tone: "bg-destructive-soft text-destructive", action: () => navigate({ to: "/health" }) },
            { label: t("dash.askAI"), icon: Sparkles, tone: "bg-success-soft text-success", action: () => setChatOpen(true) },
          ].map((a) => (
            <motion.button whileHover={{ y: -3 }} key={a.label} onClick={a.action} className={cn(cardBase, "flex items-center gap-3 p-4 text-left")}>
              <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", a.tone)}><a.icon className="h-5 w-5" /></span>
              <span className="text-sm font-semibold">{a.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <UpdateGrowthDialog open={growthOpen} onOpenChange={setGrowthOpen} />
      <RecipeModal meal={recipe} onOpenChange={(o) => !o && setRecipe(null)} />
      <AIChat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
