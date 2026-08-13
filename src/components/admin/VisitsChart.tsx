import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { date: string; count: number }[];
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTick(value: string) {
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value.slice(5);
  return WEEKDAYS[d.getDay()];
}

export function VisitsChart({ data }: Props) {
  const total = data.reduce((acc, d) => acc + d.count, 0);
  const busiest = data.reduce((best, d) => (d.count > best.count ? d : best), {
    count: 0,
    date: "",
  });

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card-soft">
      <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Studio foot traffic</h2>
          <p className="text-sm text-muted-foreground">Visits across the last {data.length} days</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">{total.toLocaleString()}</span> visits
            in total
          </div>
          {busiest.count > 0 && (
            <div>
              busiest day:{" "}
              <span className="font-medium text-foreground">
                {formatTick(busiest.date)} ({busiest.count})
              </span>
            </div>
          )}
        </div>
      </div>

      {total === 0 ? (
        <div className="mt-4 grid h-56 place-items-center rounded-2xl border border-dashed border-border bg-surface/50">
          <div className="text-center">
            <div className="text-sm font-medium text-foreground/80">No visits recorded yet</div>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              The site's still warming up — the numbers will start rolling in once people find you.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="visitsFillWarm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={formatTick}
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={11}
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                  boxShadow: "var(--shadow-soft)",
                }}
                labelStyle={{ color: "var(--muted-foreground)" }}
                formatter={(value) => [`${value} visit${value === 1 ? "" : "s"}`, "Foot traffic"]}
                labelFormatter={(label) => formatTick(String(label))}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#visitsFillWarm)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
