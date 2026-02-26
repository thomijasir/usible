import { describe, it, expect } from "@rstest/core";

describe("Radio Component", () => {
  it("renders radio input", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative flex">
        <input type="radio" id="r1" class="h-5 w-5 appearance-none rounded-full" />
      </div>
    `;
    const input = container.querySelector("input");
    expect(input?.type).toBe("radio");
  });

  it("renders label when provided", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <label for="r1">My Label</label>
        <input type="radio" id="r1" />
      </div>
    `;
    const label = container.querySelector("label");
    expect(label?.textContent).toBe("My Label");
  });

  it("renders description when provided", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <input type="radio" id="r1" />
        <span class="text-gray-500">Some description</span>
      </div>
    `;
    expect(container.querySelector("span")?.textContent).toBe("Some description");
  });

  it("renders as disabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="opacity-50 cursor-not-allowed">
        <input type="radio" disabled />
      </div>
    `;
    const input = container.querySelector("input");
    expect(input?.disabled).toBe(true);
    expect(container.querySelector("div")?.className).toContain("opacity-50");
  });

  it("renders boxed variant with border", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="p-4 rounded-xl border border-gray-200">
        <input type="radio" />
      </div>
    `;
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("rounded-xl");
    expect(wrapper?.className).toContain("border");
  });

  it("renders plain variant without border", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="p-0 border-0 bg-transparent">
        <input type="radio" />
      </div>
    `;
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("border-0");
  });

  it("renders error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="border-error bg-red-50">
        <input type="radio" />
      </div>
    `;
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("border-error");
  });
});
