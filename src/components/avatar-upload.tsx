import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

/**
 * Local image picker with live preview. Emits a data-URL so the caller can
 * persist it in the existing localStorage-backed store.
 */
export function AvatarUpload({
  value,
  onChange,
  fallback,
  className,
}: {
  value?: string;
  onChange: (dataUrl: string) => void;
  fallback: string;
  className?: string;
}) {
  const { t } = useT();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = (file?: File | null) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      toast.error(t("upload.badType"));
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      toast.error(t("upload.tooBig"));
      return;
    }
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(String(reader.result));
      setBusy(false);
    };
    reader.onerror = () => {
      toast.error(t("upload.failed"));
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative">
        <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-3xl bg-primary-soft text-3xl shadow-soft">
          {value ? (
            <img src={value} alt={t("common.preview")} className="h-full w-full object-cover" />
          ) : (
            fallback
          )}
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label={t("common.change")}
          className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full gradient-brand text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
        >
          <Camera className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          {value ? t("common.change") : t("common.upload")}
        </Button>
        {value && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="rounded-full text-destructive hover:text-destructive"
            onClick={() => onChange("")}
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            {t("common.remove")}
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
