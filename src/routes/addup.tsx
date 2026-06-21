import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, MessageCircle, Sparkles, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/addup")({
  head: () => ({
    meta: [
      { title: "Community — Klassiq Grafikz" },
      { name: "description", content: "Join the Klassiq community for exclusive drops, design tips and first-access updates." },
      { property: "og:title", content: "Community — Klassiq Grafikz" },
      { property: "og:description", content: "Stay in the loop with the Klassiq creative community." },
    ],
  }),
  component: AddUpPage,
});

function AddUpPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" /> Community
        </div>
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight md:text-7xl">
          Join the crew.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Free drops, design templates, behind-the-scenes, and first access to
          new Klassiq services. Pick your channel.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <a
            href="https://wa.me/2347050495704"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-border bg-card/60 p-8 text-left backdrop-blur transition hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="mt-6 font-display text-xl font-semibold">WhatsApp Channel</div>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Daily inspiration drops and instant promo codes.
            </p>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-border bg-card/60 p-8 text-left backdrop-blur transition hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Bell className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="mt-6 font-display text-xl font-semibold">Instagram</div>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Portfolio drops, reels and live design sessions.
            </p>
          </a>
        </div>

        <Link to="/contact" className="mt-10 inline-block">
          <Button variant="outline" className="h-11 rounded-full">
            Or contact us directly
          </Button>
        </Link>
      </section>
    </SiteLayout>
  );
}
