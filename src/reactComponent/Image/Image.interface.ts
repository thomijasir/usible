import { ImgHTMLAttributes } from "react";

/**
 * Props for the Image component.
 */
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The source URL for a fallback image to display if the primary image fails to load.
   */
  fallbackSrc?: string;
}
