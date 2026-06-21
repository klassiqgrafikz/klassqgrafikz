import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { reviews } from "@/lib/site-data";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Klassiq Grafikz" },
      { name: "description", content: "Verified client reviews of Klassiq Grafikz Studios from around the world." },
      { property: "og:title", content: "Reviews — Klassiq Grafikz" },
      { property: "og:description", content: "Real reviews from clients of Klassiq Grafikz Studios." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Word on the street
          </div>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-7xl">
            Trusted by 320+ brands.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Real people, real projects — from Lagos and Accra to London and Toronto.
          </p>
          <Link to="/contact" className="mt-7 inline-block">
            <Button className="h-11 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90">
              Leave a review
            </Button>
          </Link>
        </div>

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-3xl border border-border bg-card/60 p-7 backdrop-blur transition hover:border-primary/50"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-relaxed text-foreground/90">
                "{r.body}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {r.location}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
