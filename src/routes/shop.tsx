import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

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
      <section className="mx-auto max-w-3xl px-6 pt-10 pb-16">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-10 text-center md:p-14">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">Coming soon</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">The Klassiq Shop</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">We're stocking the storefront with design templates, brand kits, merch and ready-made assets. Get on the list, or grab a sneak peek on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact"><span className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-zinc-800">Notify me <ArrowUpRight className="h-4 w-4" /></span></Link>
            <Link to="/services"><span className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium hover:bg-zinc-50">Browse services</span></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
