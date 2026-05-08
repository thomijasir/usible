import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./Select.component";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("Select", () => {
  it("renders a select element", () => {
    render(() => <Select options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all provided options", () => {
    render(() => <Select options={options} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("shows label when provided", () => {
    render(() => <Select options={options} label="Choose a fruit" />);
    expect(screen.getByText("Choose a fruit")).toBeInTheDocument();
  });

  it("shows placeholder option when provided", () => {
    render(() => <Select options={options} placeholder="Select an option" />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("calls onChange with the selected value string", () => {
    const handleChange = vi.fn();
    render(() => <Select options={options} onChange={handleChange} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "banana" } });
    expect(handleChange).toHaveBeenCalledWith("banana");
  });

  it("is disabled when disabled=true", () => {
    render(() => <Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("shows error message below the select when error is provided", () => {
    render(() => <Select options={options} error="Please select an option" />);
    expect(screen.getByText("Please select an option")).toBeInTheDocument();
  });

  it("shows helperText when provided", () => {
    render(() => (
      <Select options={options} helperText="Choose your favorite" />
    ));
    expect(screen.getByText("Choose your favorite")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(() => <Select options={options} value="banana" />);
    expect(screen.getByRole("combobox")).toHaveValue("banana");
  });
});
