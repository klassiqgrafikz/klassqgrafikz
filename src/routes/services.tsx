import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
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

function ServicesPage() {
  const load = useServerFn(getSiteServices);
  const { data } = useQuery({ queryKey: ["cms", "services"], queryFn: () => load() });
  const services = (data && data.length > 0)
    ? data.map((s) => ({ title: s.title, subtitle: s.subtitle || "", popularity: s.popularity }))
    : fallbackServices;
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          Capabilities
        </div>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-7xl">
          Services built for ambitious brands.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          From a single flyer to a complete shipping platform — every service
          ships fast, looks premium, and is built to convert.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border/40 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/contact"
              className="group relative bg-card p-7 transition hover:bg-card/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-lg font-semibold">{s.title}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.subtitle}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-7 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full gradient-primary transition-all duration-500"
                    style={{ width: `${s.popularity}%` }}
                  />
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  {s.popularity}%
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-6 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur md:flex-row md:p-10">
          <div className="flex-1">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Don't see what you need?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We build custom creative and digital systems for brands and
              enterprise teams. Tell us what you have in mind.
            </p>
          </div>
          <Link to="/contact">
            <Button className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90">
              Request a custom quote
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
