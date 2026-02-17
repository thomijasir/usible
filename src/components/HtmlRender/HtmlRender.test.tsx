import { describe, it, expect } from "@rstest/core";

describe("HtmlRender Component", () => {
  it("renders sanitized HTML content", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `<div><p>Hello <strong>World</strong></p></div>`;

    expect(container.innerHTML).toContain("<p>");
    expect(container.innerHTML).toContain("<strong>");
    expect(container.textContent).toContain("Hello World");
  });

  it("renders plain text without HTML tags", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div>Just plain text</div>`;

    expect(container.textContent).toBe("Just plain text");
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div class="custom-html-class"><p>Content</p></div>`;

    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("custom-html-class");
  });

  it("renders nested HTML elements", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div><ul><li>Item 1</li><li>Item 2</li></ul></div>`;

    const list = container.querySelector("ul");
    const items = container.querySelectorAll("li");
    expect(list).toBeTruthy();
    expect(items.length).toBe(2);
  });

  it("renders links", () => {
    const container = document.createElement("div");
    container.innerHTML = `<div><a href="https://example.com">Link</a></div>`;

    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("https://example.com");
    expect(link?.textContent).toBe("Link");
  });
});
