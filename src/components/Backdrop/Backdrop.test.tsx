import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Backdrop } from "./Backdrop.component";

describe("Backdrop", () => {
  it("renders a div with aria-hidden=true", () => {
    const { container } = render(() => <Backdrop isOpen={false} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("renders in the DOM when isOpen=false (visibility controlled by display/opacity)", () => {
    const { container } = render(() => <Backdrop isOpen={false} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeInTheDocument();
  });

  it("renders in the DOM when isOpen=true", () => {
    const { container } = render(() => <Backdrop isOpen={true} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeInTheDocument();
  });

  it("calls onClick when the backdrop is clicked", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Backdrop isOpen={true} onClick={handleClick} />
    ));
    const el = container.firstElementChild as HTMLElement;
    fireEvent.click(el);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not throw when clicked without onClick handler", () => {
    const { container } = render(() => <Backdrop isOpen={true} />);
    const el = container.firstElementChild as HTMLElement;
    expect(() => fireEvent.click(el)).not.toThrow();
  });
});
