import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import {
  getSiteServices,
  adminUpsertService,
  adminDeleteService,
  type Service,
} from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/services")({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteServices);
  const upsert = useServerFn(adminUpsertService);
  const del = useServerFn(adminDeleteService);
  const { data = [] } = useQuery({ queryKey: ["cms", "services"], queryFn: () => load() });

  const [editing, setEditing] = useState<Partial<Service> | null>(null);

  async function save() {
    if (!editing) return;
    await upsert({
      data: {
        id: editing.id,
        title: editing.title || "",
        subtitle: editing.subtitle ?? null,
        popularity: Number(editing.popularity ?? 50),
        sort_order: Number(editing.sort_order ?? data.length + 1),
      },
    });
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["cms", "services"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    await del({ data: { id } });
    qc.invalidateQueries({ queryKey: ["cms", "services"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage the "Our Services" grid on the homepage.</p>
        </div>
        <button
          onClick={() => setEditing({ title: "", subtitle: "", popularity: 50, sort_order: data.length + 1 })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background"
        >
          <Plus className="h-4 w-4" /> Add service
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">#</th><th className="p-3">Title</th><th className="p-3">Subtitle</th>
              <th className="p-3 w-24">%</th><th className="p-3 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="p-3 text-muted-foreground">{s.sort_order}</td>
                <td className="p-3 font-medium">{s.title}</td>
                <td className="p-3 text-muted-foreground">{s.subtitle}</td>
                <td className="p-3">{s.popularity}%</td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(s)} className="mr-2 text-xs text-primary hover:underline">Edit</button>
                  <button onClick={() => remove(s.id)} className="text-xs text-red-500 hover:underline"><Trash2 className="inline h-3.5 w-3.5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit service" : "New service"}</h2>
            <div className="mt-4 space-y-3">
              <Field label="Title"><input className="input" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="Subtitle"><input className="input" value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Popularity %"><input type="number" min={0} max={100} className="input" value={editing.popularity ?? 50} onChange={(e) => setEditing({ ...editing, popularity: Number(e.target.value) })} /></Field>
                <Field label="Sort order"><input type="number" className="input" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-lg border border-border px-4 py-2 text-sm">Cancel</button>
              <button onClick={save} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"><Save className="h-4 w-4"/> Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
