import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(80).optional(),
  message: z.string().trim().min(1).max(1000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_submissions").insert(parsed.data);
      if (error) throw error;
      toast.success("Message sent — we'll be in touch shortly.");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not send right now. Try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Say hello</div>
          <h1 className="mt-3 font-display text-5xl uppercase md:text-6xl">Let's Talk</h1>
          <p className="mt-4 text-muted-foreground">
            Tell us about your project. We reply fastest on WhatsApp — usually within minutes.
          </p>
          <div className="mt-8 space-y-3">
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">WhatsApp</div>
                <div className="text-xs text-muted-foreground">Fastest reply · 24/7</div>
              </div>
            </a>
            <a href="mailto:hello@klassiqgrafikz.com" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground"><Mail className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-xs text-muted-foreground">hello@klassiqgrafikz.com</div>
              </div>
            </a>
            <a href="tel:+10000000000" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">Call</div>
                <div className="text-xs text-muted-foreground">Mon–Sat, 9am–6pm</div>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-card-soft md:p-8">
          <h2 className="font-display text-2xl uppercase">Project Request</h2>
          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required maxLength={100} className="mt-1" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" maxLength={40} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <Input id="service" name="service" placeholder="e.g. Logo design" maxLength={80} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} required maxLength={1000} className="mt-1" />
            </div>
            <Button type="submit" disabled={submitting} className="w-full rounded-full gradient-primary text-primary-foreground shadow-glow">
              {submitting ? "Sending..." : (<>Send <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
