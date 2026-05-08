import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from "./Tabs.component";

const baseTabs = [
  { value: "tab1", label: "Tab 1", content: <div>Content 1</div> },
  { value: "tab2", label: "Tab 2", content: <div>Content 2</div> },
  { value: "tab3", label: "Tab 3", content: <div>Content 3</div> },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(() => <Tabs tabs={baseTabs} onChange={vi.fn()} />);
    expect(screen.getByText("Tab 1")).toBeTruthy();
    expect(screen.getByText("Tab 2")).toBeTruthy();
    expect(screen.getByText("Tab 3")).toBeTruthy();
  });

  it("shows first tab content by default", () => {
    render(() => <Tabs tabs={baseTabs} onChange={vi.fn()} />);
    expect(screen.getByText("Content 1")).toBeTruthy();
  });

  it("clicking second tab calls onChange with its value", () => {
    const onChange = vi.fn();
    render(() => <Tabs tabs={baseTabs} onChange={onChange} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("disabled tab button has disabled attribute", () => {
    const tabs = [
      { value: "tab1", label: "Tab 1", content: <div>Content 1</div> },
      {
        value: "tab2",
        label: "Tab 2",
        content: <div>Content 2</div>,
        disabled: true,
      },
    ];
    render(() => <Tabs tabs={tabs} onChange={vi.fn()} />);
    const buttons = screen.getAllByRole("button");
    const disabledBtn = buttons.find((b) => b.textContent?.includes("Tab 2"));
    expect(disabledBtn).toBeDisabled();
  });

  it("controlled value prop shows correct tab content", () => {
    render(() => <Tabs tabs={baseTabs} value="tab2" onChange={vi.fn()} />);
    expect(screen.getByText("Content 2")).toBeTruthy();
  });

  it("clicking a tab shows new content when uncontrolled", () => {
    render(() => <Tabs tabs={baseTabs} onChange={vi.fn()} />);
    fireEvent.click(screen.getByText("Tab 3"));
    expect(screen.getByText("Content 3")).toBeTruthy();
  });

  it("disabled tab cannot be clicked to change content", () => {
    const onChange = vi.fn();
    const tabs = [
      { value: "tab1", label: "Tab 1", content: <div>Content 1</div> },
      {
        value: "tab2",
        label: "Tab 2",
        content: <div>Content 2</div>,
        disabled: true,
      },
    ];
    render(() => <Tabs tabs={tabs} onChange={onChange} />);
    const buttons = screen.getAllByRole("button");
    const disabledBtn = buttons.find((b) => b.textContent?.includes("Tab 2"))!;
    fireEvent.click(disabledBtn);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with vertical orientation", () => {
    render(() => (
      <Tabs tabs={baseTabs} onChange={vi.fn()} orientation="vertical" />
    ));
    expect(screen.getByText("Tab 1")).toBeTruthy();
  });

  it("renders with filled variant", () => {
    render(() => <Tabs tabs={baseTabs} onChange={vi.fn()} variant="filled" />);
    expect(screen.getByText("Tab 1")).toBeTruthy();
  });

  it("renders with block variant", () => {
    render(() => <Tabs tabs={baseTabs} onChange={vi.fn()} variant="block" />);
    expect(screen.getByText("Tab 1")).toBeTruthy();
  });

  it("renders with centered prop", () => {
    render(() => <Tabs tabs={baseTabs} onChange={vi.fn()} centered />);
    expect(screen.getByText("Tab 1")).toBeTruthy();
  });

  it("renders with icons", () => {
    const tabs = [
      {
        value: "tab1",
        label: "Tab 1",
        icon: <span>Icon1</span>,
        content: <div>Content 1</div>,
      },
      {
        value: "tab2",
        label: "Tab 2",
        icon: <span>Icon2</span>,
        content: <div>Content 2</div>,
      },
    ];
    render(() => <Tabs tabs={tabs} onChange={vi.fn()} />);
    expect(screen.getByText("Icon1")).toBeTruthy();
    expect(screen.getByText("Icon2")).toBeTruthy();
  });
});
