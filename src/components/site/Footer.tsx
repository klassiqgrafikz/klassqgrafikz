import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, Send, ArrowUpRight, Globe, Facebook, Twitter, Youtube, Phone, type LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSiteSettings, getSiteSocials } from "@/lib/cms.functions";
import klassiqLogo from "@/assets/hero-logo.jpeg";

const ICONS: Record<string, LucideIcon> = {
  MessageCircle, Instagram, Mail, Send, Facebook, Twitter, Youtube, Phone, Globe,
};

export function Footer() {
  const loadSettings = useServerFn(getSiteSettings);
  const loadSocials = useServerFn(getSiteSocials);
  const { data: settings } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => loadSettings() });
  const { data: socials = [] } = useQuery({ queryKey: ["cms", "socials"], queryFn: () => loadSocials() });

  const copyright = settings?.footer_copyright || `© ${new Date().getFullYear()} Klassiq Grafikz Studios. All rights reserved.`;
  const tagline = settings?.footer_tagline || "...we decorate the world.";

  return (
    <footer className="border-t border-zinc-200 bg-white">
      {/* newsletter strip like slatech */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-lg font-bold">Subscribe to our newsletter</div>
            <div className="mt-1 text-sm text-zinc-500">Get latest insights and updates — no spam.</div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm gap-2">
            <input placeholder="Enter your email" className="input h-10 flex-1 rounded-full bg-white" />
            <button className="rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-zinc-800">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={klassiqLogo} alt="Klassiq Grafikz" className="h-10 w-10 rounded-xl object-cover" />
              <div>
                <div className="font-display text-base font-bold tracking-tight">Klassiq Grafikz</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Creative Studio · est. 2019</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
              Turning ideas into powerful digital brands. We build fast, beautiful and secure websites that convert visitors into customers.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.slice(0, 5).map((s) => {
                  const Icon = ICONS[s.icon || "Globe"] || Globe;
                  return (
                    <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 hover:bg-black hover:text-white hover:border-black transition">
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-900">Our Services</div>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li><Link to="/services" className="hover:text-black">Website Design</Link></li>
              <li><Link to="/services" className="hover:text-black">E-Commerce</Link></li>
              <li><Link to="/services" className="hover:text-black">SEO</Link></li>
              <li><Link to="/services" className="hover:text-black">Hosting</Link></li>
              <li><Link to="/services" className="hover:text-black">Branding</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-900">Quick Links</div>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li><Link to="/" className="hover:text-black">Home</Link></li>
              <li><Link to="/services" className="hover:text-black">Services</Link></li>
              <li><Link to="/reviews" className="hover:text-black">Reviews</Link></li>
              <li><Link to="/shop" className="hover:text-black">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-900">Contact Us</div>
            <div className="space-y-2 text-sm text-zinc-600">
              <div>Lagos, Nigeria</div>
              <a href="tel:+2347050495704" className="block hover:text-black">+234 705 049 5704</a>
              <a href="mailto:klassiqgrafikz@gmail.com" className="block hover:text-black">klassiqgrafikz@gmail.com</a>
            </div>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium hover:bg-zinc-50">
              Get a Quote <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>{copyright}</p>
          <p>{tagline}</p>
        </div>
      </div>
    </footer>
  );
}
