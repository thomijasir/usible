import React from "react";
import { twMerge } from "tailwind-merge";
import type { SliderProps } from "./Slider.interface";
import { Text } from "../Text";

const colorClasses: Record<NonNullable<SliderProps["color"]>, string> = {
  primary:
    "accent-[var(--color-primary)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]",
  secondary:
    "accent-[var(--color-secondary)] text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]",
  ternary:
    "accent-[var(--color-ternary)] text-[var(--color-ternary)] focus:ring-[var(--color-ternary)]",
  success: "accent-green-500 text-green-500 focus:ring-green-500",
  warning: "accent-yellow-500 text-yellow-500 focus:ring-yellow-500",
  error: "accent-red-500 text-red-500 focus:ring-red-500",
};

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  disabled = false,
  color = "primary",
  className,
}) => {
  const currentColorClass = colorClasses[color];
  // Split to get specific parts if needed, but accent handles most.
  // We use the text color for the value label.

  return (
    <div className={twMerge("w-full select-none", className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-2 items-end">
          {label && (
            <Text
              variant="body2"
              className={twMerge(
                "font-medium",
                disabled ? "text-slate-400" : "text-slate-700",
              )}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text
              variant="caption"
              className={twMerge(
                "font-semibold transition-colors",
                disabled ? "text-slate-400" : currentColorClass.split(" ")[1], // Get the text- color class
              )}>
              {value}
            </Text>
          )}
        </div>
      )}
      <div className="relative w-full h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(Number(e.target.value))}
          className={twMerge(
            "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-30",
            disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
            currentColorClass.split(" ")[0], // accent class
            currentColorClass.split(" ")[2], // ring class
          )}
        />
      </div>
    </div>
  );
};
