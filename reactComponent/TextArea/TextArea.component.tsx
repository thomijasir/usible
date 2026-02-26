import React, { useId } from "react";
import { twMerge } from "tailwind-merge";
import type { TextAreaProps } from "./TextArea.interface";
import { Text } from "../Text";

const sizeClasses: Record<NonNullable<TextAreaProps["size"]>, string> = {
  small: "py-2 px-3 text-sm",
  medium: "py-3 px-3 text-base",
  large: "py-4 px-4 text-lg",
};

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      size = "medium",
      className = "",
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const isError = !!error;

    return (
      <div className={`flex flex-col ${fullWidth ? "w-full" : ""}`}>
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
          <div
            className={`
              flex items-start w-full rounded-lg border bg-gray-100 dark:bg-gray-800 transition-colors duration-200
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
            <textarea
              ref={ref}
              id={inputId}
              disabled={disabled}
              rows={rows}
              className={twMerge(
                "w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed resize-none",
                sizeClasses[size],
                className,
              )}
              {...props}
            />
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

TextArea.displayName = "TextArea";
