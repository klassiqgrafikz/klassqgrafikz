import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  delta?: number;
  hint?: string;
}

export function KpiCard({ label, value, icon: Icon, delta, hint }: KpiCardProps) {
  const deltaPositive = (delta ?? 0) >= 0;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card-soft">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-3 font-display text-4xl tracking-tight text-foreground">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {typeof delta === "number" && (
          <span className={deltaPositive ? "text-emerald-400" : "text-primary"}>
            {deltaPositive ? "▲" : "▼"} {Math.abs(delta)}
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}
