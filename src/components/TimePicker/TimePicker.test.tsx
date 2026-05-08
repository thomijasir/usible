import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { TimePicker } from "./TimePicker.component";

describe("TimePicker", () => {
  it("renders container", () => {
    const { container } = render(() => <TimePicker onChange={vi.fn()} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("label shown when provided", () => {
    render(() => <TimePicker onChange={vi.fn()} label="Appointment Time" />);
    expect(screen.getByText("Appointment Time")).toBeTruthy();
  });

  it("placeholder shown with default value", () => {
    render(() => <TimePicker onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Select Time")).toBeTruthy();
  });

  it("placeholder shown with custom value", () => {
    render(() => <TimePicker onChange={vi.fn()} placeholder="Pick a time" />);
    expect(screen.getByPlaceholderText("Pick a time")).toBeTruthy();
  });

  it("input is disabled when disabled=true", () => {
    render(() => <TimePicker onChange={vi.fn()} disabled />);
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("displays current time in input when no value provided", () => {
    render(() => <TimePicker onChange={vi.fn()} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // TimePicker defaults to current time, so value should be non-empty
    expect(input.value).toBeTruthy();
  });

  it("displays provided time value in input", () => {
    const time = new Date(2024, 0, 1, 14, 30, 0);
    render(() => <TimePicker onChange={vi.fn()} value={time} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBeTruthy();
  });
});
