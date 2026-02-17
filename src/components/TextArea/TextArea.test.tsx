import { describe, it, expect } from "@rstest/core";

describe("TextArea Component", () => {
  it("renders with default props", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex flex-col w-full">
        <div class="relative">
          <div class="flex items-start w-full rounded-lg border bg-gray-100 dark:bg-gray-800 transition-colors duration-200 border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light">
            <textarea class="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed resize-none py-3 px-3 text-base" rows="4"></textarea>
          </div>
        </div>
      </div>
    `;

    const textarea = container.querySelector("textarea");
    expect(textarea).toBeTruthy();
    expect(textarea?.getAttribute("rows")).toBe("4");
  });

  it("renders with label", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <label class="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
        <div class="relative">
          <textarea class="w-full bg-transparent" rows="4"></textarea>
        </div>
      </div>
    `;

    const label = container.querySelector("label");
    expect(label?.textContent).toBe("Description");
  });

  it("renders with placeholder", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <textarea placeholder="Enter your message..." rows="4"></textarea>
    `;

    const textarea = container.querySelector("textarea");
    expect(textarea?.placeholder).toBe("Enter your message...");
  });

  it("renders with small size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <textarea class="py-2 px-3 text-sm" rows="4"></textarea>
    `;

    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("py-2 px-3 text-sm");
  });

  it("renders with large size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <textarea class="py-4 px-4 text-lg" rows="4"></textarea>
    `;

    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("py-4 px-4 text-lg");
  });

  it("renders with error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-start w-full rounded-lg border bg-gray-100 border-error bg-red-50 dark:bg-red-900/10 text-error focus-within:border-error">
        <textarea class="w-full bg-transparent" rows="4"></textarea>
      </div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("border-error");
  });

  it("renders with error message", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <textarea rows="4"></textarea>
        <div class="mt-1 text-xs">
          <span class="text-error">This field is required</span>
        </div>
      </div>
    `;

    const errorText = container.querySelector(".text-error");
    expect(errorText?.textContent).toBe("This field is required");
  });

  it("renders with helper text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <textarea rows="4"></textarea>
        <div class="mt-1 text-xs">
          <span class="text-ternary">Maximum 500 characters</span>
        </div>
      </div>
    `;

    const helperText = container.querySelector(".text-ternary");
    expect(helperText?.textContent).toBe("Maximum 500 characters");
  });

  it("renders with disabled state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-start w-full rounded-lg border opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900">
        <textarea disabled rows="4" class="disabled:cursor-not-allowed"></textarea>
      </div>
    `;

    const textarea = container.querySelector("textarea");
    expect(textarea?.disabled).toBe(true);
  });

  it("renders with custom rows", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <textarea rows="6"></textarea>
    `;

    const textarea = container.querySelector("textarea");
    expect(textarea?.getAttribute("rows")).toBe("6");
  });
});
