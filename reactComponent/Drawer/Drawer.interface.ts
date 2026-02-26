/**
 * Props for the Drawer component.
 */
export interface DrawerProps {
  /**
   * If true, the drawer is open.
   */
  isOpen: boolean;
  /**
   * Callback function to close the drawer.
   */
  onClose: () => void;
  /**
   * The content to be rendered inside the drawer.
   */
  children?: React.ReactNode;
  /**
   * The height of the drawer.
   */
  height?: string | number;
  /**
   * If true, a handle will be displayed at the top of the drawer to indicate it's draggable.
   * @default false
   */
  showHandle?: boolean;
}
