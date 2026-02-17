import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import type { TextColor } from "../Text/Text.interface";
import type { TextHighlightProps } from "./TextHighlight.interface";

const colorClasses: Record<TextColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  ternary: "text-ternary",
  text: "text-gray-900", // Default text color
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  white: "text-white",
};

export const TextHighlight: React.FC<TextHighlightProps> = ({
  highlight,
  children,
  color,
}) => {
  if (!highlight) {
    return <>{children}</>;
  }

  const highlightText = (text: string): ReactNode => {
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span
          key={index}
          className={twMerge("font-bold", color ? colorClasses[color] : "")}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const processChildren = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return highlightText(node);
    }

    if (isValidElement(node)) {
      const { children: nodeChildren, ...props } = node.props as {
        children?: ReactNode;
      };

      if (typeof nodeChildren === "string") {
        return cloneElement(
          node,
          props as Record<string, unknown>,
          highlightText(nodeChildren),
        );
      }

      if (nodeChildren) {
        return cloneElement(
          node,
          props as Record<string, unknown>,
          Children.map(nodeChildren, processChildren),
        );
      }
    }

    return node;
  };

  return <>{Children.map(children, processChildren)}</>;
};
