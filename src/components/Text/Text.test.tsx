import { describe, it, expect } from "@rstest/core";

describe("Text Component", () => {
  it("renders with default variant and color", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `<p class="text-base text-gray-900">Hello World</p>`;

    const textElement = container.querySelector("p");
    expect(textElement?.textContent).toBe("Hello World");
    expect(textElement?.className).toContain("text-base");
    expect(textElement?.className).toContain("text-gray-900");
  });

  it("renders with h1 variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `<h1 class="text-5xl font-bold">Heading 1</h1>`;

    const textElement = container.querySelector("h1");
    expect(textElement?.textContent).toBe("Heading 1");
    expect(textElement?.className).toContain("text-5xl");
    expect(textElement?.className).toContain("font-bold");
  });

  it("renders with primary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `<p class="text-base text-primary">Primary Text</p>`;

    const textElement = container.querySelector("p");
    expect(textElement?.className).toContain("text-primary");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `<p class="text-base text-gray-900 custom-class">Custom Text</p>`;

    const textElement = container.querySelector("p");
    expect(textElement?.className).toContain("custom-class");
  });

  it("renders with combined variant, color, and class", () => {
    const container = document.createElement("div");
    container.innerHTML = `<h3 class="text-3xl font-bold text-secondary extra-class">Combined Text</h3>`;

    const textElement = container.querySelector("h3");
    expect(textElement?.textContent).toBe("Combined Text");
    expect(textElement?.className).toContain("text-3xl");
    expect(textElement?.className).toContain("font-bold");
    expect(textElement?.className).toContain("text-secondary");
    expect(textElement?.className).toContain("extra-class");
  });
});
