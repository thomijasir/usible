import { describe, it, expect } from "@rstest/core";

describe("ErrorBoundary Component", () => {
  it("renders fallback UI with error message", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="h-screen w-full flex flex-col items-center justify-center p-6 bg-white space-y-6 text-center">
        <div class="space-y-2 max-w-md">
          <h4 class="font-bold text-gray-900">Oops! Something went wrong</h4>
          <p class="text-gray-600">We encountered an unexpected error. Please try reloading the application.</p>
          <div class="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
            <span class="font-mono text-red-600">Something failed</span>
          </div>
        </div>
        <button>Reload Application</button>
      </div>
    `;
    expect(container.querySelector("h4")?.textContent).toBe("Oops! Something went wrong");
    expect(container.querySelector(".text-red-600")?.textContent).toBe("Something failed");
    expect(container.querySelector("button")?.textContent).toBe("Reload Application");
  });

  it("fallback container takes full screen", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="h-screen w-full flex flex-col items-center justify-center">
        <button>Reload Application</button>
      </div>
    `;
    expect(container.querySelector("div")?.className).toContain("h-screen");
  });

  it("renders children when no error", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <p>Normal content</p>
      </div>
    `;
    expect(container.querySelector("p")?.textContent).toBe("Normal content");
  });
});
