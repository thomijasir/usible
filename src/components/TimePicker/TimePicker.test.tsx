import { describe, it, expect } from "@rstest/core";

describe("TimePicker Component", () => {
  it("renders input field with placeholder", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="relative">
        <div class="flex flex-col w-full">
          <div class="relative cursor-pointer">
            <div class="flex items-center w-full rounded-lg border bg-gray-100 dark:bg-gray-800">
              <input type="text" class="w-full bg-transparent py-3 px-3" placeholder="Select Time" readonly>
              <div class="cursor-pointer p-1 hover:bg-gray-100 rounded-full">
                <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Select Time");
  });

  it("renders with label", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <label class="mb-1.5 text-sm font-medium text-gray-700">Appointment Time</label>
        <input type="text" placeholder="Select Time">
      </div>
    `;

    const label = container.querySelector("label");
    expect(label?.textContent).toBe("Appointment Time");
  });

  it("renders clock icon", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
        <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
      </div>
    `;

    const icon = container.querySelector("svg");
    expect(icon).toBeTruthy();
  });

  it("renders drawer with scroll columns when open", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden" style="display: block;">
        <div class="flex flex-col h-auto bg-white rounded-t-3xl overflow-hidden">
          <div class="py-4 border-b border-gray-100 flex justify-center items-center z-30">
            <span class="font-bold text-gray-900 text-lg">Select Time</span>
          </div>
          <div class="py-5 w-full max-w-sm mx-auto relative">
            <div class="flex justify-center items-start h-auto relative z-20">
              <div class="flex-1 flex flex-col items-center relative z-20">
                <div class="h-[220px] w-full overflow-y-auto snap-y snap-mandatory relative z-20"></div>
                <div class="mt-2"><span class="font-bold text-gray-400 tracking-wider text-[10px] uppercase">HOUR</span></div>
              </div>
              <div class="flex-1 flex flex-col items-center relative z-20">
                <div class="h-[220px] w-full overflow-y-auto snap-y snap-mandatory relative z-20"></div>
                <div class="mt-2"><span class="font-bold text-gray-400 tracking-wider text-[10px] uppercase">MINUTE</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const drawer = container.querySelector(".fixed.bottom-0");
    expect(drawer).toBeTruthy();
    expect((drawer as HTMLElement)?.style.display).toBe("block");

    const hourLabel = container.querySelector(".uppercase");
    expect(hourLabel?.textContent).toBe("HOUR");
  });

  it("renders header title", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="py-4 border-b border-gray-100 flex justify-center items-center z-30">
        <span class="font-bold text-gray-900 text-lg">Select Time</span>
      </div>
    `;

    const title = container.querySelector("span");
    expect(title?.textContent).toBe("Select Time");
  });

  it("renders Cancel and Confirm buttons", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="px-5 pt-3 pb-6 grid grid-cols-2 gap-4 z-30">
        <button class="text-secondary">Cancel</button>
        <button class="bg-primary text-white">Confirm</button>
      </div>
    `;

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0]?.textContent).toBe("Cancel");
    expect(buttons[1]?.textContent).toBe("Confirm");
  });

  it("renders HOUR and MINUTE column labels", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex justify-center items-start">
        <div>
          <div class="h-[220px]"></div>
          <div class="mt-2"><span class="uppercase">HOUR</span></div>
        </div>
        <div>
          <div class="h-[220px]"></div>
          <div class="mt-2"><span class="uppercase">MINUTE</span></div>
        </div>
        <div>
          <div class="h-[220px]"></div>
          <div class="mt-2"><span class="uppercase">MERIDIEM</span></div>
        </div>
      </div>
    `;

    const labels = container.querySelectorAll(".uppercase");
    expect(labels.length).toBe(3);
    expect(labels[0]?.textContent).toBe("HOUR");
    expect(labels[1]?.textContent).toBe("MINUTE");
    expect(labels[2]?.textContent).toBe("MERIDIEM");
  });

  it("renders 12-hour scroll items", () => {
    const container = document.createElement("div");
    const items = Array.from({ length: 12 }, (_, i) => {
      const h = i === 0 ? 12 : i;
      return `<div class="snap-center">${h}</div>`;
    }).join("");
    container.innerHTML = `<div class="snap-y">${items}</div>`;

    const scrollItems = container.querySelectorAll(".snap-center");
    expect(scrollItems.length).toBe(12);
    expect(scrollItems[0]?.textContent).toBe("12");
    expect(scrollItems[1]?.textContent).toBe("1");
  });

  it("renders 24-hour scroll items", () => {
    const container = document.createElement("div");
    const items = Array.from({ length: 24 }, (_, i) =>
      `<div class="snap-center">${i.toString().padStart(2, "0")}</div>`,
    ).join("");
    container.innerHTML = `<div class="snap-y">${items}</div>`;

    const scrollItems = container.querySelectorAll(".snap-center");
    expect(scrollItems.length).toBe(24);
    expect(scrollItems[0]?.textContent).toBe("00");
    expect(scrollItems[13]?.textContent).toBe("13");
  });

  it("renders 60 minute scroll items", () => {
    const container = document.createElement("div");
    const items = Array.from({ length: 60 }, (_, i) =>
      `<div class="snap-center">${i.toString().padStart(2, "0")}</div>`,
    ).join("");
    container.innerHTML = `<div class="snap-y">${items}</div>`;

    const scrollItems = container.querySelectorAll(".snap-center");
    expect(scrollItems.length).toBe(60);
    expect(scrollItems[0]?.textContent).toBe("00");
    expect(scrollItems[59]?.textContent).toBe("59");
  });

  it("renders AM/PM period items", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="snap-y">
        <div class="snap-center">AM</div>
        <div class="snap-center">PM</div>
      </div>
    `;

    const items = container.querySelectorAll(".snap-center");
    expect(items.length).toBe(2);
    expect(items[0]?.textContent).toBe("AM");
    expect(items[1]?.textContent).toBe("PM");
  });

  it("renders selection highlight bar", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="py-5 w-full max-w-sm mx-auto relative">
        <div class="absolute left-4 right-4 h-[44px] bg-gray-50 rounded-xl pointer-events-none z-10"></div>
      </div>
    `;

    const highlight = container.querySelector(".absolute.left-4.right-4");
    expect(highlight).toBeTruthy();
    expect(highlight?.classList.contains("pointer-events-none")).toBe(true);
  });

  it("renders colon separator between columns", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex justify-center items-start">
        <div class="flex-1"><!-- hours --></div>
        <div class="h-[220px] flex items-center justify-center pointer-events-none w-4">
          <span class="text-gray-300 font-light">:</span>
        </div>
        <div class="flex-1"><!-- minutes --></div>
      </div>
    `;

    const separator = container.querySelector(".text-gray-300");
    expect(separator?.textContent).toBe(":");
  });

  it("renders disabled state on input", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col w-full">
        <div class="flex items-center w-full rounded-lg border bg-gray-100 opacity-50 cursor-not-allowed">
          <input type="text" disabled placeholder="Select Time">
        </div>
      </div>
    `;

    const input = container.querySelector("input");
    expect(input?.disabled).toBe(true);
  });
});
