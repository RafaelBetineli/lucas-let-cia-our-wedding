import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-11-20T16:00:00-03:00").getTime();

function calc() {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

interface CountdownProps {
  variant?: "light" | "dark";
}

export function Countdown({ variant = "light" }: CountdownProps) {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: t.d, l: "Dias" },
    { v: t.h, l: "Horas" },
    { v: t.m, l: "Min" },
    { v: t.s, l: "Seg" },
  ];

  const isLight = variant === "light";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
      {items.map((i, idx) => (
        <div
          key={i.l}
          className={[
            "rounded-2xl backdrop-blur-md border px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[96px] text-center transition",
            isLight
              ? "bg-white/15 border-white/25 text-white"
              : "bg-white border-border text-foreground shadow-card",
          ].join(" ")}
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <div className="font-display text-2xl sm:text-4xl leading-none tabular-nums">
            {String(i.v).padStart(2, "0")}
          </div>
          <div
            className={[
              "mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em]",
              isLight ? "text-white/80" : "text-muted-foreground",
            ].join(" ")}
          >
            {i.l}
          </div>
        </div>
      ))}
    </div>
  );
}
