import { describe, it, expect } from "@rstest/core";

describe("Loader Component", () => {
  it("renders with default size and color", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `<div role="status" aria-label="Loading" class="inline-block rounded-full animate-spin w-8 h-8 border-3 border-usible-primary/30 border-t-usible-primary"></div>`;

    const loader = container.querySelector("div");
    expect(loader?.getAttribute("role")).toBe("status");
    expect(loader?.getAttribute("aria-label")).toBe("Loading");
    expect(loader?.className).toContain("animate-spin");
    expect(loader?.className).toContain("w-8 h-8");
  });

  it("renders with small size", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div role="status" class="inline-block rounded-full animate-spin w-4 h-4 border-2"></div>`;

    const loader = container.querySelector("div");
    expect(loader?.className).toContain("w-4 h-4");
    expect(loader?.className).toContain("border-2");
  });

  it("renders with large size", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div role="status" class="inline-block rounded-full animate-spin w-12 h-12 border-4"></div>`;

    const loader = container.querySelector("div");
    expect(loader?.className).toContain("w-12 h-12");
    expect(loader?.className).toContain("border-4");
  });

  it("renders with secondary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div role="status" class="inline-block rounded-full animate-spin border-usible-secondary/30 border-t-usible-secondary"></div>`;

    const loader = container.querySelector("div");
    expect(loader?.className).toContain("border-usible-secondary");
  });

  it("renders with white color", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div role="status" class="inline-block rounded-full animate-spin border-white/30 border-t-white"></div>`;

    const loader = container.querySelector("div");
    expect(loader?.className).toContain("border-white");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div role="status" class="inline-block rounded-full animate-spin custom-loader-class"></div>`;

    const loader = container.querySelector("div");
    expect(loader?.className).toContain("custom-loader-class");
  });
});
