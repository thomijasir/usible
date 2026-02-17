import DOMPurify from "dompurify";
import type { HtmlRenderProps } from "./HtmlRender.interface";

export function HtmlRender(props: HtmlRenderProps) {
  const sanitizedHtml = () => DOMPurify.sanitize(props.html);

  return <div class={props.class} innerHTML={sanitizedHtml()} />;
}
