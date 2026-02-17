import { ReactNode } from "react";

/**
 * Props for a single item in the Timeline component.
 */
export interface TimelineItemProps {
  /**
   * The main title or heading for the timeline item.
   */
  title: string;
  /**
   * An optional description or sub-text for the timeline item.
   */
  description?: string;
  /**
   * An optional date string to display for the timeline item.
   */
  date?: string;
  /**
   * The status of the timeline item.
   * - "completed": Indicates the item is finished.
   * - "pending": Indicates the item is awaiting completion.
   * - "failed": Indicates the item has failed.
   * @default "pending"
   */
  status?: "completed" | "pending" | "failed";
  /**
   * An optional icon to display next to the timeline item.
   */
  icon?: ReactNode;
}

/**
 * Props for the Timeline component.
 */
export interface TimelineProps {
  /**
   * An array of TimelineItemProps objects to display in the timeline.
   */
  items: TimelineItemProps[];
  /**
   * Additional CSS class name for the timeline container.
   */
  className?: string;
  /**
   * The visual variant of the timeline.
   * - "default": A standard timeline with default styling.
   * - "numbered": A timeline where each item is numbered.
   * @default "default"
   */
  variant?: "default" | "numbered";
}
