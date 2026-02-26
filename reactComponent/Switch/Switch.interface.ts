import { InputHTMLAttributes } from "react";

/**
 * Props for the Switch component.
 */
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  /**
   * If true, the switch is in the checked state.
   */
  checked?: boolean;
  /**
   * Callback function triggered when the switch's checked state changes.
   * @param checked The new checked state (true or false).
   */
  onChange?: (checked: boolean) => void;
  /**
   * The label to display next to the switch.
   */
  label?: string;
}
