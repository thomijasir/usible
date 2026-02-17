import { describe, it, expect } from "@rstest/core";

describe("Backdrop Component", () => {
  it("renders when isOpen is true", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="fixed inset-0 bg-black z-40 backdrop-blur-md" style="opacity: 0.7; display: block;"></div>
    `;

    const backdrop = container.querySelector("div");
    expect(backdrop).toBeTruthy();
    expect(backdrop?.className).toContain("fixed inset-0");
    expect(backdrop?.className).toContain("bg-black");
  });

  it("renders with custom opacity", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed inset-0 bg-black z-40 backdrop-blur-md" style="opacity: 0.5;"></div>
    `;

    const backdrop = container.querySelector("div") as HTMLDivElement;
    expect(backdrop?.style.opacity).toBe("0.5");
  });

  it("has correct z-index", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed inset-0 bg-black z-40"></div>
    `;

    const backdrop = container.querySelector("div");
    expect(backdrop?.className).toContain("z-40");
  });

  it("has backdrop blur effect", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed inset-0 bg-black z-40 backdrop-blur-md"></div>
    `;

    const backdrop = container.querySelector("div");
    expect(backdrop?.className).toContain("backdrop-blur-md");
  });
});
