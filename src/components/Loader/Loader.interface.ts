/**
 * Loader size variants
 */
export type LoaderSize = "small" | "medium" | "large";

/**
 * Loader color options
 */
export type LoaderColor = "primary" | "secondary" | "white" | "current";

/**
 * Loader component props for loading spinners
 *
 * @example
 * ```tsx
 * <Loader size="medium" color="primary" />
 * ```
 */
export interface LoaderProps {
  /** Size of the spinner */
  size?: LoaderSize;
  /** Color theme from design system */
  color?: LoaderColor;
  /** Additional CSS classes */
  class?: string;
}
