import { ReactNode } from "react";

/**
 * Defines the available text colors for the Text component.
 */
export type InfoBoxColor =
  | "primary"
  | "secondary"
  | "ternary"
  | "text"
  | "success"
  | "warning"
  | "error";

export interface InfoBoxProps {
  color?: InfoBoxColor; // Default is primary
  leftIcon?: ReactNode;
  title?: string;
  description: string;
  className?: string;
}
