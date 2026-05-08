import type { JSX } from "solid-js";

/** Radio presentation styles. */
export type RadioVariant = "boxed" | "plain";
/** Position of the radio input relative to label content. */
export type RadioInputPosition = "left" | "right";

/**
 * Props for the `Radio` component.
 */
export interface RadioProps {
  /** Label content displayed next to the radio control. */
  label?: JSX.Element;
  /** Helper description shown below the label. */
  description?: string;
  /** Sets the control to error state. */
  error?: boolean;
  /** Optional leading icon rendered with the label. */
  icon?: JSX.Element;
  /** Disables user interaction. */
  disabled?: boolean;
  /** Optional id for input and label association. */
  id?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Native radio group name. */
  name?: string;
  /** Native form submission value. */
  value?: string;
  /** Radio input placement relative to text content. */
  inputPosition?: RadioInputPosition;
  /** Visual style variant. */
  variant?: RadioVariant;
  /** Called when checked state changes. */
  onChange?: (checked: boolean) => void;
  /** Additional class names for the radio root. */
  class?: string;
  /** Additional class names for the outer container. */
  containerClass?: string;
}
