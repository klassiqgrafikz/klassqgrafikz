import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const cards = [
  { to: "/admin/services", title: "Services", desc: "Add, edit or remove services on the homepage." },
  { to: "/admin/projects", title: "Selected Projects", desc: "Manage the featured project carousel." },
  { to: "/admin/reviews", title: "Reviews", desc: "Curate the testimonials shown on the homepage." },
  { to: "/admin/socials", title: "Social Media", desc: "Update WhatsApp, Instagram, Email and more." },
  { to: "/admin/branding", title: "Branding", desc: "Primary color and logo upload." },
  { to: "/admin/community", title: "Community", desc: "Telegram, WhatsApp and Instagram community links." },
  { to: "/admin/footer", title: "Footer", desc: "Edit copyright and tagline text." },
];

function AdminOverview() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage everything visitors see on your homepage.</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50"
          >
            <div className="font-display text-lg font-semibold">{c.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
