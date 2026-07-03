import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Save, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  getSiteProjects,
  adminUpsertProject,
  adminDeleteProject,
  adminUploadImage,
  type Project,
} from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsAdmin,
});

function ProjectsAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteProjects);
  const upsert = useServerFn(adminUpsertProject);
  const del = useServerFn(adminDeleteProject);
  const upload = useServerFn(adminUploadImage);
  const { data = [] } = useQuery({ queryKey: ["cms", "projects"], queryFn: () => load() });
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [uploading, setUploading] = useState(false);

  async function onFile(f: File) {
    setUploading(true);
    const dataUrl = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = rej;
      r.readAsDataURL(f);
    });
    const { url } = await upload({ data: { filename: f.name, dataUrl } });
    setUploading(false);
    setEditing((e) => ({ ...(e || {}), image_url: url }));
  }

  async function save() {
    if (!editing?.image_url) return alert("Upload an image first");
    await upsert({
      data: {
        id: editing.id,
        image_url: editing.image_url,
        alt: editing.alt ?? null,
        tag: editing.tag ?? null,
        sort_order: Number(editing.sort_order ?? data.length + 1),
      },
    });
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["cms", "projects"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await del({ data: { id } });
    qc.invalidateQueries({ queryKey: ["cms", "projects"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Selected Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload, edit or remove images in the homepage carousel.</p>
        </div>
        <button
          onClick={() => setEditing({ image_url: "", tag: "", alt: "", sort_order: data.length + 1 })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background"
        >
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-video bg-surface">
              <img src={p.image_url} alt={p.alt || ""} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</div>
              <div className="mt-1 line-clamp-1 text-sm">{p.alt}</div>
              <div className="mt-3 flex justify-between text-xs">
                <button onClick={() => setEditing(p)} className="text-primary hover:underline">Edit</button>
                <button onClick={() => remove(p.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit project" : "New project"}</h2>
            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 text-xs font-medium text-muted-foreground">Image</div>
                {editing.image_url && (
                  <img src={editing.image_url} alt="" className="mb-2 max-h-40 rounded-lg border border-border object-contain" />
                )}
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs">
                  <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading…" : "Upload image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
                </label>
              </div>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Tag</div><input className="input" value={editing.tag || ""} onChange={(e) => setEditing({ ...editing, tag: e.target.value })} /></label>
              <label className="block"><div className="mb-1 text-xs font-medium text-muted-foreground">Alt text</div><input className="input" value={editing.alt || ""} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} /></label>
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
