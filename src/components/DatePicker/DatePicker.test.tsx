import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "./DatePicker.component";

describe("DatePicker", () => {
  it("renders container", () => {
    const { container } = render(() => <DatePicker onChange={vi.fn()} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("label shown when provided", () => {
    render(() => <DatePicker onChange={vi.fn()} label="Birth Date" />);
    expect(screen.getByText("Birth Date")).toBeTruthy();
  });

  it("placeholder shown with default value", () => {
    render(() => <DatePicker onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Select Date")).toBeTruthy();
  });

  it("placeholder shown with custom value", () => {
    render(() => <DatePicker onChange={vi.fn()} placeholder="Pick a date" />);
    expect(screen.getByPlaceholderText("Pick a date")).toBeTruthy();
  });

  it("input is disabled when disabled=true", () => {
    render(() => <DatePicker onChange={vi.fn()} disabled />);
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("renders an input element", () => {
    render(() => <DatePicker onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("shows calendar icon", () => {
    render(() => <DatePicker onChange={vi.fn()} />);
    const svg = document.querySelector("svg");
    expect(svg).toBeTruthy();
  });

  it("applies custom class", () => {
    const { container } = render(() => (
      <DatePicker onChange={vi.fn()} class="custom-class" />
    ));
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-class");
  });

  it("renders with initial value", () => {
    const date = new Date(2024, 5, 15);
    render(() => <DatePicker onChange={vi.fn()} value={date} />);
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input.value).toBeTruthy();
  });
});
