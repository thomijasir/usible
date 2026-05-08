import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      "~": path.resolve(dirname, "src"),
    },
  },
  test: {
    environment: "happy-dom",
    include: [
      "src/components/**/*.{test,spec}.{ts,tsx}",
      "src/utils/**/*.{test,spec}.{ts,tsx}",
    ],
    setupFiles: ["./tests/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.{ts,tsx}", "src/utils/**/*.{ts,tsx}"],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/*.interface.ts",
        "**/index.ts",
      ],
    },
  },
});
