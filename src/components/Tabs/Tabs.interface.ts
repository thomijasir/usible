import type { JSX } from "solid-js";

/**
 * Describes a single tab item and its panel content.
 */
export interface TabItem {
  /** Label text rendered in the tab trigger. */
  label: string;
  /** Unique tab value used for selection state. */
  value: string | number;
  /** Optional icon rendered with the tab label. */
  icon?: JSX.Element;
  /** Disables selection for this tab. */
  disabled?: boolean;
  /** Marks this tab active when uncontrolled state is used. */
  active?: boolean;
  /** Content rendered when the tab is active. */
  content: JSX.Element;
}

/**
 * Props for the `Tabs` component.
 */
export interface TabsProps {
  /** List of tab definitions. */
  tabs: TabItem[];
  /** Controlled active tab value. */
  value?: string | number;
  /** Initial active tab value for uncontrolled usage. */
  defaultValue?: string | number;
  /** Called when the active tab changes. */
  onChange?: (value: string | number) => void;
  /** Visual style variant for the tab list. */
  variant?: "standard" | "filled" | "block";
  /** Layout direction of tabs and panels. */
  orientation?: "horizontal" | "vertical";
  /** Additional class names for the root element. */
  class?: string;
  /** Centers tab triggers inside the tab list. */
  centered?: boolean;
}
