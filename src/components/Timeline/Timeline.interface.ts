import type { JSX } from "solid-js";

/**
 * Timeline item status
 * - `completed` - Item is done (green)
 * - `pending` - Item is waiting (gray)
 * - `failed` - Item has failed (red)
 */
export type TimelineStatus = "completed" | "pending" | "failed";

/**
 * Individual timeline item data
 */
export interface TimelineItemProps {
  /** Title text for the item */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional date string */
  date?: string;
  /** Status of the item affecting visual style */
  status?: TimelineStatus;
  /** Custom icon to replace default status indicator */
  icon?: JSX.Element;
}

/**
 * Timeline display variant
 * - `default` - Shows status dots or icons
 * - `numbered` - Shows step numbers
 */
export type TimelineVariant = "default" | "numbered";

/**
 * Timeline component props for vertical progress display
 *
 * @example
 * ```tsx
 * <Timeline
 *   items={[
 *     { title: "Order Placed", status: "completed", date: "Feb 14" },
 *     { title: "Shipped", status: "completed", date: "Feb 15" },
 *     { title: "Delivered", status: "pending" },
 *   ]}
 *   variant="default"
 * />
 * ```
 */
export interface TimelineProps {
  /** Array of timeline items to display */
  items: TimelineItemProps[];
  /** Additional CSS classes */
  class?: string;
  /** Display variant */
  variant?: TimelineVariant;
}
