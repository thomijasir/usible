import React from "react";
import type { CardProps } from "./Card.interface";

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "elevated",
  onClick,
  ...props
}) => {
  const baseClasses = "rounded-2xl overflow-hidden transition-all duration-200";

  const variants = {
    elevated:
      "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700",
    outlined: "bg-transparent border border-gray-200 dark:border-gray-700",
    filled: "bg-gray-50 dark:bg-gray-800 border-transparent",
  };

  const clickableClasses = onClick ? "active:scale-[0.98] cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}>
      {children}
    </div>
  );
};
