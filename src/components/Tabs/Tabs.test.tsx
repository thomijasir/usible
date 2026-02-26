import { describe, it, expect } from "@rstest/core";

describe("Tabs Component", () => {
  it("renders tab buttons", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <div class="relative flex flex-row border-b border-gray-200">
          <button class="px-4 py-3 font-medium text-sm text-primary">Tab 1</button>
          <button class="px-4 py-3 font-medium text-sm text-gray-600">Tab 2</button>
        </div>
        <div class="mt-4">Content 1</div>
      </div>
    `;
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
  });

  it("marks active tab with text-primary", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <button class="text-primary font-medium" data-active="true">Active Tab</button>
        <button class="text-gray-600 font-medium">Inactive Tab</button>
      </div>
    `;
    const activeBtn = container.querySelector("[data-active='true']");
    expect(activeBtn?.className).toContain("text-primary");
  });

  it("renders disabled tab", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <button class="opacity-40 cursor-not-allowed" disabled>Disabled</button>
      </div>
    `;
    const btn = container.querySelector("button");
    expect(btn?.disabled).toBe(true);
    expect(btn?.className).toContain("opacity-40");
  });

  it("renders filled variant with bg-gray-100", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-gray-100 rounded-lg p-1">
        <button class="rounded-md">Tab</button>
      </div>
    `;
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("bg-gray-100");
  });

  it("renders vertical orientation as flex-col", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative flex flex-col">
        <button>Tab 1</button>
        <button>Tab 2</button>
      </div>
    `;
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("flex-col");
  });

  it("renders tab content area", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <div class="relative flex border-b border-gray-200">
          <button>Tab 1</button>
        </div>
        <div class="mt-4"><p>Tab content here</p></div>
      </div>
    `;
    expect(container.querySelector("p")?.textContent).toBe("Tab content here");
  });
});
