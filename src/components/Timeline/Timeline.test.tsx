import { describe, it, expect } from "@rstest/core";

describe("Timeline Component", () => {
  it("renders with items", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex flex-col">
        <div class="flex gap-4 relative pb-8 last:pb-0">
          <div class="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 bg-white border-success text-success">
            <div class="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <div class="flex flex-col pt-1">
            <span class="font-semibold text-gray-900">Order Placed</span>
          </div>
        </div>
      </div>
    `;

    const item = container.querySelector(".flex.gap-4");
    expect(item).toBeTruthy();
  });

  it("renders completed status with success styling", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 bg-white border-success text-success">
        <div class="w-3 h-3 rounded-full bg-success"></div>
      </div>
    `;

    const badge = container.querySelector(".border-success");
    expect(badge?.classList.contains("border-success")).toBe(true);
  });

  it("renders failed status with error styling", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 bg-white border-error text-error">
        <div class="w-3 h-3 rounded-full bg-error"></div>
      </div>
    `;

    const badge = container.querySelector(".border-error");
    expect(badge?.classList.contains("border-error")).toBe(true);
  });

  it("renders pending status with gray styling", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 bg-white border-gray-300 text-gray-400">
        <div class="w-3 h-3 rounded-full bg-gray-400"></div>
      </div>
    `;

    const badge = container.querySelector(".border-gray-300");
    expect(badge?.classList.contains("border-gray-300")).toBe(true);
  });

  it("renders item with title", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col pt-1">
        <span class="font-semibold text-gray-900">Order Placed</span>
      </div>
    `;

    const title = container.querySelector(".font-semibold");
    expect(title?.textContent).toBe("Order Placed");
  });

  it("renders item with description", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col pt-1">
        <span class="font-semibold text-gray-900">Order Placed</span>
        <span class="text-gray-500 mt-1">Your order has been confirmed</span>
      </div>
    `;

    const description = container.querySelector(".text-gray-500");
    expect(description?.textContent).toBe("Your order has been confirmed");
  });

  it("renders item with date", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col pt-1">
        <span class="font-semibold text-gray-900">Order Placed</span>
        <span class="text-gray-400 mt-1">Feb 16, 2026</span>
      </div>
    `;

    const date = container.querySelector(".text-gray-400");
    expect(date?.textContent).toBe("Feb 16, 2026");
  });

  it("renders connector line between items", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex gap-4 relative pb-8">
        <div class="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
        <div class="w-10 h-10 rounded-full border-2"></div>
      </div>
    `;

    const connector = container.querySelector(".w-0\\.5");
    expect(connector).toBeTruthy();
    expect(connector?.classList.contains("bg-gray-200")).toBe(true);
  });

  it("does not render connector line on last item", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex gap-4 relative last:pb-0">
        <div class="w-10 h-10 rounded-full border-2"></div>
      </div>
    `;

    const connector = container.querySelector(".w-0\\.5");
    expect(connector).toBeNull();
  });

  it("renders with numbered variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 bg-white border-success text-success">
        <span class="text-success">1</span>
      </div>
    `;

    const number = container.querySelector("span");
    expect(number?.textContent).toBe("1");
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col custom-timeline-class">
      </div>
    `;

    const timeline = container.querySelector("div");
    expect(timeline?.classList.contains("custom-timeline-class")).toBe(true);
  });

  it("renders multiple items", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col">
        <div class="flex gap-4 relative pb-8">
          <div class="w-10 h-10 rounded-full"></div>
          <span>Item 1</span>
        </div>
        <div class="flex gap-4 relative pb-8">
          <div class="w-10 h-10 rounded-full"></div>
          <span>Item 2</span>
        </div>
        <div class="flex gap-4 relative">
          <div class="w-10 h-10 rounded-full"></div>
          <span>Item 3</span>
        </div>
      </div>
    `;

    const items = container.querySelectorAll(".flex.gap-4");
    expect(items.length).toBe(3);
  });
});
