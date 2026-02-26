import React, { useState, useMemo } from "react";
import { DatePickerProps } from "./DatePicker.interface";
import { Input } from "../Input/Input.component";
import { Drawer } from "../Drawer/Drawer.component";
import { Text } from "../Text/Text.component";
import { Button } from "../Button/Button.component";
import {
  daysInMonth,
  getFirstDayOfMonth,
  isSameDate,
  isDateDisabled,
  formatDate,
  addMonths,
} from "~/utilities/date.utils";
import { twMerge } from "tailwind-merge";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "~/assets/icons";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  dayNumber: number;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  label = "",
  placeholder = "Select Date",
  disabled,
  className,
  ...inputProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | null>(
    value || null,
  );

  // viewDate tracks the month being displayed. Default to selected date or today.
  const [viewDate, setViewDate] = useState<Date>(value || new Date());

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== undefined) {
      setInternalValue(value);
      if (value) {
        setViewDate(value);
      }
    }
  }

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      // Reset view to currently selected date or today when opening
      setViewDate(internalValue || new Date());
    }
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => addMonths(prev, 1));
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date, minDate, maxDate)) {
      return;
    }

    setInternalValue(date);
    if (onChange) {
      onChange(date);
    }
    // If user clicks a day from prev/next month, update the view too?
    // Usually good UX to just select it. If it's a drawer, maybe close it?
    // Let's close it as per previous requirement "user cannot direct input... must select".
    setIsOpen(false);
  };

  // Calendar Grid Generation (Fixed 6 Weeks / 42 Days)
  const calendarDays = useMemo<CalendarDay[]>(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const days: CalendarDay[] = [];

    // 1. Previous Month Padding
    const firstDayOfWeek = getFirstDayOfMonth(viewDate); // 0 (Sun) to 6 (Sat)
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDate - i),
        isCurrentMonth: false,
        dayNumber: prevMonthLastDate - i,
      });
    }

    // 2. Current Month
    const totalDays = daysInMonth(viewDate);
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        dayNumber: i,
      });
    }

    // 3. Next Month Padding (Fill up to 42)
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        dayNumber: i,
      });
    }

    return days;
  }, [viewDate]);

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const renderDay = (day: CalendarDay, index: number) => {
    const isSelected = isSameDate(day.date, internalValue);
    const isToday = isSameDate(day.date, new Date());
    const isDisabled = isDateDisabled(day.date, minDate, maxDate);
    const isCurrentMonth = day.isCurrentMonth;

    return (
      <div
        key={`${day.date.toISOString()}-${index}`}
        className="aspect-square p-0.5">
        <button
          type="button"
          onClick={() => handleDayClick(day.date)}
          disabled={isDisabled}
          className={twMerge(
            "w-full h-full rounded-full flex items-center justify-center text-sm transition-all duration-200",
            // Base Text Color
            !isCurrentMonth && !isSelected && "text-gray-300",
            isCurrentMonth && !isSelected && "text-gray-700",

            // Interaction States
            !isDisabled && !isSelected && "hover:bg-gray-100 active:scale-95",

            // Selected State
            isSelected
              ? "bg-primary text-white font-bold shadow-md transform scale-105"
              : "",

            // Today State
            isToday &&
              !isSelected &&
              "border-2 border-primary text-primary font-bold",

            // Disabled State
            isDisabled &&
              "text-gray-200 cursor-not-allowed hover:bg-transparent active:scale-100",
          )}>
          {day.dayNumber}
        </button>
      </div>
    );
  };

  return (
    <div className={className}>
      <Input
        {...inputProps}
        label={label}
        placeholder={placeholder}
        value={internalValue ? formatDate(internalValue) : ""}
        readOnly
        onClick={handleInputClick}
        disabled={disabled}
        endAdornment={
          <div
            onClick={handleInputClick}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
          </div>
        }
        containerClassName="cursor-pointer"
      />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        height="auto"
        showHandle>
        <div className="px-5 pb-8 pt-2">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="text"
              onClick={handlePrevMonth}
              className="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200 min-w-0 h-auto text-gray-600"
              aria-label="Previous month">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>

            <Text
              variant="h6"
              className="text-xl font-bold text-gray-900 w-40 text-center">
              {viewDate.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </Text>

            <Button
              variant="text"
              onClick={handleNextMonth}
              className="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200 min-w-0 h-auto text-gray-600"
              aria-label="Next month">
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
          </div>

          {/* Calendar */}
          <div className="mb-2">
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {weekDays.map((d) => (
                <Text
                  key={d}
                  variant="caption"
                  className="font-semibold text-gray-400 text-sm">
                  {d}
                </Text>
              ))}
            </div>
            {/* Fixed Height Grid Container to prevent jumping */}
            <div className="grid grid-cols-7 gap-1 text-center min-h-75">
              {calendarDays.map((day, index) => renderDay(day, index))}
            </div>
          </div>

          <div className="mt-2 pt-4 border-t border-gray-100 flex justify-end">
            <Button
              variant="text"
              onClick={() => setIsOpen(false)}
              className="px-6 font-medium text-primary hover:bg-primary-50">
              Close
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
