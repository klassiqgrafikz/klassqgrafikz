# Admin Portal — Content Management for Klassiq Grafikz

Build a passcode-gated admin portal at `/admin` (code: **0499**) that lets you edit the homepage's services, socials, reviews, selected projects, branding, community links, and footer copy. Changes persist in the database and update the live site on next load.

## Access model

- Route `/admin/unlock` shows a passcode form. Correct code (0499) sets an encrypted server session cookie `klassiq-admin` (7-day expiry) via a `createServerFn` using timing-safe compare.
- All `/admin/*` routes call `requireAdminUnlocked()` in their loader — throws `redirect({ to: "/admin/unlock" })` otherwise.
- Passcode + session secret stored as server env vars: `ADMIN_ACCESS_CODE` (defaulted to `0499` if unset) and `ADMIN_SESSION_SECRET` (auto-generated).
- No Supabase auth needed — this is a shared passcode gate for the site owner only.

## Database (one migration)

New tables, all with RLS enabled + `TO anon SELECT` for public reads, no anon writes. All writes go through admin server functions that verify the session cookie server-side and then use `supabaseAdmin`.

- `site_services` — `id, title, subtitle, popularity, sort_order, created_at` (seeded from current `src/lib/site-data.ts`)
- `site_projects` — `id, image_url, alt, tag, sort_order, created_at` (seeded with the 9 current `/images/project-*` entries)
- `site_reviews_pinned` — `id, initials, name, location, body, sort_order, created_at` (seeded from current reviews array; separate from user-submitted `reviews` table)
- `site_socials` — `id, platform, label, url, icon, sort_order` (whatsapp, instagram, email, telegram)
- `site_settings` — single-row key/value store: `logo_url, primary_color, footer_copyright, footer_tagline, community_telegram_url, community_whatsapp_url, community_instagram_url`

Storage bucket `branding` (public) for logo uploads.

## Server functions (`src/lib/admin.functions.ts` — extend existing)

Public reads (no auth), used by homepage loaders:
- `getSiteServices()`, `getSiteProjects()`, `getPinnedReviews()`, `getSiteSocials()`, `getSiteSettings()`

Admin-gated (verify session cookie, then `supabaseAdmin`):
- `adminUnlock({ code })` / `adminLock()` / `adminCheckUnlocked()`
- Services: `adminUpsertService`, `adminDeleteService`, `adminReorderServices`
- Projects: `adminUpsertProject`, `adminDeleteProject`, `adminReorderProjects` (image upload to `branding` bucket)
- Reviews: `adminUpsertPinnedReview`, `adminDeletePinnedReview`
- Socials: `adminUpsertSocial`, `adminDeleteSocial`
- Settings: `adminUpdateSettings` (branding color, footer text, community links, logo upload)

Uses `useSession` from `@tanstack/react-start/server` for encrypted cookie.

## Admin UI (`src/routes/admin/`)

- `admin/route.tsx` — pathless layout, sidebar nav, calls `requireAdminUnlocked` in `beforeLoad`, "Lock" button top-right.
- `admin/unlock.tsx` — passcode form.
- `admin/index.tsx` — dashboard overview (counts + quick links).
- `admin/services.tsx` — table with inline edit/add/delete, drag-to-reorder.
- `admin/projects.tsx` — grid of project cards; upload replacement image, edit tag/alt, delete, reorder.
- `admin/reviews.tsx` — list of pinned reviews with edit/delete/add form.
- `admin/socials.tsx` — list of social handles with edit/add/delete.
- `admin/branding.tsx` — primary color picker (updates `--primary` CSS var live-preview), logo upload.
- `admin/community.tsx` — edit Telegram/WhatsApp/Instagram community links.
- `admin/footer.tsx` — edit copyright text + tagline.

Reuses existing shadcn primitives (Input, Button, Card, Dialog, etc.) and matches the site's dark/violet aesthetic.

## Homepage wiring

`src/routes/index.tsx` and `src/components/site/Footer.tsx` refactored to load content from the DB via `loader` + `ensureQueryData`, replacing today's hardcoded arrays and constants. Community section (`src/routes/addup.tsx`) gains a Telegram entry, sourced from settings.

Branding: `site_settings.primary_color` injected as inline CSS variable in `__root.tsx`; logo URL used in `Header.tsx` and `Footer.tsx` when set (falls back to the "K" mark).

## Out of scope (this step)

- Real Supabase auth / multi-admin roles (passcode gate only, as requested).
- Analytics beyond the existing dashboard.
- Reordering DnD library — start with up/down buttons; can add dnd-kit later.

Ready to build once you approve. Confirm and I'll ship it.
