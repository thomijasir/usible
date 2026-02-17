import { FC } from "react";
import { twMerge } from "tailwind-merge";
import type { MenuListProps, MenuItemProps } from "./MenuList.interface";

export const MenuItem: FC<MenuItemProps> = ({
  label,
  description,
  leftIcon,
  rightIcon,
  onClick,
  className = "",
  showChevron = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "flex items-center p-4 bg-white active:bg-gray-50 cursor-pointer transition-colors duration-200",
        className,
      )}>
      {leftIcon && <div className="mr-4 text-gray-500">{leftIcon}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-base font-medium text-gray-900 truncate">
          {label}
        </div>
        {description && (
          <div className="text-sm text-gray-500 mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
      {(rightIcon || showChevron) && (
        <div className="ml-4 text-gray-400 shrink-0">
          {rightIcon ? (
            rightIcon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export const MenuList: FC<MenuListProps> = ({
  children,
  variant = "standard",
  className = "",
  title,
}) => {
  const containerClasses =
    variant === "rounded"
      ? "rounded-2xl overflow-hidden shadow-sm border border-gray-100 mx-4"
      : "border-y border-gray-100 w-full";

  const titleClasses =
    variant === "rounded"
      ? "px-4 pb-2 mx-4 text-sm font-semibold text-gray-500 uppercase tracking-wider"
      : "px-4 pb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className={twMerge("w-full", className)}>
      {title && <div className={titleClasses}>{title}</div>}
      <div
        className={twMerge(
          "bg-white divide-y divide-gray-100",
          containerClasses,
        )}>
        {children}
      </div>
    </div>
  );
};
