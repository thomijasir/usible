import React, { forwardRef, useId } from "react";
import type { SelectProps } from "./Select.interface";
import { Text } from "../Text";
import { ChevronDownIcon } from "~/assets/icons";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      children,
      fullWidth = true,
      className = "",
      containerClassName = "",
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const isError = !!error;

    return (
      <div
        className={`flex flex-col ${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className={`mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 ${
              disabled ? "opacity-50" : ""
            }`}>
            {label}
          </label>
        )}

        <div className="relative">
          <div
            className={`
              flex items-center w-full rounded-lg border bg-gray-50 dark:bg-gray-800 transition-colors duration-200
              ${
                isError
                  ? "border-error bg-red-50 dark:bg-red-900/10 text-error focus-within:border-error"
                  : "border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-primary-light"
              }
              ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900" : ""}
            `}>
            <select
              ref={ref}
              id={selectId}
              disabled={disabled}
              className={`
                w-full bg-transparent py-3 px-3 text-gray-900 dark:text-white appearance-none
                focus:outline-none disabled:cursor-not-allowed
                ${className}
              `}
              {...props}>
              {options
                ? options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))
                : children}
            </select>

            {/* Custom Arrow Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronDownIcon />
            </div>
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

Select.displayName = "Select";
