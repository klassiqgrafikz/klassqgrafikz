import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, MessageCircle, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/addup")({
  head: () => ({
    meta: [
      { title: "AddUp — Klassiq Grafikz" },
      { name: "description", content: "Join the Klassiq community for exclusive drops, design tips and updates." },
      { property: "og:title", content: "AddUp — Klassiq Grafikz" },
      { property: "og:description", content: "Stay in the loop with the Klassiq creative community." },
    ],
  }),
  component: AddUpPage,
});

function AddUpPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" /> AddUp Community
        </div>
        <h1 className="mt-4 font-display text-5xl uppercase md:text-7xl">Join the Crew</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Free drops, design templates, behind-the-scenes and first access to new
          Klassiq services. Pick your channel.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="group rounded-3xl border border-border bg-card p-8 text-left transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow">
            <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="mt-5 font-display text-2xl uppercase">WhatsApp Channel</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Daily inspiration drops and instant promo codes.
            </p>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group rounded-3xl border border-border bg-card p-8 text-left transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow">
            <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
              <Bell className="h-5 w-5" />
            </div>
            <div className="mt-5 font-display text-2xl uppercase">Instagram</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Portfolio drops, reels and live design sessions.
            </p>
          </a>
        </div>

        <Link to="/contact" className="mt-10 inline-block">
          <Button variant="outline" className="rounded-full">Or contact us directly</Button>
        </Link>
      </section>
    </SiteLayout>
  );
}
