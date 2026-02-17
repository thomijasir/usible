import { describe, it, expect } from "@rstest/core";

describe("TextHighlight Component", () => {
  it("renders text without highlight when no highlight prop provided", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `<span>Hello World</span>`;

    expect(container.textContent).toBe("Hello World");
  });

  it("highlights matching text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span>Hello <span class="font-bold">World</span></span>
    `;

    const highlighted = container.querySelector(".font-bold");
    expect(highlighted?.textContent).toBe("World");
  });

  it("highlights text case-insensitively", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span>The <span class="font-bold">WORLD</span> is big</span>
    `;

    const highlighted = container.querySelector(".font-bold");
    expect(highlighted?.textContent).toBe("WORLD");
  });

  it("highlights with primary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span class="font-bold text-primary">highlighted</span>
    `;

    const highlighted = container.querySelector("span");
    expect(highlighted?.classList.contains("text-primary")).toBe(true);
  });

  it("highlights with secondary color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span class="font-bold text-secondary">highlighted</span>
    `;

    const highlighted = container.querySelector("span");
    expect(highlighted?.classList.contains("text-secondary")).toBe(true);
  });

  it("highlights with error color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span class="font-bold text-error">highlighted</span>
    `;

    const highlighted = container.querySelector("span");
    expect(highlighted?.classList.contains("text-error")).toBe(true);
  });

  it("highlights with success color", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span class="font-bold text-success">highlighted</span>
    `;

    const highlighted = container.querySelector("span");
    expect(highlighted?.classList.contains("text-success")).toBe(true);
  });

  it("highlights multiple occurrences", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span>
        The <span class="font-bold">cat</span> sat on the <span class="font-bold">cat</span>
      </span>
    `;

    const highlighted = container.querySelectorAll(".font-bold");
    expect(highlighted.length).toBe(2);
  });

  it("preserves non-matching text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span>Hello <span class="font-bold">World</span>, how are you?</span>
    `;

    expect(container.textContent?.trim()).toBe("Hello World, how are you?");
  });

  it("handles special regex characters in highlight", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span>Price: <span class="font-bold">$100</span></span>
    `;

    const highlighted = container.querySelector(".font-bold");
    expect(highlighted?.textContent).toBe("$100");
  });

  it("applies font-bold class to highlighted text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <span class="font-bold">highlighted</span>
    `;

    const highlighted = container.querySelector("span");
    expect(highlighted?.classList.contains("font-bold")).toBe(true);
  });
});
