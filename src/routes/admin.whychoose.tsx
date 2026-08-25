import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getSiteWhyChoose, adminUpsertWhyChoose, adminDeleteWhyChoose, type WhyChoose } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/whychoose")({
  component: WhyChooseAdmin,
});

function WhyChooseAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteWhyChoose);
  const upsert = useServerFn(adminUpsertWhyChoose);
  const del = useServerFn(adminDeleteWhyChoose);
  const { data = [] } = useQuery({ queryKey: ["cms", "whychoose"], queryFn: () => load() });
  const [editing, setEditing] = useState<Partial<WhyChoose> | null>(null);

  const saveMut = useMutation({
    mutationFn: async (v: Partial<WhyChoose>) => {
      const payload: Record<string, unknown> = { title: v.title || "", description: (v as any).description ?? (v as any).desc ?? null, sort_order: Number(v.sort_order ?? data.length + 1) };
      if (v.id) payload.id = v.id;
      return upsert({ data: payload as never });
    },
    onSuccess: async () => { toast.success("Saved"); await qc.invalidateQueries({ queryKey: ["cms", "whychoose"] }); setEditing(null); },
    onError: (e: Error) => toast.error(e.message || "Save failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: async () => { toast.success("Deleted"); await qc.invalidateQueries({ queryKey: ["cms", "whychoose"] }); },
    onError: (e: Error) => toast.error(e.message || "Delete failed"),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Why Choose Us</h1>
          <p className="mt-1 text-sm text-muted-foreground">Edit the 6 cards in "Several Things Define Us As a Company".</p>
        </div>
        <button onClick={() => setEditing({ title: "", description: "", sort_order: data.length + 1 } as any)} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background"><Plus className="h-4 w-4"/> Add card</button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((w) => (
          <div key={w.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="font-medium">{w.title}</div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{(w as any).description ?? (w as any).desc}</p>
            <div className="mt-3 flex gap-2 text-xs">
              <button onClick={() => setEditing(w)} className="text-primary hover:underline">Edit</button>
              <button onClick={() => { if (confirm("Delete?")) deleteMut.mutate(w.id); }} className="text-red-500 hover:underline"><Trash2 className="inline h-3 w-3"/> Delete</button>
            </div>
          </div>
        ))}
        {data.length === 0 && <div className="col-span-3 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No cards yet — add one, or site will show defaults.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit card" : "New card"}</h2>
            <div className="mt-4 space-y-3">
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Title</div><input className="input" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Description</div><textarea rows={3} className="input" value={(editing as any).description ?? (editing as any).desc ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value } as any)} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Sort order</div><input type="number" className="input" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-lg border border-border px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => saveMut.mutate(editing)} disabled={saveMut.isPending} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-60"><Save className="h-4 w-4"/> {saveMut.isPending ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
