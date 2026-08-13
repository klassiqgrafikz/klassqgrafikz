import { createFileRoute, Link, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminCheckUnlocked, adminLock } from "@/lib/cms.functions";
import { Lock, LayoutDashboard, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/unlock") return;
    const { unlocked } = await adminCheckUnlocked();
    if (!unlocked) throw redirect({ to: "/admin/unlock" });
  },
  component: AdminLayout,
});

const links = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/socials", label: "Social Media" },
  { to: "/admin/branding", label: "Branding" },
  { to: "/admin/community", label: "Community" },
  { to: "/admin/footer", label: "Footer" },
];

function AdminLayout() {
  const router = useRouter();
  const isUnlock = router.state.location.pathname === "/admin/unlock";
  const lock = useServerFn(adminLock);

  if (isUnlock) return <Outlet />;

  async function handleLock() {
    await lock();
    router.navigate({ to: "/admin/unlock" });
  }

  return (
    <div className="warm min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-[240px_1fr]">
        <aside className="md:sticky md:top-8 md:self-start">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-card-soft">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
                  K
                </div>
                <div>
                  <div className="font-display text-base font-semibold tracking-tight">Admin</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    The studio's control room
                  </div>
                </div>
              </div>
            </div>
            <nav className="flex flex-col gap-0.5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-xl px-3 py-2 text-sm text-foreground/70 transition hover:bg-secondary/60 hover:text-foreground"
                  activeProps={{ className: "bg-primary/10 font-medium text-primary" }}
                  activeOptions={{ exact: !!l.exact }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-5 flex flex-col gap-2 border-t border-border/60 pt-4">
              <button
                onClick={handleLock}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
              >
                <Lock className="h-3.5 w-3.5" /> Lock the studio
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
              >
                <LayoutDashboard className="h-3.5 w-3.5" /> Back to site
              </Link>
            </div>
          </div>
          <p className="mt-3 hidden px-2 text-[11px] leading-relaxed text-muted-foreground md:block">
            <Sparkles className="mr-1 inline h-3 w-3 text-primary" />
            Every change you save here goes live on the next page load.
          </p>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
