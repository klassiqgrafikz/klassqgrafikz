import { Mail, UserPlus } from "lucide-react";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
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

export function RecentMessages({ items }: { items: Message[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-4 w-4 text-primary" />
        <h2 className="font-display text-lg tracking-wide">Recent messages</h2>
      </div>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No messages yet.</li>}
        {items.map((m) => (
          <li key={m.id} className="rounded-xl border border-border/60 bg-surface/50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{m.name}</span>
                  {m.service && (
                    <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                      {m.service}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{m.email}</div>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{timeAgo(m.created_at)}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecentSignups({ items }: { items: Signup[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
      <div className="mb-4 flex items-center gap-2">
        <UserPlus className="h-4 w-4 text-primary" />
        <h2 className="font-display text-lg tracking-wide">Recent sign-ups</h2>
      </div>
      <ul className="space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No sign-ups yet.</li>}
        {items.map((u) => {
          const name = u.display_name || "Anonymous";
          const initial = name.charAt(0).toUpperCase();
          return (
            <li
              key={u.id}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/50 p-3"
            >
              {u.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={u.avatar_url}
                  alt={name}
                  className="h-9 w-9 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary font-display text-primary-foreground">
                  {initial}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium text-foreground">{name}</div>
                <div className="text-[11px] text-muted-foreground">{timeAgo(u.created_at)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
