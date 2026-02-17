import type { JSX } from "solid-js";

/**
 * Input size variants
 * - `small` - Compact input for forms with limited space
 * - `medium` - Default size
 * - `large` - Larger input for emphasis
 */
export type InputSize = "small" | "medium" | "large";

/**
 * Text case transformation options
 */
export type TextCase = "normal" | "uppercase" | "lowercase";

/**
 * Input component props for text input fields
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   onInput={(value) => console.log(value)}
 * />
 * ```
 */
export interface InputProps {
  /** Current input value */
  value?: string;
  /** Called on each input change with the new value */
  onInput?: (value: string) => void;
  /** Called when input value is committed (blur or enter) */
  onChange?: (value: string) => void;
  /** Called when input loses focus */
  onBlur?: () => void;
  /** Called when input gains focus */
  onFocus?: () => void;
  /** Called on input click */
  onClick?: () => void;
  /** Label text displayed above the input */
  label?: string;
  /** Error message to display, or boolean to show error state */
  error?: string | boolean;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Element to display at the start of the input (e.g., icon, prefix) */
  startAdornment?: JSX.Element;
  /** Element to display at the end of the input (e.g., icon, suffix) */
  endAdornment?: JSX.Element;
  /** If true, input takes full width of container */
  fullWidth?: boolean;
  /** Size variant of the input */
  size?: InputSize;
  /** Text case transformation */
  textCase?: TextCase;
  /** If true, input is non-interactive */
  disabled?: boolean;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** HTML input type attribute */
  type?: string;
  /** HTML id attribute for label association */
  id?: string;
  /** Additional CSS classes for the input element */
  class?: string;
  /** Additional CSS classes for the container element */
  containerClass?: string;
}
