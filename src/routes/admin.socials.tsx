import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { getSiteSocials, adminUpsertSocial, adminDeleteSocial, type Social } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/socials")({
  component: SocialsAdmin,
});

const ICON_OPTIONS = ["MessageCircle", "Instagram", "Mail", "Send", "Facebook", "Twitter", "Youtube", "Phone", "Globe"];

function SocialsAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteSocials);
  const upsert = useServerFn(adminUpsertSocial);
  const del = useServerFn(adminDeleteSocial);
  const { data = [] } = useQuery({ queryKey: ["cms", "socials"], queryFn: () => load() });
  const [editing, setEditing] = useState<Partial<Social> | null>(null);

  const saveMut = useMutation({
    mutationFn: async (v: Partial<Social>) => {
      const payload: Record<string, unknown> = {
        platform: (v.platform || "custom").toLowerCase(),
        label: v.label || "",
        url: v.url || "",
        icon: v.icon ?? "Globe",
        sort_order: Number(v.sort_order ?? data.length + 1),
      };
      if (v.id) payload.id = v.id;
      return upsert({ data: payload as never });
    },
    onSuccess: async () => {
      toast.success("Social saved");
      await qc.invalidateQueries({ queryKey: ["cms", "socials"] });
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message || "Save failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: async () => {
      toast.success("Deleted");
      await qc.invalidateQueries({ queryKey: ["cms", "socials"] });
    },
    onError: (e: Error) => toast.error(e.message || "Delete failed"),
  });

  function remove(id: string) {
    if (!confirm("Delete this social handle?")) return;
    deleteMut.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Social Media</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage WhatsApp, Instagram, Email, Telegram and any other handles embedded on the site.</p>
        </div>
        <button onClick={() => setEditing({ platform: "", label: "", url: "", icon: "Globe", sort_order: data.length + 1 })} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background">
          <Plus className="h-4 w-4" /> Add handle
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="p-3">Platform</th><th className="p-3">Label</th><th className="p-3">URL</th><th className="p-3">Icon</th><th className="p-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="p-3 font-medium">{s.platform}</td>
                <td className="p-3">{s.label}</td>
                <td className="p-3 text-xs text-muted-foreground"><a href={s.url} target="_blank" rel="noreferrer" className="hover:text-foreground">{s.url}</a></td>
                <td className="p-3 text-xs">{s.icon}</td>
                <td className="p-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button onClick={() => setEditing(s)} className="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-secondary">Edit</button>
                    <button onClick={() => remove(s.id)} className="inline-flex items-center gap-1 rounded-md border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20">
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit handle" : "New handle"}</h2>
            <div className="mt-4 space-y-3">
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Platform (whatsapp, instagram, email, telegram…)</div><input className="input" value={editing.platform || ""} onChange={(e) => setEditing({ ...editing, platform: e.target.value.toLowerCase() })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Label</div><input className="input" value={editing.label || ""} onChange={(e) => setEditing({ ...editing, label: e.target.value })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">URL (https://…, mailto:…, tel:…)</div><input className="input" value={editing.url || ""} onChange={(e) => setEditing({ ...editing, url: e.target.value })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Icon</div>
                <select className="input" value={editing.icon || "Globe"} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}>
                  {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Sort order</div><input type="number" className="input" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-lg border border-border px-4 py-2 text-sm">Cancel</button>
              <button
                onClick={() => saveMut.mutate(editing)}
                disabled={saveMut.isPending}
                className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-60"
              >
                <Save className="h-4 w-4"/> {saveMut.isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
