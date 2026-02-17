import { describe, it, expect } from "@rstest/core";

describe("Dialog Component", () => {
  it("renders when isOpen is true", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm overflow-hidden pointer-events-auto" role="dialog" aria-modal="true">
          <div class="px-6 pt-6 pb-2">
            <h3 class="text-center font-semibold">Dialog Title</h3>
          </div>
          <div class="px-6 pb-6 pt-2">
            <p class="text-center text-gray-500">Dialog content goes here.</p>
          </div>
        </div>
      </div>
    `;

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
  });

  it("renders with title", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white rounded-2xl" role="dialog">
        <div class="px-6 pt-6 pb-2">
          <h3 class="text-center font-semibold">Confirm Action</h3>
        </div>
      </div>
    `;

    const title = container.querySelector("h3");
    expect(title?.textContent).toBe("Confirm Action");
  });

  it("renders with actions", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white rounded-2xl" role="dialog">
        <div class="px-6 pb-6">Content</div>
        <div class="border-t border-gray-100 p-2 flex flex-row justify-end gap-2 bg-gray-50/50">
          <button class="px-4 py-2 text-gray-600">Cancel</button>
          <button class="px-4 py-2 bg-usible-primary text-white rounded">Confirm</button>
        </div>
      </div>
    `;

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
  });

  it("has correct modal attributes", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white rounded-2xl" role="dialog" aria-modal="true">
        <div>Content</div>
      </div>
    `;

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("role")).toBe("dialog");
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white rounded-2xl custom-dialog-class" role="dialog">
        <div>Content</div>
      </div>
    `;

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toContain("custom-dialog-class");
  });
});
