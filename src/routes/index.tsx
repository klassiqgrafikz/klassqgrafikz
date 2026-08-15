import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Expand, MessageCircle, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BootLoader } from "@/components/site/BootLoader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/lib/Reveal";
import { reviews as fallbackReviews } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPinnedReviews, getSiteProjects, getSiteSettings } from "@/lib/cms.functions";
import useEmblaCarousel from "embla-carousel-react";
import kgLogo from "@/assets/kg-logo.jpg.asset.json";


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

const services = [
  { title: "Brand Identity", desc: "Logos, identity systems and brand guidelines.", img: "/images/project-2.png" },
  { title: "Graphic Design", desc: "Flyers, social creatives and print design.", img: "/images/project-4.png" },
  { title: "Video & Motion", desc: "Reels, adverts and animated brand content.", img: "/images/project-5.jpg" },
  { title: "Digital Portraits", desc: "Editorial illustrations and digital art.", img: "/images/project-3.png" },
  { title: "UI / UX Design", desc: "Web and product interface design.", img: "/images/project-7.png" },
  { title: "Web & Logistics Platforms", desc: "Trackable shipping and e-commerce sites.", img: "/images/project-8.png" },
  { title: "Corporate Creative", desc: "Company profiles, decks and documents.", img: "/images/project-1.jpg" },
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

const bands = [
  {
    title: "Effective Brand Identity & Visual Identity",
    desc: "Let's walk you through an amazing journey of effective Brand Identity & Visual Identity for your business / organization. We are good at what we do.",
    flipped: false,
  },
  {
    title: "Quality Motion, Video & Digital Portraits",
    desc: "Let's help you drive engagement and sales with quality motion, video and digital portraits, looking through the lens of your customers. We are good at what we do.",
    flipped: true,
  },
  {
    title: "Beautiful & Functional Web & Logistics Platforms",
    desc: "Your website and shipping platform can help you make more sales. Let's create lively, beautiful and functional platforms that help your business drive more sales. We are good at what we do.",
    flipped: false,
  },
];

function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <SiteLayout>
        <Hero />
        <Welcome />
        <ShowcaseBands />
        <ServicesSection />
        <PortfolioGrid />
        <AboutBand />
        <AboutUs />
        <Testimonials />
        <LetsConnect />
      </SiteLayout>
      <FloatingChannels />
    </>
  );
}

function FloatingChannels() {
  const loadSettings = useServerFn(getSiteSettings);
  const { data: settings } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => loadSettings() });
  const whatsapp = settings?.community_whatsapp_url || "https://wa.me/";
  const telegram = settings?.community_telegram_url || "https://t.me/";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
      </a>
      <a
        href={telegram}
        target="_blank"
        rel="noreferrer"
        aria-label="Join our Telegram"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#229ED9] text-white shadow-glow transition hover:scale-110"
      >
        <Send className="h-6 w-6" />
      </a>
    </div>
  );
}

function useScrollRotate(speed = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotate(${window.scrollY * speed}deg)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

function SectionBar() {
  return (
    <div className="h-[6px] w-[181px] rounded-full bg-gradient-to-r from-primary to-primary/30" />
  );
}

function Hero() {
  const rotateRef = useScrollRotate(0.12);

  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pt-10 pb-16 md:min-h-[80vh]">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-10 h-72 w-72 rounded-full bg-primary-glow/15 blur-3xl animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        ref={rotateRef}
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[16%] hidden h-40 w-40 rounded-full border border-dashed border-primary/25 md:block"
      />

      <div className="relative">
        <Reveal delay={80}>
          <SectionBar />
          <h1 className="mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-7xl">
            Welcome to Klassiq Grafikz
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We make branding easy, fulfilling and rewarding for you.
          </p>
          <div className="mt-9">
            <Link to="/contact">
              <Button
                size="lg"
                className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:bg-foreground/90"
              >
                Start A Project
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Welcome() {
  const loadSettings = useServerFn(getSiteSettings);
  const { data: settings } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => loadSettings() });
  const heroLogo = settings?.logo_url || kgLogo.url;
  const rotateRef = useScrollRotate(-0.1);

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionBar />
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Welcome
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Klassiq Grafikz is coined from two words: <strong className="font-semibold text-foreground underline decoration-primary/60 decoration-2 underline-offset-4">Klassic</strong> &{" "}
            <strong className="font-semibold text-foreground underline decoration-primary/60 decoration-2 underline-offset-4">Graphics</strong>.
            We started with the mindset of rendering klassic (best) graphic design services. With
            this "Klassic" mindset we have evolved into an agency that provides{" "}
            <strong className="font-semibold text-foreground underline decoration-primary/60 decoration-2 underline-offset-4">Innovative Branding</strong>,
            motion and digital solutions for businesses, organisations and individuals.
          </p>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">Feel at home, Welcome.</p>
        </Reveal>

        <Reveal direction="zoom" delay={150} className="relative mx-auto w-full max-w-sm">
          <div
            ref={rotateRef}
            aria-hidden
            className="pointer-events-none absolute -inset-9 rounded-full border border-dashed border-primary/25"
          />
          <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/20 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/60 p-5 shadow-card-soft backdrop-blur">
            <img
              src={heroLogo}
              alt="Klassiq Grafikz logo"
              className="mx-auto aspect-square w-full rounded-[1.5rem] object-cover animate-blink"
            />
            <div className="mt-4 text-center">
              <div className="font-display text-lg font-semibold tracking-tight">Klassiq Grafikz</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Design · Editing · Innovation
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ShowcaseBands() {
  return (
    <section className="mt-28 flex flex-col gap-24">
      {bands.map((b) => (
        <div key={b.title} className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center px-6 md:grid-cols-2">
          <div className={b.flipped ? "md:order-1 md:col-start-2" : ""} />
          <Reveal
            direction={b.flipped ? "left" : "right"}
            className={b.flipped ? "md:order-2 md:col-start-1 md:row-start-1" : "md:col-start-2"}
          >
            <SectionBar />
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {b.title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {b.desc}
            </p>
            <div className="mt-7">
              <Link to="/services">
                <Button
                  size="lg"
                  className="h-11 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <Reveal>
        <SectionBar />
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Our Services
        </h2>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-[0.3em] text-primary">
          | Branding |
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Our core service is Branding which is subdivided into these services:
        </p>
      </Reveal>

      <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 100}>
            <div className="group">
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card/60 p-2.5 shadow-card-soft backdrop-blur transition duration-300 group-hover:-translate-y-1">
                <div className="overflow-hidden rounded-[1.25rem]">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    draggable={false}
                    className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-semibold">{s.title}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{s.desc}</div>
                </div>
                <Link to="/services">
                  <Button className="btn-winona h-11 rounded-full bg-primary px-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground hover:bg-primary/90">
                    <span className="btn-label">{s.title}</span>
                    <span className="btn-label-alt" aria-hidden>
                      Let's Go!
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <p className="text-sm text-muted-foreground md:text-base">Learn more about our services</p>
        <div className="mt-4">
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border px-8 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-card"
            >
              Our Services
            </Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function PortfolioGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const loadProjects = useServerFn(getSiteProjects);
  const { data: dbProjects } = useQuery({ queryKey: ["cms", "projects"], queryFn: () => loadProjects() });
  const projectSlides = (dbProjects && dbProjects.length > 0)
    ? dbProjects.map((p) => ({ src: p.image_url, alt: p.alt || "", tag: p.tag || "" }))
    : fallbackProjects;

  const go = (delta: number) =>
    setActiveIndex((c) => (c + delta + projectSlides.length) % projectSlides.length);

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <Reveal>
        <SectionBar />
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Some of Our Best Works
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projectSlides.map((slide, index) => (
          <Reveal key={slide.src} delay={(index % 3) * 80}>
            <button
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setLightboxOpen(true);
              }}
              aria-label={`View project: ${slide.alt}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-border bg-card/60 p-2.5 text-left backdrop-blur transition hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface/60">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-cover select-none transition duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {slide.tag}
                </div>
                <div className="absolute inset-0 grid place-items-center bg-background/40 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
                    <Expand className="h-3.5 w-3.5 text-primary" />
                    View
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <Link to="/services">
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border px-8 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-card"
          >
            View Portfolio
          </Button>
        </Link>
      </Reveal>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-4xl border-border bg-background/95 p-0 backdrop-blur sm:rounded-[1.5rem]"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.5rem] bg-surface/60">
            <img
              src={projectSlides[activeIndex]?.src}
              alt={projectSlides[activeIndex]?.alt || "Project"}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <DialogTitle className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                {projectSlides[activeIndex]?.tag || "Project"}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm font-medium text-foreground">
                {projectSlides[activeIndex]?.alt}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-2 text-xs text-muted-foreground">
                <span className="font-mono text-foreground">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>{" "}
                / {String(projectSlides.length).padStart(2, "0")}
              </div>
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => go(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => go(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function AboutBand() {
  const ringRef = useScrollRotate(0.1);
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <Reveal direction="zoom" className="relative mx-auto w-full max-w-2xl">
        <div
          ref={ringRef}
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-dashed border-primary/30"
        />
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border">
          <img
            src="/images/project-1.jpg"
            alt="Behind the scenes at Klassiq Grafikz"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

function useCountUp(target: number, durationMs = 2000) {
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

function AboutUs() {
  const { ref, val } = useCountUp(850);

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid grid-cols-1 items-start md:grid-cols-2">
        <div />
        <Reveal direction="left">
          <SectionBar />
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            About Us
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            We are a team of strategists, designers and creative technologists. We harness our
            skills to provide innovative and unconventional branding, design and digital solutions
            for businesses, organizations and individuals.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Our passion for creative works and experience in modern technologies aid us to create
            strategic, beautiful and practical designs, motion and digital platforms for our
            clients. These influence the growth, reputation and sustainability of their enterprise.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Our{" "}
            <Link to="/services" className="font-medium text-primary no-underline">
              Portfolio
            </Link>{" "}
            reflects what we can do for you.
          </p>

          <div ref={ref} className="mt-10 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Projects Completed
            </div>
            <div className="mt-2 font-display text-6xl font-semibold tracking-tight text-foreground">
              {val}
              <span className="text-primary">+</span>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border px-8 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-card"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [active, setActive] = useState(0);
  const loadReviews = useServerFn(getPinnedReviews);
  const { data: dbReviews } = useQuery({ queryKey: ["cms", "reviews"], queryFn: () => loadReviews() });
  const reviews = (dbReviews && dbReviews.length > 0)
    ? dbReviews.map((r) => ({ initials: r.initials, name: r.name, location: r.location || "", body: r.body }))
    : fallbackReviews;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <Reveal>
        <SectionBar />
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          What Our Clients Say
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative mt-12">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-7">
              {reviews.map((r) => (
                <figure
                  key={r.name}
                  className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-14px)] rounded-[2rem] border border-border bg-card/60 p-8 shadow-card-soft backdrop-blur md:p-10"
                >
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-lg font-medium leading-snug text-foreground md:text-xl">
                    "{r.body}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground shadow-glow">
                      {r.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {r.location}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous reviews"
            onClick={scrollPrev}
            className="absolute -left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground md:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={scrollNext}
            className="absolute -right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground md:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {reviews.map((r, index) => (
            <button
              key={r.name}
              type="button"
              aria-label={`Show review ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                active === index ? "w-8 bg-primary" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card/40 p-8 text-center backdrop-blur">
            <p className="text-sm text-muted-foreground md:text-base">
              Want to say something nice about us?
            </p>
            <div className="mt-5">
              <Link to="/reviews">
                <Button
                  size="lg"
                  className="h-11 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Add a Review
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card/40 p-8 text-center backdrop-blur">
            <p className="text-sm text-muted-foreground md:text-base">
              Others still said 1 or 2 things about us
            </p>
            <div className="mt-5">
              <Link to="/reviews">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full border-border px-7 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-card"
                >
                  More Testimonials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LetsConnect() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid grid-cols-1 items-start md:grid-cols-2">
        <Reveal>
          <SectionBar />
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Let's Connect
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Creating compelling branding solutions is what we love doing. Influencing the growth of
            your business with the compelling branding is our delight. Let's connect and make a
            positive impact.
          </p>
          <div className="mt-8">
            <Link to="/contact">
              <Button
                size="lg"
                className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </Reveal>
        <div />
      </div>
    </section>
  );
}