import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset password — NutriHealth" },
      {
        name: "description",
        content: "Choose a new password for your NutriHealth account.",
      },
      { property: "og:title", content: "Reset password — NutriHealth" },
      { property: "og:description", content: "Choose a new password for your NutriHealth account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isRecovery =
      window.location.hash.includes("type=recovery") ||
      new URLSearchParams(window.location.search).get("type") === "recovery";

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session || isRecovery) setReady(true);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated.");
      navigate({ to: "/", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-card"
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-xl font-bold text-foreground">Set a new password</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {ready
            ? "Choose a password you'll remember. At least 6 characters."
            : "Open this page from the reset link in your email."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="new-password">New password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="new-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!ready}
                className="h-11 rounded-xl pl-9"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirm-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={!ready}
                className="h-11 rounded-xl pl-9"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={busy || !ready}
            className="h-11 w-full rounded-full text-sm font-semibold"
          >
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update password
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
