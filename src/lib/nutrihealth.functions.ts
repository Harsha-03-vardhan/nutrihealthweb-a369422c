import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { milestoneTemplate, vaccineTemplate, dueDateFromDob, defaultMealPlan } from "./seed-templates";

/* ---------------------------------- read ---------------------------------- */

export const loadUserData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    const { data: babies } = await supabase
      .from("babies")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    const babyList = babies ?? [];
    const activeBabyId =
      (profile?.active_baby_id && babyList.some((b) => b.id === profile.active_baby_id)
        ? profile.active_baby_id
        : babyList[0]?.id) ?? null;

    if (!activeBabyId) {
      return {
        profile: profile ?? null,
        babies: babyList,
        activeBabyId: null,
        growth: [],
        milestones: [],
        vaccines: [],
        meals: [],
        favorites: [] as string[],
      };
    }

    const [growth, milestones, vaccines, meals, favorites] = await Promise.all([
      supabase.from("growth_entries").select("*").eq("baby_id", activeBabyId).order("entry_date"),
      supabase.from("milestones").select("*").eq("baby_id", activeBabyId).order("sort"),
      supabase.from("vaccines").select("*").eq("baby_id", activeBabyId).order("sort"),
      supabase.from("meals").select("*").eq("baby_id", activeBabyId).order("created_at"),
      supabase.from("favorite_recipes").select("recipe_id").eq("baby_id", activeBabyId),
    ]);

    return {
      profile: profile ?? null,
      babies: babyList,
      activeBabyId,
      growth: growth.data ?? [],
      milestones: milestones.data ?? [],
      vaccines: vaccines.data ?? [],
      meals: meals.data ?? [],
      favorites: (favorites.data ?? []).map((f) => f.recipe_id),
    };
  });

/* -------------------------------- onboarding ------------------------------- */

const onboardSchema = z.object({
  parentName: z.string().min(1).max(80),
  relationship: z.string().min(1).max(40),
  mobile: z.string().max(20).optional().default(""),
  babyName: z.string().min(1).max(80),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(["Female", "Male", "Other"]),
  weight: z.number().positive().max(60).optional(),
  height: z.number().positive().max(200).optional(),
});

export const onboard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => onboardSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: userId,
        name: data.parentName,
        role: data.relationship,
        relationship: data.relationship,
        mobile: data.mobile ?? "",
        email: (claims as { email?: string })?.email ?? "",
      },
      { onConflict: "id" },
    );
    if (profileError) throw new Error(profileError.message);

    const bmi =
      data.weight && data.height
        ? Number((data.weight / Math.pow(data.height / 100, 2)).toFixed(2))
        : null;

    const { data: baby, error: babyError } = await supabase
      .from("babies")
      .insert({
        user_id: userId,
        name: data.babyName,
        dob: data.dob,
        gender: data.gender,
        weight: data.weight ?? null,
        height: data.height ?? null,
        bmi,
      })
      .select()
      .single();
    if (babyError || !baby) throw new Error(babyError?.message ?? "Could not create baby");

    await Promise.all([
      supabase
        .from("milestones")
        .insert(
          milestoneTemplate.map((m) => ({
            baby_id: baby.id,
            title: m.title,
            age_label: m.ageLabel,
            emoji: m.emoji,
            sort: m.sort,
          })),
        ),
      supabase.from("vaccines").insert(
        vaccineTemplate.map((v, i) => ({
          baby_id: baby.id,
          name: v.name,
          dose: v.dose,
          age_label: v.ageLabel,
          age_months: v.ageMonths,
          due_date: dueDateFromDob(data.dob, v.ageMonths),
          protects: v.protects,
          sort: i,
        })),
      ),
      supabase
        .from("meals")
        .insert(defaultMealPlan.map((m) => ({ baby_id: baby.id, ...m }))),
      data.weight && data.height
        ? supabase.from("growth_entries").insert({
            baby_id: baby.id,
            weight: data.weight,
            height: data.height,
            bmi,
          })
        : Promise.resolve(),
    ]);

    await supabase.from("profiles").update({ active_baby_id: baby.id }).eq("id", userId);

    return { babyId: baby.id };
  });

/* --------------------------------- profile --------------------------------- */

const profileSchema = z.object({
  name: z.string().max(80).optional(),
  role: z.string().max(40).optional(),
  relationship: z.string().max(40).optional(),
  age: z.number().int().min(0).max(120).nullable().optional(),
  mobile: z.string().max(20).optional(),
  email: z.string().max(120).optional(),
  occupation: z.string().max(80).optional(),
  address: z.string().max(300).optional(),
  photo: z.string().max(2_000_000).optional(),
});

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => profileSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update(data)
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------------------------------- baby ----------------------------------- */

const babySchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    name: z.string().max(80).optional(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    gender: z.string().max(20).optional(),
    blood_group: z.string().max(10).optional(),
    birth_weight: z.number().nullable().optional(),
    birth_time: z.string().max(20).optional(),
    allergies: z.string().max(500).optional(),
    notes: z.string().max(2000).optional(),
    photo: z.string().max(2_000_000).optional(),
    weight: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    head_circumference: z.number().nullable().optional(),
    bmi: z.number().nullable().optional(),
    water_ml: z.number().int().min(0).max(5000).optional(),
    status: z.string().max(40).optional(),
  }),
});

export const saveBaby = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => babySchema.parse(input))
  .handler(async ({ data, context }) => {
    const patch = { ...data.patch };
    if (patch.weight != null && patch.height != null) {
      patch.bmi = Number((patch.weight / Math.pow(patch.height / 100, 2)).toFixed(2));
    }
    const { error } = await context.supabase
      .from("babies")
      .update(patch)
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setActiveBaby = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ babyId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ active_baby_id: data.babyId })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* --------------------------------- growth ---------------------------------- */

const growthSchema = z.object({
  babyId: z.string().uuid(),
  weight: z.number().positive().max(60),
  height: z.number().positive().max(200),
  headCirc: z.number().positive().max(80).nullable().optional(),
  entryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const addGrowth = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => growthSchema.parse(input))
  .handler(async ({ data, context }) => {
    const bmi = Number((data.weight / Math.pow(data.height / 100, 2)).toFixed(2));

    const { data: entry, error } = await context.supabase
      .from("growth_entries")
      .insert({
        baby_id: data.babyId,
        weight: data.weight,
        height: data.height,
        head_circ: data.headCirc ?? null,
        bmi,
        ...(data.entryDate ? { entry_date: data.entryDate } : {}),
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    await context.supabase
      .from("babies")
      .update({
        weight: data.weight,
        height: data.height,
        head_circumference: data.headCirc ?? null,
        bmi,
      })
      .eq("id", data.babyId)
      .eq("user_id", context.userId);

    return { entry, bmi };
  });

/* ------------------------- milestones and vaccines ------------------------- */

export const setMilestoneDone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), done: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("milestones")
      .update({ done: data.done })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setVaccineDone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), completed: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("vaccines")
      .update({
        completed: data.completed,
        completed_date: data.completed ? new Date().toISOString().slice(0, 10) : null,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------------------------------- meals ---------------------------------- */

export const updateMeal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        patch: z.object({
          completed: z.boolean().optional(),
          skipped: z.boolean().optional(),
          favorite: z.boolean().optional(),
          recipe_id: z.string().max(80).optional(),
        }),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("meals").update(data.patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setRecipeFavorite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        babyId: z.string().uuid(),
        recipeId: z.string().min(1).max(80),
        favorite: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    if (data.favorite) {
      const { error } = await context.supabase
        .from("favorite_recipes")
        .upsert(
          { baby_id: data.babyId, recipe_id: data.recipeId },
          { onConflict: "baby_id,recipe_id" },
        );
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase
        .from("favorite_recipes")
        .delete()
        .eq("baby_id", data.babyId)
        .eq("recipe_id", data.recipeId);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });
