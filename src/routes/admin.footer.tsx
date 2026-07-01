import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getSiteSettings, adminUpdateSettings } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/footer")({
  component: FooterAdmin,
});

function FooterAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteSettings);
  const save = useServerFn(adminUpdateSettings);
  const { data } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => load() });
  const [copy, setCopy] = useState("");
  const [tag, setTag] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setCopy(data.footer_copyright || "");
      setTag(data.footer_tagline || "");
    }
  }, [data]);

  async function handleSave() {
    await save({ data: { footer_copyright: copy || null, footer_tagline: tag || null } });
    qc.invalidateQueries({ queryKey: ["cms", "settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Footer</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit the copyright line and tagline shown at the bottom of every page.</p>

      <div className="mt-8 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Copyright line</div><input className="input" value={copy} onChange={(e) => setCopy(e.target.value)} placeholder="© 2026 Klassiq Grafikz Studios. All rights reserved." /></label>
        <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Tagline</div><input className="input" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="...we decorate the world." /></label>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"><Save className="h-4 w-4"/> Save</button>
          {saved && <span className="text-xs text-green-500">Saved ✓</span>}
        </div>
      </div>
    </div>
  );
}
