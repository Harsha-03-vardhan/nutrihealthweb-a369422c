import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home,
  UtensilsCrossed,
  TrendingUp,
  Stethoscope,
  Bell,
  Search,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApp, useNotifs } from "@/lib/store";
import { NotificationCenter } from "@/components/notification-center";
import { GlobalSearch } from "@/components/global-search";
import { AIChat } from "@/components/ai-chat";
import { LanguageSwitch } from "@/components/language-switch";
import { useT } from "@/lib/i18n";
import logoAsset from "@/assets/nutrihealth-logo.png.asset.json";

const nav = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/food", key: "nav.feeding", icon: UtensilsCrossed },
  { to: "/growth", key: "nav.growthNav", icon: TrendingUp },
  { to: "/health", key: "nav.healthIssues", icon: Stethoscope },
] as const;

function BrandMark({ onClick }: { onClick?: () => void }) {
  const { t } = useT();
  return (
    <Link to="/" onClick={onClick} className="flex shrink-0 items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="NutriHealth logo"
        className="h-10 w-10 shrink-0 rounded-full object-contain"
        width={40}
        height={40}
      />
      <div className="hidden min-w-0 sm:block">
        <p className="whitespace-nowrap text-sm font-bold leading-tight text-foreground">{t("nav.appName")}</p>
        <p className="whitespace-nowrap text-[11px] font-medium text-secondary">{t("nav.appTagline")}</p>
      </div>
    </Link>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { t } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const mother = useApp((s) => s.mother);
  const unread = useNotifs((s) => s.items.filter((n) => !n.read).length);
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotifs, setOpenNotifs] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-10">
          {/* LEFT — logo + app name */}
          <BrandMark />

          {/* CENTER — horizontal navigation (desktop) */}
          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item.to);
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary-soft text-foreground"
                          : "text-muted-foreground hover:bg-primary-soft/50 hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                      <span className="whitespace-nowrap">{t(item.key)}</span>
                      {active && (
                        <motion.span
                          layoutId="header-active"
                          className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={() => setOpenChat(true)}
                  className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft/50 hover:text-foreground"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{t("nav.aiAssistant")}</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* RIGHT — search, notifications, language, profile */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setOpenSearch(true)}
              aria-label={t("nav.search")}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary-soft"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t("nav.notifications")}
              onClick={() => setOpenNotifs(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary-soft"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  {unread}
                </span>
              )}
            </button>
            <LanguageSwitch className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => navigate({ to: "/profile" })}
              aria-label={t("nav.account")}
              className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-1 transition-colors hover:bg-primary-soft sm:pr-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full gradient-brand text-sm font-semibold text-white">
                {mother.photo ? (
                  <img src={mother.photo} alt={mother.name} className="h-full w-full object-cover" />
                ) : (
                  mother.name[0]
                )}
              </span>
              <span className="hidden max-w-[9rem] truncate text-sm font-semibold xl:inline">{mother.name}</span>
            </button>
            <button
              type="button"
              onClick={() => setOpenMenu((v) => !v)}
              aria-label={openMenu ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={openMenu}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary-soft lg:hidden"
            >
              {openMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet slide-down menu */}
        <AnimatePresence initial={false}>
          {openMenu && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
                {nav.map((item) => {
                  const active = isActive(item.to);
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpenMenu(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-colors",
                          active ? "bg-primary-soft text-foreground" : "text-muted-foreground hover:bg-primary-soft/50"
                        )}
                      >
                        <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
                        {t(item.key)}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(false);
                      setOpenChat(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft/50"
                  >
                    <Sparkles className="h-5 w-5 shrink-0" />
                    {t("nav.aiAssistant")}
                  </button>
                </li>
                <li className="mt-1 flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2 sm:hidden">
                  <span className="text-sm font-medium text-muted-foreground">{t("nav.language")}</span>
                  <LanguageSwitch compact />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-24 sm:px-6 lg:px-10">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      <GlobalSearch open={openSearch} onOpenChange={setOpenSearch} />
      <NotificationCenter open={openNotifs} onOpenChange={setOpenNotifs} />
      <AIChat open={openChat} onOpenChange={setOpenChat} />
    </div>
  );
}
