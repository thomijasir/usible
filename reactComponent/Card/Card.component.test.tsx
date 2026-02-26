import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card.component";
import { describe, it, expect, vi } from "vitest";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies variant classes", () => {
    const { container } = render(<Card variant="outlined">Outlined</Card>);
    expect(container.firstChild).toHaveClass("border");
  });
});
