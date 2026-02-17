/**
 * Select option data structure
 */
export interface SelectOption {
  /** Display text for the option */
  label: string;
  /** Value returned when option is selected */
  value: string | number;
}

/**
 * Select component props for dropdown selections
 *
 * @example
 * ```tsx
 * <Select
 *   value={selectedValue()}
 *   onChange={setSelectedValue}
 *   label="Country"
 *   options={[
 *     { label: "United States", value: "us" },
 *     { label: "Canada", value: "ca" },
 *   ]}
 * />
 * ```
 */
export interface SelectProps {
  /** Currently selected value */
  value?: string | number;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Label text displayed above the select */
  label?: string;
  /** Error message to display, or boolean to show error state */
  error?: string | boolean;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Array of options to display */
  options?: SelectOption[];
  /** If true, select takes full width of container */
  fullWidth?: boolean;
  /** If true, select is non-interactive */
  disabled?: boolean;
  /** Placeholder text shown when no option is selected */
  placeholder?: string;
  /** HTML id attribute for label association */
  id?: string;
  /** Additional CSS classes for the select element */
  class?: string;
  /** Additional CSS classes for the container element */
  containerClass?: string;
}
