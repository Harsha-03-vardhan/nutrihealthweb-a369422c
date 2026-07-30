/**
 * Reference templates used to seed a newly created baby.
 * These are static (shared for every family) — only the seeded rows are per-baby.
 */
import { defaultPlanRecipes, defaultPlanTimes } from "./recipes";

export type MilestoneTemplate = { title: string; ageLabel: string; emoji: string; sort: number };

export const milestoneTemplate: MilestoneTemplate[] = [
  { title: "Sits without support", ageLabel: "6M", emoji: "🍼", sort: 0 },
  { title: "Transfers objects hand to hand", ageLabel: "7M", emoji: "🤲", sort: 1 },
  { title: "Crawls confidently", ageLabel: "8M", emoji: "🚼", sort: 2 },
  { title: "Pulls to stand", ageLabel: "9M", emoji: "🧍", sort: 3 },
  { title: "Stands alone briefly", ageLabel: "11M", emoji: "🧒", sort: 4 },
  { title: "Takes first steps", ageLabel: "12M", emoji: "👣", sort: 5 },
];

export type VaccineTemplate = {
  name: string;
  dose: string;
  ageLabel: string;
  ageMonths: number;
  protects: string;
};

/** India IAP-style schedule, expressed as an offset from the baby's date of birth. */
export const vaccineTemplate: VaccineTemplate[] = [
  { name: "BCG", dose: "Single dose", ageLabel: "At birth", ageMonths: 0, protects: "Tuberculosis" },
  { name: "Hepatitis B", dose: "Birth dose", ageLabel: "At birth", ageMonths: 0, protects: "Hepatitis B" },
  { name: "OPV-0", dose: "Zero dose", ageLabel: "At birth", ageMonths: 0, protects: "Polio" },
  { name: "DTwP / DTaP-1", dose: "1st dose", ageLabel: "6 weeks", ageMonths: 1.5, protects: "Diphtheria, Tetanus, Pertussis" },
  { name: "Rotavirus-1", dose: "1st dose", ageLabel: "6 weeks", ageMonths: 1.5, protects: "Rotavirus diarrhoea" },
  { name: "PCV-1", dose: "1st dose", ageLabel: "6 weeks", ageMonths: 1.5, protects: "Pneumococcal disease" },
  { name: "DTwP / DTaP-2", dose: "2nd dose", ageLabel: "10 weeks", ageMonths: 2.5, protects: "Diphtheria, Tetanus, Pertussis" },
  { name: "Rotavirus-2", dose: "2nd dose", ageLabel: "10 weeks", ageMonths: 2.5, protects: "Rotavirus diarrhoea" },
  { name: "PCV-2", dose: "2nd dose", ageLabel: "10 weeks", ageMonths: 2.5, protects: "Pneumococcal disease" },
  { name: "DTwP / DTaP-3", dose: "3rd dose", ageLabel: "14 weeks", ageMonths: 3.5, protects: "Diphtheria, Tetanus, Pertussis" },
  { name: "Rotavirus-3", dose: "3rd dose", ageLabel: "14 weeks", ageMonths: 3.5, protects: "Rotavirus diarrhoea" },
  { name: "PCV-3", dose: "3rd dose", ageLabel: "14 weeks", ageMonths: 3.5, protects: "Pneumococcal disease" },
  { name: "Influenza-1", dose: "1st dose", ageLabel: "6 months", ageMonths: 6, protects: "Seasonal influenza" },
  { name: "Typhoid Conjugate", dose: "Single dose", ageLabel: "9 months", ageMonths: 9, protects: "Typhoid fever" },
  { name: "MMR-1", dose: "1st dose", ageLabel: "9 months", ageMonths: 9, protects: "Measles, Mumps, Rubella" },
  { name: "Hepatitis A-1", dose: "1st dose", ageLabel: "12 months", ageMonths: 12, protects: "Hepatitis A" },
  { name: "MMR-2", dose: "2nd dose", ageLabel: "15 months", ageMonths: 15, protects: "Measles, Mumps, Rubella" },
  { name: "Varicella-1", dose: "1st dose", ageLabel: "15 months", ageMonths: 15, protects: "Chickenpox" },
  { name: "DTwP Booster-1", dose: "Booster", ageLabel: "18 months", ageMonths: 18, protects: "Diphtheria, Tetanus, Pertussis" },
  { name: "Hepatitis A-2", dose: "2nd dose", ageLabel: "18 months", ageMonths: 18, protects: "Hepatitis A" },
];

/** Adds a fractional number of months to a yyyy-mm-dd date, returning yyyy-mm-dd. */
export function dueDateFromDob(dob: string, ageMonths: number): string {
  const d = new Date(dob);
  const whole = Math.floor(ageMonths);
  const fraction = ageMonths - whole;
  d.setMonth(d.getMonth() + whole);
  if (fraction > 0) d.setDate(d.getDate() + Math.round(fraction * 30));
  return d.toISOString().slice(0, 10);
}

/** The starter day plan for a new baby, as recipe ids + slots. */
export const defaultMealPlan = defaultPlanRecipes.map((r) => ({
  recipe_id: r.id,
  slot: r.slot,
  time: defaultPlanTimes[r.slot],
}));
