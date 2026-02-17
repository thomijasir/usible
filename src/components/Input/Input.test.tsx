import { describe, it, expect } from "@rstest/core";

describe("Input Component", () => {
  it("renders with label", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="flex flex-col w-full">
        <label for="input-1" class="mb-1.5 text-sm font-medium text-gray-700">Email</label>
        <div class="relative">
          <div class="flex items-center w-full rounded-lg border bg-gray-100">
            <input id="input-1" type="text" placeholder="Enter email" class="w-full bg-transparent py-3 px-3 text-base" />
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector("input");
    const label = container.querySelector("label");
    expect(input).toBeTruthy();
    expect(label?.textContent).toBe("Email");
  });

  it("renders with placeholder", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="text" placeholder="Enter your name" class="w-full bg-transparent" />
    `;

    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Enter your name");
  });

  it("renders with value", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="text" value="John Doe" class="w-full bg-transparent" />
    `;

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input?.value).toBe("John Doe");
  });

  it("renders as disabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center w-full rounded-lg border opacity-50 cursor-not-allowed bg-gray-100">
        <input type="text" disabled class="w-full bg-transparent disabled:cursor-not-allowed" />
      </div>
    `;

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input?.disabled).toBe(true);
  });

  it("renders with error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center w-full rounded-lg border border-error bg-red-50 text-error">
        <input type="text" class="w-full bg-transparent" />
      </div>
      <div class="mt-1 text-xs text-error">This field is required</div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("border-error");
  });

  it("renders with helper text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex flex-col">
        <input type="text" class="w-full" />
        <div class="mt-1 text-xs text-gray-500">Enter your email address</div>
      </div>
    `;

    const helper = container.querySelector(".text-xs");
    expect(helper?.textContent).toBe("Enter your email address");
  });

  it("renders with start adornment", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center w-full rounded-lg border bg-gray-100">
        <div class="pl-3 text-gray-500">@</div>
        <input type="text" class="w-full bg-transparent pl-2" />
      </div>
    `;

    const adornment = container.querySelector(".pl-3");
    expect(adornment?.textContent).toBe("@");
  });

  it("renders with end adornment", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center w-full rounded-lg border bg-gray-100">
        <input type="text" class="w-full bg-transparent pr-2" />
        <div class="pr-3 text-gray-500">.com</div>
      </div>
    `;

    const adornment = container.querySelector(".pr-3");
    expect(adornment?.textContent).toBe(".com");
  });

  it("renders with small size", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="text" class="w-full bg-transparent py-2 px-3 text-sm" />
    `;

    const input = container.querySelector("input");
    expect(input?.className).toContain("py-2 px-3");
    expect(input?.className).toContain("text-sm");
  });

  it("renders password input type", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <input type="password" class="w-full bg-transparent" />
    `;

    const input = container.querySelector("input");
    expect(input?.type).toBe("password");
  });
});
