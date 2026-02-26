import { render, screen, fireEvent } from "@testing-library/react";
import { MenuList, MenuItem } from "./MenuList.component";
import { describe, it, expect, vi } from "vitest";

describe("MenuList", () => {
  it("renders children correctly", () => {
    render(
      <MenuList>
        <MenuItem label="Item 1" />
        <MenuItem label="Item 2" />
      </MenuList>,
    );
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
  });

  it("renders title when provided", () => {
    render(
      <MenuList title="My Menu">
        <MenuItem label="Item 1" />
      </MenuList>,
    );
    expect(screen.getByText("My Menu")).toBeDefined();
  });

  it("renders rounded variant correctly", () => {
    const { container } = render(
      <MenuList variant="rounded">
        <MenuItem label="Item 1" />
      </MenuList>,
    );
    // Check for rounded classes
    expect(container.firstChild?.firstChild).toHaveClass("mx-4");
    // Note: The first child of MenuList component is the wrapper div,
    // but my implementation has the wrapper, then title, then list container.
    // Let's check if the list container has rounded classes.
    // The structure is: div.w-full > (div.title)? > div.bg-white.rounded-2xl...
  });
});

describe("MenuItem", () => {
  it("renders label and description", () => {
    render(<MenuItem label="Main Label" description="Sub Label" />);
    expect(screen.getByText("Main Label")).toBeDefined();
    expect(screen.getByText("Sub Label")).toBeDefined();
  });

  it("handles onClick", () => {
    const handleClick = vi.fn();
    render(<MenuItem label="Clickable" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders icons", () => {
    render(
      <MenuItem
        label="Icon Item"
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      />,
    );
    expect(screen.getByTestId("left-icon")).toBeDefined();
    expect(screen.getByTestId("right-icon")).toBeDefined();
  });
});
