import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function EmptyState({
  emoji = "📭",
  title,
  desc,
  action,
}: {
  emoji?: string;
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-dashed border-border bg-card p-10 text-center"
    >
      <p className="text-5xl">{emoji}</p>
      <p className="mt-3 font-semibold">{title}</p>
      {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
