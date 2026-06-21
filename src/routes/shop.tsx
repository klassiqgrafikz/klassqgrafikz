import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Klassiq Grafikz" },
      { name: "description", content: "Klassiq Grafikz storefront — design templates, merch and ready-made assets." },
      { property: "og:title", content: "Shop — Klassiq Grafikz" },
      { property: "og:description", content: "Coming soon: Klassiq Grafikz storefront." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-mesh p-10 text-center md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-60" />
          <div className="relative">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Coming soon
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              The Klassiq Shop
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We're stocking the storefront with design templates, brand kits,
              merch and ready-made assets. Get on the list, or grab a sneak
              peek on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact">
                <Button className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90">
                  Notify me
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="h-12 rounded-full border-border bg-card/40 px-6 text-sm font-medium backdrop-blur">
                  Browse services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
