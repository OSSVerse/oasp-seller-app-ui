/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number.parseInt(process.env.PORT || "3000"),
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    exclude: [...configDefaults.exclude, "/src/components/icons/**"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
