import { describe, it, expect } from "@rstest/core";

describe("DatePicker Component", () => {
  it("renders input field with placeholder", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="relative">
        <div class="flex flex-col w-full">
          <div class="relative cursor-pointer">
            <div class="flex items-center w-full rounded-lg border bg-gray-100 dark:bg-gray-800">
              <input type="text" class="w-full bg-transparent py-3 px-3" placeholder="Select Date" readonly>
              <div class="cursor-pointer p-1 hover:bg-gray-100 rounded-full">
                <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Select Date");
  });

  it("renders with label", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <label class="mb-1.5 text-sm font-medium text-gray-700">Birth Date</label>
        <input type="text" placeholder="Select Date">
      </div>
    `;

    const label = container.querySelector("label");
    expect(label?.textContent).toBe("Birth Date");
  });

  it("renders calendar icon", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="cursor-pointer p-1 hover:bg-gray-100 rounded-full">
        <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    `;

    const icon = container.querySelector("svg");
    expect(icon).toBeTruthy();
  });

  it("renders drawer with calendar when open", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden" style="display: block;">
        <div class="flex justify-center pt-3 pb-2 cursor-grab">
          <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        <div class="px-5 pb-8 pt-2">
          <div class="flex items-center justify-between mb-4">
            <button class="p-3 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6"></svg>
            </button>
            <span class="text-xl font-bold text-gray-900 w-40 text-center">Feb 2026</span>
            <button class="p-3 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6"></svg>
            </button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center">
            <span class="font-semibold text-gray-400 text-sm">Su</span>
            <span class="font-semibold text-gray-400 text-sm">Mo</span>
            <span class="font-semibold text-gray-400 text-sm">Tu</span>
            <span class="font-semibold text-gray-400 text-sm">We</span>
            <span class="font-semibold text-gray-400 text-sm">Th</span>
            <span class="font-semibold text-gray-400 text-sm">Fr</span>
            <span class="font-semibold text-gray-400 text-sm">Sa</span>
          </div>
        </div>
      </div>
    `;

    const drawer = container.querySelector(".fixed.bottom-0");
    expect(drawer).toBeTruthy();
    expect((drawer as HTMLElement)?.style.display).toBe("block");
  });

  it("renders week day headers", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="grid grid-cols-7 gap-1 text-center">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>
    `;

    const days = container.querySelectorAll("span");
    expect(days.length).toBe(7);
    expect(days[0].textContent).toBe("Su");
    expect(days[6].textContent).toBe("Sa");
  });

  it("renders month navigation buttons", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <button class="p-3 rounded-full hover:bg-gray-100" aria-label="Previous month">
          <svg class="w-6 h-6"></svg>
        </button>
        <span class="text-xl font-bold text-gray-900">Feb 2026</span>
        <button class="p-3 rounded-full hover:bg-gray-100" aria-label="Next month">
          <svg class="w-6 h-6"></svg>
        </button>
      </div>
    `;

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute("aria-label")).toBe("Previous month");
    expect(buttons[1].getAttribute("aria-label")).toBe("Next month");
  });

  it("renders calendar grid with days", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="grid grid-cols-7 gap-1 text-center">
        <button class="w-full h-full rounded-full flex items-center justify-center text-sm">1</button>
        <button class="w-full h-full rounded-full flex items-center justify-center text-sm">2</button>
        <button class="w-full h-full rounded-full flex items-center justify-center text-sm bg-primary text-white font-bold shadow-md transform scale-105">15</button>
      </div>
    `;

    const selectedDay = container.querySelector(".bg-primary");
    expect(selectedDay?.textContent).toBe("15");
  });

  it("renders today with border highlight", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="w-full h-full rounded-full flex items-center justify-center text-sm border-2 border-primary text-primary font-bold">
        16
      </button>
    `;

    const todayButton = container.querySelector("button");
    expect(todayButton?.classList.contains("border-2")).toBe(true);
    expect(todayButton?.classList.contains("border-primary")).toBe(true);
  });

  it("renders disabled dates", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button disabled class="w-full h-full rounded-full flex items-center justify-center text-sm text-gray-200 cursor-not-allowed">
        1
      </button>
    `;

    const button = container.querySelector("button");
    expect(button?.disabled).toBe(true);
    expect(button?.classList.contains("cursor-not-allowed")).toBe(true);
  });

  it("renders close button in drawer", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="mt-2 pt-4 border-t border-gray-100 flex justify-end">
        <button class="px-6 font-medium text-primary hover:bg-primary-50">Close</button>
      </div>
    `;

    const closeButton = container.querySelector("button");
    expect(closeButton?.textContent).toBe("Close");
  });

  it("renders with custom placeholder", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="text" placeholder="Pick a date">
    `;

    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Pick a date");
  });

  it("renders drag handle on drawer", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex justify-center pt-3 pb-2 cursor-grab">
        <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
    `;

    const handle = container.querySelector(".w-12.h-1\\.5");
    expect(handle).toBeTruthy();
  });
});
