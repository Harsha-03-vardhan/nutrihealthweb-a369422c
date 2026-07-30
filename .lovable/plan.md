# NutriHealth — Static UI → Interactive App

Scope is huge. I'll keep the existing design/colors/typography/layout **exactly as-is** and only add behavior, state, modals, and real functionality. Frontend-only using React state + localStorage persistence (no backend). Delivered in phases so you can review as we go.

## Foundation (Phase 0)

- **Global store**: lightweight Zustand stores persisted to `localStorage`
  - `useBabyStore` — baby profile, growth history, milestones
  - `useMealsStore` — meals, completion/skip/favorite, replacements
  - `useHealthStore` — symptoms log, concerns, emergency contacts
  - `useProfileStore` — mother/caregiver info, saved recipes, feeding log
  - `useSettingsStore` — theme, language, notification toggles, biometric, sound
  - `useNotificationsStore` — notifications feed, read/unread
- **Primitives** (shadcn already available): Dialog, Sheet, DropdownMenu, Switch, Checkbox, Toast (sonner), Command (for search), Form + zod validation, Skeleton
- **Reusable pieces**: `EmptyState`, `LoadingSkeleton`, `ConfirmDialog`, `SearchInput` (debounced + clear + highlight), `VoiceInput` (Web Speech API), `NotificationCenter` (Sheet), `UserMenu` (Dropdown), `AIChat` drawer
- Route transitions already via Framer Motion — keep. Add scroll restoration per route.

## Phase 1 — Shell (AppLayout)

- Sidebar: active highlight ✓ (keep). Add keyboard nav + ARIA.
- Header search → global Command palette (⌘K) that searches meals, symptoms, guides, settings.
- Bell → NotificationCenter Sheet (list, mark read, mark all, delete, filter, timestamps).
- Baby switcher → Dropdown (switch baby, add baby).
- User avatar → UserMenu (Profile, Settings, Switch Baby, Logout w/ confirm).

## Phase 2 — Dashboard

- Today's meals: click → recipe modal; mark Completed/Skipped/Favorite/Replace → updates progress ring + timeline live.
- Growth snapshot pulls from store; updates when growth logged.
- Dismissible alerts (persisted).
- Quick actions wired to routes/modals.

## Phase 3 — Food

- Replace emoji illustrations with **real photographs** for the seeded meals (Ragi porridge, Rice+Dal+Carrot poriyal, Mashed banana, Idly+sambar, plus a few more). Generated via imagegen (fast tier, jpg, rounded via CSS), lazy-loaded with skeletons.
- Filters (All/Breakfast/Lunch/Snacks/Dinner) — functional (already partial).
- Search: debounced, clear button, highlight matches, "No results" empty state, recent searches (localStorage).
- Voice search: Web Speech API (with graceful fallback).
- Each meal card: View Recipe modal (ingredients, steps, prep time, serving, feeding tips, allergy, age suitability), Replace Meal dialog (shows AI-picked alternatives), Complete/Favorite toggles.
- AI Recommendation modal: filter form (age, weight, allergies, vegetarian, season, condition) → returns filtered meal list.

## Phase 4 — Growth

- Update Growth modal: weight/height/head circumference form (zod). BMI auto-calc. Appends to history, chart + table update live.
- Milestones: check/uncheck/pending with animated tick.
- Metric filter (Weight/Height/Head Circumference) drives chart.
- History table: sort, search, paginate.

## Phase 5 — Health

- Symptom cards → dedicated symptom detail routes (`/health/$symptom`) with overview, causes, remedies, warning signs, doctor guidance, meds, nutrition, FAQ accordion. Seeded content for cold, fever, vomiting, rashes, diarrhea, colic.
- Symptom search (debounced, highlight).
- Filters (All/Doctor/Home Remedies/Medicine).
- Recent concerns expandable; can add new concern.
- Emergency button → confirm dialog with contact info + tel: link.
- AI Assistant button → chat drawer (suggested prompts, mock replies with typing indicator, clear history, voice input).

## Phase 6 — Profile

- Every row opens an editable Sheet/Dialog:
  - Personal Info, Caregiver, Baby Profile — forms with zod validation, save/cancel, success toast.
  - App Settings — working toggles (dark mode, language, notifications, sound, biometric, remember login) persisted.
  - Privacy — permission toggles.
  - Saved Recipes / Feeding Log / Growth / Health History — real filtered/searchable lists from stores.
  - Help & FAQs — expandable accordion.
  - Contact Us — form with validation + success state.
  - Rate NutriHealth — interactive 5-star rating.
  - Logout — confirm dialog.

## Phase 7 — Polish

- Loading skeletons on all lists.
- Empty states with illustrations everywhere.
- Toasts for every mutation.
- Hover states audited (cursor, elevation, scale).
- Keyboard nav + ARIA labels + focus rings.
- Responsive audit at mobile/tablet/desktop.
- Lazy-load images, memoize heavy components.

## Technical notes

- Add deps: `zustand`. Everything else (framer-motion, sonner, shadcn primitives, recharts, react-hook-form, zod) already in project.
- **Dark mode** toggle will only apply if you want me to wire a `.dark` class variant into `styles.css` — say the word and I'll add it without touching light-mode colors.
- Voice input uses browser Web Speech API — works in Chrome/Edge, falls back to a disabled mic on unsupported browsers.
- AI chat + AI recommendations will be **client-side mock logic** (deterministic filters + canned replies) unless you want me to wire Lovable AI Gateway (needs Lovable Cloud enabled). Say "use real AI" and I'll swap in `openai/gpt-5.6-terra` via a server function.
- Real food photos: ~6–8 generated images stored under `src/assets/food/`.

## Delivery

I'll ship Phase 0 + 1 + 2 first (foundation, shell interactivity, dashboard), then continue through 3→7. Confirm and I'll start, or tell me to (a) start immediately without confirmation, (b) enable real AI, (c) add dark mode.
