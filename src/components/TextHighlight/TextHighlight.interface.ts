import type { TextColor } from "../Text/Text.interface";

/**
 * TextHighlight component props for highlighting text matches
 *
 * @example
 * ```tsx
 * <TextHighlight highlight="world" color="primary">
 *   Hello world, welcome to the world!
 * </TextHighlight>
 * ```
 */
export interface TextHighlightProps {
  /** Text content to search within */
  children: string;
  /** Text to highlight (case-insensitive match) */
  highlight?: string;
  /** Color for highlighted text */
  color?: TextColor;
}
