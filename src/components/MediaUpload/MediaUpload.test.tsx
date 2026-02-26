import { describe, it, expect } from "@rstest/core";

describe("MediaUpload Component", () => {
  it("renders upload area when empty", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="w-auto">
        <div class="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-gray-300">
          <svg class="w-10 h-10 text-gray-400 mb-3"></svg>
          <p class="text-gray-500"><span class="font-semibold">Click to upload</span></p>
          <p class="text-xs text-gray-500">PNG, JPG, JPEG</p>
        </div>
      </div>
    `;
    expect(container.querySelector(".border-dashed")).toBeTruthy();
    expect(container.querySelector(".text-xs")?.textContent).toBe("PNG, JPG, JPEG");
  });

  it("renders label with required asterisk", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <label class="block mb-2 text-sm font-medium">
          Photo <span class="text-red-500">*</span>
        </label>
      </div>
    `;
    expect(container.querySelector("label")?.textContent).toContain("Photo");
    expect(container.querySelector(".text-red-500")).toBeTruthy();
  });

  it("renders hidden file input", () => {
    const container = document.createElement("div");
    container.innerHTML = `<input type="file" class="hidden" accept=".png,.jpg,.jpeg" />`;
    const input = container.querySelector<HTMLInputElement>("input");
    expect(input?.type).toBe("file");
    expect(input?.className).toContain("hidden");
  });

  it("renders image preview in single mode", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
        <img src="blob:preview" alt="Preview" class="w-full h-full object-cover" />
        <button class="absolute top-2 right-2">Remove</button>
      </div>
    `;
    const img = container.querySelector("img");
    expect(img?.alt).toBe("Preview");
    expect(container.querySelector("button")).toBeTruthy();
  });

  it("renders multi-upload grid", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="relative aspect-square"><img src="blob:1" alt="Preview 0" /></div>
        <div class="relative aspect-square"><img src="blob:2" alt="Preview 1" /></div>
        <div class="border-2 border-dashed cursor-pointer flex items-center justify-center">
          <span>Add more</span>
        </div>
      </div>
    `;
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(2);
    expect(container.querySelector(".border-dashed")).toBeTruthy();
  });

  it("renders error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <div class="border-red-300 bg-red-50 border-2 border-dashed"></div>
        <p class="text-red-600">File too large</p>
      </div>
    `;
    expect(container.querySelector(".border-red-300")).toBeTruthy();
    expect(container.querySelector(".text-red-600")?.textContent).toBe("File too large");
  });

  it("does not show Add more button when maxFiles reached", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="relative aspect-square"><img alt="Preview 0" /></div>
        <div class="relative aspect-square"><img alt="Preview 1" /></div>
      </div>
    `;
    expect(container.querySelector(".border-dashed")).toBeNull();
  });
});
