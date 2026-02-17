import type { JSX } from "solid-js";

/**
 * Checkbox size variants
 */
export type CheckboxSize = "small" | "medium" | "large";

/**
 * Checkbox component props for form checkboxes
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked()}
 *   onChange={setIsChecked}
 *   label="I agree to the terms"
 * />
 * ```
 */
export interface CheckboxProps {
  /** Current checked state */
  checked?: boolean;
  /** Called when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Label text or element displayed next to checkbox */
  label?: JSX.Element | string;
  /** Error state, can be boolean or error message string */
  error?: boolean | string;
  /** If true, checkbox is non-interactive */
  disabled?: boolean;
  /** Size variant of the checkbox */
  size?: CheckboxSize;
  /** HTML id attribute for label association */
  id?: string;
  /** Additional CSS classes for the checkbox element */
  class?: string;
  /** Additional CSS classes for the container element */
  containerClass?: string;
}
