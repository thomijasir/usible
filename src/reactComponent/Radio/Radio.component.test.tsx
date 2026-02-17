import { render, screen, fireEvent } from "@testing-library/react";
import { Radio } from "./Radio.component";
import { describe, it, expect, vi } from "vitest";

describe("Radio", () => {
  it("renders correctly with label", () => {
    render(<Radio label="Option 1" value="1" />);
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
  });

  it("renders description and icon", () => {
    render(
      <Radio label="Pay" description="With card" icon={<span>💳</span>} />,
    );
    expect(screen.getByText("With card")).toBeInTheDocument();
    expect(screen.getByText("💳")).toBeInTheDocument();
  });

  it("handles click", () => {
    const handleChange = vi.fn();
    render(<Radio label="Option 1" onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText("Option 1"));
    expect(handleChange).toHaveBeenCalled();
  });
});
