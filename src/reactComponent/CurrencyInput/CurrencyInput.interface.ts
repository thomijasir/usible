import { InputProps } from "../Input";

export interface CurrencyInputProps extends Omit<
  InputProps,
  "onChange" | "value"
> {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  locale?: string;
  /**
   * Number of decimal digits to display.
   * @default 2
   */
  decimalDigits?: number;
  /**
   * Maximum number of integer digits allowed.
   * @default 13
   */
  maxDigits?: number;
}
