import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getSiteSettings } from "@/lib/cms.functions";

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
  const load = useServerFn(getSiteSettings);
  const { data } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => load() });

  const channels = [
    { href: data?.community_whatsapp_url || "https://wa.me/2347050495704", Icon: MessageCircle, title: "WhatsApp Channel", desc: "Daily inspiration drops and instant promo codes." },
    { href: data?.community_instagram_url || "https://instagram.com", Icon: Bell, title: "Instagram", desc: "Portfolio drops, reels and live design sessions." },
    { href: data?.community_telegram_url || "", Icon: Send, title: "Telegram Channel", desc: "Direct broadcasts, freebies and community chats." },
  ].filter((c) => !!c.href);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-16 text-center">
        <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium">Community</div>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Join the crew.</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">Free drops, design templates, behind-the-scenes, and first access to new services.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ href, Icon, title, desc }) => (
            <a key={title} href={href} target="_blank" rel="noreferrer" className="rounded-2xl border border-zinc-200 bg-white p-6 text-left hover:shadow-sm transition">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white"><Icon className="h-5 w-5" /></div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="mt-4 font-display text-base font-bold">{title}</div>
              <p className="mt-1 text-sm text-zinc-600">{desc}</p>
            </a>
          ))}
        </div>

        <Link to="/contact" className="mt-8 inline-flex rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium hover:bg-zinc-50">Or contact us directly</Link>
      </section>
    </SiteLayout>
  );
}
