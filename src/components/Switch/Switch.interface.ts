import type { JSX } from "solid-js";

/**
 * Switch component props for toggle switches
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={isEnabled()}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 * ```
 */
export interface SwitchProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "checked" | "class"
> {
  /** Current checked state */
  checked?: boolean;
  /** Called when switch state changes */
  onChange?: (checked: boolean) => void;
  /** If true, switch is non-interactive */
  disabled?: boolean;
  /** Label text or element displayed next to switch */
  label?: JSX.Element | string;
  /** HTML id attribute for label association */
  id?: string;
  /** Additional CSS classes */
  class?: string;
}
