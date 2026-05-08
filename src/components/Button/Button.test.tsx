import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button.component";

describe("Button", () => {
  it("renders children", () => {
    render(() => <Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("defaults to type=button", () => {
    render(() => <Button>B</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("renders type=submit", () => {
    render(() => <Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies filled primary classes by default", () => {
    render(() => <Button>B</Button>);
    expect(screen.getByRole("button").className).toContain("bg-primary");
  });

  it("applies w-full when block=true", () => {
    render(() => <Button block>B</Button>);
    expect(screen.getByRole("button").className).toContain("w-full");
  });

  it("is disabled when disabled=true", () => {
    render(() => <Button disabled>B</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading=true", () => {
    render(() => <Button loading>B</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("shows loader when loading", () => {
    const { container } = render(() => <Button loading>B</Button>);
    expect(container.querySelector('[role="status"]')).toBeTruthy();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(() => <Button onClick={onClick}>B</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies small size classes", () => {
    render(() => <Button size="small">B</Button>);
    expect(screen.getByRole("button").className).toContain("py-2.5");
  });

  it("applies large size classes", () => {
    render(() => <Button size="large">B</Button>);
    expect(screen.getByRole("button").className).toContain("py-4");
  });

  it("applies outlined variant classes", () => {
    render(() => <Button variant="outlined">B</Button>);
    expect(screen.getByRole("button").className).toContain("border");
  });

  it("applies secondary color", () => {
    render(() => <Button color="secondary">B</Button>);
    expect(screen.getByRole("button").className).toContain("bg-secondary");
  });

  it("applies error color", () => {
    render(() => <Button color="error">B</Button>);
    expect(screen.getByRole("button").className).toContain("bg-error");
  });
});
