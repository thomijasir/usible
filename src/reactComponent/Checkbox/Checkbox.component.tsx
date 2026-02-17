import React, { useId } from "react";
import type { CheckboxProps } from "./Checkbox.interface";
import { Text } from "../Text";
import { CheckIcon } from "~/assets/icons";

const sizeClasses: Record<NonNullable<CheckboxProps["size"]>, string> = {
  small: "h-5 w-5",
  medium: "h-6 w-6",
  large: "h-7 w-7",
};

const checkmarkSizeClasses: Record<
  NonNullable<CheckboxProps["size"]>,
  string
> = {
  small: "w-3 h-3",
  medium: "w-4 h-4",
  large: "w-5 h-5",
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      containerClassName = "",
      className = "",
      disabled,
      id,
      size = "medium",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const isError = !!error;

    return (
      <div
        className={`
            relative flex items-center
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${containerClassName}
        `}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={`
              peer appearance-none rounded border-2 transition-colors duration-200
              checked:bg-primary checked:border-primary
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              disabled:bg-gray-100 disabled:border-gray-200
              ${isError ? "border-error" : "border-gray-300 dark:border-gray-600"}
              ${sizeClasses[size]}
              ${className}
            `}
            {...props}
          />
          {/* Checkmark Icon */}
          <div
            className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${checkmarkSizeClasses[size]} text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 flex items-center justify-center`}>
            <CheckIcon />
          </div>
        </div>

        {label && (
          <label
            htmlFor={checkboxId}
            className={`ml-3 select-none ${
              disabled
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-gray-900 dark:text-gray-100"
            }`}>
            {typeof label === "string" ? (
              <Text variant="body2">{label}</Text>
            ) : (
              label
            )}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
