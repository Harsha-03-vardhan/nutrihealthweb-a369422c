import { useState } from "react";
import { motion } from "framer-motion";
import { Baby, Loader2, User } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onboard, loadUserData } from "@/lib/nutrihealth.functions";
import { useApp, useMeals, type UserData } from "@/lib/store";

/**
 * Two-step first-run setup: who the parent is, then the baby's basics.
 * Shown until a profile and at least one baby exist in the database.
 */
export function OnboardingFlow() {
  const submitOnboard = useServerFn(onboard);
  const load = useServerFn(loadUserData);
  const hydrateApp = useApp((s) => s.hydrate);
  const hydrateMeals = useMeals((s) => s.hydrate);

  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [parentName, setParentName] = useState("");
  const [relationship, setRelationship] = useState("Mother");
  const [mobile, setMobile] = useState("");
  const [babyName, setBabyName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"Female" | "Male" | "Other">("Female");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  async function finish(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await submitOnboard({
        data: {
          parentName: parentName.trim(),
          relationship,
          mobile: mobile.trim(),
          babyName: babyName.trim(),
          dob,
          gender,
          weight: weight ? Number(weight) : undefined,
          height: height ? Number(height) : undefined,
        },
      });
      const data = (await load({})) as unknown as UserData;
      hydrateApp(data);
      hydrateMeals(data);
      toast.success(`Welcome, ${parentName.trim().split(" ")[0]}!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Setup failed. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-6 shadow-card sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            {step === 1 ? <User className="h-5 w-5" /> : <Baby className="h-5 w-5" />}
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Step {step} of 2
            </p>
            <h1 className="text-lg font-bold text-foreground">
              {step === 1 ? "Tell us about you" : "Add your baby"}
            </h1>
          </div>
        </div>

        <form onSubmit={finish} className="mt-6 space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="parent-name">Your name</Label>
                <Input
                  id="parent-name"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="relationship">You are the</Label>
                <Select value={relationship} onValueChange={setRelationship}>
                  <SelectTrigger id="relationship" className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Mother", "Father", "Guardian", "Caregiver"].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mobile">Mobile (optional)</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="h-11 rounded-xl"
                />
              </div>
              <Button
                type="button"
                disabled={!parentName.trim()}
                onClick={() => setStep(2)}
                className="h-11 w-full rounded-full text-sm font-semibold"
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="baby-name">Baby's name</Label>
                <Input
                  id="baby-name"
                  required
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  placeholder="e.g. Aarohi"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    required
                    max={today}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={gender}
                    onValueChange={(v) => setGender(v as typeof gender)}
                  >
                    <SelectTrigger id="gender" className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Female", "Male", "Other"].map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="7.2"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="68"
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                We'll set up a meal plan, milestone checklist and vaccination schedule
                matched to this age.
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={busy}
                  className="h-11 flex-1 rounded-full text-sm font-semibold"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={busy}
                  className="h-11 flex-[2] rounded-full text-sm font-semibold"
                >
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Start tracking
                </Button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}
