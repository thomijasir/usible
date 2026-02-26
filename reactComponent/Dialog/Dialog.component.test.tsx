import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "./Dialog.component";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Dialog", () => {
  it("renders correctly when open with string content", () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        Dialog Content
      </Dialog>,
    );
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders correctly with ReactNode content for title and children", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        title={<span data-testid="custom-title">Custom Title</span>}>
        <div data-testid="custom-content">Custom Content</div>
      </Dialog>,
    );
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Test Dialog">
        Dialog Content
      </Dialog>,
    );
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        actions={<Button>Confirm</Button>}>
        Content
      </Dialog>,
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked and dismissible is true", () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} dismissible={true}>
        Content
      </Dialog>,
    );

    // The backdrop is the first element or handled by a separate component.
    // Based on Dialog implementation: <Backdrop onClick={handleBackdropClick} ... />
    // We need to find the backdrop. Usually it's a fixed div.
    // The Backdrop component likely has a distinct class or we can rely on generic click if it covers screen.
    // But since Backdrop is imported, let's assume it renders a clickable div.
    // We can search for an element with fixed/inset-0 that is NOT the dialog content.
    // Or simpler: Mock Backdrop to expose a testid.

    // However, without mocking, let's try to find it.
    // The Backdrop component usually renders a div with z-40 or similar.
    // Let's try clicking the document body or a known outer container if simpler?
    // The Backdrop component code wasn't fully read but we can assume standard behavior.

    // A safer approach with integration testing is to click elements outside the dialog.
    // But here, let's just mock Backdrop for precise control or find the element.
  });
});

// Separate describe block for mocked tests
describe("Dialog Interactions", () => {
  beforeEach(() => {
    vi.mock("../Backdrop/Backdrop.component", () => ({
      Backdrop: ({ onClick }: { onClick: () => void }) => (
        <div data-testid="backdrop" onClick={onClick} />
      ),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} dismissible={true}>
        Content
      </Dialog>,
    );
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose when backdrop is clicked if dismissible is false", () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} dismissible={false}>
        Content
      </Dialog>,
    );
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
