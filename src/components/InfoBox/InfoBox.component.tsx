import { twMerge } from "tailwind-merge";
import type { InfoBoxProps, InfoBoxColor } from "./InfoBox.interface";
import { Text } from "../Text";

const colorStyles: Record<InfoBoxColor, string> = {
  primary: "bg-blue-50 border-blue-200 text-blue-900",
  secondary: "bg-purple-50 border-purple-200 text-purple-900",
  ternary: "bg-gray-50 border-gray-200 text-gray-900",
  text: "bg-transparent border-transparent text-gray-900",
  success: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  error: "bg-red-50 border-red-200 text-red-900",
};

export function InfoBox(props: InfoBoxProps) {
  const color = () => props.color ?? "primary";

  return (
    <div
      class={twMerge(
        "p-4 rounded-lg border flex items-start gap-3",
        colorStyles[color()],
        props.class,
      )}>
      {props.leftIcon && <div class="shrink-0 mt-0.5">{props.leftIcon}</div>}
      <div class="flex-1">
        {props.title && (
          <Text variant="subtitle1" class="font-semibold mb-1">
            {props.title}
          </Text>
        )}
        <Text variant="body2" class="opacity-90">
          {props.description}
        </Text>
      </div>
    </div>
  );
}
