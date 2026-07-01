-- Admin content management tables

CREATE TABLE public.site_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  popularity int NOT NULL DEFAULT 50,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_services TO anon;
GRANT SELECT ON public.site_services TO authenticated;
GRANT ALL ON public.site_services TO service_role;
ALTER TABLE public.site_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.site_services FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER site_services_updated BEFORE UPDATE ON public.site_services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt text,
  tag text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_projects TO anon;
GRANT SELECT ON public.site_projects TO authenticated;
GRANT ALL ON public.site_projects TO service_role;
ALTER TABLE public.site_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.site_projects FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER site_projects_updated BEFORE UPDATE ON public.site_projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_reviews_pinned (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initials text NOT NULL,
  name text NOT NULL,
  location text,
  body text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_reviews_pinned TO anon;
GRANT SELECT ON public.site_reviews_pinned TO authenticated;
GRANT ALL ON public.site_reviews_pinned TO service_role;
ALTER TABLE public.site_reviews_pinned ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pinned reviews" ON public.site_reviews_pinned FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER site_reviews_pinned_updated BEFORE UPDATE ON public.site_reviews_pinned FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_socials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  label text NOT NULL,
  url text NOT NULL,
  icon text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_socials TO anon;
GRANT SELECT ON public.site_socials TO authenticated;
GRANT ALL ON public.site_socials TO service_role;
ALTER TABLE public.site_socials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read socials" ON public.site_socials FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER site_socials_updated BEFORE UPDATE ON public.site_socials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1,
  logo_url text,
  primary_color text DEFAULT '#7C5CFF',
  footer_copyright text DEFAULT '© 2026 Klassiq Grafikz Studios. All rights reserved.',
  footer_tagline text DEFAULT '...we decorate the world.',
  community_telegram_url text,
  community_whatsapp_url text DEFAULT 'https://wa.me/2347050495704',
  community_instagram_url text DEFAULT 'https://instagram.com',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed defaults
INSERT INTO public.site_settings (id) VALUES (1);

INSERT INTO public.site_services (title, subtitle, popularity, sort_order) VALUES
  ('Flyer Designs', 'Eye-catching event & promo flyers', 82, 1),
  ('Logos & Branding', 'Memorable identity systems', 76, 2),
  ('Birthday Designs', 'Flyers, videos & invites', 71, 3),
  ('Shipping Websites', 'Trackable shipping platforms', 64, 4),
  ('Flight Tickets', 'Trackable flight ticket designs', 58, 5),
  ('Banners', 'Roll-ups, billboards, web banners', 55, 6),
  ('Photo/Doc Edit', 'Foreign & local photo retouching', 95, 7),
  ('Video Editing', 'Reels, ads & event highlights', 45, 8),
  ('ID & Biz Cards', 'Premium card stock & finishes', 33, 9),
  ('Lipsyncing Videos', 'Custom lipsync video productions', 75, 10),
  ('Cartoons / Sketch', 'Caricatures & sketch portraits', 22, 11);

INSERT INTO public.site_projects (image_url, alt, tag, sort_order) VALUES
  ('/images/project-1.jpg', 'Business registration project display', 'Corporate', 1),
  ('/images/project-2.png', 'Nebiz Cakes n Events design project', 'Branding', 2),
  ('/images/project-3.png', 'Edited client photo for Klassiq Grafikz', 'Portrait', 3),
  ('/images/project-4.png', 'Document printing and delivery design project', 'Print', 4),
  ('/images/project-5.jpg', 'Gift cards for cash promotional design', 'Campaign', 5),
  ('/images/project-6.png', 'Client gift surprise promotional design', 'Social', 6),
  ('/images/project-7.png', 'Creative satisfaction campaign design', 'Editorial', 7),
  ('/images/project-8.png', 'International shipment sites design project', 'Logistics', 8),
  ('/images/project-9.png', 'Outreach awakening event flyer design', 'Event', 9);

INSERT INTO public.site_reviews_pinned (initials, name, location, body, sort_order) VALUES
  ('IS', 'Ife Stan', 'Nigeria', 'Person way sabi! Video and pictures editing active!!! This guy is too good. My content don blow since I use am. Highly recommended! ❤️', 1),
  ('OJ', 'Olivia James', 'United States', 'Well detailed graphics designer... Recommendable. My brand logo and flyers came out very professional. Thank you Klassiq! ❤️', 2),
  ('CO', 'Chinedu Okoro', 'Lagos, Nigeria', 'Baba na correct graphics designer o! From my business flyer to my WhatsApp status designs, everything dey burst brain. Keep it up bro!', 3),
  ('AB', 'Aisha Bello', 'Abuja, Nigeria', 'Very creative and fast delivery. I needed urgent designs for my boutique and he delivered perfectly. God bless your hustle!', 4),
  ('MT', 'Michael Thompson', 'United Kingdom', 'Excellent graphic designer! I hired Klassiq for my podcast thumbnails and social media branding. The quality is top-notch and communication was smooth despite the time difference. Will definitely work with him again. ❤️', 5),
  ('TA', 'Tunde Adeyemi', 'Canada', 'Bro, your work is mad! I ordered a complete branding package (logo, business cards, Instagram templates) and the delivery was fast and clean. Na real talent!', 6),
  ('FY', 'Fatima Yusuf', 'Ghana', 'Very professional and talented. My salon flyers and logo came out beautiful. I''m recommending Klassiq to all my friends in Accra. ❤️', 7),
  ('DO', 'David Okeke', 'Nigeria', 'Best graphics designer I don work with this year. My YouTube thumbnails and video edits dey always get more views. Oga you too much! ❤️', 8);

INSERT INTO public.site_socials (platform, label, url, icon, sort_order) VALUES
  ('whatsapp', 'WhatsApp', 'https://wa.me/2347050495704', 'MessageCircle', 1),
  ('instagram', 'Instagram', 'https://instagram.com', 'Instagram', 2),
  ('email', 'Email', 'mailto:klassiqgrafikz@gmail.com', 'Mail', 3),
  ('telegram', 'Telegram', 'https://t.me/klassiqgrafikz', 'Send', 4);
