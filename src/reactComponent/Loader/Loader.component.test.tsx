import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader.component";
import { describe, it, expect } from "vitest";

describe("Loader", () => {
  it("renders correctly", () => {
    render(<Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { container } = render(<Loader size="large" />);
    expect(container.firstChild).toHaveClass("w-12 h-12");
  });

  it("applies color classes", () => {
    const { container } = render(<Loader color="secondary" />);
    expect(container.firstChild).toHaveClass("border-secondary/30");
  });
});
