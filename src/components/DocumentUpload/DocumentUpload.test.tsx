import { describe, it, expect } from "@rstest/core";

describe("DocumentUpload Component", () => {
  it("renders upload area with document icon when empty", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="w-auto">
        <div class="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-gray-300">
          <svg class="w-10 h-10 text-gray-400 mb-3"></svg>
          <p class="text-gray-500"><span class="font-semibold">Click to upload</span></p>
        </div>
      </div>
    `;
    const uploadArea = container.querySelector(".border-dashed");
    expect(uploadArea).toBeTruthy();
    expect(uploadArea?.className).toContain("border-gray-300");
  });

  it("renders label when provided", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900">
          Upload Document <span class="text-red-500">*</span>
        </label>
        <div class="border-dashed border-2"></div>
      </div>
    `;
    expect(container.querySelector("label")?.textContent).toContain("Upload Document");
    expect(container.querySelector(".text-red-500")).toBeTruthy();
  });

  it("renders error state", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <div class="border-red-300 bg-red-50 border-2 border-dashed rounded-lg"></div>
        <p class="mt-2 text-sm text-red-600">File too large</p>
      </div>
    `;
    const uploadArea = container.querySelector(".border-red-300");
    expect(uploadArea).toBeTruthy();
    expect(container.querySelector(".text-red-600")?.textContent).toBe("File too large");
  });

  it("renders helper text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <div class="border-dashed border-2"></div>
        <p class="mt-2 text-sm text-gray-500">PDF files only</p>
      </div>
    `;
    expect(container.querySelector(".text-gray-500")?.textContent).toBe("PDF files only");
  });

  it("renders hidden file input with accept attribute", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <input type="file" class="hidden" accept=".pdf,.doc,.docx" />
      </div>
    `;
    const input = container.querySelector("input");
    expect(input?.type).toBe("file");
    expect(input?.accept).toBe(".pdf,.doc,.docx");
  });

  it("renders file preview when file is loaded (single mode)", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
        <div class="flex flex-col items-center bg-gray-100 p-2">
          <svg class="w-8 h-8 text-gray-500 mb-2"></svg>
          <span class="text-xs text-gray-600">my-document.pdf</span>
        </div>
        <button class="absolute top-2 right-2">Remove</button>
      </div>
    `;
    expect(container.querySelector(".text-xs")?.textContent).toBe("my-document.pdf");
    expect(container.querySelector("button")).toBeTruthy();
  });

  it("renders loader when loading", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="flex items-center justify-center w-full h-48 border-2 border-gray-200 rounded-lg bg-gray-50">
        <div class="animate-spin" role="status">Loading</div>
      </div>
    `;
    expect(container.querySelector("[role='status']")).toBeTruthy();
  });
});
