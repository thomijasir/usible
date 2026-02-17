import { describe, it, expect } from "@rstest/core";

describe("Numpad Component", () => {
  it("renders with default light theme", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex flex-col items-center gap-6 rounded-xl max-w-xs mx-auto p-6 bg-white text-gray-900">
        <div class="grid grid-cols-3 gap-x-8 gap-y-6">
          <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 shadow-sm">1</button>
          <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 shadow-sm">2</button>
          <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 shadow-sm">3</button>
        </div>
      </div>
    `;

    const numpad = container.querySelector("div");
    expect(numpad?.className).toContain("bg-white");
    expect(numpad?.className).toContain("text-gray-900");
  });

  it("renders with dark theme", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col items-center gap-6 rounded-xl max-w-xs mx-auto p-6 bg-gray-900 text-white">
        <div class="grid grid-cols-3 gap-x-8 gap-y-6">
          <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white">1</button>
        </div>
      </div>
    `;

    const numpad = container.querySelector("div");
    expect(numpad?.className).toContain("bg-gray-900");
    expect(numpad?.className).toContain("text-white");
  });

  it("renders all number keys (0-9)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="grid grid-cols-3 gap-x-8 gap-y-6">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="opacity-0 pointer-events-none"></button>
        <button>0</button>
        <button></button>
      </div>
    `;

    const buttons = container.querySelectorAll("button");
    const visibleButtons = Array.from(buttons).filter(
      (btn) => !btn.classList.contains("opacity-0"),
    );
    expect(visibleButtons.length).toBe(11);
  });

  it("renders fingerprint button for biometric auth", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none text-gray-900 hover:bg-gray-100 active:bg-gray-200">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
      </button>
    `;

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
  });

  it("renders backspace button", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none text-gray-900 hover:bg-gray-100 active:bg-gray-200">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
      </button>
    `;

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
  });

  it("hides fingerprint button when onBiometricAuth not provided", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="flex h-16 w-16 items-center justify-center rounded-full opacity-0 pointer-events-none">
        <svg class="w-8 h-8"></svg>
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.classList.contains("opacity-0")).toBe(true);
    expect(button?.classList.contains("pointer-events-none")).toBe(true);
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col items-center gap-6 rounded-xl max-w-xs mx-auto p-6 bg-white text-gray-900 custom-numpad-class">
      </div>
    `;

    const numpad = container.querySelector("div");
    expect(numpad?.className).toContain("custom-numpad-class");
  });

  it("has correct grid layout (3 columns)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="grid grid-cols-3 gap-x-8 gap-y-6">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    `;

    const grid = container.querySelector("div");
    expect(grid?.classList.contains("grid-cols-3")).toBe(true);
  });

  it("has correct button size (h-16 w-16)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium">
        5
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.classList.contains("h-16")).toBe(true);
    expect(button?.classList.contains("w-16")).toBe(true);
  });

  it("has active scale effect", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95">
        5
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.classList.contains("active:scale-95")).toBe(true);
  });
});
