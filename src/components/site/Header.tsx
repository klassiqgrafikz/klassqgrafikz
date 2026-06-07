import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/addup", label: "AddUp" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-6xl">
      <div className="rounded-full border border-border bg-surface/80 px-4 py-3 backdrop-blur-xl shadow-card-soft md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground font-display text-lg shadow-glow">
              K
            </div>
            <div className="leading-tight">
              <div className="font-display text-base tracking-wide">Klassiq</div>
              <div className="-mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Grafikz
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3 py-1.5 text-sm text-foreground/80 transition hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 grid gap-1 border-t border-border pt-3 md:hidden">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
