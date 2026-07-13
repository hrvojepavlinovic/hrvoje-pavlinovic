import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  server: { hostname: "127.0.0.1" },
  plugins: [tailwind()],
});
