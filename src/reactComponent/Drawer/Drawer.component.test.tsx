import { render, screen, fireEvent } from "@testing-library/react";
import { Drawer } from "./Drawer.component";
import { vi } from "vitest";

// Mock Backdrop
vi.mock("../Backdrop/Backdrop.component", () => ({
  Backdrop: ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) =>
    isOpen ? <div data-testid="backdrop" onClick={onClick} /> : null,
}));

// Mock Motion
vi.mock("motion/react", async () => {
  const actual = await vi.importActual("motion/react");
  return {
    ...(actual as any),
    motion: {
      div: ({ children, onDragEnd, style, ...props }: any) => (
        <div
          data-testid="motion-drawer"
          // Trigger "Close" drag (y > 150)
          onMouseUp={() =>
            onDragEnd &&
            onDragEnd({}, { offset: { y: 200 }, velocity: { y: 0 } })
          }
          // Trigger "Insufficient" drag (y < 150)
          onMouseDown={() =>
            onDragEnd &&
            onDragEnd({}, { offset: { y: 50 }, velocity: { y: 0 } })
          }
          style={style}
          {...props}>
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useMotionValue: () => ({ get: () => 0, set: () => {} }),
    useTransform: () => ({ get: () => 0 }),
  };
});

describe("Drawer", () => {
  it("renders when open", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        <div data-testid="drawer-content">Content</div>
      </Drawer>,
    );
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    expect(screen.getByTestId("backdrop")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Drawer isOpen={false} onClose={() => {}}>
        <div>Content</div>
      </Drawer>,
    );
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        Content
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(onClose).toHaveBeenCalled();
  });

  it("shows drag handle by default", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        Content
      </Drawer>,
    );
    const handle = document.querySelector(".w-12.h-1\\.5.bg-gray-300");
    expect(handle).toBeInTheDocument();
  });

  it("hides drag handle when showHandle is false", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} showHandle={false}>
        Content
      </Drawer>,
    );
    const handle = document.querySelector(".w-12.h-1\\.5.bg-gray-300");
    expect(handle).not.toBeInTheDocument();
  });

  it("applies height style", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} height={500}>
        Content
      </Drawer>,
    );
    const drawer = screen.getByTestId("motion-drawer");
    expect(drawer).toHaveStyle({ height: "500px" });
  });

  it("calls onClose when dragged down sufficiently", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        Content
      </Drawer>,
    );

    const drawer = screen.getByTestId("motion-drawer");
    fireEvent.mouseUp(drawer); // Simulates y=200

    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when dragged insufficiently", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        Content
      </Drawer>,
    );

    const drawer = screen.getByTestId("motion-drawer");
    fireEvent.mouseDown(drawer); // Simulates y=50

    expect(onClose).not.toHaveBeenCalled();
  });
});
