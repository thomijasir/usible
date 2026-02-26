import { render, screen } from "@testing-library/react";
import { Select } from "./Select.component";
import { describe, it, expect } from "vitest";

describe("Select", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  it("renders correctly with label and options", () => {
    render(<Select label="Choose" options={options} />);
    expect(screen.getByLabelText("Choose")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("displays error message", () => {
    render(<Select label="Choose" error="Required" options={options} />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
