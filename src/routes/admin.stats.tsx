import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getSiteSettings, adminUpdateSettings } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/stats")({
  component: StatsAdmin,
});

function StatsAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteSettings);
  const save = useServerFn(adminUpdateSettings);
  const { data } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => load() });
  const [years, setYears] = useState(7);
  const [projects, setProjects] = useState(150);
  const [clients, setClients] = useState(500);
  const [satisfaction, setSatisfaction] = useState(100);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setYears(data.stat_years ?? 7);
      setProjects(data.stat_projects ?? 150);
      setClients(data.stat_clients ?? 500);
      setSatisfaction(data.stat_satisfaction ?? 100);
    }
  }, [data]);

  async function handleSave() {
    await save({ data: { stat_years: years, stat_projects: projects, stat_clients: clients, stat_satisfaction: satisfaction } });
    qc.invalidateQueries({ queryKey: ["cms", "settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Stats</h1>
      <p className="mt-1 text-sm text-muted-foreground">The four animated numbers in the stripe below the hero.</p>

      <div className="mt-8 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="grid grid-cols-2 gap-4">
          <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Years in Lagos</div><input type="number" className="input" value={years} onChange={(e) => setYears(Number(e.target.value))} /></label>
          <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Projects Done</div><input type="number" className="input" value={projects} onChange={(e) => setProjects(Number(e.target.value))} /></label>
          <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Happy Clients</div><input type="number" className="input" value={clients} onChange={(e) => setClients(Number(e.target.value))} /></label>
          <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Satisfaction %</div><input type="number" min={0} max={100} className="input" value={satisfaction} onChange={(e) => setSatisfaction(Number(e.target.value))} /></label>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"><Save className="h-4 w-4"/> Save stats</button>
          {saved && <span className="text-xs text-green-500">Saved ✓</span>}
        </div>
      </div>
    </div>
  );
}
