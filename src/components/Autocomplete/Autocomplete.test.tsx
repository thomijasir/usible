import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Autocomplete } from "./Autocomplete.component";

const baseItems = [
  { id: "1", label: "Bangkok" },
  { id: "2", label: "Chiang Mai" },
  { id: "3", label: "Phuket", description: "Island city" },
];

describe("Autocomplete", () => {
  it("renders container div", () => {
    const { container } = render(() => (
      <Autocomplete items={baseItems} onChange={vi.fn()} />
    ));
    expect(container.firstChild).toBeTruthy();
  });

  it("label shown when provided", () => {
    render(() => (
      <Autocomplete items={baseItems} onChange={vi.fn()} label="City" />
    ));
    expect(screen.getByText("City")).toBeTruthy();
  });

  it("placeholder shown via the Input inside", () => {
    render(() => (
      <Autocomplete
        items={baseItems}
        onChange={vi.fn()}
        placeholder="Select a city"
      />
    ));
    expect(screen.getByPlaceholderText("Select a city")).toBeTruthy();
  });

  it("disabled prop passes through to Input", () => {
    render(() => (
      <Autocomplete items={baseItems} onChange={vi.fn()} disabled />
    ));
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("renders without error when no value provided", () => {
    const { container } = render(() => (
      <Autocomplete items={baseItems} onChange={vi.fn()} />
    ));
    expect(container).toBeTruthy();
  });
});
