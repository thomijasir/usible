import React from "react";
import type { ChipProps } from "./Chip.interface";

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = "filled",
  color = "default",
  size = "medium",
  disabled = false,
  icon,
  onDelete,
  onClick,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200";

  const sizes = {
    small: "px-2.5 py-0.5 text-xs h-6",
    medium: "px-3 py-1 text-sm h-8",
  };

  const colors = {
    filled: {
      default:
        "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600",
      primary: "bg-primary-light text-primary-dark hover:bg-primary-active",
      secondary:
        "bg-secondary-light text-secondary-dark hover:bg-secondary-active",
      ternary: "bg-ternary-light text-ternary-dark hover:bg-ternary-active",
      success: "bg-success-light text-success-dark hover:bg-success-active",
      warning: "bg-warning-light text-warning-dark hover:bg-warning-active",
      error: "bg-error-light text-error-dark hover:bg-error-active",
    },
    outlined: {
      default:
        "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
      primary: "border border-primary text-primary hover:bg-primary-light/10",
      secondary:
        "border border-secondary text-secondary hover:bg-secondary-light/10",
      ternary: "border border-ternary text-ternary hover:bg-ternary-light/10",
      success: "border border-success text-success hover:bg-success-light/10",
      warning: "border border-warning text-warning hover:bg-warning-light/10",
      error: "border border-error text-error hover:bg-error-light/10",
    },
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : onClick
      ? "cursor-pointer active:scale-95"
      : "cursor-default";

  return (
    <div
      className={`${baseClasses} ${sizes[size]} ${colors[variant][color]} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}>
      {icon && <span className="mr-1.5 -ml-0.5 flex items-center">{icon}</span>}
      <span>{label}</span>
      {onDelete && !disabled && (
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      )}
    </div>
  );
};
