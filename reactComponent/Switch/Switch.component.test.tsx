import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch.component";
import { describe, it, expect, vi } from "vitest";

describe("Switch", () => {
  it("renders correctly", () => {
    render(<Switch label="Toggle" />);
    expect(screen.getByLabelText("Toggle")).toBeInTheDocument();
  });

  it("toggles state", () => {
    const handleChange = vi.fn();
    render(<Switch onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled state", () => {
    const handleChange = vi.fn();
    render(<Switch disabled onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
