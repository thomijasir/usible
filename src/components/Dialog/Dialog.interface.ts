import type { JSX } from "solid-js";

/**
 * Dialog component props for modal dialogs
 *
 * @example
 * ```tsx
 * <Dialog
 *   isOpen={isOpen()}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   actions={<Button onClick={handleConfirm}>Confirm</Button>}
 * >
 *   Are you sure you want to proceed?
 * </Dialog>
 * ```
 */
export interface DialogProps {
  /** Controls dialog visibility */
  isOpen: boolean;
  /** Called when dialog should close (backdrop click, escape key, etc.) */
  onClose: () => void;
  /** Dialog title, can be string or JSX element */
  title?: JSX.Element | string;
  /** Dialog body content */
  children?: JSX.Element | string;
  /** Action buttons displayed at the bottom of the dialog */
  actions?: JSX.Element;
  /** If true, clicking outside the dialog closes it */
  dismissible?: boolean;
  /** Additional CSS classes */
  class?: string;
}
