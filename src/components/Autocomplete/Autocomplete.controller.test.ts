import { describe, it, expect, vi } from "vitest";
import { createAutocompleteController } from "./Autocomplete.controller";

const mockItems = [
  { id: "1", label: "Bangkok", description: "Capital city" },
  { id: "2", label: "Chiang Mai", description: "Northern city" },
  { id: "3", label: "Phuket", description: "Island city" },
];

describe("createAutocompleteController", () => {
  it("returns initial state with isOpen and isVisible false", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    expect(controller.state.isOpen()).toBe(false);
    expect(controller.state.isVisible()).toBe(false);
    expect(controller.state.searchQuery()).toBe("");
  });

  it("filters items based on search query in label", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.setSearchQuery("bangkok");
    expect(controller.state.filteredItems()).toHaveLength(1);
    expect(controller.state.filteredItems()[0]?.id).toBe("1");
  });

  it("filters items based on search query in description", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.setSearchQuery("northern");
    expect(controller.state.filteredItems()).toHaveLength(1);
    expect(controller.state.filteredItems()[0]?.id).toBe("2");
  });

  it("returns all items when search query is empty", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.setSearchQuery("");
    expect(controller.state.filteredItems()).toHaveLength(3);
  });

  it("returns empty array when no items match", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.setSearchQuery("xyz");
    expect(controller.state.filteredItems()).toHaveLength(0);
  });

  it("search query is case insensitive", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.setSearchQuery("BANGKOK");
    expect(controller.state.filteredItems()).toHaveLength(1);
    expect(controller.state.filteredItems()[0]?.id).toBe("1");
  });

  it("selectedItem returns item matching value", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      value: "2",
      onChange: () => {},
    });
    expect(controller.state.selectedItem()?.label).toBe("Chiang Mai");
  });

  it("selectedItem returns undefined when no match", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      value: "999",
      onChange: () => {},
    });
    expect(controller.state.selectedItem()).toBeUndefined();
  });

  it("handleOpen sets isVisible true when not disabled", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.handleOpen();
    expect(controller.state.isVisible()).toBe(true);
  });

  it("handleOpen does nothing when disabled", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
      disabled: true,
    });
    controller.actions.handleOpen();
    expect(controller.state.isVisible()).toBe(false);
  });

  it("handleClose resets search query", () => {
    const controller = createAutocompleteController({
      items: mockItems,
      onChange: () => {},
    });
    controller.actions.setSearchQuery("test");
    controller.actions.handleClose();
    expect(controller.state.searchQuery()).toBe("");
  });

  it("handleSelect calls onChange with id and closes", () => {
    const onChange = vi.fn();
    const controller = createAutocompleteController({
      items: mockItems,
      onChange,
    });
    controller.actions.handleSelect("2");
    expect(onChange).toHaveBeenCalledWith("2");
  });
});
