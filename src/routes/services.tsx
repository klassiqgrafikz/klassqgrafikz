import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Klassiq Grafikz" },
      { name: "description", content: "Flyers, logos, birthday designs, shipping websites, flight tickets, banners, photo & video editing and more." },
      { property: "og:title", content: "Services — Klassiq Grafikz" },
      { property: "og:description", content: "Full service list from Klassiq Grafikz Studios." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">What we offer</div>
        <h1 className="mt-3 font-display text-5xl uppercase md:text-7xl">Our Services</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From a single flyer to a full shipping platform — every service below ships fast and looks premium.
          Tap any card to start a request.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/contact"
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div className="font-display text-xl uppercase">{s.title}</div>
                <div className="font-display text-2xl text-primary">{s.popularity}%</div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full gradient-primary" style={{ width: `${s.popularity}%` }} />
              </div>
              <div className="mt-4 flex items-center text-xs text-primary opacity-0 transition group-hover:opacity-100">
                Request now <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact">
            <Button size="lg" className="rounded-full gradient-primary text-primary-foreground shadow-glow">
              Get a Custom Quote
            </Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
