import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Activity, Eye, Mail, RefreshCw, Star, UserPlus, Sparkles } from "lucide-react";
import { StudioShell } from "@/components/site/StudioShell";
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

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Klassiq Grafikz" }] }),
  component: DashboardPage,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return { word: "Good morning", emoji: "☀️" };
  if (h < 17) return { word: "Good afternoon", emoji: "🌤️" };
  if (h < 21) return { word: "Good evening", emoji: "🌆" };
  return { word: "Late night", emoji: "🌙" };
}

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
  const messages = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => msgsFn({ data: { limit: 10 } }),
  });
  const signups = useQuery({
    queryKey: ["admin", "signups"],
    queryFn: () => signupsFn({ data: { limit: 10 } }),
  });
  const series = useQuery({
    queryKey: ["admin", "series"],
    queryFn: () => seriesFn({ data: { days: 14 } }),
  });

  const k = kpis.data;
  const msgDelta = k ? k.messages.last24 - k.messages.prev24 : undefined;
  const signupDelta = k ? k.signups.last24 - k.signups.prev24 : undefined;
  const g = greeting();

  return (
    <StudioShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            The studio's live pulse
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {g.word}, Klassiq {g.emoji}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Welcome to the studio. Here's how people found you, reached out, and decided you were
            worth a message today.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() =>
            router.invalidate().then(() => {
              kpis.refetch();
              messages.refetch();
              signups.refetch();
              series.refetch();
            })
          }
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Activity}
          value={k?.traffic.online_now ?? "—"}
          sentence="people are on your site right now"
          hint="last 5 minutes"
          tone="amber"
        />
        <KpiCard
          icon={Eye}
          value={k?.traffic.today ?? "—"}
          sentence="people stopped by today"
          hint={`${k?.traffic.this_week ?? 0} this week`}
          tone="gold"
        />
        <KpiCard
          icon={Mail}
          value={k?.messages.last24 ?? "—"}
          sentence="people reached out in the last 24 hours"
          delta={k ? msgDelta : undefined}
          hint={`${k?.messages.total ?? 0} in total`}
          tone="terra"
        />
        <KpiCard
          icon={UserPlus}
          value={k?.signups.last24 ?? "—"}
          sentence="new faces joined in the last 24 hours"
          delta={k ? signupDelta : undefined}
          hint={`${k?.signups.total ?? 0} in total`}
          tone="gold"
        />
      </div>

      <div className="mt-6">{series.data && <VisitsChart data={series.data} />}</div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <RecentMessages items={messages.data ?? []} />
        <RecentSignups items={signups.data ?? []} />
      </div>

      {k && k.reviews.pending > 0 && (
        <div className="mt-6 flex items-center gap-3 rounded-3xl border border-primary/40 bg-card p-5 shadow-card-soft">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <Star className="h-5 w-5" />
          </div>
          <p className="text-sm">
            <span className="font-semibold text-foreground">{k.reviews.pending}</span>{" "}
            <span className="text-muted-foreground">
              {k.reviews.pending === 1 ? "review is" : "reviews are"} waiting for your approval —
              someone took the time to write about you.
            </span>
          </p>
        </div>
      )}
    </StudioShell>
  );
}
