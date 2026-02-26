import type { JSX } from "solid-js";

/**
 * Drawer component props for bottom sheet drawers
 *
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={isOpen()}
 *   onClose={() => setIsOpen(false)}
 *   height="auto"
 *   showHandle
 * >
 *   Drawer content here
 * </Drawer>
 * ```
 */
export interface DrawerProps {
  /** Controls drawer visibility */
  isOpen: boolean;
  /** Called when drawer should close (drag down, backdrop click, escape key) */
  onClose: () => void;
  /** Drawer content */
  children?: JSX.Element;
  /** Height of the drawer - number (pixels) or string (e.g., 'auto', '50%') */
  height?: string | number;
  /** If true, shows drag handle at the top */
  showHandle?: boolean;
  /** ID of the element that labels the drawer */
  ariaLabelledBy?: string;
  /** If true, disables drag-to-close gesture (useful when content has scrollable areas) */
  disableDrag?: boolean;
}
