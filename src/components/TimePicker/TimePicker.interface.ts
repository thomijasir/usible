import type { InputProps } from "../Input";

/**
 * TimePicker component props for time selection
 *
 * Extends InputProps but uses Date type for value/onChange.
 *
 * @example
 * ```tsx
 * <TimePicker
 *   value={selectedTime()}
 *   onChange={setSelectedTime}
 *   label="Appointment Time"
 *   format="12h"
 * />
 * ```
 */
export interface TimePickerProps
  extends Omit<InputProps, "value" | "onChange" | "onInput"> {
  /** Currently selected time as a Date object */
  value?: Date | null;
  /** Called when the user confirms a new time */
  onChange?: (date: Date) => void;
  /**
   * Time format: 12-hour or 24-hour
   * @default "12h"
   */
  format?: "12h" | "24h";
}
