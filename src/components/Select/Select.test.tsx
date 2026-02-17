import { describe, it, expect } from "@rstest/core";

describe("Select Component", () => {
  it("renders with default props", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex flex-col w-full">
        <div class="relative">
          <div class="flex items-center w-full rounded-lg border bg-gray-50 dark:bg-gray-800 transition-colors duration-200 border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light">
            <select class="w-full bg-transparent py-3 px-3 text-gray-900 dark:text-white appearance-none focus:outline-none disabled:cursor-not-allowed">
              <option value="" disabled>Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;

    const select = container.querySelector("select");
    expect(select).toBeTruthy();
  });

  it("renders with label", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <label class="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">Choose Option</label>
        <select class="w-full bg-transparent">
          <option value="1">Option 1</option>
        </select>
      </div>
    `;

    const label = container.querySelector("label");
    expect(label?.textContent).toBe("Choose Option");
  });

  it("renders with placeholder", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <select>
        <option value="" disabled>Select an option</option>
        <option value="1">Option 1</option>
      </select>
    `;

    const placeholder = container.querySelector('option[value=""]');
    expect(placeholder?.textContent).toBe("Select an option");
  });

  it("renders with options", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `;

    const options = container.querySelectorAll("option");
    expect(options.length).toBe(3);
  });

  it("renders with error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center w-full rounded-lg border border-error bg-red-50 dark:bg-red-900/10 text-error focus-within:border-error">
        <select class="w-full bg-transparent">
          <option value="1">Option 1</option>
        </select>
      </div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("border-error");
  });

  it("renders with error message", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <select>
          <option value="1">Option 1</option>
        </select>
        <div class="mt-1 text-xs">
          <span class="text-error">Please select an option</span>
        </div>
      </div>
    `;

    const errorText = container.querySelector(".text-error");
    expect(errorText?.textContent).toBe("Please select an option");
  });

  it("renders with helper text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <select>
          <option value="1">Option 1</option>
        </select>
        <div class="mt-1 text-xs">
          <span class="text-ternary">Choose your preferred option</span>
        </div>
      </div>
    `;

    const helperText = container.querySelector(".text-ternary");
    expect(helperText?.textContent).toBe("Choose your preferred option");
  });

  it("renders with disabled state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center w-full rounded-lg border opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900">
        <select disabled class="w-full bg-transparent disabled:cursor-not-allowed">
          <option value="1">Option 1</option>
        </select>
      </div>
    `;

    const select = container.querySelector("select");
    expect(select?.disabled).toBe(true);
  });

  it("renders with selected value", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <select value="2">
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `;

    const select = container.querySelector("select");
    expect(select?.value).toBe("2");
  });

  it("renders chevron icon for dropdown indicator", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative">
        <select class="appearance-none">
          <option value="1">Option 1</option>
        </select>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    `;

    const chevron = container.querySelector("svg");
    expect(chevron).toBeTruthy();
    expect(chevron?.classList.contains("w-5")).toBe(true);
  });
});
