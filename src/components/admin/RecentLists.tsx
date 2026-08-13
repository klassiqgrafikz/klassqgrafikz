import { Mail, MessageCircle, UserPlus } from "lucide-react";

const AVATAR_TONES = [
  "bg-primary/15 text-primary",
  "bg-chart-2/20 text-chart-2",
  "bg-chart-3/20 text-chart-3",
  "bg-chart-4/20 text-chart-4",
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "yesterday" : `${d}d ago`;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

interface Message {
  id: string;
  name: string;
  email: string;
  service: string | null;
  message: string;
  created_at: string;
}

interface Signup {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

function SectionHeading({
  icon: Icon,
  title,
  note,
}: {
  icon: typeof Mail;
  title: string;
  note: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

export function RecentMessages({ items }: { items: Message[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card-soft">
      <SectionHeading
        icon={Mail}
        title="Someone reached out"
        note={`${items.length} latest ${items.length === 1 ? "message" : "messages"} in the inbox`}
      />
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-6 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground/80">
            The inbox is quiet right now
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Enjoy the calm — it never lasts long around here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((m, i) => (
            <li key={m.id} className="flex gap-3">
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold ${
                  AVATAR_TONES[i % AVATAR_TONES.length]
                }`}
              >
                {initials(m.name) || "?"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-sm font-semibold text-foreground">{m.name}</span>
                  <span className="text-[11px] text-muted-foreground">{timeAgo(m.created_at)}</span>
                  {m.service && (
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {m.service}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 rounded-2xl rounded-tl-md border border-border bg-surface/60 px-3.5 py-2.5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-foreground/85">
                    {m.message}
                  </p>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{m.email}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RecentSignups({ items }: { items: Signup[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card-soft">
      <SectionHeading
        icon={UserPlus}
        title="New faces"
        note={`${items.length} ${items.length === 1 ? "person" : "people"} joined recently`}
      />
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-6 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-chart-2/20 text-chart-2">
            <UserPlus className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground/80">No sign-ups yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The first ones are always the sweetest. They'll come.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((u, i) => {
            const name = u.display_name || "Anonymous";
            return (
              <li
                key={u.id}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/50 p-3 transition hover:border-primary/40"
              >
                {u.avatar_url ? (
                  <img
                    src={u.avatar_url}
                    alt={name}
                    className="h-10 w-10 rounded-full border border-border object-cover"
                  />
                ) : (
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full font-display text-xs font-bold ${
                      AVATAR_TONES[i % AVATAR_TONES.length]
                    }`}
                  >
                    {initials(name)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    joined {timeAgo(u.created_at)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
