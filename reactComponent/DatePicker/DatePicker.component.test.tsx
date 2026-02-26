import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DatePicker } from "./DatePicker.component";
import { vi } from "vitest";

// Mock Drawer to simplify testing the content inside it without animation delays
vi.mock("../Drawer/Drawer.component", () => ({
  Drawer: ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div data-testid="drawer-content">
        <button onClick={onClose} data-testid="drawer-close-overlay">
          Close Overlay
        </button>
        {children}
      </div>
    ) : null,
}));

describe("DatePicker", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Fix the system time to a specific date to ensure calendar generation is consistent
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 0, 15)); // Jan 15, 2023
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders input field with label and placeholder", () => {
    render(<DatePicker label="Select Date" placeholder="Choose a date" />);
    const input = screen.getByLabelText("Select Date");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Choose a date");
  });

  it("opens calendar on click when enabled", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("does not open calendar on click when disabled", () => {
    render(<DatePicker disabled />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("displays initial value correctly", () => {
    const date = new Date(2023, 10, 15); // Nov 15 2023
    render(<DatePicker value={date} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("November 15, 2023");
  });

  it("updates internal value when prop changes", () => {
    const { rerender } = render(<DatePicker value={new Date(2023, 0, 1)} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("January 1, 2023");

    rerender(<DatePicker value={new Date(2023, 1, 1)} />);
    expect(input.value).toBe("February 1, 2023");
  });

  it("navigates months correctly", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("textbox"));

    // Initial view should be Jan 2023 (based on system time)
    expect(screen.getByText("Jan 2023")).toBeInTheDocument();

    // Next Month
    const nextBtn = screen.getByLabelText("Next month");
    fireEvent.click(nextBtn);
    expect(screen.getByText("Feb 2023")).toBeInTheDocument();

    // Prev Month (back to Jan)
    const prevBtn = screen.getByLabelText("Previous month");
    fireEvent.click(prevBtn);
    expect(screen.getByText("Jan 2023")).toBeInTheDocument();
  });

  it("selects a date and calls onChange", () => {
    render(<DatePicker onChange={mockOnChange} />);
    fireEvent.click(screen.getByRole("textbox"));

    // Select Jan 20, 2023.
    // Note: We need to be careful with finding the specific day button if multiple "20" exist (prev/next month padding).
    // In Jan 2023, 20 is a Friday.
    // We can use text content, but ensure we pick the one in current month.
    // The component renders day numbers.

    const dayButtons = screen.getAllByText("20");
    // Usually the current month's day is distinguishable by class or position,
    // but here we can just click the first one as Jan 20 is likely unique or distinct in the grid for this view.
    // However, let's refine: renderDay adds 'text-gray-700' for current month and 'text-gray-300' for others.

    // Let's just click the one that looks "enabled" or check classes if needed,
    // or simply click the one that corresponds to the current month logic.
    // Since Jan 2023 starts on Sun (1st), 20th is well within the month.

    fireEvent.click(dayButtons[0]!);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const calledDate = mockOnChange.mock.calls[0]![0];
    expect(calledDate.getDate()).toBe(20);
    expect(calledDate.getMonth()).toBe(0); // Jan
    expect(calledDate.getFullYear()).toBe(2023);

    // Should close drawer
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("respects minDate and maxDate", () => {
    const minDate = new Date(2023, 0, 10);
    const maxDate = new Date(2023, 0, 20);

    render(
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        onChange={mockOnChange}
      />,
    );
    fireEvent.click(screen.getByRole("textbox"));

    // Try clicking Jan 5 (disabled)
    const day5 = screen.getAllByText("5").find((el) => el.tagName === "BUTTON");
    if (day5) {
      fireEvent.click(day5);
      expect(day5).toHaveClass("text-gray-200");
    }
    expect(mockOnChange).not.toHaveBeenCalled();

    // Try clicking Jan 25 (disabled)
    const day25 = screen
      .getAllByText("25")
      .find((el) => el.tagName === "BUTTON");
    if (day25) fireEvent.click(day25);
    expect(mockOnChange).not.toHaveBeenCalled();

    // Click Jan 15 (enabled)
    const day15 = screen
      .getAllByText("15")
      .find((el) => el.tagName === "BUTTON");
    if (day15) fireEvent.click(day15);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("highlights today's date", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("textbox"));
    // Jan 15 is today (mocked).
    const day15 = screen
      .getAllByText("15")
      .find((el) => el.tagName === "BUTTON");
    expect(day15).toHaveClass("border-primary"); // Based on component logic for 'isToday'
  });

  it("highlights selected date", () => {
    const value = new Date(2023, 0, 10);
    render(<DatePicker value={value} />);
    fireEvent.click(screen.getByRole("textbox"));

    const day10 = screen
      .getAllByText("10")
      .find((el) => el.tagName === "BUTTON");
    expect(day10).toHaveClass("bg-primary");
  });

  it("closes via Close button", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("textbox"));

    const closeBtn = screen.getByText("Close");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("opens via calendar icon click", () => {
    render(<DatePicker />);
    // The icon is inside the input's endAdornment.
    // The component has an onClick on the wrapper div of the icon.
    // We can find it by the svg or parent class.
    const icon = document.querySelector(".cursor-pointer.p-1");
    if (icon) fireEvent.click(icon);
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("renders different states for days", () => {
    // Test logic for prev/next month padding visuals
    // Jan 1 2023 is Sunday. So no prev month padding in the first row if grid starts Sunday?
    // Wait, getFirstDayOfMonth(Jan 1 2023) returns 0 (Sunday).
    // The loop: for (let i = firstDayOfWeek - 1; i >= 0; i--) -> i = -1. Loop doesn't run.
    // So Jan 1 is the first cell.

    // Let's look at Feb 2023. Feb 1 is Wednesday (3).
    // Prev month padding: Mon(30), Tue(31) of Jan.
    // Grid starts Su, Mo, Tu, We...
    // So Su(29), Mo(30), Tu(31).

    vi.setSystemTime(new Date(2023, 1, 15)); // Feb 2023
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("textbox"));

    // Find a day from previous month, e.g., 30 (Jan 30)
    // It should have text-gray-300
    const prevMonthDay = screen.getAllByText("30")[0]; // Should be the first one if any
    expect(prevMonthDay).toHaveClass("text-gray-300");

    // Find a day from current month that is NOT today (15th is today), e.g., 16
    const currentMonthDay = screen.getAllByText("16")[0];
    expect(currentMonthDay).toHaveClass("text-gray-700");
  });
});
