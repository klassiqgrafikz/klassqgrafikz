import type { LucideIcon } from "lucide-react";

type Tone = "amber" | "gold" | "terra";

const TONES: Record<Tone, { chip: string; dot: string }> = {
  amber: { chip: "bg-primary/10 text-primary", dot: "bg-primary" },
  gold: { chip: "bg-chart-2/15 text-chart-2", dot: "bg-chart-2" },
  terra: { chip: "bg-chart-3/15 text-chart-3", dot: "bg-chart-3" },
};

interface KpiCardProps {
  icon: LucideIcon;
  value: number | string;
  sentence: string;
  delta?: number;
  hint?: string;
  tone?: Tone;
}

export function KpiCard({
  icon: Icon,
  value,
  sentence,
  delta,
  hint,
  tone = "amber",
}: KpiCardProps) {
  const t = TONES[tone];
  const up = (delta ?? 0) >= 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card-soft">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
      <div className="flex items-center justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${t.chip}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
          Live
        </span>
      </div>
      <div className="mt-5 font-display text-5xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-2 text-sm text-foreground/80">{sentence}</div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {typeof delta === "number" && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
              up ? "bg-chart-3/15 text-chart-3" : "bg-primary/10 text-primary"
            }`}
          >
            {up ? "▲" : "▼"} {Math.abs(delta)} vs the day before
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}
