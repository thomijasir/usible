import { render, screen, fireEvent } from "@testing-library/react";
import { Autocomplete } from "./Autocomplete.component";
import { AutocompleteProps } from "./Autocomplete.interface";
import { vi } from "vitest";

describe("Autocomplete", () => {
  const mockItems = [
    { id: "1", label: "Apple", description: "A red fruit" },
    { id: "2", label: "Banana", description: "A yellow fruit" },
    { id: "3", label: "Cherry", description: "A small red fruit" },
  ];
  const mockOnChange = vi.fn();

  const defaultProps: AutocompleteProps = {
    items: mockItems,
    onChange: mockOnChange,
    label: "Fruit",
    placeholder: "Select a fruit",
    id: "autocomplete-test",
  };

  it("renders input with label and placeholder", () => {
    render(<Autocomplete {...defaultProps} />);
    expect(screen.getByLabelText("Fruit")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select a fruit")).toBeInTheDocument();
  });

  it("opens overlay on click", () => {
    render(<Autocomplete {...defaultProps} />);
    const input = screen.getByPlaceholderText("Select a fruit");
    fireEvent.click(input);

    // Check for elements in the overlay
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("filters items based on search query", () => {
    render(<Autocomplete {...defaultProps} />);
    fireEvent.click(screen.getByPlaceholderText("Select a fruit"));

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Apple" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("calls onChange when an item is selected", () => {
    render(<Autocomplete {...defaultProps} />);
    fireEvent.click(screen.getByPlaceholderText("Select a fruit"));

    fireEvent.click(screen.getByText("Banana"));

    expect(mockOnChange).toHaveBeenCalledWith("2");
  });

  it("does not open when disabled", () => {
    render(<Autocomplete {...defaultProps} disabled />);
    const input = screen.getByPlaceholderText("Select a fruit");
    fireEvent.click(input);

    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });
});
