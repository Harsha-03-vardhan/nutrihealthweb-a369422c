import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

export function UpdateGrowthDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const baby = useApp((s) => s.baby);
  const addGrowth = useApp((s) => s.addGrowth);
  const [weight, setWeight] = useState(baby.weight.toString());
  const [height, setHeight] = useState(baby.height.toString());
  const [head, setHead] = useState(baby.headCircumference.toString());
  const w = Number(weight), h = Number(height);
  const bmi = w && h ? (w / ((h / 100) ** 2)).toFixed(2) : "—";
  const { t } = useT();

  const submit = () => {
    if (!w || !h || w <= 0 || h <= 0) {
      toast.error(t("growth.invalid"));
      return;
    }
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    addGrowth({ month: months[now.getMonth()], year: now.getFullYear(), weight: w, height: h, headCircum: Number(head) || 0 });
    toast.success(t("growth.updated"));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>{t("growth.dialogTitle")}</DialogTitle>
          <DialogDescription>{t("growth.dialogDesc")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="w">{t("growth.weightKg")}</Label>
            <Input id="w" type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="h">{t("growth.heightCm")}</Label>
            <Input id="h" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hc">{t("growth.headCm")}</Label>
            <Input id="hc" type="number" step="0.1" value={head} onChange={(e) => setHead(e.target.value)} />
          </div>
          <div className="rounded-2xl bg-primary-soft p-3 text-sm">
            <span className="font-semibold text-primary">{t("growth.bmi")}:</span> <span className="font-bold">{bmi}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={() => onOpenChange(false)}>{t("common.cancel")}</Button>
          <Button className="rounded-full" onClick={submit}>{t("common.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
