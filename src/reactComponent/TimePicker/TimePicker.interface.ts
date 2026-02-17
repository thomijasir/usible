import { InputProps } from "../Input/Input.interface";

/**
 * Props for the TimePicker component.
 */
export interface TimePickerProps extends Omit<
  InputProps,
  "value" | "onChange" | "defaultValue"
> {
  /**
   * The selected time.
   */
  value?: Date | null;
  /**
   * Callback when a new time is selected.
   * @param date The selected date object.
   */
  onChange?: (date: Date) => void;
  /**
   * Format of the time picker.
   * @default "12h"
   */
  format?: "12h" | "24h";
}
