import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { reviews } from "@/lib/site-data";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Klassiq Grafikz" },
      { name: "description", content: "Read what clients say about Klassiq Grafikz Studios." },
      { property: "og:title", content: "Reviews — Klassiq Grafikz" },
      { property: "og:description", content: "Verified Google reviews from happy Klassiq Grafikz clients." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Word on the street</div>
          <h1 className="mt-3 font-display text-5xl uppercase md:text-7xl">Reviews</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Real people, real projects. Join hundreds of satisfied clients who trust Klassiq with their brand.
          </p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button className="rounded-full gradient-primary text-primary-foreground shadow-glow">
              Leave a Review
            </Button>
          </Link>
        </div>

        <div className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{r.body}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-display text-primary-foreground">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Verified · Google</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
