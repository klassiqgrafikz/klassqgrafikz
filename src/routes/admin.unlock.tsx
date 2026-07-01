import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminUnlock } from "@/lib/cms.functions";
import { Lock } from "lucide-react";

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
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-semibold">Admin Portal</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Enter access code to continue.</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access code"
          className="mt-6 w-full rounded-xl border border-border bg-background px-4 py-3 text-center font-mono text-lg tracking-[0.4em] outline-none focus:border-primary"
        />
        {error && <p className="mt-3 text-center text-xs text-red-500">Incorrect code. Try again.</p>}
        <button
          type="submit"
          disabled={pending || !code}
          className="mt-5 w-full rounded-xl bg-foreground py-3 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:opacity-50"
        >
          {pending ? "Unlocking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
