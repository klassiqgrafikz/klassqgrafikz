import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
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
