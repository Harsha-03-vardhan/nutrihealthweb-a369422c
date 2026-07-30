import { useEffect, useState } from "react";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useMeals, useSearches } from "@/lib/store";
import { symptoms } from "@/lib/mock-data";
import { healthGuides } from "@/lib/health-guides";
import { searchRecipes } from "@/lib/recipes";
import { useNavigate } from "@tanstack/react-router";
import { Utensils, Heart, BookOpen, Settings } from "lucide-react";
import { useT } from "@/lib/i18n";

export function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, tx } = useT();
  const meals = useMeals((s) => s.meals);
  const addRecent = useSearches((s) => s.add);
  const recent = useSearches((s) => s.recent);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const recipeHits = searchRecipes(q).slice(0, 8);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (path: string, label: string) => {
    addRecent(label);
    onOpenChange(false);
    navigate({ to: path });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t("search.placeholder")} value={q} onValueChange={setQ} />
      <CommandList>
        <CommandEmpty>{t("search.noResults")}</CommandEmpty>
        {recent.length > 0 && !q && (
          <CommandGroup heading={t("search.recent")}>
            {recent.map((r) => (
              <CommandItem key={r} onSelect={() => setQ(r)}>{r}</CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading={t("search.meals")}>
          {meals.map((m) => (
            <CommandItem key={m.id} onSelect={() => go("/food", tx(m.name))}>
              <Utensils className="mr-2 h-4 w-4" /> {tx(m.name)}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading={t("search.recipes")}>
          {recipeHits.map((r) => (
            <CommandItem key={r.id} onSelect={() => go("/food", tx(r.name))}>
              <Utensils className="mr-2 h-4 w-4" /> {tx(r.name)}
              <span className="ml-auto text-xs text-muted-foreground">{r.ageGroup}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading={t("search.symptoms")}>
          {symptoms.map((s) => (
            <CommandItem key={s.key} onSelect={() => go("/health", tx(s.name))}>
              <Heart className="mr-2 h-4 w-4" /> {tx(s.name)}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading={t("search.guides")}>
          {healthGuides.map((g) => (
            <CommandItem key={g.title} onSelect={() => go("/health", tx(g.title))}>
              <BookOpen className="mr-2 h-4 w-4" /> {tx(g.title)}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading={t("search.settings")}>
          <CommandItem onSelect={() => go("/profile", t("search.openSettings"))}>
            <Settings className="mr-2 h-4 w-4" /> {t("search.openSettings")}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
