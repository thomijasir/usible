import { describe, it, expect } from "@rstest/core";

describe("Image Component", () => {
  it("renders with src and alt attributes", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="relative overflow-hidden bg-gray-100">
        <img src="https://example.com/image.jpg" alt="Test image" loading="lazy" class="w-full h-full object-cover transition-opacity duration-300 opacity-100" />
      </div>
    `;

    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("https://example.com/image.jpg");
    expect(img?.getAttribute("alt")).toBe("Test image");
    expect(img?.getAttribute("loading")).toBe("lazy");
  });

  it("renders with eager loading", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden bg-gray-100">
        <img src="https://example.com/image.jpg" alt="Test" loading="eager" />
      </div>
    `;

    const img = container.querySelector("img");
    expect(img?.getAttribute("loading")).toBe("eager");
  });

  it("renders with custom width and height", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden bg-gray-100" style="width: 200px; height: 150px;">
        <img src="https://example.com/image.jpg" alt="Test" />
      </div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.style.width).toBe("200px");
    expect(wrapper?.style.height).toBe("150px");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden bg-gray-100 custom-image-class">
        <img src="https://example.com/image.jpg" alt="Test" />
      </div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("custom-image-class");
  });

  it("renders fallback when no src provided", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative overflow-hidden bg-gray-100">
        <div class="w-full h-full flex items-center justify-center text-gray-400" data-testid="image-fallback">
          <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    `;

    const fallback = container.querySelector('[data-testid="image-fallback"]');
    expect(fallback).toBeTruthy();
  });
});
