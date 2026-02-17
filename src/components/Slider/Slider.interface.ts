/**
 * Slider color options from design system
 */
export type SliderColor =
  | "primary"
  | "secondary"
  | "ternary"
  | "success"
  | "warning"
  | "error";

/**
 * Slider component props for range inputs
 *
 * @example
 * ```tsx
 * <Slider
 *   value={volume()}
 *   onChange={setVolume}
 *   min={0}
 *   max={100}
 *   label="Volume"
 *   showValue
 * />
 * ```
 */
export interface SliderProps {
  /** Current slider value */
  value: number;
  /** Called when slider value changes */
  onChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment for value changes */
  step?: number;
  /** Label text displayed above the slider */
  label?: string;
  /** If true, displays current value next to label */
  showValue?: boolean;
  /** If true, slider is non-interactive */
  disabled?: boolean;
  /** Color theme from design system */
  color?: SliderColor;
  /** HTML id attribute for the input element */
  id?: string;
  /** Additional CSS classes */
  class?: string;
}
