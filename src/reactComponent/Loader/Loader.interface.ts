import { HTMLAttributes } from "react";

/**
 * Props for the Loader component.
 */
export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the loader.
   * - "small": A small loader.
   * - "medium": A medium-sized loader.
   * - "large": A large loader.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Color variant of the loader.
   * - "primary": Uses the primary theme color.
   * - "secondary": Uses the secondary theme color.
   * - "white": A white loader.
   * - "current": Inherits the current text color.
   * @default "primary"
   */
  color?: "primary" | "secondary" | "white" | "current";
}
