import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
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
  { Icon: MessageCircle, title: "WhatsApp", sub: "+234 705 049 5704", note: "Fastest reply · usually within minutes", href: "https://wa.me/2347050495704" },
  { Icon: Mail, title: "Email", sub: "klassiqgrafikz@gmail.com", note: "For briefs, proposals & invoices", href: "mailto:klassiqgrafikz@gmail.com" },
  { Icon: Phone, title: "Call us", sub: "+234 705 049 5704", note: "Mon–Sat · 8am–10:30pm WAT", href: "tel:+2347050495704" },
];

function ContactPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Get In Touch</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Start Your Project Today</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">Tell us about your brand — we reply within 24 hours with a free quote.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {channels.map(({ Icon, title, sub, note, href }) => (
            <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-sm transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white"><Icon className="h-5 w-5" /></div>
              <div className="mt-4 font-display text-base font-bold">{title}</div>
              <div className="mt-1 text-sm font-medium">{sub}</div>
              <div className="mt-1 text-xs text-zinc-500">{note}</div>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-2 md:p-8">
          <div>
            <div className="text-sm font-bold">Contact Information</div>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0" /><div><div className="font-medium">Our Office</div><div className="text-zinc-600">Lagos, Nigeria — serving clients worldwide.</div></div></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 shrink-0" /><div><div className="font-medium">Phone / WhatsApp</div><a href="tel:+2347050495704" className="text-zinc-600 hover:text-black">+234 705 049 5704</a></div></div>
              <div className="flex gap-3"><Mail className="h-5 w-5 shrink-0" /><div><div className="font-medium">Email</div><a href="mailto:klassiqgrafikz@gmail.com" className="text-zinc-600 hover:text-black">klassiqgrafikz@gmail.com</a></div></div>
              <div className="flex gap-3"><Clock className="h-5 w-5 shrink-0" /><div><div className="font-medium">Business Hours</div><div className="text-zinc-600">Mon–Fri 8am–6pm · Sat 9am–3pm</div></div></div>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <input placeholder="First Name *" className="input h-11 rounded-xl" />
              <input placeholder="Last Name *" className="input h-11 rounded-xl" />
            </div>
            <input placeholder="Email Address *" className="input h-11 rounded-xl" />
            <input placeholder="Phone Number" className="input h-11 rounded-xl" />
            <select className="input h-11 rounded-xl bg-white"><option>Service Needed — Select a service</option><option>Website Design</option><option>Branding</option><option>E-Commerce</option></select>
            <textarea placeholder="Your Message *" rows={4} className="input rounded-xl" />
            <button className="h-11 rounded-full bg-black text-sm font-medium text-white hover:bg-zinc-800">Send Message</button>
            <div className="text-center text-xs text-zinc-500">We respond within 24 hours. Your information is safe.</div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
