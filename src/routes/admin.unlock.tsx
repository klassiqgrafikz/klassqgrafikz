import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminUnlock } from "@/lib/cms.functions";
import { Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/unlock")({
  component: UnlockPage,
});

function UnlockPage() {
  const router = useRouter();
  const unlock = useServerFn(adminUnlock);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const res = await unlock({ data: { code } });
    setPending(false);
    if (res.ok) router.navigate({ to: "/admin" });
    else setError(true);
  }

  return (
    <div className="warm grid min-h-screen place-items-center bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
      />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-card-soft"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
          <Lock className="h-6 w-6" />
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" /> Klassiq Grafikz
        </div>
        <h1 className="mt-2 text-center font-display text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Enter your studio code and step inside.
        </p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access code"
          className="mt-6 w-full rounded-xl border border-input bg-background px-4 py-3 text-center font-mono text-lg tracking-[0.4em] text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {error && (
          <p className="mt-3 text-center text-xs text-destructive">
            Hmm, that's not it. Try again.
          </p>
        )}
        <button
          type="submit"
          disabled={pending || !code}
          className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
        >
          {pending ? "Unlocking…" : "Unlock the studio"}
        </button>
      </form>
    </div>
  );
}
