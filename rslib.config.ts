import { defineConfig } from "@rslib/core";
import { pluginSolid } from "@rsbuild/plugin-solid";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "es2020",
      dts: true,
    },
  ],
  plugins: [pluginSolid()],
  source: {
    tsconfigPath: "./tsconfig.package.json",
    entry: {
      package: "./src/package.ts",
    },
  },
  output: {
    cleanDistPath: true,
    copy: [
      { from: "./src/components/usible.css", to: "style.css" },
      { from: "./src/components/themes", to: "themes" },
    ],
  },
  resolve: {
    alias: {
      "~": "./src",
    },
  },
});
