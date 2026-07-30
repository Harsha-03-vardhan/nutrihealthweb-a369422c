import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Mic, MicOff, CheckCircle2, Circle, Flame, Beef, Droplet, Bone,
  RefreshCw, Sparkles, Heart, X,
} from "lucide-react";
import { useApp, useMeals } from "@/lib/store";
import type { Meal, MealSlot } from "@/lib/mock-data";
import { defaultPlanTimes, searchRecipes, suggestReplacements, recipes as allRecipes } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { RecipeModal } from "@/components/recipe-modal";
import { AIChat } from "@/components/ai-chat";
import { EmptyState } from "@/components/empty-state";
import { useDebounced, useVoiceInput, highlight } from "@/lib/hooks";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/food")({
  head: () => ({
    meta: [
      { title: "Feeding Plan — NutriHealth" },
      { name: "description", content: "Daily AI-curated baby meal plans, recipes, ingredients and feeding tips for babies 0-3 years, in English and Tamil." },
      { property: "og:title", content: "Feeding Plan — NutriHealth" },
      { property: "og:description", content: "Daily AI-curated baby meal plans, recipes, ingredients and feeding tips for babies 0-3 years, in English and Tamil." },
    ],
  }),
 component: FoodPage });

const filters: (MealSlot | "All" | "Favorites")[] = ["All", "Breakfast", "Lunch", "Snacks", "Dinner", "Favorites"];

function FoodPage() {
  const meals = useMeals((s) => s.meals);
  const favoriteIds = useMeals((s) => s.favoriteIds);
  const toggleFavorite = useMeals((s) => s.toggleFavorite);
  const replaceMeal = useMeals((s) => s.replaceMeal);
  const ageMonths = useApp((s) => s.baby.ageMonths);
  const [q, setQ] = useState("");
  const dq = useDebounced(q, 200);
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [chat, setChat] = useState(false);
  const voice = useVoiceInput((t) => setQ(t));
  const { t, tx } = useT();

  /**
   * Today's plan by default; as soon as the parent searches or opens a filter
   * the whole central recipe database is included, so every recipe added to
   * the database is reachable here without extra code.
   */
  const filtered = useMemo<Meal[]>(() => {
    const planned = new Map(meals.map((m) => [m.id, m]));
    const library = allRecipes
      .filter((r) => !planned.has(r.id))
      .map<Meal>((r) => ({ ...r, time: defaultPlanTimes[r.slot], completed: false, favorite: favoriteIds.includes(r.id) }));
    const pool: Meal[] = dq.trim() || active !== "All" ? [...meals, ...library] : meals;
    const searched = dq.trim() ? (searchRecipes(dq, pool) as Meal[]) : pool;
    return searched.filter((m) =>
      active === "All" ? true : active === "Favorites" ? Boolean(m.favorite) : m.slot === active
    );
  }, [meals, favoriteIds, active, dq]);

  const handleReplace = (m: Meal) => {
    const options = suggestReplacements(m, ageMonths);
    const next = options[Math.floor(Math.random() * options.length)];
    if (!next) return;
    replaceMeal(m.id, next);
    toast.success(`${t("food.swapped")} ${tx(next.name)}`);
  };

  const isPlanned = (id: string) => meals.some((m) => m.id === id);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("food.kicker")}</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{t("food.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("food.subtitle")}</p>
        </div>
        <button onClick={() => setChat(true)} className="inline-flex shrink-0 items-center gap-2 rounded-full gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
          <Sparkles className="h-4 w-4" /> {t("food.aiRec")}
        </button>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("food.search")}
          className="h-14 w-full rounded-full border border-border bg-card pl-14 pr-24 text-sm text-foreground shadow-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label={t("common.clear")} className="absolute right-14 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        {voice.supported && (
          <button
            aria-label={voice.listening ? t("food.voiceSearchStop") : t("food.voiceSearchStart")}
            onClick={() => (voice.listening ? voice.stop() : voice.start())}
            className={cn("absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-white", voice.listening ? "bg-destructive animate-pulse" : "gradient-brand")}
          >
            {voice.listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === f ? "border-transparent bg-primary text-primary-foreground shadow-soft" : "border-border bg-card text-foreground hover:bg-primary-soft"
            )}
          >{t(`filter.${f}`)}</button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((m) => (
            <motion.article
              key={m.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-all hover:shadow-soft"
            >
              <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-0 sm:grid-cols-[180px_minmax(0,1fr)]">
                <div className="relative aspect-square overflow-hidden">
                  <button type="button" onClick={() => setRecipe(m)} aria-label={tx(m.name)} className="absolute inset-0 h-full w-full">
                  {m.image ? (
                    <img src={m.image} alt={m.name} width={360} height={360} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <span className="grid h-full w-full place-items-center gradient-soft text-5xl transition-transform group-hover:scale-105">{m.emoji}</span>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase text-secondary shadow-soft">{t(`filter.${m.slot}`)}</span>
                  </button>
                  <button
                    aria-label={t("food.favoriteAria")}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(m.id); toast(m.favorite ? t("food.removed") : t("food.saved")); }}
                    className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-soft"
                  >
                    <Heart className={cn("h-4 w-4", m.favorite ? "fill-primary text-primary" : "text-muted-foreground")} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold sm:text-lg">{highlight(tx(m.name), dq)}</h3>
                      <p className="text-xs text-muted-foreground">{t("food.mealTimePrep", { time: m.time, mins: m.prepMinutes })}</p>
                    </div>
                    <span className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                      m.completed ? "bg-success-soft text-success" : "bg-primary-soft text-primary"
                    )}>
                      {m.completed ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                      {m.completed ? t("common.completed") : t("common.upcoming")}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{highlight(tx(m.desc), dq)}</p>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { icon: Flame, val: m.calories, unit: "kcal", tone: "bg-warning-soft text-warning" },
                      { icon: Beef, val: m.protein, unit: "g", tone: "bg-destructive-soft text-destructive" },
                      { icon: Droplet, val: m.iron, unit: "mg", tone: "bg-primary-soft text-primary" },
                      { icon: Bone, val: m.calcium, unit: "mg", tone: "bg-secondary-soft text-secondary" },
                    ].map((n, i) => (
                      <div key={i} className={cn("rounded-2xl px-2 py-2 text-center", n.tone)}>
                        <n.icon className="mx-auto h-3.5 w-3.5" />
                        <p className="mt-0.5 text-xs font-bold">{n.val}</p>
                        <p className="text-[9px] font-medium opacity-70">{n.unit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-2">
                    {isPlanned(m.id) && (
                      <button onClick={() => handleReplace(m)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-primary-soft">
                        <RefreshCw className="h-3 w-3" /> {t("food.replace")}
                      </button>
                    )}
                    <button onClick={() => setRecipe(m)} className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                      {t("food.viewRecipe")} →
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <EmptyState emoji="🍽️" title={t("food.noMeals")} desc={t("food.noMealsDesc")} action={
          <button onClick={() => { setQ(""); setActive("All"); }} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{t("food.reset")}</button>
        } />
      )}

      <RecipeModal meal={recipe} onOpenChange={(o) => !o && setRecipe(null)} />
      <AIChat open={chat} onOpenChange={setChat} />
    </div>
  );
}
