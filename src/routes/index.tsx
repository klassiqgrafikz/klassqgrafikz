import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Expand, Check, ArrowUpRight, Shield, Zap, Smartphone, Palette } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
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
  { title: "Brand Identity", desc: "Logos, identity systems and brand guidelines that make you memorable.", img: "/images/project-2.png" },
  { title: "Graphic Design", desc: "Flyers, social creatives and print that stops the scroll.", img: "/images/project-4.png" },
  { title: "Video & Motion", desc: "Reels, adverts and animated brand content that converts.", img: "/images/project-5.jpg" },
  { title: "Digital Portraits", desc: "Editorial illustrations and digital art crafted with precision.", img: "/images/project-3.png" },
  { title: "UI / UX Design", desc: "Web and product interfaces built for clarity and conversion.", img: "/images/project-7.png" },
  { title: "Web & Logistics Platforms", desc: "Trackable shipping and e-commerce sites that scale your sales.", img: "/images/project-8.png" },
];

const fallbackProjects = [
  { src: "/images/project-1.jpg", alt: "Business registration project display", tag: "Corporate" },
  { src: "/images/project-2.png", alt: "Nebiz Cakes n Events design project", tag: "Branding" },
  { src: "/images/project-3.png", alt: "Edited client photo for Klassiq Grafikz", tag: "Portrait" },
  { src: "/images/project-4.png", alt: "Document printing and delivery design project", tag: "Print" },
  { src: "/images/project-5.jpg", alt: "Gift cards for cash promotional design", tag: "Campaign" },
  { src: "/images/project-6.png", alt: "Client gift surprise promotional design", tag: "Social" },
];

const whyChoose = [
  { title: "Proven Track Record", desc: "Over 850 projects delivered with a high satisfaction rate." },
  { title: "On-Time Delivery", desc: "We respect deadlines and ship without compromising quality." },
  { title: "24/7 Support", desc: "WhatsApp, email and phone — we stay close after delivery." },
  { title: "Affordable Pricing", desc: "No hidden costs. Flexible packages for every business size." },
  { title: "Client-Centric", desc: "Your success is the brief. We co-build at every stage." },
  { title: "Built to Convert", desc: "Every design is made to turn visitors into customers." },
];

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <TrustedBy />
      <PortfolioGrid />
      <Testimonials />
      <WhyChooseUs />
      <FinalCTA />
      <ContactBand />
    </SiteLayout>
  );
}

function Hero() {
  const loadSettings = useServerFn(getSiteSettings);
  const { data: settings } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => loadSettings() });
  const heroLogo = settings?.logo_url || kgLogo.url;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-10 pb-12 md:pt-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-black" />
            #1 Creative Studio in Lagos
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-5xl lg:text-[56px]">
            Premium <span className="font-black">Creative</span> <br />
            Services in Lagos
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-600">
            Klassiq Grafikz — we build fast, beautiful brands that rank, convert and stay memorable. From SMEs to large organisations, we help you grow with design that works.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contact">
              <span className="inline-flex h-11 items-center rounded-full bg-black px-7 text-sm font-medium text-white hover:bg-zinc-800 transition">Get a Free Quote</span>
            </Link>
            <Link to="/services">
              <span className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-medium hover:bg-zinc-50 transition">Our Services</span>
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5 font-medium text-black"><Star className="h-3.5 w-3.5 fill-black" /> 5.0 Google Rating</span>
            <span className="h-3 w-px bg-zinc-200" /> 850+ Projects · 500+ Happy Clients
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <img src={heroLogo} alt="Klassiq Grafikz" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:block">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Projects Done</div>
            <div className="mt-1 font-display text-2xl font-bold">850+</div>
            <div className="text-xs text-zinc-500">Across branding, motion & web</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const items = [
    { k: "10+", l: "Years in Lagos" },
    { k: "850+", l: "Projects Done" },
    { k: "500+", l: "Happy Clients" },
    { k: "100%", l: "Satisfaction" },
  ];
  return (
    <section className="border-y border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-3xl font-extrabold tracking-tight">{s.k}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-3xl border border-zinc-200">
          <img src="/images/project-1.jpg" alt="Team" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">About Us</div>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">We Build Digital Experiences That Inspire</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
            Klassiq Grafikz combines creativity with technology to deliver brands that look stunning and perform. From SMEs to large firms, we help you build a stronger presence and scale with confidence.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-zinc-200 p-4">
              <Palette className="h-5 w-5" />
              <div className="mt-2 text-sm font-semibold">Beautiful Design</div>
              <div className="text-xs leading-relaxed text-zinc-500">Clean and modern designs that captivate.</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4">
              <Zap className="h-5 w-5" />
              <div className="mt-2 text-sm font-semibold">Lightning Fast</div>
              <div className="text-xs leading-relaxed text-zinc-500">Optimized for speed and conversion.</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4">
              <Shield className="h-5 w-5" />
              <div className="mt-2 text-sm font-semibold">Secure</div>
              <div className="text-xs leading-relaxed text-zinc-500">Protected with best practices.</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4">
              <Smartphone className="h-5 w-5" />
              <div className="mt-2 text-sm font-semibold">Mobile-Friendly</div>
              <div className="text-xs leading-relaxed text-zinc-500">Looks great on every device.</div>
            </div>
          </div>
          <Link to="/services" className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800">
            More About Us <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Our Services</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">What We Offer</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">From stunning designs to powerful platforms, we provide everything you need to succeed online.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.title}>
              <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-sm transition">
                <div className="overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                  <img src={s.img} alt={s.title} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="mt-4 font-display text-base font-bold">{s.title}</div>
                <div className="mt-1 text-sm leading-relaxed text-zinc-600">{s.desc}</div>
                <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
                  Learn more <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/services" className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium hover:bg-zinc-50">View All Services</Link>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const logos = ["Cybera", "BUA Foods", "Kuda", "Paystack", "Envato", "Slimboss"];
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">Trusted by 500+ Businesses Across Nigeria and Beyond</div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 opacity-60">
          {logos.map((l) => (
            <div key={l} className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700">{l}</div>
          ))}
        </div>
      </div>
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
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Our Portfolio</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">Recent Projects</h2>
        </div>
        <Link to="/services" className="hidden rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium hover:bg-zinc-50 md:inline-flex">See All Our Works</Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projectSlides.map((slide, index) => (
          <Reveal key={slide.src} delay={(index % 3) * 60}>
            <button
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setLightboxOpen(true);
              }}
              className="group block w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left hover:shadow-sm transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-50">
                <img src={slide.src} alt={slide.alt} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.02] transition duration-500" />
                <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">{slide.tag}</div>
                <div className="absolute inset-0 hidden place-items-center bg-white/60 backdrop-blur-sm group-hover:grid">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-medium text-white"><Expand className="h-3.5 w-3.5" /> View</span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold leading-tight">{slide.alt}</div>
                <div className="text-xs text-zinc-500">{slide.tag}</div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-4xl border-zinc-200 bg-white p-0 sm:rounded-2xl"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-zinc-50">
            <img src={projectSlides[activeIndex]?.src} alt={projectSlides[activeIndex]?.alt || "Project"} className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <DialogTitle className="text-xs font-semibold uppercase tracking-widest">{projectSlides[activeIndex]?.tag || "Project"}</DialogTitle>
              <DialogDescription className="mt-1 text-sm font-medium text-black">{projectSlides[activeIndex]?.alt}</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-2 text-xs text-zinc-500"><span className="font-mono text-black">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(projectSlides.length).padStart(2, "0")}</div>
              <button type="button" aria-label="Previous" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 hover:bg-zinc-50"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" aria-label="Next" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 hover:bg-zinc-50"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Client Testimonials</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">Trusted by 500+ Businesses</h2>
          <div className="mt-2 text-sm text-zinc-500">5.0 · 168 Google Reviews</div>
        </div>

        <div className="relative mt-10">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {reviews.map((r) => (
                <figure key={r.name} className="min-w-0 flex-[0_0_100%] rounded-2xl border border-zinc-200 bg-white p-6 md:flex-[0_0_calc(50%-10px)] md:p-8">
                  <div className="flex gap-1 text-black">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-black" />))}</div>
                  <blockquote className="mt-4 text-[15px] font-medium leading-relaxed">"{r.body}"</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-black text-xs font-bold text-white">{r.initials}</div>
                    <div>
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className="text-xs text-zinc-500">{r.location}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <button type="button" aria-label="Previous" onClick={scrollPrev} className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white shadow-sm md:grid"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Next" onClick={scrollNext} className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white shadow-sm md:grid"><ChevronRight className="h-5 w-5" /></button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {reviews.map((r, index) => (
            <button key={r.name} type="button" aria-label={`Show ${index + 1}`} onClick={() => emblaApi?.scrollTo(index)} className={`h-1.5 rounded-full transition-all ${active === index ? "w-8 bg-black" : "w-4 bg-zinc-200"}`} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
            <p className="text-sm text-zinc-600">Want to say something nice about us?</p>
            <Link to="/reviews" className="mt-4 inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Add a Review</Link>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
            <p className="text-sm text-zinc-600">Others still said 1 or 2 things about us</p>
            <Link to="/reviews" className="mt-4 inline-flex rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-medium hover:bg-zinc-50">More Testimonials</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Why Choose Us</div>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">Several Things Define Us As a Company</h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {whyChoose.map((w) => (
          <div key={w.title} className="rounded-2xl border border-zinc-200 p-6">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-black text-white"><Check className="h-4 w-4" /></div>
            <div className="mt-4 font-display text-sm font-bold">{w.title}</div>
            <div className="mt-1 text-sm leading-relaxed text-zinc-600">{w.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center md:py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Ready to Build Your Dream Website?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">Let's discuss your project and create something amazing together.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact"><span className="inline-flex h-11 items-center rounded-full bg-white px-7 text-sm font-medium text-black hover:bg-zinc-100">Get Started Today</span></Link>
          <a href="https://wa.me/2347050495704" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full border border-white/20 px-7 text-sm font-medium hover:bg-white/10">Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-2 md:p-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Get In Touch</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Start Your Project Today</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">Fill the form and we respond within 24 hours with a free quote.</p>
          <div className="mt-6 space-y-3 text-sm">
            <div><span className="font-semibold">Office:</span> Lagos, Nigeria</div>
            <div><span className="font-semibold">Phone:</span> <a href="tel:+2347050495704" className="underline">+234 705 049 5704</a></div>
            <div><span className="font-semibold">Email:</span> <a href="mailto:klassiqgrafikz@gmail.com" className="underline">klassiqgrafikz@gmail.com</a></div>
            <div className="text-zinc-500">Mon–Fri 8am–6pm · Sat 9am–3pm</div>
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
          <div className="text-center text-xs text-zinc-500">We respond within 24 hours. Your info is safe.</div>
        </form>
      </div>
    </section>
  );
}
