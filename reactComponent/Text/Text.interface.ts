import { ReactNode } from "react";

/**
 * Defines the available text variants for the Text component.
 */
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

/**
 * Defines the available text colors for the Text component.
 */
export type TextColor =
  | "primary"
  | "secondary"
  | "ternary"
  | "text"
  | "success"
  | "warning"
  | "error"
  | "white";

/**
 * Props for the Text component.
 */
export interface TextProps {
  /**
   * The content to be rendered as text.
   */
  children: ReactNode;
  /**
   * The semantic variant of the text.
   * This determines the default font size, weight, and line height.
   * @default "body1"
   */
  variant?: TextVariant;
  /**
   * The color of the text.
   * @default "text"
   */
  color?: TextColor;
  /**
   * Additional CSS class name for the text component.
   */
  className?: string;
}
