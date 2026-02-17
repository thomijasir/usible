import { ReactNode } from "react";

/**
 * Represents an individual item in the Accordion component.
 */
export interface AccordionItem {
  /**
   * A unique identifier for the accordion item.
   */
  id: string | number;
  /**
   * The title or header of the accordion item.
   */
  title: ReactNode;
  /**
   * The content to be displayed when the accordion item is expanded.
   */
  content: ReactNode;
  /**
   * If true, the accordion item will be disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props for the Accordion component.
 */
export interface AccordionProps {
  /**
   * An array of AccordionItem objects to display in the accordion.
   */
  items: AccordionItem[];
  /**
   * The id of the item that should be expanded by default.
   */
  defaultExpandedId?: string | number;
  /**
   * Whether multiple items can be expanded at the same time.
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Additional CSS class name for the Accordion container.
   */
  className?: string;
}
