import React, { useId } from "react";
import { twMerge } from "tailwind-merge";
import type { InputProps } from "./Input.interface";
import { Text } from "../Text";

const sizeClasses: Record<NonNullable<InputProps["size"]>, string> = {
  small: "py-2 px-3 text-sm",
  medium: "py-3 px-3 text-base",
  large: "py-4 px-4 text-lg",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startAdornment,
      endAdornment,
      fullWidth = true,
      size = "medium",
      className = "",
      containerClassName = "",
      id,
      disabled,
      textCase = "normal",
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const isError = !!error;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Apply text case transformation
      if (textCase === "uppercase") {
        value = value.toUpperCase();
      } else if (textCase === "lowercase") {
        value = value.toLowerCase();
      }

      // Create a new event with the transformed value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    };

    return (
      <div
        className={`flex flex-col ${
          fullWidth ? "w-full" : ""
        } ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 ${
              disabled ? "opacity-50" : ""
            }`}>
            {label}
          </label>
        )}

        <div className="relative">
          {/* Input Container with Adornments */}
          <div
            className={`
              flex items-center w-full rounded-lg border bg-gray-100 dark:bg-gray-800 transition-colors duration-200
              ${
                isError
                  ? "border-error bg-red-50 dark:bg-red-900/10 text-error focus-within:border-error"
                  : "border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light"
              }
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900"
                  : ""
              }
            `}>
            {startAdornment && (
              <div className="pl-3 text-gray-500 flex items-center justify-center">
                {startAdornment}
              </div>
            )}

            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              onChange={handleChange}
              className={twMerge(
                "w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed",
                sizeClasses[size],
                startAdornment ? "pl-2" : "",
                endAdornment ? "pr-2" : "",
                className,
              )}
              {...props}
            />

            {endAdornment && (
              <div className="pr-3 text-gray-500 flex items-center justify-center">
                {endAdornment}
              </div>
            )}
          </div>
        </div>

        {(helperText || (isError && typeof error === "string")) && (
          <div className="mt-1 text-xs">
            {isError && typeof error === "string" ? (
              <Text variant="caption" color="error">
                {error}
              </Text>
            ) : helperText ? (
              <Text variant="caption" color="ternary">
                {helperText}
              </Text>
            ) : null}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
