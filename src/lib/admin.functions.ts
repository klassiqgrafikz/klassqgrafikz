import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const checkAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });

export const getAdminKpis = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const now = Date.now();
    const d1 = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const d2 = new Date(now - 48 * 60 * 60 * 1000).toISOString();
    const d7 = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [trafficRes, msgTotal, msg24, msgPrev24, msg7, signupTotal, signup24, signupPrev24, signup7, reviewsPending] =
      await Promise.all([
        supabaseAdmin.rpc("get_traffic_stats"),
        supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).gte("created_at", d1),
        supabaseAdmin
          .from("contact_submissions")
          .select("*", { count: "exact", head: true })
          .gte("created_at", d2)
          .lt("created_at", d1),
        supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", d1),
        supabaseAdmin
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .gte("created_at", d2)
          .lt("created_at", d1),
        supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabaseAdmin.from("reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
      ]);

    const traffic = trafficRes.data?.[0] ?? { online_now: 0, today: 0, this_week: 0, this_month: 0 };
    return {
      traffic,
      messages: {
        total: msgTotal.count ?? 0,
        last24: msg24.count ?? 0,
        prev24: msgPrev24.count ?? 0,
        last7: msg7.count ?? 0,
      },
      signups: {
        total: signupTotal.count ?? 0,
        last24: signup24.count ?? 0,
        prev24: signupPrev24.count ?? 0,
        last7: signup7.count ?? 0,
      },
      reviews: { pending: reviewsPending.count ?? 0 },
    };
  });

export const listRecentMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ limit: z.number().min(1).max(50).default(10) }).optional())
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const limit = data?.limit ?? 10;
    const { data: rows, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("id,name,email,service,message,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listRecentSignups = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ limit: z.number().min(1).max(50).default(10) }).optional())
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const limit = data?.limit ?? 10;
    const { data: rows, error } = await supabaseAdmin
      .from("profiles")
      .select("id,display_name,avatar_url,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listVisitsSeries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ days: z.number().min(1).max(60).default(14) }).optional())
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const days = data?.days ?? 14;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("page_visits")
      .select("created_at")
      .gte("created_at", since)
      .limit(10000);
    if (error) throw new Error(error.message);

    const buckets = new Map<string, number>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      buckets.set(key, 0);
    }
    for (const r of rows ?? []) {
      const key = new Date(r.created_at).toISOString().slice(0, 10);
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return Array.from(buckets.entries()).map(([date, count]) => ({ date, count }));
  });
