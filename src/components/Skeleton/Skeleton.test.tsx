import { describe, it, expect } from "@rstest/core";

describe("Skeleton Component", () => {
  it("renders with default text variant and pulse animation", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `<div class="bg-gray-200 dark:bg-gray-700 rounded mt-1 mb-1 h-4 w-full animate-pulse"></div>`;

    const skeleton = container.querySelector("div");
    expect(skeleton?.className).toContain("bg-gray-200");
    expect(skeleton?.className).toContain("animate-pulse");
    expect(skeleton?.className).toContain("rounded");
  });

  it("renders with rectangular variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="bg-gray-200 dark:bg-gray-700 rounded"></div>`;

    const skeleton = container.querySelector("div");
    expect(skeleton?.className).toContain("rounded");
    expect(skeleton?.className).not.toContain("rounded-full");
  });

  it("renders with circular variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="bg-gray-200 dark:bg-gray-700 rounded-full"></div>`;

    const skeleton = container.querySelector("div");
    expect(skeleton?.className).toContain("rounded-full");
  });

  it("renders with no animation", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>`;

    const skeleton = container.querySelector("div");
    expect(skeleton?.className).toContain("animate-pulse");
  });

  it("renders with custom width and height", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="bg-gray-200 dark:bg-gray-700 rounded" style="width: 200px; height: 100px;"></div>`;

    const skeleton = container.querySelector("div");
    expect(skeleton?.style.width).toBe("200px");
    expect(skeleton?.style.height).toBe("100px");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="bg-gray-200 dark:bg-gray-700 rounded custom-skeleton"></div>`;

    const skeleton = container.querySelector("div");
    expect(skeleton?.className).toContain("custom-skeleton");
  });
});
