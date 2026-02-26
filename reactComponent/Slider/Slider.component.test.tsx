import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider.component";
import { describe, it, expect, vi } from "vitest";

describe("Slider", () => {
  it("renders correctly with default props", () => {
    render(<Slider value={50} onChange={() => {}} />);
    const input = screen.getByRole("slider");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("50");
  });

  it("renders with label and value", () => {
    render(
      <Slider value={75} onChange={() => {}} label="Test Label" showValue />,
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handleChange = vi.fn();
    render(<Slider value={50} onChange={handleChange} />);
    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "60" } });
    expect(handleChange).toHaveBeenCalledWith(60);
  });

  it("respects disabled prop", () => {
    const handleChange = vi.fn();
    render(<Slider value={50} onChange={handleChange} disabled />);
    const input = screen.getByRole("slider");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("cursor-not-allowed");
    fireEvent.change(input, { target: { value: "60" } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("respects min and max props", () => {
    render(<Slider value={50} onChange={() => {}} min={10} max={90} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "10");
    expect(input).toHaveAttribute("max", "90");
  });
});
