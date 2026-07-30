# NutriHealth — Backend, Login & Per-User Data

Turn the single-browser localStorage demo into a real multi-user app. Parents sign in; their babies, growth, milestones, meals and feeding log live in the database and sync across devices. Recipe library, health guides, settings, notifications and chat stay as-is (reference data or device-local).

## 1. Auth configuration (managed)
- Sign-in methods: **email & password** + **Google**. No Apple sign-in.
- Enable the Google provider via `supabase--configure_social_auth`, keeping email enabled.
- Keep email confirmation **on** (default) — no auto-confirm unless you ask. Sign-up shows a "check your email" state.

## 2. Database schema (one migration, all tables user-scoped, RLS by `auth.uid()`)
Every table follows the 4-step contract: CREATE → GRANT (authenticated + service_role, no anon) → ENABLE RLS → POLICY.

```
profiles            id uuid PK = auth.users.id, name, role, relationship, age, mobile,
                    email, occupation, address, photo, active_baby_id,
                    created_at, updated_at
babies              id, user_id→profiles, name, dob date, gender, blood_group,
                    birth_weight, birth_time, allergies, notes, photo,
                    weight, height, head_circumference, bmi, water_ml, status,
                    created_at, updated_at
growth_entries      id, baby_id→babies, entry_date date, weight, height,
                    head_circ, bmi, created_at
milestones          id, baby_id→babies, title, age_label, emoji, done bool,
                    sort int, created_at, updated_at
vaccines            id, baby_id→babies, name, dose, age_label, age_months,
                    due_date, protects, completed bool, completed_date
meals               id, baby_id→babies, recipe_id text, slot, time, scheduled_date date,
                    completed, favorite, skipped, created_at
favorite_recipes    baby_id→babies, recipe_id text (UNIQUE pair) — recipes
                    favourited from the library outside the day plan
```
- `update_updated_at` trigger reused across profiles/babies/milestones.
- `profiles` policies scope to `id = auth.uid()`; `babies` to `user_id = auth.uid()`.
- Baby-child tables (growth, milestones, vaccines, meals, favorites) use one stable security-definer helper `has_baby_access(_baby_id, _user_id)` reused on every policy, avoiding recursive policy lookups.
- Reference data (recipes, health guides, vaccine schedule template, milestone template) stays as static TS in `src/lib/` — not in the DB.

## 3. Routes & auth gate
- Create `src/routes/_authenticated/route.tsx` (`ssr:false`, `beforeLoad` calls `supabase.auth.getUser()`, redirects to `/auth` if none). Its component renders `<AppLayout><Outlet/></AppLayout>`.
- Move the 5 app pages under `_authenticated/`:
  - `src/routes/index.tsx` → `src/routes/_authenticated/index.tsx` (dashboard = `/`)
  - `food.tsx`, `growth.tsx`, `health.tsx`, `profile.tsx` → `src/routes/_authenticated/...`
  - Delete the top-level `index.tsx` in the **same** step to avoid the duplicate-`/` build error.
- `__root.tsx`: remove `<AppLayout>` from `RootComponent` (it now lives in the gated layout). Keep `QueryClientProvider`, `ThemeSync`, `Toaster`, shell. Add one root `supabase.auth.onAuthStateChange` subscriber that calls `router.invalidate()` on SIGNED_IN / SIGNED_OUT / USER_UPDATED, and `queryClient.invalidateQueries()` except on SIGNED_OUT.
- New public `src/routes/auth.tsx` = `/auth`: sign-in + sign-up card (email/password and "Continue with Google"), forgot-password link, redirects to `/` when already signed in. No AppLayout.
- New public `src/routes/reset-password.tsx` = `/reset-password`: reads `type=recovery`, sets a new password.
- Sign-out hygiene: cancel queries → clear query cache → `supabase.auth.signOut()` → `navigate({ to:'/auth', replace:true })`.

## 4. Onboarding & seeding
- After sign-up confirmation / first Google sign-in the user has no profile or baby. The gated area detects this and shows a lightweight onboarding step: create parent profile + first baby.
- On baby creation, seed per-baby rows from the static templates: default milestones, the IAP vaccine schedule (due dates recomputed from DOB), and the default day-plan meals (mapped to recipe_ids) — all inside one atomic `onboardBaby` server function.

## 5. Server functions (thin wrappers in `src/lib/*.functions.ts`)
All use `requireSupabaseAuth`; `client.server` is loaded inside handlers only.
- `loadUserData()` — profile, active_baby_id, babies[], growth[], milestones[], vaccines[], meals[], favorites[] in one call.
- `saveProfile`, `saveBaby`, `addBaby`, `setActiveBaby`.
- `addGrowth(entry)` — inserts and recomputes the baby's current weight/height/head/bmi.
- `toggleMilestone(id)`, `toggleVaccine(id)`.
- Meal actions: `toggleMealComplete`, `toggleMealSkip`, `toggleFavorite`, `replaceMeal`, `addFeedingLog`.
- `onboardBaby(profile, baby)`.

## 6. Store wiring
- Keep the Zustand stores as the in-memory UI cache, but drop `persist` on the data stores (`useApp`, `useMeals`) — they hydrate from `loadUserData()` after auth instead of localStorage. Settings/notifications/chat/searches keep `persist` (device-local).
- Add a `hydrate()` action loading server data into the stores on sign-in / dashboard mount; mutations call the matching server fn then update local state (optimistic + reconcile).
- Empty states: a new parent with no baby sees the onboarding prompt instead of the demo baby.

## 7. Head metadata & polish
- Each moved route keeps its existing `head()` (title/description/og). `/auth` and `/reset-password` get their own.
- The header avatar reflects the signed-in account; a real sign-out replaces the static profile link.

## Build order
1. Auth config (email + Google) + the database migration.
2. Route restructure: `_authenticated` gate, move pages, `/auth`, `/reset-password`, root `onAuthStateChange`.
3. Server functions + store hydration + onboarding.
4. Wire each page's mutations to server fns (dashboard, food, growth, profile).
5. Verify the build and the sign-up / sign-in / sign-out flow end-to-end in the preview.

## What stays local
- Settings, notifications, chat history, recent searches → still `localStorage` (device preferences).
- Recipe library, health guides, vaccine/milestone templates → still static code (shared reference data).
- Real AI remains a separate, optional follow-up; not part of this change.