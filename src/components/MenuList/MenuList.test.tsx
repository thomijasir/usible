import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { MenuList, MenuItem } from "./MenuList.component";

describe("MenuList", () => {
  it("renders with role=menu", () => {
    render(() => (
      <MenuList>
        <MenuItem label="Item 1" />
      </MenuList>
    ));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(() => (
      <MenuList title="Settings">
        <MenuItem label="Item 1" />
      </MenuList>
    ));
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("does not render title when not provided", () => {
    render(() => (
      <MenuList>
        <MenuItem label="Item 1" />
      </MenuList>
    ));
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });
});

describe("MenuItem", () => {
  it("renders with role=menuitem", () => {
    render(() => <MenuItem label="My Item" />);
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(() => <MenuItem label="My Item" />);
    expect(screen.getByText("My Item")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(() => <MenuItem label="My Item" description="Item description" />);
    expect(screen.getByText("Item description")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(() => <MenuItem label="My Item" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("menuitem"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows chevron by default", () => {
    const { container } = render(() => <MenuItem label="My Item" />);
    const svgEl = container.querySelector("svg");
    expect(svgEl).toBeInTheDocument();
  });

  it("hides chevron when showChevron=false", () => {
    const { container } = render(() => (
      <MenuItem label="My Item" showChevron={false} />
    ));
    const svgEl = container.querySelector("svg");
    expect(svgEl).not.toBeInTheDocument();
  });
});
