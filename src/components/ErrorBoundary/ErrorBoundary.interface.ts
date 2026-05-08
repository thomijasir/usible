import type { JSX } from "solid-js";

/**
 * Props for the `ErrorBoundary` component.
 */
export interface ErrorBoundaryProps {
  /** Child tree wrapped by the boundary. */
  children: JSX.Element;
}
