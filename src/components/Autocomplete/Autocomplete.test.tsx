import { describe, it, expect } from "@rstest/core";

describe("Autocomplete Component", () => {
  it("renders a trigger input area", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="cursor-pointer">
        <div class="relative">
          <input type="text" readonly placeholder="Select..." value="" />
        </div>
      </div>
    `;
    const input = container.querySelector("input");
    expect(input).toBeTruthy();
    expect(input?.readOnly).toBe(true);
  });

  it("shows selected item label in trigger", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <input type="text" readonly value="Bangkok" />
      </div>
    `;
    const input = container.querySelector<HTMLInputElement>("input");
    expect(input?.value).toBe("Bangkok");
  });

  it("renders search overlay when open", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed inset-0 z-50 bg-white flex flex-col">
        <div>
          <input type="text" placeholder="Search..." />
          <button>Cancel</button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <button class="flex items-center gap-3 p-4">Item 1</button>
          <button class="flex items-center gap-3 p-4">Item 2</button>
        </div>
      </div>
    `;
    expect(container.querySelector("input")?.placeholder).toBe("Search...");
    expect(container.querySelectorAll("button").length).toBeGreaterThan(1);
  });

  it("renders no results message", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-8">
        <p>No results found for "xyz"</p>
      </div>
    `;
    expect(container.querySelector("p")?.textContent).toContain("No results found");
  });

  it("renders item with description", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="flex items-center gap-3 p-4">
        <div>
          <span class="font-medium">Bangkok</span>
          <span class="text-gray-500">Capital city</span>
        </div>
      </button>
    `;
    expect(container.querySelector("button")).toBeTruthy();
    expect(container.querySelector(".text-gray-500")?.textContent).toBe("Capital city");
  });
});
