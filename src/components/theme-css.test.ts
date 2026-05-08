import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));

const themeFiles = [
  "usible.css",
  "themes/materialize.css",
  "themes/aurora.css",
  "themes/trusible.css",
];

const readTheme = (file: string) =>
  readFileSync(join(currentDir, file), "utf8");

const getThemeTokens = (css: string) =>
  Array.from(css.matchAll(/--(color|radius|shadow)-[a-z0-9-]+:/g))
    .map((match) => match[0].slice(0, -1))
    .sort();

describe("theme CSS contract", () => {
  it("keeps alternate theme files as complete stylesheet entrypoints", () => {
    for (const file of themeFiles) {
      const css = readTheme(file);
      expect(css).toContain('@import "tailwindcss"');
      expect(css).toContain("@theme inline");
      expect(css).toContain(":root");
    }
  });

  it("exposes the same Tailwind theme tokens in every theme file", () => {
    const [baseTokens, ...alternateTokens] = themeFiles.map((file) =>
      getThemeTokens(readTheme(file)),
    );

    for (const tokens of alternateTokens) {
      expect(tokens).toEqual(baseTokens);
    }
  });
});
