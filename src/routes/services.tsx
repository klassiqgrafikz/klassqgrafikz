import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { services as fallbackServices } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSiteServices } from "@/lib/cms.functions";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Klassiq Grafikz" },
      { name: "description", content: "Brand identity, motion, digital portraits, UI/UX, shipping platforms and corporate creative." },
      { property: "og:title", content: "Services — Klassiq Grafikz" },
      { property: "og:description", content: "Full creative & technical capabilities from Klassiq Grafikz Studios." },
    ],
  }),
  component: ServicesPage,
});

const bullets: Record<string, string[]> = {
  "Flyer Designs": ["Event & promo flyers", "Social creatives", "Print-ready exports"],
  "Logos & Branding": ["Identity systems", "Brand guidelines", "Logo variations"],
  "Shipping Websites": ["Trackable shipping", "E-commerce ready", "Admin dashboard"],
};

function ServicesPage() {
  const load = useServerFn(getSiteServices);
  const { data } = useQuery({ queryKey: ["cms", "services"], queryFn: () => load() });
  const services = (data && data.length > 0)
    ? data.map((s) => ({ title: s.title, subtitle: s.subtitle || "", popularity: s.popularity }))
    : fallbackServices;
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Our Services</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">What We Offer</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">From stunning designs to powerful e-commerce solutions — everything you need to succeed online.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white"><Check className="h-5 w-5" /></div>
              <div className="mt-4 font-display text-base font-bold">{s.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{s.subtitle}</p>
              {(bullets[s.title] || ["Custom tailored", "Fast delivery", "Premium quality"]).slice(0,3).map((b) => (
                <div key={b} className="mt-2 flex items-center gap-2 text-xs text-zinc-600"><span className="h-1 w-1 rounded-full bg-black" />{b}</div>
              ))}
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">Learn more <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:flex-row md:p-8">
          <div>
            <h3 className="font-display text-xl font-bold">Don't see what you need?</h3>
            <p className="mt-1 text-sm text-zinc-600">We build custom creative and digital systems. Tell us what you have in mind.</p>
          </div>
          <Link to="/contact">
            <span className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800">Request a custom quote <ArrowUpRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
