import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Klassiq Grafikz" },
      { name: "description", content: "Start a creative project with Klassiq Grafikz — WhatsApp, email or phone." },
      { property: "og:title", content: "Contact — Klassiq Grafikz" },
      { property: "og:description", content: "Get in touch with Klassiq Grafikz Studios." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    Icon: MessageCircle,
    title: "WhatsApp",
    sub: "+234 705 049 5704",
    note: "Fastest reply · usually within minutes",
    href: "https://wa.me/2347050495704",
    featured: true,
  },
  {
    Icon: Mail,
    title: "Email",
    sub: "hello@klassiqgrafikz.com",
    note: "For briefs, proposals & invoices",
    href: "mailto:hello@klassiqgrafikz.com",
  },
  {
    Icon: Phone,
    title: "Call us",
    sub: "+234 705 049 5704",
    note: "Mon–Sat · 8am–10:30pm WAT",
    href: "tel:+2347050495704",
  },
];

function ContactPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          Say hello
        </div>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-7xl">
          Let's start something{" "}
          <span className="text-gradient">remarkable.</span>
        </h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Tell us about your brand, product or campaign. Pick the channel that
          suits you best — we reply fastest on WhatsApp.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {channels.map(({ Icon, title, sub, note, href, featured }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`group relative flex flex-col justify-between rounded-3xl border p-7 transition hover:-translate-y-1 ${
                featured
                  ? "border-primary/40 bg-card ring-glow"
                  : "border-border bg-card/60 hover:border-primary/50"
              }`}
            >
              <div>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-6 font-display text-xl font-semibold">{title}</div>
                <div className="mt-1 text-sm text-foreground/90">{sub}</div>
                <div className="mt-2 text-xs text-muted-foreground">{note}</div>
              </div>
              <ArrowUpRight className="mt-8 h-4 w-4 text-muted-foreground transition group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-3xl border border-border bg-card/40 p-7 backdrop-blur md:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Studio base</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Lagos, Nigeria — serving clients worldwide.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Studio hours</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Mon–Sat · 8:00am – 10:30pm WAT
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
