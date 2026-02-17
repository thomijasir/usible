/**
 * Props for the Slider component.
 */
export interface SliderProps {
  /**
   * The current value of the slider.
   */
  value: number;

  /**
   * Callback function triggered when the slider's value changes.
   * @param value The new value of the slider.
   */
  onChange: (value: number) => void;

  /**
   * The minimum value of the slider.
   * @default 0
   */
  min?: number;

  /**
   * The maximum value of the slider.
   * @default 100
   */
  max?: number;

  /**
   * The step increment for the slider's value.
   * @default 1
   */
  step?: number;

  /**
   * The label displayed above the slider.
   */
  label?: string;

  /**
   * Whether to show the current value next to the label.
   * @default false
   */
  showValue?: boolean;

  /**
   * If true, the slider will be disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The color theme of the slider.
   * @default "primary"
   */
  color?: "primary" | "secondary" | "ternary" | "success" | "warning" | "error";

  /**
   * Additional CSS class names for the slider component.
   */
  className?: string;
}
