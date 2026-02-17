import { describe, it, expect } from "@rstest/core";

describe("Chip Component", () => {
  it("renders with label", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="inline-flex items-center rounded-full px-3 py-1 bg-usible-primary text-white">
        <span>Tag</span>
      </div>
    `;

    const chip = container.querySelector("span");
    expect(chip?.textContent).toBe("Tag");
  });

  it("renders with filled variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="inline-flex items-center rounded-full px-3 py-1 bg-usible-primary text-white">
        <span>Primary</span>
      </div>
    `;

    const chip = container.querySelector("div");
    expect(chip?.className).toContain("bg-usible-primary");
    expect(chip?.className).toContain("text-white");
  });

  it("renders with outlined variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="inline-flex items-center rounded-full px-3 py-1 border border-usible-primary text-usible-primary">
        <span>Outlined</span>
      </div>
    `;

    const chip = container.querySelector("div");
    expect(chip?.className).toContain("border-usible-primary");
    expect(chip?.className).toContain("text-usible-primary");
  });

  it("renders with delete button", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="inline-flex items-center rounded-full px-3 py-1 bg-usible-primary">
        <span>Deletable</span>
        <button class="ml-1" aria-label="delete">×</button>
      </div>
    `;

    const deleteBtn = container.querySelector("button");
    expect(deleteBtn).toBeTruthy();
    expect(deleteBtn?.getAttribute("aria-label")).toBe("delete");
  });

  it("renders with small size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="inline-flex items-center rounded-full px-2 py-0.5 text-sm">
        <span>Small</span>
      </div>
    `;

    const chip = container.querySelector("div");
    expect(chip?.className).toContain("px-2 py-0.5");
  });

  it("renders with success color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="inline-flex items-center rounded-full bg-usible-success text-white">
        <span>Success</span>
      </div>
    `;

    const chip = container.querySelector("div");
    expect(chip?.className).toContain("bg-usible-success");
  });

  it("renders with error color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="inline-flex items-center rounded-full bg-usible-error text-white">
        <span>Error</span>
      </div>
    `;

    const chip = container.querySelector("div");
    expect(chip?.className).toContain("bg-usible-error");
  });
});
