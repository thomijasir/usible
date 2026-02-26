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
  const highlighted = () => {
    const highlight = props.highlight;
    const text = props.children as string;

    if (!highlight || !text) {
      return text;
    }

    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

    return parts.map((part: string) => {
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

  return <>{highlighted()}</>;
}
