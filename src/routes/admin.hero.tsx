import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getSiteSettings, adminUpdateSettings } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/hero")({
  component: HeroAdmin,
});

function HeroAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteSettings);
  const save = useServerFn(adminUpdateSettings);
  const { data } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => load() });
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.hero_title || "Welcome to Klassiq Grafikz Concepts");
      setSubtitle(data.hero_subtitle || "");
      setBadge(data.hero_badge || "#1 Creative Studio in Lagos");
    }
  }, [data]);

  async function handleSave() {
    await save({ data: { hero_title: title || null, hero_subtitle: subtitle || null, hero_badge: badge || null } });
    qc.invalidateQueries({ queryKey: ["cms", "settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Hero</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit the hero title (typewriter), subtitle and badge on the homepage.</p>

      <div className="mt-8 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Badge (pill above title)</div><input className="input" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="#1 Creative Studio in Lagos" /></label>
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Title (typewriter, looping)</div><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Welcome to Klassiq Grafikz Concepts" /></label>
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Subtitle</div><textarea rows={3} className="input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Klassiq Grafikz — we build fast, beautiful brands..." /></label>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"><Save className="h-4 w-4"/> Save</button>
          {saved && <span className="text-xs text-green-500">Saved ✓ — refresh homepage to see</span>}
        </div>
      </div>
    </div>
  );
}
