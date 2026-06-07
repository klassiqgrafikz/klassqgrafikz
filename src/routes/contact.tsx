import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Klassiq Grafikz" },
      { name: "description", content: "Get in touch with Klassiq Grafikz on WhatsApp, Instagram or via the contact form." },
      { property: "og:title", content: "Contact — Klassiq Grafikz" },
      { property: "og:description", content: "Start a creative project with Klassiq Grafikz Studios." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {

  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Say hello</div>
          <h1 className="mt-3 font-display text-5xl uppercase md:text-6xl">Let's Talk</h1>
          <p className="mt-4 text-muted-foreground">
            Tell us about your project. We reply fastest on WhatsApp — usually within minutes.
          </p>
          <div className="mt-8 space-y-3">
            <a href="https://wa.me/+2347050495704" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">WhatsApp</div>
                <div className="text-xs text-muted-foreground">+234 705 049 5704 · Fastest reply · 24/7</div>
              </div>
            </a>
            <a href="mailto:klassiqgrafikz.com" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground"><Mail className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-xs text-muted-foreground">klassiqgrafikz.com</div>
              </div>
            </a>
            <a href="tel:+2347050495704" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">Call</div>
                <div className="text-xs text-muted-foreground">07050495704 · Mon–Sat, 8am–10:30pm</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
