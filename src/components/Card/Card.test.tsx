import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./Card.component";

describe("Card", () => {
  it("renders children", () => {
    render(() => <Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("elevated variant (default) has themed shadow class", () => {
    const { container } = render(() => <Card>Content</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("shadow-usible-sm");
  });

  it("outlined variant has border class", () => {
    const { container } = render(() => <Card variant="outlined">Content</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("border");
  });

  it("filled variant has themed surface class", () => {
    const { container } = render(() => <Card variant="filled">Content</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("bg-surface-muted");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Card onClick={handleClick}>Content</Card>
    ));
    const el = container.firstElementChild as HTMLElement;
    fireEvent.click(el);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies clickable class when onClick is provided", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Card onClick={handleClick}>Content</Card>
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("cursor-pointer");
  });

  it("applies custom class", () => {
    const { container } = render(() => <Card class="my-card">Content</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("my-card");
  });
});
