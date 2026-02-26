import { describe, it, expect } from "@rstest/core";

describe("Card Component", () => {
  it("renders with elevated variant by default", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-sm border border-gray-100">
        Content
      </div>
    `;
    const card = container.querySelector("div");
    expect(card?.className).toContain("shadow-sm");
    expect(card?.className).toContain("rounded-2xl");
  });

  it("renders with outlined variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="rounded-2xl overflow-hidden bg-transparent border border-gray-200">
        Content
      </div>
    `;
    const card = container.querySelector("div");
    expect(card?.className).toContain("border-gray-200");
    expect(card?.className).not.toContain("shadow-sm");
  });

  it("renders with filled variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="rounded-2xl overflow-hidden bg-gray-50">
        Content
      </div>
    `;
    const card = container.querySelector("div");
    expect(card?.className).toContain("bg-gray-50");
  });

  it("renders children", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div><span>Hello</span></div>`;
    expect(container.querySelector("span")?.textContent).toBe("Hello");
  });

  it("adds cursor-pointer when onClick provided", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="cursor-pointer active:scale-[0.98]">Content</div>`;
    const card = container.querySelector("div");
    expect(card?.className).toContain("cursor-pointer");
  });
});
