
# Klassiq Grafikz — Creative Agency Site

A bookfua.com-inspired site: dark red/black cinematic theme, terminal boot loader, bold rotating-word hero, services grid with popularity bars, live visitor counter, Google-style review wall, and recent-work gallery. Branded for **Klassiq Grafikz** with a Shopify storefront, public accounts, and an admin dashboard.

## Visual Style (matches bookfua.com)

- Dark mode default with a light toggle.
- Palette: near-black background (#0a0000), deep red surfaces (#1a0606), brand red accent (#e10b1a), warm off-white text.
- Bold uppercase display font (Anton / Bebas Neue) for hero headlines, clean sans (Inter) for body.
- Subtle red glow halos, soft noise/grid texture on background, rounded glass cards.
- Motion: terminal-style boot intro on first load, word swap in hero ("WE DESIGN, EDIT, ANIMATE, BRAND..."), scroll-reveal on sections, hover lift on cards.

## Pages (TanStack Start routes)

- `/` — Boot loader → hero with rotating verbs + CTA, hero image card with star rating, quick-link tiles (Services, Reviews, Shop, AddUp, Contact), recent work marquee, popular services grid w/ popularity %, live traffic monitor, review wall, footer.
- `/services` — Full list of services as cards (Flyer, Logos, Birthday designs, Shipping website, Flight trackable ticket, Banners, Photo editing local/foreign, etc.) each with description + "Request via WhatsApp/Contact" CTA.
- `/shop` — Shopify-powered product grid, product detail, cart, checkout (Shopify Storefront).
- `/reviews` — Full Google-style review wall + "Leave a review" form (logged-in users).
- `/addup` — Lead-capture / newsletter / WhatsApp community signup.
- `/contact` — Contact form (stored in Cloud) + WhatsApp/Instagram quick links.
- `/auth` — Sign in / sign up (email+password and Google).
- `/_authenticated/account` — User profile, their submitted reviews and contact requests.
- `/_authenticated/_admin/dashboard` — Admin manages services, recent posts, reviews (approve/hide), contact submissions, traffic stats.

## Backend (Lovable Cloud)

Tables:
- `profiles` (id → auth.users, display_name, avatar_url, created_at)
- `user_roles` (id, user_id, role enum: admin|user) + `has_role()` security-definer fn
- `services` (id, title, subtitle, popularity int, link, sort_order, is_active)
- `reviews` (id, user_id nullable, author_name, body, rating, is_approved, created_at)
- `recent_posts` (id, image_url, image_dark_url, link, sort_order)
- `contact_submissions` (id, name, email, phone, message, service, created_at)
- `page_visits` (id, path, session_id, created_at) for the real-time monitor

RLS: public SELECT on services/recent_posts/approved reviews; authenticated INSERT on reviews/contact_submissions; admins full access (via `has_role`).

Server functions (createServerFn):
- `listServices`, `listApprovedReviews`, `listRecentPosts` (public)
- `submitContact`, `submitReview` (auth)
- Admin CRUD for services/posts/reviews/contact
- `trackVisit` + `getTrafficStats` (online now, today, week, month)

## Shop

Enable Shopify integration (new dev store). Shop, product listing, cart, and checkout flow generated against Shopify.

## Auth

Email/password + Google sign-in (via Lovable broker). Roles in `user_roles` table. Admin route gated by `_admin` layout calling `has_role`.

## Build Order

1. Design system tokens in `src/styles.css` (dark red/black, brand red), fonts in root, layout shell with branded header/footer.
2. Home page: boot loader, hero, quick tiles, popular services, traffic monitor, reviews carousel, recent posts marquee (using placeholder images).
3. Static service/contact/addup pages.
4. Enable Lovable Cloud → create tables, RLS, server fns; wire contact form, reviews, traffic counter.
5. Auth (email + Google) and `/account`.
6. Admin dashboard.
7. Enable Shopify → build `/shop` with cart/checkout.
8. Image generation for hero, service icons, recent-post placeholders.

## Out of Scope

- Tutorials section (skipped per your direction).
- Paid digital downloads.
- Multi-language.

Ready to implement when you approve. I'll start by enabling Lovable Cloud and Shopify, then build the homepage and design system first so you can see the look ASAP.
