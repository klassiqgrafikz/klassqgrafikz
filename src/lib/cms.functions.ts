import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

// ---- Types (client-safe) ----
export type Service = {
  id: string;
  title: string;
  subtitle: string | null;
  popularity: number;
  sort_order: number;
};
export type Project = {
  id: string;
  image_url: string;
  alt: string | null;
  tag: string | null;
  sort_order: number;
};
export type PinnedReview = {
  id: string;
  initials: string;
  name: string;
  location: string | null;
  body: string;
  sort_order: number;
};
export type Social = {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string | null;
  sort_order: number;
};
export type SiteSettings = {
  logo_url: string | null;
  primary_color: string | null;
  footer_copyright: string | null;
  footer_tagline: string | null;
  community_telegram_url: string | null;
  community_whatsapp_url: string | null;
  community_instagram_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_badge: string | null;
  stat_years: number | null;
  stat_projects: number | null;
  stat_clients: number | null;
  stat_satisfaction: number | null;
};

// ---- Admin session gate ----
type AdminSession = { unlocked?: boolean; at?: number };

function sessionConfig() {
  return {
    password: process.env.ADMIN_SESSION_SECRET || "dev-only-fallback-secret-please-set-env-var-min-32chars",
    name: "klassiq-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

async function assertUnlocked() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) {
    throw new Error("Admin session required");
  }
}

// ---- Public reads (via server publishable client) ----
async function publicClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export const getSiteServices = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await publicClient();
  const { data, error } = await sb.from("site_services").select("id,title,subtitle,popularity,sort_order").order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as Service[];
});

export const getSiteProjects = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await publicClient();
  const { data, error } = await sb.from("site_projects").select("id,image_url,alt,tag,sort_order").order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
});

export const getPinnedReviews = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await publicClient();
  const { data, error } = await sb.from("site_reviews_pinned").select("id,initials,name,location,body,sort_order").order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as PinnedReview[];
});

export const getSiteSocials = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await publicClient();
  const { data, error } = await sb.from("site_socials").select("id,platform,label,url,icon,sort_order").order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as Social[];
});

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await publicClient();
  const { data, error } = await sb.from("site_settings").select("logo_url,primary_color,footer_copyright,footer_tagline,community_telegram_url,community_whatsapp_url,community_instagram_url,hero_title,hero_subtitle,hero_badge,stat_years,stat_projects,stat_clients,stat_satisfaction").eq("id", 1).maybeSingle();
  if (error) {
    // Fallback if new columns not yet migrated
    const { data: legacy } = await sb.from("site_settings").select("logo_url,primary_color,footer_copyright,footer_tagline,community_telegram_url,community_whatsapp_url,community_instagram_url").eq("id", 1).maybeSingle();
    return ({ ...(legacy ?? {}), hero_title: null, hero_subtitle: null, hero_badge: null, stat_years: null, stat_projects: null, stat_clients: null, stat_satisfaction: null } as SiteSettings);
  }
  return (data ?? {
    logo_url: null,
    primary_color: null,
    footer_copyright: null,
    footer_tagline: null,
    community_telegram_url: null,
    community_whatsapp_url: null,
    community_instagram_url: null,
    hero_title: null,
    hero_subtitle: null,
    hero_badge: null,
    stat_years: null,
    stat_projects: null,
    stat_clients: null,
    stat_satisfaction: null,
  }) as SiteSettings;
});

// ---- Admin auth ----
export const adminUnlock = createServerFn({ method: "POST" })
  .inputValidator((d: { code: string }) => d)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_ACCESS_CODE || "0499";
    if (String(data.code).trim() !== expected) {
      return { ok: false as const };
    }
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true, at: Date.now() });
    return { ok: true as const };
  });

export const adminLock = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminCheckUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { unlocked: !!session.data.unlocked };
});

// ---- Admin CRUD helpers ----
async function admin() {
  await assertUnlocked();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

// Services
const serviceInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  subtitle: z.string().nullish(),
  popularity: z.number().int().min(0).max(100).default(50),
  sort_order: z.number().int().default(0),
});
export const adminUpsertService = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => serviceInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_services").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
export const adminDeleteService = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Projects
const projectInput = z.object({
  id: z.string().uuid().optional(),
  image_url: z.string().min(1),
  alt: z.string().nullish(),
  tag: z.string().nullish(),
  sort_order: z.number().int().default(0),
});
export const adminUpsertProject = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => projectInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_projects").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
export const adminDeleteProject = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Reviews
const reviewInput = z.object({
  id: z.string().uuid().optional(),
  initials: z.string().min(1).max(4),
  name: z.string().min(1),
  location: z.string().nullish(),
  body: z.string().min(1),
  sort_order: z.number().int().default(0),
});
export const adminUpsertReview = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => reviewInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_reviews_pinned").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
export const adminDeleteReview = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_reviews_pinned").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Socials
const socialInput = z.object({
  id: z.string().uuid().optional(),
  platform: z.string().min(1),
  label: z.string().min(1),
  url: z.string().min(1),
  icon: z.string().nullish(),
  sort_order: z.number().int().default(0),
});
export const adminUpsertSocial = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => socialInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_socials").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
export const adminDeleteSocial = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await sb.from("site_socials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Settings
const settingsInput = z.object({
  logo_url: z.string().nullish(),
  primary_color: z.string().nullish(),
  footer_copyright: z.string().nullish(),
  footer_tagline: z.string().nullish(),
  community_telegram_url: z.string().nullish(),
  community_whatsapp_url: z.string().nullish(),
  community_instagram_url: z.string().nullish(),
  hero_title: z.string().nullish(),
  hero_subtitle: z.string().nullish(),
  hero_badge: z.string().nullish(),
  stat_years: z.number().int().min(0).max(100).nullish(),
  stat_projects: z.number().int().min(0).max(100000).nullish(),
  stat_clients: z.number().int().min(0).max(100000).nullish(),
  stat_satisfaction: z.number().int().min(0).max(100).nullish(),
});
export const adminUpdateSettings = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => settingsInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await admin();
    const { error } = await (sb.from("site_settings") as any).update({ ...data }).eq("id", 1);
    if (error) {
      // Fallback if new columns not yet migrated — try legacy fields only
      if (String(error.message).includes("hero_") || String(error.message).includes("stat_")) {
        const legacy: Record<string, unknown> = {};
        for (const k of ["logo_url","primary_color","footer_copyright","footer_tagline","community_telegram_url","community_whatsapp_url","community_instagram_url"]) if (k in data) legacy[k] = (data as any)[k];
        const { error: e2 } = await (sb.from("site_settings") as any).update(legacy).eq("id", 1);
        if (e2) throw new Error(e2.message);
        return { ok: true };
      }
      throw new Error(error.message);
    }
    return { ok: true };
  });

// Why Choose Us CMS (requires Supabase table site_whychoose — see SQL below; fallback to empty)
export type WhyChoose = { id: string; title: string; desc: string | null; sort_order: number };
export const getSiteWhyChoose = createServerFn({ method: "GET" }).handler(async () => {
  const sb: any = await publicClient();
  const { data, error } = await sb.from("site_whychoose").select("id,title,desc,sort_order").order("sort_order");
  if (error) return [] as WhyChoose[];
  return (data ?? []) as WhyChoose[];
});
const whyChooseInput = z.object({ id: z.string().uuid().optional(), title: z.string().min(1), desc: z.string().nullish(), sort_order: z.number().int().default(0) });
export const adminUpsertWhyChoose = createServerFn({ method: "POST" }).inputValidator((d: unknown) => whyChooseInput.parse(d)).handler(async ({ data }) => {
  const sb: any = await admin(); const { error } = await sb.from("site_whychoose").upsert(data); if (error) throw new Error(error.message); return { ok: true };
});
export const adminDeleteWhyChoose = createServerFn({ method: "POST" }).inputValidator((d: { id: string }) => d).handler(async ({ data }) => {
  const sb: any = await admin(); const { error } = await sb.from("site_whychoose").delete().eq("id", data.id); if (error) throw new Error(error.message); return { ok: true };
});

// Image upload (base64 data URL -> Storage). Returns public URL.
const uploadInput = z.object({
  filename: z.string().min(1).max(200),
  dataUrl: z.string().startsWith("data:"),
});
export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => uploadInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await admin();
    const match = data.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) throw new Error("Invalid data URL");
    const contentType = match[1];
    const bytes = Buffer.from(match[2], "base64");
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const { error } = await sb.storage.from("branding").upload(path, bytes, {
      contentType,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: pub } = sb.storage.from("branding").getPublicUrl(path);
    return { url: pub.publicUrl };
  });
