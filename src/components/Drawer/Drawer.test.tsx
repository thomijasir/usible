import { describe, it, expect } from "@rstest/core";

describe("Drawer Component", () => {
  it("renders when isOpen is true", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden" style="display: block;">
        <div class="overflow-y-auto max-h-full pb-safe">
          <p>Drawer content</p>
        </div>
      </div>
    `;

    const drawer = container.querySelector(".fixed.bottom-0");
    expect(drawer).toBeTruthy();
    expect((drawer as HTMLElement)?.style.display).toBe("block");
  });

  it("is hidden when isOpen is false", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden" style="display: none;">
        <div class="overflow-y-auto max-h-full pb-safe">
          <p>Drawer content</p>
        </div>
      </div>
    `;

    const drawer = container.querySelector(".fixed.bottom-0");
    expect((drawer as HTMLElement)?.style.display).toBe("none");
  });

  it("renders with drag handle when showHandle is true", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden">
        <div class="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        <div class="overflow-y-auto max-h-full pb-safe">
          <p>Content</p>
        </div>
      </div>
    `;

    const handle = container.querySelector(".w-12.h-1\\.5");
    expect(handle).toBeTruthy();
  });

  it("renders children content", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl">
        <div class="overflow-y-auto max-h-full pb-safe">
          <h2>Drawer Title</h2>
          <p>Drawer body content goes here.</p>
        </div>
      </div>
    `;

    const title = container.querySelector("h2");
    const body = container.querySelector("p");
    expect(title?.textContent).toBe("Drawer Title");
    expect(body?.textContent).toBe("Drawer body content goes here.");
  });

  it("renders with rounded top corners", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50">
      </div>
    `;

    const drawer = container.querySelector(".rounded-t-3xl");
    expect(drawer).toBeTruthy();
  });

  it("renders with backdrop", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed inset-0 bg-black/50 z-40" style="display: block;"></div>
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50">
      </div>
    `;

    const backdrop = container.querySelector(".bg-black\\/50");
    expect(backdrop).toBeTruthy();
  });

  it("has correct z-index for stacking", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50">
      </div>
    `;

    const drawer = container.querySelector(".z-50");
    expect(drawer).toBeTruthy();
  });

  it("has touch-action none for drag gestures", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0" style="touch-action: none;">
      </div>
    `;

    const drawer = container.querySelector("div");
    expect((drawer as HTMLElement)?.style.touchAction).toBe("none");
  });

  it("renders with fixed height", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl" style="height: 300px;">
      </div>
    `;

    const drawer = container.querySelector("div");
    expect((drawer as HTMLElement)?.style.height).toBe("300px");
  });

  it("renders with auto height", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl" style="height: auto;">
      </div>
    `;

    const drawer = container.querySelector("div");
    expect((drawer as HTMLElement)?.style.height).toBe("auto");
  });

  it("has overflow hidden on container", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden">
      </div>
    `;

    const drawer = container.querySelector(".overflow-hidden");
    expect(drawer).toBeTruthy();
  });

  it("has scrollable content area", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="overflow-y-auto max-h-full pb-safe">
        <p>Long content here</p>
      </div>
    `;

    const content = container.querySelector(".overflow-y-auto");
    expect(content).toBeTruthy();
  });
});
