import { HTMLAttributes, ReactNode } from "react";

/**
 * Props for the Card component.
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the card.
   */
  children: ReactNode;
  /**
   * The visual variant of the card.
   * - "elevated": A card with a shadow, indicating it's raised.
   * - "outlined": A card with a border, typically without a shadow.
   * - "filled": A card with a solid background color.
   * @default "elevated"
   */
  variant?: "elevated" | "outlined" | "filled";
  /**
   * Callback function triggered when the card is clicked.
   */
  onClick?: () => void;
}
