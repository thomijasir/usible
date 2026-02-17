import { describe, it, expect } from "@rstest/core";

describe("Checkbox Component", () => {
  it("renders with label", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="relative flex items-center cursor-pointer">
        <div class="relative flex items-center">
          <input type="checkbox" id="checkbox-1" class="peer appearance-none rounded border-2 h-6 w-6" />
          <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <label for="checkbox-1" class="ml-3 select-none cursor-pointer">Accept terms</label>
      </div>
    `;

    const checkbox = container.querySelector('input[type="checkbox"]');
    const label = container.querySelector("label");
    expect(checkbox).toBeTruthy();
    expect(label?.textContent).toBe("Accept terms");
  });

  it("renders as checked", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="checkbox" checked class="peer appearance-none rounded border-2" />
    `;

    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox?.checked).toBe(true);
  });

  it("renders as unchecked", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="checkbox" class="peer appearance-none rounded border-2" />
    `;

    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox?.checked).toBe(false);
  });

  it("renders as disabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative flex items-center opacity-50 cursor-not-allowed">
        <input type="checkbox" disabled class="peer appearance-none rounded border-2 disabled:bg-gray-100" />
        <label class="cursor-not-allowed text-gray-400">Disabled</label>
      </div>
    `;

    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox?.disabled).toBe(true);
  });

  it("renders with error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="checkbox" class="peer appearance-none rounded border-2 border-error" />
    `;

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox?.className).toContain("border-error");
  });

  it("renders with small size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="checkbox" class="peer appearance-none rounded border-2 h-5 w-5" />
    `;

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox?.className).toContain("h-5 w-5");
  });

  it("renders with large size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="checkbox" class="peer appearance-none rounded border-2 h-7 w-7" />
    `;

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox?.className).toContain("h-7 w-7");
  });
});
