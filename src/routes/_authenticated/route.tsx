import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { loadUserData } from "@/lib/nutrihealth.functions";
import { useApp, useMeals, type UserData } from "@/lib/store";
import { AppLayout } from "@/components/layout/AppLayout";
import { OnboardingFlow } from "@/components/onboarding-flow";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedShell,
});

function AuthenticatedShell() {
  const load = useServerFn(loadUserData);
  const hydrated = useApp((s) => s.hydrated);
  const needsOnboarding = useApp((s) => s.needsOnboarding);
  const hydrateApp = useApp((s) => s.hydrate);
  const hydrateMeals = useMeals((s) => s.hydrate);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (hydrated) return;
    load({})
      .then((data) => {
        if (cancelled) return;
        hydrateApp(data as unknown as UserData);
        hydrateMeals(data as unknown as UserData);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, load, hydrateApp, hydrateMeals]);

  if (failed) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
        <div>
          <h1 className="text-lg font-semibold text-foreground">We couldn't load your data</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Check your connection and refresh the page.
          </p>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (needsOnboarding) {
    return <OnboardingFlow />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
