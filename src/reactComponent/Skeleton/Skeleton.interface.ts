import { HTMLAttributes } from "react";

/**
 * Props for the Skeleton component.
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The type of content that will be rendered.
   * - "text": Renders a line of text as a placeholder.
   * - "rectangular": Renders a rectangular block as a placeholder.
   * - "circular": Renders a circular block as a placeholder.
   * @default "text"
   */
  variant?: "text" | "rectangular" | "circular";
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element or needs a specific width.
   */
  width?: string | number;
  /**
   * Height of the skeleton.
   * Useful when you want to adapt the skeleton to a text element or need a specific height.
   */
  height?: string | number;
  /**
   * The animation effect to apply to the skeleton.
   * If `false` the animation effect is disabled.
   * - "pulse": A subtle fading in and out animation.
   * - "none": No animation.
   * @default "pulse"
   */
  animation?: "pulse" | "none";
}
