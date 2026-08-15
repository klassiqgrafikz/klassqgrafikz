import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Upload } from "lucide-react";
import { getSiteSettings, adminUpdateSettings, adminUploadImage } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/branding")({
  component: BrandingAdmin,
});

function BrandingAdmin() {
  const qc = useQueryClient();
  const load = useServerFn(getSiteSettings);
  const save = useServerFn(adminUpdateSettings);
  const upload = useServerFn(adminUploadImage);
  const { data } = useQuery({ queryKey: ["cms", "settings"], queryFn: () => load() });
  const [logo, setLogo] = useState<string | null>(null);
  const [color, setColor] = useState<string>("#FF7C00");
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setLogo(data.logo_url);
      setColor(data.primary_color || "#FF7C00");
    }
  }, [data]);

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
    setLogo(url);
  }

  async function handleSave() {
    await save({ data: { logo_url: logo, primary_color: color } });
    qc.invalidateQueries({ queryKey: ["cms", "settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Branding</h1>
      <p className="mt-1 text-sm text-muted-foreground">Set the primary color and logo used across the site.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Primary color</div>
          <div className="mt-4 flex items-center gap-4">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-16 w-16 cursor-pointer rounded-lg border border-border" />
            <input className="input flex-1 font-mono" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div className="mt-4 rounded-xl p-4 text-white" style={{ background: color }}>
            Preview — buttons, accents and highlights will use this color.
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Logo</div>
          <div className="mt-4 grid h-40 place-items-center rounded-xl border border-dashed border-border bg-surface/40">
            {logo ? <img src={logo} alt="logo" className="max-h-full max-w-full object-contain" /> : <span className="text-xs text-muted-foreground">No logo uploaded</span>}
          </div>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs">
            <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading…" : "Upload logo"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          </label>
          {logo && <button onClick={() => setLogo(null)} className="ml-2 text-xs text-red-500 hover:underline">Remove</button>}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"><Save className="h-4 w-4"/> Save branding</button>
        {saved && <span className="text-xs text-green-500">Saved ✓</span>}
      </div>
    </div>
  );
}
