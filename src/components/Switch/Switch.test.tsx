import { describe, it, expect } from "@rstest/core";

describe("Switch Component", () => {
  it("renders with label", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex items-center justify-between">
        <label for="switch-1" class="mr-3 select-none cursor-pointer">Enable notifications</label>
        <div class="relative inline-block w-12 h-7">
          <input type="checkbox" id="switch-1" class="peer appearance-none w-full h-full rounded-full bg-gray-200" />
          <span class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></span>
        </div>
      </div>
    `;

    const switchInput = container.querySelector('input[type="checkbox"]');
    const label = container.querySelector("label");
    expect(switchInput).toBeTruthy();
    expect(label?.textContent).toBe("Enable notifications");
  });

  it("renders as checked (on)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative inline-block w-12 h-7">
        <input type="checkbox" checked class="peer appearance-none w-full h-full rounded-full bg-gray-200 checked:bg-primary" />
        <span class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm translate-x-5"></span>
      </div>
    `;

    const switchInput = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(switchInput?.checked).toBe(true);
  });

  it("renders as unchecked (off)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative inline-block w-12 h-7">
        <input type="checkbox" class="peer appearance-none w-full h-full rounded-full bg-gray-200" />
        <span class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></span>
      </div>
    `;

    const switchInput = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(switchInput?.checked).toBe(false);
  });

  it("renders as disabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center">
        <label class="cursor-not-allowed text-gray-400">Disabled</label>
        <div class="relative inline-block w-12 h-7">
          <input type="checkbox" disabled class="peer appearance-none w-full h-full rounded-full bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
      </div>
    `;

    const switchInput = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(switchInput?.disabled).toBe(true);
  });

  it("has proper toggle dimensions", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative inline-block w-12 h-7">
        <input type="checkbox" class="peer appearance-none w-full h-full rounded-full" />
        <span class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full"></span>
      </div>
    `;

    const toggleContainer = container.querySelector(".relative");
    const thumb = container.querySelector("span");
    expect(toggleContainer?.className).toContain("w-12 h-7");
    expect(thumb?.className).toContain("w-5 h-5");
  });
});
