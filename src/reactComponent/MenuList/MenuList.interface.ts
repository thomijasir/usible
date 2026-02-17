import { ReactNode } from "react";

/**
 * Props for the MenuList component.
 */
export interface MenuListProps {
  /**
   * The MenuItem components to be rendered within the menu list.
   */
  children: ReactNode;
  /**
   * The visual variant of the menu list.
   * - "standard": A standard rectangular menu.
   * - "rounded": A menu with rounded corners.
   * @default "standard"
   */
  variant?: "standard" | "rounded";
  /**
   * Additional CSS class name for the menu list container.
   */
  className?: string;
  /**
   * Optional title to display at the top of the menu list.
   */
  title?: string;
}

/**
 * Props for a single MenuItem component within a MenuList.
 */
export interface MenuItemProps {
  /**
   * The primary text label for the menu item.
   */
  label: string;
  /**
   * Optional secondary text or description for the menu item.
   */
  description?: string;
  /**
   * Optional icon to display on the left side of the menu item.
   */
  leftIcon?: ReactNode;
  /**
   * Optional icon to display on the right side of the menu item.
   */
  rightIcon?: ReactNode;
  /**
   * Callback function triggered when the menu item is clicked.
   */
  onClick?: () => void;
  /**
   * Additional CSS class name for the menu item.
   */
  className?: string;
  /**
   * If true, a chevron icon will be displayed on the right side of the menu item.
   * @default false
   */
  showChevron?: boolean;
  /**
   * If true, this item is the last in a group, and may be used to hide a divider.
   * (Note: CSS `:last-child` is generally preferred for divider control).
   * @default false
   */
  isLast?: boolean;
}
