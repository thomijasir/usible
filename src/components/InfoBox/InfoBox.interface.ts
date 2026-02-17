import type { JSX } from "solid-js";

/**
 * InfoBox color options from design system
 */
export type InfoBoxColor =
  | "primary"
  | "secondary"
  | "ternary"
  | "text"
  | "success"
  | "warning"
  | "error";

/**
 * InfoBox component props for alert/notification boxes
 *
 * @example
 * ```tsx
 * <InfoBox
 *   color="success"
 *   title="Success!"
 *   description="Your changes have been saved."
 *   leftIcon={<CheckIcon />}
 * />
 * ```
 */
export interface InfoBoxProps {
  /** Color theme from design system */
  color?: InfoBoxColor;
  /** Icon displayed at the start of the box */
  leftIcon?: JSX.Element;
  /** Title text displayed prominently */
  title?: string;
  /** Description text displayed below the title */
  description: string;
  /** Additional CSS classes */
  class?: string;
}
