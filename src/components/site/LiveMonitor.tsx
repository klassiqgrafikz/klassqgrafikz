import { useEffect, useState } from "react";
import { Eye, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/lib/Reveal";

export function LiveMonitor() {
  const [viewers, setViewers] = useState(28);
  const [visits, setVisits] = useState(237);
  const [monthly, setMonthly] = useState(2418);

  useEffect(() => {
    const t1 = window.setInterval(() => {
      setViewers(() => 12 + Math.floor(Math.random() * 34));
    }, 2200);
    const t2 = window.setInterval(() => {
      setVisits((v) => v + Math.floor(Math.random() * 3));
    }, 4500);
    const t3 = window.setInterval(() => {
      setMonthly((m) => m + Math.floor(Math.random() * 5) - 1);
    }, 3000);
    return () => {
      window.clearInterval(t1);
      window.clearInterval(t2);
      window.clearInterval(t3);
    };
  }, []);

  const cards = [
    { Icon: Eye, label: "Active Viewers", value: viewers, tint: "text-emerald-400" },
    { Icon: TrendingUp, label: "Today's Visits", value: visits, tint: "text-primary" },
    { Icon: Users, label: "Monthly Interested Viewers", value: monthly, tint: "text-primary-glow" },
  ];

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Realtime monitor
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Live traffic on the studio
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          A live pulse of who's browsing our work right now.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map(({ Icon, label, value, tint }, i) => (
          <Reveal
            key={label}
            delay={i * 90}
            className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-7 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-primary/10 ${tint}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Live
              </span>
            </div>
            <div
              key={value}
              className="mt-6 font-display text-5xl font-semibold tracking-tight transition-all duration-500 animate-rise"
            >
              {value.toLocaleString()}
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}