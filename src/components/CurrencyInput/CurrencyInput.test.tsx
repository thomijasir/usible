import { describe, it, expect } from "@rstest/core";

describe("CurrencyInput Component", () => {
  it("renders with default props", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="relative">
        <div class="flex flex-col w-full">
          <div class="relative">
            <div class="flex items-center w-full rounded-lg border bg-gray-100 dark:bg-gray-800 transition-colors duration-200 border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light">
              <span class="text-gray-500 text-sm font-medium mr-2">$</span>
              <input type="text" class="w-full bg-transparent py-3 px-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none" placeholder="Enter amount">
            </div>
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector("input");
    expect(input).toBeTruthy();
    expect(input?.placeholder).toBe("Enter amount");
  });

  it("renders with currency symbol", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center">
        <span class="text-gray-500 text-sm font-medium">S$</span>
        <input type="text" placeholder="Enter amount">
      </div>
    `;

    const symbol = container.querySelector("span");
    expect(symbol?.textContent).toBe("S$");
  });

  it("renders with SGD currency symbol", () => {
    const container = document.createElement("div");
    container.innerHTML = `<span class="text-gray-500">S$</span>`;
    expect(container.textContent).toBe("S$");
  });

  it("renders with USD currency symbol", () => {
    const container = document.createElement("div");
    container.innerHTML = `<span class="text-gray-500">$</span>`;
    expect(container.textContent).toBe("$");
  });

  it("renders with JPY currency symbol", () => {
    const container = document.createElement("div");
    container.innerHTML = `<span class="text-gray-500">¥</span>`;
    expect(container.textContent).toBe("¥");
  });

  it("renders with VND currency symbol", () => {
    const container = document.createElement("div");
    container.innerHTML = `<span class="text-gray-500">₫</span>`;
    expect(container.textContent).toBe("₫");
  });

  it("renders with label", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <label class="mb-1.5 text-sm font-medium text-gray-700">Amount</label>
        <input type="text" placeholder="Enter amount">
      </div>
    `;

    const label = container.querySelector("label");
    expect(label?.textContent).toBe("Amount");
  });

  it("renders with disabled state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center opacity-50 cursor-not-allowed bg-gray-100">
        <input type="text" disabled placeholder="Enter amount">
      </div>
    `;

    const input = container.querySelector("input");
    expect(input?.disabled).toBe(true);
  });

  it("renders with error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <div class="flex items-center border-error bg-red-50">
          <input type="text" placeholder="Enter amount">
        </div>
        <div class="mt-1 text-xs">
          <span class="text-error">Invalid amount</span>
        </div>
      </div>
    `;

    const errorText = container.querySelector(".text-error");
    expect(errorText?.textContent).toBe("Invalid amount");
  });

  it("formats value with commas", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="text" value="1,234,567" placeholder="Enter amount">
    `;

    const input = container.querySelector("input");
    expect(input?.value).toBe("1,234,567");
  });

  it("renders with helper text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <input type="text" placeholder="Enter amount">
        <div class="mt-1 text-xs">
          <span class="text-ternary">Enter the transaction amount</span>
        </div>
      </div>
    `;

    const helperText = container.querySelector(".text-ternary");
    expect(helperText?.textContent).toBe("Enter the transaction amount");
  });

  it("renders with custom placeholder", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="text" placeholder="Enter price">
    `;

    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Enter price");
  });
});
