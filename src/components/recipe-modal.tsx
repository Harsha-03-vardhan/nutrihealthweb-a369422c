import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, Users, Baby, AlertTriangle, Heart, Flame, Beef, Droplet, Bone } from "lucide-react";
import type { Meal } from "@/lib/mock-data";
import { useMeals } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function RecipeModal({ meal, onOpenChange }: { meal: Meal | null; onOpenChange: (o: boolean) => void }) {
  const toggleComplete = useMeals((s) => s.toggleComplete);
  const toggleFavorite = useMeals((s) => s.toggleFavorite);
  const { t, tx } = useT();
  if (!meal) return null;
  return (
    <Dialog open={!!meal} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl">
        <div className="overflow-hidden rounded-2xl">
          {meal.image ? (
            <img src={meal.image} alt={meal.name} width={640} height={640} loading="lazy" className="h-52 w-full object-cover" />
          ) : (
            <div className="grid h-52 w-full place-items-center gradient-soft text-7xl">{meal.emoji}</div>
          )}
        </div>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-primary-soft text-primary hover:bg-primary-soft">{t(`filter.${meal.slot}`)}</Badge>
            <Badge variant="outline" className="rounded-full">{tx(meal.ageSuitable)}</Badge>
            {meal.vegetarian && <Badge className="rounded-full bg-success-soft text-success hover:bg-success-soft">{t("recipe.veg")}</Badge>}
          </div>
          <DialogTitle className="text-xl">{tx(meal.name)}</DialogTitle>
          <DialogDescription>{tx(meal.desc)}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { icon: Flame, val: meal.calories, unit: t("recipe.kcal"), tone: "bg-warning-soft text-warning" },
            { icon: Beef, val: meal.protein, unit: t("recipe.gProtein"), tone: "bg-destructive-soft text-destructive" },
            { icon: Droplet, val: meal.iron, unit: t("recipe.mgIron"), tone: "bg-primary-soft text-primary" },
            { icon: Bone, val: meal.calcium, unit: t("recipe.mgCalc"), tone: "bg-secondary-soft text-secondary" },
          ].map((n, i) => (
            <div key={i} className={cn("rounded-2xl p-2", n.tone)}>
              <n.icon className="mx-auto h-4 w-4" />
              <p className="mt-1 font-bold">{n.val}</p>
              <p className="text-[10px] opacity-70">{n.unit}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-2 text-xs sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-2xl bg-muted p-3"><Clock className="h-4 w-4 text-primary" /> {t("recipe.minPrep", { n: meal.prepMinutes })}</div>
          <div className="flex items-center gap-2 rounded-2xl bg-muted p-3"><Users className="h-4 w-4 text-secondary" /> {tx(meal.serving)}</div>
          <div className="flex items-center gap-2 rounded-2xl bg-muted p-3"><Baby className="h-4 w-4 text-success" /> {tx(meal.ageGroup)}</div>
        </div>

        <div className="grid gap-2 text-xs sm:grid-cols-2">
          <div className="rounded-2xl bg-muted p-3">
            <p className="font-semibold">{t("recipe.texture")}</p>
            <p className="mt-0.5 text-muted-foreground">{tx(meal.texture)}</p>
          </div>
          <div className="rounded-2xl bg-muted p-3">
            <p className="font-semibold">{t("recipe.storage")}</p>
            <p className="mt-0.5 text-muted-foreground">{tx(meal.storage)}</p>
          </div>
        </div>

        <Separator />
        <div>
          <h4 className="mb-2 font-semibold">{t("recipe.ingredients")}</h4>
          <ul className="grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
            {meal.ingredients.map((i) => (
              <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {tx(i)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">{t("recipe.preparation")}</h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            {meal.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">{i + 1}</span>
                <span>{tx(s)}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl bg-secondary-soft/60 p-3 text-xs text-secondary-foreground">
          <p className="font-semibold text-secondary">{t("recipe.tip")}</p>
          <p className="mt-1 text-muted-foreground">{tx(meal.tips)}</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">{t("recipe.benefits")}</h4>
          <ul className="grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
            {meal.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" /> {tx(b)}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-start gap-2 rounded-2xl bg-warning-soft/60 p-3 text-xs">
          <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
          <p className="text-muted-foreground"><span className="font-semibold text-warning">{t("recipe.allergy")}:</span> {tx(meal.allergyWarning)}</p>
        </div>
        {meal.avoid && (
          <div className="flex items-start gap-2 rounded-2xl bg-destructive-soft/60 p-3 text-xs">
            <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
            <p className="text-muted-foreground"><span className="font-semibold text-destructive">{t("recipe.avoid")}:</span> {tx(meal.avoid)}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            onClick={() => {
              toggleComplete(meal.id);
              toast.success(meal.completed ? t("recipe.upcoming") : t("recipe.completed"));
            }}
            className="rounded-full"
          >
            <CheckCircle2 className="mr-1.5 h-4 w-4" /> {meal.completed ? t("recipe.undo") : t("recipe.markDone")}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toggleFavorite(meal.id);
              toast(meal.favorite ? t("food.removed") : t("food.saved"));
            }}
            className="rounded-full"
          >
            <Heart className={cn("mr-1.5 h-4 w-4", meal.favorite && "fill-primary text-primary")} /> {meal.favorite ? t("recipe.favourited") : t("recipe.favourite")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
