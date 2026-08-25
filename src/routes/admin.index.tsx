import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const cards = [
  { to: "/admin/hero", title: "Hero", desc: "Edit hero badge, title (typewriter) and subtitle." },
  { to: "/admin/stats", title: "Stats", desc: "Edit the 4 animated numbers under the hero." },
  {
    to: "/admin/services",
    title: "Services",
    desc: "Add, edit or remove services on the homepage.",
  },
  {
    to: "/admin/projects",
    title: "Selected Projects",
    desc: "Manage the featured project carousel.",
  },
  {
    to: "/admin/reviews",
    title: "Reviews",
    desc: "Curate the testimonials shown on the homepage.",
  },
  { to: "/admin/whychoose", title: "Why Choose Us", desc: "Edit the 6 cards in 'Several Things Define Us'." },
  {
    to: "/admin/socials",
    title: "Social Media",
    desc: "Update WhatsApp, Instagram, Email and more.",
  },
  { to: "/admin/branding", title: "Branding", desc: "Primary color and logo upload (color now live again)." },
  {
    to: "/admin/community",
    title: "Community",
    desc: "Telegram, WhatsApp and Instagram community links.",
  },
  { to: "/admin/footer", title: "Footer", desc: "Edit copyright and tagline text." },
];

function AdminOverview() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Good to see you again 👋
      </h1>
      <p className="mt-1 max-w-lg text-sm text-muted-foreground">
        What are we updating today? Pick a section — every change saves straight to the live site.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-card-soft transition hover:-translate-y-0.5 hover:border-primary/50"
          >
            <div className="font-display text-lg font-semibold">{c.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
