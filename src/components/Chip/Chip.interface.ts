import type { JSX } from "solid-js";

/**
 * Chip visual style variants
 * - `filled` - Solid background color
 * - `outlined` - Transparent with border
 */
export type ChipVariant = "filled" | "outlined";

/**
 * Chip color options from design system
 */
export type ChipColor =
  | "primary"
  | "secondary"
  | "ternary"
  | "success"
  | "warning"
  | "error"
  | "default";

/**
 * Chip size variants
 */
export type ChipSize = "small" | "medium";

/**
 * Chip component props for tags, badges, and filters
 *
 * @example
 * ```tsx
 * <Chip
 *   label="React"
 *   variant="filled"
 *   color="primary"
 *   onDelete={() => handleRemove("React")}
 * />
 * ```
 */
export interface ChipProps {
  /** Chip display text */
  label: string;
  /** Visual style variant */
  variant?: ChipVariant;
  /** Color theme from design system */
  color?: ChipColor;
  /** Size variant of the chip */
  size?: ChipSize;
  /** If true, chip appears non-interactive */
  disabled?: boolean;
  /** Icon displayed before the label */
  icon?: JSX.Element;
  /** Called when delete button is clicked */
  onDelete?: () => void;
  /** Called when chip is clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  class?: string;
}
