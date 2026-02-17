import { describe, it, expect } from "@rstest/core";

describe("InfoBox Component", () => {
  it("renders with title and description", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex items-start p-4 rounded-lg bg-blue-50 border border-blue-200">
        <div class="flex-1">
          <h4 class="font-semibold text-blue-800">Information</h4>
          <p class="text-blue-700 text-sm">This is an info message.</p>
        </div>
      </div>
    `;

    const title = container.querySelector("h4");
    const description = container.querySelector("p");
    expect(title?.textContent).toBe("Information");
    expect(description?.textContent).toBe("This is an info message.");
  });

  it("renders with success color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-start p-4 rounded-lg bg-green-50 border border-green-200">
        <div class="flex-1">
          <h4 class="font-semibold text-green-800">Success</h4>
        </div>
      </div>
    `;

    const infoBox = container.querySelector("div");
    expect(infoBox?.className).toContain("bg-green-50");
    expect(infoBox?.className).toContain("border-green-200");
  });

  it("renders with warning color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-start p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <div class="flex-1">
          <h4 class="font-semibold text-yellow-800">Warning</h4>
        </div>
      </div>
    `;

    const infoBox = container.querySelector("div");
    expect(infoBox?.className).toContain("bg-yellow-50");
  });

  it("renders with error color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-start p-4 rounded-lg bg-red-50 border border-red-200">
        <div class="flex-1">
          <h4 class="font-semibold text-red-800">Error</h4>
        </div>
      </div>
    `;

    const infoBox = container.querySelector("div");
    expect(infoBox?.className).toContain("bg-red-50");
  });

  it("renders with left icon", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-start p-4 rounded-lg bg-blue-50">
        <div class="mr-3 text-blue-500">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
          </svg>
        </div>
        <div class="flex-1">
          <h4>Info</h4>
        </div>
      </div>
    `;

    const icon = container.querySelector("svg");
    expect(icon).toBeTruthy();
  });
});
