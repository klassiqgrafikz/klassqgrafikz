import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground font-display text-lg shadow-glow">
              K
            </div>
            <div>
              <div className="font-display text-xl tracking-wide">Klassiq Grafikz</div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Creative Studio
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            We design, edit, animate &amp; advertise. From flyers and logos to
            shipping websites and flight-trackable tickets — we decorate the world.
          </p>
          <div className="mt-5 flex gap-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="mailto:hello@klassiqgrafikz.com" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/reviews" className="hover:text-primary">Reviews</Link></li>
            <li><Link to="/addup" className="hover:text-primary">AddUp</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Account</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/auth" className="hover:text-primary">Sign in</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Klassiq Grafikz Studios. All rights reserved.</p>
          <p>...we decorate the world..</p>
        </div>
      </div>
    </footer>
  );
}
