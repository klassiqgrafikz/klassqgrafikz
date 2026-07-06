import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";


const nav = [
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/addup", label: "Community" },
  { to: "/shop", label: "Shop" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-6xl">
      <div className="glass rounded-2xl px-4 py-2.5 shadow-soft md:px-5">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground font-display text-base font-bold shadow-glow">
              K
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary-glow animate-pulse-dot" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-tight">Klassiq Grafikz</div>
              <div className="-mt-0.5 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Creative Studio
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-foreground/70 transition hover:bg-secondary/80 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary/60" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90 md:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/60 md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 grid gap-1 border-t border-border/60 pt-3 md:hidden">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2.5 text-sm font-medium text-background"
            >
              Start a project <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
