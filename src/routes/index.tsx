import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Sparkles,
  Palette,
  Film,
  Brush,
  Layers,
  MonitorSmartphone,
  Truck,
  Plane,
  Compass,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Rocket,
  Send,
  CheckCircle2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BootLoader } from "@/components/site/BootLoader";
import { Button } from "@/components/ui/button";
import { reviews as fallbackReviews } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPinnedReviews, getSiteProjects } from "@/lib/cms.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klassiq Grafikz — Brand, Motion & Digital Studio" },
      {
        name: "description",
        content:
          "A multidisciplinary creative studio designing brands, motion, digital products and logistics platforms that move businesses forward.",
      },
      { property: "og:title", content: "Klassiq Grafikz — Brand, Motion & Digital Studio" },
      {
        property: "og:description",
        content:
          "We design brands, experiences and digital solutions that move businesses forward.",
      },
    ],
  }),
  component: Home,
});

const capabilities = [
  { Icon: Brush, title: "Brand Identity", desc: "Logos, systems, guidelines." },
  { Icon: Palette, title: "Graphic Design", desc: "Flyers, social, print." },
  { Icon: Film, title: "Video & Motion", desc: "Reels, ads, lipsyncs." },
  { Icon: PenTool, title: "Digital Portraits", desc: "Editorial illustrations." },
  { Icon: MonitorSmartphone, title: "UI / UX Design", desc: "Web & product design." },
  { Icon: Truck, title: "Logistics Platforms", desc: "Trackable shipping sites." },
  { Icon: Plane, title: "Shipping Documents", desc: "Flight tickets, manifests." },
  { Icon: Layers, title: "Corporate Creative", desc: "Decks, reports, kits." },
];

const fallbackProjects = [
  { src: "/images/project-1.jpg", alt: "Business registration project display", tag: "Corporate" },
  { src: "/images/project-2.png", alt: "Nebiz Cakes n Events design project", tag: "Branding" },
  { src: "/images/project-3.png", alt: "Edited client photo for Klassiq Grafikz", tag: "Portrait" },
  { src: "/images/project-4.png", alt: "Document printing and delivery design project", tag: "Print" },
  { src: "/images/project-5.jpg", alt: "Gift cards for cash promotional design", tag: "Campaign" },
  { src: "/images/project-6.png", alt: "Client gift surprise promotional design", tag: "Social" },
  { src: "/images/project-7.png", alt: "Creative satisfaction campaign design", tag: "Editorial" },
  { src: "/images/project-8.png", alt: "International shipment sites design project", tag: "Logistics" },
  { src: "/images/project-9.png", alt: "Outreach awakening event flyer design", tag: "Event" },
];

const processSteps = [
  { n: "01", title: "Discovery", desc: "We listen, audit, and align on the real problem.", Icon: Compass },
  { n: "02", title: "Strategy", desc: "Positioning, scope, references and creative direction.", Icon: PenTool },
  { n: "03", title: "Design", desc: "Concepts iterated against brand and business goals.", Icon: Brush },
  { n: "04", title: "Build", desc: "Production-grade assets, motion, or shipping platforms.", Icon: Rocket },
  { n: "05", title: "Delivery", desc: "Files, training, launch support, and ongoing care.", Icon: Send },
];

const stats = [
  { value: 850, suffix: "+", label: "Projects shipped" },
  { value: 320, suffix: "+", label: "Clients served" },
  { value: 18, suffix: "", label: "Countries reached" },
  { value: 5, suffix: "+", label: "Years in studio" },
];

function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <SiteLayout>
        <Hero />
        <Marquee />
        <Capabilities />
        <ProjectShowcase />
        <Process />
        <Stats />
        <Testimonials />
        <CTASection />
      </SiteLayout>
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto mt-10 max-w-6xl px-6 pt-10 md:pt-20">
      {/* Floating ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-10 h-72 w-72 rounded-full bg-primary-glow/15 blur-3xl animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          Multidisciplinary creative studio
        </div>

        <h1 className="mt-7 max-w-5xl font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl lg:text-[5.5rem]">
          Designing brands, experiences{" "}
          <span className="text-gradient">&amp; digital solutions</span>{" "}
          that move businesses forward.
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Klassiq Grafikz is a creative studio crafting identity systems, motion,
          digital products, and logistics platforms for ambitious brands across
          the world.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link to="/contact">
            <Button
              size="lg"
              className="group h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Start a project
              <ArrowUpRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-card/40 px-6 text-sm font-medium backdrop-blur hover:bg-card"
            >
              Explore services
            </Button>
          </Link>

          <div className="ml-2 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["IS", "OJ", "CO", "AB"].map((i, idx) => (
                <div
                  key={i}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-background gradient-primary text-[10px] font-semibold text-primary-foreground"
                  style={{ zIndex: 10 - idx }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-xs leading-tight">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <div className="mt-0.5 text-muted-foreground">320+ happy clients</div>
            </div>
          </div>
        </div>

        {/* Featured strip */}
        <div className="mt-16 grid gap-3 rounded-3xl border border-border bg-card/40 p-3 backdrop-blur md:grid-cols-3">
          {[
            { k: "Avg. delivery", v: "48h", s: "rapid creative cycles" },
            { k: "Client retention", v: "92%", s: "repeat partnerships" },
            { k: "Disciplines", v: "08+", s: "brand · motion · product" },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-2xl bg-surface/60 p-5"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {m.k}
              </div>
              <div className="mt-2 font-display text-3xl font-semibold tracking-tight">{m.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Brand Identity",
    "Motion Design",
    "Digital Portraits",
    "UI/UX",
    "Shipping Platforms",
    "Video Ads",
    "Editorial",
    "Print",
    "Social Campaigns",
    "Corporate Decks",
  ];
  const row = [...words, ...words];
  return (
    <section className="relative mt-24 overflow-hidden border-y border-border/60 bg-surface/30 py-6">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <div key={i} className="flex items-center gap-12 font-display text-2xl font-semibold tracking-tight text-foreground/40 md:text-3xl">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid items-end gap-6 md:grid-cols-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            What we do
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Eight disciplines.{" "}
            <span className="text-muted-foreground">One studio.</span>
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          From a single flyer to a full shipping platform — every engagement is
          treated with the same attention to craft, strategy and finish.
        </p>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border/40 md:grid-cols-2 lg:grid-cols-4">
        {capabilities.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="group relative bg-card p-7 transition hover:bg-card/60"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-5 font-display text-lg font-semibold">{title}</div>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-muted-foreground/40 transition group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const loadProjects = useServerFn(getSiteProjects);
  const { data: dbProjects } = useQuery({ queryKey: ["cms", "projects"], queryFn: () => loadProjects() });
  const projectSlides = (dbProjects && dbProjects.length > 0)
    ? dbProjects.map((p) => ({ src: p.image_url, alt: p.alt || "", tag: p.tag || "" }))
    : fallbackProjects;

  useEffect(() => {
    if (projectSlides.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [projectSlides.length]);

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Featured work
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Selected projects
          </h2>
        </div>
        <Link
          to="/services"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          View capabilities
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card/60 p-3 shadow-card-soft backdrop-blur md:p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface/60">
          <div
            className="flex h-full transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projectSlides.map((slide, index) => (
              <div key={slide.src} className="relative h-full min-w-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-contain"
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {slide.tag}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() =>
              setActiveIndex((c) => (c - 1 + projectSlides.length) % projectSlides.length)
            }
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition hover:bg-background hover:text-primary md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setActiveIndex((c) => (c + 1) % projectSlides.length)}
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition hover:bg-background hover:text-primary md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 px-2">
          <div className="text-xs text-muted-foreground">
            <span className="font-mono text-foreground">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>{" "}
            / {String(projectSlides.length).padStart(2, "0")}
          </div>
          <div className="flex items-center gap-1.5">
            {projectSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-8 bg-primary" : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid items-end gap-6 md:grid-cols-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            How we work
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            A clear process.{" "}
            <span className="text-muted-foreground">Predictable outcomes.</span>
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Every engagement runs on the same five-stage rhythm — so you always
          know what's happening, when, and why.
        </p>
      </div>

      <ol className="mt-12 grid gap-4 md:grid-cols-5">
        {processSteps.map(({ n, title, desc, Icon }, i) => (
          <li
            key={n}
            className="relative rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-muted-foreground">{n}</div>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-6 font-display text-lg font-semibold">{title}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
            {i < processSteps.length - 1 && (
              <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 bg-gradient-to-r from-primary/40 to-transparent md:block" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function useCountUp(target: number, durationMs = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return { ref, val };
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, val } = useCountUp(value);
  return (
    <div ref={ref} className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur">
      <div className="font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
        {val}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const loadReviews = useServerFn(getPinnedReviews);
  const { data: dbReviews } = useQuery({ queryKey: ["cms", "reviews"], queryFn: () => loadReviews() });
  const reviews = (dbReviews && dbReviews.length > 0)
    ? dbReviews.map((r) => ({ initials: r.initials, name: r.name, location: r.location || "", body: r.body }))
    : fallbackReviews;

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = window.setInterval(() => {
      setActive((c) => (c + 1) % reviews.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="mx-auto mt-28 max-w-5xl px-6">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          Trusted globally
        </div>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          What clients say
        </h2>
      </div>

      <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-card/60 shadow-card-soft backdrop-blur">
        <div
          className="flex transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {reviews.map((r) => (
            <figure key={r.name} className="min-w-full px-8 py-14 md:px-16 md:py-20">
              <div className="flex flex-col items-center text-center">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-7 max-w-2xl font-display text-xl font-medium leading-snug text-foreground md:text-2xl">
                  "{r.body}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground shadow-glow">
                    {r.initials}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {r.location}
                    </div>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {reviews.map((r, index) => (
          <button
            key={r.name}
            type="button"
            aria-label={`Show review ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              active === index ? "w-8 bg-primary" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/reviews" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary">
          Read all reviews <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-mesh p-10 text-center md:p-20">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            Now booking Q1 projects
          </div>
          <h2 className="relative mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl lg:text-7xl">
            Ready to build something{" "}
            <span className="text-gradient">exceptional?</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Tell us about your brand, product, or campaign. We reply within
            minutes on WhatsApp and ship pilots in days, not months.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button
                size="lg"
                className="group h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Start a project
                <ArrowUpRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-background/40 px-6 text-sm font-medium backdrop-blur"
              >
                View services
              </Button>
            </Link>
          </div>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {["Free discovery call", "NDA on request", "Worldwide delivery"].map((t) => (
              <div key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
