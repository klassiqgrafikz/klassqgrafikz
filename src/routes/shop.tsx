import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
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
      <section className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <div className="grid mx-auto h-16 w-16 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-5xl uppercase md:text-7xl">Shop</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Our storefront is being stocked with templates, merch and ready-made design assets.
          Want a sneak peek? Contact us on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact">
            <Button className="rounded-full gradient-primary text-primary-foreground shadow-glow">
              Notify Me
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" className="rounded-full">Browse Services</Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
