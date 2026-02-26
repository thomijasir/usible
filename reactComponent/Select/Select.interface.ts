import { SelectHTMLAttributes } from "react";

/**
 * Represents an option within the Select component.
 */
export interface SelectOption {
  /**
   * The human-readable label for the select option.
   */
  label: string;
  /**
   * The value associated with the select option.
   */
  value: string | number;
}

/**
 * Props for the Select component.
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The label for the select input.
   */
  label?: string;
  /**
   * If true, the select will be in an error state. Can also be a string for an error message.
   * @default false
   */
  error?: string | boolean;
  /**
   * Helper text displayed below the select input.
   */
  helperText?: string;
  /**
   * An array of SelectOption objects to display in the dropdown.
   */
  options?: SelectOption[];
  /**
   * If true, the select will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Additional CSS class name for the select's container.
   */
  containerClassName?: string;
}
