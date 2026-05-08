import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Dialog } from "./Dialog.component";
import { Text } from "../Text";

describe("Dialog", () => {
  it("renders role=dialog element", () => {
    render(() => (
      <Dialog isOpen={false} onClose={vi.fn()}>
        <p>Dialog content</p>
      </Dialog>
    ));
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("has aria-modal=true", () => {
    render(() => (
      <Dialog isOpen={false} onClose={vi.fn()}>
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
  });

  it("title string is rendered in the DOM", () => {
    render(() => (
      <Dialog isOpen={false} onClose={vi.fn()} title="Confirm Action">
        <p>Content</p>
      </Dialog>
    ));
    expect(document.body.textContent).toContain("Confirm Action");
  });

  it("title as JSX element is rendered", () => {
    render(() => (
      <Dialog
        isOpen={false}
        onClose={vi.fn()}
        title={<Text variant="h6">Custom Title</Text>}>
        <p>Content</p>
      </Dialog>
    ));
    expect(document.body.textContent).toContain("Custom Title");
  });

  it("children content is rendered in the DOM", () => {
    render(() => (
      <Dialog isOpen={false} onClose={vi.fn()}>
        <p>My dialog body</p>
      </Dialog>
    ));
    expect(document.body.textContent).toContain("My dialog body");
  });

  it("children as string is rendered with Text component", () => {
    render(() => (
      <Dialog isOpen={false} onClose={vi.fn()}>
        String content
      </Dialog>
    ));
    expect(document.body.textContent).toContain("String content");
  });

  it("actions are rendered in the DOM", () => {
    render(() => (
      <Dialog
        isOpen={false}
        onClose={vi.fn()}
        actions={
          <>
            <button type="button">Cancel</button>
            <button type="button">Confirm</button>
          </>
        }>
        <p>Content</p>
      </Dialog>
    ));
    expect(document.body.textContent).toContain("Cancel");
    expect(document.body.textContent).toContain("Confirm");
  });

  it("Escape key calls onClose when dismissible=true", () => {
    const onClose = vi.fn();
    render(() => (
      <Dialog isOpen={true} onClose={onClose} dismissible>
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Escape key does not call onClose when dismissible=false", () => {
    const onClose = vi.fn();
    render(() => (
      <Dialog isOpen={true} onClose={onClose} dismissible={false}>
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies custom class to dialog", () => {
    render(() => (
      <Dialog isOpen={false} onClose={vi.fn()} class="custom-class">
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.className).toContain("custom-class");
  });
});
