import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Chip } from "./Chip.component";

describe("Chip", () => {
  it("renders label text", () => {
    render(() => <Chip label="My Chip" />);
    expect(screen.getByText("My Chip")).toBeInTheDocument();
  });

  it("filled variant with primary color applies bg-primary-light class", () => {
    const { container } = render(() => (
      <Chip label="Chip" variant="filled" color="primary" />
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("bg-primary-light");
  });

  it("outlined variant shows border class", () => {
    const { container } = render(() => (
      <Chip label="Chip" variant="outlined" />
    ));
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("border");
  });

  it("shows delete button when onDelete is provided", () => {
    const handleDelete = vi.fn();
    render(() => <Chip label="Chip" onDelete={handleDelete} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("does not show delete button when onDelete is not provided", () => {
    render(() => <Chip label="Chip" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("delete button click calls onDelete", () => {
    const handleDelete = vi.fn();
    render(() => <Chip label="Chip" onDelete={handleDelete} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("disabled chip shows opacity-50 class", () => {
    const { container } = render(() => <Chip label="Chip" disabled />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("opacity-50");
  });

  it("disabled chip prevents onClick from being called", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Chip label="Chip" onClick={handleClick} disabled />
    ));
    const el = container.firstElementChild as HTMLElement;
    fireEvent.click(el);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("onClick is called when chip is not disabled", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Chip label="Chip" onClick={handleClick} />
    ));
    const el = container.firstElementChild as HTMLElement;
    fireEvent.click(el);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
