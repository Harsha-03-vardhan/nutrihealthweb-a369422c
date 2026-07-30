import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  User, Baby, Heart, Settings2, Bell, Shield, BookMarked, Utensils, TrendingUp,
  Stethoscope, HelpCircle, MessageCircle, Star, LogOut, ChevronRight, Moon, Sun,
  Volume2, Fingerprint, BarChart3, Languages,
} from "lucide-react";
import { useApp, useMeals, useSettings } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { toast } from "sonner";
import { CaregiverForm, BabyForm } from "@/components/profile-forms";
import { ageFromDob } from "@/lib/age";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your Account — NutriHealth" },
      { name: "description", content: "Manage the caregiver and baby profile, language, notifications and privacy settings for NutriHealth." },
      { property: "og:title", content: "Your Account — NutriHealth" },
      { property: "og:description", content: "Manage the caregiver and baby profile, language, notifications and privacy settings for NutriHealth." },
    ],
  }),
 component: ProfilePage });

type Row = { key: string; icon: any; titleKey: string; descKey: string; tone: string };

const account: Row[] = [
  { key: "personal", icon: User, titleKey: "profile.personal", descKey: "profile.personalDesc", tone: "bg-primary-soft text-primary" },
  { key: "caregiver", icon: Heart, titleKey: "profile.caregiver", descKey: "profile.caregiverDesc", tone: "bg-secondary-soft text-secondary" },
  { key: "baby", icon: Baby, titleKey: "profile.baby", descKey: "profile.babyDesc", tone: "bg-warning-soft text-warning" },
  { key: "settings", icon: Settings2, titleKey: "profile.appSettings", descKey: "profile.appSettingsDesc", tone: "bg-success-soft text-success" },
  { key: "privacy", icon: Shield, titleKey: "profile.privacy", descKey: "profile.privacyDesc", tone: "bg-destructive-soft text-destructive" },
];

const activity: Row[] = [
  { key: "saved", icon: BookMarked, titleKey: "profile.savedRecipes", descKey: "profile.savedRecipesDesc", tone: "bg-primary-soft text-primary" },
  { key: "feeding", icon: Utensils, titleKey: "profile.feedingLog", descKey: "profile.feedingLogDesc", tone: "bg-secondary-soft text-secondary" },
  { key: "growthh", icon: TrendingUp, titleKey: "profile.growthHistory", descKey: "profile.growthHistoryDesc", tone: "bg-success-soft text-success" },
  { key: "healthh", icon: Stethoscope, titleKey: "profile.healthHistory", descKey: "profile.healthHistoryDesc", tone: "bg-warning-soft text-warning" },
];

const support: Row[] = [
  { key: "help", icon: HelpCircle, titleKey: "profile.help", descKey: "profile.helpDesc", tone: "bg-primary-soft text-primary" },
  { key: "contact", icon: MessageCircle, titleKey: "profile.contact", descKey: "profile.contactDesc", tone: "bg-secondary-soft text-secondary" },
  { key: "rate", icon: Star, titleKey: "profile.rate", descKey: "profile.rateDesc", tone: "bg-warning-soft text-warning" },
];

function ProfilePage() {
  const { t, tx } = useT();
  const baby = useApp((s) => s.baby);
  const mother = useApp((s) => s.mother);
  const babyAge = ageFromDob(baby.dob);
  const settings = useSettings();
  const [active, setActive] = useState<string | null>(null);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const resetApp = useApp((s) => s.reset);
  const resetMeals = useMeals((s) => s.reset);

  const handleSignOut = async () => {
    setLogout(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    resetApp();
    resetMeals();
    await supabase.auth.signOut();
    toast(t("profile.loggedOut"));
    navigate({ to: "/auth", replace: true });
  };

  const close = () => setActive(null);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("profile.kicker")}</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{t("profile.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("profile.subtitle")}</p>
        </div>
        <button onClick={() => setActive("settings")} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-primary-soft">
          <Bell className="h-4 w-4" /> {t("nav.notifications")}
        </button>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl gradient-soft p-6 shadow-card">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-3xl bg-white text-3xl shadow-soft">
              {mother.photo ? <img src={mother.photo} alt={mother.name} className="h-full w-full object-cover" /> : "👩"}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{tx(mother.relationship) || t("profile.mother")}</p>
              <h3 className="truncate text-xl font-bold">{mother.name}</h3>
              <p className="truncate text-xs text-muted-foreground">{mother.mobile} · {mother.email}</p>
            </div>
          </div>
          <button onClick={() => setActive("caregiver")} className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-[1.03]">
            {t("profile.editProfile")} <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-3xl bg-primary-soft text-3xl">
              {baby.photo ? <img src={baby.photo} alt={baby.name} className="h-full w-full object-cover" /> : "👶"}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("profile.babyLabel")}</p>
              <h3 className="truncate text-xl font-bold">{baby.name}</h3>
              <p className="text-xs text-muted-foreground">
                {babyAge?.months ?? baby.ageMonths} {t("dash.months")} {babyAge?.days ?? baby.ageDays} {t("dash.days")} · {t("dash.born")} {babyAge?.bornOn ?? baby.bornOn}
              </p>
            </div>

          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-primary-soft py-2 text-center">
              <p className="text-[10px] font-medium uppercase text-muted-foreground">{t("dash.weight")}</p>
              <p className="text-sm font-bold">{baby.weight} kg</p>
            </div>
            <div className="rounded-2xl bg-secondary-soft py-2 text-center">
              <p className="text-[10px] font-medium uppercase text-muted-foreground">{t("dash.height")}</p>
              <p className="text-sm font-bold">{baby.height} cm</p>
            </div>
            <div className="rounded-2xl bg-success-soft py-2 text-center">
              <p className="text-[10px] font-medium uppercase text-muted-foreground">{t("profile.status")}</p>
              <p className="text-sm font-bold text-success">{t("dash.healthy")}</p>
            </div>
          </div>
          <button onClick={() => setActive("baby")} className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            {t("profile.editBaby")} <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {[
        { title: t("profile.myAccount"), rows: account },
        { title: t("profile.myActivity"), rows: activity },
        { title: t("profile.support"), rows: support },
      ].map((g) => (
        <section key={g.title}>
          <h2 className="mb-4 text-lg font-bold">{g.title}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {g.rows.map((r) => (
              <motion.button
                whileHover={{ x: 4 }}
                key={r.key}
                onClick={() => setActive(r.key)}
                className="group flex items-center gap-4 rounded-3xl border border-border/70 bg-card p-4 text-left shadow-card transition-shadow hover:shadow-soft"
              >
                <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", r.tone)}>
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t(r.titleKey)}</p>
                  <p className="truncate text-xs text-muted-foreground">{t(r.descKey)}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </motion.button>
            ))}
          </div>
        </section>
      ))}

      <button
        onClick={() => setLogout(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-destructive/30 bg-destructive-soft py-4 text-sm font-bold text-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        <LogOut className="h-4 w-4" /> {t("profile.logout")}
      </button>

      {/* Baby edit */}
      <Dialog open={active === "baby"} onOpenChange={close}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          <DialogHeader><DialogTitle>{t("profile.baby")}</DialogTitle><DialogDescription>{t("profile.babyDialogDesc")}</DialogDescription></DialogHeader>
          <BabyForm baby={baby} onSaved={() => { toast.success(t("profile.savedBaby")); close(); }} />
        </DialogContent>
      </Dialog>

      {/* Caregiver / personal information edit */}
      <Dialog open={active === "caregiver" || active === "personal"} onOpenChange={close}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{active === "personal" ? t("profile.personal") : t("profile.caregiver")}</DialogTitle>
            <DialogDescription>{t("profile.caregiverDialogDesc")}</DialogDescription>
          </DialogHeader>
          <CaregiverForm mother={mother} onSaved={() => { toast.success(t("profile.savedMother")); close(); }} />
        </DialogContent>
      </Dialog>


      {/* Settings sheet */}
      <Sheet open={active === "settings"} onOpenChange={close}>
        <SheetContent className="w-full space-y-6 overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("profile.appSettings")}</SheetTitle>
            <SheetDescription>{t("profile.settingsDesc")}</SheetDescription>
          </SheetHeader>
          <ToggleRow icon={settings.darkMode ? Moon : Sun} label={t("settings.darkMode")} checked={settings.darkMode} onCheckedChange={(v) => { settings.set("darkMode", v); toast(v ? t("profile.darkOn") : t("profile.lightOn")); }} />
          <ToggleRow icon={Bell} label={t("nav.notifications")} checked={settings.notificationsEnabled} onCheckedChange={(v) => settings.set("notificationsEnabled", v)} />
          <ToggleRow icon={Volume2} label={t("settings.sound")} checked={settings.soundEnabled} onCheckedChange={(v) => settings.set("soundEnabled", v)} />
          <div className="flex items-center justify-between rounded-2xl border border-border p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary-soft text-primary"><Languages className="h-4 w-4" /></span>
              <span className="text-sm font-semibold">{t("settings.language")}</span>
            </div>
            <Select value={settings.language} onValueChange={(v) => settings.set("language", v as "English" | "Tamil")}>
              <SelectTrigger className="w-32 rounded-full"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="English">English</SelectItem><SelectItem value="Tamil">தமிழ்</SelectItem></SelectContent>
            </Select>
          </div>
        </SheetContent>
      </Sheet>

      {/* Privacy sheet */}
      <Sheet open={active === "privacy"} onOpenChange={close}>
        <SheetContent className="w-full space-y-4 overflow-y-auto sm:max-w-md">
          <SheetHeader><SheetTitle>{t("profile.privacy")}</SheetTitle><SheetDescription>{t("profile.privacyDialogDesc")}</SheetDescription></SheetHeader>
          <ToggleRow icon={Fingerprint} label={t("profile.biometric")} checked={settings.biometricLogin} onCheckedChange={(v) => settings.set("biometricLogin", v)} />
          <ToggleRow icon={Shield} label={t("profile.rememberLogin")} checked={settings.rememberLogin} onCheckedChange={(v) => settings.set("rememberLogin", v)} />
          <ToggleRow icon={BarChart3} label={t("profile.analytics")} checked={settings.analytics} onCheckedChange={(v) => settings.set("analytics", v)} />
          <Button variant="outline" className="w-full rounded-full" onClick={() => {
            if (typeof window !== "undefined") { window.localStorage.clear(); toast.success(t("profile.dataCleared")); setTimeout(() => window.location.reload(), 600); }
          }}>{t("profile.clearData")}</Button>
        </SheetContent>
      </Sheet>

      {/* Simple info dialogs */}
      {(["saved","feeding","growthh","healthh","help","contact"] as const).map((k) => (
        <Dialog key={k} open={active === k} onOpenChange={close}>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>{t(account.concat(activity, support).find((r) => r.key === k)?.titleKey ?? "")}</DialogTitle>
              <DialogDescription>{k === "contact" ? t("profile.contactPlaceholder") : t("profile.historyPlaceholder")}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}

      {/* Rate dialog */}
      <Dialog open={active === "rate"} onOpenChange={close}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>{t("profile.rate")}</DialogTitle><DialogDescription>{t("profile.rateQuestion")}</DialogDescription></DialogHeader>
          <div className="flex items-center justify-center gap-2 py-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => { settings.set("rating", n); toast.success(t("profile.thanksRatingN", { n })); close(); }}
                aria-label={t("profile.rateAria", { n })}
                className={cn("transition-transform hover:scale-110", n <= settings.rating ? "text-warning" : "text-muted-foreground")}
              >
                <Star className={cn("h-8 w-8", n <= settings.rating && "fill-warning")} />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={logout}
        onOpenChange={setLogout}
        destructive
        title={t("profile.logoutConfirm")}
        description={t("profile.logoutDesc")}
        confirmText={t("profile.logout")}
        onConfirm={() => { void handleSignOut(); }}
      />
    </div>
  );
}

function ToggleRow({ icon: Icon, label, checked, onCheckedChange }: { icon: any; label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border p-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon className="h-4 w-4" /></span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
