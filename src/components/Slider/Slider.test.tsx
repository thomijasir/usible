import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Slider } from "./Slider.component";

describe("Slider", () => {
  it("renders range input", () => {
    render(() => <Slider value={50} onChange={() => {}} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(() => <Slider value={50} onChange={() => {}} label="Volume" />);
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });

  it("shows value when showValue=true", () => {
    render(() => <Slider value={42} onChange={() => {}} showValue />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("does not show value when showValue is not set", () => {
    render(() => <Slider value={42} onChange={() => {}} label="Volume" />);
    expect(screen.queryByText("42")).not.toBeInTheDocument();
  });

  it("calls onChange with numeric value on change", () => {
    const handleChange = vi.fn();
    render(() => <Slider value={50} onChange={handleChange} />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "75" } });
    expect(handleChange).toHaveBeenCalledWith(75);
  });

  it("disabled slider has disabled attribute", () => {
    render(() => <Slider value={50} onChange={() => {}} disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });

  it("sets min, max and step attributes", () => {
    render(() => (
      <Slider value={5} onChange={() => {}} min={0} max={10} step={0.5} />
    ));
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "10");
    expect(slider).toHaveAttribute("step", "0.5");
  });
});
