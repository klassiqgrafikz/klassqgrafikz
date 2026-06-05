import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Activity, Eye, Mail, RefreshCw, Star, UserPlus } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { KpiCard } from "@/components/admin/KpiCard";
import { VisitsChart } from "@/components/admin/VisitsChart";
import { RecentMessages, RecentSignups } from "@/components/admin/RecentLists";
import { Button } from "@/components/ui/button";
import {
  getAdminKpis,
  listRecentMessages,
  listRecentSignups,
  listVisitsSeries,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/_admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Klassiq Grafikz" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const router = useRouter();
  const kpisFn = useServerFn(getAdminKpis);
  const msgsFn = useServerFn(listRecentMessages);
  const signupsFn = useServerFn(listRecentSignups);
  const seriesFn = useServerFn(listVisitsSeries);

  const kpis = useQuery({
    queryKey: ["admin", "kpis"],
    queryFn: () => kpisFn(),
    refetchInterval: 30000,
  });
  const messages = useQuery({ queryKey: ["admin", "messages"], queryFn: () => msgsFn({ data: { limit: 10 } }) });
  const signups = useQuery({ queryKey: ["admin", "signups"], queryFn: () => signupsFn({ data: { limit: 10 } }) });
  const series = useQuery({ queryKey: ["admin", "series"], queryFn: () => seriesFn({ data: { days: 14 } }) });

  const k = kpis.data;
  const msgDelta = k ? k.messages.last24 - k.messages.prev24 : 0;
  const signupDelta = k ? k.signups.last24 - k.signups.prev24 : 0;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary">Admin</div>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Live traffic, leads, and audience growth.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => router.invalidate().then(() => { kpis.refetch(); messages.refetch(); signups.refetch(); series.refetch(); })}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Online now"
            value={k?.traffic.online_now ?? "—"}
            icon={Activity}
            hint="last 5 min"
          />
          <KpiCard
            label="Visits today"
            value={k?.traffic.today ?? "—"}
            icon={Eye}
            hint={`${k?.traffic.this_week ?? 0} this week`}
          />
          <KpiCard
            label="Messages 24h"
            value={k?.messages.last24 ?? "—"}
            icon={Mail}
            delta={k ? msgDelta : undefined}
            hint={`${k?.messages.total ?? 0} total`}
          />
          <KpiCard
            label="Sign-ups 24h"
            value={k?.signups.last24 ?? "—"}
            icon={UserPlus}
            delta={k ? signupDelta : undefined}
            hint={`${k?.signups.total ?? 0} total`}
          />
        </div>

        <div className="mt-6">
          {series.data && <VisitsChart data={series.data} />}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <RecentMessages items={messages.data ?? []} />
          <RecentSignups items={signups.data ?? []} />
        </div>

        {k && k.reviews.pending > 0 && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/40 bg-card p-4 shadow-card-soft">
            <Star className="h-5 w-5 text-primary" />
            <div className="flex-1 text-sm">
              <span className="font-medium text-foreground">{k.reviews.pending}</span>{" "}
              <span className="text-muted-foreground">review{k.reviews.pending === 1 ? "" : "s"} awaiting approval</span>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
