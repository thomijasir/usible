/**
 * Props for the Backdrop component.
 */
export interface BackdropProps {
  /**
   * If true, the backdrop is visible and covers the entire screen.
   */
  isOpen: boolean;
  /**
   * Callback function triggered when the backdrop is clicked.
   */
  onClick?: () => void;
  /**
   * The opacity level of the backdrop (0 to 1).
   * @default 0.5
   */
  opacity?: number;
}
