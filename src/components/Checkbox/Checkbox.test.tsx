import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox.component";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(() => <Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(() => <Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    render(() => <Checkbox />);
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("is checked when checked=true", () => {
    render(() => <Checkbox checked={true} onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is not checked when checked=false", () => {
    render(() => <Checkbox checked={false} onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onChange with boolean true when checked", () => {
    const handleChange = vi.fn();
    render(() => <Checkbox checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with boolean false when unchecked", () => {
    const handleChange = vi.fn();
    render(() => <Checkbox checked={true} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("is disabled when disabled=true", () => {
    render(() => <Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("applies border-error class when error is provided", () => {
    render(() => <Checkbox error="Required field" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className).toContain("border-error");
  });
});
