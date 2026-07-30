import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, MicOff, Sparkles, Phone, AlertTriangle, ArrowRight, X, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "@/lib/store";
import { symptoms, type SymptomKey } from "@/lib/mock-data";
import { healthGuides, guideDisclaimer, type HealthGuide } from "@/lib/health-guides";
import { cn } from "@/lib/utils";
import { AIChat } from "@/components/ai-chat";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useDebounced, useVoiceInput, highlight } from "@/lib/hooks";
import { EmptyState } from "@/components/empty-state";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Baby Health Care — NutriHealth" },
      { name: "description", content: "Symptom guidance, home remedies, vaccination tracking and doctor advice for your baby, in English and Tamil." },
      { property: "og:title", content: "Baby Health Care — NutriHealth" },
      { property: "og:description", content: "Symptom guidance, home remedies, vaccination tracking and doctor advice for your baby, in English and Tamil." },
    ],
  }),
 component: HealthPage });

const guideFilters = ["All", "Home Remedies", "Doctor", "Medicine"] as const;

function HealthPage() {
  const { t, tx } = useT();
  const baby = useApp((s) => s.baby);
  const [filter, setFilter] = useState<(typeof guideFilters)[number]>("All");
  const [q, setQ] = useState("");
  const dq = useDebounced(q, 200);
  const voice = useVoiceInput((t) => setQ(t));
  const [openSymptom, setOpenSymptom] = useState<SymptomKey | null>(null);
  const [emergency, setEmergency] = useState(false);
  const [chat, setChat] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [openGuide, setOpenGuide] = useState<HealthGuide | null>(null);

  const symptomResults = useMemo(() => {
    const s = dq.toLowerCase();
    return symptoms.filter((sym) => !s || sym.name.toLowerCase().includes(s) || sym.overview.toLowerCase().includes(s));
  }, [dq]);

  const guides = useMemo(() => {
    const s = dq.toLowerCase();
    return healthGuides.filter(
      (g) =>
        (filter === "All" || g.category === filter) &&
        (!s || g.title.toLowerCase().includes(s) || g.desc.toLowerCase().includes(s) || g.intro.toLowerCase().includes(s))
    );
  }, [filter, dq]);
  const active = symptoms.find((s) => s.key === openSymptom) ?? null;

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-24">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("health.kicker")}</p>
          <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">{t("health.careFor", { name: baby.name })}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("health.subtitle")}</p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-4 shadow-card">
          <p className="text-[11px] font-semibold uppercase text-muted-foreground">{t("health.summary")}</p>
          <p className="mt-1 text-sm font-bold text-success">{t("health.allGood")}</p>
        </div>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("health.search")}
          className="h-14 w-full rounded-full border border-border bg-card pl-14 pr-24 text-sm shadow-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label={t("common.clear")} className="absolute right-14 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        {voice.supported && (
          <button
            aria-label={voice.listening ? t("common.stopVoice") : t("common.startVoice")}
            onClick={() => (voice.listening ? voice.stop() : voice.start())}
            className={cn("absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-white", voice.listening ? "bg-destructive animate-pulse" : "gradient-brand")}
          >
            {voice.listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t("health.symptoms")}</h2>
          <span className="text-xs text-muted-foreground">{symptomResults.length} {t("health.results")}</span>
        </div>
        {symptomResults.length === 0 ? (
          <EmptyState emoji="🔍" title={t("health.noSymptoms")} desc={t("health.noSymptomsDesc")} />
        ) : (
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {symptomResults.map((s) => (
              <motion.button
                whileHover={{ y: -4 }}
                key={s.key}
                onClick={() => setOpenSymptom(s.key)}
                className="flex flex-col items-center gap-2 rounded-3xl border border-border/70 bg-card p-4 shadow-card transition-all hover:border-primary/40"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-3xl">{s.emoji}</span>
                <span className="text-center text-xs font-semibold">{highlight(tx(s.name), dq)}</span>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl gradient-soft p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-secondary">
              <Sparkles className="h-3.5 w-3.5" /> {t("health.aiAssistant")}
            </span>
            <h3 className="mt-3 text-xl font-bold">{t("health.notSure")}</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t("health.notSureDesc")}</p>
          </div>
          <button onClick={() => setChat(true)} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">
            {t("health.askAI")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">{t("health.guides")}</h2>
          <div className="flex flex-wrap gap-2">
            {guideFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  filter === f ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card hover:bg-primary-soft"
                )}
              >{f === "All" ? t("filter.All") : t(`guide.${f}`)}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {guides.map((g) => (
              <motion.article
                key={g.title}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-all hover:shadow-soft"
              >
                <div className="grid h-40 place-items-center gradient-soft text-6xl">{g.emoji}</div>
                <div className="p-5">
                  <h3 className="text-base font-bold">{tx(g.title)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{tx(g.desc)}</p>
                  <button
                    onClick={() => setOpenGuide(g)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("health.readGuide")} <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        {guides.length === 0 && (
          <EmptyState emoji="📖" title={t("health.noGuides")} desc={t("health.noGuidesDesc")} />
        )}
      </section>

      <div className="rounded-3xl border border-destructive/20 bg-destructive-soft p-5 text-destructive">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold">{t("health.important")}</p>
            <p className="text-xs text-destructive/80">{t("health.importantDesc")}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-40 right-4 z-30 lg:bottom-24 lg:right-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEmergency(true)}
          className="inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-3.5 text-sm font-bold text-destructive-foreground shadow-glow"
        >
          <Phone className="h-4 w-4" /> {t("health.callEmergency")}
        </motion.button>
      </div>

      {/* Symptom detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setOpenSymptom(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-3xl">{active.emoji}</span>
                  <div>
                    <DialogTitle className="text-xl">{tx(active.name)}</DialogTitle>
                    <DialogDescription>{tx(active.overview)}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div>
                <h4 className="mb-2 text-sm font-bold">{t("health.causes")}</h4>
                <ul className="grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                  {active.causes.map((c) => <li key={c} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {tx(c)}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-bold">{t("health.remedies")}</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {active.remedies.map((r, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-soft text-xs font-bold text-success">{i + 1}</span>
                      <span>{tx(r)}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl bg-warning-soft/60 p-3">
                <p className="mb-1 text-xs font-bold text-warning">{t("health.whenDoctor")}</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {active.warning.map((w) => <li key={w} className="flex gap-2"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />{tx(w)}</li>)}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">{tx(active.doctor)}</p>
              </div>

              <div className="rounded-2xl bg-primary-soft/40 p-3">
                <p className="text-xs font-bold text-primary">{t("health.medicine")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{tx(active.medicine)}</p>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-bold">{t("health.nutrition")}</h4>
                <div className="flex flex-wrap gap-2">
                  {active.nutrition.map((n) => (
                    <span key={n} className="rounded-full bg-secondary-soft px-2.5 py-1 text-[11px] font-semibold text-secondary">{tx(n)}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-bold">{t("health.faqs")}</h4>
                <div className="space-y-2">
                  {active.faqs.map((f, i) => {
                    const id = `${active.key}-${i}`;
                    const open = openFaq === id;
                    return (
                      <div key={id} className="rounded-2xl border border-border p-3">
                        <button onClick={() => setOpenFaq(open ? null : id)} className="flex w-full items-center justify-between text-left text-sm font-semibold">
                          {tx(f.q)}
                          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        {open && <p className="mt-2 text-xs text-muted-foreground">{tx(f.a)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button onClick={() => { setOpenSymptom(null); setChat(true); }} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                  {t("health.askAboutThis")}
                </button>
                <button onClick={() => setEmergency(true)} className="rounded-full border border-destructive/30 bg-destructive-soft px-4 py-2 text-xs font-semibold text-destructive">
                  {t("health.emergency")}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={emergency}
        onOpenChange={setEmergency}
        destructive
        title={t("health.confirmCall")}
        description={t("health.confirmCallDesc")}
        confirmText={t("health.callNow")}
        onConfirm={() => { setEmergency(false); toast.success(t("health.calling")); if (typeof window !== "undefined") window.location.href = "tel:108"; }}
      />

      {/* Full health-guide article */}
      <Dialog open={!!openGuide} onOpenChange={(o) => !o && setOpenGuide(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl">
          {openGuide && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-3xl">{openGuide.emoji}</span>
                  <div className="min-w-0">
                    <DialogTitle className="text-xl">{tx(openGuide.title)}</DialogTitle>
                    <DialogDescription>{tx(openGuide.desc)}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-foreground">{t("guide.introduction")}</p>
                {tx(openGuide.intro)}
              </div>

              {([
                ["guide.symptoms", openGuide.symptoms, "bg-primary"],
                ["guide.causes", openGuide.causes, "bg-secondary"],
                ["guide.homeCare", openGuide.homeCare, "bg-success"],
                ["guide.prevention", openGuide.prevention, "bg-secondary"],
                ["guide.nutrition", openGuide.nutrition, "bg-success"],
                ["guide.tips", openGuide.tips, "bg-primary"],
              ] as const).map(([key, items, dot]) => (
                <div key={key}>
                  <h4 className="mb-2 text-sm font-bold">{t(key)}</h4>
                  <ul className="grid gap-1.5 text-sm text-muted-foreground">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", dot)} />
                        <span>{tx(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-2xl bg-warning-soft/60 p-3">
                <p className="mb-1 text-xs font-bold text-warning">{t("guide.warningSigns")}</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {openGuide.warningSigns.map((w) => <li key={w}>• {tx(w)}</li>)}
                </ul>
              </div>

              <div className="rounded-2xl bg-secondary-soft/60 p-3">
                <p className="mb-1 text-xs font-bold text-secondary">{t("guide.whenDoctor")}</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {openGuide.whenToSeeDoctor.map((w) => <li key={w}>• {tx(w)}</li>)}
                </ul>
              </div>

              <div className="rounded-2xl bg-destructive-soft p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" /> {t("guide.emergency")}
                </p>
                <ul className="space-y-1 text-xs text-destructive/90">
                  {openGuide.emergency.map((w) => <li key={w}>• {tx(w)}</li>)}
                </ul>
              </div>

              <p className="rounded-2xl border border-border/70 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{t("guide.disclaimer")}: </span>{tx(guideDisclaimer)}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <button onClick={() => { setOpenGuide(null); setChat(true); }} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                  {t("health.askAboutThis")}
                </button>
                <button onClick={() => setEmergency(true)} className="rounded-full border border-destructive/30 bg-destructive-soft px-4 py-2 text-xs font-semibold text-destructive">
                  {t("health.emergency")}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AIChat open={chat} onOpenChange={setChat} />
    </div>
  );
}
