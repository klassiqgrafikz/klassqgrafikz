import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-surface/30">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground font-display text-lg font-bold shadow-glow">
                K
              </div>
              <div>
                <div className="font-display text-lg font-semibold tracking-tight">Klassiq Grafikz</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Creative Studio · est. 2021
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              A multidisciplinary creative agency designing brands, digital products
              and logistics platforms that move businesses forward.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href="https://wa.me/2347050495704"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-2 text-xs font-medium transition hover:border-primary/60 hover:text-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-2 text-xs font-medium transition hover:border-primary/60 hover:text-foreground"
              >
                <Instagram className="h-3.5 w-3.5" /> Instagram
              </a>
              <a
                href="mailto:hello@klassiqgrafikz.com"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-2 text-xs font-medium transition hover:border-primary/60 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Studio
            </div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="text-foreground/80 transition hover:text-foreground">Services</Link></li>
              <li><Link to="/shop" className="text-foreground/80 transition hover:text-foreground">Shop</Link></li>
              <li><Link to="/reviews" className="text-foreground/80 transition hover:text-foreground">Reviews</Link></li>
              <li><Link to="/addup" className="text-foreground/80 transition hover:text-foreground">Community</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Capabilities
            </div>
            <ul className="space-y-3 text-sm">
              <li className="text-foreground/80">Brand Identity</li>
              <li className="text-foreground/80">Motion & Video</li>
              <li className="text-foreground/80">UI / UX Design</li>
              <li className="text-foreground/80">Logistics Platforms</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Have a project?
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 p-4 text-sm transition hover:border-primary/60 hover:bg-card"
            >
              <span>
                <span className="block font-medium">Let's build something.</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">Reply in minutes on WhatsApp.</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Klassiq Grafikz Studios. All rights reserved.</p>
          <p className="font-mono tracking-wide">...we decorate the world.</p>
        </div>
      </div>
    </footer>
  );
}
