/**
 * TextArea size variants
 */
export type TextAreaSize = "small" | "medium" | "large";

/**
 * TextArea component props for multi-line text input
 *
 * @example
 * ```tsx
 * <TextArea
 *   value={description()}
 *   onInput={setDescription}
 *   label="Description"
 *   placeholder="Enter a description..."
 *   rows={4}
 * />
 * ```
 */
export interface TextAreaProps {
  /** Current text area value */
  value?: string;
  /** Called on each input change with the new value */
  onInput?: (value: string) => void;
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message to display, or boolean to show error state */
  error?: string | boolean;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** If true, textarea takes full width of container */
  fullWidth?: boolean;
  /** Size variant of the textarea */
  size?: TextAreaSize;
  /** If true, textarea is non-interactive */
  disabled?: boolean;
  /** Placeholder text shown when textarea is empty */
  placeholder?: string;
  /** Number of visible text rows */
  rows?: number;
  /** HTML id attribute for label association */
  id?: string;
  /** Additional CSS classes */
  class?: string;
}
