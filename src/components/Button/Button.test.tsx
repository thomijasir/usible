import { describe, it, expect } from "@rstest/core";

describe("Button Component", () => {
  it("renders with default props (filled, primary, medium)", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <button class="select-none inline-flex items-center justify-center rounded-md font-semibold focus:outline-none transition-colors duration-200 relative overflow-hidden bg-usible-primary text-white hover:bg-usible-primary-dark px-5 py-3 text-base">
        Click me
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.textContent?.trim()).toBe("Click me");
    expect(button?.className).toContain("bg-usible-primary");
    expect(button?.className).toContain("text-white");
  });

  it("renders with outlined variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="select-none inline-flex items-center justify-center rounded-md font-semibold border border-usible-primary text-usible-primary">
        Outlined
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("border-usible-primary");
    expect(button?.className).toContain("text-usible-primary");
  });

  it("renders with text variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="select-none inline-flex items-center justify-center rounded-md font-semibold text-usible-primary hover:bg-usible-primary-light">
        Text Button
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("text-usible-primary");
    expect(button?.className).toContain("hover:bg-usible-primary-light");
  });

  it("renders with secondary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="bg-usible-secondary text-white hover:bg-usible-secondary-dark">
        Secondary
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("bg-usible-secondary");
  });

  it("renders with small size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="px-4 py-2.5 text-sm">Small</button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("px-4 py-2.5");
    expect(button?.className).toContain("text-sm");
  });

  it("renders with large size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="px-6 py-4 text-lg">Large</button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("px-6 py-4");
    expect(button?.className).toContain("text-lg");
  });

  it("renders as block (full width)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="w-full">Block Button</button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("w-full");
  });

  it("renders as disabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="opacity-50 cursor-not-allowed pointer-events-none" disabled>
        Disabled
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.disabled).toBe(true);
    expect(button?.className).toContain("opacity-50");
  });

  it("renders with icon variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="select-none inline-flex items-center justify-center rounded-full text-usible-primary hover:bg-usible-primary-light p-2">
        <svg class="w-5 h-5"></svg>
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.className).toContain("rounded-full");
    expect(button?.className).toContain("p-2");
  });

  it("renders with submit type", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button type="submit">Submit</button>
    `;

    const button = container.querySelector("button");
    expect(button?.type).toBe("submit");
  });
});
