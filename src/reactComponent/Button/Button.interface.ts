/**
 * Props for the Button component.
 */
export interface ButtonProps {
  /**
   * The content to be rendered inside the button.
   */
  children: React.ReactNode;
  /**
   * If true, the button will take up the full width of its container.
   * @default false
   */
  block?: boolean;
  /**
   * Callback function triggered when the button is clicked.
   */
  onClick?: () => void;
  /**
   * The visual variant of the button.
   * - "outlined": A button with a border.
   * - "filled": A button with a solid background color.
   * - "text": A button with minimal styling, appearing like plain text.
   * - "icon": A button designed to contain only an icon.
   * - "iconOutline": A circular button with a border, designed to contain only an icon.
   * @default "filled"
   */
  variant?: "outlined" | "filled" | "text" | "icon" | "iconOutline";
  /**
   * The color of the button.
   * @default "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "ternary"
    | "success"
    | "warning"
    | "error"
    | "transparent";
  /**
   * The size of the button.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * If true, the button will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, a loading indicator will be shown inside the button.
   * @default false
   */
  loading?: boolean;
  /**
   * Additional CSS class name for the button.
   */
  className?: string;
}
