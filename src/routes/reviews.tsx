import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
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
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Word on the street</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Trusted by 500+ brands.</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">Real people, real projects — from Lagos and Accra to London and Toronto.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Leave a review</Link>
          <div className="mt-3 text-xs text-zinc-500">5.0 · 168 Google Reviews</div>
        </div>

        <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex gap-0.5 text-black">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-black" />))}</div>
              <blockquote className="mt-4 text-sm leading-relaxed">"{r.body}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-black text-xs font-bold text-white">{r.initials}</div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-[11px] uppercase tracking-widest text-zinc-500">{r.location}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
