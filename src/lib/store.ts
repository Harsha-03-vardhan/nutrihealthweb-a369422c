import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  baby as babyShape,
  mother as motherShape,
  initialAlerts,
  initialNotifications,
  type Meal,
  type GrowthEntry,
  type Vaccine,
  type NotifType,
} from "./mock-data";
import { recipeById, defaultPlanTimes, type Recipe } from "./recipes";
import { ageFromDob } from "./age";
import {
  saveProfile,
  saveBaby,
  addGrowth as addGrowthFn,
  setMilestoneDone,
  setVaccineDone,
  updateMeal,
  setRecipeFavorite,
} from "./nutrihealth.functions";

type Baby = typeof babyShape & { id: string | null };
type Mother = typeof motherShape;
type Milestone = { id: string; title: string; age: string; done: boolean; emoji: string };

/** Shape returned by the `loadUserData` server function. */
export type UserData = {
  profile: Record<string, unknown> | null;
  babies: Record<string, unknown>[];
  activeBabyId: string | null;
  growth: Record<string, unknown>[];
  milestones: Record<string, unknown>[];
  vaccines: Record<string, unknown>[];
  meals: Record<string, unknown>[];
  favorites: string[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const num = (v: unknown, fallback = 0) => (typeof v === "number" ? v : fallback);
const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";

function toBaby(row: Record<string, unknown> | undefined): Baby {
  if (!row) return { ...babyShape, id: null, name: "", dob: "" };
  const dob = str(row.dob);
  const age = ageFromDob(dob);
  return {
    id: str(row.id),
    name: str(row.name),
    ageMonths: age?.months ?? 0,
    ageDays: age?.days ?? 0,
    weight: num(row.weight),
    height: num(row.height),
    headCircumference: num(row.head_circumference),
    bmi: num(row.bmi),
    waterMl: num(row.water_ml),
    status: str(row.status, "Healthy"),
    bornOn: age?.bornOn ?? "",
    dob,
    gender: (str(row.gender, "Female") as Baby["gender"]),
    bloodGroup: str(row.blood_group),
    birthWeight: num(row.birth_weight),
    birthTime: str(row.birth_time),
    allergies: str(row.allergies),
    notes: str(row.notes),
    photo: str(row.photo),
  };
}

function toMother(row: Record<string, unknown> | null): Mother {
  if (!row) return { ...motherShape, name: "", email: "", mobile: "" };
  return {
    name: str(row.name),
    role: str(row.role, "Mother"),
    age: num(row.age),
    mobile: str(row.mobile),
    email: str(row.email),
    relationship: str(row.relationship, "Mother"),
    occupation: str(row.occupation),
    address: str(row.address),
    photo: str(row.photo),
  };
}

function toGrowth(row: Record<string, unknown>): GrowthEntry {
  const d = new Date(str(row.entry_date));
  return {
    id: str(row.id),
    month: MONTHS[d.getMonth()] ?? "",
    year: d.getFullYear(),
    weight: num(row.weight),
    height: num(row.height),
    headCircum: num(row.head_circ),
  };
}

/** A planned meal keeps the recipe payload plus the database row id backing it. */
export type PlannedMeal = Meal & { rowId: string };

function toMeal(row: Record<string, unknown>): PlannedMeal | null {
  const recipe = recipeById(str(row.recipe_id));
  if (!recipe) return null;
  const slot = (str(row.slot) || recipe.slot) as Recipe["slot"];
  return {
    ...recipe,
    slot,
    rowId: str(row.id),
    time: str(row.time) || defaultPlanTimes[slot],
    completed: row.completed === true,
    favorite: row.favorite === true,
    skipped: row.skipped === true,
  };
}

// ---------- App (baby + parent + growth + milestones + alerts + vaccines) ----------
type AppState = {
  hydrated: boolean;
  needsOnboarding: boolean;
  babies: { id: string; name: string }[];
  baby: Baby;
  mother: Mother;
  growth: GrowthEntry[];
  milestones: Milestone[];
  alerts: typeof initialAlerts;
  dismissedAlertIds: string[];
  vaccines: Vaccine[];
  hydrate: (data: UserData) => void;
  reset: () => void;
  updateBaby: (patch: Partial<Baby>) => void;
  updateMother: (patch: Partial<Mother>) => void;
  addGrowth: (entry: { weight: number; height: number; headCircum?: number }) => Promise<void>;
  toggleMilestone: (id: string) => void;
  dismissAlert: (id: string) => void;
  restoreAlert: (id: string) => void;
  restoreAllAlerts: () => void;
  toggleVaccine: (id: string) => void;
};

const emptyApp = {
  hydrated: false,
  needsOnboarding: false,
  babies: [] as { id: string; name: string }[],
  baby: { ...babyShape, id: null, name: "", dob: "" } as Baby,
  mother: { ...motherShape, name: "", email: "", mobile: "" } as Mother,
  growth: [] as GrowthEntry[],
  milestones: [] as Milestone[],
  alerts: initialAlerts,
  dismissedAlertIds: [] as string[],
  vaccines: [] as Vaccine[],
};

/** Maps a UI field patch onto the database column names for `babies`. */
function babyPatchToColumns(patch: Partial<Baby>) {
  const map: Record<string, string> = {
    name: "name",
    dob: "dob",
    gender: "gender",
    bloodGroup: "blood_group",
    birthWeight: "birth_weight",
    birthTime: "birth_time",
    allergies: "allergies",
    notes: "notes",
    photo: "photo",
    weight: "weight",
    height: "height",
    headCircumference: "head_circumference",
    waterMl: "water_ml",
    status: "status",
  };
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (map[k] !== undefined && v !== undefined) out[map[k]] = v;
  }
  return out;
}

export const useApp = create<AppState>()((set, get) => ({
  ...emptyApp,

  hydrate: (data) => {
    const activeRow = data.babies.find((b) => str(b.id) === data.activeBabyId) ?? data.babies[0];
    set({
      hydrated: true,
      needsOnboarding: !data.profile || data.babies.length === 0,
      babies: data.babies.map((b) => ({ id: str(b.id), name: str(b.name) })),
      baby: toBaby(activeRow),
      mother: toMother(data.profile),
      growth: data.growth.map(toGrowth),
      milestones: data.milestones.map((m) => ({
        id: str(m.id),
        title: str(m.title),
        age: str(m.age_label),
        done: m.done === true,
        emoji: str(m.emoji),
      })),
      vaccines: data.vaccines.map((v) => ({
        id: str(v.id),
        name: str(v.name),
        dose: str(v.dose),
        ageLabel: str(v.age_label),
        ageMonths: num(v.age_months),
        dueDate: fmtDate(str(v.due_date)),
        protects: str(v.protects),
        completed: v.completed === true,
        completedDate: v.completed_date ? fmtDate(str(v.completed_date)) : undefined,
      })),
    });
  },

  reset: () => set({ ...emptyApp }),

  updateBaby: (patch) => {
    const id = get().baby.id;
    set((s) => {
      const baby = { ...s.baby, ...patch };
      if (baby.weight && baby.height) {
        const m = baby.height / 100;
        baby.bmi = Number((baby.weight / (m * m)).toFixed(2));
      }
      if (patch.dob) {
        const age = ageFromDob(patch.dob);
        baby.ageMonths = age?.months ?? baby.ageMonths;
        baby.ageDays = age?.days ?? baby.ageDays;
        baby.bornOn = age?.bornOn ?? baby.bornOn;
      }
      return { baby };
    });
    const columns = babyPatchToColumns(patch);
    if (id && Object.keys(columns).length) {
      void saveBaby({ data: { id, patch: columns } }).catch(() => {});
    }
  },

  updateMother: (patch) => {
    set((s) => ({ mother: { ...s.mother, ...patch } }));
    void saveProfile({ data: patch }).catch(() => {});
  },

  addGrowth: async (entry) => {
    const babyId = get().baby.id;
    if (!babyId) return;
    const result = await addGrowthFn({
      data: {
        babyId,
        weight: entry.weight,
        height: entry.height,
        headCirc: entry.headCircum ?? null,
      },
    });
    const row = result.entry as Record<string, unknown>;
    set((s) => ({
      growth: [...s.growth, toGrowth(row)],
      baby: {
        ...s.baby,
        weight: entry.weight,
        height: entry.height,
        headCircumference: entry.headCircum ?? s.baby.headCircumference,
        bmi: result.bmi,
      },
    }));
  },

  toggleMilestone: (id) => {
    const next = !get().milestones.find((m) => m.id === id)?.done;
    set((s) => ({ milestones: s.milestones.map((m) => (m.id === id ? { ...m, done: next } : m)) }));
    void setMilestoneDone({ data: { id, done: next } }).catch(() => {});
  },

  dismissAlert: (id) =>
    set((s) => ({
      dismissedAlertIds: s.dismissedAlertIds.includes(id)
        ? s.dismissedAlertIds
        : [...s.dismissedAlertIds, id],
    })),
  restoreAlert: (id) =>
    set((s) => ({ dismissedAlertIds: s.dismissedAlertIds.filter((a) => a !== id) })),
  restoreAllAlerts: () => set({ alerts: initialAlerts, dismissedAlertIds: [] }),

  toggleVaccine: (id) => {
    const current = get().vaccines.find((v) => v.id === id);
    if (!current) return;
    const completed = !current.completed;
    set((s) => ({
      vaccines: s.vaccines.map((v) =>
        v.id === id
          ? {
              ...v,
              completed,
              completedDate: completed ? fmtDate(new Date().toISOString()) : undefined,
            }
          : v,
      ),
    }));
    void setVaccineDone({ data: { id, completed } }).catch(() => {});
  },
}));

/** Reminder cards currently visible on the dashboard. */
export const visibleAlerts = (s: AppState) =>
  s.alerts.filter((a) => !s.dismissedAlertIds.includes(a.id));

// ---------- Meals ----------
type MealsState = {
  meals: PlannedMeal[];
  /** Recipes favourited from the wider library (not part of today's plan). */
  favoriteIds: string[];
  babyId: string | null;
  hydrate: (data: UserData) => void;
  reset: () => void;
  toggleComplete: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleSkip: (id: string) => void;
  /** Swap a planned meal for another recipe from the central database. */
  replaceMeal: (id: string, recipe: Recipe) => void;
};

export const useMeals = create<MealsState>()((set, get) => ({
  meals: [],
  favoriteIds: [],
  babyId: null,

  hydrate: (data) =>
    set({
      babyId: data.activeBabyId,
      meals: data.meals.map(toMeal).filter((m): m is PlannedMeal => m !== null),
      favoriteIds: data.favorites,
    }),

  reset: () => set({ meals: [], favoriteIds: [], babyId: null }),

  toggleComplete: (id) => {
    const meal = get().meals.find((m) => m.id === id);
    if (!meal) return;
    const completed = !meal.completed;
    set((s) => ({
      meals: s.meals.map((m) => (m.id === id ? { ...m, completed, skipped: false } : m)),
    }));
    void updateMeal({ data: { id: meal.rowId, patch: { completed, skipped: false } } }).catch(() => {});
  },

  toggleSkip: (id) => {
    const meal = get().meals.find((m) => m.id === id);
    if (!meal) return;
    const skipped = !meal.skipped;
    set((s) => ({
      meals: s.meals.map((m) => (m.id === id ? { ...m, skipped, completed: false } : m)),
    }));
    void updateMeal({ data: { id: meal.rowId, patch: { skipped, completed: false } } }).catch(() => {});
  },

  toggleFavorite: (id) => {
    const meal = get().meals.find((m) => m.id === id);
    if (meal) {
      const favorite = !meal.favorite;
      set((s) => ({ meals: s.meals.map((m) => (m.id === id ? { ...m, favorite } : m)) }));
      void updateMeal({ data: { id: meal.rowId, patch: { favorite } } }).catch(() => {});
      return;
    }
    const babyId = get().babyId;
    const favorite = !get().favoriteIds.includes(id);
    set((s) => ({
      favoriteIds: favorite ? [...s.favoriteIds, id] : s.favoriteIds.filter((f) => f !== id),
    }));
    if (babyId) {
      void setRecipeFavorite({ data: { babyId, recipeId: id, favorite } }).catch(() => {});
    }
  },

  replaceMeal: (id, recipe) => {
    const meal = get().meals.find((m) => m.id === id);
    if (!meal) return;
    set((s) => ({
      meals: s.meals.map((m) =>
        m.id === id
          ? {
              ...recipe,
              rowId: m.rowId,
              slot: m.slot,
              time: m.time,
              completed: false,
              favorite: m.favorite,
              skipped: false,
            }
          : m,
      ),
    }));
    void updateMeal({
      data: { id: meal.rowId, patch: { recipe_id: recipe.id, completed: false, skipped: false } },
    }).catch(() => {});
  },
}));

// ---------- Settings (device-local) ----------
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

// ---------- Notifications (device-local) ----------
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

// ---------- AI chat history (device-local) ----------
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

// ---------- Recent searches (device-local) ----------
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
