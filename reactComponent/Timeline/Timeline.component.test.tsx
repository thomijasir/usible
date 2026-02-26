import { render, screen } from "@testing-library/react";
import { Timeline } from "./Timeline.component";
import { describe, it, expect } from "vitest";

describe("Timeline", () => {
  it("renders timeline items", () => {
    const items = [
      { title: "Step 1", status: "completed" as const },
      { title: "Step 2", status: "pending" as const },
    ];
    render(<Timeline items={items} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });
});
