import { useEffect, useRef, useState } from "react";

export function useDebounced<T>(value: T, delay = 200): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark key={i} className="rounded bg-warning-soft px-0.5 text-warning">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

type SR = {
  new (): {
    lang: string;
    interimResults: boolean;
    onresult: (e: { results: { 0: { transcript: string } }[] }) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
  };
};

export function useVoiceInput(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const ref = useRef<InstanceType<SR> | null>(null);

  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(
      !!(
        (window as unknown as { SpeechRecognition?: SR }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: SR }).webkitSpeechRecognition
      )
    );
  }, []);

  const start = () => {
    if (!supported) return;
    const Ctor =
      (window as unknown as { SpeechRecognition?: SR }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SR }).webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      onResult(t);
    };
    rec.onend = () => setListening(false);
    ref.current = rec;
    setListening(true);
    rec.start();
  };

  const stop = () => {
    ref.current?.stop();
    setListening(false);
  };

  return { listening, start, stop, supported };
}
