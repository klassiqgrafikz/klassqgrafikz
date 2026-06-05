import { useEffect, useState } from "react";

const lines = [
  "> Initializing Klassiq systems...",
  "> Loading creative assets...",
  "> Calibrating color profiles...",
  "> Connecting to Klassiq servers...",
  "> Optimizing graphics pipeline...",
  "> Ready.",
];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setShown((s) => [...s, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(t);
        setTimeout(onDone, 500);
      }
    }, 280);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="relative w-full max-w-md px-6 font-mono text-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground font-display text-2xl shadow-glow">
            K
          </div>
          <div>
            <div className="font-display text-2xl tracking-wide">Klassiq Grafikz</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Studios
            </div>
          </div>
        </div>
        {shown.map((l, idx) => (
          <div key={idx} className="text-foreground/80">{l}</div>
        ))}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full gradient-primary transition-all duration-300"
            style={{ width: `${(shown.length / lines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
