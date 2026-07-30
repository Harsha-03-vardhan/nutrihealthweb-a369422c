import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { AvatarUpload } from "@/components/avatar-upload";
import { useT } from "@/lib/i18n";
import { ageFromDob } from "@/lib/age";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

type Mother = ReturnType<typeof useApp.getState>["mother"];
type Baby = ReturnType<typeof useApp.getState>["baby"];

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useT();
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-xs font-semibold">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">({t("common.optional")})</span>
        )}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
const mobileOk = (v: string) => /^[0-9]{10}$/.test(v.replace(/\D/g, ""));

/** Caregiver / Personal information form — validated, shares one store record. */
export function CaregiverForm({ mother, onSaved }: { mother: Mother; onSaved: () => void }) {
  const { t, tx } = useT();
  const updateMother = useApp((s) => s.updateMother);
  const [form, setForm] = useState({ ...mother });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm({ ...mother }), [mother]);

  const set = <K extends keyof Mother>(k: K, v: Mother[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!String(form.name ?? "").trim()) e.name = t("common.required");
    if (!String(form.relationship ?? "").trim()) e.relationship = t("common.required");
    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 15 || age > 90) e.age = t("profile.ageRange");
    if (!String(form.mobile ?? "").trim()) e.mobile = t("common.required");
    else if (!mobileOk(String(form.mobile))) e.mobile = t("profile.invalidMobile");
    if (!String(form.email ?? "").trim()) e.email = t("common.required");
    else if (!emailOk(String(form.email))) e.email = t("profile.invalidEmail");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 450));
    updateMother({
      ...form,
      name: String(form.name).trim(),
      email: String(form.email).trim(),
      mobile: String(form.mobile).replace(/\D/g, ""),
      age: Number(form.age),
    });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="grid gap-4">
      <Field label={t("profile.photo")}>
        <AvatarUpload
          value={form.photo}
          fallback="👩"
          onChange={(dataUrl) => set("photo", dataUrl)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("profile.fullName")} htmlFor="m-name" error={errors.name}>
          <Input id="m-name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label={t("profile.age")} htmlFor="m-age" error={errors.age}>
          <Input id="m-age" type="number" inputMode="numeric" value={form.age ?? ""} onChange={(e) => set("age", Number(e.target.value) as Mother["age"])} />
        </Field>
        <Field label={t("profile.mobile")} htmlFor="m-mobile" error={errors.mobile}>
          <Input id="m-mobile" inputMode="tel" maxLength={14} value={form.mobile} onChange={(e) => set("mobile", e.target.value)} />
        </Field>
        <Field label={t("profile.email")} htmlFor="m-email" error={errors.email}>
          <Input id="m-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label={t("profile.relationship")} error={errors.relationship}>
          <Select value={form.relationship} onValueChange={(v) => set("relationship", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Mother", "Father", "Grandmother", "Grandfather", "Guardian"].map((r) => (
                <SelectItem key={r} value={r}>{tx(r)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label={t("profile.occupation")} htmlFor="m-occ" optional>
          <Input id="m-occ" value={form.occupation ?? ""} onChange={(e) => set("occupation", e.target.value)} />
        </Field>
      </div>

      <Field label={t("profile.address")} htmlFor="m-addr" optional>
        <Textarea id="m-addr" rows={2} value={form.address ?? ""} onChange={(e) => set("address", e.target.value)} />
      </Field>

      <DialogFooter className="gap-2">
        <Button variant="outline" className="rounded-full" onClick={() => setForm({ ...mother })} disabled={saving}>
          {t("common.cancel")}
        </Button>
        <Button className="rounded-full" onClick={submit} disabled={saving}>
          {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
          {t("common.save")}
        </Button>
      </DialogFooter>
    </div>
  );
}

/** Baby profile form — validated, auto age from DOB. */
export function BabyForm({ baby, onSaved }: { baby: Baby; onSaved: () => void }) {
  const { t, tx } = useT();
  const updateBaby = useApp((s) => s.updateBaby);
  const [form, setForm] = useState({ ...baby });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm({ ...baby }), [baby]);

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const age = useMemo(() => ageFromDob(String(form.dob ?? "")), [form.dob]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!String(form.name ?? "").trim()) e.name = t("common.required");
    if (!form.dob) e.dob = t("common.required");
    else if (new Date(String(form.dob)) > new Date()) e.dob = t("profile.futureDob");
    if (!Number(form.weight) || Number(form.weight) <= 0) e.weight = t("profile.invalidWeight");
    if (!Number(form.height) || Number(form.height) <= 0) e.height = t("profile.invalidHeight");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 450));
    updateBaby({
      ...form,
      name: String(form.name).trim(),
      weight: Number(form.weight),
      height: Number(form.height),
      birthWeight: form.birthWeight ? Number(form.birthWeight) : undefined,
      waterMl: Number(form.waterMl) || baby.waterMl,
      ageMonths: age?.months ?? baby.ageMonths,
      ageDays: age?.days ?? baby.ageDays,
      bornOn: age?.bornOn ?? baby.bornOn,
    } as Partial<Baby>);
    setSaving(false);
    onSaved();
  };

  return (
    <div className="grid gap-4">
      <Field label={t("profile.photo")}>
        <AvatarUpload value={form.photo} fallback="👶" onChange={(dataUrl) => set("photo", dataUrl)} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("profile.babyName")} htmlFor="b-name" error={errors.name}>
          <Input id="b-name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label={t("profile.dob")} htmlFor="b-dob" error={errors.dob}>
          <Input id="b-dob" type="date" value={form.dob ?? ""} onChange={(e) => set("dob", e.target.value)} />
        </Field>
        <Field label={t("profile.gender")}>
          <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Female", "Male", "Other"].map((g) => <SelectItem key={g} value={g}>{tx(g)}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label={t("profile.bloodGroup")}>
          <Select value={form.bloodGroup} onValueChange={(v) => set("bloodGroup", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label={t("profile.height")} htmlFor="b-h" error={errors.height}>
          <Input id="b-h" type="number" step="0.1" value={form.height} onChange={(e) => set("height", e.target.value)} />
        </Field>
        <Field label={t("profile.weight")} htmlFor="b-w" error={errors.weight}>
          <Input id="b-w" type="number" step="0.1" value={form.weight} onChange={(e) => set("weight", e.target.value)} />
        </Field>
        <Field label={t("profile.birthWeight")} htmlFor="b-bw" optional>
          <Input id="b-bw" type="number" step="0.1" value={form.birthWeight ?? ""} onChange={(e) => set("birthWeight", e.target.value)} />
        </Field>
        <Field label={t("profile.birthTime")} htmlFor="b-bt" optional>
          <Input id="b-bt" type="time" value={form.birthTime ?? ""} onChange={(e) => set("birthTime", e.target.value)} />
        </Field>
        <Field label={t("profile.allergies")} htmlFor="b-al" optional className="sm:col-span-2">
          <Input id="b-al" placeholder={t("profile.allergiesPh")} value={form.allergies ?? ""} onChange={(e) => set("allergies", e.target.value)} />
        </Field>
      </div>

      <Field label={t("profile.waterTarget")} htmlFor="b-wa">
        <Input id="b-wa" type="number" value={form.waterMl} onChange={(e) => set("waterMl", e.target.value)} />
      </Field>

      <Field label={t("profile.notes")} htmlFor="b-notes" optional>
        <Textarea id="b-notes" rows={2} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} />
      </Field>

      {age && (
        <p className="rounded-2xl bg-primary-soft px-4 py-2.5 text-xs font-semibold text-foreground">
          {t("profile.age")}: {age.months} {t("dash.months")} {age.days} {t("dash.days")} · {t("dash.born")} {age.bornOn}
        </p>
      )}

      <DialogFooter className="gap-2">
        <Button variant="outline" className="rounded-full" onClick={() => setForm({ ...baby })} disabled={saving}>
          {t("common.cancel")}
        </Button>
        <Button className="rounded-full" onClick={submit} disabled={saving}>
          {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
          {t("common.save")}
        </Button>
      </DialogFooter>
    </div>
  );
}
