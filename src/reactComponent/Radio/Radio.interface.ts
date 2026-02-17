import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the Radio component.
 */
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The label for the radio input.
   */
  label?: ReactNode;
  /**
   * A description displayed below the label.
   */
  description?: string;
  /**
   * If true, the radio will be in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Additional CSS class name for the radio's container.
   */
  containerClassName?: string;
  /**
   * Icon to display alongside the radio.
   */
  icon?: ReactNode;
  /**
   * Position of the radio input relative to the content.
   * @default "right"
   */
  inputPosition?: "left" | "right";
  /**
   * Visual variant of the radio component.
   * @default "boxed"
   */
  variant?: "boxed" | "plain";
}
