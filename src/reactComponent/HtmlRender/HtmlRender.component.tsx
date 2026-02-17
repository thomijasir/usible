import React from "react";
import type { HtmlRenderProps } from "./HtmlRender.interface";
import DOMPurify from "dompurify";

const renderSafeHTML = (htmlContent: string) => {
  const cleanHTML = DOMPurify.sanitize(htmlContent);
  return cleanHTML;
};

export const HtmlRender: React.FC<HtmlRenderProps> = ({ html }) => {
  return (
    <div
      className="render-content"
      dangerouslySetInnerHTML={{ __html: renderSafeHTML(html) }}
    />
  );
};
