import type { InputProps } from "../Input";

/**
 * DatePicker component props for date selection
 *
 * Extends InputProps but uses Date type for value/onChange.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={selectedDate()}
 *   onChange={setSelectedDate}
 *   label="Birth Date"
 *   minDate={new Date('1900-01-01')}
 *   maxDate={new Date()}
 * />
 * ```
 */
export interface DatePickerProps extends Omit<
  InputProps,
  "value" | "onChange" | "onInput"
> {
  /** Currently selected date */
  value?: Date | null;
  /** Called when a date is selected */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Date display format (default: locale format) */
  format?: string;
}
