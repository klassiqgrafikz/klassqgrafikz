import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { getPinnedReviews, adminUpsertReview, adminDeleteReview, type PinnedReview } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/reviews")({
  component: ReviewsAdmin,
});

function ReviewsAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getPinnedReviews);
  const upsert = useServerFn(adminUpsertReview);
  const del = useServerFn(adminDeleteReview);
  const { data = [] } = useQuery({ queryKey: ["cms", "reviews"], queryFn: () => load() });
  const [editing, setEditing] = useState<Partial<PinnedReview> | null>(null);

  async function save() {
    if (!editing) return;
    await upsert({
      data: {
        id: editing.id,
        initials: editing.initials || "??",
        name: editing.name || "",
        location: editing.location ?? null,
        body: editing.body || "",
        sort_order: Number(editing.sort_order ?? data.length + 1),
      },
    });
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["cms", "reviews"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete review?")) return;
    await del({ data: { id } });
    qc.invalidateQueries({ queryKey: ["cms", "reviews"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add or remove testimonials shown on the homepage.</p>
        </div>
        <button onClick={() => setEditing({ initials: "", name: "", location: "", body: "", sort_order: data.length + 1 })} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background">
          <Plus className="h-4 w-4" /> Add review
        </button>
      </div>

      <div className="mt-6 grid gap-3">
        {data.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">{r.initials}</div>
              <div className="flex-1">
                <div className="font-medium">{r.name} <span className="text-xs text-muted-foreground">· {r.location}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">"{r.body}"</p>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <button onClick={() => setEditing(r)} className="text-primary hover:underline">Edit</button>
                <button onClick={() => remove(r.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit review" : "New review"}</h2>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Initials</div><input maxLength={4} className="input" value={editing.initials || ""} onChange={(e) => setEditing({ ...editing, initials: e.target.value.toUpperCase() })} /></label>
                <label className="col-span-2 block"><div className="mb-1 text-xs font-medium text-muted-foreground">Name</div><input className="input" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></label>
              </div>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Location</div><input className="input" value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Body</div><textarea rows={4} className="input" value={editing.body || ""} onChange={(e) => setEditing({ ...editing, body: e.target.value })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Sort order</div><input type="number" className="input" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
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
