import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { Accordion } from "./Accordion.component";

const items = [
  { id: "1", title: "Item 1", content: "Content 1" },
  { id: "2", title: "Item 2", content: "Content 2" },
  { id: "3", title: "Disabled", content: "Content 3", disabled: true },
];

describe("Accordion", () => {
  it("renders item titles", () => {
    render(() => <Accordion items={items} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  it("headers are collapsed initially (aria-expanded=false)", () => {
    render(() => <Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("clicking header expands it (aria-expanded=true)", () => {
    render(() => <Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking again collapses (aria-expanded=false)", () => {
    render(() => <Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("disabled item has disabled button", () => {
    render(() => <Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    const disabledButton = buttons[2];
    expect(disabledButton).toBeDisabled();
  });

  it("allowMultiple allows multiple items open", () => {
    render(() => <Accordion items={items} allowMultiple />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });
});
