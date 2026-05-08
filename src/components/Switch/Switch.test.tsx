import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch.component";

describe("Switch", () => {
  it("renders checkbox with role=switch", () => {
    render(() => <Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("aria-checked is true when checked=true", () => {
    render(() => <Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("aria-checked is false when checked=false", () => {
    render(() => <Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("renders label when provided", () => {
    render(() => (
      <Switch checked={false} onChange={() => {}} label="Enable feature" />
    ));
    expect(screen.getByText("Enable feature")).toBeInTheDocument();
  });

  it("calls onChange with true when toggled on", () => {
    const handleChange = vi.fn();
    render(() => <Switch checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with false when toggled off", () => {
    const handleChange = vi.fn();
    render(() => <Switch checked={true} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("checkbox is disabled when disabled=true", () => {
    render(() => <Switch checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
