import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Trash2, Mic, MicOff, Copy, Check } from "lucide-react";
import { suggestedQuestions } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceInput } from "@/lib/hooks";
import { useApp, useChatHistory } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";

const canned = (q: string): string => {
  const s = q.toLowerCase();
  if (s.includes("iron")) return "Great sources of iron for 8-month-olds: ragi porridge, mashed dal, spinach purée, and prunes. Pair with vitamin-C foods for absorption.";
  if (s.includes("fever")) return "Mild fever after vaccination is common. Keep baby lightly clothed, hydrated, and monitor. Call your doctor if >39°C or lasts >48h.";
  if (s.includes("water")) return "6–12 months: ~120–240 ml/day alongside breast milk/formula. Increase in warm weather. Not before 6 months.";
  if (s.includes("egg")) return "You can introduce well-cooked egg yolk around 6 months; egg white typically after 8 months. Watch for allergies.";
  if (s.includes("vaccin") || s.includes("immunis")) return "Check the Vaccination Tracker on the Growth page — it lists every age-based dose with due dates and lets you mark them completed.";
  return "Thanks for asking! Based on general guidance for infants, please consult your pediatrician for personalised advice. I can help you find guides in the Health section too.";
};

const timeLabel = (at: number) =>
  new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function AIChat({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, tx } = useT();
  const mother = useApp((s) => s.mother);
  const messages = useChatHistory((s) => s.messages);
  const push = useChatHistory((s) => s.push);
  const clear = useChatHistory((s) => s.clear);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const voice = useVoiceInput((tx) => setInput((v) => (v ? v + " " + tx : tx)));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const send = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    push({ role: "user", text });
    setInput("");
    setTyping(true);
    setTimeout(() => {
      push({ role: "ai", text: tx(canned(text)) });
      setTyping(false);
      inputRef.current?.focus();
    }, 700 + Math.random() * 500);
  };

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success(t("ai.copied"));
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error(t("common.copyFailed"));
    }
  };

  const greeting = `${t("ai.greeting")}`.replace("Priya", mother.name?.split(" ")[0] ?? "there");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl gradient-brand text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <SheetTitle>{t("ai.title")}</SheetTitle>
              <SheetDescription>{t("ai.desc")}</SheetDescription>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => { clear(); toast(t("ai.cleared")); }}
              className="rounded-full"
              aria-label={t("ai.clear")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm">{greeting}</div>
          </div>
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={m.role === "user" ? "flex flex-col items-end" : "flex flex-col items-start"}
              >
                <div className={m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground"
                  : "max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm"}>
                  {m.text}
                </div>
                <div className="mt-1 flex items-center gap-2 px-1">
                  <span className="text-[10px] text-muted-foreground">{timeLabel(m.at)}</span>
                  {m.role === "ai" && (
                    <button
                      onClick={() => copy(m.id, m.text)}
                      aria-label={t("ai.copy")}
                      className="flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-primary"
                    >
                      {copiedId === m.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {t("ai.copy")}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl bg-muted px-3 py-2" aria-label={t("ai.thinking")}>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {messages.length < 3 && (
          <div className="flex flex-wrap gap-2 border-t p-3">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:bg-primary-soft"
              >
                {tx(q)}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 border-t p-3"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("ai.placeholder")}
            className="rounded-full"
          />
          {voice.supported && (
            <Button type="button" size="icon" variant="outline" className="rounded-full" onClick={() => (voice.listening ? voice.stop() : voice.start())}>
              {voice.listening ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <Button type="submit" size="icon" className="rounded-full" disabled={typing}><Send className="h-4 w-4" /></Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
