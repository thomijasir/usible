import type { JSX } from "solid-js";

/**
 * MenuList display variant
 * - `standard` - Full width with top and bottom borders
 * - `rounded` - Rounded corners with shadow and side margins
 */
export type MenuListVariant = "standard" | "rounded";

/**
 * MenuList component props for grouped menu items
 *
 * @example
 * ```tsx
 * <MenuList title="Settings" variant="rounded">
 *   <MenuItem label="Account" onClick={() => {}} />
 *   <MenuItem label="Privacy" onClick={() => {}} />
 * </MenuList>
 * ```
 */
export interface MenuListProps {
  /** Menu items as children */
  children: JSX.Element;
  /** Visual style variant */
  variant?: MenuListVariant;
  /** Additional CSS classes */
  class?: string;
  /** Optional title displayed above the menu */
  title?: string;
}

/**
 * MenuItem component props for individual menu entries
 *
 * @example
 * ```tsx
 * <MenuItem
 *   label="Account Settings"
 *   description="Manage your account"
 *   leftIcon={<SettingsIcon />}
 *   onClick={() => navigate('/settings')}
 * />
 * ```
 */
export interface MenuItemProps {
  /** Primary label text */
  label: string;
  /** Secondary description text */
  description?: string;
  /** Icon displayed before the label */
  leftIcon?: JSX.Element;
  /** Icon displayed after the label (replaces chevron) */
  rightIcon?: JSX.Element;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  class?: string;
  /** If true, shows chevron icon (default: true) */
  showChevron?: boolean;
  /** Internal: used to identify last item */
  isLast?: boolean;
}
