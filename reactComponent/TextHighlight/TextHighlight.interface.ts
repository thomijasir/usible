import { ReactNode } from "react";
import type { TextColor } from "../Text/Text.interface";

/**
 * Props for the TextHighlight component.
 */
export interface TextHighlightProps {
  /**
   * The content (text or ReactNode) where highlighting should occur.
   */
  children: ReactNode;
  /**
   * The substring to highlight within the children content.
   * If not provided, no highlighting will be applied.
   */
  highlight?: string;
  /**
   * The color of the highlighted text.
   * This should correspond to a TextColor type defined in Text.interface.ts.
   * @default "primary"
   */
  color?: TextColor;
}
