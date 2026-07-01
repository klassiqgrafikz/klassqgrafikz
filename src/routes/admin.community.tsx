import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getSiteSettings, adminUpdateSettings } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/community")({
  component: CommunityAdmin,
});

function CommunityAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteSettings);
  const save = useServerFn(adminUpdateSettings);
  const { data } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => load() });
  const [wa, setWa] = useState("");
  const [ig, setIg] = useState("");
  const [tg, setTg] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setWa(data.community_whatsapp_url || "");
      setIg(data.community_instagram_url || "");
      setTg(data.community_telegram_url || "");
    }
  }, [data]);

  async function handleSave() {
    await save({ data: { community_whatsapp_url: wa || null, community_instagram_url: ig || null, community_telegram_url: tg || null } });
    qc.invalidateQueries({ queryKey: ["cms", "settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Community links</h1>
      <p className="mt-1 text-sm text-muted-foreground">Channels visitors can join from the "Community" section.</p>

      <div className="mt-8 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">WhatsApp channel URL</div><input className="input" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="https://wa.me/..." /></label>
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Instagram URL</div><input className="input" value={ig} onChange={(e) => setIg(e.target.value)} placeholder="https://instagram.com/..." /></label>
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Telegram channel URL</div><input className="input" value={tg} onChange={(e) => setTg(e.target.value)} placeholder="https://t.me/..." /></label>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"><Save className="h-4 w-4"/> Save</button>
          {saved && <span className="text-xs text-green-500">Saved ✓</span>}
        </div>
      </div>
    </div>
  );
}
