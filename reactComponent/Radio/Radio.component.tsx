import React, { forwardRef, useId } from "react";
import type { RadioProps } from "./Radio.interface";
import { Text } from "../Text";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      error,
      containerClassName = "",
      className = "",
      icon,
      disabled,
      id,
      inputPosition = "right",
      variant = "boxed",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;
    const isBoxed = variant === "boxed";

    const renderInput = (addMarginRight = false) => (
      <div
        className={`relative flex items-center h-6 ${
          addMarginRight ? "mr-4" : ""
        }`}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          disabled={disabled}
          className={`
              peer h-5 w-5 appearance-none rounded-full border-3 border-gray-300
              checked:border-primary checked:bg-primary
              focus:outline-none
              disabled:border-gray-200 disabled:bg-gray-100
              ${className}
            `}
          {...props}
        />
        {/* Checkmark/Dot */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block text-white">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>
    );

    const renderContent = (addMarginRight = false) => (
      <div className={`flex-1 ${addMarginRight ? "mr-4" : ""}`}>
        {label && (
          <label
            htmlFor={radioId}
            className={`block font-medium text-gray-900 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }
              }`}>
            {label}
          </label>
        )}
        {description && (
          <Text variant="caption" className="mt-1 text-gray-500 block">
            {description}
          </Text>
        )}
      </div>
    );

    const renderIcon = (addMarginRight = false) =>
      icon && (
        <div
          className={`${addMarginRight ? "mr-4" : ""} ${
            isBoxed ? "mt-0.5" : ""
          } text-gray-500`}>
          {icon}
        </div>
      );

    const boxedClasses = `
      items-start p-4 rounded-xl border shadow-sm
      ${
        props.checked
          ? "bg-blue-50 border-primary"
          : "bg-white border-gray-200 hover:border-gray-300"
      }
    `;

    const plainClasses = `
      items-center p-0 border-0 bg-transparent
    `;

    return (
      <div
        className={`
            relative flex transition-all duration-200
            ${isBoxed ? boxedClasses : plainClasses}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${error ? "border-error bg-red-50" : ""}
            ${containerClassName}
        `}
        onClick={() => !disabled && document.getElementById(radioId)?.click()}>
        {inputPosition === "left" ? (
          <>
            {renderInput(true)}
            {renderIcon(true)}
            {renderContent()}
          </>
        ) : (
          <>
            {renderIcon(true)}
            {renderContent(true)}
            {renderInput()}
          </>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";
