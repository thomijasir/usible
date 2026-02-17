import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TimePicker } from "./TimePicker.component";
import { vi } from "vitest";

// Mock Drawer to render content immediately
vi.mock("../Drawer/Drawer.component", () => ({
  Drawer: ({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) => (isOpen ? <div data-testid="drawer-content">{children}</div> : null),
}));

describe("TimePicker", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    // Set a fixed system time: Jan 15, 2023, 10:30 AM
    vi.setSystemTime(new Date(2023, 0, 15, 10, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders input field", () => {
    render(<TimePicker label="Select Time" />);
    expect(screen.getByLabelText("Select Time")).toBeInTheDocument();
  });

  it("opens picker on click", () => {
    render(<TimePicker label="Select Time" />);
    const input = screen.getByLabelText("Select Time");
    fireEvent.click(input);

    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    expect(screen.getByText("HOUR")).toBeInTheDocument();
    expect(screen.getByText("MINUTE")).toBeInTheDocument();
  });

  it("does not open when disabled", () => {
    render(<TimePicker disabled />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();

    // Also check icon click
    const icon = document.querySelector(".cursor-pointer");
    if (icon) fireEvent.click(icon);
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("displays formatted time (12h default)", () => {
    const time = new Date(2023, 0, 15, 14, 30); // 2:30 PM
    render(<TimePicker value={time} onChange={mockOnChange} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    // 2:30 PM
    expect(input.value).toMatch(/0?2:30/);
    expect(input.value).toMatch(/pm/i);
  });

  it("displays formatted time (24h)", () => {
    const time = new Date(2023, 0, 15, 14, 30); // 14:30
    render(<TimePicker value={time} format="24h" onChange={mockOnChange} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("14:30");
  });

  it("initializes with current time if no value provided", () => {
    render(<TimePicker />);
    // current mocked time is 10:30 AM
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toMatch(/10:30/);
    expect(input.value).toMatch(/am/i);
  });

  it("updates internal value when prop value changes", () => {
    const { rerender } = render(
      <TimePicker value={new Date(2023, 0, 15, 10, 0)} />,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toMatch(/10:00/);

    rerender(<TimePicker value={new Date(2023, 0, 15, 11, 0)} />);
    expect(input.value).toMatch(/11:00/);
  });

  it("handles 12h hour selection", () => {
    render(
      <TimePicker
        onChange={mockOnChange}
        format="12h"
        value={new Date(2023, 0, 15, 10, 30)}
      />,
    ); // 10:30 AM
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Find 11 in hours list and click it
    const hour11 = screen.getAllByText("11")[0]!;
    fireEvent.click(hour11);

    // Confirm
    fireEvent.click(screen.getByText("Confirm"));

    expect(mockOnChange).toHaveBeenCalled();
    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getHours()).toBe(11);
    expect(callDate.getMinutes()).toBe(30);
  });

  it("handles minute selection", () => {
    render(
      <TimePicker
        onChange={mockOnChange}
        value={new Date(2023, 0, 15, 10, 30)}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Select "45" minute.
    const min45 = screen.getByText("45");
    fireEvent.click(min45);

    fireEvent.click(screen.getByText("Confirm"));

    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getMinutes()).toBe(45);
  });

  it("handles AM/PM selection", () => {
    // Start at 10:30 AM
    render(
      <TimePicker
        onChange={mockOnChange}
        format="12h"
        value={new Date(2023, 0, 15, 10, 30)}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Switch to PM
    const pmBtn = screen.getByText("PM");
    fireEvent.click(pmBtn);

    fireEvent.click(screen.getByText("Confirm"));

    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getHours()).toBe(22); // 10 PM = 22
  });

  it("handles 12 PM edge case (Noon)", () => {
    // Start 12:00 PM
    render(
      <TimePicker
        onChange={mockOnChange}
        format="12h"
        value={new Date(2023, 0, 15, 12, 0)}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Switch to AM -> Should be 12:00 AM (00:00)
    const amBtn = screen.getByText("AM");
    fireEvent.click(amBtn);
    fireEvent.click(screen.getByText("Confirm"));

    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getHours()).toBe(0);
  });

  it("handles 12 AM edge case (Midnight)", () => {
    // Start 00:00 (12:00 AM)
    render(
      <TimePicker
        onChange={mockOnChange}
        format="12h"
        value={new Date(2023, 0, 15, 0, 0)}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Switch to PM -> Should be 12:00 PM
    const pmBtn = screen.getByText("PM");
    fireEvent.click(pmBtn);
    fireEvent.click(screen.getByText("Confirm"));

    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getHours()).toBe(12);
  });

  it("handles 12 to 1 wrap in 12h mode", () => {
    // If current is 12:00 PM and we select 1 (PM), it should be 13:00
    render(
      <TimePicker
        onChange={mockOnChange}
        format="12h"
        value={new Date(2023, 0, 15, 12, 0)}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    const hour1 = screen.getAllByText("1")[0]!;
    fireEvent.click(hour1);
    fireEvent.click(screen.getByText("Confirm"));

    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getHours()).toBe(13);
  });

  it("handles 24h hour selection", () => {
    render(
      <TimePicker
        onChange={mockOnChange}
        format="24h"
        value={new Date(2023, 0, 15, 10, 0)}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Select 15 (3 PM)
    const hour15 = screen.getAllByText("15")[0]!;
    fireEvent.click(hour15);
    fireEvent.click(screen.getByText("Confirm"));

    const callDate = mockOnChange.mock.calls[0]![0];
    expect(callDate.getHours()).toBe(15);
  });

  it("closes without change on Cancel", () => {
    render(<TimePicker onChange={mockOnChange} />);
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Change something
    const min45 = screen.getByText("45");
    fireEvent.click(min45);

    // Cancel
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("confirms without onChange prop", () => {
    render(<TimePicker />); // No onChange provided
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // Just click confirm
    fireEvent.click(screen.getByText("Confirm"));

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("handles scroll events", () => {
    render(<TimePicker onChange={mockOnChange} />);
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // We can find the container by looking for items and their parent
    const item00 = screen.getAllByText("00")[0];
    const scrollContainer = item00?.parentElement;

    if (scrollContainer) {
      // Simulate scroll
      fireEvent.scroll(scrollContainer, { target: { scrollTop: 44 * 5 } });

      expect(scrollContainer).toHaveAttribute("data-scrolling", "true");

      // Fast forward timers
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(scrollContainer).toHaveAttribute("data-scrolling", "false");
    }
  });

  it("opens via icon click", () => {
    render(<TimePicker />);
    const icon = document.querySelector(".cursor-pointer.p-1");
    if (icon) fireEvent.click(icon);
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("scroll effect logic handles initial scrollTop", () => {
    render(<TimePicker value={new Date(2023, 0, 15, 10, 0)} />);
    fireEvent.click(screen.getByPlaceholderText("Select Time"));

    // 10 should be selected (scale-110)
    const hour10 = screen.getAllByText("10")[0];
    expect(hour10).toHaveClass("scale-110");
  });
});
