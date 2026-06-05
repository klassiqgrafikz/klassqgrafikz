# Admin Dashboard — KPIs

Build a gated admin dashboard at `/_authenticated/_admin/dashboard` showing live KPIs for traffic, contact submissions, and new sign-ups, styled to match the Klassiq Grafikz dark/red aesthetic.

## Route structure

- `src/routes/_authenticated/_admin/route.tsx` — pathless admin layout. `beforeLoad` calls a new server fn `requireAdmin()` (uses `requireSupabaseAuth` + `has_role(uid, 'admin')`) and `throw redirect({ to: '/' })` if not admin. Renders `<Outlet />`.
- `src/routes/_authenticated/_admin/dashboard.tsx` — the dashboard page.
- (The integration-managed `_authenticated/route.tsx` already gates sign-in.)

## Server functions (`src/lib/admin.functions.ts`)

All use `.middleware([requireSupabaseAuth])` and verify `has_role(userId, 'admin')` first — throw `Error('Forbidden')` otherwise.

- `getAdminKpis()` → returns:
  - `traffic`: result of `get_traffic_stats()` RPC (online_now, today, this_week, this_month)
  - `messages`: total contact_submissions, new in last 24h, new in last 7d
  - `signups`: total profiles, new in last 24h, new in last 7d
  - `reviews`: pending (is_approved=false) count
- `listRecentMessages(limit=10)` → latest contact_submissions (name, email, service, message, created_at)
- `listRecentSignups(limit=10)` → latest profiles (display_name, avatar_url, created_at)
- `listVisitsSeries(days=14)` → grouped daily counts from page_visits for a small spark chart

Uses `supabaseAdmin` (imported inside handlers) so we can read all rows regardless of RLS.

## Dashboard UI

Sections, top to bottom:
1. **Header strip** — "Admin / Dashboard" with refresh button (invalidates queries).
2. **KPI grid** (4 cards): Online Now, Visits Today, New Messages (24h), New Sign-ups (24h). Each card: big number, label, small delta vs previous period, glowing red accent line.
3. **Traffic chart** — 14-day visits as a minimal bar/area sparkline (Recharts, already installed via shadcn chart).
4. **Two-column lists**:
   - Recent Messages (avatar initial, name, service tag, time-ago, expandable body)
   - Recent Sign-ups (avatar, display name, time-ago)
5. **Pending Reviews chip** — link to `/reviews` admin filter (future).

Components live in `src/components/admin/`:
- `KpiCard.tsx`, `VisitsChart.tsx`, `RecentMessages.tsx`, `RecentSignups.tsx`

Data fetched via TanStack Query (`useSuspenseQuery`) using server fns; loader primes cache with `ensureQueryData`. Refetch every 30s for traffic KPI.

## Header link

Add a small "Admin" link to `src/components/site/Header.tsx` visible only when the signed-in user has the admin role (check via a lightweight `getMyRoles()` server fn, cached in Query). Hidden for everyone else.

## Out of scope (this step)

- CRUD for services / recent_posts / reviews approval UI (next step).
- Pagination / filtering of messages.
- Exporting data.

Ready to build when you approve.