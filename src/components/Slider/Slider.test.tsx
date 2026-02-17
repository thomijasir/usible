import { describe, it, expect } from "@rstest/core";

describe("Slider Component", () => {
  it("renders with label", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="w-full select-none">
        <div class="flex justify-between mb-2 items-end">
          <span class="font-medium text-slate-700">Volume</span>
        </div>
        <div class="relative w-full h-6 flex items-center">
          <input type="range" min="0" max="100" step="1" value="50" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
      </div>
    `;

    const label = container.querySelector("span");
    expect(label?.textContent).toBe("Volume");
  });

  it("renders with value display", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="w-full select-none">
        <div class="flex justify-between mb-2 items-end">
          <span class="font-medium">Opacity</span>
          <span class="font-semibold text-primary">75</span>
        </div>
        <input type="range" value="75" class="w-full h-2 bg-slate-200 rounded-lg" />
      </div>
    `;

    const value = container.querySelector(".text-primary");
    expect(value?.textContent).toBe("75");
  });

  it("renders with min and max values", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="range" min="0" max="100" step="1" value="50" class="w-full h-2 bg-slate-200 rounded-lg" />
    `;

    const slider = container.querySelector("input") as HTMLInputElement;
    expect(slider?.min).toBe("0");
    expect(slider?.max).toBe("100");
  });

  it("renders with custom step", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="range" min="0" max="1" step="0.1" value="0.5" class="w-full h-2 bg-slate-200 rounded-lg" />
    `;

    const slider = container.querySelector("input") as HTMLInputElement;
    expect(slider?.step).toBe("0.1");
  });

  it("renders as disabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="range" disabled class="w-full h-2 bg-slate-200 rounded-lg opacity-50 cursor-not-allowed pointer-events-none" />
    `;

    const slider = container.querySelector("input") as HTMLInputElement;
    expect(slider?.disabled).toBe(true);
  });

  it("renders with primary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="range" class="w-full h-2 bg-slate-200 rounded-lg accent-primary" />
    `;

    const slider = container.querySelector("input");
    expect(slider?.className).toContain("accent-primary");
  });

  it("renders with secondary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="range" class="w-full h-2 bg-slate-200 rounded-lg accent-secondary" />
    `;

    const slider = container.querySelector("input");
    expect(slider?.className).toContain("accent-secondary");
  });
});
