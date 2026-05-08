import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { CurrencyInput } from "./CurrencyInput.component";

describe("CurrencyInput", () => {
  it("renders container with an input element", () => {
    render(() => <CurrencyInput value={0} onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows currency symbol for SGD (default)", () => {
    render(() => (
      <CurrencyInput value={100} onChange={() => {}} currency="SGD" />
    ));
    expect(screen.getByText("S$")).toBeInTheDocument();
  });

  it("shows currency symbol for USD", () => {
    render(() => (
      <CurrencyInput value={100} onChange={() => {}} currency="USD" />
    ));
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(() => (
      <CurrencyInput value={0} onChange={() => {}} label="Amount" />
    ));
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  it("input is disabled when disabled=true", () => {
    render(() => <CurrencyInput value={0} onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders with initial formatted value", () => {
    render(() => <CurrencyInput value={1234} onChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toContain("1,234");
  });
});
