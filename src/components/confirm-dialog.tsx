import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useT } from "@/lib/i18n";

export function ConfirmDialog({
  open, onOpenChange, title, description, confirmText, onConfirm, destructive,
}: {
  open: boolean; onOpenChange: (o: boolean) => void;
  title: string; description?: string; confirmText?: string;
  onConfirm: () => void; destructive?: boolean;
}) {
  const { t } = useT();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={destructive ? "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90" : "rounded-full"}
          >
            {confirmText ?? t("common.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
