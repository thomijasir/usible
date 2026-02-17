import { twMerge } from "tailwind-merge";
import type { TextHighlightProps } from "./TextHighlight.interface";
import type { TextColor } from "../Text/Text.interface";

const colorClasses: Record<TextColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  ternary: "text-ternary",
  text: "text-gray-900",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  white: "text-white",
};

export function TextHighlight(props: TextHighlightProps) {
  const highlightText = (text: string) => {
    const highlight = props.highlight;
    if (!highlight) {
      return text;
    }

    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

    return parts.map((part) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <span
            class={twMerge(
              "font-bold",
              props.color ? colorClasses[props.color] : "",
            )}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (!props.highlight) {
    return <>{props.children}</>;
  }

  return <>{highlightText(props.children)}</>;
}
