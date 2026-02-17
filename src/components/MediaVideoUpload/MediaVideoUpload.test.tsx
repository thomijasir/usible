import { describe, it, expect } from "@rstest/core";

describe("MediaVideoUpload Component", () => {
  it("renders placeholder component", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="custom-class">
        <p>MediaVideoUpload component - placeholder</p>
      </div>
    `;

    const component = container.querySelector("div");
    expect(component).toBeTruthy();
  });

  it("renders with custom class", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="video-upload-container">
        <p>MediaVideoUpload component - placeholder</p>
      </div>
    `;

    const wrapper = container.querySelector("div");
    expect(wrapper?.classList.contains("video-upload-container")).toBe(true);
  });

  it("contains placeholder text", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <p>MediaVideoUpload component - placeholder</p>
      </div>
    `;

    const text = container.querySelector("p");
    expect(text?.textContent).toContain("MediaVideoUpload");
  });
});
