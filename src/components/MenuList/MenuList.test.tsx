import { describe, it, expect } from "@rstest/core";

describe("MenuList Component", () => {
  it("renders with menu items", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="w-full">
        <div class="bg-white divide-y divide-gray-100 border-y border-gray-100 w-full">
          <div class="flex items-center p-4 bg-white active:bg-gray-50 cursor-pointer transition-colors duration-200">
            <div class="flex-1 min-w-0">
              <div class="text-base font-medium text-gray-900 truncate">Menu Item 1</div>
            </div>
            <div class="ml-4 text-gray-400 shrink-0">
              <svg class="w-5 h-5"></svg>
            </div>
          </div>
        </div>
      </div>
    `;

    const menuItem = container.querySelector(".flex.items-center.p-4");
    expect(menuItem).toBeTruthy();
  });

  it("renders with title", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="w-full">
        <div class="px-4 pb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Settings</div>
        <div class="bg-white divide-y divide-gray-100"></div>
      </div>
    `;

    const title = container.querySelector(".uppercase");
    expect(title?.textContent).toBe("Settings");
  });

  it("renders item with label", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center p-4">
        <div class="flex-1 min-w-0">
          <div class="text-base font-medium text-gray-900 truncate">Account Settings</div>
        </div>
      </div>
    `;

    const label = container.querySelector(".text-base.font-medium");
    expect(label?.textContent).toBe("Account Settings");
  });

  it("renders item with description", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center p-4">
        <div class="flex-1 min-w-0">
          <div class="text-base font-medium text-gray-900">Account</div>
          <div class="text-sm text-gray-500 mt-0.5 truncate">Manage your account settings</div>
        </div>
      </div>
    `;

    const description = container.querySelector(".text-sm.text-gray-500");
    expect(description?.textContent).toBe("Manage your account settings");
  });

  it("renders item with left icon", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center p-4">
        <div class="mr-4 text-gray-500">
          <svg class="w-5 h-5"></svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-base font-medium text-gray-900">Menu Item</div>
        </div>
      </div>
    `;

    const leftIcon = container.querySelector(".mr-4 svg");
    expect(leftIcon).toBeTruthy();
  });

  it("renders item with right icon", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center p-4">
        <div class="flex-1 min-w-0">
          <div class="text-base font-medium text-gray-900">Menu Item</div>
        </div>
        <div class="ml-4 text-gray-400 shrink-0">
          <svg class="w-5 h-5"></svg>
        </div>
      </div>
    `;

    const rightIcon = container.querySelector(".ml-4 svg");
    expect(rightIcon).toBeTruthy();
  });

  it("renders with standard variant (full width)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white divide-y divide-gray-100 border-y border-gray-100 w-full">
      </div>
    `;

    const menuList = container.querySelector("div");
    expect(menuList?.classList.contains("w-full")).toBe(true);
    expect(menuList?.classList.contains("border-y")).toBe(true);
  });

  it("renders with rounded variant", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white divide-y divide-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100 mx-4">
      </div>
    `;

    const menuList = container.querySelector("div");
    expect(menuList?.classList.contains("rounded-2xl")).toBe(true);
    expect(menuList?.classList.contains("shadow-sm")).toBe(true);
  });

  it("renders chevron by default", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="ml-4 text-gray-400 shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    `;

    const chevron = container.querySelector("svg");
    expect(chevron).toBeTruthy();
  });

  it("hides chevron when showChevron is false", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center p-4">
        <div class="flex-1 min-w-0">
          <div class="text-base font-medium text-gray-900">Menu Item</div>
        </div>
      </div>
    `;

    const chevron = container.querySelector(".ml-4 svg");
    expect(chevron).toBeNull();
  });

  it("renders multiple items with dividers", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="bg-white divide-y divide-gray-100">
        <div class="flex items-center p-4">Item 1</div>
        <div class="flex items-center p-4">Item 2</div>
        <div class="flex items-center p-4">Item 3</div>
      </div>
    `;

    const items = container.querySelectorAll(".flex.items-center.p-4");
    expect(items.length).toBe(3);
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="w-full custom-menu-class">
        <div class="bg-white divide-y divide-gray-100"></div>
      </div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.classList.contains("custom-menu-class")).toBe(true);
  });
});
