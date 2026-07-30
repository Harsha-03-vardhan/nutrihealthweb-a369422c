import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  baby as initialBaby,
  mother as initialMother,
  initialMeals,
  initialGrowthHistory,
  initialMilestones,
  initialAlerts,
  initialNotifications,
  initialVaccines,
  type Meal,
  type GrowthEntry,
  type Vaccine,
  type NotifType,
} from "./mock-data";
import type { Recipe } from "./recipes";

// ---------- App (baby + growth + milestones + alerts + vaccines) ----------
type AppState = {
  baby: typeof initialBaby;
  mother: typeof initialMother;
  growth: GrowthEntry[];
  milestones: typeof initialMilestones;
  alerts: typeof initialAlerts;
  dismissedAlertIds: string[];
  vaccines: Vaccine[];
  updateBaby: (patch: Partial<typeof initialBaby>) => void;
  updateMother: (patch: Partial<typeof initialMother>) => void;
  addGrowth: (entry: Omit<GrowthEntry, "id">) => void;
  toggleMilestone: (id: string) => void;
  dismissAlert: (id: string) => void;
  restoreAlert: (id: string) => void;
  restoreAllAlerts: () => void;
  toggleVaccine: (id: string) => void;
};

const todayLabel = () =>
  new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      baby: initialBaby,
      mother: initialMother,
      growth: initialGrowthHistory,
      milestones: initialMilestones,
      alerts: initialAlerts,
      dismissedAlertIds: [],
      vaccines: initialVaccines,
      updateBaby: (patch) =>
        set((s) => {
          const baby = { ...s.baby, ...patch };
          if (patch.weight != null && baby.height) {
            const m = baby.height / 100;
            baby.bmi = Number((baby.weight / (m * m)).toFixed(2));
          }
          return { baby };
        }),
      updateMother: (patch) => set((s) => ({ mother: { ...s.mother, ...patch } })),
      addGrowth: (entry) =>
        set((s) => {
          const id = `g-${Date.now()}`;
          const growth = [...s.growth, { ...entry, id }];
          const m = entry.height / 100;
          const bmi = Number((entry.weight / (m * m)).toFixed(2));
          return {
            growth,
            baby: {
              ...s.baby,
              weight: entry.weight,
              height: entry.height,
              headCircumference: entry.headCircum,
              bmi,
            },
          };
        }),
      toggleMilestone: (id) =>
        set((s) => ({
          milestones: s.milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m)),
        })),
      dismissAlert: (id) =>
        set((s) => ({
          dismissedAlertIds: s.dismissedAlertIds.includes(id)
            ? s.dismissedAlertIds
            : [...s.dismissedAlertIds, id],
        })),
      restoreAlert: (id) =>
        set((s) => ({ dismissedAlertIds: s.dismissedAlertIds.filter((a) => a !== id) })),
      restoreAllAlerts: () => set({ alerts: initialAlerts, dismissedAlertIds: [] }),
      toggleVaccine: (id) =>
        set((s) => ({
          vaccines: s.vaccines.map((v) =>
            v.id === id
              ? v.completed
                ? { ...v, completed: false, completedDate: undefined }
                : { ...v, completed: true, completedDate: todayLabel() }
              : v
          ),
        })),
    }),
    {
      name: "nutrihealth-app",
      version: 2,
      migrate: (persisted) => {
        const p = (persisted ?? {}) as Partial<AppState>;
        return {
          ...p,
          baby: { ...initialBaby, ...(p.baby ?? {}) },
          mother: { ...initialMother, ...(p.mother ?? {}) },
          // Reminder cards are defaults again; dismissal is now non-destructive.
          alerts: initialAlerts,
          dismissedAlertIds: [],
          vaccines: p.vaccines?.length ? p.vaccines : initialVaccines,
        } as AppState;
      },
    }
  )
);

/** Reminder cards currently visible on the dashboard. */
export const visibleAlerts = (s: AppState) =>
  s.alerts.filter((a) => !s.dismissedAlertIds.includes(a.id));

// ---------- Meals ----------
type MealsState = {
  meals: Meal[];
  /** Recipes favourited from the wider library (not part of today's plan). */
  favoriteIds: string[];
  toggleComplete: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleSkip: (id: string) => void;
  /** Swap a planned meal for another recipe from the central database. */
  replaceMeal: (id: string, recipe: Recipe) => void;
};

export const useMeals = create<MealsState>()(
  persist(
    (set) => ({
      meals: initialMeals,
      favoriteIds: [],
      toggleComplete: (id) =>
        set((s) => ({
          meals: s.meals.map((m) =>
            m.id === id ? { ...m, completed: !m.completed, skipped: false } : m
          ),
        })),
      toggleFavorite: (id) =>
        set((s) =>
          s.meals.some((m) => m.id === id)
            ? { meals: s.meals.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m)) }
            : {
                favoriteIds: s.favoriteIds.includes(id)
                  ? s.favoriteIds.filter((f) => f !== id)
                  : [...s.favoriteIds, id],
              }
        ),
      toggleSkip: (id) =>
        set((s) => ({
          meals: s.meals.map((m) =>
            m.id === id ? { ...m, skipped: !m.skipped, completed: false } : m
          ),
        })),
      replaceMeal: (id, recipe) =>
        set((s) => ({
          meals: s.meals.map((m) =>
            m.id === id
              ? { ...recipe, time: m.time, slot: m.slot, completed: false, favorite: m.favorite, skipped: false }
              : m
          ),
        })),
    }),
    {
      name: "nutrihealth-meals",
      version: 3,
      // The meal plan is now generated from the central recipe database.
      migrate: () => ({ meals: initialMeals, favoriteIds: [] }) as unknown as MealsState,
    }
  )
);

// ---------- Settings ----------
type SettingsState = {
  darkMode: boolean;
  language: "English" | "Tamil";
  notificationsEnabled: boolean;
  mealReminders: boolean;
  vaccineReminders: boolean;
  growthReminders: boolean;
  waterReminders: boolean;
  soundEnabled: boolean;
  biometricLogin: boolean;
  rememberLogin: boolean;
  analytics: boolean;
  rating: number;
  set: <K extends keyof SettingsState>(k: K, v: SettingsState[K]) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: false,
      language: "English",
      notificationsEnabled: true,
      mealReminders: true,
      vaccineReminders: true,
      growthReminders: true,
      waterReminders: true,
      soundEnabled: true,
      biometricLogin: false,
      rememberLogin: true,
      analytics: true,
      rating: 0,
      set: (k, v) => set({ [k]: v } as Partial<SettingsState>),
    }),
    { name: "nutrihealth-settings" }
  )
);

// ---------- Notifications ----------
type Notif = { id: string; title: string; body: string; time: string; read: boolean; type: NotifType };
type NotifState = {
  items: Notif[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clearAll: () => void;
  add: (n: Omit<Notif, "id" | "time" | "read">) => void;
};

export const useNotifs = create<NotifState>()(
  persist(
    (set) => ({
      items: initialNotifications,
      markRead: (id) =>
        set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
      markAllRead: () =>
        set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
      remove: (id) => set((s) => ({ items: s.items.filter((n) => n.id !== id) })),
      clearAll: () => set({ items: [] }),
      add: (n) =>
        set((s) => ({
          items: [
            { id: `n-${Date.now()}`, time: "just now", read: false, ...n },
            ...s.items,
          ],
        })),
    }),
    { name: "nutrihealth-notifs", version: 2 }
  )
);

// ---------- AI chat history ----------
export type ChatMsg = { id: string; role: "user" | "ai"; text: string; at: number };
type ChatState = {
  messages: ChatMsg[];
  push: (m: Omit<ChatMsg, "id" | "at">) => void;
  clear: () => void;
};

export const useChatHistory = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      push: (m) =>
        set((s) => ({
          messages: [...s.messages, { ...m, id: `${m.role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: Date.now() }],
        })),
      clear: () => set({ messages: [] }),
    }),
    { name: "nutrihealth-chat" }
  )
);

// ---------- Recent searches ----------
type SearchState = {
  recent: string[];
  add: (q: string) => void;
  clear: () => void;
};

export const useSearches = create<SearchState>()(
  persist(
    (set) => ({
      recent: [],
      add: (q) =>
        set((s) => ({
          recent: [q, ...s.recent.filter((r) => r !== q)].slice(0, 6),
        })),
      clear: () => set({ recent: [] }),
    }),
    { name: "nutrihealth-searches" }
  )
);
