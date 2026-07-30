import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Weight, Ruler, Brain, Activity, TrendingUp, CheckCircle2, Circle, Sparkles, Plus,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { UpdateGrowthDialog } from "@/components/update-growth-dialog";
import { VaccinationTracker } from "@/components/vaccination-tracker";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/growth")({
  head: () => ({
    meta: [
      { title: "Growth Tracker — NutriHealth" },
      { name: "description", content: "Track your baby's weight, height, head circumference, BMI and developmental milestones with clear bilingual charts." },
      { property: "og:title", content: "Growth Tracker — NutriHealth" },
      { property: "og:description", content: "Track your baby's weight, height, head circumference, BMI and developmental milestones with clear bilingual charts." },
    ],
  }),
 component: GrowthPage });

const metricTabs = [
  { key: "weight", labelKey: "dash.weight", unit: "kg", color: "var(--primary)" },
  { key: "height", labelKey: "dash.height", unit: "cm", color: "var(--secondary)" },
  { key: "headCircum", labelKey: "growth.headCirc", unit: "cm", color: "var(--success)" },
] as const;

function GrowthPage() {
  const baby = useApp((s) => s.baby);
  const growth = useApp((s) => s.growth);
  const milestones = useApp((s) => s.milestones);
  const toggleMilestone = useApp((s) => s.toggleMilestone);
  const [metric, setMetric] = useState<(typeof metricTabs)[number]>(metricTabs[0]);
  const [update, setUpdate] = useState(false);
  const { t, tx } = useT();

  const stats = [
    { icon: Weight, label: t("dash.weight"), value: `${baby.weight} kg`, tone: "bg-primary-soft text-primary" },
    { icon: Ruler, label: t("dash.height"), value: `${baby.height} cm`, tone: "bg-secondary-soft text-secondary" },
    { icon: Brain, label: t("growth.headCirc"), value: `${baby.headCircumference} cm`, tone: "bg-warning-soft text-warning" },
    { icon: Activity, label: t("growth.bmi"), value: baby.bmi.toString(), tone: "bg-success-soft text-success" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("growth.kicker")}</p>
          <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">{t("growth.trackTitle", { name: baby.name })}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("growth.subtitle")}</p>
        </div>
        <button onClick={() => setUpdate(true)} className="inline-flex shrink-0 items-center gap-2 rounded-full gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
          <Plus className="h-4 w-4" /> {t("growth.update")}
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <motion.div whileHover={{ y: -3 }} key={s.label} className="rounded-3xl border border-border/70 bg-card p-5 shadow-card">
            <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", s.tone)}><s.icon className="h-5 w-5" /></span>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">{t("growth.chart")}</h2>
            <p className="text-xs text-muted-foreground">{t("growth.tracking", { n: growth.length })}</p>
          </div>
          <div className="flex gap-2">
            {metricTabs.map((m) => (
              <button
                key={m.key}
                onClick={() => setMetric(m)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                  metric.key === m.key ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card hover:bg-primary-soft"
                )}
              >{t(m.labelKey)}</button>
            ))}
          </div>
        </div>
        <div className="h-[360px] w-full">
          <ResponsiveContainer>
            <LineChart data={growth} margin={{ top: 20, right: 20, bottom: 10, left: -10 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey={metric.key} name={`${t(metric.labelKey)} (${metric.unit})`}
                stroke={metric.color} strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: "var(--card)", fill: metric.color }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t("growth.history")}</h2>
          <button onClick={() => setUpdate(true)} className="text-xs font-semibold text-primary hover:underline">{t("growth.addEntry")}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="pb-3 font-semibold">{t("growth.month")}</th>
                <th className="pb-3 font-semibold">{t("growth.weightKg")}</th>
                <th className="pb-3 font-semibold">{t("growth.heightCm")}</th>
                <th className="pb-3 font-semibold">{t("growth.headCircCm")}</th>
                <th className="pb-3 font-semibold">{t("growth.status")}</th>
              </tr>
            </thead>
            <tbody>
              {[...growth].reverse().map((g, i) => (
                <tr key={g.id} className={cn("border-t border-border", i === 0 && "bg-primary-soft/40")}>
                  <td className="py-3 font-semibold">{tx(g.month)} {g.year}</td>
                  <td className="py-3">{g.weight}</td>
                  <td className="py-3">{g.height}</td>
                  <td className="py-3">{g.headCircum}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
                      <TrendingUp className="h-3 w-3" /> {t("dash.healthy")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t("growth.milestones")}</h2>
          <span className="text-xs text-muted-foreground">{t("growth.milestonesDone", { a: milestones.filter((m) => m.done).length, b: milestones.length })}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <motion.button
              whileHover={{ y: -4 }}
              onClick={() => toggleMilestone(m.id)}
              key={m.id}
              className={cn(
                "rounded-3xl border p-5 text-left shadow-card transition-all",
                m.done ? "border-success/30 bg-success-soft/60" : "border-border bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{m.emoji}</span>
                {m.done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx(m.age)}</p>
              <p className="mt-1 text-sm font-semibold">{tx(m.title)}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl gradient-soft p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-secondary">
              <Sparkles className="h-3.5 w-3.5" /> {t("growth.tip")}
            </span>
            <h3 className="mt-3 text-xl font-bold">{t("growth.tipTitleName", { name: baby.name })}</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {t("growth.tipBody")}
            </p>
          </div>
          <div className="text-6xl md:text-7xl">👶</div>
        </div>
      </section>

      <VaccinationTracker />

      <UpdateGrowthDialog open={update} onOpenChange={setUpdate} />
    </div>
  );
}
