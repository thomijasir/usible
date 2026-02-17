import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton.component";
import { describe, it, expect } from "vitest";

describe("Skeleton", () => {
  it("renders correctly", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("renders with specific variant", () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });
});
