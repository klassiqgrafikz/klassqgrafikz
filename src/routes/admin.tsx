import { createFileRoute, Link, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminCheckUnlocked, adminLock } from "@/lib/cms.functions";
import { Lock } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-semibold">Admin</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Klassiq CMS</div>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm text-foreground/70 transition hover:bg-secondary/60 hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: !!l.exact }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLock}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Lock className="h-3.5 w-3.5" /> Lock portal
          </button>
          <Link to="/" className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground">
            ← Back to site
          </Link>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
