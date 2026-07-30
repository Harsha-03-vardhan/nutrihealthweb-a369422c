import { defaultPlanRecipes, defaultPlanTimes, type Recipe } from "./recipes";

export type { Recipe, AgeGroup, MealSlot } from "./recipes";

export const baby = {
  name: "Ananya",
  ageMonths: 8,
  ageDays: 24,
  weight: 8.2,
  height: 72,
  headCircumference: 44,
  bmi: 15.81,
  waterMl: 700,
  status: "Healthy",
  bornOn: "25 May 2025",
  dob: "2025-05-25",
  gender: "Female" as "Female" | "Male" | "Other",
  bloodGroup: "O+",
  birthWeight: 3.1,
  birthTime: "06:40",
  allergies: "",
  notes: "",
  photo: "" as string,
};

export const mother = {
  name: "Priya",
  role: "Mother",
  age: 28,
  mobile: "9876543210",
  email: "priya@example.com",
  relationship: "Mother",
  occupation: "",
  address: "",
  photo: "" as string,
};


/** A meal is a recipe from the central database, placed in the daily plan. */
export type Meal = Recipe & {
  time: string;
  completed: boolean;
  favorite?: boolean;
  skipped?: boolean;
};

/** Today's default plan, generated from the central recipe database. */
export const initialMeals: Meal[] = defaultPlanRecipes.map((r) => ({
  ...r,
  time: defaultPlanTimes[r.slot],
  completed: r.slot === "Breakfast" || r.slot === "Lunch",
}));

export const initialGrowthHistory = [
  { id: "g1", month: "Mar", year: 2025, weight: 6.2, height: 64, headCircum: 40 },
  { id: "g2", month: "Apr", year: 2025, weight: 6.8, height: 66, headCircum: 41 },
  { id: "g3", month: "May", year: 2025, weight: 7.1, height: 68, headCircum: 42 },
  { id: "g4", month: "Jun", year: 2025, weight: 7.5, height: 69, headCircum: 42.5 },
  { id: "g5", month: "Jul", year: 2025, weight: 7.8, height: 70, headCircum: 43 },
  { id: "g6", month: "Aug", year: 2025, weight: 8.0, height: 71, headCircum: 43.5 },
  { id: "g7", month: "Sep", year: 2025, weight: 8.2, height: 72, headCircum: 44 },
];

export type GrowthEntry = (typeof initialGrowthHistory)[number];

export const initialMilestones = [
  { id: "ms1", title: "Sits without support", age: "6M", done: true, emoji: "🍼" },
  { id: "ms2", title: "Transfers objects hand to hand", age: "7M", done: true, emoji: "🤲" },
  { id: "ms3", title: "Crawls confidently", age: "8M", done: false, emoji: "🚼" },
  { id: "ms4", title: "Pulls to stand", age: "9M", done: false, emoji: "🧍" },
];

export const initialAlerts = [
  { id: "a1", title: "Vaccination due", desc: "9-month booster is due next week.", tone: "warning" as const, dismissed: false },
  { id: "a2", title: "New meal suggestion", desc: "Try adding steamed apple purée for iron.", tone: "info" as const, dismissed: false },
  { id: "a3", title: "Individual food introduction", desc: "Consider introducing paneer at 9 months.", tone: "info" as const, dismissed: false },
];

export type SymptomKey = "cold" | "fever" | "diarrhea" | "vomiting" | "rashes" | "colic";

export const symptoms: {
  key: SymptomKey;
  name: string;
  emoji: string;
  category: "Home Remedies" | "Doctor" | "Medicine";
  overview: string;
  causes: string[];
  remedies: string[];
  warning: string[];
  doctor: string;
  medicine: string;
  nutrition: string[];
  faqs: { q: string; a: string }[];
}[] = [
  {
    key: "cold",
    name: "Cold & Cough",
    emoji: "🤧",
    category: "Home Remedies",
    overview: "Common colds are viral and usually resolve in 7–10 days.",
    causes: ["Viral infections", "Weather change", "Contact with infected persons"],
    remedies: [
      "Use saline nasal drops and gently suction.",
      "Elevate the head slightly while sleeping.",
      "Keep the baby well hydrated with breast milk / warm fluids.",
    ],
    warning: ["Fever above 38.5°C", "Difficulty breathing", "Poor feeding for >24 hours"],
    doctor: "Consult if symptoms persist beyond 7 days or worsen suddenly.",
    medicine: "Avoid OTC cold medicines for babies under 2 years without pediatric advice.",
    nutrition: ["Warm khichdi", "Vegetable broth", "Extra breast milk", "Steamed apple"],
    faqs: [
      { q: "Can I give honey?", a: "Never for babies under 12 months — risk of botulism." },
      { q: "Should I stop feeding solids?", a: "No, offer soft, warm foods in smaller amounts." },
    ],
  },
  {
    key: "fever",
    name: "Fever",
    emoji: "🌡️",
    category: "Doctor",
    overview: "A rise in body temperature above 38°C. Usually a sign of infection.",
    causes: ["Viral illness", "Bacterial infection", "Post-vaccination reaction"],
    remedies: ["Keep lightly clothed", "Sponge with lukewarm water", "Offer fluids often"],
    warning: ["Fever >39°C in infants <3 months", "Seizures", "Extreme lethargy"],
    doctor: "Any fever in a baby under 3 months needs immediate medical attention.",
    medicine: "Paracetamol drops as prescribed. Dose is weight-based.",
    nutrition: ["Hydration first", "Coconut water (>6m)", "Light dal water"],
    faqs: [
      { q: "How often to check temperature?", a: "Every 3–4 hours or if the baby feels warmer." },
    ],
  },
  {
    key: "diarrhea",
    name: "Diarrhea",
    emoji: "💧",
    category: "Doctor",
    overview: "Loose, watery stools 3+ times a day. Can cause quick dehydration.",
    causes: ["Viral (rotavirus)", "Food intolerance", "Antibiotics"],
    remedies: ["Give ORS in small sips", "Continue breastfeeding", "Avoid sugary drinks"],
    warning: ["Signs of dehydration", "Blood in stool", "High fever"],
    doctor: "Seek help if diarrhea lasts >24 hours in babies under 1 year.",
    medicine: "ORS + Zinc supplementation as prescribed.",
    nutrition: ["BRAT diet: Banana, Rice, Apple, Toast", "Curd rice (>8m)"],
    faqs: [{ q: "Is curd safe?", a: "Yes after 8 months; it helps restore gut flora." }],
  },
  {
    key: "vomiting",
    name: "Vomiting",
    emoji: "🤢",
    category: "Doctor",
    overview: "Forceful throwing up of stomach contents. Often self-limiting.",
    causes: ["Overfeeding", "Gastroenteritis", "Reflux"],
    remedies: ["Small frequent feeds", "Keep upright after feeds", "ORS in sips"],
    warning: ["Projectile vomiting", "Green/yellow vomit", "Signs of dehydration"],
    doctor: "See a pediatrician if vomiting continues >8 hours.",
    medicine: "Anti-emetics only under doctor's guidance.",
    nutrition: ["Clear fluids first", "Bland foods when tolerated"],
    faqs: [{ q: "Difference from spit-up?", a: "Spit-ups are effortless; vomiting is forceful." }],
  },
  {
    key: "rashes",
    name: "Rashes",
    emoji: "🩹",
    category: "Home Remedies",
    overview: "Skin reactions ranging from heat rash to allergy or infection.",
    causes: ["Heat", "New food", "Detergent / fabric", "Viral"],
    remedies: ["Keep skin dry & cool", "Use mild moisturizer", "Loose cotton clothes"],
    warning: ["Blistering", "Fever with rash", "Rapid spread"],
    doctor: "Consult if rash is painful, spreading, or with fever.",
    medicine: "Calamine lotion for itch; consult before steroid creams.",
    nutrition: ["Continue current diet if no new food introduced recently."],
    faqs: [{ q: "Can I bathe daily?", a: "Yes with lukewarm water and mild soap." }],
  },
  {
    key: "colic",
    name: "Colic",
    emoji: "😢",
    category: "Home Remedies",
    overview: "Prolonged, unexplained crying — usually resolves by 4 months.",
    causes: ["Immature gut", "Gas", "Overstimulation"],
    remedies: ["Gentle tummy massage", "Warm compress", "Rhythmic rocking"],
    warning: ["Fever", "Vomiting", "Blood in stool"],
    doctor: "Rule out reflux or CMPA if severe.",
    medicine: "Simethicone drops as needed under advice.",
    nutrition: ["Mother should avoid gassy foods if breastfeeding."],
    faqs: [{ q: "How long does colic last?", a: "Usually peaks at 6 weeks and resolves by 3–4 months." }],
  },
];

// Health guides live in their own central library so every surface shares them.
export { healthGuides, guideDisclaimer, guideById, searchGuides } from "./health-guides";
export type { HealthGuide, GuideCategory } from "./health-guides";

export type NotifType = "meal" | "vaccination" | "growth" | "water" | "doctor" | "ai" | "health";

export const initialNotifications: {
  id: string; title: string; body: string; time: string; read: boolean; type: NotifType;
}[] = [
  { id: "n1", title: "Meal reminder", body: "Snack time coming up at 4:00 PM.", time: "5m ago", read: false, type: "meal" },
  { id: "n2", title: "Vaccination due", body: "9-month booster next Tuesday.", time: "2h ago", read: false, type: "vaccination" },
  { id: "n3", title: "Growth streak!", body: "You've logged growth for 7 months straight.", time: "1d ago", read: true, type: "growth" },
  { id: "n4", title: "Water reminder", body: "Offer 60 ml of water after the afternoon nap.", time: "3h ago", read: false, type: "water" },
  { id: "n5", title: "Doctor appointment", body: "Paediatric review on Friday at 11:00 AM.", time: "1d ago", read: true, type: "doctor" },
  { id: "n6", title: "AI recommendation", body: "Add steamed apple purée this week for extra iron.", time: "2d ago", read: true, type: "ai" },
];

export const suggestedQuestions = [
  "What can I feed my 8-month-old for iron?",
  "Is fever after vaccination normal?",
  "How much water does my baby need?",
  "When should I introduce eggs?",
];

// ---------- Vaccination schedule (India IAP-style, age based) ----------
export type Vaccine = {
  id: string;
  name: string;
  dose: string;
  ageLabel: string;
  ageMonths: number;
  dueDate: string;
  protects: string;
  completed: boolean;
  completedDate?: string;
};

export const initialVaccines: Vaccine[] = [
  { id: "v1", name: "BCG", dose: "Single dose", ageLabel: "At birth", ageMonths: 0, dueDate: "25 May 2025", protects: "Tuberculosis", completed: true, completedDate: "25 May 2025" },
  { id: "v2", name: "Hepatitis B", dose: "Birth dose", ageLabel: "At birth", ageMonths: 0, dueDate: "25 May 2025", protects: "Hepatitis B", completed: true, completedDate: "25 May 2025" },
  { id: "v3", name: "OPV-0", dose: "Zero dose", ageLabel: "At birth", ageMonths: 0, dueDate: "25 May 2025", protects: "Polio", completed: true, completedDate: "25 May 2025" },
  { id: "v4", name: "DTwP / DTaP-1", dose: "1st dose", ageLabel: "6 weeks", ageMonths: 1.5, dueDate: "06 Jul 2025", protects: "Diphtheria, Tetanus, Pertussis", completed: true, completedDate: "07 Jul 2025" },
  { id: "v5", name: "Rotavirus-1", dose: "1st dose", ageLabel: "6 weeks", ageMonths: 1.5, dueDate: "06 Jul 2025", protects: "Rotavirus diarrhoea", completed: true, completedDate: "07 Jul 2025" },
  { id: "v6", name: "PCV-1", dose: "1st dose", ageLabel: "6 weeks", ageMonths: 1.5, dueDate: "06 Jul 2025", protects: "Pneumococcal disease", completed: true, completedDate: "07 Jul 2025" },
  { id: "v7", name: "DTwP / DTaP-2", dose: "2nd dose", ageLabel: "10 weeks", ageMonths: 2.5, dueDate: "03 Aug 2025", protects: "Diphtheria, Tetanus, Pertussis", completed: true, completedDate: "04 Aug 2025" },
  { id: "v8", name: "Rotavirus-2", dose: "2nd dose", ageLabel: "10 weeks", ageMonths: 2.5, dueDate: "03 Aug 2025", protects: "Rotavirus diarrhoea", completed: true, completedDate: "04 Aug 2025" },
  { id: "v9", name: "DTwP / DTaP-3", dose: "3rd dose", ageLabel: "14 weeks", ageMonths: 3.5, dueDate: "31 Aug 2025", protects: "Diphtheria, Tetanus, Pertussis", completed: true, completedDate: "01 Sep 2025" },
  { id: "v10", name: "Rotavirus-3", dose: "3rd dose", ageLabel: "14 weeks", ageMonths: 3.5, dueDate: "31 Aug 2025", protects: "Rotavirus diarrhoea", completed: true, completedDate: "01 Sep 2025" },
  { id: "v11", name: "Typhoid Conjugate", dose: "Single dose", ageLabel: "9 months", ageMonths: 9, dueDate: "25 Feb 2026", protects: "Typhoid fever", completed: false },
  { id: "v12", name: "MMR-1", dose: "1st dose", ageLabel: "9 months", ageMonths: 9, dueDate: "25 Feb 2026", protects: "Measles, Mumps, Rubella", completed: false },
  { id: "v13", name: "Hepatitis A-1", dose: "1st dose", ageLabel: "12 months", ageMonths: 12, dueDate: "25 May 2026", protects: "Hepatitis A", completed: false },
  { id: "v14", name: "Varicella-1", dose: "1st dose", ageLabel: "15 months", ageMonths: 15, dueDate: "25 Aug 2026", protects: "Chickenpox", completed: false },
  { id: "v15", name: "DTwP Booster-1", dose: "Booster", ageLabel: "18 months", ageMonths: 18, dueDate: "25 Nov 2026", protects: "Diphtheria, Tetanus, Pertussis", completed: false },
];

export const initialAiRecommendation = {
  title: "Add iron-rich purée twice this week",
  body: "Ananya's iron intake is slightly below target. Steamed apple purée and ragi porridge together improve absorption.",
};

