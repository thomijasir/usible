import { createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { SliderProps, SliderColor } from "./Slider.interface";
import { Text } from "../Text";

const colorClasses: Record<
  SliderColor,
  { accent: string; text: string; ring: string }
> = {
  primary: {
    accent: "accent-primary",
    text: "text-primary",
    ring: "focus:ring-primary",
  },
  secondary: {
    accent: "accent-secondary",
    text: "text-secondary",
    ring: "focus:ring-secondary",
  },
  ternary: {
    accent: "accent-ternary",
    text: "text-ternary",
    ring: "focus:ring-ternary",
  },
  success: {
    accent: "accent-green-500",
    text: "text-green-500",
    ring: "focus:ring-green-500",
  },
  warning: {
    accent: "accent-yellow-500",
    text: "text-yellow-500",
    ring: "focus:ring-yellow-500",
  },
  error: {
    accent: "accent-red-500",
    text: "text-red-500",
    ring: "focus:ring-red-500",
  },
};

export function Slider(props: SliderProps) {
  const id = () => props.id ?? createUniqueId();
  const color = () => props.color ?? "primary";
  const colorClass = () => colorClasses[color()];

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!props.disabled) {
      props.onChange(Number(target.value));
    }
  };

  return (
    <div class={twMerge("w-full select-none", props.class)}>
      {(props.label || props.showValue) && (
        <div class="flex justify-between mb-2 items-end">
          {props.label && (
            <label
              for={id()}
              class={twMerge(
                "font-medium",
                props.disabled ? "text-slate-400" : "text-slate-700",
              )}>
              <Text variant="body2">{props.label}</Text>
            </label>
          )}
          {props.showValue && (
            <Text
              variant="caption"
              class={twMerge(
                "font-semibold transition-colors",
                props.disabled ? "text-slate-400" : colorClass().text,
              )}>
              {props.value}
            </Text>
          )}
        </div>
      )}
      <div class="relative w-full h-6 flex items-center">
        <input
          type="range"
          id={id()}
          min={props.min ?? 0}
          max={props.max ?? 100}
          step={props.step ?? 1}
          value={props.value}
          disabled={props.disabled}
          onChange={handleChange}
          aria-valuemin={props.min ?? 0}
          aria-valuemax={props.max ?? 100}
          aria-valuenow={props.value}
          aria-valuetext={props.showValue ? String(props.value) : undefined}
          class={twMerge(
            "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-30",
            props.disabled
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "",
            colorClass().accent,
            colorClass().ring,
          )}
        />
      </div>
    </div>
  );
}
