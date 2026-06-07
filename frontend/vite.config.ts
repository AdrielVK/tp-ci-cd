import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const __dirname = resolve(fileURLToPath(new URL(".", import.meta.url)));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup-tests.ts", // Archivo para extender matchers de Jest-DOM
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/__tests__/**", "src/test/**", "src/**/__mocks__/**", "src/main.tsx"],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
      },
    },
  },
});
