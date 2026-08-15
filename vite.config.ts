import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    // Vercel builds use the Vercel preset so `vite build` emits a
    // Vercel-compatible serverless bundle; local builds keep the default.
    nitro({ preset: process.env.VERCEL ? "vercel" : undefined }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
