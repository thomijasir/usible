import type { JSX } from "solid-js";

/**
 * Accordion item data structure
 */
export interface AccordionItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Title text or element (always visible) */
  title: JSX.Element | string;
  /** Content to show when expanded */
  content: JSX.Element | string;
  /** If true, item cannot be expanded */
  disabled?: boolean;
}

/**
 * Accordion component props for collapsible content sections
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: 1, title: "FAQ 1", content: "Answer 1..." },
 *     { id: 2, title: "FAQ 2", content: "Answer 2..." },
 *   ]}
 *   defaultExpandedId={1}
 * />
 * ```
 */
export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** ID of item to expand by default */
  defaultExpandedId?: string | number;
  /** If true, multiple items can be expanded simultaneously */
  allowMultiple?: boolean;
  /** Additional CSS classes */
  class?: string;
}
