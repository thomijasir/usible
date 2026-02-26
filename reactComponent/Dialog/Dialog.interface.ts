import { ReactNode } from "react";

/**
 * Props for the Dialog component.
 */
export interface DialogProps {
  /**
   * If true, the dialog is open and visible.
   */
  isOpen: boolean;
  /**
   * Callback function to close the dialog.
   */
  onClose: () => void;
  /**
   * The title content of the dialog. Can be a string or a ReactNode.
   */
  title?: ReactNode;
  /**
   * The main content to be rendered inside the dialog.
   */
  children?: ReactNode;
  /**
   * Actions or buttons to display at the bottom of the dialog.
   */
  actions?: ReactNode;
  /**
   * If true, the dialog can be dismissed by clicking outside of it or pressing the Escape key.
   * @default false
   */
  dismissible?: boolean;
  /**
   * Additional CSS class name for the dialog container.
   */
  className?: string;
}
