import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox.component";
import { describe, it, expect, vi } from "vitest";

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByLabelText("Accept")).toBeInTheDocument();
  });

  it("handles change events", () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error state", () => {
    render(<Checkbox label="Error" error />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("border-error");
  });

  it("respects disabled state", () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});
