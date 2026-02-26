export interface TextAreaProps {
  /**
   * Label for the input.
   */
  label?: string;
  /**
   * Error state or message to display below the input.
   */
  error?: string | boolean;
  /**
   * Helper text displayed below the input.
   */
  helperText?: string;
  /**
   * If true, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Size of the input.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
}
