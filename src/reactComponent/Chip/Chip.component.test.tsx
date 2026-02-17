import { render, screen, fireEvent } from "@testing-library/react";
import { Chip } from "./Chip.component";
import { describe, it, expect, vi } from "vitest";

describe("Chip", () => {
  it("renders label correctly", () => {
    render(<Chip label="Tag" />);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Chip label="Clickable" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("handles delete events", () => {
    const handleDelete = vi.fn();
    render(<Chip label="Deletable" onDelete={handleDelete} />);
    const deleteButton = screen.getByRole("button"); // The X icon is wrapped in a div with role="button"
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });

  it("respects disabled state", () => {
    const handleClick = vi.fn();
    render(<Chip label="Disabled" disabled onClick={handleClick} />);
    fireEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
