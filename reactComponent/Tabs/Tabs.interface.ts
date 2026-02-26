import { ReactNode } from "react";

/**
 * Props for a single Tab component.
 */
export interface TabProps {
  /**
   * The label displayed on the tab.
   */
  label: string;
  /**
   * The unique value associated with the tab.
   */
  value: string | number;
  /**
   * Optional icon to display next to the label.
   */
  icon?: ReactNode;
  /**
   * If true, the tab will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The content to be rendered when this tab is active.
   */
  children: ReactNode;
}

/**
 * Props for the Tabs container component.
 */
export interface TabsProps {
  /**
   * The Tab components to be rendered within the Tabs container.
   */
  children: ReactNode;
  /**
   * The currently active tab's value.
   */
  value?: string | number;
  /**
   * The initial active tab's value when the component is uncontrolled.
   */
  defaultValue?: string | number;
  /**
   * Callback function triggered when the active tab changes.
   */
  onChange?: (value: string | number) => void;
  /**
   * The visual variant of the tabs.
   * @default "standard"
   */
  variant?: "standard" | "filled" | "block";
  /**
   * The orientation of the tabs.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Additional CSS class name for the Tabs container.
   */
  className?: string;
  /**
   * If true, the tabs will be centered.
   * @default false
   */
  centered?: boolean;
}
