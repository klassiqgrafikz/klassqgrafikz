import { useEffect, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[3px]" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary shadow-[0_0_12px_oklch(0.64_0.22_287/0.6)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ReadingProgress />
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-40" aria-hidden />
      <div className="pointer-events-none fixed inset-0 bg-hero-glow" aria-hidden />
      <div className="relative pt-6">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
