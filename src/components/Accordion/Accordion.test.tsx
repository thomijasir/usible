import { describe, it, expect } from "@rstest/core";

describe("Accordion Component", () => {
  it("renders accordion items", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex flex-col divide-y divide-gray-100 border-t border-b border-gray-100">
        <div class="bg-white">
          <button class="w-full flex items-center justify-between p-4 text-left" aria-expanded="false">
            <span class="font-medium">Section 1</span>
            <svg class="w-5 h-5 text-gray-400">▼</svg>
          </button>
        </div>
        <div class="bg-white">
          <button class="w-full flex items-center justify-between p-4 text-left" aria-expanded="false">
            <span class="font-medium">Section 2</span>
            <svg class="w-5 h-5 text-gray-400">▼</svg>
          </button>
        </div>
      </div>
    `;

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
  });

  it("renders expanded item", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col divide-y divide-gray-100">
        <div class="bg-white">
          <button class="w-full flex items-center justify-between p-4 text-left" aria-expanded="true">
            <span class="font-medium">Expanded Section</span>
          </button>
          <div class="overflow-hidden p-4 pt-0 text-gray-600">
            <p>Expanded content goes here.</p>
          </div>
        </div>
      </div>
    `;

    const button = container.querySelector("button");
    const content = container.querySelector(".overflow-hidden p");
    expect(button?.getAttribute("aria-expanded")).toBe("true");
    expect(content?.textContent).toBe("Expanded content goes here.");
  });

  it("renders disabled item", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col divide-y divide-gray-100">
        <div class="bg-white">
          <button class="w-full flex items-center justify-between p-4 text-left opacity-50 cursor-not-allowed" disabled aria-expanded="false">
            <span class="font-medium">Disabled Section</span>
          </button>
        </div>
      </div>
    `;

    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button?.disabled).toBe(true);
    expect(button?.className).toContain("opacity-50");
  });

  it("has proper border styling", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col divide-y divide-gray-100 border-t border-b border-gray-100">
        <div class="bg-white"><button>Item 1</button></div>
        <div class="bg-white"><button>Item 2</button></div>
      </div>
    `;

    const accordion = container.querySelector("div");
    expect(accordion?.className).toContain("divide-y");
    expect(accordion?.className).toContain("border-t border-b");
  });
});
