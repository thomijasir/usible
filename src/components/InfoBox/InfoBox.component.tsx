import { twMerge } from "tailwind-merge";
import type { InfoBoxProps, InfoBoxColor } from "./InfoBox.interface";
import { Text } from "../Text";

const colorStyles: Record<InfoBoxColor, string> = {
  primary: "bg-primary-50 border-primary-light text-primary-dark",
  secondary: "bg-secondary-50 border-secondary-light text-secondary-dark",
  ternary: "bg-ternary-50 border-ternary-light text-ternary-dark",
  text: "bg-transparent border-transparent text-foreground",
  success: "bg-success-50 border-success-light text-success-dark",
  warning: "bg-warning-50 border-warning-light text-warning-dark",
  error: "bg-error-50 border-error-light text-error-dark",
};

export function InfoBox(props: InfoBoxProps) {
  const color = () => props.color ?? "primary";

  return (
    <div
      class={twMerge(
        "p-4 rounded-usible border flex items-start gap-3",
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
