import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Star,
  ChevronDown,
  Briefcase,
  Calendar,
  MessageSquare,
  Wrench,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RotatingWord } from "@/components/site/RotatingWord";
import { BootLoader } from "@/components/site/BootLoader";
import { Button } from "@/components/ui/button";
import { services, reviews } from "@/lib/site-data";
import heroImg from "@/assets/hero-logo.jpeg";
import project1 from "@/assets/uploads/project-1.jpg.asset.json";
import project2 from "@/assets/uploads/project-2.png.asset.json";
import project3 from "@/assets/uploads/project-3.png.asset.json";
import project4 from "@/assets/uploads/project-4.png.asset.json";
import project5 from "@/assets/uploads/project-5.jpg.asset.json";
import project6 from "@/assets/uploads/project-6.png.asset.json";
import project7 from "@/assets/uploads/project-7.png.asset.json";
import project8 from "@/assets/uploads/project-8.png.asset.json";
import project9 from "@/assets/uploads/project-9.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klassiq Grafikz Studios — Creative Agency" },
      {
        name: "description",
        content:
          "Klassiq Grafikz designs, edits, animates and advertises. Logos, flyers, birthday designs, shipping websites, flight tickets and more.",
      },
      { property: "og:title", content: "Klassiq Grafikz Studios — Creative Agency" },
      {
        property: "og:description",
        content: "We design, edit, brand, animate & advertise. ...we decorate the world..",
      },
    ],
  }),
  component: Home,
});

const quickTiles = [
  { to: "/services", label: "Services", Icon: Briefcase },
  { to: "/addup", label: "Events", Icon: Calendar },
  { to: "/reviews", label: "Reviews", Icon: Star },
  { to: "/contact", label: "Contact", Icon: MessageSquare },
];

const projectSlides = [
  { src: project1.url, alt: "Business registration project display" },
  { src: project2.url, alt: "Nebiz Cakes n Events design project" },
  { src: project3.url, alt: "Edited client photo for Klassiq Grafikz" },
  { src: project4.url, alt: "Document printing and delivery design project" },
  { src: project5.url, alt: "Gift cards for cash promotional design" },
  { src: project6.url, alt: "Client gift surprise promotional design" },
  { src: project7.url, alt: "Creative satisfaction campaign design" },
  { src: project8.url, alt: "International shipment sites design project" },
  { src: project9.url, alt: "Outreach awakening event flyer design" },
];

function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <SiteLayout>
        <Hero />
        <QuickTiles />
        <PopularServices />
        <ProjectCarousel />
        <ReviewWall />
        <CTASection />
      </SiteLayout>
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto mt-10 grid max-w-6xl gap-10 px-6 pt-10 md:grid-cols-2 md:items-center md:gap-12 md:pt-16">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          CREATIVE AGENCY
        </div>
        <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
          We <RotatingWord />,
          <br />
          <span className="text-primary text-glow">...we decorate</span>
          <br />
          <span className="text-primary text-glow">the world..</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-muted-foreground">...we decorate the world..</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Us
            </Button>
          </Link>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-card/60 backdrop-blur"
            >
              <GraduationCap className="mr-2 h-4 w-4" /> View Services
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-card-soft">
          <img
            src={heroImg}
            alt="Klassiq Grafikz logo on a dark hero background"
            width={1024}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-background/60 px-3 py-1.5 backdrop-blur">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="absolute bottom-5 right-5 text-right">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/80">
              Scroll Down
            </div>
            <ChevronDown className="ml-auto mt-1 h-6 w-6 animate-bounce text-foreground/80" />
          </div>
        </div>
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-hero-glow" />
      </div>
    </section>
  );
}

function QuickTiles() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <div className="rounded-3xl border border-border bg-card/60 p-3 backdrop-blur shadow-card-soft">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {quickTiles.map(({ to, label, Icon }) => (
            <Link
              key={label}
              to={to}
              className="group grid place-items-center gap-2 rounded-2xl p-5 text-center transition hover:bg-secondary"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium uppercase tracking-wider">{label}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularServices() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Explore Our Most Popular
          </div>
          <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">
            Products &amp; Services
          </h2>
        </div>
        <Link to="/services" className="hidden text-sm text-primary hover:underline md:block">
          See all <ArrowRight className="ml-1 inline h-3 w-3" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 9).map((s) => (
          <Link
            key={s.title}
            to="/contact"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-xl uppercase">{s.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.subtitle}</div>
              </div>
              <div className="text-2xl font-display text-primary">{s.popularity}%</div>
            </div>
            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full gradient-primary" style={{ width: `${s.popularity}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Popularity</span>
              <span className="text-primary opacity-0 transition group-hover:opacity-100">
                Request <ArrowRight className="ml-1 inline h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrafficMonitor() {
  const stats = [
    { label: "Currently Online", value: 7, live: true },
    { label: "Today's Visits", value: 240 },
    { label: "This Week", value: "4,100" },
    { label: "This Month", value: "8,500" },
  ];

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card-soft">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          Real-time Traffic Monitor
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl text-primary text-glow">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Featured Work
          </div>
          <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Project Gallery</h2>
        </div>
        <div className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
          Auto sliding showcase
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card/70 p-3 shadow-card-soft backdrop-blur md:p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-secondary/40">
          <div
            className="flex h-full transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projectSlides.map((slide, index) => (
              <div key={slide.src} className="relative h-full min-w-full bg-background">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {projectSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-10 bg-primary" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewWall() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto mt-24 max-w-4xl px-6">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          What Clients Say
        </div>
        <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Customer Reviews</h2>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card/70 shadow-card-soft backdrop-blur">
        <div
          className="flex transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${activeReview * 100}%)` }}
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              className="min-w-full px-8 py-12 md:px-16 md:py-16"
            >
              <div className="flex flex-col items-center text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full gradient-primary text-xl font-display text-primary-foreground shadow-glow">
                  {r.initials}
                </div>
                <div className="mt-5 flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
                  "{r.body}"
                </p>
                <div className="mt-6">
                  <div className="font-display text-lg uppercase">{r.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {r.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {reviews.map((r, index) => (
          <button
            key={r.name}
            type="button"
            aria-label={`Show review ${index + 1}`}
            onClick={() => setActiveReview(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeReview === index ? "w-10 bg-primary" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/reviews">
          <Button variant="outline" className="rounded-full">
            See all reviews
          </Button>
        </Link>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-surface p-10 text-center shadow-card-soft md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <h2 className="relative font-display text-4xl uppercase md:text-6xl">
          Let's <span className="text-primary text-glow">Decorate</span> Your World
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us about your project — flyer, logo, full brand or a complete shipping website. We'll
          respond fast on WhatsApp.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-primary-foreground shadow-glow"
            >
              Start a Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline" className="rounded-full">
              Visit Shop
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
