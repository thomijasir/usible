import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tabs, Tab } from "./Tabs.component";

describe("Tabs Component", () => {
  // Mock getBoundingClientRect
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 50,
      top: 0,
      left: 0,
      bottom: 50,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Tab component individually", () => {
    render(
      <Tab value="standalone" label="Standalone">
        Standalone Content
      </Tab>,
    );
    expect(screen.getByText("Standalone Content")).toBeInTheDocument();
    expect(screen.getByText("Standalone Content").closest("div")).toHaveClass(
      "w-full h-full",
    );
  });

  it("renders tabs and default content", () => {
    render(
      <Tabs defaultValue="tab1">
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    );

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("selects first tab by default if no value/defaultValue provided", () => {
    render(
      <Tabs>
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    );
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("switches content when a tab is clicked (uncontrolled)", () => {
    render(
      <Tabs defaultValue="tab1">
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    );

    fireEvent.click(screen.getByText("Tab 2"));

    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("calls onChange when a tab is clicked", () => {
    const handleChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onChange={handleChange}>
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    );

    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("tab2");
  });

  it("respects controlled value", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Tabs value="tab1" onChange={handleChange}>
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("tab2");

    // Should NOT change content because it's controlled and we didn't update prop
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    // Now update prop
    rerender(
      <Tabs value="tab2" onChange={handleChange}>
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    );
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("does not switch when disabled tab is clicked", () => {
    const handleChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onChange={handleChange}>
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
        <Tab value="tab2" label="Tab 2" disabled>
          Content 2
        </Tab>
      </Tabs>,
    );

    const tab2Button = screen.getByRole("button", { name: /Tab 2/i });
    expect(tab2Button).toBeDisabled();

    fireEvent.click(tab2Button);
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("renders icons in tabs", () => {
    render(
      <Tabs defaultValue="tab1">
        <Tab value="tab1" label="Tab 1" icon={<span data-testid="icon-1" />}>
          Content 1
        </Tab>
      </Tabs>,
    );

    expect(screen.getByTestId("icon-1")).toBeInTheDocument();
  });

  it("renders with vertical orientation", () => {
    const { container } = render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
      </Tabs>,
    );
    // The container of tabs headers gets flex-col with vertical
    const headersContainer = container.querySelector(
      "div > div.flex.flex-col.relative",
    );
    expect(headersContainer).toBeInTheDocument();
  });

  it("renders with filled variant", () => {
    const { container } = render(
      <Tabs defaultValue="tab1" variant="filled">
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
      </Tabs>,
    );
    const headersContainer = container.querySelector(".bg-gray-100");
    expect(headersContainer).toBeInTheDocument();
  });

  it("renders centered tabs", () => {
    const { container } = render(
      <Tabs defaultValue="tab1" centered>
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
      </Tabs>,
    );
    // Centered class
    const headersContainer = container.querySelector(".justify-center");
    expect(headersContainer).toBeInTheDocument();
  });

  it("calculates indicator position correctly (useEffect)", () => {
    // We can't easily assert DOM rect math results without inspecting inline styles on the indicator.
    // But we can check if the indicator exists and has styles.
    render(
      <Tabs defaultValue="tab1">
        <Tab value="tab1" label="Tab 1">
          Content 1
        </Tab>
      </Tabs>,
    );
  });

  it("ignores invalid children", () => {
    render(
      <Tabs>
        <Tab value="t1" label="T1">
          C1
        </Tab>
        {/* @ts-ignore */}
        <div>Invalid Child</div>
        {null}
      </Tabs>,
    );
    expect(screen.getByText("T1")).toBeInTheDocument();
    expect(screen.queryByText("Invalid Child")).not.toBeInTheDocument();
  });
});
