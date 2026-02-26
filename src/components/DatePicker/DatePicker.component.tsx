import { createSignal, createMemo, createEffect, on, For } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { DatePickerProps } from "./DatePicker.interface";
import { Input } from "../Input";
import { Drawer } from "../Drawer";
import { Text } from "../Text";
import { Button } from "../Button";
import {
  daysInMonth,
  getFirstDayOfMonth,
  isSameDate,
  isDateDisabled,
  formatDate,
  addMonths,
} from "~/utils/date";
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

export function DatePicker(props: DatePickerProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [internalValue, setInternalValue] = createSignal<Date | null>(
    props.value || null,
  );
  const [viewDate, setViewDate] = createSignal<Date>(props.value || new Date());

  createEffect(
    on(
      () => props.value,
      (value) => {
        if (value !== undefined) {
          setInternalValue(value);
          if (value) {
            setViewDate(value);
          }
        }
      },
    ),
  );

  const handleInputClick = () => {
    if (!props.disabled) {
      setIsOpen(true);
      setViewDate(internalValue() || new Date());
    }
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => addMonths(prev, 1));
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date, props.minDate, props.maxDate)) {
      return;
    }

    setInternalValue(date);
    props.onChange?.(date);
    setIsOpen(false);
  };

  const calendarDays = createMemo<CalendarDay[]>(() => {
    const current = viewDate();
    const year = current.getFullYear();
    const month = current.getMonth();

    const days: CalendarDay[] = [];

    const firstDayOfWeek = getFirstDayOfMonth(current);
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDate - i),
        isCurrentMonth: false,
        dayNumber: prevMonthLastDate - i,
      });
    }

    const totalDays = daysInMonth(current);
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        dayNumber: i,
      });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        dayNumber: i,
      });
    }

    return days;
  });

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const renderDay = (day: CalendarDay) => {
    const isSelected = isSameDate(day.date, internalValue());
    const isToday = isSameDate(day.date, new Date());
    const isDisabled = isDateDisabled(day.date, props.minDate, props.maxDate);
    const isCurrentMonth = day.isCurrentMonth;

    return (
      <div class="aspect-square p-0.5">
        <button
          type="button"
          onClick={() => handleDayClick(day.date)}
          disabled={isDisabled}
          class={twMerge(
            "w-full h-full rounded-full flex items-center justify-center text-sm transition-all duration-200",
            !isCurrentMonth && !isSelected && "text-gray-300",
            isCurrentMonth && !isSelected && "text-gray-700",
            !isDisabled && !isSelected && "hover:bg-gray-100 active:scale-95",
            isSelected
              ? "bg-primary text-white font-bold shadow-md transform scale-105"
              : "",
            isToday &&
              !isSelected &&
              "border-2 border-primary text-primary font-bold",
            isDisabled &&
              "text-gray-200 cursor-not-allowed hover:bg-transparent active:scale-100",
          )}>
          {day.dayNumber}
        </button>
      </div>
    );
  };

  const displayValue = () => {
    const value = internalValue();
    return value ? formatDate(value) : "";
  };

  const monthYearDisplay = () => {
    const current = viewDate();
    return current.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div class={props.class}>
      <Input
        label={props.label}
        placeholder={props.placeholder ?? "Select Date"}
        value={displayValue()}
        disabled={props.disabled}
        onClick={handleInputClick}
        endAdornment={
          <div
            onClick={handleInputClick}
            class="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
            <CalendarIcon class="w-5 h-5 text-gray-500" />
          </div>
        }
        containerClass="cursor-pointer"
      />

      <Drawer
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        height="auto"
        showHandle>
        <div
          class="px-5 pb-8 pt-2 max-w-sm mx-auto w-full"
          onPointerDown={(e) => e.stopPropagation()}>
          <div class="flex items-center justify-between mb-4">
            <Button
              variant="text"
              onClick={handlePrevMonth}
              class="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200 min-w-0 h-auto text-gray-600"
              aria-label="Previous month">
              <ChevronLeftIcon class="w-6 h-6" />
            </Button>

            <Text
              variant="h6"
              class="text-xl font-bold text-gray-900 w-40 text-center">
              {monthYearDisplay()}
            </Text>

            <Button
              variant="text"
              onClick={handleNextMonth}
              class="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200 min-w-0 h-auto text-gray-600"
              aria-label="Next month">
              <ChevronRightIcon class="w-6 h-6" />
            </Button>
          </div>

          <div class="mb-2">
            <div class="grid grid-cols-7 gap-1 mb-2 text-center">
              <For each={weekDays}>
                {(d) => (
                  <Text
                    variant="caption"
                    class="font-semibold text-gray-400 text-sm">
                    {d}
                  </Text>
                )}
              </For>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center">
              <For each={calendarDays()}>{(day) => renderDay(day)}</For>
            </div>
          </div>

          <div class="mt-2 pt-4 border-t border-gray-100 flex justify-end">
            <Button
              variant="text"
              onClick={() => setIsOpen(false)}
              class="px-6 font-medium text-primary hover:bg-primary-50">
              Close
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
