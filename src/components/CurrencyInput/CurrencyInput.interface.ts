import type { InputProps } from "../Input";

/**
 * CurrencyInput component props for formatted currency entry
 *
 * Extends InputProps but replaces value/onChange with numeric types.
 *
 * @example
 * ```tsx
 * <CurrencyInput
 *   value={amount()}
 *   onChange={setAmount}
 *   currency="USD"
 *   label="Amount"
 *   decimalDigits={2}
 * />
 * ```
 */
export interface CurrencyInputProps extends Omit<
  InputProps,
  "onChange" | "value" | "onInput"
> {
  /** Current numeric value */
  value: number;
  /** Called when value changes with numeric value */
  onChange: (value: number) => void;
  /** Currency code (USD, EUR, SGD, etc.) - determines symbol display */
  currency?: string;
  /** Locale for number formatting (default: 'en-US') */
  locale?: string;
  /** Number of decimal places (default: 2) */
  decimalDigits?: number;
  /** Maximum integer digits before decimal (default: 13) */
  maxDigits?: number;
}
