import type { JSX } from "solid-js";

export type RadioVariant = "boxed" | "plain";
export type RadioInputPosition = "left" | "right";

export interface RadioProps {
  label?: JSX.Element;
  description?: string;
  error?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
  id?: string;
  checked?: boolean;
  name?: string;
  value?: string;
  inputPosition?: RadioInputPosition;
  variant?: RadioVariant;
  onChange?: (checked: boolean) => void;
  class?: string;
  containerClass?: string;
}
