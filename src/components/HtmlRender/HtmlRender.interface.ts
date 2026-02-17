/**
 * HtmlRender component props for safely rendering HTML strings
 *
 * Uses DOMPurify to sanitize HTML before rendering.
 *
 * @example
 * ```tsx
 * <HtmlRender html="<p>Safe <strong>HTML</strong> content</p>" />
 * ```
 */
export interface HtmlRenderProps {
  /** HTML string to render (will be sanitized) */
  html: string;
  /** Additional CSS classes */
  class?: string;
}
