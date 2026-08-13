import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function StudioShell({ children }: { children: ReactNode }) {
  return (
    <div className="warm relative min-h-screen bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-24 h-80 w-80 rounded-full bg-chart-2/20 blur-3xl"
      />

      <header className="relative border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
              K
            </div>
            <div>
              <div className="font-display text-sm font-semibold tracking-tight">
                Klassiq Grafikz
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Studio · live pulse
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-primary/50 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 md:px-6">{children}</main>

      <footer className="relative border-t border-border/60 py-6">
        <p className="text-center text-xs text-muted-foreground">
          Klassiq Grafikz — ...we decorate the world.
        </p>
      </footer>
    </div>
  );
}
