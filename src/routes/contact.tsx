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
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("contact_submissions")
        .insert({ ...parsed.data, user_id: user?.id ?? null });
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
