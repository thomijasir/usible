import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the Input component.
 */
export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /**
   * Label for the input.
   */
  label?: string;
  /**
   * Error state or message to display below the input.
   */
  error?: string | boolean;
  /**
   * Helper text displayed below the input.
   */
  helperText?: string;
  /**
   * Element to display at the start of the input (e.g., icon, prefix).
   */
  startAdornment?: ReactNode;
  /**
   * Element to display at the end of the input (e.g., icon, suffix).
   */
  endAdornment?: ReactNode;
  /**
   * If true, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Size of the input.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Additional CSS classes for the input's container.
   */
  containerClassName?: string;
  /**
   * Text Case, add case to text when user input
   */
  textCase?: "normal" | "uppercase" | "lowercase";
}
