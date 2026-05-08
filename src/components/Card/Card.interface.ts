import type { JSX } from "solid-js";

/** Visual style variants for the card container. */
export type CardVariant = "elevated" | "outlined" | "filled";

/**
 * Props for the `Card` component.
 */
export interface CardProps {
  /** Card content. */
  children: JSX.Element;
  /** Visual treatment of the card surface. */
  variant?: CardVariant;
  /** Click handler for interactive cards. */
  onClick?: () => void;
  /** Additional class names for the root element. */
  class?: string;
}
