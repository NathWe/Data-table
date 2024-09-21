import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/data-table-nathalie.ts"),
      name: "data-table",
      fileName: "data-table",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  // Mode développement pour tester la démo
  server: {
    open: "/src/demo.tsx",
  },
});
