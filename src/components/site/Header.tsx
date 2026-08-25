import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/shop", label: "Shop" },
];

import klassiqLogo from "@/assets/hero-logo.jpeg";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={klassiqLogo} alt="Klassiq Grafikz" className="h-9 w-9 rounded-lg object-cover" />
          <div className="leading-tight">
            <div className="font-display text-[15px] font-bold tracking-tight">Klassiq Grafikz</div>
            <div className=" -mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Creative Studio
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-black"
              activeProps={{ className: "text-black bg-zinc-100" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-2 hidden md:inline-flex">
            <span className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
              Get a Quote
            </span>
          </Link>
          <div className="ml-2 hidden md:block">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <div className="mr-1">
            <ThemeToggle />
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 bg-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
          <div className="grid gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-zinc-50"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-medium text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
