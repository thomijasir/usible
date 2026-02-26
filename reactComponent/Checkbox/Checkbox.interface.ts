import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Size variant for the checkbox component.
 */
export type CheckboxSize = "small" | "medium" | "large";

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /**
   * The label to display next to the checkbox.
   */
  label?: ReactNode;
  /**
   * If true, the checkbox will be in an error state. Can also be a string for an error message.
   * @default false
   */
  error?: boolean | string;
  /**
   * Additional CSS class name for the checkbox's container.
   */
  containerClassName?: string;
  /**
   * Size variant for the checkbox.
   * @default "medium"
   */
  size?: CheckboxSize;
}
