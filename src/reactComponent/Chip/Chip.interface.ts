import { HTMLAttributes, ReactNode } from "react";

/**
 * Props for the Chip component.
 */
export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The text label to display within the chip.
   */
  label: string;
  /**
   * The visual variant of the chip.
   * - "filled": A chip with a solid background color.
   * - "outlined": A chip with a border and transparent background.
   * @default "filled"
   */
  variant?: "filled" | "outlined";
  /**
   * The color of the chip.
   * @default "default"
   */
  color?:
    | "primary"
    | "secondary"
    | "ternary"
    | "success"
    | "warning"
    | "error"
    | "default";
  /**
   * The size of the chip.
   * @default "medium"
   */
  size?: "small" | "medium";
  /**
   * If true, the chip will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional icon to display within the chip.
   */
  icon?: ReactNode;
  /**
   * Callback function triggered when the delete icon is clicked.
   * If provided, a delete icon will be shown.
   */
  onDelete?: () => void;
  /**
   * Callback function triggered when the chip is clicked.
   */
  onClick?: () => void;
}
