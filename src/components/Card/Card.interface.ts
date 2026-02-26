import type { JSX } from "solid-js";

export type CardVariant = "elevated" | "outlined" | "filled";

export interface CardProps {
  children: JSX.Element;
  variant?: CardVariant;
  onClick?: () => void;
  class?: string;
}
