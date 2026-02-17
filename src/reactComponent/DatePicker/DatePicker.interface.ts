import { InputProps } from "../Input/Input.interface";

/**
 * Props for the DatePicker component.
 */
export interface DatePickerProps extends Omit<
  InputProps,
  "value" | "onChange" | "defaultValue" | "min" | "max"
> {
  /**
   * The currently selected date.
   */
  value?: Date | null;
  /**
   * Callback function triggered when a new date is selected.
   * @param date The selected Date object.
   */
  onChange?: (date: Date) => void;
  /**
   * The minimum selectable date. Dates before this will be disabled.
   */
  minDate?: Date;
  /**
   * The maximum selectable date. Dates after this will be disabled.
   */
  maxDate?: Date;
  /**
   * Format for the date display.
   * This is a simple implementation; currently, it adheres to a standard display format.
   * The prop exists for future extension to support custom formats.
   */
  format?: string;
}
