import { render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Drawer } from "./Drawer.component";

describe("Drawer", () => {
  it("renders role=dialog element", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()}>
        <p>Drawer content</p>
      </Drawer>
    ));
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("has aria-modal=true", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()}>
        <p>Content</p>
      </Drawer>
    ));
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
  });

  it("renders children content", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()}>
        <p>My drawer content</p>
      </Drawer>
    ));
    expect(document.body.textContent).toContain("My drawer content");
  });

  it("showHandle=true renders the handle div", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()} showHandle>
        <p>Content</p>
      </Drawer>
    ));
    const handle = document.querySelector(".w-12.h-1\\.5");
    expect(handle).toBeTruthy();
  });

  it("backdrop is rendered", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()}>
        <p>Content</p>
      </Drawer>
    ));
    // Backdrop has aria-hidden="true" and is a fixed inset-0 div
    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeTruthy();
  });

  it("showHandle=false does not render the handle div", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()} showHandle={false}>
        <p>Content</p>
      </Drawer>
    ));
    const handle = document.querySelector(".w-12.h-1\\.5");
    expect(handle).toBeNull();
  });

  it("applies height as number in pixels", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()} height={400}>
        <p>Content</p>
      </Drawer>
    ));
    const drawer = document.querySelector('[role="dialog"]');
    expect(drawer?.getAttribute("style")).toContain("height: 400px");
  });

  it("applies height as string", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()} height="50%">
        <p>Content</p>
      </Drawer>
    ));
    const drawer = document.querySelector('[role="dialog"]');
    expect(drawer?.getAttribute("style")).toContain("height: 50%");
  });

  it("applies ariaLabelledBy when provided", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()} ariaLabelledBy="drawer-title">
        <p>Content</p>
      </Drawer>
    ));
    const drawer = document.querySelector('[role="dialog"]');
    expect(drawer?.getAttribute("aria-labelledby")).toBe("drawer-title");
  });
});
