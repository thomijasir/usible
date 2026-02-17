import { render, screen } from "@testing-library/react";
import { Input } from "./Input.component";
import { describe, it, expect } from "vitest";

describe("Input", () => {
  it("renders correctly with label", () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders start adornment", () => {
    render(<Input label="Search" startAdornment={<span>🔍</span>} />);
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });
});
